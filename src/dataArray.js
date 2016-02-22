
/*jslint browser: true, node: true */
/*global require, module */

"use strict";

/*** Imports ***/

var gifti = gifti || {};
gifti.Transform = gifti.Transform || ((typeof require !== 'undefined') ? require('./transform.js') : null);

var Base64Binary = Base64Binary || ((typeof require !== 'undefined') ? require('../lib/base64-binary.js') : null);

var pako = pako || ((typeof require !== 'undefined') ? require('pako') : null);



/*** Static Pseudo-constants ***/

gifti.NIFTI_INTENT_GENMATRIX = "NIFTI_INTENT_GENMATRIX";
gifti.NIFTI_INTENT_LABEL = "NIFTI_INTENT_LABEL";
gifti.NIFTI_INTENT_NODE_INDEX = "NIFTI_INTENT_NODE_INDEX";
gifti.NIFTI_INTENT_POINTSET = "NIFTI_INTENT_POINTSET";
gifti.NIFTI_INTENT_RGB_VECTOR = "NIFTI_INTENT_RGB_VECTOR";
gifti.NIFTI_INTENT_RGBA_VECTOR = "NIFTI_INTENT_RGBA_VECTOR";
gifti.NIFTI_INTENT_SHAPE = "NIFTI_INTENT_SHAPE";
gifti.NIFTI_INTENT_TIME_SERIES = "NIFTI_INTENT_TIME_SERIES";
gifti.NIFTI_INTENT_TRIANGLE = "NIFTI_INTENT_TRIANGLE";
gifti.NIFTI_INTENT_NONE = "NIFTI_INTENT_NONE";
gifti.NIFTI_INTENT_VECTOR = "NIFTI_INTENT_VECTOR";

gifti.ATT_ARRAYINDEXINGORDER = "ArrayIndexingOrder";
gifti.ATT_DATATYPE = "DataType";
gifti.ATT_DIMENSIONALITY = "Dimensionality";
gifti.ATT_DIMN = "Dim";
gifti.ATT_ENCODING = "Encoding";
gifti.ATT_ENDIAN = "Endian";
gifti.ATT_EXTERNALFILENAME = "ExternalFileName";
gifti.ATT_EXTERNALFILEOFFSET = "ExternalFileOffset";
gifti.ATT_INTENT = "Intent";

gifti.ENCODING_ASCII = "ASCII";
gifti.ENCODING_BASE64BINARY = "Base64Binary";
gifti.ENCODING_GZIPBASE64BINARY = "GZipBase64Binary";
gifti.ENCODING_EXTERNALFILEBINARY = "ExternalFileBinary";

gifti.TYPE_NIFTI_TYPE_UINT8 = "NIFTI_TYPE_UINT8";
gifti.TYPE_NIFTI_TYPE_INT32 = "NIFTI_TYPE_INT32";
gifti.TYPE_NIFTI_TYPE_FLOAT32 = "NIFTI_TYPE_FLOAT32";



/*** Constructor ***/

/**
 * The DataArray constructor.
 * @constructor
 * @property {object} attributes
 * @property {object} metadata
 * @property {gifti.Transform[]} transforms
 * @property {Float32Array|Uint8Array|Int32Array} data
 * @type {Function}
 */
gifti.DataArray = gifti.DataArray || function () {
    this.attributes = null;
    this.metadata = {};
    this.transforms = [];
    this.data = null;
    this.dataConverted = false;
};



/*** Prototype Methods ***/

/**
 * Returns true if this data array represents a point set.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isPointSet = function() {
    return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_POINTSET;
};


/**
 * Returns true if this data array represents triangle indices.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isTriangles = function() {
    return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_TRIANGLE;
};


/**
 * Returns true if this data array represents normals.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isNormals = function() {
    return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_VECTOR;
};


/**
 * Returns the number of dimensions of this data array.
 * @returns {number}
 */
gifti.DataArray.prototype.getDimensions = function() {
    return parseInt(this.attributes[gifti.ATT_DIMENSIONALITY]);
};


/**
 * Returns the number of elements in the specified dimension.
 * @param {number} dimIndex
 * @returns {number}
 */
gifti.DataArray.prototype.getNumElements = function(dimIndex) {
    if (dimIndex === undefined) {
        dimIndex = 0;
    }
    
    return parseInt(this.attributes[gifti.ATT_DIMN + dimIndex]);
};


