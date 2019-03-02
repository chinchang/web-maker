import { h, Component } from 'preact';
import Modal from './Modal';
import { ItemTile } from './ItemTile';
import templates from '../templateList';
import { Divider } from './common';

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
				<div class="flex">
					<div>
						<button className="btn" onClick={onBlankTemplateSelect}>
							Start a blank creation
						</button>
						<p>
							This gives you 3 separate panes to write HTML, CSS and JavaScript.
							Good for quickly testing something.
						</p>
						<Divider />
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
					</div>
					<div>
						<Divider vertical />
					</div>
					<div>
						<button className="btn" onClick={onBlankFileTemplateSelect}>
							Start a blank creation with files (beta)
						</button>
						<p>
							Manage your code in files. Just like you would have files on your
							local machine.
						</p>
						<Divider />
						Templates coming soon!
					</div>
				</div>
				<div class="tac">
					<p>
						{/*<button
							className="btn"
							onClick={() =>
								this.setState({
									isGhRepoInputVisible: true
								})
							}
						>
							Import Github Repository
						</button>*/}

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
			</Modal>
		);
	}
}
