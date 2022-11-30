import { h, Component } from 'preact';
import { Inspector, chromeDark } from 'react-inspector';
import { Trans, t, NumberFormat } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { PureComponent } from 'preact/compat';

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
	constructor(props) {
		super(props);
		this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
	}
	componentDidUpdate(previousProps) {
		if (this.props.logs !== previousProps.logs) {
			// Scroll down after new log dom is inserted
			setTimeout(() => {
				this.logContainerEl.scrollTop = this.logContainerEl.scrollHeight;
			}, 1);
		}
	}
	componentWillUnmount() {
		this.endDragging();
	}

	endDragging() {
		if (!this.isDragging) {
			return;
		}

		this.isDragging = false;
		window.consoleEl.style.transition = this.savedTransition;
		window.removeEventListener('mousemove', this.mouseMoveHandler);
		window.removeEventListener('mouseup', this.mouseUpHandler);
	}
	mouseDownHandler(e) {
		if (!this.props.isConsoleOpen) {
			return true;
		}
		this.isDragging = true;
		this.startY = e.pageY;
		this.startHeight = window.consoleEl.getBoundingClientRect().height;
		this.savedTransition = window.getComputedStyle(window.consoleEl).transition;
		window.consoleEl.style.transition = 'none';

		window.addEventListener('mousemove', this.mouseMoveHandler);
		window.addEventListener('mouseup', this.mouseUpHandler);
	}
	mouseUpHandler() {
		this.endDragging();
	}

	mouseMoveHandler(e) {
		if (!this.isDragging) return true;
		const newHeight = this.startHeight + (this.startY - e.pageY);
		window.consoleEl.style.height = `${newHeight}px`;
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
			<I18n>
				{({ i18n }) => (
					<div
						id="consoleEl"
						class={`console ${isConsoleOpen ? '' : 'is-minimized'}`}
					>
						<div id="consoleLogEl" class="console__log">
							<div
								class="js-console__header  code-wrap__header"
								title={i18n._(t`Double click to toggle console`)}
								onDblClick={onConsoleHeaderDblClick}
								onMouseDown={this.mouseDownHandler.bind(this)}
								onMouseUp={this.mouseUpHandler.bind(this)}
							>
								<span class="code-wrap__header-label">
									<Trans>Console</Trans>
									<span class="count-label">
										<NumberFormat value={logs.length} />
									</span>
								</span>
								<div class="code-wrap__header-right-options">
									<a
										class="code-wrap__header-btn"
										title={i18n._(t`Clear console (CTRL + L)`)}
										onClick={onClearConsoleBtnClick}
									>
										<svg>
											<use xlinkHref="#cancel-icon" />
										</svg>
									</a>
									<a
										class="code-wrap__header-btn  code-wrap__collapse-btn"
										title={i18n._(t`Toggle console`)}
										onClick={toggleConsole}
										data-testid="toggleConsole"
									/>
								</div>
							</div>
							<ul
								class="console__items"
								ref={el => {
									this.logContainerEl = el;
								}}
								data-testid="consoleItems"
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
				)}
			</I18n>
		);
	}
}
