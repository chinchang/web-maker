window.db.getDb().then(firestore => {
	var docRef = firestore.collection('user_subscriptions').doc('user-' + window.user.uid);

	docRef.get().then(function(doc) {
		if (doc.exists) {
			console.log("Document data:", doc.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
});

