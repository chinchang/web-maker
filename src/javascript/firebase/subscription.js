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

function loadSubscriptionToApp(app) {
	window.db.getDb()
		.then(async firestore => {
				return await retrieveSubscription(firestore, app.state.user.uid);
			}
		).then(subscription => {
		app.setState(state => {
			const newUser = state.user;
			newUser.subscription = subscription;
			return { user: newUser };
		});
	});
}

export { loadSubscriptionToApp };
