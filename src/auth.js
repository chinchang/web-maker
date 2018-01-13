window.logout = function logout() {
	firebase.auth().signOut();
};
function login(providerName) {
	var provider;
	if (providerName === 'facebook') {
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
		.then(function() {})
		.catch(function(error) {
			alert(
				'You have already signed up with the same email using different social login'
			);
			utils.log(error);
		});
}
window.login = login;
