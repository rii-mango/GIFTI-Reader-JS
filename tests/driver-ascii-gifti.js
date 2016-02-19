
/*jslint browser: true, node: true */
/*global require, module, describe, it */

"use strict";

var assert = require("assert");
var fs = require('fs');

var gifti = require('../src/gifti.js');

var xmlStr = fs.readFileSync('./tests/data/ascii.surf.gii', "utf8");
var gii = null;

describe('GIFTI-Reader-JS', function () {
    describe('gifti test', function () {
        it('should not throw error when reading file', function (done) {
            assert.doesNotThrow(function() {
                gii = gifti.parse(xmlStr);
                done();
            });
        });

        it('dataArrays.length should equals 2', function () {
            assert.equal(2, gii.dataArrays.length);
        });

        it('isAscii() should equals true', function () {
            assert.equal(true, gii.getPointsDataArray().isAscii());
            assert.equal(true, gii.getTrianglesDataArray().isAscii());
        });

        it('getNumPoints() should equals 143479', function () {
            assert.equal(143479, gii.getNumPoints());
        });

        it('getNumTriangles() should equals 286954', function () {
            assert.equal(286954, gii.getNumTriangles());
        });

        it('point data checksum should equal 470863325', function () {
            var imageData = gii.getPointsDataArray().getData();
            var checksum = gifti.Utils.crc32(new DataView(imageData.buffer));
            assert.equal(checksum, 470863325);
        });

        it('triangle data checksum should equal 3159833463', function () {
            var imageData = gii.getTrianglesDataArray().getData();
            var checksum = gifti.Utils.crc32(new DataView(imageData.buffer));
            assert.equal(checksum, 3159833463);
        });
    });
});
