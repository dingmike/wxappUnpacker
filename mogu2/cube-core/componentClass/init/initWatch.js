function r(r, t, i, a) {
    return (0, e.isPlainObject)(i) && (a = i, i = i.handler), "string" == typeof i && (i = r[i]), 
    r.$watch(t, i, a);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initWatch = function() {
    var e = this, t = e.watch;
    for (var i in t) {
        var a = t[i];
        if (Array.isArray(a)) for (var n = 0; n < a.length; n++) r(e, i, a[n]); else r(e, i, a);
    }
}, exports.createWatcher = r;

var e = require("../utils/index");