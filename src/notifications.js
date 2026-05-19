var hideTimeout;

function getEl() {
	return $('#js-alerts-container');
}

function addNotification(msg) {
	const el = getEl();
	el.textContent = msg;
	el.classList.remove('alerts-container--loading');
	el.classList.add('is-active');

	clearTimeout(hideTimeout);
	hideTimeout = setTimeout(function () {
		el.classList.remove('is-active');
	}, 2000);
}

function showLoading(msg) {
	const el = getEl();
	el.textContent = msg;
	el.classList.add('is-active');
	el.classList.add('alerts-container--loading');
	clearTimeout(hideTimeout);
}

function hideNow() {
	const el = getEl();
	clearTimeout(hideTimeout);
	el.classList.remove('is-active');
	el.classList.remove('alerts-container--loading');
}

/**
 * Show a loading toast that resolves into a success/error toast based on a
 * promise. Returns the same promise so callers can still await/chain it.
 *
 *   alertsService.promise(fetchSomething(), {
 *     loading: 'Saving…',
 *     success: 'Saved',
 *     error: err => err.message || 'Failed'
 *   });
 *
 * `success` / `error` may be strings or functions of (value|error).
 */
function trackPromise(p, { loading, success, error } = {}) {
	showLoading(loading || 'Working…');
	return p.then(
		value => {
			addNotification(
				typeof success === 'function' ? success(value) : success || 'Done'
			);
			return value;
		},
		err => {
			addNotification(
				typeof error === 'function'
					? error(err)
					: error || 'Something went wrong'
			);
			throw err;
		}
	);
}

export const alertsService = {
	add: addNotification,
	loading: showLoading,
	hide: hideNow,
	promise: trackPromise
};
window.alertsService = alertsService;
