(() => {
	const FAUX_DELAY = 1;
	var local = {
		get: (obj, cb) => {
			if (typeof obj === 'string') {
				const retVal = {};
				retVal[obj] = JSON.parse(window.localStorage.getItem(obj));
				setTimeout(() => cb(retVal), FAUX_DELAY);
			} else {
				const retVal = {};
				Object.keys(obj).forEach(key => {
					let val = window.localStorage.getItem(key);
					retVal[key] =
						val === undefined || val === null ? obj[key] : JSON.parse(val);
				});
				setTimeout(() => cb(retVal), FAUX_DELAY);
			}
		},
		set: (obj, cb) => {
			Object.keys(obj).forEach(key => {
				window.localStorage.setItem(key, JSON.stringify(obj[key]));
			});
			setTimeout(() => {
				if (cb) cb();
			}, FAUX_DELAY);
		}
	};
	window.db = {
		local: chrome && chrome.storage ? chrome.storage.local : local,
		sync: chrome && chrome.storage ? chrome.storage.sync : local
	};
})();
