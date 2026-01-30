import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export const Attention = ({ children, interval = 3000 }) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		let t1, t2;
		const runLoop = () => {
			setActive(true);
			t1 = setTimeout(() => {
				setActive(false);
				t2 = setTimeout(runLoop, interval);
			}, 2000);
		};

		runLoop();

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [interval]);

	return (
		<div class="attention-r">
			{children}
			{active && (
				<div class="attention-r__rays">
					{[...Array(8)].map((_, i) => (
						<div
							key={i}
							class="attention-r__ray"
							style={{
								'--r': `${i * 45}deg`
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};
