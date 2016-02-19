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
