importScripts('./prettier/standalone.js');

function prettify({ content, type }) {
	let plugins, parser;
	if (type === 'html') {
		importScripts('./prettier/parser-html.js');
		parser = 'html';
	}else if (type === 'js') {
		parser = 'babylon';
		importScripts('./prettier/parser-babylon.js');
	}  
	else if (type === 'css') {
		parser = 'css';
		importScripts('./prettier/parser-postcss.js');
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
