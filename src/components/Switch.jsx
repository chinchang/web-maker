import { h } from 'preact';

export default function Switch({
	checked,
	onChange,
	labels = [],
	children,
	showBothLabels
}) {
	return (
		<label class="check-switch">
			<input
				role="switch"
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<div class="check-switch__toggle-wrap">
				<span
					aria-hidden="true"
					class="check-switch__status"
					style={`visibility:${
						checked && !showBothLabels ? 'hidden' : 'visible'
					}`}
				>
					{labels[0] || 'Off'}
				</span>
				<span aria-hidden="true" class="check-switch__toggle" />
				<span
					aria-hidden="true"
					class="check-switch__status"
					style={`visibility:${
						checked || showBothLabels ? 'visible' : 'hidden'
					}`}
				>
					{labels[1] || 'On'}
				</span>
			</div>

			{children}
		</label>
	);
}
