function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function i(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function r(e, t) {
    if (void 0 === t && (t = !0), !e) return "";
    var n = t ? encodeURIComponent : h;
    return Object.keys(e).map(function(t) {
        var i = e[t];
        return t = n(t), Array.isArray(i) ? i.map(function(e, i) {
            return t + "[" + i + "]=" + n(e);
        }).join("&") : t + "=" + n(i);
    }).join("&");
}

function o(e, t, n, i, u) {
    var a = [ d, t.api || g, "?", r({
        appKey: t.appKey || m,
        sign: s.default.sign,
        mwpAppKey: f.default.AppKey,
        _did: v
    }) ].join("");
    wx.uploadFile({
        url: a,
        filePath: e,
        name: "image",
        success: function(r) {
            try {
                var u = JSON.parse(r.data);
                switch (u.status.code) {
                  case 1001:
                    n(Object.assign({
                        localPath: e
                    }, u.result));
                    break;

                  case 1022:
                    s.default.refreshSign().then(function() {
                        o(e, t, n, i);
                    }).catch(function(e) {
                        i(e);
                    });
                    break;

                  default:
                    i(new Error(u.status.msg));
                }
            } catch (e) {
                i(e);
            }
        },
        fail: function(e) {
            i(new Error(e.errMsg));
        },
        complete: u
    });
}

function u(e) {
    return /\.(jpe?g|png)$/.test(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), c = e(require("../../lib/promise")), l = e(require("../../lib/system")), s = e(require("./user")), f = e(require("../../lib/mwp")), p = e(require("../base/Events")), h = function(e) {
    return e;
}, d = "https://media.mogujie.com/", g = "image/put", m = "14a", v = l.default.getSync("deviceId"), y = function(e) {
    function r(e, i) {
        t(this, r);
        var o = n(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        o.size = e.length, o.waiting = e, o.uploading = [], o.options = i;
        for (var u = 0, a = o.waiting.length; u < a; u++) o._exec();
        return o;
    }
    return i(r, p.default), a(r, [ {
        key: "_remove",
        value: function(e) {
            this.uploading = this.uploading.filter(function(t) {
                return t !== e;
            });
        }
    }, {
        key: "_exec",
        value: function() {
            var e = this;
            if (this.uploading.length < 5) if (this.waiting.length > 0) {
                var t = this.waiting.shift();
                this.uploading.push(t), o(t, this.options, function(t) {
                    e.$emit("upload", t);
                }, function(n) {
                    e.$emit("fail", n, t);
                }, function() {
                    e._remove(t), e._exec();
                });
            } else 0 === this.uploading.length && this.$emit("finish");
        }
    } ]), r;
}(), b = {
    uploadImage: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return u(e) ? new c.default(function(n, i) {
            o(e, t, n, i);
        }) : c.default.reject(new Error("请选择 JPG 或 PNG 类型的图片"));
    },
    uploadImages: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return 0 === (e = e.filter(u)).length ? null : new y(e, t);
    },
    chooseAndUploadImage: function(e) {
        return new c.default(function(t, n) {
            wx.chooseImage({
                count: 1,
                success: function(i) {
                    var r = i.tempFilePaths;
                    b.uploadImage(r[0], e).then(t, n);
                },
                fail: function() {
                    t(null);
                }
            });
        });
    },
    chooseAndUploadImages: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 9, t = arguments[1];
        return new c.default(function(n) {
            wx.chooseImage({
                count: e,
                success: function(e) {
                    var i = e.tempFilePaths;
                    n(b.uploadImages(i, t));
                },
                fail: function() {
                    n(null);
                }
            });
        });
    }
};

exports.default = b;