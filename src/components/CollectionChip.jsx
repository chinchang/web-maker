import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

export function CollectionChip({
	collection,
	isActive,
	onSelect,
	onRename,
	onDelete
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(collection.name);
	const inputRef = useRef();

	function handleDoubleClick(e) {
		e.stopPropagation();
		setIsEditing(true);
		setEditName(collection.name);
		setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
	}

	function handleRenameSubmit(e) {
		e.preventDefault();
		if (editName.trim() && editName.trim() !== collection.name) {
			onRename(editName.trim());
		}
		setIsEditing(false);
	}

	function handleContextMenu(e) {
		e.preventDefault();
		if (
			confirm(
				`Delete collection "${collection.name}"? Items in it will NOT be deleted.`
			)
		) {
			onDelete();
		}
	}

	if (isEditing) {
		return (
			<form class="collections-bar__edit-form" onSubmit={handleRenameSubmit}>
				<input
					ref={inputRef}
					type="text"
					class="collections-bar__edit-input"
					value={editName}
					onInput={e => setEditName(e.target.value)}
					onBlur={handleRenameSubmit}
					onKeyDown={e => {
						if (e.key === 'Escape') setIsEditing(false);
					}}
				/>
			</form>
		);
	}

	const itemCount = Object.keys(collection.items || {}).length;

	function handleKeyDown(e) {
		if (e.key === 'Delete' || e.key === 'Backspace') {
			e.preventDefault();
			if (
				confirm(
					`Delete collection "${collection.name}"? Items in it will NOT be deleted.`
				)
			) {
				onDelete();
			}
		}
	}

	return (
		<button
			class={`collections-bar__chip hint--bottom hint--rounded ${isActive ? 'collections-bar__chip--active' : ''}`}
			onClick={onSelect}
			onDblClick={handleDoubleClick}
			onContextMenu={handleContextMenu}
			onKeyDown={handleKeyDown}
			aria-label="Right-click to delete, double-click to rename"
		>
			{collection.name}
			{itemCount > 0 ? (
				<span class="collections-bar__chip-count">{itemCount}</span>
			) : null}
		</button>
	);
}
