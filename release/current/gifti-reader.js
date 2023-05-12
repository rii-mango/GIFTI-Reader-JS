"use strict";
var gifti = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/utilities.js
  var require_utilities = __commonJS({
    "src/utilities.js"(exports, module) {
      "use strict";
      var gifti = gifti || {};
      gifti.Utils = gifti.Utils || {};
      gifti.Utils.crcTable = null;
      gifti.Utils.makeCRCTable = function() {
        var c;
        var crcTable = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          }
          crcTable[n] = c;
        }
        return crcTable;
      };
      gifti.Utils.crc32 = function(dataView) {
        var crcTable = gifti.Utils.crcTable || (gifti.Utils.crcTable = gifti.Utils.makeCRCTable());
        var crc = 0 ^ -1;
        for (var i = 0; i < dataView.byteLength; i++) {
          crc = crc >>> 8 ^ crcTable[(crc ^ dataView.getUint8(i)) & 255];
        }
        return (crc ^ -1) >>> 0;
      };
      var moduleType = typeof module;
      if (moduleType !== "undefined" && module.exports) {
        module.exports = gifti.Utils;
      }
    }
  });

  // src/transform.js
  var require_transform = __commonJS({
    "src/transform.js"(exports, module) {
      "use strict";
      var gifti = gifti || {};
      gifti.Transform = gifti.Transform || function() {
        this.dataSpace = null;
        this.transformedSpace = null;
        this.matrixData = null;
      };
      var moduleType = typeof module;
      if (moduleType !== "undefined" && module.exports) {
        module.exports = gifti.Transform;
      }
    }
  });

  // lib/base64-binary.js
  var require_base64_binary = __commonJS({
    "lib/base64-binary.js"(exports, module) {
      "use strict";
      var Base64Binary = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        /* will return a  Uint8Array type */
        decodeArrayBuffer: function(input) {
          var lkey1 = this._keyStr.indexOf(input.charAt(input.length - 1));
          var lkey2 = this._keyStr.indexOf(input.charAt(input.length - 2));
          var bytes = input.length / 4 * 3;
          if (lkey1 == 64)
            bytes--;
          if (lkey2 == 64)
            bytes--;
          var ab = new ArrayBuffer(bytes);
          this.decode(input, ab, bytes);
          return ab;
        },
        decode: function(input, arrayBuffer, bytes) {
          var uarray;
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
          var j = 0;
          if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
          else
            uarray = new Uint8Array(bytes);
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          for (i = 0; i < bytes; i += 3) {
            enc1 = this._keyStr.indexOf(input.charAt(j++));
            enc2 = this._keyStr.indexOf(input.charAt(j++));
            enc3 = this._keyStr.indexOf(input.charAt(j++));
            enc4 = this._keyStr.indexOf(input.charAt(j++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            uarray[i] = chr1;
            if (enc3 != 64)
              uarray[i + 1] = chr2;
            if (enc4 != 64)
              uarray[i + 2] = chr3;
          }
          return uarray;
        }
      };
      var moduleType = typeof module;
      if (moduleType !== "undefined" && module.exports) {
        module.exports = Base64Binary;
      }
    }
  });

  // node_modules/fflate/lib/worker.cjs
  var require_worker = __commonJS({
    "node_modules/fflate/lib/worker.cjs"(exports) {
      "use strict";
      var ch2 = {};
      exports["default"] = function(c, id, msg, transfer, cb) {
        var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
          c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
        ], { type: "text/javascript" }))));
        w.onmessage = function(e) {
          var d = e.data, ed = d.$e$;
          if (ed) {
            var err = new Error(ed[0]);
            err["code"] = ed[1];
            err.stack = ed[2];
            cb(err, null);
          } else
            cb(null, d);
        };
        w.postMessage(msg, transfer);
        return w;
      };
    }
  });

  // node_modules/fflate/lib/index.cjs
  var require_lib = __commonJS({
    "node_modules/fflate/lib/index.cjs"(exports) {
      "use strict";
      var node_worker_1 = require_worker();
      var u8 = Uint8Array;
      var u16 = Uint16Array;
      var u32 = Uint32Array;
      var fleb = new u8([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        0,
        /* unused */
        0,
        0,
        /* impossible */
        0
      ]);
      var fdeb = new u8([
        0,
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        /* unused */
        0,
        0
      ]);
      var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      var freb = function(eb, start) {
        var b = new u16(31);
        for (var i2 = 0; i2 < 31; ++i2) {
          b[i2] = start += 1 << eb[i2 - 1];
        }
        var r = new u32(b[30]);
        for (var i2 = 1; i2 < 30; ++i2) {
          for (var j = b[i2]; j < b[i2 + 1]; ++j) {
            r[j] = j - b[i2] << 5 | i2;
          }
        }
        return [b, r];
      };
      var _a = freb(fleb, 2);
      var fl = _a[0];
      var revfl = _a[1];
      fl[28] = 258, revfl[258] = 28;
      var _b = freb(fdeb, 0);
      var fd = _b[0];
      var revfd = _b[1];
      var rev = new u16(32768);
      for (i = 0; i < 32768; ++i) {
        x = (i & 43690) >>> 1 | (i & 21845) << 1;
        x = (x & 52428) >>> 2 | (x & 13107) << 2;
        x = (x & 61680) >>> 4 | (x & 3855) << 4;
        rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
      }
      var x;
      var i;
      var hMap = function(cd, mb, r) {
        var s = cd.length;
        var i2 = 0;
        var l = new u16(mb);
        for (; i2 < s; ++i2) {
          if (cd[i2])
            ++l[cd[i2] - 1];
        }
        var le = new u16(mb);
        for (i2 = 0; i2 < mb; ++i2) {
          le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
        }
        var co;
        if (r) {
          co = new u16(1 << mb);
          var rvb = 15 - mb;
          for (i2 = 0; i2 < s; ++i2) {
            if (cd[i2]) {
              var sv = i2 << 4 | cd[i2];
              var r_1 = mb - cd[i2];
              var v = le[cd[i2] - 1]++ << r_1;
              for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
                co[rev[v] >>> rvb] = sv;
              }
            }
          }
        } else {
          co = new u16(s);
          for (i2 = 0; i2 < s; ++i2) {
            if (cd[i2]) {
              co[i2] = rev[le[cd[i2] - 1]++] >>> 15 - cd[i2];
            }
          }
        }
        return co;
      };
      var flt = new u8(288);
      for (i = 0; i < 144; ++i)
        flt[i] = 8;
      var i;
      for (i = 144; i < 256; ++i)
        flt[i] = 9;
      var i;
      for (i = 256; i < 280; ++i)
        flt[i] = 7;
      var i;
      for (i = 280; i < 288; ++i)
        flt[i] = 8;
      var i;
      var fdt = new u8(32);
      for (i = 0; i < 32; ++i)
        fdt[i] = 5;
      var i;
      var flm = /* @__PURE__ */ hMap(flt, 9, 0);
      var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
      var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
      var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
      var max = function(a) {
        var m = a[0];
        for (var i2 = 1; i2 < a.length; ++i2) {
          if (a[i2] > m)
            m = a[i2];
        }
        return m;
      };
      var bits = function(d, p, m) {
        var o = p / 8 | 0;
        return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
      };
      var bits16 = function(d, p) {
        var o = p / 8 | 0;
        return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
      };
      var shft = function(p) {
        return (p + 7) / 8 | 0;
      };
      var slc = function(v, s, e) {
        if (s == null || s < 0)
          s = 0;
        if (e == null || e > v.length)
          e = v.length;
        var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
        n.set(v.subarray(s, e));
        return n;
      };
      exports.FlateErrorCode = {
        UnexpectedEOF: 0,
        InvalidBlockType: 1,
        InvalidLengthLiteral: 2,
        InvalidDistance: 3,
        StreamFinished: 4,
        NoStreamHandler: 5,
        InvalidHeader: 6,
        NoCallback: 7,
        InvalidUTF8: 8,
        ExtraFieldTooLong: 9,
        InvalidDate: 10,
        FilenameTooLong: 11,
        StreamFinishing: 12,
        InvalidZipData: 13,
        UnknownCompressionMethod: 14
      };
      var ec = [
        "unexpected EOF",
        "invalid block type",
        "invalid length/literal",
        "invalid distance",
        "stream finished",
        "no stream handler",
        ,
        "no callback",
        "invalid UTF-8 data",
        "extra field too long",
        "date not in range 1980-2099",
        "filename too long",
        "stream finishing",
        "invalid zip data"
        // determined by unknown compression method
      ];
      var err = function(ind, msg, nt) {
        var e = new Error(msg || ec[ind]);
        e.code = ind;
        if (Error.captureStackTrace)
          Error.captureStackTrace(e, err);
        if (!nt)
          throw e;
        return e;
      };
      var inflt = function(dat, buf, st) {
        var sl = dat.length;
        if (!sl || st && st.f && !st.l)
          return buf || new u8(0);
        var noBuf = !buf || st;
        var noSt = !st || st.i;
        if (!st)
          st = {};
        if (!buf)
          buf = new u8(sl * 3);
        var cbuf = function(l2) {
          var bl = buf.length;
          if (l2 > bl) {
            var nbuf = new u8(Math.max(bl * 2, l2));
            nbuf.set(buf);
            buf = nbuf;
          }
        };
        var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
        var tbts = sl * 8;
        do {
          if (!lm) {
            final = bits(dat, pos, 1);
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
              var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
              if (t > sl) {
                if (noSt)
                  err(0);
                break;
              }
              if (noBuf)
                cbuf(bt + l);
              buf.set(dat.subarray(s, t), bt);
              st.b = bt += l, st.p = pos = t * 8, st.f = final;
              continue;
            } else if (type == 1)
              lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
              var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
              var tl = hLit + bits(dat, pos + 5, 31) + 1;
              pos += 14;
              var ldt = new u8(tl);
              var clt = new u8(19);
              for (var i2 = 0; i2 < hcLen; ++i2) {
                clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
              }
              pos += hcLen * 3;
              var clb = max(clt), clbmsk = (1 << clb) - 1;
              var clm = hMap(clt, clb, 1);
              for (var i2 = 0; i2 < tl; ) {
                var r = clm[bits(dat, pos, clbmsk)];
                pos += r & 15;
                var s = r >>> 4;
                if (s < 16) {
                  ldt[i2++] = s;
                } else {
                  var c = 0, n = 0;
                  if (s == 16)
                    n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
                  else if (s == 17)
                    n = 3 + bits(dat, pos, 7), pos += 3;
                  else if (s == 18)
                    n = 11 + bits(dat, pos, 127), pos += 7;
                  while (n--)
                    ldt[i2++] = c;
                }
              }
              var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
              lbt = max(lt);
              dbt = max(dt);
              lm = hMap(lt, lbt, 1);
              dm = hMap(dt, dbt, 1);
            } else
              err(1);
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
          }
          if (noBuf)
            cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (; ; lpos = pos) {
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
            if (!c)
              err(2);
            if (sym < 256)
              buf[bt++] = sym;
            else if (sym == 256) {
              lpos = pos, lm = null;
              break;
            } else {
              var add = sym - 254;
              if (sym > 264) {
                var i2 = sym - 257, b = fleb[i2];
                add = bits(dat, pos, (1 << b) - 1) + fl[i2];
                pos += b;
              }
              var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
              if (!d)
                err(3);
              pos += d & 15;
              var dt = fd[dsym];
              if (dsym > 3) {
                var b = fdeb[dsym];
                dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
              }
              if (pos > tbts) {
                if (noSt)
                  err(0);
                break;
              }
              if (noBuf)
                cbuf(bt + 131072);
              var end = bt + add;
              for (; bt < end; bt += 4) {
                buf[bt] = buf[bt - dt];
                buf[bt + 1] = buf[bt + 1 - dt];
                buf[bt + 2] = buf[bt + 2 - dt];
                buf[bt + 3] = buf[bt + 3 - dt];
              }
              bt = end;
            }
          }
          st.l = lm, st.p = lpos, st.b = bt, st.f = final;
          if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
        } while (!final);
        return bt == buf.length ? buf : slc(buf, 0, bt);
      };
      var wbits = function(d, p, v) {
        v <<= p & 7;
        var o = p / 8 | 0;
        d[o] |= v;
        d[o + 1] |= v >>> 8;
      };
      var wbits16 = function(d, p, v) {
        v <<= p & 7;
        var o = p / 8 | 0;
        d[o] |= v;
        d[o + 1] |= v >>> 8;
        d[o + 2] |= v >>> 16;
      };
      var hTree = function(d, mb) {
        var t = [];
        for (var i2 = 0; i2 < d.length; ++i2) {
          if (d[i2])
            t.push({ s: i2, f: d[i2] });
        }
        var s = t.length;
        var t2 = t.slice();
        if (!s)
          return [et, 0];
        if (s == 1) {
          var v = new u8(t[0].s + 1);
          v[t[0].s] = 1;
          return [v, 1];
        }
        t.sort(function(a, b) {
          return a.f - b.f;
        });
        t.push({ s: -1, f: 25001 });
        var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
        t[0] = { s: -1, f: l.f + r.f, l, r };
        while (i1 != s - 1) {
          l = t[t[i0].f < t[i22].f ? i0++ : i22++];
          r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
          t[i1++] = { s: -1, f: l.f + r.f, l, r };
        }
        var maxSym = t2[0].s;
        for (var i2 = 1; i2 < s; ++i2) {
          if (t2[i2].s > maxSym)
            maxSym = t2[i2].s;
        }
        var tr = new u16(maxSym + 1);
        var mbt = ln(t[i1 - 1], tr, 0);
        if (mbt > mb) {
          var i2 = 0, dt = 0;
          var lft = mbt - mb, cst = 1 << lft;
          t2.sort(function(a, b) {
            return tr[b.s] - tr[a.s] || a.f - b.f;
          });
          for (; i2 < s; ++i2) {
            var i2_1 = t2[i2].s;
            if (tr[i2_1] > mb) {
              dt += cst - (1 << mbt - tr[i2_1]);
              tr[i2_1] = mb;
            } else
              break;
          }
          dt >>>= lft;
          while (dt > 0) {
            var i2_2 = t2[i2].s;
            if (tr[i2_2] < mb)
              dt -= 1 << mb - tr[i2_2]++ - 1;
            else
              ++i2;
          }
          for (; i2 >= 0 && dt; --i2) {
            var i2_3 = t2[i2].s;
            if (tr[i2_3] == mb) {
              --tr[i2_3];
              ++dt;
            }
          }
          mbt = mb;
        }
        return [new u8(tr), mbt];
      };
      var ln = function(n, l, d) {
        return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
      };
      var lc = function(c) {
        var s = c.length;
        while (s && !c[--s])
          ;
        var cl = new u16(++s);
        var cli = 0, cln = c[0], cls = 1;
        var w = function(v) {
          cl[cli++] = v;
        };
        for (var i2 = 1; i2 <= s; ++i2) {
          if (c[i2] == cln && i2 != s)
            ++cls;
          else {
            if (!cln && cls > 2) {
              for (; cls > 138; cls -= 138)
                w(32754);
              if (cls > 2) {
                w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
                cls = 0;
              }
            } else if (cls > 3) {
              w(cln), --cls;
              for (; cls > 6; cls -= 6)
                w(8304);
              if (cls > 2)
                w(cls - 3 << 5 | 8208), cls = 0;
            }
            while (cls--)
              w(cln);
            cls = 1;
            cln = c[i2];
          }
        }
        return [cl.subarray(0, cli), s];
      };
      var clen = function(cf, cl) {
        var l = 0;
        for (var i2 = 0; i2 < cl.length; ++i2)
          l += cf[i2] * cl[i2];
        return l;
      };
      var wfblk = function(out, pos, dat) {
        var s = dat.length;
        var o = shft(pos + 2);
        out[o] = s & 255;
        out[o + 1] = s >>> 8;
        out[o + 2] = out[o] ^ 255;
        out[o + 3] = out[o + 1] ^ 255;
        for (var i2 = 0; i2 < s; ++i2)
          out[o + i2 + 4] = dat[i2];
        return (o + 4 + s) * 8;
      };
      var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
        wbits(out, p++, final);
        ++lf[256];
        var _a2 = hTree(lf, 15), dlt = _a2[0], mlb = _a2[1];
        var _b2 = hTree(df, 15), ddt = _b2[0], mdb = _b2[1];
        var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
        var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
        var lcfreq = new u16(19);
        for (var i2 = 0; i2 < lclt.length; ++i2)
          lcfreq[lclt[i2] & 31]++;
        for (var i2 = 0; i2 < lcdt.length; ++i2)
          lcfreq[lcdt[i2] & 31]++;
        var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
        var nlcc = 19;
        for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
          ;
        var flen = bl + 5 << 3;
        var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
        var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
        if (flen <= ftlen && flen <= dtlen)
          return wfblk(out, p, dat.subarray(bs, bs + bl));
        var lm, ll, dm, dl;
        wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
        if (dtlen < ftlen) {
          lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
          var llm = hMap(lct, mlcb, 0);
          wbits(out, p, nlc - 257);
          wbits(out, p + 5, ndc - 1);
          wbits(out, p + 10, nlcc - 4);
          p += 14;
          for (var i2 = 0; i2 < nlcc; ++i2)
            wbits(out, p + 3 * i2, lct[clim[i2]]);
          p += 3 * nlcc;
          var lcts = [lclt, lcdt];
          for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i2 = 0; i2 < clct.length; ++i2) {
              var len = clct[i2] & 31;
              wbits(out, p, llm[len]), p += lct[len];
              if (len > 15)
                wbits(out, p, clct[i2] >>> 5 & 127), p += clct[i2] >>> 12;
            }
          }
        } else {
          lm = flm, ll = flt, dm = fdm, dl = fdt;
        }
        for (var i2 = 0; i2 < li; ++i2) {
          if (syms[i2] > 255) {
            var len = syms[i2] >>> 18 & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
              wbits(out, p, syms[i2] >>> 23 & 31), p += fleb[len];
            var dst = syms[i2] & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
              wbits16(out, p, syms[i2] >>> 5 & 8191), p += fdeb[dst];
          } else {
            wbits16(out, p, lm[syms[i2]]), p += ll[syms[i2]];
          }
        }
        wbits16(out, p, lm[256]);
        return p + ll[256];
      };
      var deo = /* @__PURE__ */ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
      var et = /* @__PURE__ */ new u8(0);
      var dflt = function(dat, lvl, plvl, pre, post, lst) {
        var s = dat.length;
        var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
        var w = o.subarray(pre, o.length - post);
        var pos = 0;
        if (!lvl || s < 8) {
          for (var i2 = 0; i2 <= s; i2 += 65535) {
            var e = i2 + 65535;
            if (e >= s) {
              w[pos >> 3] = lst;
            }
            pos = wfblk(w, pos + 1, dat.subarray(i2, e));
          }
        } else {
          var opt = deo[lvl - 1];
          var n = opt >>> 13, c = opt & 8191;
          var msk_1 = (1 << plvl) - 1;
          var prev = new u16(32768), head = new u16(msk_1 + 1);
          var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
          var hsh = function(i3) {
            return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
          };
          var syms = new u32(25e3);
          var lf = new u16(288), df = new u16(32);
          var lc_1 = 0, eb = 0, i2 = 0, li = 0, wi = 0, bs = 0;
          for (; i2 < s; ++i2) {
            var hv = hsh(i2);
            var imod = i2 & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            if (wi <= i2) {
              var rem = s - i2;
              if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
                pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
                li = lc_1 = eb = 0, bs = i2;
                for (var j = 0; j < 286; ++j)
                  lf[j] = 0;
                for (var j = 0; j < 30; ++j)
                  df[j] = 0;
              }
              var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
              if (rem > 2 && hv == hsh(i2 - dif)) {
                var maxn = Math.min(n, rem) - 1;
                var maxd = Math.min(32767, i2);
                var ml = Math.min(258, rem);
                while (dif <= maxd && --ch_1 && imod != pimod) {
                  if (dat[i2 + l] == dat[i2 + l - dif]) {
                    var nl = 0;
                    for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                      ;
                    if (nl > l) {
                      l = nl, d = dif;
                      if (nl > maxn)
                        break;
                      var mmd = Math.min(dif, nl - 2);
                      var md = 0;
                      for (var j = 0; j < mmd; ++j) {
                        var ti = i2 - dif + j + 32768 & 32767;
                        var pti = prev[ti];
                        var cd = ti - pti + 32768 & 32767;
                        if (cd > md)
                          md = cd, pimod = ti;
                      }
                    }
                  }
                  imod = pimod, pimod = prev[imod];
                  dif += imod - pimod + 32768 & 32767;
                }
              }
              if (d) {
                syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
                var lin = revfl[l] & 31, din = revfd[d] & 31;
                eb += fleb[lin] + fdeb[din];
                ++lf[257 + lin];
                ++df[din];
                wi = i2 + l;
                ++lc_1;
              } else {
                syms[li++] = dat[i2];
                ++lf[dat[i2]];
              }
            }
          }
          pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
          if (!lst && pos & 7)
            pos = wfblk(w, pos + 1, et);
        }
        return slc(o, 0, pre + shft(pos) + post);
      };
      var crct = /* @__PURE__ */ function() {
        var t = new Int32Array(256);
        for (var i2 = 0; i2 < 256; ++i2) {
          var c = i2, k = 9;
          while (--k)
            c = (c & 1 && -306674912) ^ c >>> 1;
          t[i2] = c;
        }
        return t;
      }();
      var crc = function() {
        var c = -1;
        return {
          p: function(d) {
            var cr = c;
            for (var i2 = 0; i2 < d.length; ++i2)
              cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
            c = cr;
          },
          d: function() {
            return ~c;
          }
        };
      };
      var adler = function() {
        var a = 1, b = 0;
        return {
          p: function(d) {
            var n = a, m = b;
            var l = d.length | 0;
            for (var i2 = 0; i2 != l; ) {
              var e = Math.min(i2 + 2655, l);
              for (; i2 < e; ++i2)
                m += n += d[i2];
              n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
          },
          d: function() {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | a >>> 8 << 16 | (b & 255) << 8 | b >>> 8;
          }
        };
      };
      var dopt = function(dat, opt, pre, post, st) {
        return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
      };
      var mrg = function(a, b) {
        var o = {};
        for (var k in a)
          o[k] = a[k];
        for (var k in b)
          o[k] = b[k];
        return o;
      };
      var wcln = function(fn, fnStr, td2) {
        var dt = fn();
        var st = fn.toString();
        var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
        for (var i2 = 0; i2 < dt.length; ++i2) {
          var v = dt[i2], k = ks[i2];
          if (typeof v == "function") {
            fnStr += ";" + k + "=";
            var st_1 = v.toString();
            if (v.prototype) {
              if (st_1.indexOf("[native code]") != -1) {
                var spInd = st_1.indexOf(" ", 8) + 1;
                fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
              } else {
                fnStr += st_1;
                for (var t in v.prototype)
                  fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
              }
            } else
              fnStr += st_1;
          } else
            td2[k] = v;
        }
        return [fnStr, td2];
      };
      var ch = [];
      var cbfs = function(v) {
        var tl = [];
        for (var k in v) {
          if (v[k].buffer) {
            tl.push((v[k] = new v[k].constructor(v[k])).buffer);
          }
        }
        return tl;
      };
      var wrkr = function(fns, init, id, cb) {
        var _a2;
        if (!ch[id]) {
          var fnStr = "", td_1 = {}, m = fns.length - 1;
          for (var i2 = 0; i2 < m; ++i2)
            _a2 = wcln(fns[i2], fnStr, td_1), fnStr = _a2[0], td_1 = _a2[1];
          ch[id] = wcln(fns[m], fnStr, td_1);
        }
        var td2 = mrg({}, ch[id][1]);
        return node_worker_1["default"](ch[id][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
      };
      var bInflt = function() {
        return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8];
      };
      var bDflt = function() {
        return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
      };
      var gze = function() {
        return [gzh, gzhl, wbytes, crc, crct];
      };
      var guze = function() {
        return [gzs, gzl];
      };
      var zle = function() {
        return [zlh, wbytes, adler];
      };
      var zule = function() {
        return [zlv];
      };
      var pbf = function(msg) {
        return postMessage(msg, [msg.buffer]);
      };
      var gu8 = function(o) {
        return o && o.size && new u8(o.size);
      };
      var cbify = function(dat, opts, fns, init, id, cb) {
        var w = wrkr(fns, init, id, function(err2, dat2) {
          w.terminate();
          cb(err2, dat2);
        });
        w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
        return function() {
          w.terminate();
        };
      };
      var astrm = function(strm) {
        strm.ondata = function(dat, final) {
          return postMessage([dat, final], [dat.buffer]);
        };
        return function(ev) {
          return strm.push(ev.data[0], ev.data[1]);
        };
      };
      var astrmify = function(fns, strm, opts, init, id) {
        var t;
        var w = wrkr(fns, init, id, function(err2, dat) {
          if (err2)
            w.terminate(), strm.ondata.call(strm, err2);
          else {
            if (dat[1])
              w.terminate();
            strm.ondata.call(strm, err2, dat[0], dat[1]);
          }
        });
        w.postMessage(opts);
        strm.push = function(d, f) {
          if (!strm.ondata)
            err(5);
          if (t)
            strm.ondata(err(4, 0, 1), null, !!f);
          w.postMessage([d, t = f], [d.buffer]);
        };
        strm.terminate = function() {
          w.terminate();
        };
      };
      var b2 = function(d, b) {
        return d[b] | d[b + 1] << 8;
      };
      var b4 = function(d, b) {
        return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
      };
      var b8 = function(d, b) {
        return b4(d, b) + b4(d, b + 4) * 4294967296;
      };
      var wbytes = function(d, b, v) {
        for (; v; ++b)
          d[b] = v, v >>>= 8;
      };
      var gzh = function(c, o) {
        var fn = o.filename;
        c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
        if (o.mtime != 0)
          wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
        if (fn) {
          c[3] = 8;
          for (var i2 = 0; i2 <= fn.length; ++i2)
            c[i2 + 10] = fn.charCodeAt(i2);
        }
      };
      var gzs = function(d) {
        if (d[0] != 31 || d[1] != 139 || d[2] != 8)
          err(6, "invalid gzip data");
        var flg = d[3];
        var st = 10;
        if (flg & 4)
          st += d[10] | (d[11] << 8) + 2;
        for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
          ;
        return st + (flg & 2);
      };
      var gzl = function(d) {
        var l = d.length;
        return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
      };
      var gzhl = function(o) {
        return 10 + (o.filename && o.filename.length + 1 || 0);
      };
      var zlh = function(c, o) {
        var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
        c[0] = 120, c[1] = fl2 << 6 | (fl2 ? 32 - 2 * fl2 : 1);
      };
      var zlv = function(d) {
        if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31)
          err(6, "invalid zlib data");
        if (d[1] & 32)
          err(6, "invalid zlib data: preset dictionaries not supported");
      };
      function AsyncCmpStrm(opts, cb) {
        if (!cb && typeof opts == "function")
          cb = opts, opts = {};
        this.ondata = cb;
        return opts;
      }
      var Deflate = /* @__PURE__ */ function() {
        function Deflate2(opts, cb) {
          if (!cb && typeof opts == "function")
            cb = opts, opts = {};
          this.ondata = cb;
          this.o = opts || {};
        }
        Deflate2.prototype.p = function(c, f) {
          this.ondata(dopt(c, this.o, 0, 0, !f), f);
        };
        Deflate2.prototype.push = function(chunk, final) {
          if (!this.ondata)
            err(5);
          if (this.d)
            err(4);
          this.d = final;
          this.p(chunk, final || false);
        };
        return Deflate2;
      }();
      exports.Deflate = Deflate;
      var AsyncDeflate = /* @__PURE__ */ function() {
        function AsyncDeflate2(opts, cb) {
          astrmify([
            bDflt,
            function() {
              return [astrm, Deflate];
            }
          ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
          }, 6);
        }
        return AsyncDeflate2;
      }();
      exports.AsyncDeflate = AsyncDeflate;
      function deflate(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return cbify(data, opts, [
          bDflt
        ], function(ev) {
          return pbf(deflateSync(ev.data[0], ev.data[1]));
        }, 0, cb);
      }
      exports.deflate = deflate;
      function deflateSync(data, opts) {
        return dopt(data, opts || {}, 0, 0);
      }
      exports.deflateSync = deflateSync;
      var Inflate = /* @__PURE__ */ function() {
        function Inflate2(cb) {
          this.s = {};
          this.p = new u8(0);
          this.ondata = cb;
        }
        Inflate2.prototype.e = function(c) {
          if (!this.ondata)
            err(5);
          if (this.d)
            err(4);
          var l = this.p.length;
          var n = new u8(l + c.length);
          n.set(this.p), n.set(c, l), this.p = n;
        };
        Inflate2.prototype.c = function(final) {
          this.d = this.s.i = final || false;
          var bts = this.s.b;
          var dt = inflt(this.p, this.o, this.s);
          this.ondata(slc(dt, bts, this.s.b), this.d);
          this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
          this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
        };
        Inflate2.prototype.push = function(chunk, final) {
          this.e(chunk), this.c(final);
        };
        return Inflate2;
      }();
      exports.Inflate = Inflate;
      var AsyncInflate = /* @__PURE__ */ function() {
        function AsyncInflate2(cb) {
          this.ondata = cb;
          astrmify([
            bInflt,
            function() {
              return [astrm, Inflate];
            }
          ], this, 0, function() {
            var strm = new Inflate();
            onmessage = astrm(strm);
          }, 7);
        }
        return AsyncInflate2;
      }();
      exports.AsyncInflate = AsyncInflate;
      function inflate(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return cbify(data, opts, [
          bInflt
        ], function(ev) {
          return pbf(inflateSync(ev.data[0], gu8(ev.data[1])));
        }, 1, cb);
      }
      exports.inflate = inflate;
      function inflateSync(data, out) {
        return inflt(data, out);
      }
      exports.inflateSync = inflateSync;
      var Gzip = /* @__PURE__ */ function() {
        function Gzip2(opts, cb) {
          this.c = crc();
          this.l = 0;
          this.v = 1;
          Deflate.call(this, opts, cb);
        }
        Gzip2.prototype.push = function(chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
        };
        Gzip2.prototype.p = function(c, f) {
          this.c.p(c);
          this.l += c.length;
          var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
          if (this.v)
            gzh(raw, this.o), this.v = 0;
          if (f)
            wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
          this.ondata(raw, f);
        };
        return Gzip2;
      }();
      exports.Gzip = Gzip;
      exports.Compress = Gzip;
      var AsyncGzip = /* @__PURE__ */ function() {
        function AsyncGzip2(opts, cb) {
          astrmify([
            bDflt,
            gze,
            function() {
              return [astrm, Deflate, Gzip];
            }
          ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
          }, 8);
        }
        return AsyncGzip2;
      }();
      exports.AsyncGzip = AsyncGzip;
      exports.AsyncCompress = AsyncGzip;
      function gzip(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return cbify(data, opts, [
          bDflt,
          gze,
          function() {
            return [gzipSync];
          }
        ], function(ev) {
          return pbf(gzipSync(ev.data[0], ev.data[1]));
        }, 2, cb);
      }
      exports.gzip = gzip;
      exports.compress = gzip;
      function gzipSync(data, opts) {
        if (!opts)
          opts = {};
        var c = crc(), l = data.length;
        c.p(data);
        var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
        return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
      }
      exports.gzipSync = gzipSync;
      exports.compressSync = gzipSync;
      var Gunzip = /* @__PURE__ */ function() {
        function Gunzip2(cb) {
          this.v = 1;
          Inflate.call(this, cb);
        }
        Gunzip2.prototype.push = function(chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
            var s = this.p.length > 3 ? gzs(this.p) : 4;
            if (s >= this.p.length && !final)
              return;
            this.p = this.p.subarray(s), this.v = 0;
          }
          if (final) {
            if (this.p.length < 8)
              err(6, "invalid gzip data");
            this.p = this.p.subarray(0, -8);
          }
          Inflate.prototype.c.call(this, final);
        };
        return Gunzip2;
      }();
      exports.Gunzip = Gunzip;
      var AsyncGunzip = /* @__PURE__ */ function() {
        function AsyncGunzip2(cb) {
          this.ondata = cb;
          astrmify([
            bInflt,
            guze,
            function() {
              return [astrm, Inflate, Gunzip];
            }
          ], this, 0, function() {
            var strm = new Gunzip();
            onmessage = astrm(strm);
          }, 9);
        }
        return AsyncGunzip2;
      }();
      exports.AsyncGunzip = AsyncGunzip;
      function gunzip(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return cbify(data, opts, [
          bInflt,
          guze,
          function() {
            return [gunzipSync];
          }
        ], function(ev) {
          return pbf(gunzipSync(ev.data[0]));
        }, 3, cb);
      }
      exports.gunzip = gunzip;
      function gunzipSync(data, out) {
        return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
      }
      exports.gunzipSync = gunzipSync;
      var Zlib = /* @__PURE__ */ function() {
        function Zlib2(opts, cb) {
          this.c = adler();
          this.v = 1;
          Deflate.call(this, opts, cb);
        }
        Zlib2.prototype.push = function(chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
        };
        Zlib2.prototype.p = function(c, f) {
          this.c.p(c);
          var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
          if (this.v)
            zlh(raw, this.o), this.v = 0;
          if (f)
            wbytes(raw, raw.length - 4, this.c.d());
          this.ondata(raw, f);
        };
        return Zlib2;
      }();
      exports.Zlib = Zlib;
      var AsyncZlib = /* @__PURE__ */ function() {
        function AsyncZlib2(opts, cb) {
          astrmify([
            bDflt,
            zle,
            function() {
              return [astrm, Deflate, Zlib];
            }
          ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
          }, 10);
        }
        return AsyncZlib2;
      }();
      exports.AsyncZlib = AsyncZlib;
      function zlib(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return cbify(data, opts, [
          bDflt,
          zle,
          function() {
            return [zlibSync];
          }
        ], function(ev) {
          return pbf(zlibSync(ev.data[0], ev.data[1]));
        }, 4, cb);
      }
      exports.zlib = zlib;
      function zlibSync(data, opts) {
        if (!opts)
          opts = {};
        var a = adler();
        a.p(data);
        var d = dopt(data, opts, 2, 4);
        return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
      }
      exports.zlibSync = zlibSync;
      var Unzlib = /* @__PURE__ */ function() {
        function Unzlib2(cb) {
          this.v = 1;
          Inflate.call(this, cb);
        }
        Unzlib2.prototype.push = function(chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
            if (this.p.length < 2 && !final)
              return;
            this.p = this.p.subarray(2), this.v = 0;
          }
          if (final) {
            if (this.p.length < 4)
              err(6, "invalid zlib data");
            this.p = this.p.subarray(0, -4);
          }
          Inflate.prototype.c.call(this, final);
        };
        return Unzlib2;
      }();
      exports.Unzlib = Unzlib;
      var AsyncUnzlib = /* @__PURE__ */ function() {
        function AsyncUnzlib2(cb) {
          this.ondata = cb;
          astrmify([
            bInflt,
            zule,
            function() {
              return [astrm, Inflate, Unzlib];
            }
          ], this, 0, function() {
            var strm = new Unzlib();
            onmessage = astrm(strm);
          }, 11);
        }
        return AsyncUnzlib2;
      }();
      exports.AsyncUnzlib = AsyncUnzlib;
      function unzlib(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return cbify(data, opts, [
          bInflt,
          zule,
          function() {
            return [unzlibSync];
          }
        ], function(ev) {
          return pbf(unzlibSync(ev.data[0], gu8(ev.data[1])));
        }, 5, cb);
      }
      exports.unzlib = unzlib;
      function unzlibSync(data, out) {
        return inflt((zlv(data), data.subarray(2, -4)), out);
      }
      exports.unzlibSync = unzlibSync;
      var Decompress = /* @__PURE__ */ function() {
        function Decompress2(cb) {
          this.G = Gunzip;
          this.I = Inflate;
          this.Z = Unzlib;
          this.ondata = cb;
        }
        Decompress2.prototype.push = function(chunk, final) {
          if (!this.ondata)
            err(5);
          if (!this.s) {
            if (this.p && this.p.length) {
              var n = new u8(this.p.length + chunk.length);
              n.set(this.p), n.set(chunk, this.p.length);
            } else
              this.p = chunk;
            if (this.p.length > 2) {
              var _this_1 = this;
              var cb = function() {
                _this_1.ondata.apply(_this_1, arguments);
              };
              this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
              this.s.push(this.p, final);
              this.p = null;
            }
          } else
            this.s.push(chunk, final);
        };
        return Decompress2;
      }();
      exports.Decompress = Decompress;
      var AsyncDecompress = /* @__PURE__ */ function() {
        function AsyncDecompress2(cb) {
          this.G = AsyncGunzip;
          this.I = AsyncInflate;
          this.Z = AsyncUnzlib;
          this.ondata = cb;
        }
        AsyncDecompress2.prototype.push = function(chunk, final) {
          Decompress.prototype.push.call(this, chunk, final);
        };
        return AsyncDecompress2;
      }();
      exports.AsyncDecompress = AsyncDecompress;
      function decompress(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzip(data, opts, cb) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflate(data, opts, cb) : unzlib(data, opts, cb);
      }
      exports.decompress = decompress;
      function decompressSync(data, out) {
        return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, out) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, out) : unzlibSync(data, out);
      }
      exports.decompressSync = decompressSync;
      var fltn = function(d, p, t, o) {
        for (var k in d) {
          var val = d[k], n = p + k, op = o;
          if (Array.isArray(val))
            op = mrg(o, val[1]), val = val[0];
          if (val instanceof u8)
            t[n] = [val, op];
          else {
            t[n += "/"] = [new u8(0), op];
            fltn(val, n, t, o);
          }
        }
      };
      var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
      var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
      var tds = 0;
      try {
        td.decode(et, { stream: true });
        tds = 1;
      } catch (e) {
      }
      var dutf8 = function(d) {
        for (var r = "", i2 = 0; ; ) {
          var c = d[i2++];
          var eb = (c > 127) + (c > 223) + (c > 239);
          if (i2 + eb > d.length)
            return [r, slc(d, i2 - 1)];
          if (!eb)
            r += String.fromCharCode(c);
          else if (eb == 3) {
            c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
          } else if (eb & 1)
            r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);
          else
            r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);
        }
      };
      var DecodeUTF8 = /* @__PURE__ */ function() {
        function DecodeUTF82(cb) {
          this.ondata = cb;
          if (tds)
            this.t = new TextDecoder();
          else
            this.p = et;
        }
        DecodeUTF82.prototype.push = function(chunk, final) {
          if (!this.ondata)
            err(5);
          final = !!final;
          if (this.t) {
            this.ondata(this.t.decode(chunk, { stream: true }), final);
            if (final) {
              if (this.t.decode().length)
                err(8);
              this.t = null;
            }
            return;
          }
          if (!this.p)
            err(4);
          var dat = new u8(this.p.length + chunk.length);
          dat.set(this.p);
          dat.set(chunk, this.p.length);
          var _a2 = dutf8(dat), ch2 = _a2[0], np = _a2[1];
          if (final) {
            if (np.length)
              err(8);
            this.p = null;
          } else
            this.p = np;
          this.ondata(ch2, final);
        };
        return DecodeUTF82;
      }();
      exports.DecodeUTF8 = DecodeUTF8;
      var EncodeUTF8 = /* @__PURE__ */ function() {
        function EncodeUTF82(cb) {
          this.ondata = cb;
        }
        EncodeUTF82.prototype.push = function(chunk, final) {
          if (!this.ondata)
            err(5);
          if (this.d)
            err(4);
          this.ondata(strToU8(chunk), this.d = final || false);
        };
        return EncodeUTF82;
      }();
      exports.EncodeUTF8 = EncodeUTF8;
      function strToU8(str, latin1) {
        if (latin1) {
          var ar_1 = new u8(str.length);
          for (var i2 = 0; i2 < str.length; ++i2)
            ar_1[i2] = str.charCodeAt(i2);
          return ar_1;
        }
        if (te)
          return te.encode(str);
        var l = str.length;
        var ar = new u8(str.length + (str.length >> 1));
        var ai = 0;
        var w = function(v) {
          ar[ai++] = v;
        };
        for (var i2 = 0; i2 < l; ++i2) {
          if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + (l - i2 << 1));
            n.set(ar);
            ar = n;
          }
          var c = str.charCodeAt(i2);
          if (c < 128 || latin1)
            w(c);
          else if (c < 2048)
            w(192 | c >> 6), w(128 | c & 63);
          else if (c > 55295 && c < 57344)
            c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i2) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
          else
            w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
        }
        return slc(ar, 0, ai);
      }
      exports.strToU8 = strToU8;
      function strFromU8(dat, latin1) {
        if (latin1) {
          var r = "";
          for (var i2 = 0; i2 < dat.length; i2 += 16384)
            r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
          return r;
        } else if (td)
          return td.decode(dat);
        else {
          var _a2 = dutf8(dat), out = _a2[0], ext = _a2[1];
          if (ext.length)
            err(8);
          return out;
        }
      }
      exports.strFromU8 = strFromU8;
      var dbf = function(l) {
        return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
      };
      var slzh = function(d, b) {
        return b + 30 + b2(d, b + 26) + b2(d, b + 28);
      };
      var zh = function(d, b, z) {
        var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
        var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
        return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
      };
      var z64e = function(d, b) {
        for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
          ;
        return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
      };
      var exfl = function(ex) {
        var le = 0;
        if (ex) {
          for (var k in ex) {
            var l = ex[k].length;
            if (l > 65535)
              err(9);
            le += l + 4;
          }
        }
        return le;
      };
      var wzh = function(d, b, f, fn, u, c, ce, co) {
        var fl2 = fn.length, ex = f.extra, col = co && co.length;
        var exl = exfl(ex);
        wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
        if (ce != null)
          d[b++] = 20, d[b++] = f.os;
        d[b] = 20, b += 2;
        d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
        d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
        var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
        if (y < 0 || y > 119)
          err(10);
        wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), b += 4;
        if (c != -1) {
          wbytes(d, b, f.crc);
          wbytes(d, b + 4, c < 0 ? -c - 2 : c);
          wbytes(d, b + 8, f.size);
        }
        wbytes(d, b + 12, fl2);
        wbytes(d, b + 14, exl), b += 16;
        if (ce != null) {
          wbytes(d, b, col);
          wbytes(d, b + 6, f.attrs);
          wbytes(d, b + 10, ce), b += 14;
        }
        d.set(fn, b);
        b += fl2;
        if (exl) {
          for (var k in ex) {
            var exf = ex[k], l = exf.length;
            wbytes(d, b, +k);
            wbytes(d, b + 2, l);
            d.set(exf, b + 4), b += 4 + l;
          }
        }
        if (col)
          d.set(co, b), b += col;
        return b;
      };
      var wzf = function(o, b, c, d, e) {
        wbytes(o, b, 101010256);
        wbytes(o, b + 8, c);
        wbytes(o, b + 10, c);
        wbytes(o, b + 12, d);
        wbytes(o, b + 16, e);
      };
      var ZipPassThrough = /* @__PURE__ */ function() {
        function ZipPassThrough2(filename) {
          this.filename = filename;
          this.c = crc();
          this.size = 0;
          this.compression = 0;
        }
        ZipPassThrough2.prototype.process = function(chunk, final) {
          this.ondata(null, chunk, final);
        };
        ZipPassThrough2.prototype.push = function(chunk, final) {
          if (!this.ondata)
            err(5);
          this.c.p(chunk);
          this.size += chunk.length;
          if (final)
            this.crc = this.c.d();
          this.process(chunk, final || false);
        };
        return ZipPassThrough2;
      }();
      exports.ZipPassThrough = ZipPassThrough;
      var ZipDeflate = /* @__PURE__ */ function() {
        function ZipDeflate2(filename, opts) {
          var _this_1 = this;
          if (!opts)
            opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new Deflate(opts, function(dat, final) {
            _this_1.ondata(null, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
        }
        ZipDeflate2.prototype.process = function(chunk, final) {
          try {
            this.d.push(chunk, final);
          } catch (e) {
            this.ondata(e, null, final);
          }
        };
        ZipDeflate2.prototype.push = function(chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
        };
        return ZipDeflate2;
      }();
      exports.ZipDeflate = ZipDeflate;
      var AsyncZipDeflate = /* @__PURE__ */ function() {
        function AsyncZipDeflate2(filename, opts) {
          var _this_1 = this;
          if (!opts)
            opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new AsyncDeflate(opts, function(err2, dat, final) {
            _this_1.ondata(err2, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
          this.terminate = this.d.terminate;
        }
        AsyncZipDeflate2.prototype.process = function(chunk, final) {
          this.d.push(chunk, final);
        };
        AsyncZipDeflate2.prototype.push = function(chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
        };
        return AsyncZipDeflate2;
      }();
      exports.AsyncZipDeflate = AsyncZipDeflate;
      var Zip = /* @__PURE__ */ function() {
        function Zip2(cb) {
          this.ondata = cb;
          this.u = [];
          this.d = 1;
        }
        Zip2.prototype.add = function(file) {
          var _this_1 = this;
          if (!this.ondata)
            err(5);
          if (this.d & 2)
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
          else {
            var f = strToU8(file.filename), fl_1 = f.length;
            var com = file.comment, o = com && strToU8(com);
            var u = fl_1 != file.filename.length || o && com.length != o.length;
            var hl_1 = fl_1 + exfl(file.extra) + 30;
            if (fl_1 > 65535)
              this.ondata(err(11, 0, 1), null, false);
            var header = new u8(hl_1);
            wzh(header, 0, file, f, u, -1);
            var chks_1 = [header];
            var pAll_1 = function() {
              for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                var chk = chks_2[_i];
                _this_1.ondata(null, chk, false);
              }
              chks_1 = [];
            };
            var tr_1 = this.d;
            this.d = 0;
            var ind_1 = this.u.length;
            var uf_1 = mrg(file, {
              f,
              u,
              o,
              t: function() {
                if (file.terminate)
                  file.terminate();
              },
              r: function() {
                pAll_1();
                if (tr_1) {
                  var nxt = _this_1.u[ind_1 + 1];
                  if (nxt)
                    nxt.r();
                  else
                    _this_1.d = 1;
                }
                tr_1 = 1;
              }
            });
            var cl_1 = 0;
            file.ondata = function(err2, dat, final) {
              if (err2) {
                _this_1.ondata(err2, dat, final);
                _this_1.terminate();
              } else {
                cl_1 += dat.length;
                chks_1.push(dat);
                if (final) {
                  var dd = new u8(16);
                  wbytes(dd, 0, 134695760);
                  wbytes(dd, 4, file.crc);
                  wbytes(dd, 8, cl_1);
                  wbytes(dd, 12, file.size);
                  chks_1.push(dd);
                  uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                  if (tr_1)
                    uf_1.r();
                  tr_1 = 1;
                } else if (tr_1)
                  pAll_1();
              }
            };
            this.u.push(uf_1);
          }
        };
        Zip2.prototype.end = function() {
          var _this_1 = this;
          if (this.d & 2) {
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
            return;
          }
          if (this.d)
            this.e();
          else
            this.u.push({
              r: function() {
                if (!(_this_1.d & 1))
                  return;
                _this_1.u.splice(-1, 1);
                _this_1.e();
              },
              t: function() {
              }
            });
          this.d = 3;
        };
        Zip2.prototype.e = function() {
          var bt = 0, l = 0, tl = 0;
          for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
            var f = _a2[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
          }
          var out = new u8(tl + 22);
          for (var _b2 = 0, _c = this.u; _b2 < _c.length; _b2++) {
            var f = _c[_b2];
            wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
          }
          wzf(out, bt, this.u.length, tl, l);
          this.ondata(null, out, true);
          this.d = 2;
        };
        Zip2.prototype.terminate = function() {
          for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
            var f = _a2[_i];
            f.t();
          }
          this.d = 2;
        };
        return Zip2;
      }();
      exports.Zip = Zip;
      function zip(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        var r = {};
        fltn(data, "", r, opts);
        var k = Object.keys(r);
        var lft = k.length, o = 0, tot = 0;
        var slft = lft, files = new Array(lft);
        var term = [];
        var tAll = function() {
          for (var i3 = 0; i3 < term.length; ++i3)
            term[i3]();
        };
        var cbd = function(a, b) {
          mt(function() {
            cb(a, b);
          });
        };
        mt(function() {
          cbd = cb;
        });
        var cbf = function() {
          var out = new u8(tot + 22), oe = o, cdl = tot - o;
          tot = 0;
          for (var i3 = 0; i3 < slft; ++i3) {
            var f = files[i3];
            try {
              var l = f.c.length;
              wzh(out, tot, f, f.f, f.u, l);
              var badd = 30 + f.f.length + exfl(f.extra);
              var loc = tot + badd;
              out.set(f.c, loc);
              wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            } catch (e) {
              return cbd(e, null);
            }
          }
          wzf(out, o, files.length, cdl, oe);
          cbd(null, out);
        };
        if (!lft)
          cbf();
        var _loop_1 = function(i3) {
          var fn = k[i3];
          var _a2 = r[fn], file = _a2[0], p = _a2[1];
          var c = crc(), size = file.length;
          c.p(file);
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          var compression = p.level == 0 ? 0 : 8;
          var cbl = function(e, d) {
            if (e) {
              tAll();
              cbd(e, null);
            } else {
              var l = d.length;
              files[i3] = mrg(p, {
                size,
                crc: c.d(),
                c: d,
                f,
                m,
                u: s != fn.length || m && com.length != ms,
                compression
              });
              o += 30 + s + exl + l;
              tot += 76 + 2 * (s + exl) + (ms || 0) + l;
              if (!--lft)
                cbf();
            }
          };
          if (s > 65535)
            cbl(err(11, 0, 1), null);
          if (!compression)
            cbl(null, file);
          else if (size < 16e4) {
            try {
              cbl(null, deflateSync(file, p));
            } catch (e) {
              cbl(e, null);
            }
          } else
            term.push(deflate(file, p, cbl));
        };
        for (var i2 = 0; i2 < slft; ++i2) {
          _loop_1(i2);
        }
        return tAll;
      }
      exports.zip = zip;
      function zipSync(data, opts) {
        if (!opts)
          opts = {};
        var r = {};
        var files = [];
        fltn(data, "", r, opts);
        var o = 0;
        var tot = 0;
        for (var fn in r) {
          var _a2 = r[fn], file = _a2[0], p = _a2[1];
          var compression = p.level == 0 ? 0 : 8;
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          if (s > 65535)
            err(11);
          var d = compression ? deflateSync(file, p) : file, l = d.length;
          var c = crc();
          c.p(file);
          files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f,
            m,
            u: s != fn.length || m && com.length != ms,
            o,
            compression
          }));
          o += 30 + s + exl + l;
          tot += 76 + 2 * (s + exl) + (ms || 0) + l;
        }
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        for (var i2 = 0; i2 < files.length; ++i2) {
          var f = files[i2];
          wzh(out, f.o, f, f.f, f.u, f.c.length);
          var badd = 30 + f.f.length + exfl(f.extra);
          out.set(f.c, f.o + badd);
          wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
        }
        wzf(out, o, files.length, cdl, oe);
        return out;
      }
      exports.zipSync = zipSync;
      var UnzipPassThrough = /* @__PURE__ */ function() {
        function UnzipPassThrough2() {
        }
        UnzipPassThrough2.prototype.push = function(data, final) {
          this.ondata(null, data, final);
        };
        UnzipPassThrough2.compression = 0;
        return UnzipPassThrough2;
      }();
      exports.UnzipPassThrough = UnzipPassThrough;
      var UnzipInflate = /* @__PURE__ */ function() {
        function UnzipInflate2() {
          var _this_1 = this;
          this.i = new Inflate(function(dat, final) {
            _this_1.ondata(null, dat, final);
          });
        }
        UnzipInflate2.prototype.push = function(data, final) {
          try {
            this.i.push(data, final);
          } catch (e) {
            this.ondata(e, null, final);
          }
        };
        UnzipInflate2.compression = 8;
        return UnzipInflate2;
      }();
      exports.UnzipInflate = UnzipInflate;
      var AsyncUnzipInflate = /* @__PURE__ */ function() {
        function AsyncUnzipInflate2(_, sz) {
          var _this_1 = this;
          if (sz < 32e4) {
            this.i = new Inflate(function(dat, final) {
              _this_1.ondata(null, dat, final);
            });
          } else {
            this.i = new AsyncInflate(function(err2, dat, final) {
              _this_1.ondata(err2, dat, final);
            });
            this.terminate = this.i.terminate;
          }
        }
        AsyncUnzipInflate2.prototype.push = function(data, final) {
          if (this.i.terminate)
            data = slc(data, 0);
          this.i.push(data, final);
        };
        AsyncUnzipInflate2.compression = 8;
        return AsyncUnzipInflate2;
      }();
      exports.AsyncUnzipInflate = AsyncUnzipInflate;
      var Unzip = /* @__PURE__ */ function() {
        function Unzip2(cb) {
          this.onfile = cb;
          this.k = [];
          this.o = {
            0: UnzipPassThrough
          };
          this.p = et;
        }
        Unzip2.prototype.push = function(chunk, final) {
          var _this_1 = this;
          if (!this.onfile)
            err(5);
          if (!this.p)
            err(4);
          if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d)
              this.d.push(toAdd, !this.c);
            else
              this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length)
              return this.push(chunk, final);
          } else {
            var f = 0, i2 = 0, is = void 0, buf = void 0;
            if (!this.p.length)
              buf = chunk;
            else if (!chunk.length)
              buf = this.p;
            else {
              buf = new u8(this.p.length + chunk.length);
              buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function() {
              var _a2;
              var sig = b4(buf, i2);
              if (sig == 67324752) {
                f = 1, is = i2;
                this_1.d = null;
                this_1.c = 0;
                var bf = b2(buf, i2 + 6), cmp_1 = b2(buf, i2 + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i2 + 26), es = b2(buf, i2 + 28);
                if (l > i2 + 30 + fnl + es) {
                  var chks_3 = [];
                  this_1.k.unshift(chks_3);
                  f = 2;
                  var sc_1 = b4(buf, i2 + 18), su_1 = b4(buf, i2 + 22);
                  var fn_1 = strFromU8(buf.subarray(i2 + 30, i2 += 30 + fnl), !u);
                  if (sc_1 == 4294967295) {
                    _a2 = dd ? [-2] : z64e(buf, i2), sc_1 = _a2[0], su_1 = _a2[1];
                  } else if (dd)
                    sc_1 = -1;
                  i2 += es;
                  this_1.c = sc_1;
                  var d_1;
                  var file_1 = {
                    name: fn_1,
                    compression: cmp_1,
                    start: function() {
                      if (!file_1.ondata)
                        err(5);
                      if (!sc_1)
                        file_1.ondata(null, et, true);
                      else {
                        var ctr = _this_1.o[cmp_1];
                        if (!ctr)
                          file_1.ondata(err(14, "unknown compression type " + cmp_1, 1), null, false);
                        d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                        d_1.ondata = function(err2, dat3, final2) {
                          file_1.ondata(err2, dat3, final2);
                        };
                        for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                          var dat2 = chks_4[_i];
                          d_1.push(dat2, false);
                        }
                        if (_this_1.k[0] == chks_3 && _this_1.c)
                          _this_1.d = d_1;
                        else
                          d_1.push(et, true);
                      }
                    },
                    terminate: function() {
                      if (d_1 && d_1.terminate)
                        d_1.terminate();
                    }
                  };
                  if (sc_1 >= 0)
                    file_1.size = sc_1, file_1.originalSize = su_1;
                  this_1.onfile(file_1);
                }
                return "break";
              } else if (oc) {
                if (sig == 134695760) {
                  is = i2 += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                  return "break";
                } else if (sig == 33639248) {
                  is = i2 -= 4, f = 3, this_1.c = 0;
                  return "break";
                }
              }
            };
            var this_1 = this;
            for (; i2 < l - 4; ++i2) {
              var state_1 = _loop_2();
              if (state_1 === "break")
                break;
            }
            this.p = et;
            if (oc < 0) {
              var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 134695760 && 4)) : buf.subarray(0, i2);
              if (add)
                add.push(dat, !!f);
              else
                this.k[+(f == 2)].push(dat);
            }
            if (f & 2)
              return this.push(buf.subarray(i2), final);
            this.p = buf.subarray(i2);
          }
          if (final) {
            if (this.c)
              err(13);
            this.p = null;
          }
        };
        Unzip2.prototype.register = function(decoder) {
          this.o[decoder.compression] = decoder;
        };
        return Unzip2;
      }();
      exports.Unzip = Unzip;
      var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
        fn();
      };
      function unzip(data, opts, cb) {
        if (!cb)
          cb = opts, opts = {};
        if (typeof cb != "function")
          err(7);
        var term = [];
        var tAll = function() {
          for (var i3 = 0; i3 < term.length; ++i3)
            term[i3]();
        };
        var files = {};
        var cbd = function(a, b) {
          mt(function() {
            cb(a, b);
          });
        };
        mt(function() {
          cbd = cb;
        });
        var e = data.length - 22;
        for (; b4(data, e) != 101010256; --e) {
          if (!e || data.length - e > 65558) {
            cbd(err(13, 0, 1), null);
            return tAll;
          }
        }
        ;
        var lft = b2(data, e + 8);
        if (lft) {
          var c = lft;
          var o = b4(data, e + 16);
          var z = o == 4294967295 || c == 65535;
          if (z) {
            var ze = b4(data, e - 12);
            z = b4(data, ze) == 101075792;
            if (z) {
              c = lft = b4(data, ze + 32);
              o = b4(data, ze + 48);
            }
          }
          var fltr = opts && opts.filter;
          var _loop_3 = function(i3) {
            var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
            o = no;
            var cbl = function(e2, d) {
              if (e2) {
                tAll();
                cbd(e2, null);
              } else {
                if (d)
                  files[fn] = d;
                if (!--lft)
                  cbd(null, files);
              }
            };
            if (!fltr || fltr({
              name: fn,
              size: sc,
              originalSize: su,
              compression: c_1
            })) {
              if (!c_1)
                cbl(null, slc(data, b, b + sc));
              else if (c_1 == 8) {
                var infl = data.subarray(b, b + sc);
                if (sc < 32e4) {
                  try {
                    cbl(null, inflateSync(infl, new u8(su)));
                  } catch (e2) {
                    cbl(e2, null);
                  }
                } else
                  term.push(inflate(infl, { size: su }, cbl));
              } else
                cbl(err(14, "unknown compression type " + c_1, 1), null);
            } else
              cbl(null, null);
          };
          for (var i2 = 0; i2 < c; ++i2) {
            _loop_3(i2);
          }
        } else
          cbd(null, {});
        return tAll;
      }
      exports.unzip = unzip;
      function unzipSync(data, opts) {
        var files = {};
        var e = data.length - 22;
        for (; b4(data, e) != 101010256; --e) {
          if (!e || data.length - e > 65558)
            err(13);
        }
        ;
        var c = b2(data, e + 8);
        if (!c)
          return {};
        var o = b4(data, e + 16);
        var z = o == 4294967295 || c == 65535;
        if (z) {
          var ze = b4(data, e - 12);
          z = b4(data, ze) == 101075792;
          if (z) {
            c = b4(data, ze + 32);
            o = b4(data, ze + 48);
          }
        }
        var fltr = opts && opts.filter;
        for (var i2 = 0; i2 < c; ++i2) {
          var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
          o = no;
          if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_2
          })) {
            if (!c_2)
              files[fn] = slc(data, b, b + sc);
            else if (c_2 == 8)
              files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
            else
              err(14, "unknown compression type " + c_2);
          }
        }
        return files;
      }
      exports.unzipSync = unzipSync;
    }
  });

  // src/dataArray.js
  var require_dataArray = __commonJS({
    "src/dataArray.js"(exports, module) {
      "use strict";
      var gifti = gifti || {};
      gifti.Transform = gifti.Transform || (typeof __require !== "undefined" ? require_transform() : null);
      var Base64Binary = Base64Binary || (typeof __require !== "undefined" ? require_base64_binary() : null);
      var fflate = fflate || (typeof __require !== "undefined" ? require_lib() : null);
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
      gifti.DataArray = gifti.DataArray || function() {
        this.attributes = null;
        this.metadata = {};
        this.transforms = [];
        this.data = null;
        this.dataConverted = false;
      };
      gifti.DataArray.prototype.isPointSet = function() {
        return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_POINTSET;
      };
      gifti.DataArray.prototype.isTriangles = function() {
        return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_TRIANGLE;
      };
      gifti.DataArray.prototype.isNormals = function() {
        return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_VECTOR;
      };
      gifti.DataArray.prototype.isColors = function() {
        return this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_RGB_VECTOR || this.attributes[gifti.ATT_INTENT] === gifti.NIFTI_INTENT_RGBA_VECTOR;
      };
      gifti.DataArray.prototype.getDimensions = function() {
        return parseInt(this.attributes[gifti.ATT_DIMENSIONALITY]);
      };
      gifti.DataArray.prototype.getNumElements = function(dimIndex) {
        if (dimIndex === void 0) {
          dimIndex = 0;
        }
        return parseInt(this.attributes[gifti.ATT_DIMN + dimIndex]);
      };
      gifti.DataArray.prototype.isScalar = function() {
        return this.getDimensions() == 1;
      };
      gifti.DataArray.prototype.isTriple = function() {
        return this.getDimensions() == 2 && this.getNumElements(1) == 3;
      };
      gifti.DataArray.prototype.isQuad = function() {
        return this.getDimensions() == 2 && this.getNumElements(1) == 4;
      };
      gifti.DataArray.prototype.isAscii = function() {
        return gifti.ENCODING_ASCII === this.attributes[gifti.ATT_ENCODING];
      };
      gifti.DataArray.prototype.isBase64Binary = function() {
        return gifti.ENCODING_BASE64BINARY === this.attributes[gifti.ATT_ENCODING];
      };
      gifti.DataArray.prototype.isGzipBase64Binary = function() {
        return gifti.ENCODING_GZIPBASE64BINARY === this.attributes[gifti.ATT_ENCODING];
      };
      gifti.DataArray.prototype.isBase64Encoded = function() {
        return this.isBase64Binary() || this.isGzipBase64Binary();
      };
      gifti.DataArray.prototype.isFloat32 = function() {
        return gifti.TYPE_NIFTI_TYPE_FLOAT32 === this.attributes[gifti.ATT_DATATYPE];
      };
      gifti.DataArray.prototype.isInt32 = function() {
        return gifti.TYPE_NIFTI_TYPE_INT32 === this.attributes[gifti.ATT_DATATYPE];
      };
      gifti.DataArray.prototype.isUnsignedInt8 = function() {
        return gifti.TYPE_NIFTI_TYPE_UINT8 === this.attributes[gifti.ATT_DATATYPE];
      };
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
      gifti.DataArray.prototype.getDataAsync = function(onProgress, onFinish) {
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
            onFinish();
          } else if (this.isBase64Binary()) {
            if (this.isUnsignedInt8()) {
              gifti.DataArray.readUnsignedInt8Base64(this);
            } else if (this.isInt32()) {
              gifti.DataArray.readSignedInt32Base64(this);
            } else {
              gifti.DataArray.readFloat32Base64(this);
            }
            onFinish();
          } else if (this.isGzipBase64Binary()) {
            if (this.isUnsignedInt8()) {
              gifti.DataArray.readUnsignedInt8GZIPBase64Async(this, onProgress, onFinish);
            } else if (this.isInt32()) {
              gifti.DataArray.readSignedInt32GZIPBase64Async(this, onProgress, onFinish);
            } else {
              gifti.DataArray.readFloat32GZIPBase64Async(this, onProgress, onFinish);
            }
          }
        }
      };
      gifti.DataArray.readFloat32ASCII = function(obj) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        obj.data = new Float32Array(obj.data.match(regex).map(function(v) {
          return parseFloat(v);
        }));
      };
      gifti.DataArray.readSignedInt32ASCII = function(obj) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        obj.data = new Int32Array(obj.data.match(regex).map(function(v) {
          return parseInt(v);
        }));
      };
      gifti.DataArray.readUnsignedInt8ASCII = function(obj) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        obj.data = new Uint8Array(obj.data.match(regex).map(function(v) {
          return parseInt(v);
        }));
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
        rawData = fflate.decompressSync(new Uint8Array(rawData)).buffer;
        obj.data = new Uint8Array(rawData, 0, rawData.byteLength);
      };
      gifti.DataArray.readUnsignedInt8GZIPBase64Async = function(obj, onProgress, onFinish) {
        var rawData = Base64Binary.decodeArrayBuffer(obj.data);
        var inflator = new fflate.Inflate();
        var onFinished = function() {
          obj.data = new Uint8Array(inflator.result.buffer, 0, inflator.result.buffer.byteLength);
          onFinish(obj.data);
        };
        setTimeout(function() {
          gifti.DataArray.readNext(inflator, rawData, 0, onProgress, onFinished);
        }, 0);
      };
      gifti.DataArray.readSignedInt32GZIPBase64 = function(obj) {
        var rawData = Base64Binary.decodeArrayBuffer(obj.data);
        rawData = fflate.decompressSync(new Uint8Array(rawData)).buffer;
        obj.data = new Int32Array(rawData, 0, rawData.byteLength / 4);
      };
      gifti.DataArray.readSignedInt32GZIPBase64Async = function(obj, onProgress, onFinish) {
        var rawData = Base64Binary.decodeArrayBuffer(obj.data);
        var inflator = new fflate.Inflate();
        var onFinished = function() {
          obj.data = new Int32Array(inflator.result.buffer, 0, inflator.result.buffer.byteLength / 4);
          onFinish(obj.data);
        };
        setTimeout(function() {
          gifti.DataArray.readNext(inflator, rawData, 0, onProgress, onFinished);
        }, 0);
      };
      gifti.DataArray.readFloat32GZIPBase64 = function(obj) {
        var rawData = Base64Binary.decodeArrayBuffer(obj.data);
        rawData = fflate.decompressSync(new Uint8Array(rawData)).buffer;
        obj.data = new Float32Array(rawData, 0, rawData.byteLength / 4);
      };
      gifti.DataArray.readFloat32GZIPBase64Async = function(obj, onProgress, onFinish) {
        var rawData = Base64Binary.decodeArrayBuffer(obj.data);
        var inflator = new fflate.Inflate();
        var onFinished = function() {
          obj.data = new Float32Array(inflator.result.buffer, 0, inflator.result.buffer.byteLength / 4);
          onFinish(obj.data);
        };
        setTimeout(function() {
          gifti.DataArray.readNext(inflator, rawData, 0, onProgress, onFinished);
        }, 0);
      };
      gifti.DataArray.readNext = function(inflator, rawData, index, onProgress, onFinish) {
        var end = index + 4096 * 8;
        var finished = end >= rawData.byteLength;
        inflator.push(rawData.slice(index, index + 4096 * 8), finished);
        if (finished) {
          onFinish();
        } else {
          onProgress(end / rawData.byteLength);
          setTimeout(function() {
            gifti.DataArray.readNext(inflator, rawData, end, onProgress, onFinish);
          }, 0);
        }
      };
      var moduleType = typeof module;
      if (moduleType !== "undefined" && module.exports) {
        module.exports = gifti.DataArray;
      }
    }
  });

  // src/label.js
  var require_label = __commonJS({
    "src/label.js"(exports, module) {
      "use strict";
      var gifti = gifti || {};
      gifti.ATT_KEY = "Key";
      gifti.ATT_RED = "Red";
      gifti.ATT_GREEN = "Green";
      gifti.ATT_BLUE = "Blue";
      gifti.ATT_ALPHA = "Alpha";
      gifti.ATT_INDEX = "Index";
      gifti.Label = gifti.Label || function(attributes) {
        this.key = attributes[gifti.ATT_KEY] || attributes[gifti.ATT_INDEX];
        this.r = parseFloat(attributes[gifti.ATT_RED]);
        this.g = parseFloat(attributes[gifti.ATT_GREEN]);
        this.b = parseFloat(attributes[gifti.ATT_BLUE]);
        this.a = parseFloat(attributes[gifti.ATT_ALPHA]);
        this.label = null;
      };
      var moduleType = typeof module;
      if (moduleType !== "undefined" && module.exports) {
        module.exports = gifti.Label;
      }
    }
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer2;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b)
          return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer2.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer2.isBuffer(buf))
                buf = Buffer2.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer2.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports, module) {
      var buffer = require_buffer();
      var Buffer2 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer2(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer2.prototype);
      copyProps(Buffer2, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer2(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer2(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer2(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder = __commonJS({
    "node_modules/string_decoder/lib/string_decoder.js"(exports) {
      "use strict";
      var Buffer2 = require_safe_buffer().Buffer;
      var isEncoding = Buffer2.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc)
          return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried)
                return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
          throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer2.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0)
          return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0)
            return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length)
          return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127)
          return 0;
        else if (byte >> 5 === 6)
          return 2;
        else if (byte >> 4 === 14)
          return 3;
        else if (byte >> 3 === 30)
          return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self, buf, i) {
        var j = buf.length - 1;
        if (j < i)
          return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0)
            self.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0)
            self.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2)
              nb = 0;
            else
              self.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self, buf, p) {
        if ((buf[0] & 192) !== 128) {
          self.lastNeed = 0;
          return "\uFFFD";
        }
        if (self.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self.lastNeed = 1;
            return "\uFFFD";
          }
          if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self.lastNeed = 2;
              return "\uFFFD";
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf, p);
        if (r !== void 0)
          return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed)
          return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed)
          return r + "\uFFFD";
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0)
          return buf.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed)
          return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }
  });

  // node_modules/sax/lib/sax.js
  var require_sax = __commonJS({
    "node_modules/sax/lib/sax.js"(exports) {
      (function(sax) {
        sax.parser = function(strict, opt) {
          return new SAXParser(strict, opt);
        };
        sax.SAXParser = SAXParser;
        sax.SAXStream = SAXStream;
        sax.createStream = createStream;
        sax.MAX_BUFFER_LENGTH = 64 * 1024;
        var buffers = [
          "comment",
          "sgmlDecl",
          "textNode",
          "tagName",
          "doctype",
          "procInstName",
          "procInstBody",
          "entity",
          "attribName",
          "attribValue",
          "cdata",
          "script"
        ];
        sax.EVENTS = [
          "text",
          "processinginstruction",
          "sgmldeclaration",
          "doctype",
          "comment",
          "opentagstart",
          "attribute",
          "opentag",
          "closetag",
          "opencdata",
          "cdata",
          "closecdata",
          "error",
          "end",
          "ready",
          "script",
          "opennamespace",
          "closenamespace"
        ];
        function SAXParser(strict, opt) {
          if (!(this instanceof SAXParser)) {
            return new SAXParser(strict, opt);
          }
          var parser = this;
          clearBuffers(parser);
          parser.q = parser.c = "";
          parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
          parser.opt = opt || {};
          parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
          parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
          parser.tags = [];
          parser.closed = parser.closedRoot = parser.sawRoot = false;
          parser.tag = parser.error = null;
          parser.strict = !!strict;
          parser.noscript = !!(strict || parser.opt.noscript);
          parser.state = S.BEGIN;
          parser.strictEntities = parser.opt.strictEntities;
          parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
          parser.attribList = [];
          if (parser.opt.xmlns) {
            parser.ns = Object.create(rootNS);
          }
          parser.trackPosition = parser.opt.position !== false;
          if (parser.trackPosition) {
            parser.position = parser.line = parser.column = 0;
          }
          emit(parser, "onready");
        }
        if (!Object.create) {
          Object.create = function(o) {
            function F() {
            }
            F.prototype = o;
            var newf = new F();
            return newf;
          };
        }
        if (!Object.keys) {
          Object.keys = function(o) {
            var a = [];
            for (var i in o)
              if (o.hasOwnProperty(i))
                a.push(i);
            return a;
          };
        }
        function checkBufferLength(parser) {
          var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
          var maxActual = 0;
          for (var i = 0, l = buffers.length; i < l; i++) {
            var len = parser[buffers[i]].length;
            if (len > maxAllowed) {
              switch (buffers[i]) {
                case "textNode":
                  closeText(parser);
                  break;
                case "cdata":
                  emitNode(parser, "oncdata", parser.cdata);
                  parser.cdata = "";
                  break;
                case "script":
                  emitNode(parser, "onscript", parser.script);
                  parser.script = "";
                  break;
                default:
                  error(parser, "Max buffer length exceeded: " + buffers[i]);
              }
            }
            maxActual = Math.max(maxActual, len);
          }
          var m = sax.MAX_BUFFER_LENGTH - maxActual;
          parser.bufferCheckPosition = m + parser.position;
        }
        function clearBuffers(parser) {
          for (var i = 0, l = buffers.length; i < l; i++) {
            parser[buffers[i]] = "";
          }
        }
        function flushBuffers(parser) {
          closeText(parser);
          if (parser.cdata !== "") {
            emitNode(parser, "oncdata", parser.cdata);
            parser.cdata = "";
          }
          if (parser.script !== "") {
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
          }
        }
        SAXParser.prototype = {
          end: function() {
            end(this);
          },
          write,
          resume: function() {
            this.error = null;
            return this;
          },
          close: function() {
            return this.write(null);
          },
          flush: function() {
            flushBuffers(this);
          }
        };
        var Stream;
        try {
          Stream = __require("stream").Stream;
        } catch (ex) {
          Stream = function() {
          };
        }
        var streamWraps = sax.EVENTS.filter(function(ev) {
          return ev !== "error" && ev !== "end";
        });
        function createStream(strict, opt) {
          return new SAXStream(strict, opt);
        }
        function SAXStream(strict, opt) {
          if (!(this instanceof SAXStream)) {
            return new SAXStream(strict, opt);
          }
          Stream.apply(this);
          this._parser = new SAXParser(strict, opt);
          this.writable = true;
          this.readable = true;
          var me = this;
          this._parser.onend = function() {
            me.emit("end");
          };
          this._parser.onerror = function(er) {
            me.emit("error", er);
            me._parser.error = null;
          };
          this._decoder = null;
          streamWraps.forEach(function(ev) {
            Object.defineProperty(me, "on" + ev, {
              get: function() {
                return me._parser["on" + ev];
              },
              set: function(h) {
                if (!h) {
                  me.removeAllListeners(ev);
                  me._parser["on" + ev] = h;
                  return h;
                }
                me.on(ev, h);
              },
              enumerable: true,
              configurable: false
            });
          });
        }
        SAXStream.prototype = Object.create(Stream.prototype, {
          constructor: {
            value: SAXStream
          }
        });
        SAXStream.prototype.write = function(data) {
          if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
            if (!this._decoder) {
              var SD = require_string_decoder().StringDecoder;
              this._decoder = new SD("utf8");
            }
            data = this._decoder.write(data);
          }
          this._parser.write(data.toString());
          this.emit("data", data);
          return true;
        };
        SAXStream.prototype.end = function(chunk) {
          if (chunk && chunk.length) {
            this.write(chunk);
          }
          this._parser.end();
          return true;
        };
        SAXStream.prototype.on = function(ev, handler) {
          var me = this;
          if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
            me._parser["on" + ev] = function() {
              var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
              args.splice(0, 0, ev);
              me.emit.apply(me, args);
            };
          }
          return Stream.prototype.on.call(me, ev, handler);
        };
        var CDATA = "[CDATA[";
        var DOCTYPE = "DOCTYPE";
        var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
        var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
        var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
        var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
        var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
        var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function isWhitespace(c) {
          return c === " " || c === "\n" || c === "\r" || c === "	";
        }
        function isQuote(c) {
          return c === '"' || c === "'";
        }
        function isAttribEnd(c) {
          return c === ">" || isWhitespace(c);
        }
        function isMatch(regex, c) {
          return regex.test(c);
        }
        function notMatch(regex, c) {
          return !isMatch(regex, c);
        }
        var S = 0;
        sax.STATE = {
          BEGIN: S++,
          // leading byte order mark or whitespace
          BEGIN_WHITESPACE: S++,
          // leading whitespace
          TEXT: S++,
          // general stuff
          TEXT_ENTITY: S++,
          // &amp and such.
          OPEN_WAKA: S++,
          // <
          SGML_DECL: S++,
          // <!BLARG
          SGML_DECL_QUOTED: S++,
          // <!BLARG foo "bar
          DOCTYPE: S++,
          // <!DOCTYPE
          DOCTYPE_QUOTED: S++,
          // <!DOCTYPE "//blah
          DOCTYPE_DTD: S++,
          // <!DOCTYPE "//blah" [ ...
          DOCTYPE_DTD_QUOTED: S++,
          // <!DOCTYPE "//blah" [ "foo
          COMMENT_STARTING: S++,
          // <!-
          COMMENT: S++,
          // <!--
          COMMENT_ENDING: S++,
          // <!-- blah -
          COMMENT_ENDED: S++,
          // <!-- blah --
          CDATA: S++,
          // <![CDATA[ something
          CDATA_ENDING: S++,
          // ]
          CDATA_ENDING_2: S++,
          // ]]
          PROC_INST: S++,
          // <?hi
          PROC_INST_BODY: S++,
          // <?hi there
          PROC_INST_ENDING: S++,
          // <?hi "there" ?
          OPEN_TAG: S++,
          // <strong
          OPEN_TAG_SLASH: S++,
          // <strong /
          ATTRIB: S++,
          // <a
          ATTRIB_NAME: S++,
          // <a foo
          ATTRIB_NAME_SAW_WHITE: S++,
          // <a foo _
          ATTRIB_VALUE: S++,
          // <a foo=
          ATTRIB_VALUE_QUOTED: S++,
          // <a foo="bar
          ATTRIB_VALUE_CLOSED: S++,
          // <a foo="bar"
          ATTRIB_VALUE_UNQUOTED: S++,
          // <a foo=bar
          ATTRIB_VALUE_ENTITY_Q: S++,
          // <foo bar="&quot;"
          ATTRIB_VALUE_ENTITY_U: S++,
          // <foo bar=&quot
          CLOSE_TAG: S++,
          // </a
          CLOSE_TAG_SAW_WHITE: S++,
          // </a   >
          SCRIPT: S++,
          // <script> ...
          SCRIPT_ENDING: S++
          // <script> ... <
        };
        sax.XML_ENTITIES = {
          "amp": "&",
          "gt": ">",
          "lt": "<",
          "quot": '"',
          "apos": "'"
        };
        sax.ENTITIES = {
          "amp": "&",
          "gt": ">",
          "lt": "<",
          "quot": '"',
          "apos": "'",
          "AElig": 198,
          "Aacute": 193,
          "Acirc": 194,
          "Agrave": 192,
          "Aring": 197,
          "Atilde": 195,
          "Auml": 196,
          "Ccedil": 199,
          "ETH": 208,
          "Eacute": 201,
          "Ecirc": 202,
          "Egrave": 200,
          "Euml": 203,
          "Iacute": 205,
          "Icirc": 206,
          "Igrave": 204,
          "Iuml": 207,
          "Ntilde": 209,
          "Oacute": 211,
          "Ocirc": 212,
          "Ograve": 210,
          "Oslash": 216,
          "Otilde": 213,
          "Ouml": 214,
          "THORN": 222,
          "Uacute": 218,
          "Ucirc": 219,
          "Ugrave": 217,
          "Uuml": 220,
          "Yacute": 221,
          "aacute": 225,
          "acirc": 226,
          "aelig": 230,
          "agrave": 224,
          "aring": 229,
          "atilde": 227,
          "auml": 228,
          "ccedil": 231,
          "eacute": 233,
          "ecirc": 234,
          "egrave": 232,
          "eth": 240,
          "euml": 235,
          "iacute": 237,
          "icirc": 238,
          "igrave": 236,
          "iuml": 239,
          "ntilde": 241,
          "oacute": 243,
          "ocirc": 244,
          "ograve": 242,
          "oslash": 248,
          "otilde": 245,
          "ouml": 246,
          "szlig": 223,
          "thorn": 254,
          "uacute": 250,
          "ucirc": 251,
          "ugrave": 249,
          "uuml": 252,
          "yacute": 253,
          "yuml": 255,
          "copy": 169,
          "reg": 174,
          "nbsp": 160,
          "iexcl": 161,
          "cent": 162,
          "pound": 163,
          "curren": 164,
          "yen": 165,
          "brvbar": 166,
          "sect": 167,
          "uml": 168,
          "ordf": 170,
          "laquo": 171,
          "not": 172,
          "shy": 173,
          "macr": 175,
          "deg": 176,
          "plusmn": 177,
          "sup1": 185,
          "sup2": 178,
          "sup3": 179,
          "acute": 180,
          "micro": 181,
          "para": 182,
          "middot": 183,
          "cedil": 184,
          "ordm": 186,
          "raquo": 187,
          "frac14": 188,
          "frac12": 189,
          "frac34": 190,
          "iquest": 191,
          "times": 215,
          "divide": 247,
          "OElig": 338,
          "oelig": 339,
          "Scaron": 352,
          "scaron": 353,
          "Yuml": 376,
          "fnof": 402,
          "circ": 710,
          "tilde": 732,
          "Alpha": 913,
          "Beta": 914,
          "Gamma": 915,
          "Delta": 916,
          "Epsilon": 917,
          "Zeta": 918,
          "Eta": 919,
          "Theta": 920,
          "Iota": 921,
          "Kappa": 922,
          "Lambda": 923,
          "Mu": 924,
          "Nu": 925,
          "Xi": 926,
          "Omicron": 927,
          "Pi": 928,
          "Rho": 929,
          "Sigma": 931,
          "Tau": 932,
          "Upsilon": 933,
          "Phi": 934,
          "Chi": 935,
          "Psi": 936,
          "Omega": 937,
          "alpha": 945,
          "beta": 946,
          "gamma": 947,
          "delta": 948,
          "epsilon": 949,
          "zeta": 950,
          "eta": 951,
          "theta": 952,
          "iota": 953,
          "kappa": 954,
          "lambda": 955,
          "mu": 956,
          "nu": 957,
          "xi": 958,
          "omicron": 959,
          "pi": 960,
          "rho": 961,
          "sigmaf": 962,
          "sigma": 963,
          "tau": 964,
          "upsilon": 965,
          "phi": 966,
          "chi": 967,
          "psi": 968,
          "omega": 969,
          "thetasym": 977,
          "upsih": 978,
          "piv": 982,
          "ensp": 8194,
          "emsp": 8195,
          "thinsp": 8201,
          "zwnj": 8204,
          "zwj": 8205,
          "lrm": 8206,
          "rlm": 8207,
          "ndash": 8211,
          "mdash": 8212,
          "lsquo": 8216,
          "rsquo": 8217,
          "sbquo": 8218,
          "ldquo": 8220,
          "rdquo": 8221,
          "bdquo": 8222,
          "dagger": 8224,
          "Dagger": 8225,
          "bull": 8226,
          "hellip": 8230,
          "permil": 8240,
          "prime": 8242,
          "Prime": 8243,
          "lsaquo": 8249,
          "rsaquo": 8250,
          "oline": 8254,
          "frasl": 8260,
          "euro": 8364,
          "image": 8465,
          "weierp": 8472,
          "real": 8476,
          "trade": 8482,
          "alefsym": 8501,
          "larr": 8592,
          "uarr": 8593,
          "rarr": 8594,
          "darr": 8595,
          "harr": 8596,
          "crarr": 8629,
          "lArr": 8656,
          "uArr": 8657,
          "rArr": 8658,
          "dArr": 8659,
          "hArr": 8660,
          "forall": 8704,
          "part": 8706,
          "exist": 8707,
          "empty": 8709,
          "nabla": 8711,
          "isin": 8712,
          "notin": 8713,
          "ni": 8715,
          "prod": 8719,
          "sum": 8721,
          "minus": 8722,
          "lowast": 8727,
          "radic": 8730,
          "prop": 8733,
          "infin": 8734,
          "ang": 8736,
          "and": 8743,
          "or": 8744,
          "cap": 8745,
          "cup": 8746,
          "int": 8747,
          "there4": 8756,
          "sim": 8764,
          "cong": 8773,
          "asymp": 8776,
          "ne": 8800,
          "equiv": 8801,
          "le": 8804,
          "ge": 8805,
          "sub": 8834,
          "sup": 8835,
          "nsub": 8836,
          "sube": 8838,
          "supe": 8839,
          "oplus": 8853,
          "otimes": 8855,
          "perp": 8869,
          "sdot": 8901,
          "lceil": 8968,
          "rceil": 8969,
          "lfloor": 8970,
          "rfloor": 8971,
          "lang": 9001,
          "rang": 9002,
          "loz": 9674,
          "spades": 9824,
          "clubs": 9827,
          "hearts": 9829,
          "diams": 9830
        };
        Object.keys(sax.ENTITIES).forEach(function(key) {
          var e = sax.ENTITIES[key];
          var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
          sax.ENTITIES[key] = s2;
        });
        for (var s in sax.STATE) {
          sax.STATE[sax.STATE[s]] = s;
        }
        S = sax.STATE;
        function emit(parser, event, data) {
          parser[event] && parser[event](data);
        }
        function emitNode(parser, nodeType, data) {
          if (parser.textNode)
            closeText(parser);
          emit(parser, nodeType, data);
        }
        function closeText(parser) {
          parser.textNode = textopts(parser.opt, parser.textNode);
          if (parser.textNode)
            emit(parser, "ontext", parser.textNode);
          parser.textNode = "";
        }
        function textopts(opt, text) {
          if (opt.trim)
            text = text.trim();
          if (opt.normalize)
            text = text.replace(/\s+/g, " ");
          return text;
        }
        function error(parser, er) {
          closeText(parser);
          if (parser.trackPosition) {
            er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
          }
          er = new Error(er);
          parser.error = er;
          emit(parser, "onerror", er);
          return parser;
        }
        function end(parser) {
          if (parser.sawRoot && !parser.closedRoot)
            strictFail(parser, "Unclosed root tag");
          if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
            error(parser, "Unexpected end");
          }
          closeText(parser);
          parser.c = "";
          parser.closed = true;
          emit(parser, "onend");
          SAXParser.call(parser, parser.strict, parser.opt);
          return parser;
        }
        function strictFail(parser, message) {
          if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
            throw new Error("bad call to strictFail");
          }
          if (parser.strict) {
            error(parser, message);
          }
        }
        function newTag(parser) {
          if (!parser.strict)
            parser.tagName = parser.tagName[parser.looseCase]();
          var parent = parser.tags[parser.tags.length - 1] || parser;
          var tag = parser.tag = { name: parser.tagName, attributes: {} };
          if (parser.opt.xmlns) {
            tag.ns = parent.ns;
          }
          parser.attribList.length = 0;
          emitNode(parser, "onopentagstart", tag);
        }
        function qname(name, attribute) {
          var i = name.indexOf(":");
          var qualName = i < 0 ? ["", name] : name.split(":");
          var prefix = qualName[0];
          var local = qualName[1];
          if (attribute && name === "xmlns") {
            prefix = "xmlns";
            local = "";
          }
          return { prefix, local };
        }
        function attrib(parser) {
          if (!parser.strict) {
            parser.attribName = parser.attribName[parser.looseCase]();
          }
          if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
            parser.attribName = parser.attribValue = "";
            return;
          }
          if (parser.opt.xmlns) {
            var qn = qname(parser.attribName, true);
            var prefix = qn.prefix;
            var local = qn.local;
            if (prefix === "xmlns") {
              if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
                strictFail(
                  parser,
                  "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
                );
              } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
                strictFail(
                  parser,
                  "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
                );
              } else {
                var tag = parser.tag;
                var parent = parser.tags[parser.tags.length - 1] || parser;
                if (tag.ns === parent.ns) {
                  tag.ns = Object.create(parent.ns);
                }
                tag.ns[local] = parser.attribValue;
              }
            }
            parser.attribList.push([parser.attribName, parser.attribValue]);
          } else {
            parser.tag.attributes[parser.attribName] = parser.attribValue;
            emitNode(parser, "onattribute", {
              name: parser.attribName,
              value: parser.attribValue
            });
          }
          parser.attribName = parser.attribValue = "";
        }
        function openTag(parser, selfClosing) {
          if (parser.opt.xmlns) {
            var tag = parser.tag;
            var qn = qname(parser.tagName);
            tag.prefix = qn.prefix;
            tag.local = qn.local;
            tag.uri = tag.ns[qn.prefix] || "";
            if (tag.prefix && !tag.uri) {
              strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
              tag.uri = qn.prefix;
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (tag.ns && parent.ns !== tag.ns) {
              Object.keys(tag.ns).forEach(function(p) {
                emitNode(parser, "onopennamespace", {
                  prefix: p,
                  uri: tag.ns[p]
                });
              });
            }
            for (var i = 0, l = parser.attribList.length; i < l; i++) {
              var nv = parser.attribList[i];
              var name = nv[0];
              var value = nv[1];
              var qualName = qname(name, true);
              var prefix = qualName.prefix;
              var local = qualName.local;
              var uri = prefix === "" ? "" : tag.ns[prefix] || "";
              var a = {
                name,
                value,
                prefix,
                local,
                uri
              };
              if (prefix && prefix !== "xmlns" && !uri) {
                strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
                a.uri = prefix;
              }
              parser.tag.attributes[name] = a;
              emitNode(parser, "onattribute", a);
            }
            parser.attribList.length = 0;
          }
          parser.tag.isSelfClosing = !!selfClosing;
          parser.sawRoot = true;
          parser.tags.push(parser.tag);
          emitNode(parser, "onopentag", parser.tag);
          if (!selfClosing) {
            if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
              parser.state = S.SCRIPT;
            } else {
              parser.state = S.TEXT;
            }
            parser.tag = null;
            parser.tagName = "";
          }
          parser.attribName = parser.attribValue = "";
          parser.attribList.length = 0;
        }
        function closeTag(parser) {
          if (!parser.tagName) {
            strictFail(parser, "Weird empty close tag.");
            parser.textNode += "</>";
            parser.state = S.TEXT;
            return;
          }
          if (parser.script) {
            if (parser.tagName !== "script") {
              parser.script += "</" + parser.tagName + ">";
              parser.tagName = "";
              parser.state = S.SCRIPT;
              return;
            }
            emitNode(parser, "onscript", parser.script);
            parser.script = "";
          }
          var t = parser.tags.length;
          var tagName = parser.tagName;
          if (!parser.strict) {
            tagName = tagName[parser.looseCase]();
          }
          var closeTo = tagName;
          while (t--) {
            var close = parser.tags[t];
            if (close.name !== closeTo) {
              strictFail(parser, "Unexpected close tag");
            } else {
              break;
            }
          }
          if (t < 0) {
            strictFail(parser, "Unmatched closing tag: " + parser.tagName);
            parser.textNode += "</" + parser.tagName + ">";
            parser.state = S.TEXT;
            return;
          }
          parser.tagName = tagName;
          var s2 = parser.tags.length;
          while (s2-- > t) {
            var tag = parser.tag = parser.tags.pop();
            parser.tagName = parser.tag.name;
            emitNode(parser, "onclosetag", parser.tagName);
            var x = {};
            for (var i in tag.ns) {
              x[i] = tag.ns[i];
            }
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (parser.opt.xmlns && tag.ns !== parent.ns) {
              Object.keys(tag.ns).forEach(function(p) {
                var n = tag.ns[p];
                emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
              });
            }
          }
          if (t === 0)
            parser.closedRoot = true;
          parser.tagName = parser.attribValue = parser.attribName = "";
          parser.attribList.length = 0;
          parser.state = S.TEXT;
        }
        function parseEntity(parser) {
          var entity = parser.entity;
          var entityLC = entity.toLowerCase();
          var num;
          var numStr = "";
          if (parser.ENTITIES[entity]) {
            return parser.ENTITIES[entity];
          }
          if (parser.ENTITIES[entityLC]) {
            return parser.ENTITIES[entityLC];
          }
          entity = entityLC;
          if (entity.charAt(0) === "#") {
            if (entity.charAt(1) === "x") {
              entity = entity.slice(2);
              num = parseInt(entity, 16);
              numStr = num.toString(16);
            } else {
              entity = entity.slice(1);
              num = parseInt(entity, 10);
              numStr = num.toString(10);
            }
          }
          entity = entity.replace(/^0+/, "");
          if (isNaN(num) || numStr.toLowerCase() !== entity) {
            strictFail(parser, "Invalid character entity");
            return "&" + parser.entity + ";";
          }
          return String.fromCodePoint(num);
        }
        function beginWhiteSpace(parser, c) {
          if (c === "<") {
            parser.state = S.OPEN_WAKA;
            parser.startTagPosition = parser.position;
          } else if (!isWhitespace(c)) {
            strictFail(parser, "Non-whitespace before first tag.");
            parser.textNode = c;
            parser.state = S.TEXT;
          }
        }
        function charAt(chunk, i) {
          var result = "";
          if (i < chunk.length) {
            result = chunk.charAt(i);
          }
          return result;
        }
        function write(chunk) {
          var parser = this;
          if (this.error) {
            throw this.error;
          }
          if (parser.closed) {
            return error(
              parser,
              "Cannot write after close. Assign an onready handler."
            );
          }
          if (chunk === null) {
            return end(parser);
          }
          if (typeof chunk === "object") {
            chunk = chunk.toString();
          }
          var i = 0;
          var c = "";
          while (true) {
            c = charAt(chunk, i++);
            parser.c = c;
            if (!c) {
              break;
            }
            if (parser.trackPosition) {
              parser.position++;
              if (c === "\n") {
                parser.line++;
                parser.column = 0;
              } else {
                parser.column++;
              }
            }
            switch (parser.state) {
              case S.BEGIN:
                parser.state = S.BEGIN_WHITESPACE;
                if (c === "\uFEFF") {
                  continue;
                }
                beginWhiteSpace(parser, c);
                continue;
              case S.BEGIN_WHITESPACE:
                beginWhiteSpace(parser, c);
                continue;
              case S.TEXT:
                if (parser.sawRoot && !parser.closedRoot) {
                  var starti = i - 1;
                  while (c && c !== "<" && c !== "&") {
                    c = charAt(chunk, i++);
                    if (c && parser.trackPosition) {
                      parser.position++;
                      if (c === "\n") {
                        parser.line++;
                        parser.column = 0;
                      } else {
                        parser.column++;
                      }
                    }
                  }
                  parser.textNode += chunk.substring(starti, i - 1);
                }
                if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                  parser.state = S.OPEN_WAKA;
                  parser.startTagPosition = parser.position;
                } else {
                  if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                    strictFail(parser, "Text data outside of root node.");
                  }
                  if (c === "&") {
                    parser.state = S.TEXT_ENTITY;
                  } else {
                    parser.textNode += c;
                  }
                }
                continue;
              case S.SCRIPT:
                if (c === "<") {
                  parser.state = S.SCRIPT_ENDING;
                } else {
                  parser.script += c;
                }
                continue;
              case S.SCRIPT_ENDING:
                if (c === "/") {
                  parser.state = S.CLOSE_TAG;
                } else {
                  parser.script += "<" + c;
                  parser.state = S.SCRIPT;
                }
                continue;
              case S.OPEN_WAKA:
                if (c === "!") {
                  parser.state = S.SGML_DECL;
                  parser.sgmlDecl = "";
                } else if (isWhitespace(c)) {
                } else if (isMatch(nameStart, c)) {
                  parser.state = S.OPEN_TAG;
                  parser.tagName = c;
                } else if (c === "/") {
                  parser.state = S.CLOSE_TAG;
                  parser.tagName = "";
                } else if (c === "?") {
                  parser.state = S.PROC_INST;
                  parser.procInstName = parser.procInstBody = "";
                } else {
                  strictFail(parser, "Unencoded <");
                  if (parser.startTagPosition + 1 < parser.position) {
                    var pad = parser.position - parser.startTagPosition;
                    c = new Array(pad).join(" ") + c;
                  }
                  parser.textNode += "<" + c;
                  parser.state = S.TEXT;
                }
                continue;
              case S.SGML_DECL:
                if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
                  emitNode(parser, "onopencdata");
                  parser.state = S.CDATA;
                  parser.sgmlDecl = "";
                  parser.cdata = "";
                } else if (parser.sgmlDecl + c === "--") {
                  parser.state = S.COMMENT;
                  parser.comment = "";
                  parser.sgmlDecl = "";
                } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                  parser.state = S.DOCTYPE;
                  if (parser.doctype || parser.sawRoot) {
                    strictFail(
                      parser,
                      "Inappropriately located doctype declaration"
                    );
                  }
                  parser.doctype = "";
                  parser.sgmlDecl = "";
                } else if (c === ">") {
                  emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                  parser.sgmlDecl = "";
                  parser.state = S.TEXT;
                } else if (isQuote(c)) {
                  parser.state = S.SGML_DECL_QUOTED;
                  parser.sgmlDecl += c;
                } else {
                  parser.sgmlDecl += c;
                }
                continue;
              case S.SGML_DECL_QUOTED:
                if (c === parser.q) {
                  parser.state = S.SGML_DECL;
                  parser.q = "";
                }
                parser.sgmlDecl += c;
                continue;
              case S.DOCTYPE:
                if (c === ">") {
                  parser.state = S.TEXT;
                  emitNode(parser, "ondoctype", parser.doctype);
                  parser.doctype = true;
                } else {
                  parser.doctype += c;
                  if (c === "[") {
                    parser.state = S.DOCTYPE_DTD;
                  } else if (isQuote(c)) {
                    parser.state = S.DOCTYPE_QUOTED;
                    parser.q = c;
                  }
                }
                continue;
              case S.DOCTYPE_QUOTED:
                parser.doctype += c;
                if (c === parser.q) {
                  parser.q = "";
                  parser.state = S.DOCTYPE;
                }
                continue;
              case S.DOCTYPE_DTD:
                parser.doctype += c;
                if (c === "]") {
                  parser.state = S.DOCTYPE;
                } else if (isQuote(c)) {
                  parser.state = S.DOCTYPE_DTD_QUOTED;
                  parser.q = c;
                }
                continue;
              case S.DOCTYPE_DTD_QUOTED:
                parser.doctype += c;
                if (c === parser.q) {
                  parser.state = S.DOCTYPE_DTD;
                  parser.q = "";
                }
                continue;
              case S.COMMENT:
                if (c === "-") {
                  parser.state = S.COMMENT_ENDING;
                } else {
                  parser.comment += c;
                }
                continue;
              case S.COMMENT_ENDING:
                if (c === "-") {
                  parser.state = S.COMMENT_ENDED;
                  parser.comment = textopts(parser.opt, parser.comment);
                  if (parser.comment) {
                    emitNode(parser, "oncomment", parser.comment);
                  }
                  parser.comment = "";
                } else {
                  parser.comment += "-" + c;
                  parser.state = S.COMMENT;
                }
                continue;
              case S.COMMENT_ENDED:
                if (c !== ">") {
                  strictFail(parser, "Malformed comment");
                  parser.comment += "--" + c;
                  parser.state = S.COMMENT;
                } else {
                  parser.state = S.TEXT;
                }
                continue;
              case S.CDATA:
                if (c === "]") {
                  parser.state = S.CDATA_ENDING;
                } else {
                  parser.cdata += c;
                }
                continue;
              case S.CDATA_ENDING:
                if (c === "]") {
                  parser.state = S.CDATA_ENDING_2;
                } else {
                  parser.cdata += "]" + c;
                  parser.state = S.CDATA;
                }
                continue;
              case S.CDATA_ENDING_2:
                if (c === ">") {
                  if (parser.cdata) {
                    emitNode(parser, "oncdata", parser.cdata);
                  }
                  emitNode(parser, "onclosecdata");
                  parser.cdata = "";
                  parser.state = S.TEXT;
                } else if (c === "]") {
                  parser.cdata += "]";
                } else {
                  parser.cdata += "]]" + c;
                  parser.state = S.CDATA;
                }
                continue;
              case S.PROC_INST:
                if (c === "?") {
                  parser.state = S.PROC_INST_ENDING;
                } else if (isWhitespace(c)) {
                  parser.state = S.PROC_INST_BODY;
                } else {
                  parser.procInstName += c;
                }
                continue;
              case S.PROC_INST_BODY:
                if (!parser.procInstBody && isWhitespace(c)) {
                  continue;
                } else if (c === "?") {
                  parser.state = S.PROC_INST_ENDING;
                } else {
                  parser.procInstBody += c;
                }
                continue;
              case S.PROC_INST_ENDING:
                if (c === ">") {
                  emitNode(parser, "onprocessinginstruction", {
                    name: parser.procInstName,
                    body: parser.procInstBody
                  });
                  parser.procInstName = parser.procInstBody = "";
                  parser.state = S.TEXT;
                } else {
                  parser.procInstBody += "?" + c;
                  parser.state = S.PROC_INST_BODY;
                }
                continue;
              case S.OPEN_TAG:
                if (isMatch(nameBody, c)) {
                  parser.tagName += c;
                } else {
                  newTag(parser);
                  if (c === ">") {
                    openTag(parser);
                  } else if (c === "/") {
                    parser.state = S.OPEN_TAG_SLASH;
                  } else {
                    if (!isWhitespace(c)) {
                      strictFail(parser, "Invalid character in tag name");
                    }
                    parser.state = S.ATTRIB;
                  }
                }
                continue;
              case S.OPEN_TAG_SLASH:
                if (c === ">") {
                  openTag(parser, true);
                  closeTag(parser);
                } else {
                  strictFail(parser, "Forward-slash in opening tag not followed by >");
                  parser.state = S.ATTRIB;
                }
                continue;
              case S.ATTRIB:
                if (isWhitespace(c)) {
                  continue;
                } else if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else if (isMatch(nameStart, c)) {
                  parser.attribName = c;
                  parser.attribValue = "";
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_NAME:
                if (c === "=") {
                  parser.state = S.ATTRIB_VALUE;
                } else if (c === ">") {
                  strictFail(parser, "Attribute without value");
                  parser.attribValue = parser.attribName;
                  attrib(parser);
                  openTag(parser);
                } else if (isWhitespace(c)) {
                  parser.state = S.ATTRIB_NAME_SAW_WHITE;
                } else if (isMatch(nameBody, c)) {
                  parser.attribName += c;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_NAME_SAW_WHITE:
                if (c === "=") {
                  parser.state = S.ATTRIB_VALUE;
                } else if (isWhitespace(c)) {
                  continue;
                } else {
                  strictFail(parser, "Attribute without value");
                  parser.tag.attributes[parser.attribName] = "";
                  parser.attribValue = "";
                  emitNode(parser, "onattribute", {
                    name: parser.attribName,
                    value: ""
                  });
                  parser.attribName = "";
                  if (c === ">") {
                    openTag(parser);
                  } else if (isMatch(nameStart, c)) {
                    parser.attribName = c;
                    parser.state = S.ATTRIB_NAME;
                  } else {
                    strictFail(parser, "Invalid attribute name");
                    parser.state = S.ATTRIB;
                  }
                }
                continue;
              case S.ATTRIB_VALUE:
                if (isWhitespace(c)) {
                  continue;
                } else if (isQuote(c)) {
                  parser.q = c;
                  parser.state = S.ATTRIB_VALUE_QUOTED;
                } else {
                  strictFail(parser, "Unquoted attribute value");
                  parser.state = S.ATTRIB_VALUE_UNQUOTED;
                  parser.attribValue = c;
                }
                continue;
              case S.ATTRIB_VALUE_QUOTED:
                if (c !== parser.q) {
                  if (c === "&") {
                    parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                  } else {
                    parser.attribValue += c;
                  }
                  continue;
                }
                attrib(parser);
                parser.q = "";
                parser.state = S.ATTRIB_VALUE_CLOSED;
                continue;
              case S.ATTRIB_VALUE_CLOSED:
                if (isWhitespace(c)) {
                  parser.state = S.ATTRIB;
                } else if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else if (isMatch(nameStart, c)) {
                  strictFail(parser, "No whitespace between attributes");
                  parser.attribName = c;
                  parser.attribValue = "";
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                }
                continue;
              case S.ATTRIB_VALUE_UNQUOTED:
                if (!isAttribEnd(c)) {
                  if (c === "&") {
                    parser.state = S.ATTRIB_VALUE_ENTITY_U;
                  } else {
                    parser.attribValue += c;
                  }
                  continue;
                }
                attrib(parser);
                if (c === ">") {
                  openTag(parser);
                } else {
                  parser.state = S.ATTRIB;
                }
                continue;
              case S.CLOSE_TAG:
                if (!parser.tagName) {
                  if (isWhitespace(c)) {
                    continue;
                  } else if (notMatch(nameStart, c)) {
                    if (parser.script) {
                      parser.script += "</" + c;
                      parser.state = S.SCRIPT;
                    } else {
                      strictFail(parser, "Invalid tagname in closing tag.");
                    }
                  } else {
                    parser.tagName = c;
                  }
                } else if (c === ">") {
                  closeTag(parser);
                } else if (isMatch(nameBody, c)) {
                  parser.tagName += c;
                } else if (parser.script) {
                  parser.script += "</" + parser.tagName;
                  parser.tagName = "";
                  parser.state = S.SCRIPT;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser, "Invalid tagname in closing tag");
                  }
                  parser.state = S.CLOSE_TAG_SAW_WHITE;
                }
                continue;
              case S.CLOSE_TAG_SAW_WHITE:
                if (isWhitespace(c)) {
                  continue;
                }
                if (c === ">") {
                  closeTag(parser);
                } else {
                  strictFail(parser, "Invalid characters in closing tag");
                }
                continue;
              case S.TEXT_ENTITY:
              case S.ATTRIB_VALUE_ENTITY_Q:
              case S.ATTRIB_VALUE_ENTITY_U:
                var returnState;
                var buffer;
                switch (parser.state) {
                  case S.TEXT_ENTITY:
                    returnState = S.TEXT;
                    buffer = "textNode";
                    break;
                  case S.ATTRIB_VALUE_ENTITY_Q:
                    returnState = S.ATTRIB_VALUE_QUOTED;
                    buffer = "attribValue";
                    break;
                  case S.ATTRIB_VALUE_ENTITY_U:
                    returnState = S.ATTRIB_VALUE_UNQUOTED;
                    buffer = "attribValue";
                    break;
                }
                if (c === ";") {
                  parser[buffer] += parseEntity(parser);
                  parser.entity = "";
                  parser.state = returnState;
                } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
                  parser.entity += c;
                } else {
                  strictFail(parser, "Invalid character in entity name");
                  parser[buffer] += "&" + parser.entity + c;
                  parser.entity = "";
                  parser.state = returnState;
                }
                continue;
              default:
                throw new Error(parser, "Unknown state: " + parser.state);
            }
          }
          if (parser.position >= parser.bufferCheckPosition) {
            checkBufferLength(parser);
          }
          return parser;
        }
        if (!String.fromCodePoint) {
          (function() {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            var fromCodePoint = function() {
              var MAX_SIZE = 16384;
              var codeUnits = [];
              var highSurrogate;
              var lowSurrogate;
              var index = -1;
              var length = arguments.length;
              if (!length) {
                return "";
              }
              var result = "";
              while (++index < length) {
                var codePoint = Number(arguments[index]);
                if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                codePoint < 0 || // not a valid Unicode code point
                codePoint > 1114111 || // not a valid Unicode code point
                floor(codePoint) !== codePoint) {
                  throw RangeError("Invalid code point: " + codePoint);
                }
                if (codePoint <= 65535) {
                  codeUnits.push(codePoint);
                } else {
                  codePoint -= 65536;
                  highSurrogate = (codePoint >> 10) + 55296;
                  lowSurrogate = codePoint % 1024 + 56320;
                  codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                  result += stringFromCharCode.apply(null, codeUnits);
                  codeUnits.length = 0;
                }
              }
              return result;
            };
            if (Object.defineProperty) {
              Object.defineProperty(String, "fromCodePoint", {
                value: fromCodePoint,
                configurable: true,
                writable: true
              });
            } else {
              String.fromCodePoint = fromCodePoint;
            }
          })();
        }
      })(typeof exports === "undefined" ? exports.sax = {} : exports);
    }
  });

  // src/gifti.js
  var require_gifti = __commonJS({
    "src/gifti.js"(exports, module) {
      var gifti = gifti || {};
      gifti.Utils = gifti.Utils || (typeof __require !== "undefined" ? require_utilities() : null);
      gifti.DataArray = gifti.DataArray || (typeof __require !== "undefined" ? require_dataArray() : null);
      gifti.Transform = gifti.Transform || (typeof __require !== "undefined" ? require_transform() : null);
      gifti.Label = gifti.Label || (typeof __require !== "undefined" ? require_label() : null);
      var sax = sax || (typeof __require !== "undefined" ? require_sax() : null);
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
      gifti.GIFTI = gifti.GIFTI || function() {
        this.attributes = null;
        this.metadata = {};
        this.dataArrays = [];
        this.labelTable = [];
      };
      gifti.GIFTI.prototype.getPointsDataArray = function() {
        var ctr;
        for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
          if (this.dataArrays[ctr].isPointSet()) {
            return this.dataArrays[ctr];
          }
        }
        return null;
      };
      gifti.GIFTI.prototype.getTrianglesDataArray = function() {
        var ctr;
        for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
          if (this.dataArrays[ctr].isTriangles()) {
            return this.dataArrays[ctr];
          }
        }
        return null;
      };
      gifti.GIFTI.prototype.getNormalsDataArray = function() {
        var ctr;
        for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
          if (this.dataArrays[ctr].isNormals()) {
            return this.dataArrays[ctr];
          }
        }
        return null;
      };
      gifti.GIFTI.prototype.getColorsDataArray = function() {
        var ctr;
        for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
          if (this.dataArrays[ctr].isColors()) {
            return this.dataArrays[ctr];
          }
        }
        return null;
      };
      gifti.GIFTI.prototype.getNumPoints = function() {
        var ctr;
        for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
          if (this.dataArrays[ctr].isPointSet()) {
            return this.dataArrays[ctr].getNumElements();
          }
        }
        return 0;
      };
      gifti.GIFTI.prototype.getNumTriangles = function() {
        var ctr;
        for (ctr = 0; ctr < this.dataArrays.length; ctr += 1) {
          if (this.dataArrays[ctr].isTriangles()) {
            return this.dataArrays[ctr].getNumElements();
          }
        }
        return 0;
      };
      gifti.isThisFormat = function(filename) {
        return filename.indexOf(".gii") !== -1;
      };
      gifti.parse = function(xmlStr) {
        var parser = sax.parser(true), gii = null, currentDataArray = null, currentMetadataHolder = null, currentMetadataName = null, currentMetadataValue = null, currentTransform = null, currentString = "", currentLabel = null, isReadingGIFTI = false, isReadingMetadata = false, isReadingMD = false, isReadingName = false, isReadingValue = false, isReadingDataArray = false, isReadingTransform = false, isReadingDataSpace = false, isReadingTransformedSpace = false, isReadingMatrixData = false, isReadingData = false, isReadingLabelTable = false, isReadingLabel = false;
        parser.onopentag = function(node) {
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
        parser.ontext = parser.oncdata = function(text) {
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
        parser.onclosetag = function(tagName) {
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
        parser.onerror = function(e) {
          console.log(e);
        };
        parser.write(xmlStr).close();
        return gii;
      };
      var moduleType = typeof module;
      if (moduleType !== "undefined" && module.exports) {
        module.exports = gifti;
      }
    }
  });
  return require_gifti();
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

sax/lib/sax.js:
  (*! http://mths.be/fromcodepoint v0.1.0 by @mathias *)
*/
