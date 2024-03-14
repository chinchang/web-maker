import { useEffect, useState } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { alertsService } from '../notifications';
import { A, Button } from './common';
import { useCheckout } from '../hooks/useCheckout';
import { Text } from './Text';
import { Icon } from './Icons';

export function Pro({ user }) {
	const hasCheckoutLoaded = useCheckout();

	useEffect(() => {
		if (hasCheckoutLoaded) {
			window.LemonSqueezy.Setup({
				eventHandler: e => {
					console.log('eventHandler', e);
					if (e.event === 'Checkout.Success') {
						window.location.reload();
					}
				}
			});
			window.LemonSqueezy.Refresh();
		}
	}, [hasCheckoutLoaded]);
	return (
		<VStack gap={4} align="stretch">
			<Stack gap={2} align="stretch">
				<Card
					price="Free"
					name="Starter"
					features={[
						'Unlimited private creations',
						'2 Public creations',
						'1 Files mode creation'
					]}
				/>
				<Card
					bg="#674dad"
					price="$6/mo"
					name="Pro"
					action={
						<A
							class="btn btn--primary lemonsqueezy-button d-f jc-c ai-c"
							style="gap:0.2rem"
							href={`https://web-maker.lemonsqueezy.com/checkout/buy/1601bc00-9623-435b-b1de-2a70a2445c13?embed=1&checkout[custom][userId]=${user.uid}`}
						>
							Go <ProBadge />
						</A>
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
