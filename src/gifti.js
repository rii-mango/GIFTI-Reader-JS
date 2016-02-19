
/*jslint browser: true, node: true */
/*global require, module */

"use strict";

/*** Imports ***/

var gifti = gifti || {};
gifti.Utils = gifti.Utils || ((typeof require !== 'undefined') ? require('./utilities.js') : null);

var pako = pako || ((typeof require !== 'undefined') ? require('pako') : null);

var sax = sax || ((typeof require !== 'undefined') ? require('sax') : null);


/*** Static Pseudo-constants ***/

gifti.TAG_MATRIX = "CoordinateSystemTransformMatrix";
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
gifti.GIFTI = gifti.GIFTI || function () {
    this.attributes = null;
    this.metadata = {};
};




gifti.parse = function(xmlStr) {
    var parser = sax.parser(true),
        gii = null,
        currentMetadataHolder = null,
        currentMetadataName = null,
        currentMetadataValue = null,
        isReadingGIFTI = false,
        isReadingMetadata = false,
        isReadingMD = false,
        isReadingName = false,
        isReadingValue = false;

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
        }
    };

    parser.ontext = parser.oncdata = function (text) {
        if (isReadingName) {
            currentMetadataName = text;
        } else if (isReadingValue) {
            currentMetadataValue = text;
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
        } else if (tagName === gifti.TAG_VALUE) {
            isReadingValue = false;
        }
    };

    parser.onerror = function (e) {
        // an error happened.
    };

    parser.onend = function () {
        console.log(gii.metadata);
    };

    parser.write(xmlStr).close();

    return gii;
};



/*** Exports ***/

var moduleType = typeof module;
if ((moduleType !== 'undefined') && module.exports) {
    module.exports = gifti;
}
