
/*jslint browser: true, node: true */
/*global require, module, describe, it */

"use strict";

var assert = require("assert");
var fs = require('fs');

var gifti = require('../src/gifti.js');

var xmlStr = fs.readFileSync('./tests/data/gifti.case1.inflated.L.surf.gii', "utf8");
var gii = null;

describe('GIFTI-Reader-JS', function () {
    describe('gifti test', function () {
        it('should not throw error when reading file', function (done) {
            assert.doesNotThrow(function() {
                gii = gifti.parse(xmlStr);
                done();
            });
        });
    });
});
