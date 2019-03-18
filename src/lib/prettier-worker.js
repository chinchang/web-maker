importScripts('./prettier/standalone.js');

function prettify({ content, type }) {
	let parser;
	switch (type) {
		case 'js':
			parser = 'babylon';
			importScripts('./prettier/parser-babylon.js')
			break;
		case 'json':
			parser = 'json';
			importScripts('./prettier/parser-babylon.js')
			break;
		case 'css':
		case 'scss':
		case 'sass':
		case 'less':
			parser = 'css';
			importScripts('./prettier/parser-postcss.js')
			break;
		case 'md':
		case 'markdown':
			parser = 'markdown';
			importScripts('./prettier/parser-markdown.js')
			break;
		case 'html':
			parser = 'html';
			importScripts('./prettier/parser-html.js');
			break;
	}

	if (!parser) {
		return content;
	}
	const formattedContent = prettier.format(content, {
		parser,
		plugins: self.prettierPlugins
	});
	return formattedContent || content;
}

onmessage = e => {
	postMessage(prettify(e.data));
};
