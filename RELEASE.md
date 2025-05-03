## Release steps for Chrome extension

- Checkout master
- Update changelog and commit
- Change version in following places:
  - app.jsx
  - options.html
  - package.json
  - manifest.json
- commit and tag (`git tag {version}`)
- Conditional code changes for extension:
  - Remove base tag from index.ejs
  - Remove auth code for signInWithPopup
  - Remove ga.js loading in analytics.js and add window.ga = () => {};
  - Remove lemonsqueezy.js script loading from useCheckout.js
  - Change import from 'firebase/auth' to 'firebase/auth/web-extension'
- Run `gulp buildExtension`. This will generate a folder called `extension`.
- Test out the extension by loading the `extension` folder.
- If everything is good, push to master.
- Zip the folder and submit to webstore.

## Sidenotes

- The /preview folder needs to hosted on separate domain (wbmakr.com on production)
- Whenever something changes in /preview folder, the built version of /preview (inside /create) needs to re-uploaded
