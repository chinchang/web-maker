// Dropdown.js

(function($all) {
	var openDropdown;

	// Closes all dropdowns except the passed one.
	function closeOpenDropdown(except) {
		if (openDropdown && (!except || except !== openDropdown)) {
			openDropdown.classList.remove('open');
			openDropdown = null;
		}
	}
	function init() {
		var dropdowns = $all('[dropdown]');
		dropdowns.forEach(function(dropdown) {
			dropdown.addEventListener('click', function(e) {
				closeOpenDropdown(e.currentTarget);
				e.currentTarget.classList.toggle('open');
				openDropdown = e.currentTarget;
				e.stopPropagation();
			});
		});

		document.addEventListener('click', function() {
			closeOpenDropdown();
		});
	}

	init();
})($all);