/**
 * Returns true if this data array represents scalar data.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isScalar = function() {
    return (this.getDimensions() == 1);
};


/**
 * Returns true if this data array is in triples.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isTriple = function() {
    return ((this.getDimensions() == 2) && (this.getNumElements(1) == 3));
};


/**
 * Returns true if this data array is in quads.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isQuad = function() {
    return ((this.getDimensions() == 2) && (this.getNumElements(1) == 4));
};


/**
 * Returns true if this data array is encoded in ASCII format.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isAscii = function() {
    return (gifti.ENCODING_ASCII === this.attributes[gifti.ATT_ENCODING]);
};


/**
 * Returns true if this data array is encoded in Base64 format.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isBase64Binary = function() {
    return (gifti.ENCODING_BASE64BINARY === this.attributes[gifti.ATT_ENCODING]);
};


/**
 * Returns true if this data array is encoded in GZIP-Base64 format.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isGzipBase64Binary = function() {
    return (gifti.ENCODING_GZIPBASE64BINARY === this.attributes[gifti.ATT_ENCODING]);
};


/**
 * Returns true if this data array uses Base64 encoding.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isBase64Encoded = function() {
    return this.isBase64Binary() || this.isGzipBase64Binary();
};


/**
 * Returns true if the datatype is 32-bit floating point.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isFloat32 = function() {
    return (gifti.TYPE_NIFTI_TYPE_FLOAT32 === this.attributes[gifti.ATT_DATATYPE]);
};


/**
 * Returns true if the datatype is 32-bit signed integer.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isInt32 = function() {
    return (gifti.TYPE_NIFTI_TYPE_INT32 === this.attributes[gifti.ATT_DATATYPE]);
};


/**
 * Returns true if the datatype is 8-bit unsigned integer.
 * @returns {boolean}
 */
gifti.DataArray.prototype.isUnsignedInt8 = function() {
    return (gifti.TYPE_NIFTI_TYPE_UINT8 === this.attributes[gifti.ATT_DATATYPE]);
};


/**
 * Returns the data as a typed array (either Float32Array, Uint8Array or Int32Array)
 * @returns {Float32Array|Uint8Array|Int32Array}
 */
gifti.DataArray.prototype.getData = function() {
    if (!this.dataConverted) {
        this.dataConverted = true;

        if (this.isAscii()) {
            if (this.isUnsignedInt8()) {
                gifti.DataArray.readUnsignedInt8ASCII(this);
            } else if (this.isInt32()) {
                gifti.DataArray.readSignedInt32ASCII(this);
            } else {
                gifti.DataArray.readFloat32ASCII(this);
            }
        } else if (this.isBase64Binary()) {
            if (this.isUnsignedInt8()) {
                gifti.DataArray.readUnsignedInt8Base64(this);
            } else if (this.isInt32()) {
                gifti.DataArray.readSignedInt32Base64(this);
            } else {
                gifti.DataArray.readFloat32Base64(this);
            }
        } else if (this.isGzipBase64Binary()) {
            if (this.isUnsignedInt8()) {
                gifti.DataArray.readUnsignedInt8GZIPBase64(this);
            } else if (this.isInt32()) {
                gifti.DataArray.readSignedInt32GZIPBase64(this);
            } else {
                gifti.DataArray.readFloat32GZIPBase64(this);
            }
        }
    }

    return this.data;
};



// http://stackoverflow.com/questions/17374893/how-to-extract-floating-numbers-from-strings-in-javascript
gifti.DataArray.readFloat32ASCII = function(obj) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    obj.data = new Float32Array(obj.data.match(regex).map(function(v) { return parseFloat(v); }));
};



gifti.DataArray.readSignedInt32ASCII = function(obj) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    obj.data = new Int32Array(obj.data.match(regex).map(function(v) { return parseInt(v); }));
};



gifti.DataArray.readUnsignedInt8ASCII = function(obj) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    obj.data = new Uint8Array(obj.data.match(regex).map(function(v) { return parseInt(v); }));
};



gifti.DataArray.readUnsignedInt8Base64 = function(obj) {
    var rawData = Base64Binary.decodeArrayBuffer(obj.data);
    obj.data = new Uint8Array(rawData, 0, rawData.byteLength);
};



gifti.DataArray.readSignedInt32Base64 = function(obj) {
    var rawData = Base64Binary.decodeArrayBuffer(obj.data);
    obj.data = new Int32Array(rawData, 0, rawData.byteLength / 4);
};



gifti.DataArray.readFloat32Base64 = function(obj) {
    var rawData = Base64Binary.decodeArrayBuffer(obj.data);
    obj.data = new Float32Array(rawData, 0, rawData.byteLength / 4);
};



gifti.DataArray.readUnsignedInt8GZIPBase64 = function(obj) {
    var rawData = Base64Binary.decodeArrayBuffer(obj.data);
    rawData = pako.inflate(rawData).buffer;
    obj.data = new Uint8Array(rawData, 0, rawData.byteLength);
};



gifti.DataArray.readSignedInt32GZIPBase64 = function(obj) {
    var rawData = Base64Binary.decodeArrayBuffer(obj.data);
    rawData = pako.inflate(rawData).buffer;
    obj.data = new Int32Array(rawData, 0, rawData.byteLength / 4);
};



gifti.DataArray.readFloat32GZIPBase64 = function(obj) {
    var rawData = Base64Binary.decodeArrayBuffer(obj.data);
    rawData = pako.inflate(rawData).buffer;
    obj.data = new Float32Array(rawData, 0, rawData.byteLength / 4);
};



/*** Exports ***/

var moduleType = typeof module;
if ((moduleType !== 'undefined') && module.exports) {
    module.exports = gifti.DataArray;
}
