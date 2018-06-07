import { h, Component } from 'preact';
import { getHumanDate } from '../utils';

export default class SavedItemPane extends Component {
	onCloseIntent() {
		this.props.closeHandler();
	}
	itemClickHandler(item) {
		this.props.itemClickHandler(item);
	}
	itemRemoveBtnClickHandler(item, e) {
		e.stopPropagation();
		this.props.itemRemoveBtnClickHandler(item);
	}
	itemForkBtnClickHandler(item, e) {
		e.stopPropagation();
		this.props.itemForkBtnClickHandler(item);
	}
	keyDownHandler(event) {
		if (!this.props.isOpen) {
			return;
		}

		const isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;
		const isForkKeyPressed = isCtrlOrMetaPressed && event.keyCode === 70;
		const isDownKeyPressed = event.keyCode === 40;
		const isUpKeyPressed = event.keyCode === 38;
		const isEnterKeyPressed = event.keyCode === 13;

		const selectedItemElement = $('.js-saved-item-tile.selected');
		const havePaneItems = $all('.js-saved-item-tile').length !== 0;

		if ((isDownKeyPressed || isUpKeyPressed) && havePaneItems) {
			const method = isDownKeyPressed ? 'nextUntil' : 'previousUntil';

			if (selectedItemElement) {
				selectedItemElement.classList.remove('selected');
				selectedItemElement[method](
					'.js-saved-item-tile:not(.hide)'
				).classList.add('selected');
			} else {
				$('.js-saved-item-tile:not(.hide)').classList.add('selected');
			}
			$('.js-saved-item-tile.selected').scrollIntoView(false);
		}

		if (isEnterKeyPressed && selectedItemElement) {
			const item = this.props.items.filter(
				item => (item.id = selectedItemElement.dataset.itemId)
			)[0];
			this.props.itemClickHandler(item);
		}

		// Fork shortcut inside saved creations panel with Ctrl/⌘ + F
		if (isForkKeyPressed) {
			event.preventDefault();
			const item = this.props.items.filter(
				item => (item.id = selectedItemElement.dataset.itemId)
			)[0];
			this.props.itemForkBtnClickHandler(item);
			trackEvent('ui', 'forkKeyboardShortcut');
		}
	}

	render() {
		return (
			<div
				id="js-saved-items-pane"
				class={`saved-items-pane ${this.props.isOpen ? 'is-open' : ''}`}
				onKeyDown={this.keyDownHandler.bind(this)}
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
								onClick={this.itemClickHandler.bind(this, item)}
							>
								<div class="saved-item-tile__btns">
									<a
										class="js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium"
										aria-label="Creates a duplicate of this creation (Ctrl/⌘ + F)"
										onClick={this.itemForkBtnClickHandler.bind(this, item)}
									>
										Fork<span class="show-when-selected">(Ctrl/⌘ + F)</span>
									</a>
									<a
										class="js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left"
										aria-label="Remove"
										onClick={this.itemRemoveBtnClickHandler.bind(this, item)}
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
