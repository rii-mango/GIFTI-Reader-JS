
/*jslint browser: true, node: true */
/*global require, module, describe, it */

"use strict";

var assert = require("assert");
var fs = require('fs');

var gifti = require('../src/gifti.js');

var xmlStr = fs.readFileSync('./tests/data/ascii.label.gii', "utf8");
var gii = null;

describe('GIFTI-Reader-JS', function () {
    describe('test ascii.label.gii', function () {
        it('should not throw error when reading file', function (done) {
            assert.doesNotThrow(function() {
                gii = gifti.parse(xmlStr);
                done();
            });
        });

        it('dataArrays.length should equals 1', function () {
            assert.equal(1, gii.dataArrays.length);
        });

        it('isAscii() should equals true', function () {
            assert.equal(true, gii.dataArrays[0].isAscii());
        });

        it('gii.labelTable.length should equal 3', function () {
            assert.equal(3, gii.labelTable.length);
        });

        it('last label properties should be 0.008, 1, 1, 1, Negative', function () {
            assert.equal(0.008, gii.labelTable['2'].r);
            assert.equal(1, gii.labelTable['2'].g);
            assert.equal(1, gii.labelTable['2'].b);
            assert.equal(1, gii.labelTable['2'].a);
            assert.equal("Negative", gii.labelTable['2'].label);
        });
    });
});
