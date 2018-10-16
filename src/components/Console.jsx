import { h, Component } from 'preact';

import { ObjectInspector, chromeDark } from 'react-inspector';

class LogRow extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		const theme = {
			...chromeDark,
			...{
				OBJECT_VALUE_STRING_COLOR: 'green',
				BASE_FONT_SIZE: '20px',
				TREENODE_FONT_SIZE: '20px'
			}
		};

		return (
			<ObjectInspector
				theme={theme}
				theme="chromeDark"
				data={this.props.data}
			/>
		);
	}
}

export function Console({
	logs,
	isConsoleOpen,
	onConsoleHeaderDblClick,
	onClearConsoleBtnClick,
	toggleConsole,
	onEvalInputKeyup
}) {
	return (
		<div id="consoleEl" class={`console ${true ? '' : 'is-minimized'}`}>
			<div id="consoleLogEl" class="console__log">
				<div
					class="js-console__header  code-wrap__header"
					title="Double click to toggle console"
					onDblClick={onConsoleHeaderDblClick}
				>
					<span class="code-wrap__header-label">
						Console (<span>{logs.length}</span>)
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
				<ul class="console__items">{logs.map(log => <LogRow data={log} />)}</ul>
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
