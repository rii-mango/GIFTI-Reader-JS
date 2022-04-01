
/*jslint browser: true, node: true */
/*global require, module, describe, it */

"use strict";

var assert = require("assert");
var fs = require('fs');

var gifti = require('../src/gifti.js');

var xmlStr = fs.readFileSync('./tests/data/gzip.surf.gii', "utf8");
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

        it('isGzipBase64Binary() should equals true', function () {
            assert.equal(true, gii.getPointsDataArray().isGzipBase64Binary());
            assert.equal(true, gii.getTrianglesDataArray().isGzipBase64Binary());
        });

        it('getNumPoints() should equals 5124', function () {
            assert.equal(5124, gii.getNumPoints());
        });

        it('getNumTriangles() should equals 10240', function () {
            assert.equal(10240, gii.getNumTriangles());
        });

        it('point data checksum should equal 3339061177', function () {
            var imageData = gii.getPointsDataArray().getData();
            var checksum = gifti.Utils.crc32(new DataView(imageData.buffer));
            assert.equal(checksum, 3339061177);
        });

        it('triangle data checksum should equal 1071946961', function () {
            var imageData = gii.getTrianglesDataArray().getData();
            var checksum = gifti.Utils.crc32(new DataView(imageData.buffer));
            assert.equal(checksum, 1071946961);
        });
    });
});
