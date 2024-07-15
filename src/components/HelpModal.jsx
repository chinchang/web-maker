import { Icon } from './Icons';
import Modal from './Modal';
import { Stack, VStack } from './Stack';
import { Button } from './common';
import { Trans } from '@lingui/macro';

export function HelpModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<h1>
				<Stack gap={1} align="center">
					<div class="web-maker-with-tag">Web Maker</div>
					<span className="badge">{props.version}</span>
				</Stack>
			</h1>

			<div>
				<p>
					<Trans>
						Made with <span style="margin-right: 8px;">💖</span>&{' '}
						<span style="margin-right: 0.2rem;position:relative;top:-3px;">
							{' '}
							🙌
						</span>{' '}
						by{' '}
						<a
							href="https://twitter.com/chinchang457"
							target="_blank"
							rel="noopener noreferrer"
						>
							Kushagra Gour
						</a>
					</Trans>
				</p>
				<p>
					<a href="/docs" target="_blank" rel="noopener noreferrer">
						<Trans>Read the documentation.</Trans>
					</a>
				</p>
				<p>
					<Trans>
						Tweet out your feature requests, comments & suggestions to{' '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://twitter.com/webmakerApp"
						>
							@webmakerApp
						</a>
					</Trans>
					.
				</p>
				<p>
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
				<p style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
					<a
						href="http://twitter.com/share?url=https://webmaker.app&text=Web Maker - A blazing fast %26 offline frontend playground! via @webmakerApp&related=webmakerApp&hashtags=web,frontend,playground,offline"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<Icon name="twitter-icon" />
						<Trans>Share Web Maker</Trans>
					</a>{' '}
					<a
						href="https://chromewebstore.google.com/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#heart-icon" />
						</svg>
						<Trans>Review Web Maker</Trans>
					</a>{' '}
					<a
						href="https://github.com/chinchang/web-maker/discussions"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#chat-icon" />
						</svg>
						<Trans>Discuss</Trans>
					</a>{' '}
					<a
						href="https://github.com/chinchang/web-maker/issues"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#bug-icon" />
						</svg>
						<Trans>Report a bug</Trans>
					</a>
					<a
						href="mailto:chinchang457@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<Icon name="email" />
						<Trans>Mail me</Trans>
					</a>
				</p>

				<p>
					<details>
						<summary>
							<h3 class="d-i">
								<Trans>See awesome libraries used</Trans>
							</h3>
						</summary>
						<ul>
							<li>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://kushagragour.in/lab/hint/"
								>
									Hint.css
								</a>{' '}
								&
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/chinchang/screenlog.js"
								>
									{' '}
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
				</p>

				<VStack gap={1} align="stretch" fullWidth={true}>
					<h3>
						<Trans>License</Trans>
					</h3>
					<p>
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
					</p>
				</VStack>
			</div>
		</Modal>
	);
}
