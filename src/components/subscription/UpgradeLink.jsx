const UpgradeLink = ({ user }) => {
	if (!user) return null;

	const subscription = user.subscription;
	const isSubscriptionOnGoing = subscription && subscription['ends_at'] == null;
	const isSubscriptionValid = subscription && subscription['ends_at'] !== null && ((new Date(subscription['ends_at']) - new Date()) >= 0);

	if (!isSubscriptionOnGoing && !isSubscriptionValid) {
		const upgradeLink = `https://pay.paddle.com/checkout/552378?passthrough=${user.uid}`;
		return <a id='UpgradeLink' href={upgradeLink} target='_blank'>Upgrade</a>;
	}
};

export { UpgradeLink };