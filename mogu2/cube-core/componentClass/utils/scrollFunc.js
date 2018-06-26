function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, o) {
    var a = this;
    switch (g[t] = g[t] || {
        acms: [],
        indexs: [],
        type: 0,
        iids: [],
        cparams: []
    }, t) {
      case "module":
        g[t].type = 5;
        break;

      case "mce":
        g[t].type = 4;
        break;

      case "anchor":
      case "pit":
        g[t].type = 5;
    }
    e.cparam && g[t].cparams.push(e.cparam), g[t].acms.push(e.acm), void 0 !== e.index && g[t].indexs.push(e.index), 
    e.iid && g[t].iids.push(e.iid);
    !function e() {
        clearTimeout(f), f = setTimeout(function() {
            o.__hasKilled || (Object.keys(g) || []).forEach(function(n) {
                if (g[n] && g[n].acms.length) {
                    var i = c.default.read().level, r = [], s = o && o.$parent && o.$parent.options && o.$parent.options.checkLog;
                    if (2 === i && "open" === s && "mce" === n) {
                        var d = g[n].acms, l = g[n].iids;
                        if (d.length > 0) {
                            var h = 0;
                            d.forEach(function(e, t) {
                                var o = e.split("-mf_")[0], a = e.split("-mf_")[1], n = a.split("_")[1].split("-")[0], i = "";
                                o.indexOf(l[h]) > 0 && (i = l[h], h += 1), "3.mf.1_0_0.0.0.0" === o && (o = "error"), 
                                r.push({
                                    mun: v[n],
                                    moduleAcm: a,
                                    mceAcm: o,
                                    iid: i
                                });
                            }), console.table(r);
                        }
                    }
                    a.$root.$logE("0x00000000", {
                        acms: g[n].acms.splice(0, p),
                        indexs: g[n].indexs.splice(0, p),
                        type: g[n].type,
                        iids: g[n].iids.splice(0, p)
                    }, {
                        force: !0
                    }), g[n].acms ? e() : g[t] = Object.assign(g[t], {
                        acms: [],
                        indexs: [],
                        type: 0,
                        iids: []
                    });
                }
                g[n] && g[n].cparams.length && (a.$root.$logE("70005", {
                    cparams: g[n].cparams.splice(0, p)
                }, {
                    force: !0
                }), g[n].cparams ? e() : g[t] = Object.assign(g[t], {
                    cparams: []
                }));
            });
        }, 1e3);
    }();
}

