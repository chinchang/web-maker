import { handleDownloadsPermission, log } from './utils';
import { trackEvent } from './analytics';

function saveScreenshot(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// create a blob for writing to a file
	var blob = new Blob([ab], {
		type: mimeString
	});
	var size = blob.size + 1024 / 2;

	var d = new Date();
	var fileName = [
		'web-maker-screenshot',
		d.getFullYear(),
		d.getMonth() + 1,
		d.getDate(),
		d.getHours(),
		d.getMinutes(),
		d.getSeconds()
	].join('-');
	fileName += '.png';

	function onWriteEnd() {
		var filePath =
			'filesystem:chrome-extension://' +
			chrome.i18n.getMessage('@@extension_id') +
			'/temporary/' +
			fileName;

		// HACK: because chrome.downloads isn't working on optional permissions
		// anymore.
		return window.open(filePath);

		/* chrome.downloads.download(
			{
				url: filePath
			},
			function() {
				// If there was an error, just open the screenshot in a tab.
				// This happens in incognito mode where extension cannot access filesystem.
				if (chrome.runtime.lastError) {
					window.open(filePath);
				}
			}
		); */
	}

	function errorHandler(e) {
		log(e);
	}

	// create a blob for writing to a file
	window.webkitRequestFileSystem(
		window.TEMPORARY,
		size,
		fs => {
			fs.root.getFile(
				fileName,
				{
					create: true
				},
				fileEntry => {
					fileEntry.createWriter(fileWriter => {
						fileWriter.onwriteend = onWriteEnd;
						fileWriter.write(blob);
					}, errorHandler);
				},
				errorHandler
			);
		},
		errorHandler
	);
}

export function takeScreenshot(boundRect) {
	handleDownloadsPermission().then(() => {
		// Hide tooltips so that they don't show in the screenshot
		var s = document.createElement('style');
		s.textContent =
			'[class*="hint"]:after, [class*="hint"]:before { display: none!important; }';
		document.body.appendChild(s);

		function onImgLoad(image) {
			var c = document.createElement('canvas');
			var iframeBounds = boundRect;
			c.width = iframeBounds.width;
			c.height = iframeBounds.height;
			var ctx = c.getContext('2d');
			var devicePixelRatio = window.devicePixelRatio || 1;

			ctx.drawImage(
				image,
				iframeBounds.left * devicePixelRatio,
				iframeBounds.top * devicePixelRatio,
				iframeBounds.width * devicePixelRatio,
				iframeBounds.height * devicePixelRatio,
				0,
				0,
				iframeBounds.width,
				iframeBounds.height
			);
			image.removeEventListener('load', onImgLoad);
			saveScreenshot(c.toDataURL());
		}

		setTimeout(() => {
			chrome.tabs.captureVisibleTab(
				null,
				{
					format: 'png',
					quality: 100
				},
				function(dataURI) {
					s.remove();
					if (dataURI) {
						var image = new Image();
						image.src = dataURI;
						image.addEventListener('load', () => onImgLoad(image, dataURI));
					}
				}
			);
		}, 50);

		trackEvent('ui', 'takeScreenshotBtnClick');
	});
}
