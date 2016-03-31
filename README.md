# GIFTI-Reader-JS
A JavaScript [GIFTI](https://www.nitrc.org/projects/gifti/) file format reader.  This reader parses GIFTI files and supports ASCII, Base64, and GZIP-Base64 datatypes.

###Usage
[API](https://github.com/rii-mango/GIFTI-Reader-JS/wiki/API) and [more examples](https://github.com/rii-mango/GIFTI-Reader-JS/tree/master/tests)
```javascript
var gii = gifti.parse(giftiXMLString);

// DataArray.getData() will return Float32Array, Uint8Array or Int32Array depending on datatype
var points = gii.getPointsDataArray().getData();
var indices = gii.getTrianglesDataArray().getData();
var normals = gii.getNormalsDataArray().getData();
var colors = gii.getColorsDataArray().getData();
var labels = gii.labelTable;
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
