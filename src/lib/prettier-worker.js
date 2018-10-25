importScripts('/lib/prettier/standalone.js');

function prettify({ content, type }) {
	let plugins, parser;
	if (type === 'js') {
		parser = 'babylon';
		importScripts('/lib/prettier/parser-babylon.js');
	} else if (type === 'css') {
		parser = 'css';
		importScripts('/lib/prettier/parser-postcss.js');
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
