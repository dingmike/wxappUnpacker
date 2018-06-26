function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    var n = e.indexOf(t);
    "-1" != n && e.splice(n, 1);
}

function a(e) {
    var t = new Date().valueOf();
    return !(!e || !e.buketResult || "" === e.buketResult) && (!(!e.expCode || "" === e.expCode) && (!!e.isDefault || !(e.startDate > 0 && t < e.startDate) && !(e.endDate > 0 && t < e.endDate)));
}

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), i = e(require("./houston.js")), o = e(require("../m")), c = e(require("../config")), u = o.default.MWP, s = "libraexpstorecode", l = c.default.ABTest && c.default.ABTest.groupName || "", h = function() {
    function e(n) {
        t(this, e);
        var a = wx.getStorageSync(n) || {}, r = a[s] || [];
        this.key = n, this._cache = a, this._expCache = r;
    }
    return r(e, [ {
        key: "getValue",
        value: function(e) {
            var t = null;
            try {
                t = this._cache[e];
            } catch (e) {}
            return t;
        }
    }, {
        key: "removeAll",
        value: function() {
            this._cache = {}, this._expCache = [], this.syncexp();
        }
    }, {
        key: "saveAlter",
        value: function(e) {
            e && e.expCode && (this._cache[e.expCode] = e, this._expCache.includes(e.expCode) || (this._expCache.push(e.expCode), 
            this.syncexp()));
        }
    }, {
        key: "deleteAlter",
        value: function(e) {
            e && (this._cache.hasOwnProperty(e) && delete this._cache[e], this._expCache.includes(e) && (n(this._expCache, e), 
            this.syncexp()));
        }
    }, {
        key: "syncexp",
        value: function() {
            this._cache[s] = this._expCache;
        }
    }, {
        key: "synchronize",
        value: function(e) {
            wx.setStorage(this.key, this._cache, e);
        }
    }, {
        key: "synchronizeSync",
        value: function() {
            wx.setStorageSync(this.key, this._cache);
        }
    }, {
        key: "allExpCodes",
        value: function() {
            return Array.from(this._expCache);
        }
    } ]), e;
}(), f = function() {
    function e() {
        return {
            mockCache: a,
            defaultCache: n
        };
    }
    var t = void 0, n = new h("AbTest"), a = new h("MockAbTest");
    return {
        getInstance: function() {
            return t || (t = e()), t;
        }
    };
}(), p = function() {
    function e() {
        t(this, e);
    }
    return r(e, [ {
        key: "updateInfoArrive",
        value: function(e, t) {
            this.groupName = t, this.validateInfo(e);
        }
    }, {
        key: "validateInfo",
        value: function(e) {
            this.hasGetAll || (this.hasGetAll = !0, e.type = "all", e.experiments = [], e.updateTime = new Date().valueOf()), 
            ("all" != e.type || e.hasOwnProperty("apiName") || e.hasOwnProperty("apiVersion")) && this.paramBuildInfo(e);
        }
    }, {
        key: "paramBuildInfo",
        value: function(e) {
            var t = this;
            if (t.needRequest = !1, t.deleteExpCodeList = [], t.requestParam = {}, t.groupName && (t.requestParam.groupName = t.groupName), 
            e) switch (e.type) {
              case "all":
                t.needRequest = !0;
                break;

              case "list":
                if (Array.isArray(e.experiments) && e.experiments.length > 0) {
                    if (t.updateExpCodeList = [], e.experiments.forEach(function(e) {
                        switch (e.op) {
                          case "del":
                            t.deleteExpCodeList.push(e.expCode);
                            break;

                          case "alter":
                            t.updateExpCodeList.push(e.expCode);
                        }
                    }), t.updateExpCodeList.length > 0 && e.apiName && e.apiVersion) {
                        t.needRequest = !0;
                        var n = t.updateExpCodeList.join(",");
                        n && (t.requestParam.expCodes = n);
                    }
                    if (!t.needRequest) return;
                }
            }
            this.updateInfo(e);
        }
    }, {
        key: "updateInfo",
        value: function(e) {
            var t = this;
            t.needRequest ? u.request(e.apiName, e.apiVersion, t.requestParam, {
                useHTTPS: !0
            }).then(function(n) {
                n.error || "SUCCESS" !== n.ret || (t.response = n, t.storeInfo(e));
            }).catch(function() {}) : t.storeInfo(e);
        }
    }, {
        key: "storeInfo",
        value: function(e) {
            var t = f.getInstance().defaultCache;
            "all" == e.type ? t.removeAll() : "list" == e.type && this.deleteExpCodeList.forEach(function(e) {
                t.deleteAlter(e);
            }), this.response.data.forEach(function(e) {
                a(e) && t.saveAlter(e);
            }), t.synchronizeSync();
        }
    } ]), e;
}(), d = function() {
    function e() {
        return {
            syncNewExps: function() {
                Array.from(n.defaultCache.allExpCodes()).forEach(function(e) {
                    var t = n.defaultCache.getValue(e);
                    n.mockCache.getValue(e) || n.mockCache.saveAlter(t);
                }), n.mockCache.synchronizeSync();
            },
            initMockCache: function() {
                n.mockCache.removeAll(), n.mockCache.synchronizeSync();
            },
            coverFromRealCache: function() {
                this.initMockCache(), this.syncNewExps();
            },
            getEnableMock: function() {
                return void 0 == this.enableMock && (this.enableMock = wx.getStorageSync("enableMock") || !1), 
                this.enableMock;
            },
            setEnableMock: function(e) {
                this.enableMock = e, wx.setStorageSync("enableMock", e);
            }
        };
    }
    var t = void 0, n = f.getInstance();
    return {
        getInstance: function() {
            return t || (t = e()), t;
        }
    };
}(), y = function() {
    function e(e) {
        i.default.getConfig({
            groupName: "abtest_config",
            key: "abtest_action",
            defaultValue: 0,
            listener: c.updateInfoArrive.bind(c)
        }).then(function(t) {
            c.updateInfoArrive(t, e);
        }).catch(function() {});
    }
    function t() {
        return e(l), {
            startWithGroup: e,
            alterWithExpCode: function(e) {
                var t = void 0;
                return t = o.getEnableMock() ? r.mockCache.getValue(e) : r.defaultCache.getValue(e), 
                a(t) ? t : null;
            },
            alterWithExpCodes: function(e) {
                if (Array.isArray(e) && 0 == e.length) {
                    var t = [];
                    return e.forEach(function(e) {
                        var n = this.alterWithExpCode(e);
                        n && t.push(n);
                    }), Array.from(t);
                }
            }
        };
    }
    var n = void 0, r = f.getInstance(), o = d.getInstance(), c = new p();
    return {
        getInstance: function() {
            return n || (n = t()), n;
        }
    };
}();

module.exports = {
    libra: y.getInstance(),
    storeManager: f.getInstance(),
    debugCenter: d.getInstance()
};