import { h } from 'preact';
import Modal from './Modal';
import { ItemTile } from './ItemTile';
import templates from '../templateList';

export function CreateNewModal({
	show,
	closeHandler,
	onBlankTemplateSelect,
	onTemplateSelect
}) {
	return (
		<Modal show={show} closeHandler={closeHandler} smll>
			<div class="tac">
				<button className="btn" onClick={onBlankTemplateSelect}>
					Start a blank creation
				</button>
			</div>
			<hr />
			Or choose from a template:
			<div class="saved-items-pane__container">
				{templates.map(template => (
					<ItemTile
						item={template}
						focusable
						onClick={onTemplateSelect.bind(null, template)}
					/>
				))}
			</div>
		</Modal>
	);
}
