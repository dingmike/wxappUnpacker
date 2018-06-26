function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e) {
    function t(e) {
        var t = o.indexOf(e);
        return t < 0 ? (o.push(e), o.length) : t + 1;
    }
    function a(e) {
        return o[e - 1];
    }
    function n(e) {
        var n = [], r = [];
        return e.forEach(function(e) {
            Object.keys(e).forEach(function(e) {
                var a = t(e);
                r.indexOf(a) < 0 && r.push(a);
            });
        }), n.push(r.length), n = n.concat(r), e.forEach(function(e) {
            var o = [];
            r.forEach(function(n) {
                var r = a(n);
                e.hasOwnProperty(r) ? o.push(t(e[r])) : o.push(0);
            }), n = n.concat(o);
        }), n;
    }
    var r = [], o = [];
    return Object.keys(e).forEach(function(a) {
        var o = e[a], u = o.data, i = o.isNew, s = o.updateDate, f = o.updateTime, c = o.version, l = u.moduleList, h = u.title, d = u.desc, g = [];
        l.forEach(function(e) {
            var a = e.moduleKey, r = e.schema, o = void 0 === r ? {} : r, u = e.moduleId, i = [ t(a), u ], s = o.formData;
            if (s) {
                var f = [];
                Object.keys(s).forEach(function(e) {
                    f.push(t(e));
                    var a = n(s[e]);
                    f.push(a);
                }), i = i.concat(f);
            }
            g.push(i);
        });
        var p = [ a, g, h, d, i, s, f, c ];
        r.push(p);
    }), r = [ o ].concat(r);
}

function n(e) {
    function t(e) {
        return n[e - 1];
    }
    function a(e) {
        for (var a = e[0], n = e.slice(1, 1 + a), r = e.slice(1 + a), o = [], u = 0; u < r.length; u += a) !function(e) {
            var u = r.slice(e, e + a), i = {};
            n.forEach(function(e, a) {
                var n = u[a];
                0 !== n && (i[t(e)] = t(n));
            }), o.push(i);
        }(u);
        return o;
    }
    if (!(e && e.length >= 2)) return {};
    var n = e[0], r = {};
    return e.slice(1).forEach(function(e) {
        var n = o(e, 8), u = n[0], i = n[1], s = n[2], f = n[3], c = n[4], l = n[5], h = n[6], d = n[7], g = [];
        i.forEach(function(e) {
            for (var n = t(e[0]), r = e[1], o = e.slice(2), u = {}, i = 0; i < o.length; i += 2) {
                var s = o[i], f = a(o[i + 1]);
                u[t(s)] = f;
            }
            var c = {
                moduleKey: n,
                moduleId: r
            };
            o.length > 0 && (c.schema = {
                formData: u
            }), g.push(c);
        }), r[u] = {
            data: {
                moduleList: g,
                title: s,
                desc: f
            },
            isNew: c,
            updateDate: l,
            updateTime: h,
            version: d
        };
    }), r;
}

