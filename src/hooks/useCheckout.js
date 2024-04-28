import { useState, useEffect } from 'react';

function useCheckout() {
	const [hasVendorScriptLoaded, setHasVendorScriptLoaded] = useState();
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
		script.async = 'true';
		script.defer = 'true';
		script.addEventListener('load', () => {
			window.createLemonSqueezy();
			setHasVendorScriptLoaded(true);
		});
		document.body.appendChild(script);
	}, []);

	return hasVendorScriptLoaded;
}

export { useCheckout };
