import { h } from 'preact';
import { Button } from './common';
import { Trans, NumberFormat, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { ProBadge } from './ProBadge';
import { HStack, Stack } from './Stack';
import { Icon } from './Icons';

const DEFAULT_PROFILE_IMG =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'/%3E%3C/svg%3E";

export function MainHeader({
	user,
	currentItem,
	titleInputBlurHandler,
	runBtnClickHandler,
	assetsBtnHandler,
	isFileMode,
	onItemFork,
	multiplayerSession,
	multiplayerParticipants,
	multiplayerConnectionStatus,
	onMultiplayerBtnClick,
	onMultiplayerModalOpen,
	onProModalOpen,
	...props
}) {
	const isAutoPreviewOn =
		window.forcedSettings.autoPreview !== undefined
			? window.forcedSettings
			: props.isAutoPreviewOn;

	const isNotMine =
		currentItem.createdBy && user?.uid !== currentItem.createdBy;

	// console.log(33, currentItem, user?.uid);
	return (
		<I18n>
			{({ i18n }) => (
				<div class="main-header">
					<input
						type="text"
						id="titleInput"
						title="Click to edit"
						class="item-title-input"
						value={currentItem.title}
						onBlur={titleInputBlurHandler}
					/>
					<div class="main-header__btn-wrap  flex  flex-v-center">
						{!isAutoPreviewOn && (
							<button
								class="btn btn btn--dark flex flex-v-center hint--rounded hint--bottom-left"
								aria-label={i18n._(t`Run preview (Ctrl/⌘ + Shift + 5)`)}
								onClick={runBtnClickHandler}
							>
								<svg>
									<use xlinkHref="#play-icon" />
								</svg>
								<Trans>Run</Trans>
							</button>
						)}
						<Button
							onClick={assetsBtnHandler}
							data-event-category="ui"
							data-event-action="addLibraryButtonClick"
							data-testid="addLibraryButton"
							class="btn btn--dark hint--rounded hint--bottom-left"
							aria-label={i18n._(t`Upload/Use assets`)}
						>
							<Trans>Assets</Trans>
						</Button>
						{!isFileMode && (
							<Button
								onClick={props.addLibraryBtnHandler}
								data-event-category="ui"
								data-event-action="addLibraryButtonClick"
								data-testid="addLibraryButton"
								class="btn btn--dark hint--rounded hint--bottom-left"
								aria-label={i18n._(t`Add a JS/CSS library`)}
							>
								<Trans>Add library</Trans>{' '}
								<span
									id="js-external-lib-count"
									style={`display:${
										props.externalLibCount ? 'inline' : 'none'
									}`}
									class="count-label"
								>
									<NumberFormat value={props.externalLibCount} />
								</span>
							</Button>
						)}

						{!isNotMine && (
							<button
								class="btn btn--dark hint--bottom-left"
								aria-label={i18n._(t`Share this creation publicly`)}
								data-testid="newButton"
								onClick={props.shareBtnHandler}
							>
								<svg
									viewBox="0 0 24 24"
									style={{
										fill: currentItem.isPublic ? 'limegreen' : 'currentColor'
									}}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08M18 4C18.55 4 19 4.45 19 5S18.55 6 18 6 17 5.55 17 5 17.45 4 18 4M6 13C5.45 13 5 12.55 5 12S5.45 11 6 11 7 11.45 7 12 6.55 13 6 13M18 20C17.45 20 17 19.55 17 19S17.45 18 18 18 19 18.45 19 19 18.55 20 18 20Z" />
								</svg>
								{currentItem.isPublic ? null : <Trans>Share</Trans>}
							</button>
						)}

						<button
							class="btn btn--dark hint--bottom-left"
							aria-label={i18n._(t`Fork this creation`)}
							data-testid="headerForkButton"
							onClick={onItemFork}
						>
							<Icon name="fork" />
							<Trans>Fork</Trans>
						</button>

						{!isFileMode && (
							<button
								class={`btn btn--dark hint--bottom-left ${multiplayerSession ? 'btn--multiplayer-active' : ''}`}
								aria-label={
									multiplayerSession
										? i18n._(t`Multiplayer session active`)
										: i18n._(t`Start multiplayer collaboration session`)
								}
								data-testid="multiplayerButton"
								onClick={
									multiplayerSession
										? onMultiplayerModalOpen
										: user?.isPro
											? onMultiplayerBtnClick
											: onProModalOpen
								}
							>
								{multiplayerSession ? (
									<>
										<span
											class="multiplayer-status-dot"
											data-status={multiplayerConnectionStatus}
										/>
										<span class="multiplayer-avatars">
											{multiplayerParticipants.slice(0, 3).map((p, i) => (
												<span
													key={p.clientId}
													class="multiplayer-avatar"
													style={{
														backgroundColor: p.color,
														zIndex: 3 - i
													}}
													title={p.name}
												>
													{p.name.charAt(0).toUpperCase()}
												</span>
											))}
										</span>
										<span class="multiplayer-count">
											{multiplayerParticipants.length}
										</span>
									</>
								) : (
									<>
										<svg viewBox="0 0 24 24" width="18" height="18">
											<path
												fill="currentColor"
												d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
											/>
										</svg>
										<Trans>Collab</Trans>
										{!user?.isPro && <ProBadge />}
									</>
								)}
							</button>
						)}

						<button
							class="btn btn--dark hint--rounded hint--bottom-left"
							aria-label={i18n._(t`Start a new creation`)}
							data-testid="newButton"
							onClick={props.newBtnHandler}
						>
							<svg viewBox="0 0 24 24">
								<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
							</svg>
							<Trans>New</Trans>
						</button>

						{!isNotMine && (
							<button
								id="saveBtn"
								class={`btn btn--dark hint--rounded hint--bottom-left ${
									props.isSaving ? 'is-loading' : ''
								} ${props.unsavedEditCount ? 'is-marked' : 0}`}
								aria-label={i18n._(t`Save current creation (Ctrl/⌘ + S)`)}
								onClick={props.saveBtnHandler}
							>
								<svg viewBox="0 0 24 24">
									<path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
								</svg>
								<svg class="btn-loader" width="15" height="15" stroke="#fff">
									<use xlinkHref="#loader-icon" />
								</svg>
								<Trans>Save</Trans>
							</button>
						)}
						<button
							id="openItemsBtn"
							class={`btn btn--dark hint--rounded hint--bottom-left ${
								props.isFetchingItems ? 'is-loading' : ''
							}`}
							aria-label={i18n._(t`Open a saved creation (Ctrl/⌘ + O)`)}
							onClick={props.openBtnHandler}
						>
							<svg viewBox="0 0 24 24">
								<path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
							</svg>
							<svg class="btn-loader" width="15" height="15" stroke="#fff">
								<use xlinkHref="#loader-icon" />
							</svg>
							<Trans>Open</Trans>
						</button>
						{!user ? (
							<Button
								onClick={props.loginBtnHandler}
								data-event-category="ui"
								data-event-action="loginButtonClick"
								data-testid="loginButton"
								class="btn btn--dark"
							>
								<Trans>Login/Signup</Trans>
							</Button>
						) : (
							<Button
								onClick={props.profileBtnHandler}
								data-event-category="ui"
								data-event-action="headerAvatarClick"
								aria-label={i18n._(t`See profile or Logout`)}
								class="btn--dark hint--rounded  hint--bottom-left"
							>
								<HStack gap={1}>
									<img
										id="headerAvatarImg"
										width="20"
										src={user ? user.photoURL || DEFAULT_PROFILE_IMG : ''}
										class="main-header__avatar-img"
									/>
									{user?.isPro ? <ProBadge /> : null}
								</HStack>
							</Button>
						)}
					</div>
				</div>
			)}
		</I18n>
	);
}
