# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web-Maker is a blazing fast offline web playground that supports multiple preprocessors and offers both a Chrome extension and web app. The codebase is built with Preact and includes a comprehensive build system for both web and extension distributions.

## Development Commands

### Build & Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Production build using Preact CLI
- `npm start` - Start dev server with preview server (combines dev + gulp start-preview-server)
- `npm run start:all` - Start dev server + preview server + collab server

### Testing & Quality

- `npm test` - Run Jest tests (uses `tests/` directory with mocks in `tests/__mocks__/`)
- `npm run lint` - Run ESLint on src directory
- `npm run cypress` - Run end-to-end tests with Cypress
- `npm run cypress:open` - Open Cypress test runner interactively

### Build Distribution

- `gulp release` - Full production release (web app + extension)
- `gulp devRelease` - Development release
- `gulp buildExtension` - Build Chrome extension only

### Internationalization

- `npm run extract` - Extract translatable strings from source
- `npm run compile` - Compile translations for runtime use
- `npm run add-locale` - Add new locale

## Architecture Overview

### Core Structure

- **src/components/app.jsx** - Main application component managing global state, modals, and user interactions. State flows down through props (no state management library).
- **src/components/ContentWrap.jsx** - 3-pane editor layout (HTML/CSS/JS)
- **src/components/ContentWrapFiles.jsx** - File-based project mode with sidebar navigation
- **src/components/MainHeader.jsx** - Top toolbar with actions and controls

### Key Services

- **src/itemService.js** - Handles creation storage/retrieval (local & cloud)
- **src/firebaseInit.js** + **src/auth.js** - Firebase authentication and user management
- **src/db.js** - Database abstraction layer for settings and local storage
- **src/analytics.js** - Event tracking via GA; web app and extension use different GA configs
- **src/notifications.js** - Alert system service

### Editor Infrastructure

- **src/computes.js** - Code preprocessing (HTML/CSS/JS transformations)
- **src/codeModes.js** - Defines supported preprocessors (Pug, SCSS, TypeScript, etc.)
- **src/fileUtils.js** - File system operations for file-based projects
- **src/utils.js** - Core utilities including HTML generation, preview handling, and `window.IS_EXTENSION` flag

### Build System

- **gulpfile.js** - Build pipeline that packages for both web app and Chrome extension
- **preact.config.js** - Preact CLI configuration with webpack customizations (disables HTML minification, sets relative paths for prod)

### Preview System

The app communicates with the preview iframe via `postMessage`:

- Main app sends code to iframe: `frame.contentWindow.postMessage(obj, '*')`
- Preview iframe sends console logs back: `mainWindow.postMessage({ logs }, '*')`
- Preview frame runs on localhost:7888 (dev) or wbmakr.com (prod)
- `src/lib/screenlog.js` handles console interception inside the preview
- `src/detached-window.js` manages the detached preview window mode

### Extension Integration

The Chrome extension shares the same codebase. Key differences are handled via `window.IS_EXTENSION` (set in `src/utils.js`), which adds `is-extension` or `is-app` CSS class to body. Extension-specific files:

- **src/manifest.json** - MV3 extension manifest
- **src/eventPage.js** - Background service worker
- **src/options.js** - Extension options page

## Coding Patterns

### Styling

All styles live in **one file: `src/style.css`**. No CSS modules or component-scoped CSS.

- Use BEM-like naming (e.g., `.help-modal__title`, `.console__log`)
- Use CSS custom properties for theming: `:root` for dark theme, `body.light-theme` for light overrides
- When adding light theme support, add `body.light-theme .your-class` overrides

### Layout Components

Use `Stack`, `VStack`, `HStack` from `src/components/Stack.jsx` for flex layouts instead of writing custom CSS. They accept `gap` (index into predefined scale or raw value), `align`, `justify`, `wrap`, `fullWidth`, `fullHeight` props.

### i18n

All user-facing strings must be wrapped for translation using `@lingui/macro`:

- JSX content: `<Trans>Hello world</Trans>`
- Attribute strings: Use `<I18n>{({ i18n }) => <div title={i18n._(t`tooltip`)} />}</I18n>`
- Config: `.linguirc.json` and `.babelrc` (includes `macros` plugin)
- Locale files: `src/locales/{lang}/messages.js`

### Changelog

The changelog is in `src/components/Changelog.jsx`. Each version is a `<Notification>` component with `version` prop. The latest version should have `isLatest={true}`. Individual items use `<NotificationItem type="bug|ui|a11y">` or plain `<li>` with `<strong>` for feature names.

### Cypress Tests

- Tests in `cypress/integration/*.test.js`
- Custom `cy.init()` command visits app and closes the welcome modal
- Use `data-testid` attributes for element selection

## File Mode vs 3-Pane Mode

- **3-Pane Mode**: Traditional HTML/CSS/JS editors side-by-side
- **File Mode**: Full file system with folder structure, limited to 2 projects for free users, unlimited for PRO
