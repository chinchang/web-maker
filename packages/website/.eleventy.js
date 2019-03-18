const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const markdownItConfig = {
	html: true,
	breaks: false,
	linkify: true
};
const markdownItAnchorConfig = {
	permalink: true,
	permalinkClass: 'bookmark',
	permalinkSymbol: '#'
};

const markdownLib = markdownIt(markdownItConfig).use(
	markdownItAnchor,
	markdownItAnchorConfig
);

module.exports = function(eleventyConfig) {
	eleventyConfig.setLibrary('md', markdownLib);

	eleventyConfig.addFilter('clean', path => {
		if (path === '/') return path;
		if (path === 'https://webmaker.app/') return path;
		if (path.endsWith('/')) return path.slice(0, -1);
		return path;
	});

	eleventyConfig.addPassthroughCopy('css');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('icons');
	eleventyConfig.addPassthroughCopy('manifest.json');
	eleventyConfig.addPassthroughCopy('robots.txt');

	return {};
};
