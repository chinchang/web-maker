---
title: 'Free Online Pug Template Editor & Compiler'
subtitle: 'Write Pug, see compiled HTML instantly. Works offline. No setup required.'
shortName: 'Pug'
fileExt: 'pug'
accentColor: '#a86454'
badgeText: 'HTML Preprocessor'
sampleCode: |
  doctype html
  html(lang="en")
    head
      title My Page
    body
      h1 Hello, Pug!
      ul
        each item in ['Apples', 'Oranges', 'Bananas']
          li= item
      .card
        h2 Welcome
        p This is a Pug template.
layout: playground.html
createUrl: '/create/?htmlMode=jade&html=h1%20Hello%20Pug%0Aul%0A%20%20each%20x%20in%20%5B%27a%27%2C%27b%27%2C%27c%27%5D%0A%20%20%20%20li%3D%20x'
description: 'Free online Pug (formerly Jade) compiler and editor. Write Pug templates and see them compile to HTML instantly. Works completely offline. No installation required.'
---

## What is Pug?

**Pug** (formerly known as Jade) is a clean, whitespace-sensitive template engine for HTML. It uses indentation instead of closing tags, which makes templates shorter, more readable, and easier to maintain.

Pug compiles down to standard HTML and is widely used in Node.js projects, Express applications, and static site generators.

## Why Use Web Maker for Pug?

- **Instant compilation** - See Pug compile to HTML as you type
- **Works offline** - Compile Pug locally in your browser, no server needed
- **Zero setup** - No npm install, no build tools, no configuration
- **Live preview** - See the rendered HTML side-by-side
- **Combine with CSS/JS** - Style and script your Pug templates in the same playground

<h2 id="quick-reference">Pug Quick Reference</h2>

### Tags & Indentation

Pug uses indentation to denote nesting — no closing tags needed:

```pug
html
  head
    title My Page
  body
    h1 Hello World
    p A short paragraph.
```

Compiles to:

```html
<html>
	<head>
		<title>My Page</title>
	</head>
	<body>
		<h1>Hello World</h1>
		<p>A short paragraph.</p>
	</body>
</html>
```

### Attributes

Attributes go in parentheses after the tag name:

```pug
a(href='/about', target='_blank') About us
img(src='/logo.png', alt='Logo')
input(type='text', name='email', required)
```

### IDs & Classes

Use `#` for IDs and `.` for classes — `div` is implied if you omit the tag:

```pug
#main.container
  h1.title Hello
  p.text.muted A paragraph
  a.btn.btn-primary(href='/signup') Sign up
```

### Variables & Interpolation

Pass data into templates and interpolate it:

```pug
- var name = 'Alice'
- var items = ['Apples', 'Oranges', 'Bananas']

h1 Welcome, #{name}!
p You have #{items.length} items.
```

### Conditionals

Use `if`, `else if`, and `else` for conditional rendering:

```pug
- var user = { isAdmin: true, name: 'Alice' }

if user.isAdmin
  p Welcome, admin #{user.name}
else if user
  p Welcome, #{user.name}
else
  p Please log in.
```

### Loops

Iterate over arrays and objects:

```pug
ul
  each item in ['HTML', 'CSS', 'JavaScript']
    li= item

ul
  each value, key in { name: 'Alice', age: 30 }
    li #{key}: #{value}
```

### Mixins (Reusable Components)

Mixins are like functions that produce reusable markup:

```pug
mixin card(title, body)
  .card
    h3.card__title= title
    p.card__body= body

+card('Hello', 'This is a reusable card.')
+card('Goodbye', 'And another one.')
```

### Includes & Layouts

Split templates across files:

```pug
//- layout.pug
html
  body
    block content

//- page.pug
extends layout.pug

block content
  h1 Page Title
  p Page content here.
```

## Pug vs HTML

| Feature      | HTML               | Pug               |
| ------------ | ------------------ | ----------------- |
| Syntax       | Tag-based, verbose | Indented, concise |
| Closing tags | Required           | Not needed        |
| Variables    | No                 | Yes               |
| Loops        | No                 | Yes               |
| Conditionals | No                 | Yes               |
| Mixins       | No                 | Yes               |
| Compile step | No                 | Yes (to HTML)     |

## Common Pug Patterns

### Navigation Menu

```pug
- var pages = [
-   { url: '/', label: 'Home' },
-   { url: '/about', label: 'About' },
-   { url: '/contact', label: 'Contact' }
- ]

nav.site-nav
  ul
    each page in pages
      li
        a(href=page.url)= page.label
```

### Form with Validation Attributes

```pug
form(action='/signup', method='post')
  label(for='email') Email
  input#email(type='email', name='email', required)

  label(for='password') Password
  input#password(type='password', name='password', minlength='8', required)

  button(type='submit') Sign up
```

## Frequently Asked Questions

### Is Pug the same as Jade?

Yes. Pug was renamed from Jade in 2016 due to a trademark conflict. The syntax is the same — Pug is the modern name.

### Can I use Pug with CSS preprocessors?

Absolutely. In Web Maker you can pair Pug with SCSS, SASS, LESS, or Stylus in the same playground for a fully-preprocessed front-end.

### Does Web Maker support Pug includes and extends?

Web Maker compiles single-file Pug templates. For multi-file templates with `include`/`extends`, use Web Maker's Files mode for full project structures.

### Where is Pug commonly used?

Pug is widely used in Express.js applications, static site generators, email template builders, and any Node.js project that needs a templating engine.
