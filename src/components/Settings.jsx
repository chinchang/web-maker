import { h, Component } from 'preact';
import { editorThemes } from '../editorThemes';
import Switch from './Switch';
import Tabs, { TabPanel } from './Tabs';
import { Divider } from './common';

function CheckboxSetting({ label, onChange, pref }) {
	return (
		<Switch checked={pref} onChange={onChange}>
			{label}
		</Switch>
	);
}
export default class Settings extends Component {
	updateSetting(e, settingName) {
		const value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.props.onChange(settingName, value);
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

				<Tabs>
					<TabPanel label="General">
						<CheckboxSetting
							label="Preserve last written code"
							pref={prefs.preserveLastCode}
							onChange={e => this.updateSetting(e, 'preserveLastCode')}
						/>
						<p class="help-text">
							Loads the last open creation when app starts
						</p>
						<Divider />
						<CheckboxSetting
							label="Fast/light version"
							pref={prefs.lightVersion}
							onChange={e => this.updateSetting(e, 'lightVersion')}
						/>
						<p class="help-text">
							Switch to lighter version for better performance. Removes things
							like blur etc.
						</p>
						<Divider />
						<CheckboxSetting
							label="Auto-preview"
							pref={prefs.autoPreview}
							onChange={e => this.updateSetting(e, 'autoPreview')}
						/>
						<p class="help-text">
							Refreshes the preview as you code. Otherwise use the 'Run' button
						</p>
						<Divider />
						<CheckboxSetting
							label="Auto-save"
							pref={prefs.autoSave}
							onChange={e => this.updateSetting(e, 'autoSave')}
						/>
						<p class="help-text">
							Auto-save keeps saving your code at regular intervals after you
							hit save manually the first time
						</p>
						<Divider />
						<CheckboxSetting
							label="Refresh preview on resize"
							pref={prefs.refreshOnResize}
							onChange={e => this.updateSetting(e, 'refreshOnResize')}
						/>
						<p class="help-text">
							Preview will refresh when you resize the preview pane
						</p>
						<div class="show-when-extension">
							<Divider />
							<CheckboxSetting
								label="Replace new tab page"
								pref={prefs.replaceNewTab}
								onChange={e => this.updateSetting(e, 'replaceNewTab')}
								showWhenExtension
							/>
							<p class="help-text">
								Turning this on will start showing Web Maker in every new tab
								you open
							</p>
						</div>
						<Divider />
						<CheckboxSetting
							label="Preserve console logs"
							pref={prefs.preserveConsoleLogs}
							onChange={e => this.updateSetting(e, 'preserveConsoleLogs')}
						/>
						<p class="help-text">
							Preserves the console logs across your preview refreshes
						</p>
					</TabPanel>
					<TabPanel label="Indentation">
						<div class="line">
							<div>
								<label>
									<input
										type="radio"
										name="indentation"
										value="spaces"
										checked={prefs.indentWith === 'spaces'}
										onChange={e => this.updateSetting(e, 'indentWith')}
									/>{' '}
									Spaces
								</label>
								<label class="ml-1">
									<input
										type="radio"
										name="indentation"
										value="tabs"
										checked={prefs.indentWith === 'tabs'}
										onChange={e => this.updateSetting(e, 'indentWith')}
									/>{' '}
									Tabs
								</label>
							</div>
						</div>
						<label class="line" title="">
							Indentation Size
							<div>
								<input
									type="range"
									class="va-m ml-1"
									value={prefs.indentSize}
									min="1"
									max="7"
									list="indentationSizeList"
									onChange={e => this.updateSetting(e, 'indentSize')}
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
							</div>
						</label>
					</TabPanel>
					<TabPanel label="Editor">
						<div>
							<div>
								<div class="line">
									<span>Default Preprocessors</span>
									<div class="flex">
										<select
											aria-label="Default HTML preprocessor"
											style="flex:1;margin-left:20px"
											value={prefs.htmlMode}
											onChange={e => this.updateSetting(e, 'htmlMode')}
										>
											<option value="html">HTML</option>
											<option value="markdown">Markdown</option>
											<option value="jade">Pug</option>
										</select>
										<select
											aria-label="Default CSS preprocessor"
											style="flex:1;margin-left:20px"
											value={prefs.cssMode}
											onChange={e => this.updateSetting(e, 'cssMode')}
										>
											<option value="css">CSS</option>
											<option value="scss">SCSS</option>
											<option value="sass">SASS</option>
											<option value="less">LESS</option>
											<option value="stylus">Stylus</option>
											<option value="acss">Atomic CSS</option>
										</select>
										<select
											aria-label="Default JavaScript preprocessor"
											style="flex:1;margin-left:20px"
											value={prefs.jsMode}
											onChange={e => this.updateSetting(e, 'jsMode')}
										>
											<option value="js">JS</option>
											<option value="coffee">CoffeeScript</option>
											<option value="es6">ES6 (Babel)</option>
											<option value="typescript">TypeScript</option>
										</select>
									</div>
								</div>
								<Divider />
								<label class="line">
									Theme
									<div>
										<select
											value={prefs.editorTheme}
											onChange={e => this.updateSetting(e, 'editorTheme')}
										>
											{editorThemes.map(theme => (
												<option value={theme}>{theme}</option>
											))}
										</select>
									</div>
								</label>
								<Divider />

								<label class="line">
									Font
									<div>
										<select
											value={prefs.editorFont}
											onChange={e => this.updateSetting(e, 'editorFont')}
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
												style="margin-left:20px"
												id="customEditorFontInput"
												type="text"
												value={prefs.editorCustomFont}
												placeholder="Custom font name here"
												onChange={e =>
													this.updateSetting(e, 'editorCustomFont')
												}
											/>
										)}
									</div>
								</label>
								<Divider />

								<label class="line">
									Font Size
									<div>
										<input
											style="width:70px"
											type="number"
											value={prefs.fontSize}
											onChange={e => this.updateSetting(e, 'fontSize')}
										/>{' '}
										px
									</div>
								</label>
								<Divider />

								<div class="line">
									Key bindings
									<div>
										<label class="ml-1">
											<input
												type="radio"
												name="keymap"
												value="sublime"
												checked={prefs.keymap === 'sublime'}
												onChange={e => this.updateSetting(e, 'keymap')}
											/>{' '}
											Sublime
										</label>
										<label class="ml-1">
											<input
												type="radio"
												name="keymap"
												value="vim"
												checked={prefs.keymap === 'vim'}
												onChange={e => this.updateSetting(e, 'keymap')}
											/>{' '}
											Vim
										</label>
									</div>
								</div>
							</div>
							<Divider />

							<div class="flex-grow">
								<CheckboxSetting
									title="Toggle wrapping of long sentences onto new line"
									label="Line wrap"
									pref={prefs.lineWrap}
									onChange={e => this.updateSetting(e, 'lineWrap')}
								/>
								<Divider />
								<CheckboxSetting
									title="Add the closing tag automatically on seeing an opening tag in HTML"
									label="Auto-close tags"
									pref={prefs.autoCloseTags}
									onChange={e => this.updateSetting(e, 'autoCloseTags')}
								/>
								<Divider />
								<CheckboxSetting
									title="Turns on the auto-completion suggestions as you type"
									label="Auto-complete suggestions"
									pref={prefs.autoComplete}
									onChange={e => this.updateSetting(e, 'autoComplete')}
								/>
							</div>
						</div>
					</TabPanel>
					<TabPanel label="Fun">
						<CheckboxSetting
							label="Code blast!"
							pref={prefs.isCodeBlastOn}
							onChange={e => this.updateSetting(e, 'isCodeBlastOn')}
						/>
						<p class="help-text">
							Enjoy wonderful particle blasts while you type
						</p>
						<Divider />
						<CheckboxSetting
							label="Js13kGames Mode"
							pref={prefs.isJs13kModeOn}
							onChange={e => this.updateSetting(e, 'isJs13kModeOn')}
						/>
						<p class="help-text">
							Make the app ready to build some games for{' '}
							<a href="https://js13kgames.com/" target="_blank" rel="noopener">
								Js13kGames
							</a>.
						</p>
					</TabPanel>
					<TabPanel label="Advanced">
						<div>
							<label class="line">
								Maximum time allowed in a loop iteration
								<div>
									<input
										type="number"
										style="width:120px"
										value={prefs.infiniteLoopTimeout}
										onChange={e => this.updateSetting(e, 'infiniteLoopTimeout')}
									/>{' '}
									ms
								</div>
							</label>
							<p class="help-text">
								If any loop iteration takes more than the defined time, it is
								detected as a potential infinite loop and further iterations are
								stopped.
							</p>
						</div>
						<Divider />

						<div>
							<label class="line">
								Language
								<select
									value={prefs.lang}
									onChange={e => this.updateSetting(e, 'lang')}
								>
									<option value="en">English</option>
									<option value="hi">Hindi</option>
									<option value="ja">Japanese</option>
									<option value="sa">Sanskrit</option>
								</select>
							</label>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		);
	}
}