function o(e, o, a) {
    var n = this, i = o._vx_moduleAcm, c = o.$wrapper;
    if (!c.__hasKilled && i) {
        var s = c.acmInfo, d = wx.createSelectorQuery();
        d.selectAll("#" + e + " " + y).boundingClientRect(), d.selectAll("#" + e + " .anchor").boundingClientRect(), 
        d.exec(function(d) {
            if (d) {
                var l = (d[0] || []).concat(d[1] || []), h = l.length;
                if (!n.__hasLogged[e].__mod) {
                    n.__hasLogged[e].__mod = !0, n.__hasLogged[e].__len = h;
                    try {
                        c.data.modules.forEach(function(e, t) {
                            v[e.instId] = t + 1;
                        });
                    } catch (e) {
                        console.error(e);
                    }
                    t.call(n, {
                        acm: (0, r.handleAcmJoin)(i, i, null, h, s, !1),
                        index: a
                    }, "module", c);
                }
                l.forEach(function(a, d) {
                    if (u(a, 0) || o._alwaysShow) {
                        var l = a.dataset;
                        if (l && l.cubeAcmNode && l.dataLogContent && void 0 === n.__hasLogged[e][l.dataLogContent]) {
                            n.__hasLogged[e][l.dataLogContent] = d, n.__hasLogged[e].__len = h;
                            var m = {
                                acm: (0, r.handleAcmJoin)(l.dataLogContent, i, d, h, s, !0),
                                index: d
                            };
                            l && l.dataLogCparam && "null" !== l.dataLogCparam && "undefined" !== l.dataLogCparam && (m.cparam = l.dataLogCparam), 
                            l.dataLogIid && (m.iid = l.dataLogIid), t.call(n, m, "mce", c);
                        } else l && void 0 != l.anchorIndex && void 0 === n.__hasLogged[e]["anchor" + l.anchorIndex] ? (n.__hasLogged[e]["anchor" + l.anchorIndex] = d, 
                        n.__hasLogged[e].__len = h, t.call(n, {
                            acm: (0, r.handleAcmJoin)(i, i, d, h, s, !1),
                            index: d
                        }, "anchor", c)) : l && void 0 != l.pitIndex && void 0 === n.__hasLogged[e]["pit" + l.pitIndex] && void 0 === l.dataLogContent && (n.__hasLogged[e]["pit" + l.pitIndex] = d, 
                        n.__hasLogged[e].__len = h, t.call(n, {
                            acm: (0, r.handleAcmJoin)(i, i, d, h, s, !1),
                            index: d
                        }, "pit", c));
                    }
                });
            }
        });
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.showLog = o, exports.callModInView = function() {
    var e = this, t = !1, n = function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
        return !(e.realBottom < t - h * o || e.realTop > t + h * (o + 1));
    };
    if (this.__handleLazyRes || (this.__handleLazyRes = i.default.fn.throttle(function(i, c) {
        if (!e.__hasKilled && i) {
            if (c) return void (e.__lazyModCache = i.map(function(t) {
                return Object.assign(t, {
                    realTop: e.__scrollPos + t.top,
                    realBottom: e.__scrollPos + t.bottom
                });
            }));
            var r = !1, d = function(t, o, a, i, c, r) {
                (!e.__lazyModCache && u(t, a) || e.__lazyModCache && n(t, e.__scrollPos, i)) && t.id ? c(t, o) : t.id && r(t, o);
            };
            i.forEach(function(t, a) {
                if (t) {
                    var n = _(e.data.modules, t.id);
                    d.call(e, t, a, 1, 0, function(t, a) {
                        var n = e.moduleInst[t.id];
                        n && n.parent && n.label && n.$vm && (n.$vm.$broadcast("vx:modInView"), o.call(e, t.id, n, a));
                    }, function(t, a) {
                        var n = e.moduleInst[t.id];
                        n && n.parent && n.label && n.$vm && (n.$vm.$broadcast("vx:modNotInView"), n._alwaysShow && o.call(e, t.id, n, a));
                    }), d.call(e, t, a, 3, 3, function(e, t) {
                        n.isShow || (n.isShow = r = !0), n.modHeight = e.height, n.modWidth = e.width;
                    }, function(t, o) {
                        e.moduleInst[t.id]._alwaysShow || n.isShow && (n.isShow = !1, r = !0), n.modHeight = t.height, 
                        n.modWidth = t.width;
                    });
                }
            }), (a.default.lazymod || t) && e.__openLazyMod && r && (!s && wx.showLoading && wx.showLoading({
                title: "正在加载中..."
            }), s || setTimeout(function() {
                wx.hideLoading && wx.hideLoading();
            }, 500), e.setData({
                modules: e.data.modules
            }));
        }
    }, 500)), a.default.useModInView && wx.createSelectorQuery && wx.getSystemInfoSync) {
        this.__lazyModCache && this.__handleLazyRes(this.__lazyModCache);
        var c = wx.createSelectorQuery();
        try {
            this.moduleInst && Object.keys(this.moduleInst).forEach(function(e) {
                c.select("#" + e).boundingClientRect();
            });
        } catch (e) {
            console.error("scroll query error", e);
        }
        try {
            s && c && c.select(".wrapper-scroll-view").scrollOffset();
        } catch (e) {
            console.error("scroll error", e);
        }
        c.exec(function(o) {
            if (!e.__hasKilled) {
                e.__handleLazyRes(o, !!e.__lazyModCache);
                try {
                    s && (o[o.length - 1] && o[o.length - 1].scrollTop || 0) + (o[o.length - 2] && o[o.length - 2].top || 0) > 4e4 && (t = !0);
                } catch (e) {
                    console.error("select query error", e);
                }
            }
        });
    }
}, exports.selectorInView = function(e, t, o) {
    if (a.default.lazydata && wx.createSelectorQuery && wx.getSystemInfoSync) {
        var n = wx.createSelectorQuery();
        n.selectAll(e).boundingClientRect(), n.exec(function(e) {
            var a = !1;
            e && e[0] && (e[0].forEach(function(e) {
                u(e, 6) && (a = !0);
            }), a ? t && t() : o && o());
        });
    } else t && t();
};

var a = e(require("./switch")), n = require("../../../common/m"), i = e(n), c = e(require("../../../common/utils/debug")), r = require("./index"), s = !1;

try {
    var d = n.System.getSync("systemInfo");
    s = /ios/gi.test(d.system);
} catch (e) {
    console.error(e);
}

var l = wx.getSystemInfoSync();

l.screenHeight || l.screenWidth || (l.screenHeight = l.windowHeight, l.screenWidth = l.windowWidth);

var h = l.screenHeight, m = l.screenWidth, u = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
    return e && e.top <= l.screenHeight + h * t && e.bottom >= -h * t && e.width && e.left <= l.screenWidth + m * t && e.right >= -m * t;
}, _ = function(e, t) {
    var o = void 0;
    return (e || []).forEach(function(e) {
        "m" + e.instId === t && (o = e);
    }), o;
}, g = {}, f = void 0, p = 20, y = ".log-item", v = {};