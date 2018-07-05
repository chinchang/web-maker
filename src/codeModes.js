export const HtmlModes = {
	HTML: 'html',
	MARKDOWN: 'markdown',
	JADE: 'jade' // unsafe eval is put in manifest for this file
};
export const CssModes = {
	CSS: 'css',
	SCSS: 'scss',
	SASS: 'sass',
	LESS: 'less',
	STYLUS: 'stylus',
	ACSS: 'acss'
};
export const JsModes = {
	JS: 'js',
	ES6: 'es6',
	COFFEESCRIPT: 'coffee',
	TS: 'typescript'
};
export const modes = {};
modes[HtmlModes.HTML] = {
	label: 'HTML',
	cmMode: 'htmlmixed',
	codepenVal: 'none'
};
modes[HtmlModes.MARKDOWN] = {
	label: 'Markdown',
	cmMode: 'markdown',
	codepenVal: 'markdown'
};
modes[HtmlModes.JADE] = {
	label: 'Pug',
	cmMode: 'pug',
	codepenVal: 'pug'
};
modes[JsModes.JS] = {
	label: 'JS',
	cmMode: 'javascript',
	codepenVal: 'none'
};
modes[JsModes.COFFEESCRIPT] = {
	label: 'CoffeeScript',
	cmMode: 'coffeescript',
	codepenVal: 'coffeescript'
};
modes[JsModes.ES6] = {
	label: 'ES6 (Babel)',
	cmMode: 'jsx',
	codepenVal: 'babel'
};
modes[JsModes.TS] = {
	label: 'TypeScript',
	cmPath: 'jsx',
	cmMode: 'text/typescript-jsx',
	codepenVal: 'typescript'
};
modes[CssModes.CSS] = {
	label: 'CSS',
	cmPath: 'css',
	cmMode: 'css',
	codepenVal: 'none'
};
modes[CssModes.SCSS] = {
	label: 'SCSS',
	cmPath: 'css',
	cmMode: 'text/x-scss',
	codepenVal: 'scss'
};
modes[CssModes.SASS] = {
	label: 'SASS',
	cmMode: 'sass',
	codepenVal: 'sass'
};
modes[CssModes.LESS] = {
	label: 'LESS',
	cmPath: 'css',
	cmMode: 'text/x-less',
	codepenVal: 'less'
};
modes[CssModes.STYLUS] = {
	label: 'Stylus',
	cmMode: 'stylus',
	codepenVal: 'stylus'
};
modes[CssModes.ACSS] = {
	label: 'Atomic CSS',
	cmPath: 'css',
	cmMode: 'css',
	codepenVal: 'notsupported',
	cmDisable: true,
	hasSettings: true
};
