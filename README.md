Web Sequence  [![Gitter](https://badges.gitter.im/zenuml/Lobby.svg)](https://gitter.im/zenuml/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
======

**Web Sequence** is a Chrome Extension and a Web App that convert your Chrome tab into a sequence diagram generator. Something like CodePen or JSFiddle, but for sequence diagram generation.

### [Go to Web App](https://app.zenuml.com)

![Screenshot](/screenshots/ss1.png)

### Deployment

Shared steps:
1. Make sure you are on the right branch (`master`).
1. `yarn build` to build the product release
1. `yarn release` to copy build files to app / extension
1. `http-server ./app` to verify build in ./app
1. `access localhost instead of 127.0.0.1` to allow firebase access

#### Chrome extension
1. Update `version` in `extension/manifest.json`
1. Zip the `extension` folder
1. `yarn upload` to upload the extension to Google Web Store
1. `yarn pub` to publish the extension

> Optimisation: The #3 step in the shared steps would generate a zip file. The #2 step can be omitted if 
we pass the generated zip file name to the script of `yarn upload` and `yarn pub`.

#### Post deployment

1. Uninstall and reinstall [the latest version of extension](https://chrome.google.com/webstore/detail/web-sequence/kcpganeflmhffnlofpdmcjklmdpbbmef)
1. Do smoke test by creating a new diagram

#### Web App
1. `yarn deploy`
1. Go to Cloudflare to invalid all cache

> Optimisation: Add postfix to the JS files and CSS files, so that we do not have to invalid cache every time.

#### Post development

1. Go to [the page of app](https://app.zenuml.com)
2. Do smoke test by create a new diagram

### Development

#### First time setup

````
$ yarn install  // instal modules
$ yarn start    // start a local server

$ yarn build    // build a staging release
$ yarn build-prod    // build a production release
$ gulp release  // copy resources to app / extension
````

#### Enable/Disable DEBUG

In Chrome console, type in `document.cookie='DEBUG=true'` or `document.cookie='DEBUG=;max-age=1'`.

````
$ yarn link vue-sequence # use un-uglyfied version
$ webpack                # build bundle.js to src/lib
````

### Install
Install it from [Chrome Web Store - Web Sequence](https://chrome.google.com/webstore/detail/web-sequence/kcpganeflmhffnlofpdmcjklmdpbbmef). You can also search "Web Sequence" or "Sequence Diagram" to find it.

### Features

* Supports method call, internal method, alt (if/else) and loop (for, foreach, while) keywords
* Works offline
* Save and load your creations
* Auto-save feature
* Code auto-completion
* Import & Export all creations anytime, anywhere
* Multiple editor themes & other configurable settings
* Font options + use any system font!
* Very easily accessible. Simply open a new tab in Chrome! (in chrome extension only)
* Capture preview screenshot (in Chrome extension only)

Follow [@ZenUml](https://twitter.com/intent/follow?screen_name=ZenUml) for updates or tweet out feature requests and suggestions.

### Support Web Sequence

Web Sequence is completely free and open-source. If you find it useful, you can show your support by sharing it in your social network or by simply letting me know how much you 💖 it by tweeting to [@ZenUml](https://twitter.com/ZenUml).

### Awesome libraries used

* This project is a fork of [Web Maker](https://github.com/chinchang/web-maker)
* The diagram generator is built on top of [VueJs](https://vuejs.org/)

### License

MIT Licensed

Copyright (c) 2017 Peng Xiao, [ZenUml.com](http://ZenUml.com)
