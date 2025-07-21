# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web-Maker is a blazing fast offline web playground that supports multiple preprocessors and offers both a Chrome extension and web app. The codebase is built with Preact and includes a comprehensive build system for both web and extension distributions.

## Development Commands

### Build & Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Production build using Preact CLI
- `npm start` - Start dev server with preview server (combines dev + gulp start-preview-server)

### Testing & Quality

- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint on src directory
- `npm run cypress` - Run end-to-end tests with Cypress
- `npm run cypress:open` - Open Cypress test runner

### Build Distribution

- `gulp release` - Full production release (web app + extension)
- `gulp devRelease` - Development release
- `gulp buildExtension` - Build Chrome extension only

### Internationalization

- `npm run extract` - Extract translatable strings
- `npm run compile` - Compile translations
- `npm run add-locale` - Add new locale

## Architecture Overview

### Core Structure

- **src/components/app.jsx** - Main application component managing global state, modals, and user interactions
- **src/components/ContentWrap.jsx** - 3-pane editor layout (HTML/CSS/JS)
- **src/components/ContentWrapFiles.jsx** - File-based project mode with sidebar navigation
- **src/components/MainHeader.jsx** - Top toolbar with actions and controls

### Key Services

- **src/itemService.js** - Handles creation storage/retrieval (local & cloud)
- **src/firebaseInit.js** + **src/auth.js** - Firebase authentication and user management
- **src/db.js** - Database abstraction layer for settings and local storage
- **src/analytics.js** - Event tracking
- **src/notifications.js** - Alert system service

### Editor Infrastructure

- **src/computes.js** - Code preprocessing (HTML/CSS/JS transformations)
- **src/codeModes.js** - Defines supported preprocessors (Pug, SCSS, TypeScript, etc.)
- **src/fileUtils.js** - File system operations for file-based projects
- **src/utils.js** - Core utilities including HTML generation and preview handling

### Build System

- **gulpfile.js** - Complex build pipeline that packages for both web app and Chrome extension
- **preact.config.js** - Preact CLI configuration with webpack customizations
- Supports both traditional 3-pane mode and file-based project mode

### Preview System

Sophisticated preview system that:

- Generates complete HTML documents from separated HTML/CSS/JS
- Supports preprocessor compilation
- Handles external library injection
- Includes service worker for offline file serving in file mode

### Extension Integration

The Chrome extension shares the same codebase but includes additional files:

- **src/manifest.json** - Extension manifest
- **src/eventPage.js** - Background script
- **src/options.js** - Extension options page

## Development Notes

### Running Tests

- Jest tests are in `tests/` directory with mocks in `tests/__mocks__/`
- Cypress e2e tests cover core user workflows
- Tests use browser mocks for extension APIs

### File Mode vs 3-Pane Mode

The application supports two distinct modes:

- **3-Pane Mode**: Traditional HTML/CSS/JS editors side-by-side
- **File Mode**: Full file system with folder structure, currently limited to 2 projects for free users

### Code Generation

When working on the preview system or file handling, note that the app dynamically generates complete HTML documents and handles virtual file systems for the preview iframe.

### State Management

The main App component manages extensive global state including user authentication, current project, preferences, and modal states. Most state flows down through props rather than using a dedicated state management library.
