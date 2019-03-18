import { h, Component } from 'preact';
import Modal from './Modal';
import { ItemTile } from './ItemTile';
import templates from '../templateList';
import { BetaTag } from './common';
import { trackEvent } from '../analytics';
import Tabs, { TabPanel } from './Tabs';

export class CreateNewModal extends Component {
	constructor(props) {
		super(props);
		this.modeChangeHandler = this.modeChangeHandler.bind(this);
	}
	modeChangeHandler(selectedtabIndex) {
		this.setState({
			isFileModeSelected: !!selectedtabIndex
		});
		trackEvent(
			'ui',
			'newCreationModeChange',
			!!selectedtabIndex ? 'files' : '3panes'
		);
	}
	render() {
		const {
			show,
			closeHandler,
			onBlankTemplateSelect,
			onBlankFileTemplateSelect,
			onImportGithubRepoSelect,
			onTemplateSelect
		} = this.props;
		const option1 = (
			<div style="flex:1;" class="tac">
				<svg
					width="287px"
					height="80px"
					viewBox="0 0 287 197"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					style={`opacity:${!this.state.isFileModeSelected ? '1' : '0.4'}`}
					aria-hidden="true"
				>
					<g
						id="Page-1"
						stroke="none"
						stroke-width="1"
						fill="none"
						fill-rule="evenodd"
					>
						<g id="codepane" fill="#C5C5C5">
							<rect id="Rectangle" x="0" y="0" width="89" height="80" rx="5" />
						</g>
						<g
							id="codepane"
							transform="translate(99.000000, 0.000000)"
							fill="#C5C5C5"
						>
							<rect id="Rectangle" x="0" y="0" width="89" height="80" rx="5" />
						</g>
						<g
							id="codepane"
							transform="translate(198.000000, 0.000000)"
							fill="#C5C5C5"
						>
							<rect id="Rectangle" x="0" y="0" width="89" height="80" rx="5" />
						</g>
						<g
							id="codepane"
							transform="translate(0.000000, 88.000000)"
							fill="#C5C5C5"
						>
							<rect
								id="Rectangle"
								x="0"
								y="0"
								width="287"
								height="109"
								rx="5"
							/>
						</g>
					</g>
				</svg>
				<p class="mb-0">
					3 separate panes to write HTML, CSS and JavaScript. Good for quickly
					testing something.
				</p>
			</div>
		);
		const option2 = (
			<div style="flex:1" class="tac ml-2">
				<svg
					width="286px"
					height="80px"
					viewBox="0 0 286 196"
					version="1.1"
					style={`opacity:${this.state.isFileModeSelected ? '1' : '0.4'}`}
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<g
						id="Page-1"
						stroke="none"
						stroke-width="1"
						fill="none"
						fill-rule="evenodd"
					>
						<path
							d="M5,0 L49,0 C51.7614237,-5.07265313e-16 54,2.23857625 54,5 L54,191 C54,193.761424 51.7614237,196 49,196 L5,196 C2.23857625,196 1.62803173e-14,193.761424 0,191 L0,5 C-3.38176876e-16,2.23857625 2.23857625,5.07265313e-16 5,0 Z M7.59574468,29 C5.93889043,29 4.59574468,30.3431458 4.59574468,32 C4.59574468,33.6568542 5.93889043,35 7.59574468,35 L39.5106383,35 C41.1674925,35 42.5106383,33.6568542 42.5106383,32 C42.5106383,30.3431458 41.1674925,29 39.5106383,29 L7.59574468,29 Z M7.59574468,71 C5.93889043,71 4.59574468,72.3431458 4.59574468,74 C4.59574468,75.6568542 5.93889043,77 7.59574468,77 L24.5744681,77 C26.2313223,77 27.5744681,75.6568542 27.5744681,74 C27.5744681,72.3431458 26.2313223,71 24.5744681,71 L7.59574468,71 Z M14.4893617,84 C12.8325075,84 11.4893617,85.3431458 11.4893617,87 C11.4893617,88.6568542 12.8325075,90 14.4893617,90 L32.6170213,90 C34.2738755,90 35.6170213,88.6568542 35.6170213,87 C35.6170213,85.3431458 34.2738755,84 32.6170213,84 L14.4893617,84 Z M7.59574468,15 C5.93889043,15 4.59574468,16.3431458 4.59574468,18 C4.59574468,19.6568542 5.93889043,21 7.59574468,21 L32.6170213,21 C34.2738755,21 35.6170213,19.6568542 35.6170213,18 C35.6170213,16.3431458 34.2738755,15 32.6170213,15 L7.59574468,15 Z M13.3404255,42 C11.6835713,42 10.3404255,43.3431458 10.3404255,45 C10.3404255,46.6568542 11.6835713,48 13.3404255,48 L44.106383,48 C45.7632372,48 47.106383,46.6568542 47.106383,45 C47.106383,43.3431458 45.7632372,42 44.106383,42 L13.3404255,42 Z M14.4893617,57 C12.8325075,57 11.4893617,58.3431458 11.4893617,60 C11.4893617,61.6568542 12.8325075,63 14.4893617,63 L45.2553191,63 C46.9121734,63 48.2553191,61.6568542 48.2553191,60 C48.2553191,58.3431458 46.9121734,57 45.2553191,57 L14.4893617,57 Z"
							id="Combined-Shape"
							fill="#C5C5C5"
						/>
						<g
							id="codepane"
							transform="translate(64.000000, 0.000000)"
							fill="#C5C5C5"
						>
							<rect
								id="Rectangle"
								x="0"
								y="0"
								width="106"
								height="196"
								rx="5"
							/>
						</g>
						<g
							id="codepane"
							transform="translate(180.000000, 0.000000)"
							fill="#C5C5C5"
						>
							<rect
								id="Rectangle"
								x="0"
								y="0"
								width="106"
								height="196"
								rx="5"
							/>
						</g>
					</g>
				</svg>
				<p class="mb-0">
					Manage your code in files. Just like you would have files on your
					local machine. <BetaTag />
				</p>
			</div>
		);

		return (
			<Modal show={show} closeHandler={closeHandler}>
				<h1 class="mt-0">Create New</h1>
				<Tabs horizontal onChange={this.modeChangeHandler}>
					<TabPanel label={option1}>
						<div class="d-f fxw-w">
							<button
								type="button"
								class="btn btn--primary"
								style="margin:20px 10px"
								onClick={() => {
									trackEvent('ui', 'startBlankBtnClick');
									onBlankTemplateSelect();
								}}
							>
								Start Blank
							</button>
							{templates.map(template => {
								return (
									<ItemTile
										inline
										item={template}
										focusable
										onClick={onTemplateSelect.bind(null, template, false)}
									/>
								);
							})}
						</div>
					</TabPanel>
					<TabPanel label={option2}>
						<div class="d-f fxw-w">
							<button
								type="button"
								class="btn btn--primary"
								style="margin:20px 10px"
								onClick={() => {
									trackEvent('ui', 'startBlankFileBtnClick');
									onBlankFileTemplateSelect();
								}}
							>
								Start Blank in File Mode
							</button>
							{templates.map(template => {
								if (template.isFileModeSupported) {
									return (
										<ItemTile
											inline
											item={template}
											focusable
											onClick={onTemplateSelect.bind(null, template, true)}
										/>
									);
								}
							})}
						</div>
					</TabPanel>
				</Tabs>

				{/*<div class="tac">
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
				</div>*/}
			</Modal>
		);
	}
}
