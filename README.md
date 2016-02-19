# GIFTI-Reader-JS
A JavaScript GIFTI file format reader.  This reader will parse GIFTI files, with added support for .surf.gii files.

###Usage
See the [tests](https://github.com/rii-mango/GIFTI-Reader-JS/tree/master/tests) folder for more examples.

```javascript
var gii = gifti.parse(giftiXMLString);

// DataArrays will be Float32Array, Uint8Array or Int32Array as specified in GIFTI header
var points = gii.getPointsDataArray().getData();
var indices = gii.getTrianglesDataArray().getData();
var normals = gii.getNormalsDataArray().getData();
```

###Install
Get a packaged source file:

* [gifti-reader.js](https://raw.githubusercontent.com/rii-mango/GIFTI-Reader-JS/master/release/current/gifti-reader.js)
* [gifti-reader-min.js](https://raw.githubusercontent.com/rii-mango/GIFTI-Reader-JS/master/release/current/gifti-reader-min.js)

Or install via [NPM](https://www.npmjs.com/):

```
npm install gifti-reader-js
```

Or install via [Bower](http://bower.io/):

```
bower install gifti-reader-js
```

###Testing
```
npm test
```

###Building
See the [release folder](https://github.com/rii-mango/GIFTI-Reader-JS/tree/master/release) for the latest builds or build it yourself using:
```
npm run build
```
This will output gifti-reader.js and gifti-reader-min.js to build/.


Acknowledgments
-----
GIFTI-Reader-JS makes use of the following third-party libraries:
- [pako](https://github.com/nodeca/pako) &mdash; for GZIP inflating
- [sax-js](https://github.com/isaacs/sax-js) &mdash; for SAX parsing
