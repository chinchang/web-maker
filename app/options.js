// Restores preferences from chrome.storage.
function restoreOptions() {
	chrome.storage.sync.get(
		{
			preserveLastCode: true,
			replaceNewTab: false
		},
		function(items) {
			document.forms.optionsForm.preserveLastCode.checked =
				items.preserveLastCode;
			document.forms.optionsForm.replaceNewTab.checked = items.replaceNewTab;
		}
	);
}

function saveOptions(e) {
	var preserveLastCode = document.forms.optionsForm.preserveLastCode.checked;
	var replaceNewTab = document.forms.optionsForm.replaceNewTab.checked;

	chrome.storage.sync.set(
		{
			preserveLastCode: preserveLastCode,
			replaceNewTab: replaceNewTab
		},
		function() {
			var status = document.getElementById('js-status');
			status.textContent = 'Settings saved.';
			setTimeout(function() {
				status.innerHTML = '&nbsp;';
			}, 750);
		}
	);

	e.preventDefault();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.forms.optionsForm.addEventListener('submit', saveOptions);
