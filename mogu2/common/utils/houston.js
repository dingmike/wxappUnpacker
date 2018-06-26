function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = require("../m"), u = e(o), i = e(require("./debug")), s = u.default.MWP, a = u.default.Promise, c = "HoustonStoreKey", l = "0", f = function(e, t) {
    if (!Array.isArray(t)) return null != e && Object.prototype.hasOwnProperty.call(e, t);
    for (var n = t.length, r = 0; r < n; r++) {
        var o = t[r];
        if (null == e || !Object.prototype.hasOwnProperty.call(e, o)) return !1;
        e = e[o];
    }
    return !!n;
}, h = function(e) {
    return "function" == typeof e;
}, d = function e(t, n) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
    if (t === n) return 0 !== t || 1 / t == 1 / n;
    if (null == t || null == n) return !1;
    if (t !== t && n !== n) return !0;
    var i = void 0 === t ? "undefined" : r(t), s = void 0 === n ? "undefined" : r(n);
    if ("function" !== i && "object" !== i && "object" != s) return !1;
    var a = Object.prototype.toString.call(t);
    if (a !== Object.prototype.toString.call(n)) return !1;
    switch (a) {
      case "[object RegExp]":
      case "[object String]":
        return "" + t == "" + n;

      case "[object Number]":
        return +t != +t ? +n != +n : 0 == +t ? 1 / +t == 1 / n : +t == +n;

      case "[object Date]":
      case "[object Boolean]":
        return +t == +n;

      case "[object Symbol]":
        return Symbol.prototype.valueOf.call(t) === Symbol.prototype.valueOf.call(n);
    }
    var c = "[object Array]" === a;
    if (!c) {
        if ("object" != (void 0 === t ? "undefined" : r(t)) || "object" != (void 0 === n ? "undefined" : r(n))) return !1;
        var l = t.constructor, d = n.constructor;
        if (l !== d && !(h(l) && l instanceof l && h(d) && d instanceof d) && "constructor" in t && "constructor" in n) return !1;
    }
    var p = o.length;
    for (u.length; p--; ) if (o[p] === t && u[p] === n) return !0;
    if (o.push(t), u.push(n), c) {
        var v = t.length;
        if (v !== n.length) return !1;
        for (;v--; ) if (!e(t[v], n[v], o, u)) return !1;
    } else {
        var y = Object.keys(t), g = Object.keys(n), k = y.length;
        if (k !== g.length) return !1;
        for (;k--; ) {
            var m = y[k];
            if (!f(n, m) || !e(t[m], n[m], o, u)) return !1;
        }
    }
    return o.pop(), u.pop(), !0;
}, p = function(e, t) {
    return d(e, t);
}, v = function(e, t) {
    var n = "[Houston] " + t + " Please make contact with @changsheng";
    u.default.fn.sendMsg(e, {
        _author: "changsheng",
        threshold: 1,
        message: n
    }), i.default.error(n, e);
}, y = function() {
    function e() {
        t(this, e);
    }
    return n(e, null, [ {
        key: "setUp",
        value: function() {
            s.on("mw-cmd-v", this.updateHandler.bind(this));
            var e = new k();
            return this._houstonConfig = e, this.update().then(function(e) {
                return i.default.log("The latest houston version is " + e), e;
            });
        }
    }, {
        key: "getConfig",
        value: function(e) {
            var t = this, n = e.groupName, r = e.key, o = e.defaultValue, u = e.listener;
            return this._houstonConfig ? this._houstonConfig.getValue({
                groupName: n,
                key: r,
                defaultValue: o,
                listener: u
            }) : new a(function(e, i) {
                t.setUp().then(function() {
                    t._houstonConfig.getValue({
                        groupName: n,
                        key: r,
                        defaultValue: o,
                        listener: u
                    }).then(function(t) {
                        e(t);
                    }).catch(function(e) {
                        i(e);
                    });
                }).catch(function(e) {
                    i(e);
                });
            });
        }
    }, {
        key: "updateHandler",
        value: function(e) {
            var t = this;
            try {
                var n = JSON.parse(e).v, r = 1e3 * parseInt(10 * Math.random());
                this._houstonConfig.version !== l ? setTimeout(function() {
                    t.update(n);
                }, r) : this.update(n);
            } catch (e) {
                v(e, "MWP没有返回正确的version");
            }
        }
    }, {
        key: "update",
        value: function(e) {
            return this._houstonConfig.updateByVersion(e);
        }
    } ]), e;
}(), g = function() {
    function e() {
        t(this, e), this._lock = !1, this._queue = [], this._lockedQueue = [];
    }
    return n(e, [ {
        key: "synchronize",
        value: function(e, t) {
            var n = this;
            return new a(function(r, o) {
                t ? n._lockedQueue.push({
                    task: e,
                    isNeedLocked: t,
                    resolve: r,
                    reject: o
                }) : n._queue.push({
                    task: e,
                    isNeedLocked: t,
                    resolve: r,
                    reject: o
                }), n._dequeue();
            });
        }
    }, {
        key: "_dequeue",
        value: function() {
            for (;this._lockedQueue.length > 0 && !this._lock; ) {
                var e = this._lockedQueue.shift();
                this._lock = e.isNeedLocked, this._execute(e);
            }
            for (;this._queue.length > 0 && !this._lock && 0 === this._lockedQueue.length; ) {
                var t = this._queue.shift();
                this._lock = t.isNeedLocked, this._execute(t);
            }
        }
    }, {
        key: "_execute",
        value: function(e) {
            var t = this, n = e.task, r = e.resolve, o = e.isNeedLocked;
            n().then(r).then(function() {
                o && (t._lock = !1), t._dequeue();
            }).catch(function(e) {
                o && (t._lock = !1), t._dequeue(), v(e, "Error occurred during task execute."), 
                r();
            });
        }
    } ]), e;
}(), k = function() {
    function e() {
        t(this, e);
        var n = wx.getStorageSync(c) || {};
        this.groups = n.groups || {}, this.version = n.version || l, this.mutex = new g(), 
        this.listeners = {}, this.updateMwpHeader(this.version);
    }
    return n(e, [ {
        key: "getValue",
        value: function(e) {
            var t = this, n = e.groupName, r = e.key, o = e.defaultValue, u = e.listener;
            return n && r ? this.mutex.synchronize(function() {
                return new a(function(e) {
                    var i = t.getGroup(n), s = i && i.data && i.data[r] || o || null, a = t.listeners[n] || {}, c = a[r] || [];
                    c.push(u), a[r] = c, t.listeners[n] = a, e(s);
                });
            }) : null;
        }
    }, {
        key: "getGroup",
        value: function(e) {
            return e ? this.groups[e] || {} : null;
        }
    }, {
        key: "deleteGroup",
        value: function(e) {
            e && delete this.groups[e];
        }
    }, {
        key: "saveGroup",
        value: function(e) {
            e && e.name && (this.groups[e.name] = e);
        }
    }, {
        key: "getGroupsAndVersions",
        value: function() {
            var e = {}, t = this.groups;
            return Object.keys(t).forEach(function(n) {
                e[n] = t[n].version;
            }), e;
        }
    }, {
        key: "getGroupData",
        value: function(e) {
            return this.getGroup(e).data || {};
        }
    }, {
        key: "getListenerInKey",
        value: function(e, t) {
            return (this.listeners[e] || {})[t] || [];
        }
    }, {
        key: "updateByVersion",
        value: function(e) {
            var t = this;
            return this.mutex.synchronize(function() {
                return new a(function(n, r) {
                    var o = t.version, u = t.getGroupsAndVersions(), i = new Date().getTime();
                    if (o === l || !t.lastRequestFailTime || i - t.lastRequestFailTime > 6e4) {
                        if (!e || e !== o) return t.request(u, n, r);
                        n(e);
                    } else n(o);
                });
            }, !0);
        }
    }, {
        key: "request",
        value: function(e, t) {
            var n = this, r = o.System.getSync("systemInfo"), u = r.SDKVersion, a = r.version;
            r.system;
            return s.request("mwp.HoustonCore.getConfig", "1", {
                groups: e,
                xcxBasicVersion: u,
                weChatVersion: a
            }, {
                useHTTPS: !0
            }).then(s.filterResult).then(function(e) {
                var r = e.version;
                n.update(e), t(r);
            }).catch(function(e) {
                n.lastRequestFailTime = new Date().getTime(), "FAIL_BIZ_APP_NAME_NOT_FOUND" === e.code ? i.default.warn("Houston未接入该小程序，如需使用Houston相关功能，请联系@慧能@长生") : v(e, "Error occurred during request mwp.HoustonCore.getConfig."), 
                t(n.version);
            });
        }
    }, {
        key: "update",
        value: function(e) {
            var t = this, n = e.groups || {}, r = e.version || l;
            this.updateMwpHeader(r), Object.keys(n).forEach(function(e) {
                var r = n[e];
                r.name = e;
                var o = r.data, u = t.getGroupData(e);
                switch (r.action) {
                  case "MODIFY":
                    Object.keys(o).forEach(function(n) {
                        var r = o[n], i = u[n];
                        p(r, i) || t.getListenerInKey(e, n).forEach(function(e) {
                            e(r, i);
                        });
                    }), t.saveGroup(r);
                    break;

                  case "DELETE":
                    Object.keys(u).forEach(function(n) {
                        var r = u[n];
                        t.getListenerInKey(e, n).forEach(function(e) {
                            e(null, r);
                        });
                    }), t.deleteGroup(e);
                }
            }), this.version = r, this.synchronize();
        }
    }, {
        key: "updateMwpHeader",
        value: function(e) {
            s.defaultOptions.headers = s.defaultOptions.headers || {}, s.defaultOptions.headers["mw-cmd-v"] = e || l;
        }
    }, {
        key: "synchronize",
        value: function() {
            wx.setStorage({
                key: c,
                data: {
                    groups: this.groups,
                    version: this.version
                },
                success: function() {}
            });
        }
    } ]), e;
}();

exports.default = y;