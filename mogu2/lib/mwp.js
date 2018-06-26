function t(t) {
    return t && t[d("0xb")] ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function n(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : h(e)) && (void 0 === e ? "undefined" : h(e)) !== d("0x8") ? t : e;
}

function r(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : h(e)));
    t.prototype = Object.create(e && e[d("0x0")], {
        constructor: {
            value: t,
            enumerable: ![],
            writable: !![],
            configurable: !![]
        }
    }), e && (Object[d("0xc")] ? Object[d("0xc")](t, e) : t[d("0xd")] = e);
}

function o(t, e, n, r) {
    var o, i = arguments.length, s = i < 3 ? e : null === r ? r = Object[d("0x1")](e, n) : r;
    if (("undefined" == typeof Reflect ? "undefined" : m(Reflect)) === d("0xe") && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var u = t[d("0x4")] - 1; u >= 0; u--) (o = t[u]) && (s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
    return i > 3 && s && Object.defineProperty(e, n, s), s;
}

function i(t) {
    if (t[d("0x19")] === C[d("0x1a")]) return t.data;
    throw Object.assign(Object.create(new Error(t.msg || E)), {
        code: t.ret,
        payload: t
    });
}

function s(t) {
    return t && h(t.then) === d("0x8");
}

function u(t, e) {
    return e = {
        exports: {}
    }, t(e, e.exports), e.exports;
}

function a(t) {
    return !!t[d("0x9")] && h(t.constructor[d("0x2f")]) === d("0x8") && t.constructor.isBuffer(t);
}

function c(t) {
    return h(t.readFloatLE) === d("0x8") && "function" == typeof t.slice && a(t[d("0x30")](0, 0));
}

function x(t) {
    return t ? "string" == typeof t ? t : JSON.stringify(t) : "";
}

function f(t) {
    return function(e, n, r) {
        var o = r.value;
        r.value = function() {
            return console.warn("Deprecated:", t), o[d("0x7c")](this, arguments);
        };
    };
}

var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, l = [ "once", "_events", "$off", "NMMain@mgj_wxxcx_1.0", "GET", "Use `System.getSync('deviceId')` instead.", "getDeviceID", "prototype", "getOwnPropertyDescriptor", "value", "iterator", "length", "enumerable", "writable", "defineProperty", "function", "constructor", "../common/utils/cache", "__esModule", "setPrototypeOf", "__proto__", "object", "FAIL_SYS_TOKEN_NEED_RENEW", "FAIL_BIZ_SESSION_INVALID", "hostname", "api.mogujie.com", "mls", "devapi.meilishuo.com", "devapi.xiaodian.com", "preapi.xiaodian.com", "api.xiaodian.com", "freeze", "ret", "Success", "data", "callbacks", "parameter", "add", "promise", "Request", "then", "result", "filter", "Promise", "Parameter", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", "endian", "push", "substr", "charAt", "indexOf", "bin", "bytesToString", "fromCharCode", "isBuffer", "slice", "utf8", "encoding", "binary", "isArray", "_hh", "_ii", "_digestsize", "Illegal argument ", "asBytes", "asString", "bytesToHex", "mw-t", "mw-did", "mw-cmd-v", "now", "getTime", "_omitted", "_params", "sign", "map", "getSignedParams", "AppKey", "forEach", "mw-cookie-", "api", "resolve", "exec", "tasks", "instances", "all", "defaultOptions", "options", "headers", "getDSL", "getDSLParameter", "setGlobalEnv", "getGlobalEnv", "env", "getMWPCookies", "getCookies", "Develop", "getOrigin", "useHTTPS", "http:", "getHostname", "MWPCookieJar", "keys", "join", "Please implement `fetch` method in your own subclass", "_fetch", "NeedHttps", "retries", "handleResponse", "getQueue", '/* __VERSION__ */("1.1.4")', "mwp.cookie", "startsWith", "cookies", "_readStorage", "getCookieJar", "expires", "_writeStorage", "_get", "name", "setFromHeader", "path", "shared", "split", "_set", "parse", "getStorageKey", "setItem", "refresh", "some", "getPrototypeOf", "apply", "default", "error", "Fail to read mwp cookie, hostname: %s", "setStorage", "Fail to write mwp cookie, hostname: %s", "toString", "reduce", "PersistentStorage", "Key", "KEY_DEVICE_ID", "task", "getHeaders", "assign", "call", "sendRequest", "getURL", "string", "statusCode", "undefined", "getToken", "_getWxaCookieJar", "get", "deviceId", "put", "handleSessionInvalid", "emit", "loginHandler", "setSession", "getWxaCookieJar", "__mogujie", "setLoginHandler", "setCookie", "getCookie", "getContext", "$on" ];

!function(t, e) {
    !function(e) {
        for (;--e; ) t.push(t.shift());
    }(++e);
}(l, 174);

var d = function(t, e) {
    return l[t -= 0];
};

Object.defineProperty(exports, "__esModule", {
    value: !![]
});

var p, g = function t(e, n, r) {
    null === e && (e = Function[d("0x0")]);
    var o = Object[d("0x1")](e, n);
    if (void 0 === o) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, n, r);
    }
    if (d("0x2") in o) return o[d("0x2")];
    var s = o.get;
    if (void 0 !== s) return s.call(r);
}, v = function() {
    function t(t, e) {
        var n = [], r = !![], o = ![], i = void 0;
        try {
            for (var s, u = t[Symbol[d("0x3")]](); !(r = (s = u.next()).done) && (n.push(s.value), 
            !e || n[d("0x4")] !== e); r = !![]) ;
        } catch (t) {
            o = !![], i = t;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw i;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), y = function() {
    function t(t, e) {
        for (var n = 0; n < e[d("0x4")]; n++) {
            var r = e[n];
            r[d("0x5")] = r[d("0x5")] || ![], r.configurable = !![], "value" in r && (r[d("0x6")] = !![]), 
            Object[d("0x7")](t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), m = ("undefined" == typeof Symbol ? "undefined" : h(Symbol)) === d("0x8") && "symbol" === h(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : h(t);
} : function(t) {
    return t && ("undefined" == typeof Symbol ? "undefined" : h(Symbol)) === d("0x8") && t[d("0x9")] === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : h(t);
}, b = t(require("./promise")), k = t(require("./system")), _ = t(require("../common/base/Events")), w = t(require("../common/utils/debug")), S = require("./request-manager"), O = require(d("0xa")), E = "服务器开小差了，请稍候再试", P = {
    Develop: "DEVELOP",
    PreRelease: "PRE_RELEASE",
    Release: "RELEASE"
}, C = {
    Success: "SUCCESS",
    NeedHttps: "FAIL_SYS_NEED_HTTPS",
    TokenNeedRenew: d("0xf"),
    SessionInvalid: d("0x10")
}, j = function() {
    try {
        var t = location[d("0x11")];
        if (/(mogujie\.org|meili-inc\.com)$/.test(t)) return "nsh5";
    } catch (t) {}
    return "h5";
}(), T = (p = {}, p.mgj = {
    Develop: "devapi.mogujie.com",
    PreRelease: "newpreapi.mogujie.com",
    Release: d("0x12")
}, p[d("0x13")] = {
    Develop: d("0x14"),
    PreRelease: "preapi.meilishuo.com",
    Release: "api.meilishuo.com"
}, p.xd = {
    Develop: d("0x15"),
    PreRelease: d("0x16"),
    Release: d("0x17")
}, p), R = Object[d("0x18")]({
    ERR_MESSAGE: E,
    ENV: P,
    CODE: C,
    GATEWAY: j,
    HOSTNAME: T,
    TOKEN_KEY: "_mwp_h5_token",
    UUID_KEY: "__mgjuuid"
}), D = function() {
    function t() {
        this.data = {};
    }
    return t[d("0x0")].add = function(t, e, n) {
        return void 0 === n && (n = null), this[d("0x1b")][t + "." + e] = n, this;
    }, t[d("0x0")].toObject = function() {
        return this.data;
    }, t;
}(), I = function() {
    function t(t) {
        this[d("0x1c")] = {}, this.Request = t;
    }
    return t.prototype.addParameter = function(t, e, n) {
        return this.parameter || (this.parameter = new D()), this[d("0x1d")][d("0x1e")](t, e, n), 
        this;
    }, t.prototype.request = function(t, e, n, r) {
        var o, i = this;
        return n instanceof D ? o = n.toObject() : (o = this[d("0x1d")] ? this.parameter.toObject() : null, 
        r || (r = n || {})), this[d("0x1f")] = this[d("0x20")].request(t, e, o, r)[d("0x21")](function(t) {
            return i[d("0x22")] = t, i.Request.filterResult(t);
        }).then(function(t) {
            var e = Object.keys(t).filter(function(t) {
                return t in i.callbacks;
            }).map(function(e) {
                return i.callbacks[e](t[e]);
            })[d("0x23")](s);
            return e.length > 0 ? i.Request[d("0x24")].all(e)[d("0x21")](function() {
                return i[d("0x22")];
            }) : i.result;
        }), this;
    }, t[d("0x0")].on = function(t, e) {
        return this.callbacks[t] || (this[d("0x1c")][t] = e), this;
    }, t.prototype.then = function(t, e) {
        return this.promise = this[d("0x1f")][d("0x21")](t, e), this;
    }, t[d("0x0")].catch = function(t) {
        return this[d("0x1f")] = this[d("0x1f")].catch(t), this;
    }, t[d("0x25")] = D, t;
}(), W = u(function(t) {
    !function() {
        var e = d("0x26"), n = {
            rotl: function(t, e) {
                return t << e | t >>> 32 - e;
            },
            rotr: function(t, e) {
                return t << 32 - e | t >>> e;
            },
            endian: function(t) {
                if (t.constructor == Number) return 16711935 & n.rotl(t, 8) | 4278255360 & n.rotl(t, 24);
                for (var e = 0; e < t.length; e++) t[e] = n[d("0x27")](t[e]);
                return t;
            },
            randomBytes: function(t) {
                for (var e = []; t > 0; t--) e[d("0x28")](Math.floor(256 * Math.random()));
                return e;
            },
            bytesToWords: function(t) {
                for (var e = [], n = 0, r = 0; n < t.length; n++, r += 8) e[r >>> 5] |= t[n] << 24 - r % 32;
                return e;
            },
            wordsToBytes: function(t) {
                for (var e = [], n = 0; n < 32 * t.length; n += 8) e[d("0x28")](t[n >>> 5] >>> 24 - n % 32 & 255);
                return e;
            },
            bytesToHex: function(t) {
                for (var e = [], n = 0; n < t[d("0x4")]; n++) e[d("0x28")]((t[n] >>> 4).toString(16)), 
                e.push((15 & t[n]).toString(16));
                return e.join("");
            },
            hexToBytes: function(t) {
                for (var e = [], n = 0; n < t[d("0x4")]; n += 2) e[d("0x28")](parseInt(t[d("0x29")](n, 2), 16));
                return e;
            },
            bytesToBase64: function(t) {
                for (var n = [], r = 0; r < t[d("0x4")]; r += 3) for (var o = t[r] << 16 | t[r + 1] << 8 | t[r + 2], i = 0; i < 4; i++) 8 * r + 6 * i <= 8 * t[d("0x4")] ? n[d("0x28")](e[d("0x2a")](o >>> 6 * (3 - i) & 63)) : n.push("=");
                return n.join("");
            },
            base64ToBytes: function(t) {
                t = t.replace(/[^A-Z0-9+\/]/gi, "");
                for (var n = [], r = 0, o = 0; r < t.length; o = ++r % 4) 0 != o && n[d("0x28")]((e[d("0x2b")](t.charAt(r - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | e.indexOf(t.charAt(r)) >>> 6 - 2 * o);
                return n;
            }
        };
        t.exports = n;
    }();
}), M = {
    utf8: {
        stringToBytes: function(t) {
            return M.bin.stringToBytes(unescape(encodeURIComponent(t)));
        },
        bytesToString: function(t) {
            return decodeURIComponent(escape(M[d("0x2c")][d("0x2d")](t)));
        }
    },
    bin: {
        stringToBytes: function(t) {
            for (var e = [], n = 0; n < t[d("0x4")]; n++) e.push(255 & t.charCodeAt(n));
            return e;
        },
        bytesToString: function(t) {
            for (var e = [], n = 0; n < t[d("0x4")]; n++) e.push(String[d("0x2e")](t[n]));
            return e.join("");
        }
    }
}, A = M, H = function(t) {
    return null != t && (a(t) || c(t) || !!t._isBuffer);
}, N = u(function(t) {
    !function() {
        var e = W, n = A[d("0x31")], r = H, o = A[d("0x2c")], i = function t(i, s) {
            i.constructor == String ? i = s && s[d("0x32")] === d("0x33") ? o.stringToBytes(i) : n.stringToBytes(i) : r(i) ? i = Array.prototype.slice.call(i, 0) : Array[d("0x34")](i) || (i = i.toString());
            for (var u = e.bytesToWords(i), a = 8 * i.length, c = 1732584193, x = -271733879, f = -1732584194, h = 271733878, l = 0; l < u[d("0x4")]; l++) u[l] = 16711935 & (u[l] << 8 | u[l] >>> 24) | 4278255360 & (u[l] << 24 | u[l] >>> 8);
            u[a >>> 5] |= 128 << a % 32, u[14 + (a + 64 >>> 9 << 4)] = a;
            for (var p = t._ff, g = t._gg, v = t[d("0x35")], y = t[d("0x36")], l = 0; l < u.length; l += 16) {
                var m = c, b = x, k = f, _ = h;
                x = y(x = y(x = y(x = y(x = v(x = v(x = v(x = v(x = g(x = g(x = g(x = g(x = p(x = p(x = p(x = p(x, f = p(f, h = p(h, c = p(c, x, f, h, u[l + 0], 7, -680876936), x, f, u[l + 1], 12, -389564586), c, x, u[l + 2], 17, 606105819), h, c, u[l + 3], 22, -1044525330), f = p(f, h = p(h, c = p(c, x, f, h, u[l + 4], 7, -176418897), x, f, u[l + 5], 12, 1200080426), c, x, u[l + 6], 17, -1473231341), h, c, u[l + 7], 22, -45705983), f = p(f, h = p(h, c = p(c, x, f, h, u[l + 8], 7, 1770035416), x, f, u[l + 9], 12, -1958414417), c, x, u[l + 10], 17, -42063), h, c, u[l + 11], 22, -1990404162), f = p(f, h = p(h, c = p(c, x, f, h, u[l + 12], 7, 1804603682), x, f, u[l + 13], 12, -40341101), c, x, u[l + 14], 17, -1502002290), h, c, u[l + 15], 22, 1236535329), f = g(f, h = g(h, c = g(c, x, f, h, u[l + 1], 5, -165796510), x, f, u[l + 6], 9, -1069501632), c, x, u[l + 11], 14, 643717713), h, c, u[l + 0], 20, -373897302), f = g(f, h = g(h, c = g(c, x, f, h, u[l + 5], 5, -701558691), x, f, u[l + 10], 9, 38016083), c, x, u[l + 15], 14, -660478335), h, c, u[l + 4], 20, -405537848), f = g(f, h = g(h, c = g(c, x, f, h, u[l + 9], 5, 568446438), x, f, u[l + 14], 9, -1019803690), c, x, u[l + 3], 14, -187363961), h, c, u[l + 8], 20, 1163531501), f = g(f, h = g(h, c = g(c, x, f, h, u[l + 13], 5, -1444681467), x, f, u[l + 2], 9, -51403784), c, x, u[l + 7], 14, 1735328473), h, c, u[l + 12], 20, -1926607734), f = v(f, h = v(h, c = v(c, x, f, h, u[l + 5], 4, -378558), x, f, u[l + 8], 11, -2022574463), c, x, u[l + 11], 16, 1839030562), h, c, u[l + 14], 23, -35309556), f = v(f, h = v(h, c = v(c, x, f, h, u[l + 1], 4, -1530992060), x, f, u[l + 4], 11, 1272893353), c, x, u[l + 7], 16, -155497632), h, c, u[l + 10], 23, -1094730640), f = v(f, h = v(h, c = v(c, x, f, h, u[l + 13], 4, 681279174), x, f, u[l + 0], 11, -358537222), c, x, u[l + 3], 16, -722521979), h, c, u[l + 6], 23, 76029189), f = v(f, h = v(h, c = v(c, x, f, h, u[l + 9], 4, -640364487), x, f, u[l + 12], 11, -421815835), c, x, u[l + 15], 16, 530742520), h, c, u[l + 2], 23, -995338651), f = y(f, h = y(h, c = y(c, x, f, h, u[l + 0], 6, -198630844), x, f, u[l + 7], 10, 1126891415), c, x, u[l + 14], 15, -1416354905), h, c, u[l + 5], 21, -57434055), f = y(f, h = y(h, c = y(c, x, f, h, u[l + 12], 6, 1700485571), x, f, u[l + 3], 10, -1894986606), c, x, u[l + 10], 15, -1051523), h, c, u[l + 1], 21, -2054922799), f = y(f, h = y(h, c = y(c, x, f, h, u[l + 8], 6, 1873313359), x, f, u[l + 15], 10, -30611744), c, x, u[l + 6], 15, -1560198380), h, c, u[l + 13], 21, 1309151649), f = y(f, h = y(h, c = y(c, x, f, h, u[l + 4], 6, -145523070), x, f, u[l + 11], 10, -1120210379), c, x, u[l + 2], 15, 718787259), h, c, u[l + 9], 21, -343485551), 
                c = c + m >>> 0, x = x + b >>> 0, f = f + k >>> 0, h = h + _ >>> 0;
            }
            return e[d("0x27")]([ c, x, f, h ]);
        };
        i._ff = function(t, e, n, r, o, i, s) {
            var u = t + (e & n | ~e & r) + (o >>> 0) + s;
            return (u << i | u >>> 32 - i) + e;
        }, i._gg = function(t, e, n, r, o, i, s) {
            var u = t + (e & r | n & ~r) + (o >>> 0) + s;
            return (u << i | u >>> 32 - i) + e;
        }, i[d("0x35")] = function(t, e, n, r, o, i, s) {
            var u = t + (e ^ n ^ r) + (o >>> 0) + s;
            return (u << i | u >>> 32 - i) + e;
        }, i._ii = function(t, e, n, r, o, i, s) {
            var u = t + (n ^ (e | ~r)) + (o >>> 0) + s;
            return (u << i | u >>> 32 - i) + e;
        }, i._blocksize = 16, i[d("0x37")] = 16, t.exports = function(t, n) {
            if (void 0 === t || null === t) throw new Error(d("0x38") + t);
            var r = e.wordsToBytes(i(t, n));
            return n && n[d("0x39")] ? r : n && n[d("0x3a")] ? o[d("0x2d")](r) : e[d("0x3b")](r);
        };
    }();
}), K = d("0x3c"), q = d("0x3d"), B = d("0x3e"), U = [ "mw-pv", "mw-sid", q ];

h(Date[d("0x3f")]) !== d("0x8") && (Date.now = function() {
    return new Date()[d("0x40")]();
});

var J = function() {
    function t() {
        this._params = {}, this._omitted = {};
    }
    return t.prototype[d("0x1e")] = function(t, e) {
        return U[d("0x2b")](t) >= 0 ? (this[d("0x41")][t] = e, this) : ((e || "data" === t) && (this[d("0x42")][t] = e), 
        this);
    }, t[d("0x0")][d("0x43")] = function(t, e, n, r) {
        var o = this[d("0x42")], i = Object.keys(o);
        return i.sort(), N(i[d("0x44")](function(t) {
            return o[t];
        }).concat([ t, e, N(n), r ]).join("&"));
    }, t.prototype[d("0x45")] = function(t) {
        var e = this, n = t.constructor;
        this[d("0x1e")]("mw-appkey", n[d("0x46")])[d("0x1e")](K, String(Date.now())).add("mw-uuid", t.getUUID())[d("0x1e")]("mw-ttid", n.TTID);
        var r = t.getMWPCookieHeader();
        Object.keys(r)[d("0x47")](function(t) {
            t.startsWith(d("0x48")) && e.add(t, r[t]);
        });
        var o = x(t.data);
        return this.add("mw-sign", this.sign(t[d("0x49")], t.version, o, t.getToken())).add("data", o), 
        Object.assign({}, this._omitted, this._params);
    }, t[d("0x45")] = function(e) {
        return new t().getSignedParams(e);
    }, t;
}();

(J || (J = {})).Key = {
    KEY_DEVICE_ID: q,
    KEY_UID: "mw-uid",
    KEY_CMD_V: B
};

var L = J, Y = function() {
    function t(t) {
        var e = this;
        this.callback = t, this.promise = new Promise(function(t, n) {
            e[d("0x4a")] = t, e.reject = n;
        });
    }
    return t[d("0x0")][d("0x4b")] = function() {
        return this.callback()[d("0x21")](this[d("0x4a")], this.reject);
    }, t[d("0x0")].then = function(t, e) {
        return this.promise = this[d("0x1f")][d("0x21")](t, e);
    }, t[d("0x0")].catch = function(t) {
        return this.promise = this.promise.catch(t);
    }, t;
}(), F = function() {
    function t() {
        this[d("0x4c")] = [];
    }
    return t.createQueue = function() {
        var t = new this();
        return this[d("0x4d")][d("0x28")](t), t;
    }, t.getQueue = function() {
        return this.instances[0];
    }, t[d("0x0")].add = function(t) {
        try {
            var e = new Y(t);
            return this.tasks.push(e), e;
        } catch (t) {
            return null;
        }
    }, t[d("0x0")].exec = function() {
        var e = this;
        if (t.instances = t[d("0x4d")][d("0x23")](function(t) {
            return e !== t;
        }), null === this[d("0x4c")] || 0 === this.tasks.length) return Promise.resolve();
        var n = function() {
            return e.tasks = null;
        };
        return Promise[d("0x4e")](this.tasks[d("0x44")](function(t) {
            return t[d("0x4b")]();
        }))[d("0x21")](n, n);
    }, t.instances = [], t;
}(), V = function() {
    function t(t, e, n) {
        void 0 === n && (n = {}), this.retries = 1, this.api = t, this.version = e;
        var r = this[d("0x9")][d("0x4f")];
        this.options = Object.assign({}, r, n), this[d("0x50")][d("0x51")] = Object.assign({}, r[d("0x51")], n.headers);
    }
    return t.getContext = function(t, e, n) {
        return new this(t, e, n);
    }, t.request = function(t, e, n, r) {
        return this.getContext(t, e, r).request(n);
    }, t.setHeader = function(t, e) {
        var n = this.defaultOptions;
        n.headers || (n[d("0x51")] = {}), n.headers[t] = e;
    }, t[d("0x52")] = function() {
        return new I(this);
    }, t[d("0x53")] = function() {
        return new I.Parameter();
    }, t[d("0x54")] = function(t) {
        t && (this.defaultOptions.env = t);
    }, t[d("0x55")] = function() {
        return this[d("0x4f")][d("0x56")];
    }, t[d("0x57")] = function(t, e) {
        return this.MWPCookieJar[d("0x58")](this.getContext(t, e));
    }, t[d("0x0")].shouldRetry = function() {
        return this.retries < 5;
    }, t.prototype.getToken = function() {
        throw new Error("Method not implemented.");
    }, t.prototype.getUUID = function() {
        return "";
    }, t.prototype.getParams = function() {
        return L.getSignedParams(this);
    }, t.prototype.getHostname = function() {
        var t = this.constructor.Hostname;
        switch (this[d("0x50")][d("0x56")]) {
          case P.Develop:
            return t[d("0x59")];

          case P.PreRelease:
            return t.PreRelease;

          default:
            return t.Release;
        }
    }, t[d("0x0")][d("0x5a")] = function() {
        return (this[d("0x50")][d("0x5b")] ? "https:" : d("0x5c")) + "//" + this[d("0x5d")]();
    }, t[d("0x0")].getURL = function() {
        return this.getOrigin() + "/" + j + "/" + this[d("0x49")] + "/" + this.version + "/";
    }, t[d("0x0")].getHeaders = function() {
        return Object.assign({}, this.options.headers);
    }, t[d("0x0")].getMWPCookies = function() {
        return this.constructor[d("0x5e")].getCookies(this);
    }, t.prototype.getMWPCookieHeader = function() {
        var t = {}, e = this.getMWPCookies();
        return Object[d("0x5f")](e).length > 0 && (t["mw-cookie-" + this.api.replace(/\./g, "") + this.version] = Object[d("0x5f")](e).map(function(t) {
            return t + "=" + e[t];
        })[d("0x60")]("; ") + ";"), t;
    }, t.prototype.request = function(t) {
        return this[d("0x1b")] = t, this.getToken() ? this._fetch() : this.enqueue();
    }, t.prototype.fetch = function(t, e) {
        e(new Error(d("0x61")));
    }, t[d("0x0")].handleResponse = function(t) {
        switch (t.ret) {
          case C.TokenNeedRenew:
            return this[d("0x62")]();

          case C[d("0x63")]:
            return this.options.useHTTPS = !![], this._fetch();

          default:
            return this[d("0x9")].Promise.resolve(t);
        }
    }, t.prototype[d("0x62")] = function() {
        var t = this;
        return new (this[d("0x9")][d("0x24")])(function(e, n) {
            if (!t.shouldRetry()) return console.warn("Have retried too much times"), n(new Error(E));
            t[d("0x64")]++, t.fetch(e, n);
        }).then(function(e) {
            return t[d("0x65")](e);
        });
    }, t.prototype.enqueue = function() {
        var t = F[d("0x66")]();
        if (t) {
            var e = t[d("0x1e")](this._fetch.bind(this));
            return null === e ? this[d("0x62")]() : e;
        }
        t = F.createQueue();
        var n = this[d("0x62")](), r = t.exec.bind(t);
        return n[d("0x21")](r, r), n;
    }, t.Promise = Promise, t.Env = P, t.Hostname = T.mgj, t.Code = C, t.defaultOptions = {
        useHTTPS: ![],
        env: P.Release
    }, t.v = d("0x67"), t.filterResult = i, t;
}(), G = d("0x68");

String[d("0x0")][d("0x69")] || (String.prototype.startsWith = function(t, e) {
    return this.substr(e || 0, t.length) === t;
});

var Q = function() {
    function t(t) {
        this[d("0x11")] = t, this[d("0x6a")] = this[d("0x6b")]();
    }
    return t[d("0x6c")] = function(t) {
        var e = t.getHostname(), n = this[d("0x4d")][e];
        return n || (n = this.instances[e] = new this(e)), n;
    }, t.getCookies = function(t) {
        return this[d("0x6c")](t)[d("0x58")]("/" + t.api + "/" + t.version);
    }, t[d("0x0")].getStorageKey = function() {
        return G + "." + this[d("0x11")];
    }, t[d("0x0")].refresh = function(t) {
        void 0 === t && (t = Date.now()), this.cookies = this[d("0x6a")][d("0x23")](function(e) {
            return e[d("0x6d")] > t;
        }), this[d("0x6e")]();
    }, t[d("0x0")][d("0x58")] = function(t) {
        return this[d("0x6f")](t).reduce(function(t, e) {
            return t[e[d("0x70")]] = e.value, t;
        }, {});
    }, t.prototype[d("0x71")] = function(t) {
        var e = this, n = parseInt(t["mw-st"], 10);
        !isNaN(n) && n || (n = Date.now());
        for (var r in t) if (t.hasOwnProperty(r) && r.startsWith("mw-set-cookie-")) {
            var o = t[r];
            Array.isArray(o) ? o[d("0x47")](function(t) {
                return e.parseMWPCookie(t, n);
            }) : this.parseMWPCookie(o, n);
        }
    }, t.prototype.parseMWPCookie = function(t, e) {
        var n = this;
        t.split(";,")[d("0x47")](function(t) {
            for (var r = t.split(";").filter(Boolean), o = r[0].split("="), i = {
                name: o[0],
                value: o[1]
            }, s = 1, u = r.length; s < u; s++) if (r[s]) {
                var a = r[s].split("="), c = a[0], x = a[1];
                "max-age" === c ? i.expires = e + 1e3 * parseInt(x, 10) : "path" === c ? i[d("0x72")] = x : c === d("0x73") && (i[d("0x73")] = x ? x[d("0x74")](/\s*,\s*/) : []);
            }
            n[d("0x75")](i, e);
        });
    }, t[d("0x0")]._readStorage = function() {
        try {
            var t = JSON[d("0x76")](localStorage.getItem(this[d("0x77")]()));
            return t || [];
        } catch (t) {
            return console.error("Fail to read mwp cookie, hostname: %s", this.hostname), [];
        }
    }, t.prototype._writeStorage = function() {
        try {
            localStorage[d("0x78")](this.getStorageKey(), JSON.stringify(this[d("0x6a")]));
        } catch (t) {
            console.error("Fail to write mwp cookie, hostname: %s", this[d("0x11")]);
        }
    }, t[d("0x0")][d("0x75")] = function(t, e) {
        this[d("0x6a")] = this.cookies.filter(function(e) {
            return t[d("0x70")] !== e[d("0x70")] || t.path !== e[d("0x72")];
        }), this.cookies.push(t), this.refresh(e);
    }, t[d("0x0")]._get = function(t) {
        return this[d("0x79")](), "/" !== t[0] && (t = "/" + t), this[d("0x6a")].filter(function(e) {
            return t.startsWith(e.path) || e.shared && e[d("0x73")][d("0x7a")](function(e) {
                return t.startsWith(e);
            });
        });
    }, t.instances = {}, t;
}(), $ = function(t) {
    function o() {
        return e(this, o), n(this, (o[d("0xd")] || Object[d("0x7b")](o))[d("0x7c")](this, arguments));
    }
    return r(o, Q), y(o, [ {
        key: "_readStorage",
        value: function() {
            try {
                var t = wx.getStorageSync(this.getStorageKey());
                return t || [];
            } catch (t) {
                return w[d("0x7d")][d("0x7e")](d("0x7f"), this[d("0x11")]), [];
            }
        }
    }, {
        key: "_writeStorage",
        value: function() {
            var t = this;
            wx[d("0x80")]({
                key: this.getStorageKey(),
                data: this.cookies,
                fail: function() {
                    w[d("0x7d")].error(d("0x81"), t[d("0x11")]);
                }
            });
        }
    } ]), o;
}(), z = "mwp.cookie", Z = function(t) {
    function o(t) {
        return e(this, o), n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, z + "." + t));
    }
    return r(o, O[d("0x84")]), y(o, [ {
        key: d("0x82"),
        value: function() {
            var t = this;
            return Object.keys(this._storage)[d("0x44")](function(e) {
                return e + "=" + encodeURIComponent(t._storage[e]);
            }).join("; ");
        }
    }, {
        key: "toObject",
        value: function() {
            return this._storage;
        }
    } ], [ {
        key: "getCookieJar",
        value: function(t) {
            var e = this[d("0x4d")][t];
            return e || (this.instances[t] = new this(t));
        }
    }, {
        key: d("0x76"),
        value: function(t) {
            return t.split(/\s*;\s*/).filter(Boolean)[d("0x83")](function(t, e) {
                var n = e.split("="), r = v(n, 2), o = r[0], i = r[1];
                return t[o] = i, t;
            }, {});
        }
    } ]), o;
}();

Z.instances = {};

var X = L[d("0x85")], tt = X[d("0x86")], et = X.KEY_UID, nt = X.KEY_CMD_V, rt = R.CODE, ot = R.TOKEN_KEY, it = R.ERR_MESSAGE, st = function(t) {
    function o(t, r) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        e(this, o), i.useHTTPS = !![];
        var s = n(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t, r, i));
        return s[d("0x87")] = null, s;
    }
    return r(o, V), y(o, [ {
        key: d("0x88"),
        value: function() {
            return Object[d("0x89")](g(o[d("0x0")].__proto__ || Object[d("0x7b")](o.prototype), d("0x88"), this)[d("0x8a")](this), {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: this._getWxaCookieJar().toString()
            });
        }
    }, {
        key: "getCookies",
        value: function() {
            return this.getMWPCookies();
        }
    }, {
        key: "fetch",
        value: function(t, e) {
            var n = this;
            this[d("0x87")] = S.requestManager[d("0x8b")]({
                url: this[d("0x8c")](),
                data: this.getParams(),
                header: this[d("0x88")](),
                method: this.options.method,
                success: function(r) {
                    var i = void 0;
                    if (i = h(r.statusCode) === d("0x8d") ? parseInt(r[d("0x8e")], 10) : r.statusCode, 
                    isNaN(i) || 200 !== i) e(new Error(it)); else {
                        var s = r.data, u = r.header || s.header;
                        $[d("0x6c")](n).setFromHeader(u), h(u[nt]) !== d("0x8f") && o.emit(nt, u[nt]), t(s);
                    }
                },
                fail: function() {
                    e(new Error("网络请求失败，请稍候再试"));
                }
            });
        }
    }, {
        key: d("0x90"),
        value: function() {
            return this[d("0x91")]()[d("0x92")](ot);
        }
    }, {
        key: "getUUID",
        value: function() {
            return k.default.getSync("deviceId");
        }
    }, {
        key: "getParams",
        value: function() {
            var t = new L();
            t.add(et, this[d("0x91")]().get("__ud_") || "").add(tt, k.default.getSync(d("0x93")));
            var e = this.options[d("0x51")];
            return e && Object.keys(e)[d("0x47")](function(n) {
                n.startsWith("mw-") && t[d("0x1e")](n, e[n]);
            }), t.getSignedParams(this);
        }
    }, {
        key: "getOrigin",
        value: function() {
            return "https://" + this.getHostname();
        }
    }, {
        key: d("0x8c"),
        value: function() {
            return this[d("0x5a")]() + "/wx/" + this[d("0x49")] + "/" + this.version + "/";
        }
    }, {
        key: d("0x65"),
        value: function(t) {
            switch (t[d("0x19")]) {
              case rt.TokenNeedRenew:
                var e = this[d("0x91")]();
                e[d("0x94")]("_mwp_h5_token", t.token), e.put("_mwp_h5_token_enc", t.encToken);
                break;

              case rt.SessionInvalid:
                return this[d("0x95")](t);

              default:
                t[d("0x19")] !== rt[d("0x1a")] && this.constructor[d("0x96")]("error", t[d("0x19")], t);
            }
            return g(o[d("0x0")][d("0xd")] || Object[d("0x7b")](o[d("0x0")]), "handleResponse", this).call(this, t);
        }
    }, {
        key: "handleSessionInvalid",
        value: function(t) {
            var e = this, n = this.constructor, r = n[d("0x97")] && n[d("0x97")]();
            if (r) {
                "string" == typeof r && (r = b.default.resolve(r));
                var i = F.getQueue();
                return i && i.exec(), r.then(function(t) {
                    return n[d("0x98")](t), e._fetch();
                });
            }
            return g(o.prototype[d("0xd")] || Object.getPrototypeOf(o.prototype), "handleResponse", this)[d("0x8a")](this, t);
        }
    }, {
        key: "_getWxaCookieJar",
        value: function() {
            return Z.getCookieJar(this.constructor.AppKey);
        }
    } ], [ {
        key: "setSession",
        value: function(t) {
            this[d("0x99")]()[d("0x94")](d("0x9a"), t);
        }
    }, {
        key: d("0x9b"),
        value: function(t) {
            if ("function" != typeof t) throw new Error("login handler should be a function");
            this.loginHandler = t;
        }
    }, {
        key: d("0x9c"),
        value: function(t, e) {
            this.getWxaCookieJar().put(t, e);
        }
    }, {
        key: d("0x9d"),
        value: function(t) {
            return this[d("0x99")]()[d("0x92")](t);
        }
    }, {
        key: "getMWPCookies",
        value: function(t, e) {
            return this.MWPCookieJar.getCookies(this[d("0x9e")](t, e));
        }
    }, {
        key: "getDeviceID",
        value: function() {
            return k[d("0x7d")].getSync(d("0x93"));
        }
    }, {
        key: "getWxaCookieJar",
        value: function() {
            return Z.getCookieJar(this.AppKey);
        }
    }, {
        key: "on",
        value: function(t, e) {
            return this._events[d("0x9f")](t, e), this;
        }
    }, {
        key: d("0xa0"),
        value: function(t, e) {
            return this[d("0xa1")].$once(t, e), this;
        }
    }, {
        key: "off",
        value: function(t, e) {
            return this[d("0xa1")][d("0xa2")](t, e), this;
        }
    }, {
        key: "emit",
        value: function(t) {
            for (var e, n = arguments[d("0x4")], r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
            return (e = this._events).$emit[d("0x7c")](e, [ t ].concat(r)), this;
        }
    } ]), o;
}();

st.Promise = b[d("0x7d")], st.MWPCookieJar = $, st[d("0x46")] = "100028", st.TTID = d("0xa3"), 
st.defaultOptions = Object.assign({
    method: d("0xa4")
}, V.defaultOptions), st._events = new (_[d("0x7d")])(), o([ f("Use `context.getMWPCookies()` instead.") ], st.prototype, "getCookies", null), 
o([ f(d("0xa5")) ], st, d("0xa6"), null), exports[d("0x7d")] = st;