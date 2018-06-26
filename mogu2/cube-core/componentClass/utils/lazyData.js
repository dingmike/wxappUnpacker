function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e) {
    return (e || []).filter(function(e) {
        return e.requestFirst;
    }).length;
}

function n(e) {
    var t = "";
    if (e && "[object Object]" == Object.prototype.toString.call(e)) {
        var r = Object.keys(e);
        r && r.length && r.sort().forEach(function(r) {
            t += r + "=" + e[r] + ";";
        });
    }
    return t;
}

function i(e, t, r) {
    var n = [];
    (e || []).forEach(function(e) {
        e.isReceive || e.isPending || (e.isPending = !0, n.push("#m" + e.instId));
    });
    var i = function() {
        (e || []).forEach(function(e) {
            e.isReceive = !0;
        });
    }, a = function() {
        (e || []).forEach(function(e) {
            e.isPending = !1;
        });
    };
    n && n.length && (0 === t ? (r && r(), i(), a()) : (0, c.selectorInView)(n.join(","), function() {
        r && r(), i(), a();
    }, function() {
        a();
    }));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
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
}(), o = require("../../../common/m"), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(o), c = require("./scrollFunc"), u = s.default.MCE, l = s.default.fn.sendMsg, f = !0;

try {
    var p = o.System.getSync("systemInfo");
    f = /(iPhone 5)|(iPhone 4s)/gi.test(p.model);
} catch (e) {
    console.error(e);
}

