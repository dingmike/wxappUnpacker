function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, o) {
    "function" == typeof o ? (a.get = r(t), a.set = u.noop) : (a.get = o.get ? !1 !== o.cache ? r(t) : o.get : u.noop, 
    a.set = o.set ? o.set : u.noop), Object.defineProperty(e, t, a);
}

function r(e) {
    return function() {
        var t = this._computedWatchers && this._computedWatchers[e];
        if (t) return t.dirty && t.evaluate(), n.default.target && t.depend(), t.value;
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var e = this, r = e._computedWatchers = Object.create(null), n = e.computed;
    for (var a in n) {
        var c = n[a], s = "function" == typeof c ? c : c.get;
        r[a] = new o.default(e, s, u.noop, i), a in e || t(e, a, c);
    }
}, exports.defineComputed = t;

var o = e(require("../observer/watcher")), n = e(require("../observer/dep")), u = require("../utils/index"), i = {
    lazy: !0
}, a = {
    enumerable: !0,
    configurable: !0,
    get: u.noop,
    set: u.noop
};