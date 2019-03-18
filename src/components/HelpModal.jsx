import { h } from 'preact';
import Modal from './Modal';
import { Button } from './common';

export function HelpModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<h1>
				<div class="web-maker-with-tag">Web Maker</div>
				<small style="font-size:14px;">{props.version}</small>
			</h1>

			<div>
				<p>
					Made with <span style="margin-right: 8px;">💖</span>&{' '}
					<span style="margin-right: 8px;"> 🙌</span> by{' '}
					<a
						href="https://twitter.com/chinchang457"
						target="_blank"
						rel="noopener noreferrer"
					>
						Kushagra Gour
					</a>
				</p>
				<p>
					<a href="/docs" target="_blank" rel="noopener noreferrer">
						Read the documentation
					</a>
					.
				</p>
				<p>
					Tweet out your feature requests, comments & suggestions to{' '}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://twitter.com/webmakerApp"
					>
						@webmakerApp
					</a>
					.
				</p>
				<p class="show-when-extension">
					Like this extension? Please{' '}
					<a
						href="https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
						target="_blank"
						rel="noopener noreferrer"
					>
						rate it here
					</a>
					.
				</p>
				<p>
					<Button
						aria-label="Support the developer"
						onClick={props.onSupportBtnClick}
						data-event-action="supportDeveloperHelpBtnClick"
						data-event-category="ui"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#gift-icon" />
						</svg>
						Support the developer
					</Button>{' '}
					<a
						aria-label="Rate Web Maker"
						href="https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#heart-icon" />
						</svg>
						Review Web Maker
					</a>{' '}
					<a
						aria-label="Chat"
						href="https://spectrum.chat/web-maker"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#chat-icon" />
						</svg>
						Chat
					</a>{' '}
					<a
						aria-label="Report a Bug"
						href="https://github.com/chinchang/web-maker/issues"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-icon"
					>
						<svg>
							<use xlinkHref="#bug-icon" />
						</svg>
						Report a bug
					</a>
				</p>

				<p>
					<details>
						<summary>
							<h3 class="d-i">See awesome libraries used</h3>
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
					<h3>License</h3>
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
					.
				</p>
			</div>
		</Modal>
	);
}
