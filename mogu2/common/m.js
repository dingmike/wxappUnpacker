function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    return t = {
        exports: {}
    }, e(t, t.exports), t.exports;
}

function r(e) {
    return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
}

function n(e) {
    return "function" == typeof e.readFloatLE && "function" == typeof e.slice && r(e.slice(0, 0));
}

function o(e) {
    return {
        time: new Date(Date.now() + w),
        _sync: e
    };
}

function a() {
    return new d.default(function(e, t) {
        wx.request({
            url: "https://act.mogujie.com/time",
            success: function(r) {
                var n;
                try {
                    n = JSON.parse(r.data.replace(/^[\s\S]*\(({[\s\S]+})\)[\s\S]*$/, "$1"));
                } catch (e) {
                    return t(e);
                }
                var o = n.status, a = n.result;
                if (1001 === o.code) return e(1e3 * a.time - Date.now());
                t(new Error(o.msg));
            },
            fail: function(e) {
                t(e.errMsg);
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.System = exports.performance = void 0;

var s = e(require("./config")), u = e(require("../lib/mwp")), i = require("../lib/request-manager"), c = e(require("../lib/system")), f = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../lib/utils")), d = e(require("../lib/promise")), p = e(require("../lib/mce")), l = {
    st: Date.now()
}, h = t(function(e) {
    !function() {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = {
            rotl: function(e, t) {
                return e << t | e >>> 32 - t;
            },
            rotr: function(e, t) {
                return e << 32 - t | e >>> t;
            },
            endian: function(e) {
                if (e.constructor == Number) return 16711935 & r.rotl(e, 8) | 4278255360 & r.rotl(e, 24);
                for (var t = 0; t < e.length; t++) e[t] = r.endian(e[t]);
                return e;
            },
            randomBytes: function(e) {
                for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
                return t;
            },
            bytesToWords: function(e) {
                for (var t = [], r = 0, n = 0; r < e.length; r++, n += 8) t[n >>> 5] |= e[r] << 24 - n % 32;
                return t;
            },
            wordsToBytes: function(e) {
                for (var t = [], r = 0; r < 32 * e.length; r += 8) t.push(e[r >>> 5] >>> 24 - r % 32 & 255);
                return t;
            },
            bytesToHex: function(e) {
                for (var t = [], r = 0; r < e.length; r++) t.push((e[r] >>> 4).toString(16)), t.push((15 & e[r]).toString(16));
                return t.join("");
            },
            hexToBytes: function(e) {
                for (var t = [], r = 0; r < e.length; r += 2) t.push(parseInt(e.substr(r, 2), 16));
                return t;
            },
            bytesToBase64: function(e) {
                for (var r = [], n = 0; n < e.length; n += 3) for (var o = e[n] << 16 | e[n + 1] << 8 | e[n + 2], a = 0; a < 4; a++) 8 * n + 6 * a <= 8 * e.length ? r.push(t.charAt(o >>> 6 * (3 - a) & 63)) : r.push("=");
                return r.join("");
            },
            base64ToBytes: function(e) {
                e = e.replace(/[^A-Z0-9+\/]/gi, "");
                for (var r = [], n = 0, o = 0; n < e.length; o = ++n % 4) 0 != o && r.push((t.indexOf(e.charAt(n - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | t.indexOf(e.charAt(n)) >>> 6 - 2 * o);
                return r;
            }
        };
        e.exports = r;
    }();
}), y = {
    utf8: {
        stringToBytes: function(e) {
            return y.bin.stringToBytes(unescape(encodeURIComponent(e)));
        },
        bytesToString: function(e) {
            return decodeURIComponent(escape(y.bin.bytesToString(e)));
        }
    },
    bin: {
        stringToBytes: function(e) {
            for (var t = [], r = 0; r < e.length; r++) t.push(255 & e.charCodeAt(r));
            return t;
        },
        bytesToString: function(e) {
            for (var t = [], r = 0; r < e.length; r++) t.push(String.fromCharCode(e[r]));
            return t.join("");
        }
    }
}, g = y, v = function(e) {
    return null != e && (r(e) || n(e) || !!e._isBuffer);
}, m = t(function(e) {
    !function() {
        var t = h, r = g.utf8, n = v, o = g.bin, a = function e(a, s) {
            a.constructor == String ? a = s && "binary" === s.encoding ? o.stringToBytes(a) : r.stringToBytes(a) : n(a) ? a = Array.prototype.slice.call(a, 0) : Array.isArray(a) || (a = a.toString());
            for (var u = t.bytesToWords(a), i = 8 * a.length, c = 1732584193, f = -271733879, d = -1732584194, p = 271733878, l = 0; l < u.length; l++) u[l] = 16711935 & (u[l] << 8 | u[l] >>> 24) | 4278255360 & (u[l] << 24 | u[l] >>> 8);
            u[i >>> 5] |= 128 << i % 32, u[14 + (i + 64 >>> 9 << 4)] = i;
            for (var h = e._ff, y = e._gg, g = e._hh, v = e._ii, l = 0; l < u.length; l += 16) {
                var m = c, M = f, b = d, A = p;
                f = v(f = v(f = v(f = v(f = g(f = g(f = g(f = g(f = y(f = y(f = y(f = y(f = h(f = h(f = h(f = h(f, d = h(d, p = h(p, c = h(c, f, d, p, u[l + 0], 7, -680876936), f, d, u[l + 1], 12, -389564586), c, f, u[l + 2], 17, 606105819), p, c, u[l + 3], 22, -1044525330), d = h(d, p = h(p, c = h(c, f, d, p, u[l + 4], 7, -176418897), f, d, u[l + 5], 12, 1200080426), c, f, u[l + 6], 17, -1473231341), p, c, u[l + 7], 22, -45705983), d = h(d, p = h(p, c = h(c, f, d, p, u[l + 8], 7, 1770035416), f, d, u[l + 9], 12, -1958414417), c, f, u[l + 10], 17, -42063), p, c, u[l + 11], 22, -1990404162), d = h(d, p = h(p, c = h(c, f, d, p, u[l + 12], 7, 1804603682), f, d, u[l + 13], 12, -40341101), c, f, u[l + 14], 17, -1502002290), p, c, u[l + 15], 22, 1236535329), d = y(d, p = y(p, c = y(c, f, d, p, u[l + 1], 5, -165796510), f, d, u[l + 6], 9, -1069501632), c, f, u[l + 11], 14, 643717713), p, c, u[l + 0], 20, -373897302), d = y(d, p = y(p, c = y(c, f, d, p, u[l + 5], 5, -701558691), f, d, u[l + 10], 9, 38016083), c, f, u[l + 15], 14, -660478335), p, c, u[l + 4], 20, -405537848), d = y(d, p = y(p, c = y(c, f, d, p, u[l + 9], 5, 568446438), f, d, u[l + 14], 9, -1019803690), c, f, u[l + 3], 14, -187363961), p, c, u[l + 8], 20, 1163531501), d = y(d, p = y(p, c = y(c, f, d, p, u[l + 13], 5, -1444681467), f, d, u[l + 2], 9, -51403784), c, f, u[l + 7], 14, 1735328473), p, c, u[l + 12], 20, -1926607734), d = g(d, p = g(p, c = g(c, f, d, p, u[l + 5], 4, -378558), f, d, u[l + 8], 11, -2022574463), c, f, u[l + 11], 16, 1839030562), p, c, u[l + 14], 23, -35309556), d = g(d, p = g(p, c = g(c, f, d, p, u[l + 1], 4, -1530992060), f, d, u[l + 4], 11, 1272893353), c, f, u[l + 7], 16, -155497632), p, c, u[l + 10], 23, -1094730640), d = g(d, p = g(p, c = g(c, f, d, p, u[l + 13], 4, 681279174), f, d, u[l + 0], 11, -358537222), c, f, u[l + 3], 16, -722521979), p, c, u[l + 6], 23, 76029189), d = g(d, p = g(p, c = g(c, f, d, p, u[l + 9], 4, -640364487), f, d, u[l + 12], 11, -421815835), c, f, u[l + 15], 16, 530742520), p, c, u[l + 2], 23, -995338651), d = v(d, p = v(p, c = v(c, f, d, p, u[l + 0], 6, -198630844), f, d, u[l + 7], 10, 1126891415), c, f, u[l + 14], 15, -1416354905), p, c, u[l + 5], 21, -57434055), d = v(d, p = v(p, c = v(c, f, d, p, u[l + 12], 6, 1700485571), f, d, u[l + 3], 10, -1894986606), c, f, u[l + 10], 15, -1051523), p, c, u[l + 1], 21, -2054922799), d = v(d, p = v(p, c = v(c, f, d, p, u[l + 8], 6, 1873313359), f, d, u[l + 15], 10, -30611744), c, f, u[l + 6], 15, -1560198380), p, c, u[l + 13], 21, 1309151649), d = v(d, p = v(p, c = v(c, f, d, p, u[l + 4], 6, -145523070), f, d, u[l + 11], 10, -1120210379), c, f, u[l + 2], 15, 718787259), p, c, u[l + 9], 21, -343485551), 
                c = c + m >>> 0, f = f + M >>> 0, d = d + b >>> 0, p = p + A >>> 0;
            }
            return t.endian([ c, f, d, p ]);
        };
        a._ff = function(e, t, r, n, o, a, s) {
            var u = e + (t & r | ~t & n) + (o >>> 0) + s;
            return (u << a | u >>> 32 - a) + t;
        }, a._gg = function(e, t, r, n, o, a, s) {
            var u = e + (t & n | r & ~n) + (o >>> 0) + s;
            return (u << a | u >>> 32 - a) + t;
        }, a._hh = function(e, t, r, n, o, a, s) {
            var u = e + (t ^ r ^ n) + (o >>> 0) + s;
            return (u << a | u >>> 32 - a) + t;
        }, a._ii = function(e, t, r, n, o, a, s) {
            var u = e + (r ^ (t | ~n)) + (o >>> 0) + s;
            return (u << a | u >>> 32 - a) + t;
        }, a._blocksize = 16, a._digestsize = 16, e.exports = function(e, r) {
            if (void 0 === e || null === e) throw new Error("Illegal argument " + e);
            var n = t.wordsToBytes(a(e, r));
            return r && r.asBytes ? n : r && r.asString ? o.bytesToString(n) : t.bytesToHex(n);
        };
    }();
}), M = /&/, b = /\+/g, A = Object.prototype.hasOwnProperty, _ = function(e) {
    return e;
}, H = Object.freeze({
    parse: function(e, t) {
        void 0 === t && (t = !0);
        var r = e.split(M), n = t ? decodeURIComponent : _;
        return r.reduce(function(e, t) {
            var r, o, a = (t = t.replace(b, "%20")).indexOf("=");
            return a < 0 ? (r = t, o = "") : (r = t.slice(0, a), o = t.slice(a + 1)), r = n(r), 
            o = n(o), A.call(e, r) ? Array.isArray(e[r]) ? e[r].push(o) : e[r] = [ e[r], o ] : e[r] = o, 
            e;
        }, {});
    },
    stringify: function(e, t) {
        if (void 0 === t && (t = !0), !e) return "";
        var r = t ? encodeURIComponent : _;
        return Object.keys(e).map(function(t) {
            var n = e[t];
            return t = r(t), Array.isArray(n) ? n.map(function(e, n) {
                return t + "[" + n + "]=" + r(e);
            }).join("&") : t + "=" + r(n);
        }).join("&");
    }
});

Date.format = function(e, t) {
    var r = Date.formatLogic, n = -1 !== t.indexOf("a") || -1 !== t.indexOf("A"), o = [];
    o.d = e.getDate(), o.dd = r.pad(o.d, 2), o.ddd = r.i18n.shortDayNames[e.getDay()], 
    o.dddd = r.i18n.dayNames[e.getDay()], o.M = e.getMonth() + 1, o.MM = r.pad(o.M, 2), 
    o.MMM = r.i18n.shortMonthNames[o.M - 1], o.MMMM = r.i18n.monthNames[o.M - 1], o.yyyy = e.getFullYear(), 
    o.yyy = r.pad(o.yyyy, 2) + "y", o.yy = r.pad(o.yyyy, 2), o.y = "y", o.H = e.getHours(), 
    o.hh = r.pad(n ? r.convertTo12Hour(o.H) : o.H, 2), o.h = n ? r.convertTo12Hour(o.H) : o.H, 
    o.HH = r.pad(o.H, 2), o.m = e.getMinutes(), o.mm = r.pad(o.m, 2), o.s = e.getSeconds(), 
    o.ss = r.pad(o.s, 2), o.z = e.getMilliseconds(), o.zz = o.z + "z", o.zzz = r.pad(o.z, 3), 
    o.ap = o.H < 12 ? "am" : "pm", o.a = o.H < 12 ? "am" : "pm", o.AP = o.H < 12 ? "AM" : "PM", 
    o.A = o.H < 12 ? "AM" : "PM";
    for (var a = 0, s = "", u = ""; a < t.length; ) {
        for (u = t.charAt(a); a + 1 < t.length && void 0 !== o[u + t.charAt(a + 1)]; ) u += t.charAt(++a);
        void 0 !== o[u] ? s += o[u] : s += u, a++;
    }
    return s;
}, Date.formatLogic = {
    pad: function(e, t) {
        var r = "";
        if (t < 1) return "";
        for (var n = 0; n < t; n++) r += "0";
        var o = e;
        return o = r + e, o = o.substring(o.length - t);
    },
    convertTo12Hour: function(e) {
        return e % 12 == 0 ? 12 : e % 12;
    },
    i18n: {
        dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        shortDayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        shortMonthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    }
}, Date.prototype.toFormattedString = function(e) {
    return Date.format(this, e);
}, Date.parseFormatted = function(e, t) {
    var r = new Date(2e3, 0, 1), n = [];
    n.d = "([0-9][0-9]?)", n.dd = "([0-9][0-9])", n.M = "([0-9][0-9]?)", n.MM = "([0-9][0-9])", 
    n.yyyy = "([0-9][0-9][0-9][0-9])", n.yyy = "([0-9][0-9])[y]", n.yy = "([0-9][0-9])", 
    n.H = "([0-9][0-9]?)", n.hh = "([0-9][0-9])", n.h = "([0-9][0-9]?)", n.HH = "([0-9][0-9])", 
    n.m = "([0-9][0-9]?)", n.mm = "([0-9][0-9])", n.s = "([0-9][0-9]?)", n.ss = "([0-9][0-9])", 
    n.z = "([0-9][0-9]?[0-9]?)", n.zz = "([0-9][0-9]?[0-9]?)[z]", n.zzz = "([0-9][0-9][0-9])", 
    n.ap = "([ap][m])", n.a = "([ap][m])", n.AP = "([AP][M])", n.A = "([AP][M])";
    for (var o = Date.parseLogic, a = 0, s = "", u = new Array(""), i = ""; a < t.length; ) {
        for (i = t.charAt(a); a + 1 < t.length && void 0 !== n[i + t.charAt(a + 1)]; ) i += t.charAt(++a);
        void 0 !== n[i] ? (s += n[i], u[u.length] = i) : s += i, a++;
    }
    var c = new RegExp(s), f = e.match(c);
    if (void 0 !== f && f.length === u.length) {
        for (a = 0; a < u.length; a++) if ("" !== u[a]) switch (u[a]) {
          case "yyyy":
          case "yyy":
            r.setYear(o.parseInt(f[a]));
            break;

          case "yy":
            r.setYear(2e3 + o.parseInt(f[a]));
            break;

          case "MM":
          case "M":
            r.setMonth(o.parseInt(f[a]) - 1);
            break;

          case "dd":
          case "d":
            r.setDate(o.parseInt(f[a]));
            break;

          case "hh":
          case "h":
          case "HH":
          case "H":
            r.setHours(o.parseInt(f[a]));
            break;

          case "mm":
          case "m":
            r.setMinutes(o.parseInt(f[a]));
            break;

          case "ss":
          case "s":
            r.setSeconds(o.parseInt(f[a]));
            break;

          case "zzz":
          case "zz":
          case "z":
            r.setMilliseconds(o.parseInt(f[a]));
            break;

          case "AP":
          case "A":
          case "ap":
          case "a":
            ("PM" === f[a] || "pm" === f[a]) && r.getHours() < 12 && r.setHours(r.getHours() + 12), 
            "AM" !== f[a] && "am" !== f[a] || 12 !== r.getHours() || r.setHours(0);
        }
        return r;
    }
}, Date.parseLogic = {
    unpad: function(e) {
        for (var t = e; t.length > 1 && "0" === t[0]; ) t = t.substring(1, t.length);
        return t;
    },
    parseInt: function(e) {
        function t(t) {
            return e.apply(this, arguments);
        }
        return t.toString = function() {
            return e.toString();
        }, t;
    }(function(e) {
        return parseInt(this.unpad(e), 10);
    })
}, Date.prototype.fromFormattedString = function(e, t) {
    return this.setTime(Date.parseFormatted(e, t).getTime()), this;
};

var S = function(e) {
    return e;
};

if (void 0 !== s.default && "develop" === s.default.$env) {
    S = function(e) {
        function t() {
            return [ "_mwp_h5_token_enc", "_mwp_h5_token", "__mogujie", "__ud_" ].map(function(t) {
                return t + "=" + encodeURIComponent(e.getCookie(t));
            }).join("; ");
        }
        var r = e.prototype.fetch;
        return e.Env = Object.assign({
            Mock: "MOCK"
        }, e.Env), e.prototype.fetch = function(n, o) {
            var a = this;
            "MOCK" === this.options.env ? (this.options.hero && (this.data ? this.data._hero = this.options.hero : this.data = {
                _hero: this.options.hero
            }), i.requestManager.sendRequest({
                url: "https://lotus.meili-inc.com/mock/" + this.api + "@" + this.version,
                method: "GET",
                data: this.data,
                header: {
                    Cookie: t(),
                    "mw-did": e.getDeviceID()
                },
                success: function(t) {
                    if (200 === parseInt(t.statusCode, 10)) {
                        var r = t.data;
                        return void 0 === r.ret && (r = {
                            api: a.api,
                            v: a.version,
                            ret: e.Code.Success,
                            data: r
                        }), n(r);
                    }
                    o(new Error("network error, status code " + t.statusCode));
                },
                fail: function(e) {
                    o(new Error(e.errMsg));
                }
            })) : r.call(this, n, o);
        }, e;
    };
}

var T = S, w = null, z = null;

u.default.Promise = d.default;

var D = {
    v: void 0 === s.default ? "" : s.default.$version,
    Promise: d.default,
    requestManager: i.requestManager,
    MWP: u.default,
    MCE: p.default,
    fn: Object.assign({}, f, {
        md5: m
    }),
    qs: H,
    getServerTime: function(e) {
        return void 0 === e && (e = !1), null === w || e ? z || (z = a().catch(a).then(function(e) {
            var t = !0;
            return null === e ? t = !1 : w = e, z = null, o(t);
        })) : d.default.resolve(o(!1));
    }
};

void 0 !== s.default && "develop" === s.default.$env && (D.MWP = T(u.default), console.info("[INFO] `M.MWP` 可设置 options 为 `{ env: MWP.Env.Mock }` 代理至 Lotus")), 
Object.defineProperty(u.default, "v", {
    value: "1.1.4"
}), exports.performance = l, exports.System = c.default, exports.default = D;