export function Loader({ height, noMargin, leftMargin }) {
	return (
		<svg
			viewBox="0 0 166 166"
			height={height || '1.6em'}
			style={{
				margin: noMargin
					? null
					: leftMargin
					? ` 0 0 0 ${leftMargin}`
					: '0 0.8rem'
			}}
			class="new-loader"
		>
			<g fill="none" fillRule="evenodd">
				<path
					d="M83 166c-45.84 0-83-37.16-83-83S37.16 0 83 0s83 37.16 83 83-37.16 83-83 83zm0-29c29.823 0 54-24.177 54-54s-24.177-54-54-54-54 24.177-54 54 24.177 54 54 54z"
					fill="currentColor"
					style={{ opacity: 0.2 }}
				/>
				<path
					d="M137.008 83H137c0-29.823-24.177-54-54-54S29 53.177 29 83h-.008c.005.166.008.333.008.5C29 91.508 22.508 98 14.5 98S0 91.508 0 83.5c0-.167.003-.334.008-.5H0C0 37.16 37.16 0 83 0s83 37.16 83 83h-.008c.005.166.008.333.008.5 0 8.008-6.492 14.5-14.5 14.5S137 91.508 137 83.5c0-.167.003-.334.008-.5z"
					fill="currentColor"
				/>
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					dur="1s"
					from="0 83 83"
					to="360 83 83"
					repeatCount="indefinite"
				/>
			</g>
		</svg>
	);
}

export function LoaderWithText({ children }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '2rem 1rem'
			}}
		>
			<Loader /> {children}
		</div>
	);
}
