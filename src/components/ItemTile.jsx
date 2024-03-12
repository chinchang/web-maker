import { h } from 'preact';
import { getHumanDate } from '../utils';
import Modal from './Modal';
import { HStack } from './Stack';

export function ItemTile({
	item,
	onClick,
	onForkBtnClick,
	onRemoveBtnClick,
	onToggleVisibilityBtnClick,
	focusable,
	inline
}) {
	return (
		<div
			role={focusable ? 'button' : null}
			tabindex={focusable ? 0 : null}
			class={`js-saved-item-tile saved-item-tile ${
				inline ? 'saved-item-tile--inline' : ''
			}`}
			data-item-id={item.id}
			onClick={onClick}
		>
			<div class="saved-item-tile__btns">
				{onToggleVisibilityBtnClick ? (
					<button
						class="js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium"
						aria-label="Creates a duplicate of this creation (Ctrl/⌘ + F)"
						onClick={onToggleVisibilityBtnClick}
					>
						Toggle Visibility
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							{item.isPublic ? (
								<path d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z" />
							) : (
								<path d="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z" />
							)}
						</svg>
					</button>
				) : null}
				{onForkBtnClick ? (
					<button
						class="js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium"
						aria-label="Creates a duplicate of this creation (Ctrl/⌘ + F)"
						onClick={onForkBtnClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M13 14c-3.36 0-4.46 1.35-4.82 2.24C9.25 16.7 10 17.76 10 19a3 3 0 0 1-3 3 3 3 0 0 1-3-3c0-1.31.83-2.42 2-2.83V7.83A2.99 2.99 0 0 1 4 5a3 3 0 0 1 3-3 3 3 0 0 1 3 3c0 1.31-.83 2.42-2 2.83v5.29c.88-.65 2.16-1.12 4-1.12 2.67 0 3.56-1.34 3.85-2.23A3.006 3.006 0 0 1 14 7a3 3 0 0 1 3-3 3 3 0 0 1 3 3c0 1.34-.88 2.5-2.09 2.86C17.65 11.29 16.68 14 13 14m-6 4a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1M7 4a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m10 2a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1Z" />
						</svg>
						Fork<span class="show-when-selected">(Ctrl/⌘ + F)</span>
					</button>
				) : null}
				{onRemoveBtnClick ? (
					<button
						class="js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left"
						aria-label="Remove"
						onClick={onRemoveBtnClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z" />
						</svg>
					</button>
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
				{item.files ? (
					<div
						class="ml-1 flex-shrink-0 hint--left"
						aria-label="Files mode creation"
					>
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z"
							/>
						</svg>
					</div>
				) : null}
			</div>
			<div class="saved-item-tile__meta">
				<HStack justify="space-between">
					<div>
						{item.updatedOn ? (
							<>
								Last updated:{' '}
								<time dateTime={item.updatedOn}>
									{getHumanDate(item.updatedOn)}
								</time>
							</>
						) : null}
					</div>
					<div>right</div>
				</HStack>
			</div>
		</div>
	);
}
