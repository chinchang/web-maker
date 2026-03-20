/**
 * Translates Lingui .po message catalogs using GPT-4o.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/translate-po.js
 *
 * Reads src/locales/<locale>/messages.po for each target locale,
 * finds untranslated entries (empty msgstr), translates them in
 * batches via OpenAI, and writes the results back.
 */

const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
if (!OPENAI_API_KEY) {
	console.error('Error: OPENAI_API_KEY environment variable is required.');
	process.exit(1);
}

const LOCALES_DIR = path.resolve(__dirname, '../src/locales');
const SOURCE_LOCALE = 'en';
const BATCH_SIZE = 30;
const CONCURRENCY = 4;

const LOCALE_NAMES = {
	ja: 'Japanese',
	hi: 'Hindi',
	sa: 'Sanskrit',
	nl: 'Dutch',
	es: 'Spanish',
	'zh-Hans': 'Chinese (Simplified)',
	de: 'German',
	fr: 'French'
};

// ---------------------------------------------------------------------------
// .po parsing / serialisation
// ---------------------------------------------------------------------------

/**
 * Parses a .po file into an array of entry objects.
 * Each entry has: { comments, msgid, msgstr, obsolete }
 * The header entry has msgid = "".
 */
function parsePo(content) {
	const entries = [];
	const lines = content.split('\n');
	let pendingComments = [];
	let current = null;
	let lastField = null;

	const finishEntry = () => {
		if (current) {
			entries.push(current);
			current = null;
			lastField = null;
		}
	};

	for (const line of lines) {
		// Obsolete entries: #~ msgid / #~ msgstr
		if (line.startsWith('#~')) {
			// Check if it's an obsolete msgid/msgstr line
			const obsIdMatch = line.match(/^#~\s+msgid\s+"(.*)"$/);
			if (obsIdMatch) {
				finishEntry();
				current = {
					comments: pendingComments,
					msgid: unescape(obsIdMatch[1]),
					msgstr: '',
					obsolete: true
				};
				pendingComments = [];
				lastField = 'msgid';
				continue;
			}
			const obsStrMatch = line.match(/^#~\s+msgstr\s+"(.*)"$/);
			if (obsStrMatch) {
				if (current) current.msgstr = unescape(obsStrMatch[1]);
				lastField = 'msgstr';
				continue;
			}
			// Otherwise it's just an obsolete comment
			pendingComments.push(line);
			continue;
		}

		// Regular comment lines (#, #:, #., #,)
		if (/^#/.test(line)) {
			pendingComments.push(line);
			continue;
		}

		// msgid
		const idMatch = line.match(/^msgid\s+"(.*)"$/);
		if (idMatch) {
			finishEntry();
			current = {
				comments: pendingComments,
				msgid: unescape(idMatch[1]),
				msgstr: '',
				obsolete: false
			};
			pendingComments = [];
			lastField = 'msgid';
			continue;
		}

		// msgstr
		const strMatch = line.match(/^msgstr\s+"(.*)"$/);
		if (strMatch) {
			if (current) current.msgstr = unescape(strMatch[1]);
			lastField = 'msgstr';
			continue;
		}

		// Continuation line (multi-line string)
		const contMatch = line.match(/^"(.*)"$/);
		if (contMatch && current && lastField) {
			current[lastField] += unescape(contMatch[1]);
			continue;
		}

		// Empty line
		if (line.trim() === '') {
			finishEntry();
			continue;
		}
	}

	finishEntry();
	return entries;
}

function unescape(str) {
	return str
		.replace(/\\n/g, '\n')
		.replace(/\\t/g, '\t')
		.replace(/\\"/g, '"')
		.replace(/\\\\/g, '\\');
}

function escape(str) {
	return str
		.replace(/\\/g, '\\\\')
		.replace(/"/g, '\\"')
		.replace(/\t/g, '\\t')
		.replace(/\n/g, '\\n');
}

/**
 * Serialises an array of entry objects back into .po format.
 */
function serialisePo(entries) {
	const parts = [];

	for (const entry of entries) {
		const lines = [];

		if (entry.comments && entry.comments.length) {
			lines.push(...entry.comments);
		}

		if (entry.obsolete) {
			lines.push(`#~ msgid "${escape(entry.msgid)}"`);
			lines.push(`#~ msgstr "${escape(entry.msgstr)}"`);
		} else {
			lines.push(`msgid "${escape(entry.msgid)}"`);
			lines.push(`msgstr "${escape(entry.msgstr)}"`);
		}

		parts.push(lines.join('\n'));
	}

	return parts.join('\n\n') + '\n';
}

// ---------------------------------------------------------------------------
// OpenAI helpers
// ---------------------------------------------------------------------------

async function callGPT4o(messages) {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_API_KEY}`
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
			temperature: 0.3,
			response_format: { type: 'json_object' },
			messages
		})
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`OpenAI API error ${res.status}: ${text}`);
	}

	const data = await res.json();
	return JSON.parse(data.choices[0].message.content);
}

function chunk(arr, size) {
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
}

async function translateBatch(entries, targetLang) {
	// Build { msgid: msgid } map for the batch
	const batchObj = {};
	for (const entry of entries) {
		batchObj[entry.msgid] = entry.msgid;
	}

	const messages = [
		{
			role: 'system',
			content: `You are a professional translator. Translate the JSON values from English to ${targetLang}.

Rules:
- Return a JSON object with the EXACT same keys
- Only translate the values, never the keys
- Preserve all placeholders like {0}, {variableName}, <0>...</0>, <1>...</1> etc. exactly as-is
- Preserve HTML entities and special characters
- Keep brand names like "Web Maker", "CSS", "HTML", "JavaScript", "Pug", "SCSS", "SASS", "LESS", "TypeScript", "CoffeeScript", "Markdown", "CodeMirror", "Monaco", "Patreon", "Paypal", "Github", "Google" untranslated
- Maintain the same tone (casual, friendly)
- Do NOT add any extra keys or explanation`
		},
		{
			role: 'user',
			content: JSON.stringify(batchObj)
		}
	];

	return callGPT4o(messages);
}

async function runWithConcurrency(tasks, concurrency) {
	const results = [];
	for (let i = 0; i < tasks.length; i += concurrency) {
		const batch = tasks.slice(i, i + concurrency);
		const batchResults = await Promise.all(batch.map(fn => fn()));
		results.push(...batchResults);
	}
	return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function translateLocale(locale) {
	const langName = LOCALE_NAMES[locale];
	if (!langName) {
		console.log(`  Skipping unknown locale: ${locale}`);
		return;
	}

	const poFile = path.join(LOCALES_DIR, locale, 'messages.po');
	if (!fs.existsSync(poFile)) {
		console.log(`  Skipping ${locale}: messages.po not found`);
		return;
	}

	const content = fs.readFileSync(poFile, 'utf-8');
	const entries = parsePo(content);

	// Find untranslated, non-obsolete, non-header entries
	const untranslated = entries.filter(
		e => !e.obsolete && e.msgid !== '' && e.msgstr === ''
	);

	if (untranslated.length === 0) {
		console.log(`  ${locale} (${langName}): already fully translated`);
		return;
	}

	console.log(
		`  ${locale} (${langName}): translating ${untranslated.length} messages...`
	);

	const batches = chunk(untranslated, BATCH_SIZE);
	const tasks = batches.map(
		(batch, i) => () =>
			translateBatch(batch, langName).then(result => {
				console.log(
					`    ${locale}: batch ${i + 1}/${batches.length} done (${
						Object.keys(result).length
					} messages)`
				);
				return result;
			})
	);

	const results = await runWithConcurrency(tasks, CONCURRENCY);

	// Merge translations back into entries
	const translationMap = {};
	for (const result of results) {
		Object.assign(translationMap, result);
	}

	let translated = 0;
	for (const entry of entries) {
		if (translationMap[entry.msgid] && entry.msgstr === '') {
			entry.msgstr = translationMap[entry.msgid];
			translated++;
		}
	}

	fs.writeFileSync(poFile, serialisePo(entries));
	console.log(`  ${locale} (${langName}): translated ${translated} messages`);
}

async function main() {
	const targetLocales = fs
		.readdirSync(LOCALES_DIR)
		.filter(
			d =>
				d !== SOURCE_LOCALE &&
				d !== '_build' &&
				fs.statSync(path.join(LOCALES_DIR, d)).isDirectory()
		);

	console.log(`Targets: ${targetLocales.join(', ')}\n`);

	await Promise.all(targetLocales.map(locale => translateLocale(locale)));

	console.log('\nDone! Now run `npm run compile` to compile the catalogs.');
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
