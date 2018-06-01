import { h, Component } from 'preact';
import { getHumanDate } from '../utils';

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
						My Library{' '}
						<span id="savedItemCountEl">
							{this.props.items ? this.props.items.length : 0}
						</span>
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

				<div id="js-saved-items-wrap" class="saved-items-pane__container">
					{this.props.items &&
						this.props.items.length &&
						this.props.items.map(item => (
							<div
								class="js-saved-item-tile saved-item-tile"
								data-item-id={item.id}
							>
								<div class="saved-item-tile__btns">
									<a
										class="js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium"
										aria-label="Creates a duplicate of this creation (Ctrl/⌘ + F)"
									>
										Fork<span class="show-when-selected">(Ctrl/⌘ + F)</span>
									</a>
									<a
										class="js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left"
										aria-label="Remove"
									>
										X
									</a>
								</div>
								<h3 class="saved-item-tile__title">{item.title}</h3>
								<span class="saved-item-tile__meta">
									Last updated: {getHumanDate(item.updatedOn)}
								</span>
							</div>
						))}
					{!(this.props.items && this.props.items.length) && (
						<h2 class="opacity--30">Nothing saved here.</h2>
					)}
				</div>
			</div>
		);
	}
}