var m = {
    mce: {
        method: "multiget",
        param: "pids",
        realtime: !1
    },
    mceonly: {
        method: "get",
        param: "pid",
        realtime: !1
    },
    mceats: {
        method: "multiget",
        param: "pids",
        realtime: !1
    },
    mceonline: {
        method: "multiget",
        param: "pids",
        realtime: !0
    },
    makeup: {
        method: "makeup",
        param: "pid",
        realtime: !0
    },
    mceonlyonline: {
        method: "get",
        param: "pid",
        realtime: !0
    },
    mcereconline: {
        method: "multiget",
        param: "pids",
        realtime: !0,
        noNeedRealTime: !0
    },
    mcereconlyonline: {
        method: "get",
        param: "pid",
        realtime: !0,
        noNeedRealTime: !0
    }
}, h = function() {
    function o(e) {
        t(this, o), this.$wrapper = e, this.items = [], this.preparedBlocks = [], this.MOD_ITEM_SIZE = 20, 
        this.MAX_MERGE_ITEM_SIZE = f ? 20 : 40;
    }
    return a(o, [ {
        key: "collect",
        value: function(e) {
            var t = e.inst, r = e.instId, n = t.config.formData;
            for (var i in n) {
                var a = n[i];
                if (a && a.length) {
                    var o = !0, s = !1, c = void 0;
                    try {
                        for (var u, l = a[Symbol.iterator](); !(o = (u = l.next()).done); o = !0) {
                            var f = u.value;
                            if (f) {
                                var p = f.sourceKey;
                                p && !f["request-self"] && this.items.push({
                                    inst: t,
                                    instId: r,
                                    sourceKey: "" + p,
                                    sourceType: f.sourceType,
                                    size: f.size,
                                    sourceAlone: f.sourceAlone,
                                    extraParam: f.extraParam,
                                    requestFirst: f.requestFirst,
                                    isReceive: !1,
                                    isPending: !1
                                });
                            }
                        }
                    } catch (e) {
                        s = !0, c = e;
                    } finally {
                        try {
                            !o && l.return && l.return();
                        } finally {
                            if (s) throw c;
                        }
                    }
                }
            }
        }
    }, {
        key: "prepare",
        value: function() {
            var e = this, t = {};
            this.items.forEach(function(r, n) {
                !r.sourceAlone && !r.requestFirst && 0 != n || "makeup" === r.sourceType ? r.sourceType && (t[r.sourceType] = t[r.sourceType] || [], 
                t[r.sourceType].push(r)) : e.preparedBlocks.push([ r ]);
            });
            var r = {};
            Object.keys(t).forEach(function(e) {
                t[e].forEach(function(t) {
                    if (t.extraParam) {
                        var i = n(t.extraParam);
                        r[e + "_" + i] = r[e + "_" + i] || [], r[e + "_" + i].push(t);
                    } else "makeup" == e ? (r[e + "_" + t.sourceKey] = r[e + "_" + t.sourceKey] || [], 
                    r[e + "_" + t.sourceKey].push(t)) : (r[e] = r[e] || [], r[e].push(t));
                });
            });
            var i = 0, a = [];
            Object.keys(r).forEach(function(t) {
                r[t].forEach(function(t) {
                    i >= e.MAX_MERGE_ITEM_SIZE && "makeup" !== t.sourceType ? (e.preparedBlocks.push(a), 
                    i = t.size ? parseInt(t.size) : e.MOD_ITEM_SIZE, a = [ t ]) : (a.push(t), i += t.size ? parseInt(t.size) : e.MOD_ITEM_SIZE);
                }), a.length && (e.preparedBlocks.push(a), i = 0, a = []);
            });
        }
    }, {
        key: "receiveData",
        value: function(e, t, r) {
            var n = this, i = this;
            if (!i.$wrapper.__hasKilled) {
                e.forEach(function(e) {
                    var r = e.inst, n = e.sourceKey;
                    if ("makeup" == e.sourceType) r.$vm.$broadcast("vx:__lazy-data__", t, n, {}); else {
                        var i = t && t[n] && JSON.parse(JSON.stringify(t[n].list || [])), a = t && t[n] && JSON.parse(JSON.stringify(t[n].context || []));
                        !i && t && t.list && (i = t.list, a = t.context), r.$vm.$broadcast("vx:__lazy-data__", i, n, a);
                    }
                }), this.send(r);
                setTimeout(function() {
                    i.$wrapper.__hasKilled || (r && r(), setTimeout(function() {
                        i.$wrapper.__hasKilled || n.send(r);
                    }, 200));
                }, 1e3);
            }
        }
    }, {
        key: "sendData",
        value: function(t, r) {
            var n = this, i = "multiget", a = !1, o = !1, s = "pids", c = t.map(function(e, t) {
                if (0 == t) {
                    var r = m[e.sourceType];
                    i = r.method, a = r.realtime, o = r.noNeedRealTime, s = r.param;
                }
                return e.sourceKey;
            }), f = {};
            c = c.filter(function(e) {
                return !f[e] && (f[e] = !0, !0);
            });
            var p = function(t, r, n, i) {
                if (i) {
                    var a;
                    return u[t]((a = {}, e(a, s, n.join(",")), e(a, "appPlat", "sapp"), a));
                }
                var o;
                return u[t]((o = {}, e(o, s, n.join(",")), e(o, "appPlat", "sapp"), o), r);
            };
            p(i, a, c, o).then(function(e) {
                n.receiveData(t, e, r);
            }).catch(function(e) {
                p(i, a, c, o).then(function(e) {
                    n.receiveData(t, e, r);
                }).catch(function(e) {
                    n.receiveData(t, {}, r), l(new Error("小程序 lazyData 请求失败！" + e), {
                        _author: "xixing",
                        threshold: 5
                    });
                });
            });
        }
    }, {
        key: "send",
        value: function(e) {
            if (!(this.preparedBlocks.length <= 0)) {
                var t = 0, n = !1;
                this.preparedBlocks.forEach(function(e, i) {
                    r(e) || n || (t = i, n = !0);
                });
                var a = this;
                this.preparedBlocks.forEach(function(n, o) {
                    i(n, o === t || r(n) ? 0 : o, function() {
                        a.sendData(n, e);
                    });
                });
            }
        }
    } ]), o;
}();

exports.default = h;