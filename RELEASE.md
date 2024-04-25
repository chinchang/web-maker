## Release steps for Chrome extension

- Checkout master
- Update changelog and commit
- Change version in following places:
  - app.jsx
  - options.html
  - package.json
  - manifest.json
- commit and tag (`git tag {version}`)
- Run `gulp buildExtension`. This will generate a zip - `extension-{version}.zip`
- Test out extension-{version}.zip
- If everything is good, push to master
