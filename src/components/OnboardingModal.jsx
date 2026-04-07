import { h } from 'preact';
import { Trans } from '@lingui/macro';
import Modal from './Modal.jsx';
import { HStack, VStack } from './Stack.jsx';
import { ProBadge } from './ProBadge';
import { trackEvent } from '../analytics';

function StepNumber({ n }) {
	return <span class="om-step__num">{n}</span>;
}

export function OnboardingModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<VStack classes="om" gap={3} align="stretch">
				<VStack classes="om__header" gap={1} align="center">
					<span class="om__eyebrow">Welcome to</span>
					<svg class="om__arc" viewBox="0 0 520 200" aria-label="Web Maker">
						<defs>
							<path
								id="om-arc-path"
								d="M 40,180 A 380,380 0 0 1 480,180"
								fill="none"
							/>
						</defs>
						<text class="om__arc-text">
							<textPath
								href="#om-arc-path"
								startOffset="50%"
								text-anchor="middle"
							>
								{'WEB MAKER'.split('').map(ch => (
									<tspan class="om__arc-letter">
										{ch === ' ' ? '\u00A0' : ch}
									</tspan>
								))}
							</textPath>
						</text>
					</svg>
					<p class="om__subtitle">
						<Trans>
							A blazing-fast, offline code editor for the web. Three things to
							know before you start.
						</Trans>
					</p>
				</VStack>

				<VStack classes="om__steps" gap={1} align="stretch">
					<HStack
						classes="om-step show-when-app hide-on-mobile"
						gap={2}
						align="flex-start"
					>
						<StepNumber n="01" />
						<VStack gap={1} align="flex-start">
							<span class="om-step__label">
								<Trans>Open anywhere, even offline</Trans>
							</span>
							<p class="om-step__body">
								<Trans>
									Visit <a>https://webmaker.app/create/</a> any time — it works
									offline. Drag the bookmarklet onto your bookmark bar for
									one-click access:
								</Trans>
							</p>
							<a class="bookmarklet" href="https://webmaker.app/create/">
								<svg width="16" height="16" aria-hidden="true">
									<use xlinkHref="#logo" />
								</svg>
								Web Maker
							</a>
						</VStack>
					</HStack>

					<HStack
						classes="om-step show-when-extension"
						gap={2}
						align="flex-start"
					>
						<StepNumber n="01" />
						<VStack gap={1} align="flex-start">
							<span class="om-step__label">
								<Trans>Open from your toolbar</Trans>
							</span>
							<p class="om-step__body">
								<Trans>
									Click the Web Maker icon in the top-right of your browser any
									time you want to start tinkering.
								</Trans>
							</p>
						</VStack>
					</HStack>

					<HStack classes="om-step" gap={2} align="flex-start">
						<StepNumber n="02" />
						<VStack gap={1} align="flex-start">
							<span class="om-step__label">
								<Trans>Make it yours</Trans>
							</span>
							<p class="om-step__body">
								<Trans>
									Customize editor, theme, key bindings and more from the
									settings gear in the bottom-right corner.
								</Trans>
							</p>
						</VStack>
					</HStack>

					<HStack classes="om-step" gap={2} align="flex-start">
						<StepNumber n="03" />
						<VStack gap={1} align="flex-start">
							<span class="om-step__label">
								<Trans>Stay in the loop</Trans>
							</span>
							<p class="om-step__body">
								<Trans>
									Follow{' '}
									<a
										href="https://x.com/intent/follow?screen_name=webmakerApp"
										target="_blank"
										rel="noopener noreferrer"
									>
										@webmakerApp
									</a>{' '}
									for new features and release notes.
								</Trans>
							</p>
						</VStack>
					</HStack>
				</VStack>

				<p class="om__import-note show-when-app">
					<Trans>
						Coming from the Chrome extension?{' '}
						<a
							href="https://medium.com/web-maker/importing-exporting-your-creations-d92e7de5c3dc"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn how to import your creations
						</a>
						.
					</Trans>
				</p>

				<VStack classes="om-pro" gap={1} align="flex-start">
					<HStack gap={1} align="center">
						<ProBadge />
						<span class="om-pro__title">
							<Trans>Want more super-powers?</Trans>
						</span>
					</HStack>
					<p class="om-pro__body">
						<Trans>
							PRO unlocks unlimited public creations, unlimited Files mode
							projects, cloud asset hosting and real-time multiplayer collab.
						</Trans>
					</p>
				</VStack>

				<HStack classes="om__actions" gap={1} justify="flex-end" align="center">
					{props.onProClick && (
						<button
							type="button"
							class="btn om__btn-secondary"
							onClick={() => {
								trackEvent('ui', 'onboardingProClick');
								props.onProClick();
							}}
						>
							<Trans>See PRO</Trans>
						</button>
					)}
					<button
						type="button"
						class="btn btn--primary om__btn-primary"
						onClick={props.closeHandler}
					>
						<Trans>Let's start</Trans>
					</button>
				</HStack>
			</VStack>
		</Modal>
	);
}
