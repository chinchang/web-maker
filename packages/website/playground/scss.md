---
title: 'Free Online SCSS Editor & Playground'
subtitle: 'Write SCSS, see compiled CSS instantly. Works offline. No setup required.'
shortName: 'SCSS'
fileExt: 'scss'
accentColor: '#cf649a'
badgeText: 'CSS Preprocessor'
sampleCode: |
  $primary: #ff6c00;
  $radius: 8px;

  .card {
    background: white;
    border-radius: $radius;
    padding: 2rem;

    &:hover {
      box-shadow: 0 10px 40px rgba($primary, 0.2);
    }

    &__title {
      color: $primary;
      font-size: 1.5rem;
    }
  }
layout: playground.html
description: 'Free online SCSS compiler and editor. Write SCSS/Sass code and see it compile to CSS in real-time. Works completely offline. No installation needed.'
---

## What is SCSS?

**SCSS (Sassy CSS)** is a CSS preprocessor that extends CSS with powerful features like variables, nesting, mixins, and functions. It compiles down to standard CSS that browsers can understand.

SCSS uses the `.scss` file extension and is fully compatible with regular CSS syntax - any valid CSS is also valid SCSS.

## Why Use Web Maker for SCSS?

- **Instant compilation** - See your SCSS compile to CSS as you type
- **Works offline** - Compile SCSS locally, no server needed
- **Zero setup** - No npm, no webpack, no config files
- **Live preview** - See your styles applied instantly
- **Export anywhere** - Copy compiled CSS or export to CodePen

<h2 id="quick-reference">SCSS Quick Reference</h2>

### Variables

Store reusable values:

```scss
$primary-color: #ff6c00;
$font-stack: 'Helvetica', sans-serif;
$spacing: 1rem;

body {
	font-family: $font-stack;
	color: $primary-color;
	padding: $spacing;
}
```

### Nesting

Write cleaner, hierarchical CSS:

```scss
nav {
	background: #333;

	ul {
		list-style: none;
		margin: 0;
	}

	a {
		color: white;
		text-decoration: none;

		&:hover {
			color: #ff6c00;
		}
	}
}
```

### Mixins

Create reusable style blocks:

```scss
@mixin flex-center {
	display: flex;
	align-items: center;
	justify-content: center;
}

@mixin button($bg-color) {
	background: $bg-color;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	color: white;
}

.container {
	@include flex-center;
}

.btn-primary {
	@include button(#ff6c00);
}
```

### Partials & Import

Organize your styles into multiple files:

```scss
// _variables.scss
$primary: #ff6c00;

// _buttons.scss
.btn {
	background: $primary;
}

// main.scss
@import 'variables';
@import 'buttons';
```

### Functions

Built-in and custom functions for calculations:

```scss
// Built-in functions
.element {
	color: darken(#ff6c00, 10%);
	background: lighten(#ff6c00, 40%);
	border-color: rgba(#ff6c00, 0.5);
}

// Custom function
@function spacing($multiplier) {
	@return $multiplier * 8px;
}

.card {
	padding: spacing(2); // 16px
	margin-bottom: spacing(3); // 24px
}
```

### Extend / Inheritance

Share styles between selectors:

```scss
%button-base {
	padding: 0.5rem 1rem;
	border-radius: 4px;
	font-weight: bold;
}

.btn-primary {
	@extend %button-base;
	background: #ff6c00;
}

.btn-secondary {
	@extend %button-base;
	background: #666;
}
```

## SCSS vs Sass vs CSS

| Feature        | CSS                         | SCSS              | Sass                 |
| -------------- | --------------------------- | ----------------- | -------------------- |
| Variables      | Limited (custom properties) | Yes               | Yes                  |
| Nesting        | No                          | Yes               | Yes                  |
| Mixins         | No                          | Yes               | Yes                  |
| Syntax         | Standard                    | CSS-like (braces) | Indented (no braces) |
| File extension | .css                        | .scss             | .sass                |

**Web Maker supports both SCSS and Sass syntax.**

## Common SCSS Patterns

### Responsive Breakpoints

```scss
$breakpoints: (
	'sm': 576px,
	'md': 768px,
	'lg': 992px,
	'xl': 1200px
);

@mixin respond-to($breakpoint) {
	@media (min-width: map-get($breakpoints, $breakpoint)) {
		@content;
	}
}

.container {
	padding: 1rem;

	@include respond-to('md') {
		padding: 2rem;
	}
}
```

### Theme Colors

```scss
$colors: (
	'primary': #ff6c00,
	'secondary': #666,
	'success': #28a745,
	'danger': #dc3545
);

@each $name, $color in $colors {
	.text-#{$name} {
		color: $color;
	}

	.bg-#{$name} {
		background-color: $color;
	}
}
```

## Frequently Asked Questions

### Can I use SCSS variables with CSS custom properties?

Yes! You can compile SCSS variables into CSS custom properties for runtime theming:

```scss
$primary: #ff6c00;

:root {
	--primary: #{$primary};
}
```

### Does Web Maker support Sass (indented syntax)?

Yes, Web Maker supports both SCSS (.scss) and the original indented Sass (.sass) syntax.

### Is the compiled CSS minified?

Web Maker outputs readable, formatted CSS. You can copy the compiled output and use any minifier for production.
