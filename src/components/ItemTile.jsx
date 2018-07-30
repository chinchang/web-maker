import { h } from 'preact';
import { getHumanDate } from '../utils';
import Modal from './Modal';

export function ItemTile({
	item,
	onClick,
	itemForkBtnClick,
	itemRemoveBtnClick,
	focusable
}) {
	return (
		<div
			role={focusable ? 'button' : null}
			tabindex={focusable ? 0 : null}
			class="js-saved-item-tile saved-item-tile"
			data-item-id={item.id}
			onClick={onClick}
		>
			<div class="saved-item-tile__btns">
				{itemForkBtnClick ? (
					<a
						class="js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium"
						aria-label="Creates a duplicate of this creation (Ctrl/⌘ + F)"
						onClick={itemForkBtnClick}
					>
						Fork<span class="show-when-selected">(Ctrl/⌘ + F)</span>
					</a>
				) : null}
				{itemRemoveBtnClick ? (
					<a
						class="js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left"
						aria-label="Remove"
						onClick={itemRemoveBtnClick}
					>
						X
					</a>
				) : null}
			</div>
			<div className="flex flex-v-center">
				{item.img ? (
					<div>
						<img
							class="saved-item-tile__img"
							height="40"
							src={item.img}
							alt=""
						/>
					</div>
				) : null}
				<h3 class="saved-item-tile__title">{item.title}</h3>
			</div>
			{item.updatedOn ? (
				<div class="saved-item-tile__meta">
					Last updated: {getHumanDate(item.updatedOn)}
				</div>
			) : null}
		</div>
	);
}
