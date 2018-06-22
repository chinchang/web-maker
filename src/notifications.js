var hideTimeout;

function addNotification(msg) {
	const noticationContainerEL = $('#js-alerts-container');

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

export const alertsService = {
	add: addNotification
};
window.alertsService = alertsService;
