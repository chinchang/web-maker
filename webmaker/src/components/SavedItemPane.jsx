import { h, Component } from 'preact';

export default class SavedItemPane extends Component {
	onCloseIntent() {
		this.props.closeHandler();
	}
	render() {
		return (
			<div
				id="js-saved-items-pane"
				class={`saved-items-pane ${this.props.isOpen ? 'is-open' : ''}`}
			>
				<button
					onClick={this.onCloseIntent.bind(this)}
					class="btn  saved-items-pane__close-btn"
					id="js-saved-items-pane-close-btn"
				>
					X
				</button>
				<div class="flex flex-v-center" style="justify-content: space-between;">
					<h3>
						My Library <span id="savedItemCountEl" />
					</h3>

					<div class="main-header__btn-wrap">
						<a
							d-click="exportItems"
							href=""
							class="btn btn-icon hint--bottom-left hint--rounded hint--medium"
							aria-label="Export all your creations into a single importable file."
						>
							Export
						</a>
						<a
							d-click="onImportBtnClicked"
							href=""
							class="btn btn-icon hint--bottom-left hint--rounded hint--medium"
							aria-label="Only the file that you export through the 'Export' button can be imported."
						>
							Import
						</a>
					</div>
				</div>
				<input
					type=""
					id="searchInput"
					class="search-input"
					d-input="onSearchInputChange"
					placeholder="Search your creations here..."
				/>

				<div id="js-saved-items-wrap" class="saved-items-pane__container" />
			</div>
		);
	}
}
