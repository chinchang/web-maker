import { h, Component } from 'preact';
import { Inspector, chromeDark } from 'react-inspector';
import { Trans } from '@lingui/macro';
import { PureComponent } from 'preact-compat';

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
			<Inspector theme={theme} theme="chromeDark" data={this.props.data} />
		);
	}
}

export class Console extends PureComponent {
	componentDidUpdate(previousProps) {
		if (this.props.logs !== previousProps.logs) {
			// Scroll down after new log dom is inserted
			setTimeout(() => {
				this.logContainerEl.scrollTop = this.logContainerEl.scrollHeight;
			}, 1);
		}
	}

	render() {
		const {
			logs,
			isConsoleOpen,
			onConsoleHeaderDblClick,
			onClearConsoleBtnClick,
			toggleConsole,
			onEvalInputKeyup
		} = this.props;

		return (
			<div
				id="consoleEl"
				class={`console ${isConsoleOpen ? '' : 'is-minimized'}`}
			>
				<div id="consoleLogEl" class="console__log">
					<div
						class="js-console__header  code-wrap__header"
						title="Double click to toggle console"
						onDblClick={onConsoleHeaderDblClick}
					>
						<span class="code-wrap__header-label">
							<Trans>Console</Trans>
							<span class="count-label">{logs.length}</span>
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
					<ul
						class="console__items"
						ref={el => {
							this.logContainerEl = el;
						}}
					>
						{logs.map(log => (
							<LogRow data={log} />
						))}
					</ul>
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
}
