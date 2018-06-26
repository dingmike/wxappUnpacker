function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
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

function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function u(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function i(e, t) {
    if (void 0 === t && (t = !0), !e) return "";
    var r = t ? encodeURIComponent : y;
    return Object.keys(e).map(function(t) {
        var n = e[t];
        return t = r(t), Array.isArray(n) ? n.map(function(e, n) {
            return t + "[" + n + "]=" + r(e);
        }).join("&") : t + "=" + r(n);
    }).join("&");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

for (var a, o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), s = require("./utils"), c = e(require("./mwp")), l = require("./request-manager"), f = e(require("./promise")), p = (a = {}, 
u(a, "get", "3"), u(a, "multiget", "3"), u(a, "makeup", "3"), a), h = function() {
    function e(t, r, u) {
        if (n(this, e), this.type = t, this.data = r ? (0, s.clone)(r) : {}, this.options = u, 
        this.__version = p[t], u.appPlat && void 0 === this.data.appPlat && (this.data.appPlat = u.appPlat), 
        this.data.pids) try {
            this.data.pids = this.data.pids.split(/\s*,\s*/).sort().join(",");
        } catch (e) {}
    }
    return o(e, [ {
        key: "request",
        value: function(e) {
            var t = this, r = this.getStrategy(e);
            return function e(n) {
                if (0 === r.length) return Promise.reject(n || new Error("All strategies failed."));
                switch (r.shift()) {
                  case 2:
                    return t.requestRealTime().catch(e);

                  case 0:
                    return t.requestCDN().catch(e);

                  case 1:
                    return t.requestBackup().catch(e);

                  default:
                    return e(n);
                }
            }();
        }
    }, {
        key: "getStrategy",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return "makeup" === this.type ? [ 2, 1 ] : (void 0 !== this.data.cKey && (e = !0), 
            e ? [ 2, 0, 1 ] : [ 0, 1, 2 ]);
        }
    } ]), e;
}(), d = function() {
    function e(t) {
        n(this, e), this.v = '/* __VERSION__ */("1.1.4")', this.defaultOptions = {
            baseUrl: "mce.mogucdn.com",
            httpBaseUrl: "mce.mogujie.com",
            backupBaseUrl: "mcebackup.mogucdn.com"
        }, this.Mce = t;
    }
    return o(e, [ {
        key: "config",
        value: function(e) {
            (0, s.merge)(this.defaultOptions, e);
        }
    }, {
        key: "get",
        value: function(e, t) {
            return this.request("get", e, t);
        }
    }, {
        key: "multiget",
        value: function(e, t) {
            return this.request("multiget", e, t);
        }
    }, {
        key: "makeup",
        value: function(e) {
            return this.request("makeup", e);
        }
    }, {
        key: "recommend",
        value: function(e) {
            return console.warn("MCE.recommend(data) is deprecated. Use MCE.get(data, true) instead."), 
            this.get(e, !0);
        }
    }, {
        key: "multirecommend",
        value: function(e) {
            return console.warn("MCE.multirecommend(data) is deprecated. Use MCE.multiget(data, true) instead."), 
            this.multiget(e, !0);
        }
    }, {
        key: "request",
        value: function(e, t, r) {
            return new this.Mce(e, t, this.defaultOptions).request(r);
        }
    } ], [ {
        key: "filterMceResult",
        value: function(e) {
            if (e.success && "SUCCESS" === e.returnCode) return e.data;
            throw new Error(e.returnMessage);
        }
    } ]), e;
}(), m = function(e) {
    function u(e) {
        n(this, u);
        var r = t(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, e));
        return r.config({
            appPlat: "sapp"
        }), r;
    }
    return r(u, d), u;
}(), y = function(e) {
    return e;
}, g = function(e) {
    function u() {
        return n(this, u), t(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
    }
    return r(u, h), o(u, [ {
        key: "requestRealTime",
        value: function() {
            var e = this.options, t = e.headers, r = void 0 === t ? {} : t, n = e.group;
            n && (r["mw-group"] = n);
            var u = c.default.getContext("mwp.darwin." + this.type, this.__version, {
                headers: r
            }), i = u.request(this.data).then(c.default.filterResult);
            return this.task = u.task, i;
        }
    }, {
        key: "requestCDN",
        value: function() {
            var e = this;
            return new f.default(function(t, r) {
                e.task = l.requestManager.sendRequest({
                    url: "https://" + e.options.baseUrl + "/ajax/" + e.type + "/" + e.__version,
                    data: e.data,
                    success: function(e) {
                        try {
                            t(m.filterMceResult(e.data));
                        } catch (e) {
                            r(e);
                        }
                    },
                    fail: function(e) {
                        r(new Error(e.errMsg));
                    }
                });
            });
        }
    }, {
        key: "requestBackup",
        value: function() {
            var e = this;
            return new f.default(function(t, r) {
                e.task = l.requestManager.sendRequest({
                    url: "https://" + e.options.backupBaseUrl + "/ajax/" + e.type + "/" + e.__version + "%3F" + i(e.data),
                    success: function(e) {
                        try {
                            t(m.filterMceResult(e.data));
                        } catch (e) {
                            r(e);
                        }
                    },
                    fail: function(e) {
                        r(new Error(e.errMsg));
                    }
                });
            });
        }
    } ]), u;
}(), v = new m(g), _ = function(e) {
    function u(e, r) {
        return n(this, u), t(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, e, r, v.defaultOptions));
    }
    return r(u, g), o(u, null, [ {
        key: "create",
        value: function(e, t) {
            return new this(e, t);
        }
    } ]), u;
}(), b = [ "config", "get", "multiget", "makeup", "recommend", "multirecommend" ], k = 0; k < b.length; k++) {
    var w = b[k];
    Object.defineProperty(_, w, {
        value: v[w].bind(v)
    });
}

exports.default = _;