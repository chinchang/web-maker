(function() {
	const noticationContainerEL = $('#js-alerts-container');
	var hideTimeout;

	function addNotification(msg) {
		// var n = document.createElement('div');
		// div.textContent = msg;
		// noticationContainerEL.appendChild(n);
		noticationContainerEL.textContent = msg;
		noticationContainerEL.classList.add('is-active');

		clearTimeout(hideTimeout);
		hideTimeout = setTimeout(function() {
			noticationContainerEL.classList.remove('is-active');
		}, 2000);
	}

	window.alertsService = {
		add: addNotification
	};
})();
