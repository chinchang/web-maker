import { h, Component } from 'preact';
import Modal from './Modal';
import { ItemTile } from './ItemTile';
import templates from '../templateList';

export class CreateNewModal extends Component {
	render() {
		const {
			show,
			closeHandler,
			onBlankTemplateSelect,
			onBlankFileTemplateSelect,
			onImportGithubRepoSelect,
			onTemplateSelect
		} = this.props;
		return (
			<Modal show={show} closeHandler={closeHandler}>
				<div class="tac">
					<button className="btn" onClick={onBlankTemplateSelect}>
						Start a blank creation
					</button>
					<button className="btn" onClick={onBlankFileTemplateSelect}>
						Start a blank files creation
					</button>

					<p>
						<button
							className="btn"
							onClick={() =>
								this.setState({
									isGhRepoInputVisible: true
								})
							}
						>
							Import Github Repository
						</button>

						{this.state.isGhRepoInputVisible ? (
							<div>
								<input ref={el => (this.ghRepoInput = el)} />
								<button
									className="btn"
									onClick={() => {
										onImportGithubRepoSelect(this.ghRepoInput.value);
									}}
								>
									Import
								</button>
							</div>
						) : null}
					</p>
				</div>
				<hr />
				Or choose from a template:
				<div class="saved-items-pane__container">
					{templates.map(template => (
						<ItemTile
							inline
							item={template}
							focusable
							onClick={onTemplateSelect.bind(null, template)}
						/>
					))}
				</div>
			</Modal>
		);
	}
}
