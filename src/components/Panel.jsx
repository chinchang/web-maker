import { forwardRef } from 'preact/compat';

export const Panel = forwardRef(function Panel(
	{
		classes = '',
		padding = '2rem',
		fullWidth = true,
		fullHeight = false,
		glowing = false,
		topFocus = false,
		onlyBorder = false,
		children
	},
	ref
) {
	return (
		<div
			ref={ref}
			style={{
				padding: padding,
				width: fullWidth ? '100%' : 'auto',
				height: fullHeight ? '100%' : 'auto'
			}}
			className={`panel ${classes} ${glowing && 'panelGlowing'} ${
				topFocus && 'panelTopFocus'
			} ${onlyBorder && 'panelOnlyBorder'}`}
		>
			{children}
		</div>
	);
});
