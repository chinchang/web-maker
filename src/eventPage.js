chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.create({
		url: chrome.extension.getURL('index.html'),
		selected: true
	});
});

// Listen for tabs getting created.
chrome.tabs.onCreated.addListener(function (tab) {
	// If a new tab is opened (without any URL), check user's
	// replace Tab setting and act accordingly.
	if (tab.url === 'chrome://newtab/') {
		chrome.storage.sync.get({
			replaceNewTab: true
		}, function(items) {
			if (items.replaceNewTab) {
				chrome.tabs.update(tab.id, {
					url: chrome.extension.getURL('index.html')
				}, function callback() {
					console.log('ho gaya');
				});
			}
		});
	}
});