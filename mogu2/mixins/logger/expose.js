function e(e, o) {
    var t = [], s = [], a = [], c = [], r = [], l = {};
    e.forEach(function(e) {
        t.push(e.acm), a.push(e.index), e.iid && s.push(e.iid), e.cparam && (r.push(e.cparam), 
        c.push(e.iid));
    }), o && o.getExposeInfo && (l = o.getExposeInfo()), this.$logE(i, Object.assign({}, l, {
        acms: t,
        iids: s,
        indexs: a,
        cpcs: c
    })), r.length && (delete l.properties, this.$logE(n, Object.assign(l, {
        cparams: r
    })));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.expose = function(o) {
    var s = this;
    if (a) {
        this.$exposeLog || (this.$exposeLog = {
            cached: {}
        }), o && (this.$exposeLog.$wall = o);
        var i = this.$exposeLog.$wall, n = this.$exposeLog;
        clearTimeout(n.lockFlag), n.lockFlag = this.$setTimeout(function() {
            var o = Date.now();
            wx.createSelectorQuery().selectAll(c).boundingClientRect(function(a) {
                var c = [], l = [], p = {};
                a.forEach(function(e) {
                    if (e.top < r().windowHeight && e.left < r().windowWidth) {
                        var o = e.dataset, s = o.logIid, a = o.logIndex, i = o.logWall, u = o.cparam, g = (0, 
                        t.acmExt)(e.dataset);
                        if (g && !n.cached[g]) {
                            p[g] = !0;
                            var d = {
                                acm: g,
                                iid: s,
                                index: parseInt(a) || 0,
                                cparam: u
                            };
                            i ? l.push(d) : c.push(d);
                        }
                    }
                }), l.length && !i || (Object.assign(n.cached, p), c.length && e.call(s, c), l.length && e.call(s, l, i)), 
                console.log("自动曝光耗时:", Date.now() - o);
            }).exec();
        }, 400);
    }
}, exports.logExpose = function(e) {
    e.cparams && (this.$logE(n, {
        cparams: e.cparams
    }), delete e.cparams), this.$logE(i, e);
};

var o = require("../../common/m"), t = require("./acm"), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/config")), a = wx.canIUse && wx.canIUse("createSelectorQuery"), c = ".expose-log", i = s.default.logger.exposeId || "0x00000000", n = s.default.logger.cpsExposeId || "70005", r = function() {
    var e = void 0;
    return function() {
        return e || (e = o.System.getSync("systemInfo") || {}), e;
    };
}();