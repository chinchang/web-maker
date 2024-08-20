import { Button } from './common';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { ProBadge } from './ProBadge';
import { HStack } from './Stack';
import { useEffect, useState } from 'preact/hooks';
import { DropdownMenu } from './Dropdown';

const JS13K = props => {
	const [daysLeft, setDaysLeft] = useState(0);

	useEffect(() => {
		const compoStartDate = new Date('August 13 2024 11:00 GMT');
		const compoEndDate = new Date('September 13 2024 11:00 GMT');
		const now = new Date();
		if (+compoStartDate > +now) {
			const _daysLeft = Math.floor((compoStartDate - now) / 1000 / 3600 / 24);
			setDaysLeft(_daysLeft);
		} else if (+compoEndDate > +now) {
			const _daysLeft = Math.floor((compoEndDate - now) / 1000 / 3600 / 24);
			setDaysLeft(_daysLeft);
		}
	}, []);

	const codeSizeInKb = props.codeSize ? (props.codeSize / 1024).toFixed(2) : 0;

	return (
		<div
			role="button"
			className="flex flex-v-center"
			tabIndex="0"
			onClick={props.onClick}
			onBlur={props.onBlur}
		>
			<img src="assets/js13kgames.png" alt="JS13K Games logo" height="24" />{' '}
			<div className="footer__js13k-days-left">{daysLeft} days to go</div>
			<div
				className="footer__js13k-code-size"
				style={{
					color: codeSizeInKb > 10 ? 'crimson' : 'limegreen'
				}}
			>
				{codeSizeInKb} KB/ 13KB
			</div>
			<span
				className="caret"
				style={{
					transition: '0.3s ease',
					transformOrigin: 'center 2px',
					transform: props.isOpen ? 'rotate(180deg)' : ''
				}}
			/>
		</div>
	);
};

