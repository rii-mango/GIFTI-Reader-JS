
/*jslint browser: true, node: true */
/*global require, module */

"use strict";

/*** Imports ***/

var gifti = gifti || {};



/*** Constructor ***/

/**
 * The Transform constructor.
 * @constructor
 * @property {string} dataSpace
 * @property {string} transformedSpace
 * @property {number[]} matrixData
 * @type {Function}
 */
gifti.Transform = gifti.Transform || function () {
    this.dataSpace = null;
    this.transformedSpace = null;
    this.matrixData = null;
};



/*** Exports ***/

var moduleType = typeof module;
if ((moduleType !== 'undefined') && module.exports) {
    module.exports = gifti.Transform;
}
