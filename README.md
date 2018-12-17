Web Sequence  [![Gitter](https://badges.gitter.im/zenuml/Lobby.svg)](https://gitter.im/zenuml/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
======

**Web Sequence** is a chrome extension that converts your Chrome tab into a sequence diagram generator. Something like CodePen or JSFiddle, but for sequence diagram generation.

### [Go to Web App](https://app.zenuml.com)

![Screenshot](/screenshots/ss1.png)

### Development

#### First time setup

````
$ yarn install  // instal modules
$ yarn start    // start a local server

$ yarn build    // build a production release
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
