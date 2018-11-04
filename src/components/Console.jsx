import { h } from 'preact';
import CodeMirrorBox from './CodeMirrorBox';

export function Console({
	isConsoleOpen,
	onConsoleHeaderDblClick,
	onClearConsoleBtnClick,
	toggleConsole,
	onEvalInputKeyup,
	onReady
}) {
	return (
		<div
			id="consoleEl"
			class={`console hide ${isConsoleOpen ? '' : 'is-minimized'}`}
		>
			<div id="consoleLogEl" class="console__log">
				<div
					class="js-console__header  code-wrap__header"
					title="Double click to toggle console"
					onDblClick={onConsoleHeaderDblClick}
				>
					<span class="code-wrap__header-label">
						Console (<span id="logCountEl">0</span>)
					</span>
					<div class="code-wrap__header-right-options">
						<a
							class="code-wrap__header-btn"
							title="Clear console (CTRL + L)"
							onClick={onClearConsoleBtnClick}
						>
							<svg>
								<use xlinkHref="#cancel-icon" />
							</svg>
						</a>
						<a
							class="code-wrap__header-btn  code-wrap__collapse-btn"
							title="Toggle console"
							onClick={toggleConsole}
						/>
					</div>
				</div>
				<CodeMirrorBox
					options={{
						mode: 'javascript',
						lineWrapping: true,
						theme: 'monokai',
						foldGutter: true,
						readOnly: true,
						gutters: ['CodeMirror-foldgutter']
					}}
					onCreation={el => onReady(el)}
				/>
			</div>
			<div
				id="consolePromptEl"
				class="console__prompt flex flex-v-center flex-shrink-0"
			>
				<svg width="18" height="18" fill="#346fd2">
					<use xlinkHref="#chevron-icon" />
				</svg>
				<input
					tabIndex={isConsoleOpen ? 0 : -1}
					onKeyUp={onEvalInputKeyup}
					class="console-exec-input"
				/>
			</div>
		</div>
	);
}