function r(e) {
    var t = {}, a = [], n = [ "moduleKey", "schema", "moduleId" ];
    return e.moduleList.forEach(function(e) {
        var t = d(e, n);
        delete t.schema.pluginData;
        var r = t.schema.formData;
        Object.keys(r).forEach(function(e) {
            var a = r[e];
            a && a.length > 0 && Object.keys(a[0]).length > 0 || delete t.schema.formData[e];
        }), 0 === Object.keys(t.schema.formData).length && delete t.schema, a.push(t);
    }), t.moduleList = a, t.title = e.title, t.desc = e.desc, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function e(e, t) {
        var a = [], n = !0, r = !1, o = void 0;
        try {
            for (var u, i = e[Symbol.iterator](); !(n = (u = i.next()).done) && (a.push(u.value), 
            !t || a.length !== t); n = !0) ;
        } catch (e) {
            r = !0, o = e;
        } finally {
            try {
                !n && i.return && i.return();
            } finally {
                if (r) throw o;
            }
        }
        return a;
    }
    return function(t, a) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), u = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t;
    };
}(), i = e(require("../m")), s = e(require("./cache")), f = e(require("./houston")), c = e(require("../../pages/detail/data")), l = i.default.Promise, h = i.default.fn, d = h.pick, g = h.sendMsg, p = "PageInfos", v = function() {
    function e() {
        t(this, e);
    }
    return u(e, null, [ {
        key: "setUp",
        value: function() {
            this._pageInfoManager = new y(c.default);
        }
    }, {
        key: "getPageInfo",
        value: function(e, t, a) {
            return this._pageInfoManager || this.setUp(), this._pageInfoManager.getPageInfo(e, t, a);
        }
    } ]), e;
}(), y = function() {
    function e(a) {
        var r = this;
        t(this, e);
        try {
            var o = wx.getStorageSync(p);
            this._pageInfos = n(o);
        } catch (e) {
            this.errorHandler(e), this._pageInfos = {};
        }
        try {
            this._defaultPageInfos = n(a);
        } catch (e) {
            this.errorHandler(e), this._defaultPageInfos = {};
        }
        Object.keys(this._pageInfos).forEach(function(e) {
            r._pageInfos[e].isNew = !0;
        });
    }
    return u(e, [ {
        key: "errorHandler",
        value: function(e) {
            console.log(e), g(e, {
                _author: "changsheng",
                threshold: 1
            });
        }
    }, {
        key: "getPageInfo",
        value: function(e, t, a) {
            var n = this;
            return new l(function(r, o) {
                var u = s.default.get("APPID");
                if (t) n.pageKey = e + "_" + t, n.pageInfoRequestUrl = "https://act.mogujie.com/" + u + e + t + ".json"; else {
                    if (!a) return o(new Error("缺少必须参数：" + (t ? a ? "" : "path" : "pageName")));
                    n.pageKey = "" + a, n.pageInfoRequestUrl = "https://act.mogujie.com/" + u + a + ".json";
                }
                var i = {
                    version: 1
                };
                f.default.getConfig({
                    groupName: "jcube_page_config_update",
                    key: n.pageKey,
                    defaultValue: i,
                    listener: function(e) {
                        n.filterPageInfo(e, r, o);
                    }
                }).then(function(e) {
                    n.filterPageInfo(e, r, o);
                }).catch(function() {
                    n.filterPageInfo(i, r, o);
                });
            });
        }
    }, {
        key: "filterPageInfo",
        value: function(e, t, a) {
            var n = new Date().toFormattedString("yyyy-MM-dd"), r = parseInt(new Date().getTime() / 1e3), o = this._pageInfos[this.pageKey], u = e.version, i = e.startTime, s = e.endTime;
            !o || !o.data || !o.data.moduleList || o.data.moduleList.length <= 0 || o.isNew || o.updateDate !== n || o.version !== u || i && s && (r <= s && i <= r || r >= s && o.updateTime <= s) ? this.requestPageInfo(t, a, u) : t(o.data);
        }
    }, {
        key: "requestPageInfo",
        value: function(e, t, a) {
            var n = this;
            i.default.requestManager.sendRequest({
                url: this.pageInfoRequestUrl,
                method: "GET",
                complete: function() {},
                success: function(o) {
                    if (o.data && o.data.pageInfo && n.validPageInfo(o.data.pageInfo)) {
                        var u = r(o.data.pageInfo);
                        n.updatePageInfo(u, a), e(u);
                    } else n.precessDefaultPageInfo(e, t);
                },
                error: function(a) {
                    n.precessDefaultPageInfo(e, t, a);
                }
            });
        }
    }, {
        key: "precessDefaultPageInfo",
        value: function(e, t, a) {
            var n = this._pageInfos[this.pageKey], r = this._defaultPageInfos[this.pageKey], o = n && n.data, u = r && r.data;
            o && this.validPageInfo(o) ? e(o) : u && this.validPageInfo(u) ? e(u) : t(a || new Error("页面配置数据错误"));
        }
    }, {
        key: "validPageInfo",
        value: function(e) {
            return e && e.moduleList && e.moduleList.length > 0;
        }
    }, {
        key: "updatePageInfo",
        value: function(e, t) {
            this._pageInfos[this.pageKey] = {
                data: e,
                isNew: !1,
                updateDate: new Date().toFormattedString("yyyy-MM-dd"),
                updateTime: parseInt(new Date().getTime() / 1e3),
                version: t
            }, this.savePageInfo();
        }
    }, {
        key: "savePageInfo",
        value: function() {
            var e = [];
            try {
                e = a(this._pageInfos);
            } catch (e) {
                this.errorHandler(e);
            }
            wx.setStorage({
                key: p,
                data: e,
                success: function() {}
            });
        }
    } ]), e;
}();

exports.default = v;