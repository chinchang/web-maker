import { useEffect } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import { alertsService } from '../notifications';
import { A, Button } from './common';
import { useCheckout } from '../hooks/useCheckout';
import { Text } from './Text';
import { Icon } from './Icons';
import { showConfetti } from '../utils';
import { trackEvent } from '../analytics';

const checkoutIds = {
	monthly: '1601bc00-9623-435b-b1de-2a70a2445c13',
	annual: 'aae95d78-05c8-46f5-b11e-2d40ddd211d3',
	generic: 'd1d2da1a-ae8f-4222-bbaf-6e07da8954bf' //'f8c64e50-7734-438b-a122-3510156f14ed'
};
export function Pro({ user, onLoginClick, onBuyFromExtensionClick }) {
	const hasCheckoutLoaded = useCheckout();

	useEffect(() => {
		if (hasCheckoutLoaded) {
			window.LemonSqueezy.Setup({
				eventHandler: e => {
					console.log('eventHandler', e);
					if (e.event === 'Checkout.Success') {
						showConfetti(2);
						alertsService.add(
							'You are now PRO! 🎉. Reloading your superpowers...'
						);
						setTimeout(() => {
							window.location.reload();
						}, 2000);
					}
				}
			});
			window.LemonSqueezy.Refresh();
		}
	}, [hasCheckoutLoaded]);

	let upgradeActionEl;
	if (window.IS_EXTENSION) {
		upgradeActionEl = (
			<button
				type="button"
				className="btn btn--pro jc-c"
				onClick={onBuyFromExtensionClick}
			>
				Upgrade to PRO
			</button>
		);
	} else if (window.user) {
		upgradeActionEl = (
			<A
				class="btn btn--pro lemonsqueezy-button d-f jc-c ai-c"
				style="gap:0.2rem"
				href={`https://web-maker.lemonsqueezy.com/checkout/buy/${checkoutIds.generic}?embed=1&checkout[custom][userId]=${user?.uid}`}
				onClick={() => {
					trackEvent('ui', 'buyBtnClick');
				}}
			>
				Go PRO
			</A>
		);
	} else {
		upgradeActionEl = (
			<button
				type="button"
				className="btn btn--pro jc-c"
				onClick={onLoginClick}
			>
				Login & upgrade to PRO
			</button>
		);
	}
	return (
		<VStack gap={4} align="stretch">
			<VStack gap={2} align="stretch">
				<Stack gap={2} align="stretch" justify="center">
					<Card
						price="$0"
						priceSuffix="forever"
						subTitle="&nbsp;"
						name="FREE"
						features={[
							'Unlimited private creations',
							'1 Public creation',
							'2 Files mode creations',
							'Local asset hosting'
						]}
					/>
					<Card
						bg="#674dad"
						highlight
						price="$4"
						priceSuffix="/month"
						subTitle="Annual & one-time pricing available"
						name="Pro"
						action={upgradeActionEl}
						features={[
							'Unlimited private creations',
							'Unlimited public creations',
							'Unlimited files mode creations',
							'Local + Cloud asset hosting',
							'Host multi-user Collab session',
							'Priority support',
							'No Ads'
						]}
					/>
				</Stack>
				<Stack justify="center">
					<Text tag="p" appearance="secondary">
						30 days refund policy if not satisfied.
					</Text>
				</Stack>
			</VStack>
			<VStack gap={2} align="stretch">
				<Text
					tag="h3"
					size="5"
					weight="600"
					align="center"
					appearance="primary"
				>
					What developers are saying
				</Text>
				<Stack gap={2} align="stretch" wrap="wrap" justify="center">
					<Testimonial
						quote="Web Maker is THE ONE that makes me love coding and website design. It's so fun to just experiment something too. Web Maker is offline, and more customizable. I love it so much!"
						author="Ville Mononen"
						role=""
					/>
					<Testimonial
						quote="This is a great web app for developers that want to spin something real fast then move over to Code Pen. I've tried other online development tools and this is one that I keep coming back to, over and over again. :-)"
						author="Ramiro Rodriguez"
						role=""
					/>
					<Testimonial
						quote="I 100% love this extension, it is the best editor I have ever seen for an extension."
						author="Bethuel Kipsang"
						role=""
					/>
				</Stack>
				<HStack justify="center">
					<a
						href="https://chromewebstore.google.com/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
						target="_blank"
						rel="noopener noreferrer"
					>
						And much more...
					</a>
				</HStack>
			</VStack>
		</VStack>
	);
}

const Card = ({
	bg,
	name,
	price,
	priceSuffix,
	subTitle,
	action,
	features,
	highlight
}) => {
	return (
		<div
			class={`plan-card${highlight ? ' plan-card--highlight' : ''}`}
			style={{ background: bg }}
		>
			<VStack gap={2} align="stretch" justify="flex-start">
				<VStack gap={0} align="stretch" justify="flex-start">
					<Text transform="uppercase" weight="600">
						{name}
					</Text>
					<HStack gap={0.5} align="baseline">
						<Text size="5" weight="800" appearance="primary">
							{price}
						</Text>
						{priceSuffix ? (
							<Text size="1" weight="400" appearance="secondary">
								{priceSuffix}
							</Text>
						) : null}
					</HStack>
					<Text size="1" weight="400" appearance="secondary">
						{subTitle}
					</Text>
				</VStack>
				{action}
				{!action && (
					<a class="btn" aria-hidden="true" style="visibility:hidden">
						s
					</a>
				)}
				<VStack gap={1} align="flex-start">
					{features.map(f => (
						<HStack gap={1} align="center">
							<Icon name="check-circle" size="1.4rem" />
							{f}
						</HStack>
					))}
				</VStack>
			</VStack>
		</div>
	);
};

const Testimonial = ({ quote, author, role }) => {
	return (
		<div class="testimonial-card">
			<VStack gap={1} align="flex-start">
				<Text size="2" style={{ fontStyle: 'italic' }}>
					"{quote}"
				</Text>
				<HStack gap={0.5} align="center" justify="flex-end" fullWidth>
					<Text weight="600" appearance="primary" style="italic">
						{author}
					</Text>
					{role ? <Text appearance="secondary">· {role}</Text> : null}
				</HStack>
			</VStack>
		</div>
	);
};
