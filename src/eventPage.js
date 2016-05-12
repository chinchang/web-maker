chrome.tabs.onCreated.addListener(function (tab) {

	console.log('created', arguments)
	if (tab.url === 'chrome://newtab/') {
		chrome.tabs.update(tab.id, {
			url: chrome.extension.getURL('index.html')
		}, function callback() {
			console.log('ho gaya');
		});
	}

});

chrome.tabs.onUpdated.addListener(function () {

	console.log('updated', arguments)

});

chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
});
