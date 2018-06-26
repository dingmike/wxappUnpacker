function e(e) {
    return e && "function" == typeof e.then;
}

function t(e, t) {
    return function(r) {
        return r ? e() : new Promise(t);
    };
}

function r(e) {
    setTimeout(function() {
        throw new Error(e);
    }, 0);
}

function n(e) {
    return r("[System] Fail to get deviceId: " + e), S();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o, i = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, s = i.crypto || i.msCrypto;

if (s && s.getRandomValues) {
    var c = new Uint8Array(16);
    o = function() {
        return s.getRandomValues(c), c;
    };
}

if (!o) {
    var u = new Array(16);
    o = function() {
        for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), 
        u[t] = e >>> ((3 & t) << 3) & 255;
        return u;
    };
}

for (var a = o, f = [], d = 0; d < 256; ++d) f[d] = (d + 256).toString(16).substr(1);

var g = function(e, t) {
    var r = t || 0, n = f;
    return n[e[r++]] + n[e[r++]] + n[e[r++]] + n[e[r++]] + "-" + n[e[r++]] + n[e[r++]] + "-" + n[e[r++]] + n[e[r++]] + "-" + n[e[r++]] + n[e[r++]] + "-" + n[e[r++]] + n[e[r++]] + n[e[r++]] + n[e[r++]] + n[e[r++]] + n[e[r++]];
}, w = a(), y = [ 1 | w[0], w[1], w[2], w[3], w[4], w[5] ], v = 16383 & (w[6] << 8 | w[7]), h = 0, l = 0, m = function(e, t, r) {
    var n = t && r || 0;
    "string" == typeof e && (t = "binary" == e ? new Array(16) : null, e = null);
    var o = (e = e || {}).random || (e.rng || a)();
    if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, t) for (var i = 0; i < 16; ++i) t[n + i] = o[i];
    return t || g(o);
}, p = m;

p.v1 = function(e, t, r) {
    var n = t && r || 0, o = t || [], i = void 0 !== (e = e || {}).clockseq ? e.clockseq : v, s = void 0 !== e.msecs ? e.msecs : new Date().getTime(), c = void 0 !== e.nsecs ? e.nsecs : l + 1, u = s - h + (c - l) / 1e4;
    if (u < 0 && void 0 === e.clockseq && (i = i + 1 & 16383), (u < 0 || s > h) && void 0 === e.nsecs && (c = 0), 
    c >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    h = s, l = c, v = i;
    var a = (1e4 * (268435455 & (s += 122192928e5)) + c) % 4294967296;
    o[n++] = a >>> 24 & 255, o[n++] = a >>> 16 & 255, o[n++] = a >>> 8 & 255, o[n++] = 255 & a;
    var f = s / 4294967296 * 1e4 & 268435455;
    o[n++] = f >>> 8 & 255, o[n++] = 255 & f, o[n++] = f >>> 24 & 15 | 16, o[n++] = f >>> 16 & 255, 
    o[n++] = i >>> 8 | 128, o[n++] = 255 & i;
    for (var d = e.node || y, w = 0; w < 6; ++w) o[n + w] = d[w];
    return t || g(o);
}, p.v4 = m;

var S = p, _ = function() {
    wx.canIUse && wx.canIUse("onNetworkStatusChange") && wx.onNetworkStatusChange(function() {
        x.refresh("networkType");
    }), _ = function() {};
}, x = new (function() {
    function t(e) {
        this._getters = {}, this._getters = e, this.purge();
    }
    return t.prototype.purge = function() {
        this._cache = Object.create(null);
    }, t.prototype.register = function(e, t) {
        this._getters[e] = t;
    }, t.prototype.getSync = function(e) {
        var t = this._cache[e];
        return void 0 === t && this._getters[e] && (t = this._getters[e](!0)), t;
    }, t.prototype.refresh = function(e) {
        delete this._cache[e];
    }, t.prototype.get = function(t) {
        var r = this, n = this._cache[t];
        if (void 0 === n) {
            if (!this._getters[t]) return Promise.reject(new Error(t + " not exists"));
            try {
                var o = this._getters[t](!1);
                return e(o) ? o.then(function(e) {
                    return r._cache[t] = e;
                }) : (this._cache[t] = o, Promise.resolve(o));
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.resolve(n);
    }, t;
}())({
    systemInfo: t(function() {
        return wx.getSystemInfoSync();
    }, function(e, t) {
        wx.getSystemInfo({
            success: function(t) {
                e(t);
            },
            fail: function(e) {
                t(new Error(e.errMsg));
            }
        });
    }),
    deviceId: t(function() {
        try {
            var e = wx.getStorageSync("mgj.did");
            if (!e) {
                e = S();
                try {
                    wx.setStorageSync("mgj.did", e);
                } catch (t) {
                    wx.setStorage({
                        key: "mgj.did",
                        data: e,
                        fail: function(e) {
                            r("[System] Fail to save deviceId: " + e.errMsg);
                        }
                    });
                }
            }
            return e;
        } catch (e) {
            return n(e.message);
        }
    }, function(e, t) {
        wx.getStorage({
            key: "mgj.did",
            success: function(r) {
                if (r.data) return e(r.data);
                var n = S();
                wx.setStorage({
                    key: "mgj.did",
                    data: n,
                    success: function() {
                        e(n);
                    },
                    fail: function(e) {
                        t(new Error(e.errMsg));
                    }
                });
            },
            fail: function(t) {
                e(n(t.errMsg));
            }
        });
    }),
    networkType: t(function() {
        throw new Error("no sync method to get network type");
    }, function(e, t) {
        _(), wx.getNetworkType({
            success: function(t) {
                e(t.networkType);
            },
            fail: function(e) {
                t(new Error(e.errMsg));
            }
        });
    })
});

exports.default = x;