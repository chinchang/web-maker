import { h } from 'preact';
import Modal from './Modal.jsx';
import { Stack } from './Stack.jsx';

export function OnboardingModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<Stack gap={3} justify="center" align="center">
				<svg width="83" height="32" aria-hidden="true">
					<use xlinkHref="#logo" />
				</svg>
				<h1>Welcome to Web Maker</h1>
			</Stack>

			<div
				class="flex--desk"
				style="margin-top:40px; display:grid; grid-template-columns:1fr 1fr"
			>
				<div class="onboard-step onboard-step--full-width show-when-app hide-on-mobile">
					<Stack gap={1} align="center">
						<svg class="onboard-step__icon" viewBox="0 0 24 24">
							<path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z" />
						</svg>

						<p>
							Open Web Maker anytime by visiting{' '}
							<a>https://webmaker.app/create/</a> - Even when you are offline!
							It just works! 😱 <strong>Drag the following bookmarklet</strong>{' '}
							on your bookmark bar to create a quick access shortcut:
							<a class="ml-1 bookmarklet" href="https://webmaker.app/create/">
								<svg width="20" height="20" aria-hidden="true">
									<use xlinkHref="#logo" />
								</svg>
								Web Maker
							</a>
						</p>
					</Stack>
				</div>
				<div class="onboard-step onboard-step--full-width show-when-extension">
					<Stack gap={1} align="center">
						<svg class="onboard-step__icon" viewBox="0 0 24 24">
							<path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z" />
						</svg>

						<p>
							Open Web Maker anytime by clicking the
							<svg class="relative" style="top:5px;" width="40" height="30">
								<use xlinkHref="#logo" />
							</svg>{' '}
							button in top-right side of your browser.
						</p>
					</Stack>
				</div>

				<div class="onboard-step">
					<Stack gap={1} align="center">
						<svg class="onboard-step__icon" viewBox="0 0 24 24">
							<use xlinkHref="#settings-icon" />
						</svg>

						<p>
							Configure and customize settings by clicking the gear icon (
							<svg
								style="width:18px;height:18px;position:relative;top:3px;fill:#888"
								viewBox="0 0 24 24"
							>
								<use xlinkHref="#settings-icon" />
							</svg>
							) in bottom right of the app.
						</p>
					</Stack>
				</div>
				<div class="onboard-step">
					<Stack gap={1} align="center">
						<svg class="onboard-step__icon" style="stroke-width:0.3px;">
							<use xlinkHref="#twitter-icon" />
						</svg>

						<p>
							Follow{' '}
							<a
								href="https://twitter.com/intent/follow?screen_name=webmakerApp"
								targe="_blank"
								rel="noopener noreferrer"
							>
								@webmakerApp
							</a>{' '}
							to know about the new upcoming features!
						</p>
					</Stack>
				</div>
			</div>

			<p class="tac show-when-app">
				If you are an existing Chrome extension user, you can import your
				creations from there to here.{' '}
				<a
					href="https://medium.com/web-maker/importing-exporting-your-creations-d92e7de5c3dc"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn how to export/import
				</a>
				.
			</p>

			<Stack justify="center">
				<button class="btn btn--primary" onClick={props.closeHandler}>
					Lets start!
				</button>
			</Stack>
		</Modal>
	);
}
