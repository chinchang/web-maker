npm install atomizer
touch atomizer.js
echo "require('atomizer');" > atomizer.js
webpack --output-library Atomizer --output-library-target umd atomizer atomizer-web.js
uglifyjs atomizer-web.js --compress > atomizer-web.min.js
echo 'window.atomizer = new Atomizer();' >> atomizer-web.min.js
mv atomizer-web.min.js src/lib/atomizer.browser.js
rm atomizer-web.js atomizer.js
