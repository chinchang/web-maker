---
title: 'Free Online Markdown Editor with Live Preview'
subtitle: 'Write Markdown, see rendered HTML instantly. Works offline. No signup required.'
shortName: 'Markdown'
fileExt: 'md'
accentColor: '#083fa1'
badgeText: 'Text to HTML'
sampleCode: |
  # Welcome to Markdown

  Write **bold**, *italic*, or ~~strikethrough~~ text easily.

  ## Features
  - Simple syntax
  - Live preview
  - Works offline

  ```javascript
  const greeting = "Hello, World!";
  console.log(greeting);
  ```

  > Markdown is awesome!

  [Learn more](https://webmaker.app)
layout: playground.html
description: 'Free online Markdown editor with live preview. Write Markdown and see it render to HTML instantly. Works completely offline. Perfect for documentation and notes.'
---

## What is Markdown?

**Markdown** is a lightweight markup language that lets you write formatted text using plain text syntax. Created by John Gruber in 2004, it's now the standard for documentation, README files, blogs, and more.

Markdown converts to HTML, making it perfect for web content while remaining readable as plain text.

## Why Use Web Maker for Markdown?

- **Live preview** - See your Markdown render as HTML instantly
- **Works offline** - Write documentation anywhere
- **Syntax highlighting** - Code blocks are properly highlighted
- **Export options** - Copy HTML or export to CodePen
- **Combine with CSS** - Style your Markdown output

<h2 id="quick-reference">Markdown Quick Reference</h2>

### Headings

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

### Text Formatting

```markdown
**Bold text**
_Italic text_
**_Bold and italic_**
~~Strikethrough~~
`inline code`
```

### Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com 'Title')

![Alt text](image.jpg)
![Image with title](image.jpg 'Image title')
```

### Lists

```markdown
Unordered list:

- Item 1
- Item 2
  - Nested item
  - Another nested

Ordered list:

1. First item
2. Second item
3. Third item

Task list:

- [x] Completed task
- [ ] Incomplete task
```

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes work too.
```

### Code Blocks

````markdown
Inline: `const x = 1;`

Fenced code block:

```javascript
function greet(name) {
	return `Hello, ${name}!`;
}
```

```css
.button {
	background: #ff6c00;
	padding: 1rem;
}
```
````

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | :------: | -------: |
| Left     |  Center  |    Right |
| aligned  | aligned  |  aligned |
```

Renders as:

| Header 1 | Header 2 | Header 3 |
| -------- | :------: | -------: |
| Left     |  Center  |    Right |
| aligned  | aligned  |  aligned |

### Horizontal Rules

```markdown
---

---

---
```

### HTML in Markdown

Markdown supports inline HTML:

```markdown
<details>
<summary>Click to expand</summary>

Hidden content here!

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd>
```

## Advanced Markdown Features

### Footnotes

```markdown
Here's a sentence with a footnote.[^1]

[^1]: This is the footnote content.
```

### Definition Lists

```markdown
Term
: Definition of the term

Another term
: Another definition
```

### Abbreviations

```markdown
The HTML specification is maintained by the W3C.

_[HTML]: Hyper Text Markup Language
_[W3C]: World Wide Web Consortium
```

## Markdown Flavors

| Flavor     | Used By      | Extra Features                |
| ---------- | ------------ | ----------------------------- |
| CommonMark | Standard     | Core syntax                   |
| GFM        | GitHub       | Tables, task lists, autolinks |
| MDX        | React docs   | JSX components                |
| Obsidian   | Obsidian app | Wiki links, embeds            |

**Web Maker uses GitHub Flavored Markdown (GFM)**, which includes support for tables, task lists, strikethrough, and autolinks.

## Common Use Cases

### README Files

````markdown
# Project Name

A brief description of your project.

## Installation

```bash
npm install my-package
```
````

## Usage

```javascript
import { myFunction } from 'my-package';
myFunction();
```

## License

MIT

````

### Documentation

```markdown
# API Reference

## `getUserById(id)`

Fetches a user by their ID.

**Parameters:**
- `id` (number): The user's unique identifier

**Returns:** `Promise<User>`

**Example:**
```javascript
const user = await getUserById(123);
````

````

### Blog Posts

```markdown
---
title: My Blog Post
date: 2024-01-15
author: Your Name
---

# Introduction

Welcome to my post about **interesting topic**.

## Main Content

Here's what I learned...

## Conclusion

Thanks for reading!
````

## Styling Markdown Output

In Web Maker, you can add custom CSS to style your rendered Markdown:

```css
/* In the CSS pane */
body {
	font-family: 'Georgia', serif;
	line-height: 1.8;
	max-width: 700px;
	margin: 2rem auto;
	padding: 0 1rem;
}

h1,
h2,
h3 {
	color: #333;
	border-bottom: 2px solid #ff6c00;
	padding-bottom: 0.5rem;
}

code {
	background: #f4f4f4;
	padding: 0.2em 0.4em;
	border-radius: 3px;
}

blockquote {
	border-left: 4px solid #ff6c00;
	margin: 1rem 0;
	padding-left: 1rem;
	color: #666;
}
```

## Frequently Asked Questions

### Can I use Markdown with CSS styling?

Absolutely! Web Maker lets you write Markdown in the HTML pane and add custom styles in the CSS pane. Your Markdown renders as HTML, which you can style freely.

### Does Web Maker support syntax highlighting in code blocks?

Yes! Code blocks with language hints (like \`\`\`javascript) are syntax highlighted in the preview.

### Can I export my Markdown as HTML?

Yes, you can view and copy the compiled HTML output, or export directly to CodePen.

### What Markdown parser does Web Maker use?

Web Maker uses a CommonMark-compatible parser with GitHub Flavored Markdown extensions for tables, task lists, and more.
