import { useEffect, useState } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { alertsService } from '../notifications';
import { A, Button } from './common';
import { useCheckout } from '../hooks/useCheckout';

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
			<A
				class="btn lemonsqueezy-button"
				href={`https://web-maker.lemonsqueezy.com/checkout/buy/1601bc00-9623-435b-b1de-2a70a2445c13?embed=1&checkout[custom][userId]=${user.uid}`}
			>
				Go <ProBadge />
			</A>
		</VStack>
	);
}
