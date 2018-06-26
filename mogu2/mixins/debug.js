function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.switchMCERealTime = function(e) {
    e ? a.mock(u) : a.restore(u);
};

var t = e(require("../common/m")), o = e(require("../common/utils/debug")), r = t.default.qs, n = t.default.MWP, a = t.default.MCE;

!function() {
    var e = Object.getPrototypeOf ? Object.getPrototypeOf(a.prototype) : a.prototype.__proto__, t = e.request;
    a.__mocks = [], a.mock = function(e) {
        a.__mocks.push(e);
    }, a.restore = function(o) {
        o ? a.__mocks = a.__mocks.filter(function(e) {
            return e !== o;
        }) : e.request = t;
    }, e.request = function(e) {
        var o = this;
        return a.__mocks.reduce(function(e, t) {
            return t.call(o, e) || e;
        }, t).call(this, e);
    };
}();

var s = o.default.read(), u = function(e) {
    return function() {
        return e.call(this, !0);
    };
};

s.forceMceRealTime && a.mock(u), void 0 === n._setGlobalEnv ? n.setGlobalEnv(s.env) : n.setGlobalEnv(!0, s.env), 
exports.default = {
    onShow: function() {
        if (!o.default.scanning) {
            var e = o.default.read(), t = [];
            e.showDepth && t.push("page depth: " + getCurrentPages().length);
            var n = this.route, a = this.query;
            Object.keys(a).length > 0 && (n += "?" + r.stringify(a)), e.showPath && t.push('page path: "' + n + '"'), 
            e.copyPath && wx.canIUse && wx.canIUse("setClipboardData") && (wx.setClipboardData({
                data: n
            }), t.push("page path copied")), t.length > 0 && wx.showModal({
                content: t.join(", "),
                showCancel: !1
            });
        }
    }
};