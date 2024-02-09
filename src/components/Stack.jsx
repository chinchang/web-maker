const gaps = [0, '0.5rem', '1rem', '1.5rem', '3rem', '5rem'];

const Stack = function ({
	classes = '',
	gap = 0,
	align = 'center',
	justify = 'flex-start',
	direction = 'horizontal',
	fullWidth = false,
	fullHeight = false,
	wrap,
	children
}) {
	return (
		<div
			style={{
				display: 'flex',
				gap: gaps[gap] || gap,
				alignItems: align,
				justifyContent: justify,
				flexDirection: direction === 'vertical' ? 'column' : 'row',
				height: fullHeight ? '100%' : null,
				width: fullWidth ? '100%' : null,
				flexWrap: wrap ? 'wrap' : null
			}}
			class={`stack ${classes}`}
		>
			{children}
		</div>
	);
};

const VStack = props => {
	return <Stack {...props} direction="vertical" />;
};

const HStack = props => {
	return (
		<Stack
			classes={`hstack ${props.responsive ? 'hstack--responsive' : ''}`}
			{...props}
		/>
	);
};

const Spacer = () => {
	return (
		<>
			<div style={{ flexGrow: '1' }}></div>
		</>
	);
};

export { Stack, VStack, HStack, Spacer };
