async function retrieveSubscription(firestore, userId) {
	const docRef = firestore.collection('user_subscriptions').doc('user-' + userId);
	return await docRef.get().then(function(doc) {
		let subscription;
		if (doc.exists) {
			// console.log('Document data:', doc.data());
			subscription = doc.data();
		} else {
			// doc.data() will be undefined in this case
			// console.log('No such document!');
			subscription = null;
		}
		return subscription;
	}).catch(function(error) {
		// console.log('Error getting document:', error);
		return null;
	});
}

function updateUiWithSubcriptionStatus(subscription) {

	const isSubscriptionOnGoing = subscription && subscription['ends_at'] === null;
	const isSubscriptionValid = subscription && subscription['ends_at'] !== null && ((new Date(subscription['ends_at']) - new Date()) >= 0);


	if (isSubscriptionOnGoing || isSubscriptionValid) {
		document.body.classList.add('is-in-subscription');
	} else {
		document.body.classList.remove('is-in-subscription');
	}
}

function loadSubscriptionToApp(userId) {
	return window.db.getDb().then(async firestore => {
			const subscription = await retrieveSubscription(firestore, userId);
			window.user.subscrition = subscription;
			return subscription;
			// updateUiWithSubcriptionStatus(subscription);
		}
	);
}

export { loadSubscriptionToApp };
