
/*jslint browser: true, node: true */
/*global require, module */

"use strict";

/*** Imports ***/

/**
 * gifti
 * @type {{}}
 */
var gifti = gifti || {};

gifti.Utils = gifti.Utils || ((typeof require !== 'undefined') ? require('./utilities.js') : null);
gifti.DataArray = gifti.DataArray || ((typeof require !== 'undefined') ? require('./dataArray.js') : null);
gifti.Transform = gifti.Transform || ((typeof require !== 'undefined') ? require('./transform.js') : null);
gifti.Label = gifti.Label || ((typeof require !== 'undefined') ? require('./label.js') : null);

var sax = sax || ((typeof require !== 'undefined') ? require('sax') : null);


/*** Static Pseudo-constants ***/

gifti.TAG_TRANSFORM = "CoordinateSystemTransformMatrix";
gifti.TAG_DATA = "Data";
gifti.TAG_DATAARRAY = "DataArray";
gifti.TAG_DATASPACE = "DataSpace";
gifti.TAG_GIFTI = "GIFTI";
gifti.TAG_LABEL = "Label";
gifti.TAG_LABELTABLE = "LabelTable";
gifti.TAG_MATRIXDATA = "MatrixData";
gifti.TAG_METADATA = "MetaData";
gifti.TAG_MD = "MD";
gifti.TAG_NAME = "Name";
gifti.TAG_TRANSFORMEDSPACE = "TransformedSpace";
gifti.TAG_VALUE = "Value";



/*** Constructor ***/

/**
 * The GIFTI constructor.
 * @constructor
 * @property {object} attributes
 * @property {object} metadata
 * @property {gifti.DataArray[]} dataArrays
 * @type {Function}
 */
gifti.GIFTI = gifti.GIFTI || function () {
    this.attributes = null;
    this.metadata = {};
    this.dataArrays = [];
    this.labelTable = [];
};



/*** Prototype Methods ***/

/**
 * Returns the point set data array.
 * @returns {gifti.DataArray}
 */
gifti.GIFTI.prototype.getPointsDataArray = function () {
    var ctr;

    for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
        if (this.dataArrays[ctr].isPointSet()) {
            return this.dataArrays[ctr];
        }
    }

    return null;
};


/**
 * Returns the triangle indices data array.
 * @returns {gifti.DataArray}
 */
gifti.GIFTI.prototype.getTrianglesDataArray = function () {
    var ctr;

    for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
        if (this.dataArrays[ctr].isTriangles()) {
            return this.dataArrays[ctr];
        }
    }

    return null;
};


/**
 * Returns the normals data array.
 * @returns {gifti.DataArray}
 */
gifti.GIFTI.prototype.getNormalsDataArray = function () {
    var ctr;

    for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
        if (this.dataArrays[ctr].isNormals()) {
            return this.dataArrays[ctr];
        }
    }

    return null;
};



/**
 * Returns the colors data array.
 * @returns {gifti.DataArray}
 */
gifti.GIFTI.prototype.getColorsDataArray = function () {
    var ctr;

    for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
        if (this.dataArrays[ctr].isColors()) {
            return this.dataArrays[ctr];
        }
    }

    return null;
};



/**
 * Returns the number of points.
 * @returns {number}
 */
gifti.GIFTI.prototype.getNumPoints = function () {
    var ctr;

    for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
        if (this.dataArrays[ctr].isPointSet()) {
            return this.dataArrays[ctr].getNumElements();
        }
    }

    return 0;
};


/**
 * Returns the number of triangles.
 * @returns {number}
 */
gifti.GIFTI.prototype.getNumTriangles = function () {
    var ctr;

    for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
        if (this.dataArrays[ctr].isTriangles()) {
            return this.dataArrays[ctr].getNumElements();
        }
    }

    return 0;
};



/*** Static Methods ***/

/**
 * Returns true if this filename contains ".gii"
 * @param filename
 * @returns {boolean}
 */
gifti.isThisFormat = function (filename) {
    return (filename.indexOf(".gii") !== -1);
};



/**
 * Parses GIFTI data.
 * @param {string} xmlStr
 * @returns {gifti.GIFTI}
 */
