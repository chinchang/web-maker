import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Button } from './common';
import { Icon } from './Icons';

export function UrlPill({
	url,
	label,
	displayUrl,
	copyAriaLabel = 'Copy URL',
	onCopy
}) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(t);
	}, [copied]);

	if (!url) return null;

	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		if (onCopy) onCopy();
	};

	return (
		<div class="url-pill">
			{label && <span class="url-pill__label">{label}</span>}
			<a href={url} target="_blank" rel="noopener" class="url-pill__link">
				{displayUrl || url}
			</a>
			<Button
				class={`btn btn--dark btn--small hint--bottom hint--rounded ${
					copied ? 'is-success' : ''
				}`}
				onClick={handleCopy}
				aria-label={copyAriaLabel}
			>
				<Icon name={copied ? 'check-circle' : 'copy'} />
			</Button>
		</div>
	);
}
