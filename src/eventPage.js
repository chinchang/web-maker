function openApp() {
	chrome.tabs.create({
		url: chrome.runtime.getURL('index.html'),
		selected: true
	});
}

chrome.action.onClicked.addListener(function () {
	openApp();
});

// Listen for tabs getting created.
chrome.tabs.onCreated.addListener(function (tab) {
	// If a new tab is opened (without any URL), check user's
	// replace Tab setting and act accordingly. Default is false.
	if (tab.url === 'chrome://newtab/') {
		chrome.storage.sync.get(
			{
				replaceNewTab: false
			},
			function (items) {
				if (items.replaceNewTab) {
					chrome.tabs.update(
						tab.id,
						{
							url: chrome.runtime.getURL('index.html')
						},
						function callback() {
							console.log('ho gaya');
						}
					);
				}
			}
		);
	}
});

chrome.runtime.onInstalled.addListener(function callback(details) {
	if (details.reason === 'install') {
		openApp();
	}
	if (details.reason === 'update') {
		if ((details.previousVersion + '').indexOf('1.') === 0) {
			openApp();
		}
	}
});

const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

// Chrome only allows for a single offscreenDocument. This is a helper function
// that returns a boolean indicating if a document is already active.
async function hasDocument() {
	// Check all windows controlled by the service worker to see if one
	// of them is the offscreen document with the given path
	const matchedClients = await clients.matchAll();
	return matchedClients.some(
		c => c.url === chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)
	);
}

async function setupOffscreenDocument(path) {
	// If we do not have a document, we are already setup and can skip
	if (await chrome.offscreen.hasDocument()) return;
	await chrome.offscreen.createDocument({
		url: path,
		reasons: [chrome.offscreen.Reason.DOM_SCRAPING],
		justification: 'authentication'
	});
}

async function closeOffscreenDocument() {
	if (!(await hasDocument())) {
		return;
	}
	await chrome.offscreen.closeDocument();
}

function getAuth(providerName) {
	return new Promise(async (resolve, reject) => {
		// sending to offscreen document
		const auth = await chrome.runtime.sendMessage({
			type: 'firebase-auth',
			target: 'offscreen',
			providerName
		});
		auth?.name !== 'FirebaseError' ? resolve(auth) : reject(auth);
	});
}

async function firebaseAuth(providerName) {
	await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);

	const auth = await getAuth(providerName)
		.then(auth => {
			// console.log('User Authenticated', auth);
			return auth;
		})
		.catch(err => {
			if (err.code === 'auth/operation-not-allowed') {
				console.error(
					'You must enable an OAuth provider in the Firebase' +
						' console in order to use signInWithPopup. This sample' +
						' uses Google by default.'
				);
			} else {
				console.error(err);
				return err;
			}
		})
		.finally(closeOffscreenDocument);

	return auth;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	//  received from the app
	if (message.type === 'firebase-auth') {
		firebaseAuth(message.providerName).then(sendResponse);
		return true;
	}
});
