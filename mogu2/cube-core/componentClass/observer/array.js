Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.arrayMethods = void 0;

var r = require("../utils/index"), e = Array.prototype, t = exports.arrayMethods = Object.create(e);

[ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(s) {
    var o = e[s];
    (0, r.def)(t, s, function() {
        for (var r = arguments.length, e = new Array(r); r--; ) e[r] = arguments[r];
        var t = o.apply(this, e), a = this.__ob__, i = void 0;
        switch (s) {
          case "push":
          case "unshift":
            i = e;
            break;

          case "splice":
            i = e.slice(2);
        }
        return i && a.observeArray(i, a.rootProps), a.rootProps && a.vm._vx_dirtyData.push(a.rootProps), 
        a.dep.notify(), t;
    });
});