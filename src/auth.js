window.logout = function logout() {
	firebase.auth().signOut();
};
function login(providerName) {
	var provider;
	if (providerName === 'fb') {
		provider = new firebase.auth.FacebookAuthProvider();
	} else if (providerName === 'twitter') {
		provider = new firebase.auth.TwitterAuthProvider();
	} else if (providerName === 'google') {
		provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
	} else {
		provider = new firebase.auth.GithubAuthProvider();
	}

	return firebase
		.auth()
		.signInWithPopup(provider)
		.then(function(result) {
			return;
			// Save this user in the store
			firebase
				.database()
				.ref('users/' + result.user.uid)
				.update({
					displayName: result.user.displayName,
					email: result.user.email,
					photoURL: result.user.providerData[0].photoURL,
					signedUpOn: Date.now()
				})
				.then(function() {
					// Port items in localstorage to user account
					if (window.localStorage.prototyp) {
						var items = JSON.parse(window.localStorage.prototyp);
						var newItemKey;
						items.forEach(function(localItem) {
							itemService.fetchItem(localItem.id).then(function(item) {
								newItemKey = firebase.database().ref('pens').push().key;
								item.createdBy = result.user.uid;
								delete item.uid;
								firebase.database().ref('pens/' + newItemKey).set(item);
								firebase
									.database()
									.ref('users/' + result.user.uid)
									.child('items')
									.child(newItemKey)
									.set(true);
							});
						});
						delete localStorage.prototyp;
					}
				});
		})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			utils.log(error);
		});
}
window.login = login;
