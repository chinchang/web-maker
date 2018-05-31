import { h, Component } from 'preact';
import { editorThemes } from '../editorThemes';

export default class Settings extends Component {
	updateSetting(e) {
		this.props.onChange(e);
	}
	render() {
		return (
			<div>
				<h1>Settings</h1>

				<h3>Indentation</h3>
				<div
					class="line"
					title="I know this is tough, but you have to decide one!"
				>
					<label>
						<input
							type="radio"
							checked="true"
							name="indentation"
							value="spaces"
							onChange={this.updateSetting.bind(this)}
							data-setting="indentWith"
						/>{' '}
						Spaces
					</label>
					<label class="ml-1">
						<input
							type="radio"
							name="indentation"
							value="tabs"
							onChange={this.updateSetting.bind(this)}
							data-setting="indentWith"
						/>{' '}
						Tabs
					</label>
				</div>
				<label class="line" title="">
					Indentation Size{' '}
					<input
						type="range"
						class="va-m ml-1"
						value="2"
						min="1"
						max="7"
						list="indentationSizeList"
						data-setting="indentSize"
						onChange={this.updateSetting.bind(this)}
					/>
					<span id="indentationSizeValueEl" />
					<datalist id="indentationSizeList">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
					</datalist>
				</label>

				<hr />

				<h3>Editor</h3>
				<div class="flex block--mobile">
					<div>
						<label class="line">Default Preprocessors</label>
						<div class="flex line">
							<select
								style="flex:1;margin-left:20px"
								data-setting="htmlMode"
								onChange={this.updateSetting.bind(this)}
							>
								<option value="html">HTML</option>
								<option value="markdown">Markdown</option>
								<option value="jade">Pug</option>
							</select>
							<select
								style="flex:1;margin-left:20px"
								data-setting="cssMode"
								onChange={this.updateSetting.bind(this)}
							>
								<option value="css">CSS</option>
								<option value="scss">SCSS</option>
								<option value="sass">SASS</option>
								<option value="less">LESS</option>
								<option value="stylus">Stylus</option>
								<option value="acss">Atomic CSS</option>
							</select>
							<select
								style="flex:1;margin-left:20px"
								data-setting="jsMode"
								onChange={this.updateSetting.bind(this)}
							>
								<option value="js">JS</option>
								<option value="coffee">CoffeeScript</option>
								<option value="es6">ES6 (Babel)</option>
								<option value="typescript">TypeScript</option>
							</select>
						</div>
						<label class="line">
							Theme
							<select
								style="flex:1;margin:0 20px"
								data-setting="editorTheme"
								onChange={this.updateSetting.bind(this)}
							>
								{editorThemes.map(theme => (
									<option value={theme}>{theme}</option>
								))}
							</select>
						</label>
						<label class="line">
							Font
							<select
								style="flex:1;margin:0 20px"
								data-setting="editorFont"
								onChange={this.updateSetting.bind(this)}
							>
								<option value="FiraCode">Fira Code</option>
								<option value="Inconsolata">Inconsolata</option>
								<option value="Monoid">Monoid</option>
								<option value="FixedSys">FixedSys</option>
								<option disabled="disabled">----</option>
								<option value="other">Other font from system</option>
							</select>
							<input
								id="customEditorFontInput"
								type="text"
								value=""
								placeholder="Custom font name here"
								data-setting="editorCustomFont"
								onChange={this.updateSetting.bind(this)}
							/>
						</label>
						<label class="line">
							Font Size{' '}
							<input
								style="width:70px"
								type="number"
								value={this.props.prefs.fontSize}
								data-setting="fontSize"
								onChange={this.updateSetting.bind(this)}
							/>{' '}
							px
						</label>
						<div class="line">
							Key bindings
							<label class="ml-1">
								<input
									type="radio"
									checked="true"
									name="keymap"
									value="sublime"
									data-setting="keymap"
									onChange={this.updateSetting.bind(this)}
								/>{' '}
								Sublime
							</label>
							<label class="ml-1">
								<input
									type="radio"
									name="keymap"
									value="vim"
									onChange={this.updateSetting.bind(this)}
									data-setting="keymap"
								/>{' '}
								Vim
							</label>
						</div>
					</div>
					<div class="ml-2 ml-0--mobile">
						<label
							class="line"
							title="Toggle wrapping of long sentences onto new line"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="lineWrap"
							/>{' '}
							Line wrap
						</label>
						<label
							class="line"
							title="Your Preview will refresh when you resize the preview split"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="refreshOnResize"
							/>{' '}
							Refresh preview on resize
						</label>
						<label
							class="line"
							title="Turns on the auto-completion suggestions as you type"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="autoComplete"
							/>{' '}
							Auto-complete suggestions
						</label>
						<label
							class="line"
							title="Refreshes the preview as you code. Otherwise use the Run button"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="autoPreview"
							/>{' '}
							Auto-preview
						</label>
						<label
							class="line"
							title="Auto-save keeps saving your code at regular intervals after you hit the first save manually"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="autoSave"
							/>{' '}
							Auto-save
						</label>
						<label
							class="line"
							title="Loads the last open creation when app starts"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="preserveLastCode"
							/>{' '}
							Preserve last written code
						</label>
						<label
							class="line show-when-extension"
							title="Turning this on will start showing Web Maker in every new tab you open"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="replaceNewTab"
							/>{' '}
							Replace new tab page
						</label>
						<label
							class="line"
							title="Preserves the console logs across your preview refreshes"
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="preserveConsoleLogs"
							/>{' '}
							Preserve console logs
						</label>
						<label
							class="line"
							title="Switch to lighter version for better performance. Removes things like blur etc."
						>
							<input
								type="checkbox"
								onChange={this.updateSetting.bind(this)}
								data-setting="lightVersion"
							/>{' '}
							Fast/light version
						</label>
					</div>
				</div>

				<hr />

				<h3>Fun</h3>
				<p>
					<label
						class="line"
						title="Enjoy wonderful particle blasts while you type"
					>
						<input
							type="checkbox"
							onChange={this.updateSetting.bind(this)}
							data-setting="isCodeBlastOn"
						/>{' '}
						Code blast!
					</label>
				</p>

				<hr />

				<h3>Advanced</h3>
				<p>
					<label
						class="line"
						title="This timeout is used to indentify a possible infinite loop and prevent it."
					>
						Maximum time allowed in a loop iteration
						<input
							type="number"
							data-setting="infiniteLoopTimeout"
							onChange={this.updateSetting.bind(this)}
						/>{' '}
						ms
					</label>
					<div class="help-text">
						If any loop iteration takes more than the defined time, it is
						detected as a potential infinite loop and further iterations are
						stopped.
					</div>
				</p>
			</div>
		);
	}
}
