import { useState, useEffect } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import { Panel } from './Panel';
import { Text } from './Text';
import { getHumanReadableDate } from '../utils';
import { LoaderWithText } from './Loader';

const DEFAULT_PROFILE_IMG =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'/%3E%3C/svg%3E";

const Header = ({ user, logoutBtnHandler }) => {
	return (
		<Stack gap={5}>
			<Stack gap={2} align="center">
				<img
					height="80"
					class={`profile-modal__avatar-img ${user?.isPro ? 'is-pro' : ''}`}
					src={user ? user.photoURL || DEFAULT_PROFILE_IMG : ''}
					id="profileAvatarImg"
					alt="Profile image"
				/>

				<VStack gap={1} align="flex-start">
					<h3
						class={`profile-modal__name  ${user?.isPro ? 's-pro' : ''}`}
						id="profileUserName"
					>
						{user && user.displayName ? user.displayName : 'Anonymous Creator'}
					</h3>
					{user.isPro && <ProBadge />}
				</VStack>
			</Stack>

			<button
				class="btn btn--primary"
				aria-label="Logout from your account"
				onClick={logoutBtnHandler}
			>
				Logout
			</button>
		</Stack>
	);
};

export function Profile({ user, logoutBtnHandler }) {
	const [currentSubscription, setCurrentSubscription] = useState(null);
	const [isFetchingSubscription, setIsFetchingSubscription] = useState(false);
	useEffect(() => {
		if (user?.isPro) {
			setIsFetchingSubscription(true);
			window.db.getUserSubscriptionEvents(user.uid).then(events => {
				setIsFetchingSubscription(false);

				let creationEvent = events
					.filter(
						event =>
							event.type === 'subscription_created' ||
							event.type === 'order_created'
					)
					.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
					// remove order_created events which correspond to subscriptions (non lifetime orders)
					.filter(
						event =>
							!(
								event.type === 'order_created' &&
								!event.data.data.attributes.first_order_item?.variant_name?.match(
									/lifetime/
								)
							)
					)[0];
				if (creationEvent) {
					console.log(creationEvent);
					creationEvent.attributes = creationEvent.data.data.attributes;
					setCurrentSubscription(creationEvent);
				}
			});
		}
	}, [user]);
	return (
		<VStack gap={4}>
			<Header user={user} logoutBtnHandler={logoutBtnHandler} />
			{window.user?.isPro && (
				<Panel>
					{isFetchingSubscription ? (
						<LoaderWithText>Loading billing details...</LoaderWithText>
					) : null}
					{currentSubscription ? (
						<VStack align="stretch" gap={1}>
							<Text>
								Plan:
								<Text weight="700">
									{' '}
									Web Maker PRO (
									{currentSubscription.attributes.variant_name ||
										currentSubscription.attributes.first_order_item
											?.variant_name}
									)
								</Text>
							</Text>
							<Text>
								Subscription Status:{' '}
								<Text weight="700">
									{currentSubscription.attributes.status === 'paid'
										? 'PRO for life ❤️'
										: currentSubscription.attributes.status}
								</Text>
							</Text>

							<Text>
								Renews on:{' '}
								<Text weight="700">
									{currentSubscription.attributes.status === 'paid'
										? 'Never ever'
										: getHumanReadableDate(
												currentSubscription.attributes.renews_at
											)}
								</Text>
							</Text>

							{currentSubscription.attributes.status === 'paid' ? null : (
								<a
									target="_blank"
									href={currentSubscription.attributes.urls.customer_portal}
								>
									Cancel subscription
								</a>
							)}
							{/* <a
							target="_blank"
							href={
								currentSubscription.attributes.urls
									.customer_portal_update_subscription
							}
						>
							Link 2
						</a>
						<a
							target="_blank"
							href={currentSubscription.attributes.urls.update_payment_method}
						>
							Link 3
						</a> */}
						</VStack>
					) : null}
				</Panel>
			)}
			{user?.isPro && currentSubscription ? (
				<img
					class="profile-modal__panda"
					src="assets/pro-panda.png"
					width="300"
					style="position:absolute;bottom:-3rem; right: -7rem;"
				/>
			) : null}
		</VStack>
	);
}
