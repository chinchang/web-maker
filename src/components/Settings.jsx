import { h, Component } from 'preact';
import { editorThemes } from '../editorThemes';
import Switch from './Switch';

function CheckboxSetting({
	title,
	label,
	onChange,
	pref,
	name,
	showWhenExtension
}) {
	return (
		// <label
		// 	class={`line ${showWhenExtension ? 'show-when-extension' : ''} `}
		// 	title={title}
		// >
		// 	<input
		// 		type="checkbox"
		// 		checked={pref}
		// 		onChange={onChange}
		// 		data-setting={name}
		// 	/>{' '}
		// 	{label}
		// </label>
		<Switch checked={pref}>{label}</Switch>
	);
}
export default class Settings extends Component {
	updateSetting(e) {
		this.props.onChange(e);
	}
	shouldComponentUpdate() {
		// TODO: add check on prefs
		return true;
	}
	render() {
		const { prefs } = this.props;
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
							name="indentation"
							value="spaces"
							checked={prefs.indentWith === 'spaces'}
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
							checked={prefs.indentWith === 'tabs'}
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
						value={prefs.indentSize}
						min="1"
						max="7"
						list="indentationSizeList"
						data-setting="indentSize"
						onChange={this.updateSetting.bind(this)}
					/>
					<span id="indentationSizeValueEl">{prefs.indentSize}</span>
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
								value={prefs.htmlMode}
								onChange={this.updateSetting.bind(this)}
							>
								<option value="html">HTML</option>
								<option value="markdown">Markdown</option>
								<option value="jade">Pug</option>
							</select>
							<select
								style="flex:1;margin-left:20px"
								data-setting="cssMode"
								value={prefs.cssMode}
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
								value={prefs.jsMode}
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
								value={prefs.editorTheme}
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
								value={prefs.editorFont}
								onChange={this.updateSetting.bind(this)}
							>
								<option value="FiraCode">Fira Code</option>
								<option value="Inconsolata">Inconsolata</option>
								<option value="Monoid">Monoid</option>
								<option value="FixedSys">FixedSys</option>
								<option disabled="disabled">----</option>
								<option value="other">Other font from system</option>
							</select>
							{prefs.editorFont === 'other' && (
								<input
									id="customEditorFontInput"
									type="text"
									value={prefs.editorCustomFont}
									placeholder="Custom font name here"
									data-setting="editorCustomFont"
									onChange={this.updateSetting.bind(this)}
								/>
							)}
						</label>
						<label class="line">
							Font Size{' '}
							<input
								style="width:70px"
								type="number"
								value={prefs.fontSize}
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
									name="keymap"
									value="sublime"
									checked={prefs.keymap === 'sublime'}
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
									checked={prefs.keymap === 'vim'}
									data-setting="keymap"
									onChange={this.updateSetting.bind(this)}
								/>{' '}
								Vim
							</label>
						</div>
					</div>
					<div class="flex-grow ml-2 ml-0--mobile">
						<CheckboxSetting
							name="lineWrap"
							title="Toggle wrapping of long sentences onto new line"
							label="Line wrap"
							pref={prefs.lineWrap}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="refreshOnResize"
							title="Your Preview will refresh when you resize the preview split"
							label="Refresh preview on resize"
							pref={prefs.refreshOnResize}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="autoComplete"
							title="Turns on the auto-completion suggestions as you type"
							label="Auto-complete suggestions"
							pref={prefs.autoComplete}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="autoPreview"
							title="Refreshes the preview as you code. Otherwise use the Run button"
							label="Auto-preview"
							pref={prefs.autoPreview}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="autoSave"
							title="Auto-save keeps saving your code at regular intervals after you hit the first save manually"
							label="Auto-save"
							pref={prefs.autoSave}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="preserveLastCode"
							title="Loads the last open creation when app starts"
							label="Preserve last written code"
							pref={prefs.preserveLastCode}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="replaceNewTab"
							title="Turning this on will start showing Web Maker in every new tab you open"
							label="Replace new tab page"
							pref={prefs.replaceNewTab}
							onChange={this.updateSetting.bind(this)}
							showWhenExtension
						/>
						<CheckboxSetting
							name="preserveConsoleLogs"
							title="Preserves the console logs across your preview refreshes"
							label="Preserve console logs"
							pref={prefs.preserveConsoleLogs}
							onChange={this.updateSetting.bind(this)}
						/>
						<CheckboxSetting
							name="lightVersion"
							title="Switch to lighter version for better performance. Removes things like blur etc."
							label="Fast/light version"
							pref={prefs.lightVersion}
							onChange={this.updateSetting.bind(this)}
						/>
					</div>
				</div>

				<hr />

				<h3>Fun</h3>
				<p>
					<CheckboxSetting
						title="Enjoy wonderful particle blasts while you type"
						label="Code blast!"
						name="isCodeBlastOn"
						pref={prefs.isCodeBlastOn}
						onChange={this.updateSetting.bind(this)}
					/>

					<CheckboxSetting
						title="Get ready to build some games at JS13KGames"
						label="Js13kGames Mode"
						name="isJs13kModeOn"
						pref={prefs.isJs13kModeOn}
						onChange={this.updateSetting.bind(this)}
					/>
				</p>

				<hr />

				<h3>Advanced</h3>
				<p>
					<label
						class="line"
						title="This timeout is used to indentify a possible infinite loop and prevent it."
					>
						Maximum time allowed in a loop iteration{' '}
						<input
							type="number"
							value={prefs.infiniteLoopTimeout}
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

				<p>
					<label class="line">
						Language
						<select
							data-setting="lang"
							value={prefs.lang}
							onChange={this.updateSetting.bind(this)}
						>
							<option value="en">English</option>
							<option value="hi">Hindi</option>
							<option value="ja">Japanese</option>
							<option value="sa">Sanskrit</option>
						</select>
					</label>
				</p>
			</div>
		);
	}
}
