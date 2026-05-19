import { HtmlModes, CssModes, JsModes } from './codeModes';

const GITHUB_API = 'https://api.github.com';
const TOKEN_KEY = 'githubGistToken';
const TOKEN_AT_KEY = 'githubGistTokenAt';

const HTML_EXT = {
	[HtmlModes.HTML]: 'html',
	[HtmlModes.MARKDOWN]: 'md',
	[HtmlModes.JADE]: 'pug'
};
const CSS_EXT = {
	[CssModes.CSS]: 'css',
	[CssModes.SCSS]: 'scss',
	[CssModes.SASS]: 'sass',
	[CssModes.LESS]: 'less',
	[CssModes.STYLUS]: 'styl',
	[CssModes.ACSS]: 'css'
};
const JS_EXT = {
	[JsModes.JS]: 'js',
	[JsModes.ES6]: 'js',
	[JsModes.COFFEESCRIPT]: 'coffee',
	[JsModes.TS]: 'ts'
};

export function extensionFor(kind, mode) {
	if (kind === 'html') return HTML_EXT[mode] || 'html';
	if (kind === 'css') return CSS_EXT[mode] || 'css';
	if (kind === 'js') return JS_EXT[mode] || 'js';
	return 'txt';
}

function injectExternalLibs(html, externalLibs = {}) {
	const cssUrls = (externalLibs.css || '')
		.split('\n')
		.map(s => s.trim())
		.filter(Boolean);
	const jsUrls = (externalLibs.js || '')
		.split('\n')
		.map(s => s.trim())
		.filter(Boolean);

	if (!cssUrls.length && !jsUrls.length) return html;

	const tags = [
		...cssUrls.map(u => `<link rel="stylesheet" href="${u}">`),
		...jsUrls.map(u => `<script src="${u}"></script>`)
	].join('\n');

	if (/<\/head>/i.test(html)) {
		return html.replace(/<\/head>/i, `${tags}\n</head>`);
	}
	return `${tags}\n${html}`;
}

function buildReadme(item, htmlExt, cssExt, jsExt) {
	const lines = [`# ${item.title || 'Untitled'}`, ''];
	lines.push('Made with [Web-Maker](https://webmaker.app).');
	if (item.isPublic && item.id) {
		lines.push('', `Open in Web-Maker: https://webmaker.app/create/${item.id}`);
	}
	lines.push('', '## Files', '');
	lines.push(
		`- \`index.${htmlExt}\` — HTML source (${item.htmlMode || 'html'})`
	);
	lines.push(`- \`style.${cssExt}\` — CSS source (${item.cssMode || 'css'})`);
	lines.push(`- \`script.${jsExt}\` — JS source (${item.jsMode || 'js'})`);

	const cssLibs = (item.externalLibs?.css || '').trim();
	const jsLibs = (item.externalLibs?.js || '').trim();
	if (cssLibs || jsLibs) {
		lines.push('', '## External libraries', '');
		lines.push(
			'These were inlined as `<link>` / `<script>` tags in `index.html` so the gist runs standalone — the original source in Web-Maker does not include them.'
		);
		if (cssLibs) {
			lines.push('', 'CSS:', '```', cssLibs, '```');
		}
		if (jsLibs) {
			lines.push('', 'JS:', '```', jsLibs, '```');
		}
	}

	return lines.join('\n') + '\n';
}

export function mapItemToGistFiles(item) {
	const htmlExt = extensionFor('html', item.htmlMode);
	const cssExt = extensionFor('css', item.cssMode);
	const jsExt = extensionFor('js', item.jsMode);

	const files = {};

	const htmlContent = injectExternalLibs(item.html || '', item.externalLibs);
	if (htmlContent.trim()) files[`index.${htmlExt}`] = { content: htmlContent };
	if ((item.css || '').trim()) files[`style.${cssExt}`] = { content: item.css };
	if ((item.js || '').trim()) files[`script.${jsExt}`] = { content: item.js };

	files['README.md'] = { content: buildReadme(item, htmlExt, cssExt, jsExt) };
	files['webmaker.json'] = {
		content:
			JSON.stringify(
				{
					version: 1,
					itemId: item.id,
					title: item.title,
					htmlMode: item.htmlMode,
					cssMode: item.cssMode,
					jsMode: item.jsMode,
					externalLibs: item.externalLibs,
					layoutMode: item.layoutMode
				},
				null,
				2
			) + '\n'
	};

	return files;
}

function headers(token) {
	return {
		Authorization: `token ${token}`,
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'Content-Type': 'application/json'
	};
}

async function parseError(res) {
	let body = {};
	try {
		body = await res.json();
	} catch (e) {
		// ignore
	}
	if (res.status === 401) {
		return { code: 'AUTH_EXPIRED', status: 401, message: body.message };
	}
	if (res.status === 403) {
		return { code: 'FORBIDDEN', status: 403, message: body.message };
	}
	if (res.status === 404) {
		return { code: 'NOT_FOUND', status: 404, message: body.message };
	}
	if (res.status === 422) {
		return {
			code: 'VALIDATION',
			status: 422,
			message: body.message,
			errors: body.errors
		};
	}
	return { code: 'UNKNOWN', status: res.status, message: body.message };
}

export async function createGist(token, { description, isPublic, files }) {
	const res = await fetch(`${GITHUB_API}/gists`, {
		method: 'POST',
		headers: headers(token),
		body: JSON.stringify({
			description: description || '',
			public: !!isPublic,
			files
		})
	});
	if (!res.ok) throw await parseError(res);
	const json = await res.json();
	return { id: json.id, html_url: json.html_url };
}

export async function updateGist(token, gistId, { description, files }) {
	const res = await fetch(`${GITHUB_API}/gists/${gistId}`, {
		method: 'PATCH',
		headers: headers(token),
		body: JSON.stringify({
			description: description || '',
			files
		})
	});
	if (!res.ok) {
		const err = await parseError(res);
		if (err.status === 404) err.code = 'GIST_GONE';
		throw err;
	}
	const json = await res.json();
	return { id: json.id, html_url: json.html_url };
}

export function getStoredGistToken() {
	return new Promise(resolve => {
		window.db.sync.get({ [TOKEN_KEY]: null }, result => {
			resolve(result[TOKEN_KEY] || null);
		});
	});
}

export function setStoredGistToken(token) {
	return new Promise(resolve => {
		window.db.sync.set(
			{ [TOKEN_KEY]: token, [TOKEN_AT_KEY]: Date.now() },
			resolve
		);
	});
}

export function clearStoredGistToken() {
	return new Promise(resolve => {
		window.db.sync.set({ [TOKEN_KEY]: null, [TOKEN_AT_KEY]: null }, resolve);
	});
}
