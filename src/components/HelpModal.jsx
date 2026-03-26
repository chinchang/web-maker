import { Icon } from './Icons';
import Modal from './Modal';
import { Stack, VStack, HStack } from './Stack';
import { Trans } from '@lingui/macro';

export function HelpModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<VStack gap={3} align="center" classes="help-modal">
				{/* Hero Header */}
				<VStack gap={1} align="center">
					<h1 class="help-modal__title">
						<HStack gap={1} align="center" justify="center">
							Web Maker
							<span class="help-modal__version">{props.version}</span>
						</HStack>
					</h1>
					<p class="help-modal__tagline">
						<Trans>
							Made with <span class="help-modal__emoji">❤️</span>&{' '}
							<span
								class="help-modal__emoji"
								style="position:relative;top:-2px"
							>
								🙌
							</span>{' '}
							by{' '}
							<a
								href="https://x.com/cssmonk"
								target="_blank"
								rel="noopener noreferrer"
							>
								Kushagra Gour
							</a>
						</Trans>
					</p>
				</VStack>

				<div class="help-modal__divider" />

				{/* Quick Links */}
				<VStack gap={1} align="center">
					<p>
						<a
							href="/docs"
							target="_blank"
							rel="noopener noreferrer"
							class="help-modal__docs-link"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
								<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
							</svg>
							<Trans>Read the documentation</Trans>
							<svg
								class="help-modal__arrow"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="5" y1="12" x2="19" y2="12" />
								<polyline points="12 5 19 12 12 19" />
							</svg>
						</a>
					</p>
					<p class="help-modal__subtle-text">
						<Trans>
							Tweet out your feature requests, comments & suggestions to{' '}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://x.com/webmakerApp"
							>
								@webmakerApp
							</a>
						</Trans>
						.
					</p>
					<p class="help-modal__subtle-text">
						<Trans>
							Like this app? Please{' '}
							<a
								href="https://chromewebstore.google.com/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
								target="_blank"
								rel="noopener noreferrer"
							>
								rate it here
							</a>
							.
						</Trans>
					</p>
				</VStack>

				{/* Action Buttons Grid */}
				<HStack gap={1} align="stretch" justify="center" wrap>
					<a
						href="http://x.com/share?url=https://webmaker.app&text=Web Maker - A blazing fast %26 offline frontend playground! via @webmakerApp&related=webmakerApp&hashtags=web,frontend,playground,offline"
						rel="noopener noreferrer"
						class="help-modal__action-card"
					>
						<Icon name="twitter-icon" />
						<span>
							<Trans>Share</Trans>
						</span>
					</a>
					<a
						href="https://chromewebstore.google.com/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
						target="_blank"
						rel="noopener noreferrer"
						class="help-modal__action-card"
					>
						<svg>
							<use xlinkHref="#heart-icon" />
						</svg>
						<span>
							<Trans>Leave a Review</Trans>
						</span>
					</a>
					<a
						href="https://github.com/chinchang/web-maker/discussions"
						target="_blank"
						rel="noopener noreferrer"
						class="help-modal__action-card"
					>
						<svg>
							<use xlinkHref="#chat-icon" />
						</svg>
						<span>
							<Trans>Discuss</Trans>
						</span>
					</a>
					<a
						href="https://github.com/chinchang/web-maker/issues"
						target="_blank"
						rel="noopener noreferrer"
						class="help-modal__action-card"
					>
						<svg>
							<use xlinkHref="#bug-icon" />
						</svg>
						<span>
							<Trans>Report a Bug</Trans>
						</span>
					</a>
					<a
						href="mailto:chinchang457@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						class="help-modal__action-card"
					>
						<Icon name="email" />
						<span>
							<Trans>Contact the Developer</Trans>
						</span>
					</a>
				</HStack>

				<div class="help-modal__divider" />

				{/* Libraries */}
				<details class="help-modal__details">
					<summary class="help-modal__details-summary">
						<Trans>See awesome libraries used</Trans>
						<svg
							class="help-modal__chevron"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<ul class="help-modal__libs">
						<li>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://kushagragour.in/lab/hint/"
							>
								Hint.css
							</a>{' '}
							&{' '}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/chinchang/screenlog.js"
							>
								Screenlog.js
							</a>{' '}
							- By me :)
						</li>
						<li>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://nathancahill.github.io/Split.js/"
							>
								Split.js
							</a>{' '}
							- Nathan Cahill
						</li>
						<li>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://codemirror.net/"
							>
								Codemirror
							</a>{' '}
							- Marijn Haverbeke
						</li>
						<li>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://emmet.io/"
							>
								Emmet
							</a>{' '}
							- Sergey Chikuyonok
						</li>
						<li>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="http://esprima.org/"
							>
								Esprima
							</a>{' '}
							- Ariya Hidayat
						</li>
						<li>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/enjalot/Inlet"
							>
								Inlet
							</a>{' '}
							- Ian Johnson
						</li>
						<li>
							<a target="_blank" rel="noopener noreferrer" href="/">
								Web Maker!
							</a>{' '}
							- whhat!
						</li>
					</ul>
				</details>

				{/* Footer / License */}
				<div class="help-modal__footer">
					<Trans>
						"Web Maker" is{' '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/chinchang/web-maker"
						>
							open-source
						</a>{' '}
						under the{' '}
						<a
							href="https://opensource.org/licenses/MIT"
							target="_blank"
							rel="noopener noreferrer"
						>
							MIT License
						</a>
					</Trans>
				</div>
			</VStack>
		</Modal>
	);
}
