import { h } from 'preact';
import Modal from './Modal';
import { Button } from './common';
import { Trans } from '@lingui/macro';

export function HelpModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<h1>
				<div class="web-maker-with-tag">Web Maker</div>
				<small style="font-size:14px;">{props.version}</small>
			</h1>

			<div>
				<p>
					<Trans>
						Made with <span style="margin-right: 8px;">💖</span>&{' '}
						<span style="margin-right: 8px;"> 🙌</span> by{' '}
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
				<p class="show-when-extension">
					<Trans>
						Like this extension? Please{' '}
						<a
							href="https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
							target="_blank"
							rel="noopener noreferrer"
						>
							rate it here
						</a>
						.
					</Trans>
				</p>
				<p>
					<Button
						onClick={props.onSupportBtnClick}
						data-event-action="supportDeveloperHelpBtnClick"
						data-event-category="ui"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#gift-icon" />
						</svg>
						<Trans>Support the developer</Trans>
					</Button>{' '}
					<a
						href="https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
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
						href="https://spectrum.chat/web-maker"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#chat-icon" />
						</svg>
						<Trans>Chat</Trans>
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

				<p>
					<h3>
						<Trans>License</Trans>
					</h3>
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
			</div>
		</Modal>
	);
}
