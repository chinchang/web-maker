module.exports = class {
	data() {
		return {
			permalink: '/docs/search-index.json',
			eleventyExcludeFromCollections: true,
			layout: false
		};
	}

	render(data) {
		const nav = data.docsNav || [];
		const all = data.collections.all || [];
		const byUrl = {};
		all.forEach(p => {
			byUrl[p.url] = p;
		});

		const index = nav.map(item => {
			const page = byUrl[item.url];
			let headings = [];
			if (page && page.templateContent) {
				const re = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g;
				let m;
				while ((m = re.exec(page.templateContent)) !== null) {
					const text = m[1]
						.replace(/<[^>]+>/g, '')
						.replace(/#/g, '')
						.replace(/\s+/g, ' ')
						.trim();
					if (text) headings.push(text);
				}
			}
			return { url: item.url, title: item.title, headings };
		});

		return JSON.stringify(index);
	}
};
