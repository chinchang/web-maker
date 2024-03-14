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

const sizes = {
	0: '0.875rem',
	1: '1rem',
	2: '1.125rem',
	3: '1.25rem',
	4: '1.5rem',
	5: '2rem',
	6: '2.5rem',
	7: '3rem',
	8: '4rem'
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
			transform,
			classes = '',
			children
		},
		ref
	) => {
		const Tag = tag || 'span';

		const styles = {
			letterSpacing: letterSpacing,
			fontSize: sizes[size],
			textTransform: transform,
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
