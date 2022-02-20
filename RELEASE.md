## Release steps for Chrome extension

- Checkout master
- Change version in following places:
  - app.jsx
  - options.html
  - package.json
  - manifest.json
- Run `gulp build-extension`
- Test out extension-{version}.zip
