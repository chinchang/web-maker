import { h, Component } from 'preact';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { editorThemes } from '../editorThemes';
import Switch from './Switch';
import Tabs, { TabPanel } from './Tabs';
import { Divider } from './common';
import { VStack } from './Stack';

function CheckboxSetting({ label, onChange, pref }) {
	return (
		<Switch checked={pref} onChange={onChange}>
			{label}
		</Switch>
	);
}
function HelpText({ children }) {
	return <p class="help-text">{children}</p>;
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
			<I18n>
				{({ i18n }) => (
					<div>
						<h1>
							<Trans>Settings</Trans>
						</h1>

						<Tabs>
							<TabPanel label={i18n._(t`General`)}>
								<CheckboxSetting
									label={i18n._(t`Preserve last written code`)}
									pref={prefs.preserveLastCode}
									onChange={e => this.updateSetting(e, 'preserveLastCode')}
								/>
								<HelpText>
									<Trans>Loads the last open creation when app starts</Trans>
								</HelpText>
								<Divider />
								<CheckboxSetting
									label={i18n._(t`Fast/light-weight version`)}
									pref={prefs.lightVersion}
									onChange={e => this.updateSetting(e, 'lightVersion')}
								/>
								<HelpText>
									<Trans>
										Switch to lighter version for better performance. Removes
										things like blur etc.
									</Trans>
								</HelpText>
								<Divider />
								<CheckboxSetting
									label={i18n._(t`Auto-preview`)}
									pref={prefs.autoPreview}
									onChange={e => this.updateSetting(e, 'autoPreview')}
								/>
								<HelpText>
									<Trans>
										Refreshes the preview as you code. Otherwise use the 'Run'
										button
									</Trans>
								</HelpText>
								<Divider />
								<CheckboxSetting
									label={i18n._(t`Auto-save`)}
									pref={prefs.autoSave}
									onChange={e => this.updateSetting(e, 'autoSave')}
								/>
								<HelpText>
									<Trans>
										Auto-save keeps saving your code at regular intervals after
										you hit save manually the first time
									</Trans>
								</HelpText>
								<Divider />
								<CheckboxSetting
									label={i18n._(t`Refresh preview on resize`)}
									pref={prefs.refreshOnResize}
									onChange={e => this.updateSetting(e, 'refreshOnResize')}
								/>
								<HelpText>
									<Trans>
										Preview will refresh when you resize the preview pane
									</Trans>
								</HelpText>
								<div class="show-when-extension">
									<Divider />
									<CheckboxSetting
										label={i18n._(t`Replace new tab page`)}
										pref={prefs.replaceNewTab}
										onChange={e => this.updateSetting(e, 'replaceNewTab')}
										showWhenExtension
									/>
									<HelpText>
										<Trans>
											Turning this on will start showing Web Maker in every new
											tab you open
										</Trans>
									</HelpText>
								</div>
								<Divider />
								<CheckboxSetting
									label={i18n._(t`Preserve console logs`)}
									pref={prefs.preserveConsoleLogs}
									onChange={e => this.updateSetting(e, 'preserveConsoleLogs')}
								/>
								<HelpText>
									<Trans>
										Preserves the console logs across your preview refreshes
									</Trans>
								</HelpText>

								<Divider />

								<div>
									<label class="line">
										<Trans>Language</Trans>
										<select
											value={prefs.lang}
											onChange={e => this.updateSetting(e, 'lang')}
										>
											<option value="en">English</option>
											<option value="ja">日本語</option>
											<option value="hi">हिंदी</option>
											<option value="es">Español (España)</option>
											<option value="de">Deutsch</option>
											<option value="fr">Français</option>
											<option value="nl">Dutch</option>
											<option value="zh-Hans">中文(简体)</option>
										</select>
									</label>
								</div>
							</TabPanel>
							<TabPanel label={i18n._(t`Indentation`)}>
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
											<Trans>Spaces</Trans>
										</label>
										<label class="ml-1">
											<input
												type="radio"
												name="indentation"
												value="tabs"
												checked={prefs.indentWith === 'tabs'}
												onChange={e => this.updateSetting(e, 'indentWith')}
											/>{' '}
											<Trans>Tabs</Trans>
										</label>
									</div>
								</div>

								<Divider />

								<label class="line" title="">
									<Trans>Indentation Size</Trans>
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
							<TabPanel label={i18n._(t`Editor`)}>
								<div>
									<div>
										<CheckboxSetting
											title={i18n._(t`Use experimental Monaco editor`)}
											label={i18n._(t`Use Monaco Editor`)}
											pref={prefs.isMonacoEditorOn}
											onChange={e => this.updateSetting(e, 'isMonacoEditorOn')}
										/>
										<HelpText>
											<Trans>
												(Experimental) Switches from CodeMirror to Monaco. Many
												other settings might not be available in Monaco.
											</Trans>
										</HelpText>
										<Divider />
										<div class="line">
											<span>
												<Trans>Default Preprocessors</Trans>
											</span>
											<div class="flex fxw-w">
												<select
													aria-label={i18n._(t`Default HTML preprocessor`)}
													style="flex:1;margin-left:20px"
													value={prefs.htmlMode}
													onChange={e => this.updateSetting(e, 'htmlMode')}
												>
													<option value="html">HTML</option>
													<option value="markdown">Markdown</option>
													<option value="jade">Pug</option>
												</select>
												<select
													aria-label={i18n._(t`Default CSS preprocessor`)}
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
													aria-label={i18n._(
														t`Default JavaScript preprocessor`
													)}
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
											<Trans>Theme</Trans>
											<VStack gap="0.5rem" align="flex-end">
												<select
													value={prefs.editorTheme}
													onChange={e => this.updateSetting(e, 'editorTheme')}
												>
													{editorThemes.map(theme => (
														<option value={theme}>{theme}</option>
													))}
												</select>
												<button
													type="button"
													class="btn btn--small ml-1 settings__preview-btn"
												>
													<Trans>Hover/Focus to preview</Trans>
												</button>
											</VStack>
										</label>
										<Divider />

										<label class="line">
											<Trans>Font</Trans>
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
													<option value="other">
														{i18n._(t`Other font from system`)}
													</option>
												</select>
												{prefs.editorFont === 'other' && (
													<input
														style="margin-left:20px"
														id="customEditorFontInput"
														type="text"
														value={prefs.editorCustomFont}
														placeholder={i18n._(t`Custom font name here`)}
														onChange={e =>
															this.updateSetting(e, 'editorCustomFont')
														}
													/>
												)}
											</div>
										</label>
										<Divider />

										<label class="line">
											<Trans>Font Size</Trans>
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
											<Trans>Key bindings</Trans>
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
											title={i18n._(
												t`Toggle wrapping of long sentences onto new line`
											)}
											label={i18n._(t`Line wrap`)}
											pref={prefs.lineWrap}
											onChange={e => this.updateSetting(e, 'lineWrap')}
										/>
										<Divider />
										<CheckboxSetting
											title={i18n._(
												t`Add the closing tag automatically on seeing an opening tag in HTML`
											)}
											label={i18n._(t`Auto-close tags`)}
											pref={prefs.autoCloseTags}
											onChange={e => this.updateSetting(e, 'autoCloseTags')}
										/>
										<Divider />
										<CheckboxSetting
											title={i18n._(
												t`Turns on the auto-completion suggestions as you type`
											)}
											label={i18n._(t`Auto-complete suggestions`)}
											pref={prefs.autoComplete}
											onChange={e => this.updateSetting(e, 'autoComplete')}
										/>
									</div>
								</div>
							</TabPanel>
							<TabPanel label={i18n._(t`Fun`)}>
								<CheckboxSetting
									label={i18n._(t`Code blast!`)}
									pref={prefs.isCodeBlastOn}
									onChange={e => this.updateSetting(e, 'isCodeBlastOn')}
								/>
								<HelpText>
									<Trans>Enjoy wonderful particle blasts while you type</Trans>
								</HelpText>
								<Divider />
								<CheckboxSetting
									label={i18n._(t`Js13kGames Mode`)}
									pref={prefs.isJs13kModeOn}
									onChange={e => this.updateSetting(e, 'isJs13kModeOn')}
								/>
								<HelpText>
									<Trans>
										Make the app ready to build some games for{' '}
										<a
											href="https://js13kgames.com/"
											target="_blank"
											rel="noopener"
										>
											Js13kGames
										</a>
										.
									</Trans>
								</HelpText>
							</TabPanel>
							<TabPanel label={i18n._(t`Advanced`)}>
								<div>
									<label class="line">
										<Trans>Preview refresh wait time</Trans>
										<div>
											<input
												type="number"
												style="width:120px"
												value={prefs.previewDelay}
												onChange={e => this.updateSetting(e, 'previewDelay')}
											/>{' '}
											ms
										</div>
									</label>
									<HelpText>
										<Trans>
											Once you stop typing, the preview waits for this much time
											before getting updated. Too low value might choke your
											browser!
										</Trans>
									</HelpText>
								</div>
								<Divider />
								<div>
									<label class="line">
										<Trans>Maximum time allowed in a loop iteration</Trans>
										<div>
											<input
												type="number"
												style="width:120px"
												value={prefs.infiniteLoopTimeout}
												onChange={e =>
													this.updateSetting(e, 'infiniteLoopTimeout')
												}
											/>{' '}
											ms
										</div>
									</label>
									<HelpText>
										<Trans>
											If any loop iteration takes more than the defined time, it
											is detected as a potential infinite loop and further
											iterations are stopped.
										</Trans>
									</HelpText>
								</div>
							</TabPanel>
						</Tabs>
					</div>
				)}
			</I18n>
		);
	}
}
