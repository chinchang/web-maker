const gaps = [0, '0.5rem', '1rem', '1.5rem', '3rem', '5rem'];

export const Stack = ({ gap = 0, children }) => {
	return (
		<div class="stack" style={{ gap: gaps[gap] }}>
			{children}
		</div>
	);
};
