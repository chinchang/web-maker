import { forwardRef } from 'preact/compat';

const appearanceStyles = {
	normal: {
		color: 'var(--color-text)'
	},
	primary: {
		color: 'var(--color-heading)'
	},
	secondary: {
		color: 'var(--color-text-light)'
	},
	tertiary: {
		color: 'var(--color-text-lightest-final)'
	},
	brand: {
		color: 'var(--color-brand)'
	}
};

export const Text = forwardRef(
	(
		{
			size = 0,
			weight = 'normal',
			tag,
			style = 'normal',
			appearance = 'normal',
			letterSpacing = 0,
			lineHeight = 1.4,
			align = 'left',
			classes = '',
			children
		},
		ref
	) => {
		const Tag = tag || 'span';

		const styles = {
			letterSpacing: letterSpacing,
			fontSize: `var(--font-size-${size})`,

			fontWeight: weight,
			textAlign: align,
			lineHeight: lineHeight,
			fontStyle: style === 'italic' ? 'italic' : 'normal',
			...appearanceStyles[appearance]
		};

		return (
			<Tag style={styles} className={classes} ref={ref}>
				{children}
			</Tag>
		);
	}
);
