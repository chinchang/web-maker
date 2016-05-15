chrome.browserAction.onClicked.addListener(function(activeTab) {
	chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
});

// TODO: remove me
// Listen for messsage from tab script
/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.storage.local.set(request, function() {
		console.log('saved', request);
	});
});*/