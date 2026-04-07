---
title: 'URL Parameters'
---

Web Maker supports several URL query parameters that let you open the editor in a pre-configured state. These are useful for sharing direct links, building landing pages, embedding playgrounds in tutorials, and bookmarking specific setups.

All parameters work on the `/create/` URL, e.g. `https://webmaker.app/create/?cssMode=scss`.

## Pre-fill code

Pre-populate any of the three editors with code. Values must be URL-encoded.

| Parameter | Description                |
| --------- | -------------------------- |
| `html`    | Initial HTML pane content  |
| `css`     | Initial CSS pane content   |
| `js`      | Initial JavaScript content |

**Example** — open the editor with a "Hello world" snippet:

```
https://webmaker.app/create/?html=%3Ch1%3EHello%20world%3C%2Fh1%3E
```

You can combine multiple panes:

```
https://webmaker.app/create/?html=%3Ch1%3EHi%3C%2Fh1%3E&css=h1%20%7B%20color%3A%20red%3B%20%7D
```

## Pre-select a preprocessor

Open the editor with a specific HTML, CSS or JavaScript preprocessor already selected. This is the same dropdown choice you'd otherwise make from the pane header.

| Parameter  | Allowed values                                  |
| ---------- | ----------------------------------------------- |
| `htmlMode` | `html`, `markdown`, `jade` (Pug)                |
| `cssMode`  | `css`, `scss`, `sass`, `less`, `stylus`, `acss` |
| `jsMode`   | `js`, `es6`, `coffee`, `typescript`             |

**Examples**

Open with SCSS pre-selected:

```
https://webmaker.app/create/?cssMode=scss
```

Open with TypeScript pre-selected:

```
https://webmaker.app/create/?jsMode=typescript
```

Open with Pug + SCSS + TypeScript all at once:

```
https://webmaker.app/create/?htmlMode=jade&cssMode=scss&jsMode=typescript
```

Invalid mode values are silently ignored — your default settings are used instead.

## Combine code + preprocessor

Pre-fill code **and** select the right preprocessor in a single URL. This is what the SEO playground pages on webmaker.app use.

**Example** — open with SCSS pre-selected and a tiny demo seeded:

```
https://webmaker.app/create/?cssMode=scss&html=%3Cdiv%20class%3D%22card%22%3E%3Ch2%3EHello%3C%2Fh2%3E%3C%2Fdiv%3E&css=%24c%3A%20%23ff6c00%3B%0A.card%20%7B%20background%3A%20%24c%3B%20%7D
```

## Layout

Pick a specific editor layout when opening Web Maker.

| Parameter | Allowed values                  | Meaning                                                |
| --------- | ------------------------------- | ------------------------------------------------------ |
| `layout`  | `1`, `2`, `3`, `4`, `5`, `full` | Layout mode index. `full` is shorthand for layout `4`. |

**Example** — open in full preview layout:

```
https://webmaker.app/create/?layout=full
```

## Override settings

Force-override specific user settings via URL. Useful for debugging when a setting can't be toggled from the UI, or for sharing a link that disables a feature.

```
https://webmaker.app/create/?settings=key1:value1,key2:value2
```

Currently supported keys:

- `autoPreview` — `true` / `false`
- `isMonacoEditorOn` — `true` / `false`

**Example** — open with auto-preview off and Monaco editor disabled:

```
https://webmaker.app/create/?settings=autoPreview:false,isMonacoEditorOn:false
```

## URL encoding tips

Code values must be percent-encoded so they're safe in URLs. The most common substitutions:

| Character | Encoded     |
| --------- | ----------- |
| space     | `%20`       |
| newline   | `%0A`       |
| `<`       | `%3C`       |
| `>`       | `%3E`       |
| `"`       | `%22`       |
| `'`       | `%27`       |
| `#`       | `%23`       |
| `&`       | `%26`       |
| `=`       | `%3D`       |
| `{` `}`   | `%7B` `%7D` |
| `[` `]`   | `%5B` `%5D` |

In JavaScript, the easiest way to build a parameter value is `encodeURIComponent(yourCode)`.

## Combining parameters

All parameters can be combined freely using `&` between them. Example — Pug + SCSS + a tiny demo, in full layout:

```
https://webmaker.app/create/?htmlMode=jade&cssMode=scss&layout=full&html=h1%20Hi&css=h1%20%7B%20color%3A%20tomato%3B%20%7D
```
