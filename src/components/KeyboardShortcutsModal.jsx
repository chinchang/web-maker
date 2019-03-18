import { h } from 'preact';
import Modal from './Modal';

export function KeyboardShortcutsModal({ show, closeHandler }) {
	return (
		<Modal show={show} closeHandler={closeHandler}>
			<h1>Keyboard Shortcuts</h1>

			<div class="flex">
				<div>
					<h2>Global</h2>
					{/*<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Shift + ?</span>
						<span class="kbd-shortcut__details">See keyboard shortcuts</span>
					</p>*/}
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Shift + 5</span>
						<span class="kbd-shortcut__details">Refresh preview</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + S</span>
						<span class="kbd-shortcut__details">Save current creations</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + O</span>
						<span class="kbd-shortcut__details">
							Open list of saved creations
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl + L</span>
						<span class="kbd-shortcut__details">
							Clear console (works when console input is focused)
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Esc</span>
						<span class="kbd-shortcut__details">
							Close saved creations panel & modals
						</span>
					</p>
				</div>
				<div class="ml-2">
					<h2>Editor</h2>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + F</span>
						<span class="kbd-shortcut__details">Find</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + G</span>
						<span class="kbd-shortcut__details">Select next match</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Shift + G</span>
						<span class="kbd-shortcut__details">Select previous match</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + Opt/Alt + F</span>
						<span class="kbd-shortcut__details">Find & replace</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Shift + Tab</span>
						<span class="kbd-shortcut__details">Realign code</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + ]</span>
						<span class="kbd-shortcut__details">Indent code right</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + [</span>
						<span class="kbd-shortcut__details">Indent code left</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Tab</span>
						<span class="kbd-shortcut__details">
							Emmet code completion{' '}
							<a
								href="https://emmet.io/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Read more
							</a>
						</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl/⌘ + /</span>
						<span class="kbd-shortcut__details">Single line comment</span>
					</p>
					<p>
						<span class="kbd-shortcut__keys">Ctrl + Shift + F</span>
						<span class="kbd-shortcut__details">Run Prettier</span>
					</p>
				</div>
			</div>
		</Modal>
	);
}
