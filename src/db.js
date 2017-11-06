(() => {
	var local = {
		get: (obj, cb) => {
			if (typeof obj === 'string') {
				setTimeout(() => cb(window.localStorage.getItem(obj)), 100);
			} else {
				const retVal = {};
				Object.keys(obj).forEach(key => {
					let val = window.localStorage.getItem(key);
					retVal[key] =
						val === undefined || val === null ? obj[key] : JSON.parse(val);
				});
				setTimeout(() => cb(retVal), 100);
			}
		},
		set: (obj, cb) => {
			Object.keys(obj).forEach(key => {
				window.localStorage.setItem(key, JSON.stringify(obj[key]));
			});
			setTimeout(() => cb(), 100);
		}
	};
	window.db = {
		local: chrome && chrome.storage ? chrome.storage.local : local,
		sync: chrome && chrome.storage ? chrome.storage.sync : local
	};
})();
