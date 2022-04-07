import { h } from 'preact';
import Modal from './Modal';
import { Trans } from '@lingui/macro';

export function KeyboardShortcutsModal({ show, closeHandler }) {
	return (
		<Modal show={show} closeHandler={closeHandler}>
			<h1>
				<Trans>Keyboard Shortcuts</Trans>
			</h1>

			<div class="flex">
				<div>
					<h2>
						<Trans>Global</Trans>
					</h2>
					{/*<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Shift + ?</span>
						<span class="kbd-shortcut__details">See keyboard shortcuts</span>
					</p>*/}
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Shift + 5</span>
						<span class="kbd-shortcut__details">
							<Trans>Refresh preview</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + S</span>
						<span class="kbd-shortcut__details">
							<Trans>Save current creations</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + O</span>
						<span class="kbd-shortcut__details">
							<Trans>Open list of saved creations</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl + L</span>
						<span class="kbd-shortcut__details">
							<Trans>Clear console (works when console input is focused)</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Esc</span>
						<span class="kbd-shortcut__details">
							<Trans>Close saved creations panel & modals</Trans>
						</span>
					</p>
				</div>
				<div class="ml-2">
					<h2>
						<Trans>Editor</Trans>
					</h2>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + F</span>
						<span class="kbd-shortcut__details">
							<Trans>Find</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + G</span>
						<span class="kbd-shortcut__details">
							<Trans>Select next match</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Shift + G</span>
						<span class="kbd-shortcut__details">
							<Trans>Select previous match</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Opt/Alt + F</span>
						<span class="kbd-shortcut__details">
							<Trans>Find & replace</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Shift + Tab</span>
						<span class="kbd-shortcut__details">
							<Trans>Realign code</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + ]</span>
						<span class="kbd-shortcut__details">
							<Trans>Indent code right</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + [</span>
						<span class="kbd-shortcut__details">
							<Trans>Indent code left</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Tab</span>
						<span class="kbd-shortcut__details">
							<Trans>Emmet code completion</Trans>{' '}
							<a
								href="https://emmet.io/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Trans>Read more</Trans>
							</a>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + /</span>
						<span class="kbd-shortcut__details">
							<Trans>Single line comment</Trans>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl + Shift + F</span>
						<span class="kbd-shortcut__details">
							<Trans>Run Prettier</Trans>
						</span>
					</p>
				</div>
			</div>
		</Modal>
	);
}
