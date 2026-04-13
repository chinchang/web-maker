import { useEffect } from 'preact/hooks';

export const EthicalAds = ({ user }) => {
	useEffect(() => {
		if (user?.isPro) {
			console.log('is pro');
			const script = document.getElementById('js-ethical-ads');
			if (script) {
				console.log('removed script');
				script.remove();
			}
			return;
		}
		const script = document.createElement('script');
		script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
		script.async = true;
		script.id = 'js-ethical-ads';
		document.body.appendChild(script);
		console.log('added script');
	}, [user?.isPro]);

	if (user?.isPro) {
		return null;
	}

	return (
		<div
			data-ea-publisher="webmakerapp"
			data-ea-type="text"
			class="dark flat"
		></div>
	);
};
