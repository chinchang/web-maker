---
title: 'Using external libraries'
---

Web Maker lets you include external JavaScript and CSS libraries in your creations. Click the **Add Library** button in the header to open the library manager.

## Adding a library

There are three ways to add an external library:

### 1. Search on CDNJS

Type a library name in the search bar at the top of the Add Library panel. Web Maker searches the CDNJS database and shows up to 10 suggestions. Select a library to automatically add its URL.

### 2. Choose from popular libraries

Use the **"Choose from popular libraries"** dropdown to quickly add commonly used libraries like jQuery, Bootstrap, React, Vue, D3, Three.js, Tailwind CSS, p5.js, Animate.css, and more.

### 3. Paste a CDN URL

You can directly paste any CDN URL into the **JS** or **CSS** text areas. Put each library URL on a new line.

For example:

```
https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js
https://cdn.jsdelivr.net/npm/lodash/lodash.min.js
```

## How it works

- CSS library URLs are injected as `<link>` tags in the `<head>` of your preview.
- JS library URLs are injected as `<script>` tags before the closing `</body>` tag, so they load before your own JavaScript runs.

## Supported CDN domains (Chrome extension)

When using the Chrome extension, external libraries can be loaded from the following domains:

- cdnjs.cloudflare.com
- cdn.jsdelivr.net
- unpkg.com
- ajax.googleapis.com
- code.jquery.com
- maxcdn.bootstrapcdn.com
- cdn.tailwindcss.com
- cdn77.com
- rawgit.com
- localhost

The web app does not have this domain restriction.
