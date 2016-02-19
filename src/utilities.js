
/*jslint browser: true, node: true */
/*global require, module */

"use strict";

/*** Imports ***/

var gifti = gifti || {};
gifti.Utils = gifti.Utils || {};



/*** Static Pseudo-constants ***/

gifti.Utils.crcTable = null;



/*** Static methods ***/

// http://stackoverflow.com/questions/18638900/javascript-crc32
gifti.Utils.makeCRCTable = function(){
    var c;
    var crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
};



gifti.Utils.crc32 = function(dataView) {
    var crcTable = gifti.Utils.crcTable || (gifti.Utils.crcTable = gifti.Utils.makeCRCTable());
    var crc = 0 ^ (-1);

    for (var i = 0; i < dataView.byteLength; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ dataView.getUint8(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
};



/*** Exports ***/

var moduleType = typeof module;
if ((moduleType !== 'undefined') && module.exports) {
    module.exports = gifti.Utils;
}
