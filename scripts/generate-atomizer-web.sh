# needs node >= 20
npm install atomizer 
npm i -g parcel
parcel build scripts/atomizer.mjs --no-source-maps
mv dist/atomizer.js src/lib/transpilers/atomizer.browser.js
rm -rf dist
