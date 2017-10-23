## How to contribute to Web Maker

Web Maker is written in vanilla JavaScript, CSS & HTML. It uses few open-source 3rd party JavaScript libraries for things like splitting panes, syntax highlighting etc. There is no build process involved in running Web Maker on your local system.

### Run Web Maker locally on your machine

- Clone the repo `git clone git@github.com:chinchang/web-maker.git`.
- Go to Chrome extension settings page [chrome://extensions/](chrome://extensions/).
- Click on **Load unpacked extension** button.
- Select the `src` folder in the repo you just cloned.
- Done! You'll now have a Web Maker icon added in your browser's right-top area. Click that and you'll run your local copy of Web Maker.

### Code changes

- Before starting any code work, run `npm install` in the repo folder. This is required to install some git hooks which do linting & formatting.
- Also, create a new branch out of master branch with the name as `fix-{ISSUE_ID}-anything-more-here`. For example, if you are working on issue #23 regarding implementing a mobile mode, your branch could be called `fix-23-mobile-mode`.
- Now you can simply make code changes inside `src/` folder and refresh in browser to see them.
- Once you are done, open a pull request here by selecting right branch: [https://github.com/chinchang/web-maker/compare](https://github.com/chinchang/web-maker/compare).