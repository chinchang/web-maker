import { useState, useRef, useEffect } from 'preact/hooks';

const DropdownMenu = ({
	btnProps = {},
	btnContent,
	menuItems,
	position = 'top'
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef(null);
	const menuRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = event => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			!triggerRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="dropdown">
			<button
				type="button"
				ref={triggerRef}
				onClick={toggleDropdown}
				aria-haspopup="true"
				aria-expanded={isOpen}
				{...btnProps}
				className={`dropdown-trigger ${btnProps?.className}`}
			>
				{btnContent}
			</button>
			{isOpen && (
				<ul
					ref={menuRef}
					role="menu"
					className={`popup dropdown-menu dropdown-menu-${position}`}
				>
					{menuItems.map((item, index) => (
						<li key={index} role="menuitem">
							<button
								onClick={() => {
									setIsOpen(false);
									item.onClick();
								}}
								className="dropdown-item"
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export { DropdownMenu };