gifti.parse = function (xmlStr) {
    var parser = sax.parser(true),
        gii = null,
        currentDataArray = null,
        currentMetadataHolder = null,
        currentMetadataName = null,
        currentMetadataValue = null,
        currentTransform = null,
        currentString = "",
        currentLabel = null,
        isReadingGIFTI = false,
        isReadingMetadata = false,
        isReadingMD = false,
        isReadingName = false,
        isReadingValue = false,
        isReadingDataArray = false,
        isReadingTransform = false,
        isReadingDataSpace = false,
        isReadingTransformedSpace = false,
        isReadingMatrixData = false,
        isReadingData = false,
        isReadingLabelTable = false,
        isReadingLabel = false;

    parser.onopentag = function (node) {
        if (node.name === gifti.TAG_GIFTI) {
            isReadingGIFTI = true;
            currentMetadataHolder = gii = new gifti.GIFTI();
            gii.attributes = node.attributes;
        } else if (node.name === gifti.TAG_METADATA) {
            isReadingMetadata = true;
        } else if (node.name === gifti.TAG_MD) {
            isReadingMD = true;
        } else if (node.name === gifti.TAG_NAME) {
            isReadingName = true;
        } else if (node.name === gifti.TAG_VALUE) {
            isReadingValue = true;
        } else if (node.name === gifti.TAG_LABELTABLE) {
            isReadingLabelTable = true;
        } else if (node.name === gifti.TAG_LABEL) {
            isReadingLabel = true;
            currentLabel = new gifti.Label(node.attributes);
        } else if (node.name === gifti.TAG_DATAARRAY) {
            isReadingDataArray = true;
            currentMetadataHolder = currentDataArray = new gifti.DataArray();
            gii.dataArrays.push(currentDataArray);
            currentDataArray.attributes = node.attributes;
        } else if (node.name === gifti.TAG_TRANSFORM) {
            isReadingTransform = true;
            currentTransform = new gifti.Transform();
            currentDataArray.transforms.push(currentTransform);
        } else if (node.name === gifti.TAG_DATASPACE) {
            isReadingDataSpace = true;
        } else if (node.name === gifti.TAG_TRANSFORMEDSPACE) {
            isReadingTransformedSpace = true;
        } else if (node.name === gifti.TAG_MATRIXDATA) {
            isReadingMatrixData = true;
        } else if (node.name === gifti.TAG_DATA) {
            isReadingData = true;
        }
    };

    parser.ontext = parser.oncdata = function (text) {
        if (isReadingName) {
            currentString += text;
        } else if (isReadingValue) {
            currentString += text;
        } else if (isReadingDataSpace) {
            currentString += text;
        } else if (isReadingTransformedSpace) {
            currentString += text;
        } else if (isReadingMatrixData) {
            currentString += text;
        } else if (isReadingData) {
            currentString += text;
        } else if (isReadingLabel) {
            currentString += text;
        }
    };

    parser.onclosetag = function (tagName) {
        if (tagName === gifti.TAG_GIFTI) {
            isReadingGIFTI = false;
        } else if (tagName === gifti.TAG_METADATA) {
            isReadingMetadata = false;
        } else if (tagName === gifti.TAG_MD) {
            isReadingMD = false;
            if (currentMetadataHolder) {
                currentMetadataHolder.metadata[currentMetadataName] = currentMetadataValue;
            }
        } else if (tagName === gifti.TAG_NAME) {
            isReadingName = false;
            currentMetadataName = currentString;
            currentString = "";
        } else if (tagName === gifti.TAG_VALUE) {
            isReadingValue = false;
            currentMetadataValue = currentString;
            currentString = "";
        } else if (tagName === gifti.TAG_LABELTABLE) {
            isReadingLabelTable = false;
        } else if (tagName === gifti.TAG_LABEL) {
            currentLabel.label = currentString.trim();
            gii.labelTable[currentLabel.key] = currentLabel;
            currentString = "";
        } else if (tagName === gifti.TAG_DATAARRAY) {
            isReadingDataArray = false;
        } else if (tagName === gifti.TAG_TRANSFORM) {
            isReadingTransform = false;
        } else if (tagName === gifti.TAG_DATASPACE) {
            isReadingDataSpace = false;
            currentTransform.dataSpace = currentString;
            currentString = "";
        } else if (tagName === gifti.TAG_TRANSFORMEDSPACE) {
            isReadingTransformedSpace = false;
            currentTransform.transformedSpace = currentString;
            currentString = "";
        } else if (tagName === gifti.TAG_MATRIXDATA) {
            isReadingMatrixData = false;
            currentTransform.matrixData = currentString;
            currentString = "";
        } else if (tagName === gifti.TAG_DATA) {
            isReadingData = false;
            currentDataArray.data = currentString;
            currentString = "";
        }
    };

    parser.onerror = function (e) {
        console.log(e);
    };

    parser.write(xmlStr).close();

    return gii;
};



/*** Exports ***/

var moduleType = typeof module;
if ((moduleType !== 'undefined') && module.exports) {
    module.exports = gifti;
}