export const Footer = props => {
	const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] =
		useState(false);
	const [isJs13kDropdownOpen, setIsJs13kDropdownOpen] = useState(false);

	function layoutBtnClickhandler(layoutId) {
		props.layoutBtnClickHandler(layoutId);
	}

	function js13kClickHandler() {
		// console.log(999);
		setIsJs13kDropdownOpen(!isJs13kDropdownOpen);
	}

	return (
		<I18n>
			{({ i18n }) => (
				<div id="footer" class="footer">
					<div>
						<a href="/" target="_blank" rel="noopener noreferrer">
							<div class="logo" />
						</a>
						&copy;
						<span class="web-maker-with-tag">Web Maker</span> &nbsp;&nbsp;
						<Button
							onClick={props.helpBtnClickHandler}
							data-event-category="ui"
							data-event-action="helpButtonClick"
							class="footer__link  hint--rounded  hint--top-right"
							aria-label={i18n._(t`Help`)}
						>
							<svg
								style="width:20px; height:20px; vertical-align:text-bottom"
								viewBox="0 0 24 24"
							>
								<path d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
							</svg>
						</Button>
						<Button
							onClick={props.keyboardShortcutsBtnClickHandler}
							data-event-category="ui"
							data-event-action="keyboardShortcutButtonClick"
							class="footer__link hint--rounded  hint--top-right hide-on-mobile"
							aria-label={i18n._(t`Keyboard shortcuts`)}
						>
							<svg
								style={{
									width: '20px',
									height: '20px',
									verticalAlign: 'text-bottom'
								}}
							>
								<use xlinkHref="#keyboard-icon" />
							</svg>
						</Button>
						<a
							class="footer__link  hint--rounded  hint--top-right"
							aria-label={i18n._(t`Tweet about 'Web Maker'`)}
							href="http://twitter.com/share?url=https://webmaker.app&text=Web Maker - A blazing fast %26 offline frontend playground! via @webmakerApp&related=webmakerApp&hashtags=web,frontend,playground,offline"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg
								style={{
									width: '20px',
									height: '20px',
									verticalAlign: 'text-bottom'
								}}
							>
								<use xlinkHref="#twitter-icon" />
							</svg>
						</a>
						{props.user?.isPro ? (
							<Button
								onClick={props.proBtnClickHandler}
								data-event-category="ui"
								data-event-action="manageProFooterBtnClick"
								class="footer__link  ml-1  hint--rounded  hint--top-right hide-on-mobile support-link"
								aria-label={i18n._(t`Manage your PRO subscription`)}
							>
								<HStack gap={1}>
									<Trans>Manage</Trans>
									<ProBadge />
								</HStack>
							</Button>
						) : (
							<Button
								onClick={props.proBtnClickHandler}
								data-event-category="ui"
								data-event-action="proFooterBtnClick"
								class="footer__link  ml-1  hint--rounded  hint--top-right hide-on-mobile support-link"
								aria-label={i18n._(
									t`Upgrade to PRO and get some advanced superpowers!`
								)}
							>
								<HStack gap={1}>
									<Trans>Get</Trans>
									<ProBadge />
								</HStack>
							</Button>
						)}
					</div>

					{props.prefs.isJs13kModeOn ? (
						<div class="flex flex-v-center">
							<JS13K
								isOpen={isJs13kDropdownOpen}
								codeSize={props.codeSize}
								onClick={js13kClickHandler}
								onBlur={() =>
									setTimeout(() => setIsJs13kDropdownOpen(false), 300)
								}
							/>
							{isJs13kDropdownOpen && (
								<div className="js13k__dropdown">
									<button
										class="btn"
										style={{
											width: '200px',
											display: 'block',
											marginBottom: '16px'
										}}
										onClick={props.onJs13KDownloadBtnClick}
									>
										<Trans>Download game as zip</Trans>
									</button>
									<a
										class="btn"
										rel="noopener"
										style={{
											width: '200px',
											display: 'block',
											marginBottom: '16px'
										}}
										href="https://pasteboard.co/"
										target="_blank"
									>
										<Trans>Upload Image</Trans>
									</a>
									<button
										class="btn"
										style={{ width: '200px', display: 'block' }}
										onClick={props.onJs13KHelpBtnClick}
									>
										<Trans>Help</Trans>
									</button>
								</div>
							)}
						</div>
					) : null}

					<div class="footer__right">
						<DropdownMenu
							triggerText="More"
							menuItems={[
								{
									label: 'Download HTML',
									onClick: () => {
										props.saveHtmlBtnClickHandler();
									}
								},
								{
									label: 'Download HTML (assets inlined)',
									onClick: () => {
										props.saveHtmlBtnClickHandler(true);
									}
								}
							]}
							position="top"
							btnProps={{
								id: 'saveHtmlBtn',
								className:
									'mode-btn  hint--rounded  hint--top-left hide-on-mobile hide-in-file-mode',
								ariaLabel: i18n._(t`Save as HTML file`)
							}}
							btnContent={
								<svg viewBox="0 0 24 24">
									<path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
								</svg>
							}
						/>

						<svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
							<symbol id="codepen-logo" viewBox="0 0 120 120">
								<path
									class="outer-ring"
									d="M60.048 0C26.884 0 0 26.9 0 60.048s26.884 60 60 60.047c33.163 0 60.047-26.883 60.047-60.047 S93.211 0 60 0z M60.048 110.233c-27.673 0-50.186-22.514-50.186-50.186S32.375 9.9 60 9.9 c27.672 0 50.2 22.5 50.2 50.186S87.72 110.2 60 110.233z"
								/>
								<path
									class="inner-box"
									d="M97.147 48.319c-0.007-0.047-0.019-0.092-0.026-0.139c-0.016-0.09-0.032-0.18-0.056-0.268 c-0.014-0.053-0.033-0.104-0.05-0.154c-0.025-0.078-0.051-0.156-0.082-0.232c-0.021-0.053-0.047-0.105-0.071-0.156 c-0.033-0.072-0.068-0.143-0.108-0.211c-0.029-0.051-0.061-0.1-0.091-0.148c-0.043-0.066-0.087-0.131-0.135-0.193 c-0.035-0.047-0.072-0.094-0.109-0.139c-0.051-0.059-0.104-0.117-0.159-0.172c-0.042-0.043-0.083-0.086-0.127-0.125 c-0.059-0.053-0.119-0.104-0.181-0.152c-0.048-0.037-0.095-0.074-0.145-0.109c-0.019-0.012-0.035-0.027-0.053-0.039L61.817 23.5 c-1.072-0.715-2.468-0.715-3.54 0L24.34 46.081c-0.018 0.012-0.034 0.027-0.053 0.039c-0.05 0.035-0.097 0.072-0.144 0.1 c-0.062 0.049-0.123 0.1-0.181 0.152c-0.045 0.039-0.086 0.082-0.128 0.125c-0.056 0.055-0.108 0.113-0.158 0.2 c-0.038 0.045-0.075 0.092-0.11 0.139c-0.047 0.062-0.092 0.127-0.134 0.193c-0.032 0.049-0.062 0.098-0.092 0.1 c-0.039 0.068-0.074 0.139-0.108 0.211c-0.024 0.051-0.05 0.104-0.071 0.156c-0.031 0.076-0.057 0.154-0.082 0.2 c-0.017 0.051-0.035 0.102-0.05 0.154c-0.023 0.088-0.039 0.178-0.056 0.268c-0.008 0.047-0.02 0.092-0.025 0.1 c-0.019 0.137-0.029 0.275-0.029 0.416V71.36c0 0.1 0 0.3 0 0.418c0.006 0 0 0.1 0 0.1 c0.017 0.1 0 0.2 0.1 0.268c0.015 0.1 0 0.1 0.1 0.154c0.025 0.1 0.1 0.2 0.1 0.2 c0.021 0.1 0 0.1 0.1 0.154c0.034 0.1 0.1 0.1 0.1 0.213c0.029 0 0.1 0.1 0.1 0.1 c0.042 0.1 0.1 0.1 0.1 0.193c0.035 0 0.1 0.1 0.1 0.139c0.05 0.1 0.1 0.1 0.2 0.2 c0.042 0 0.1 0.1 0.1 0.125c0.058 0.1 0.1 0.1 0.2 0.152c0.047 0 0.1 0.1 0.1 0.1 c0.019 0 0 0 0.1 0.039L58.277 96.64c0.536 0.4 1.2 0.5 1.8 0.537c0.616 0 1.233-0.18 1.77-0.537 l33.938-22.625c0.018-0.012 0.034-0.027 0.053-0.039c0.05-0.035 0.097-0.072 0.145-0.109c0.062-0.049 0.122-0.1 0.181-0.152 c0.044-0.039 0.085-0.082 0.127-0.125c0.056-0.055 0.108-0.113 0.159-0.172c0.037-0.045 0.074-0.09 0.109-0.139 c0.048-0.062 0.092-0.127 0.135-0.193c0.03-0.049 0.062-0.098 0.091-0.146c0.04-0.07 0.075-0.141 0.108-0.213 c0.024-0.051 0.05-0.102 0.071-0.154c0.031-0.078 0.057-0.156 0.082-0.234c0.017-0.051 0.036-0.102 0.05-0.154 c0.023-0.088 0.04-0.178 0.056-0.268c0.008-0.045 0.02-0.092 0.026-0.137c0.018-0.139 0.028-0.277 0.028-0.418V48.735 C97.176 48.6 97.2 48.5 97.1 48.319z M63.238 32.073l25.001 16.666L77.072 56.21l-13.834-9.254V32.073z M56.856 32.1 v14.883L43.023 56.21l-11.168-7.471L56.856 32.073z M29.301 54.708l7.983 5.34l-7.983 5.34V54.708z M56.856 88.022L31.855 71.4 l11.168-7.469l13.833 9.252V88.022z M60.048 67.597l-11.286-7.549l11.286-7.549l11.285 7.549L60.048 67.597z M63.238 88.022V73.14 l13.834-9.252l11.167 7.469L63.238 88.022z M90.794 65.388l-7.982-5.34l7.982-5.34V65.388z"
								/>
							</symbol>
						</svg>

						<button
							onClick={props.codepenBtnClickHandler}
							id="codepenBtn"
							class="mode-btn  hint--rounded  hint--top-left  hide-on-mobile hide-in-file-mode"
							aria-label={i18n._(t`Edit on CodePen`)}
						>
							<svg>
								<use xlinkHref="#codepen-logo" />
							</svg>
						</button>

						<button
							id="screenshotBtn"
							class="mode-btn  hint--rounded  hint--top-left show-when-extension"
							onClick={props.screenshotBtnClickHandler}
							aria-label={i18n._(t`Take screenshot of preview`)}
						>
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
							</svg>
						</button>

						<div class="footer__separator hide-on-mobile" />

						<button
							onClick={() => layoutBtnClickhandler(1)}
							id="layoutBtn1"
							class="mode-btn hide-on-mobile hide-in-file-mode"
							aria-label={i18n._(t`Switch to layout with preview on right`)}
						>
							<svg viewBox="0 0 100 100" style="transform:rotate(-90deg)">
								<use xlinkHref="#mode-icon" />
							</svg>
						</button>
						<button
							onClick={() => layoutBtnClickhandler(2)}
							id="layoutBtn2"
							class="mode-btn hide-on-mobile hide-in-file-mode"
							aria-label={i18n._(t`Switch to layout with preview on bottom`)}
						>
							<svg viewBox="0 0 100 100">
								<use xlinkHref="#mode-icon" />
							</svg>
						</button>
						<button
							onClick={() => layoutBtnClickhandler(3)}
							id="layoutBtn3"
							class="mode-btn hide-on-mobile hide-in-file-mode"
							aria-label={i18n._(t`Switch to layout with preview on left`)}
						>
							<svg viewBox="0 0 100 100" style="transform:rotate(90deg)">
								<use xlinkHref="#mode-icon" />
							</svg>
						</button>
						<button
							onClick={() => layoutBtnClickhandler(5)}
							id="layoutBtn5"
							class="mode-btn hide-on-mobile hide-in-file-mode"
							aria-label={i18n._(t`Switch to layout with all vertical panes`)}
						>
							<svg viewBox="0 0 100 100">
								<use xlinkHref="#vertical-mode-icon" />
							</svg>
						</button>
						<button
							onClick={() => layoutBtnClickhandler(4)}
							id="layoutBtn4"
							class="mode-btn hint--top-left hint--rounded hide-on-mobile"
							aria-label={i18n._(t`Toggle full screen preview`)}
						>
							<svg viewBox="0 0 100 100">
								<rect x="0" y="0" width="100" height="100" />
							</svg>
						</button>
						<button
							class="mode-btn hint--top-left hint--rounded hide-on-mobile"
							aria-label={i18n._(t`Detach preview`)}
							onClick={props.detachedPreviewBtnHandler}
						>
							<svg viewBox="0 0 24 24">
								<path d="M22,17V7H6V17H22M22,5A2,2 0 0,1 24,7V17C24,18.11 23.1,19 22,19H16V21H18V23H10V21H12V19H6C4.89,19 4,18.11 4,17V7A2,2 0 0,1 6,5H22M2,3V15H0V3A2,2 0 0,1 2,1H20V3H2Z" />
							</svg>
						</button>

						<div class="footer__separator" />

						<button
							onClick={props.notificationsBtnClickHandler}
							id="notificationsBtn"
							class={`notifications-btn  mode-btn  hint--top-left  hint--rounded ${
								props.hasUnseenChangelog ? 'has-new' : ''
							}`}
							aria-label={i18n._(t`See changelog`)}
						>
							<svg viewBox="0 0 24 24">
								<path d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
							</svg>
							<span class="notifications-btn__dot" />
						</button>
						<Button
							onClick={props.settingsBtnClickHandler}
							data-event-category="ui"
							data-event-action="settingsBtnClick"
							class="mode-btn  hint--top-left  hint--rounded"
							aria-label={i18n._(t`Settings`)}
						>
							<svg>
								<use xlinkHref="#settings-icon" />
							</svg>
						</Button>
					</div>
				</div>
			)}
		</I18n>
	);
};
