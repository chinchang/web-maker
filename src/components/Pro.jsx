import { useEffect, useState } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { alertsService } from '../notifications';
import { A, Button } from './common';
import { useCheckout } from '../hooks/useCheckout';
import { Text } from './Text';
import { Icon } from './Icons';
import { showConfetti } from '../utils';

const checkoutIds = {
	monthly: '1601bc00-9623-435b-b1de-2a70a2445c13',
	annual: 'aae95d78-05c8-46f5-b11e-2d40ddd211d3',
	generic: 'f8c64e50-7734-438b-a122-3510156f14ed'
};
export function Pro({ user, onLoginClick }) {
	const hasCheckoutLoaded = useCheckout();
	const [isAnnual, setIsAnnual] = useState(true);

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
	return (
		<VStack gap={2} align="stretch">
			{/* <Stack justify="center">
				<Switch
					labels={['Monthly', 'Annually']}
					checked={isAnnual}
					showBothLabels={true}
					onChange={e => {
						setIsAnnual(e.target.checked);
					}}
				/>
			</Stack> */}
			<Stack gap={2} align="stretch">
				<Card
					price="Free"
					name="Starter"
					features={[
						'Unlimited private creations',
						'2 Public creations',
						'2 Files mode creations'
					]}
				/>
				<Card
					bg="#674dad"
					price={'Starting $6/mo'}
					name="Pro"
					action={
						window.user ? (
							<A
								class="btn btn--pro lemonsqueezy-button d-f jc-c ai-c"
								style="gap:0.2rem"
								href={`https://web-maker.lemonsqueezy.com/checkout/buy/${checkoutIds.generic}?embed=1&checkout[custom][userId]=${user?.uid}`}
							>
								Go PRO
							</A>
						) : (
							<button
								type="button"
								className="btn btn--pro jc-c"
								onClick={onLoginClick}
							>
								Login & upgrade to PRO
							</button>
						)
					}
					features={[
						'Unlimited private creations',
						'Unlimited public creations',
						'Unlimited files mode creations',
						'Asset hosting',
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
	);
}

const Card = ({ bg, name, price, action, features }) => {
	return (
		<div class="plan-card" style={{ background: bg }}>
			<VStack gap={2} align="stretch" justify="flex-start">
				<VStack gap={0} align="stretch" justify="flex-start">
					<Text transform="uppercase" weight="600">
						{name}
					</Text>
					<Text size="5" weight="800" appearance="primary">
						{' '}
						{price}
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
