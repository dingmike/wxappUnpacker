Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../lib/utils"), e = function() {
    function e() {
        this._events = Object.create(null);
    }
    return e.prototype.$on = function(t, e) {
        return (this._events[t] || (this._events[t] = [])).push(e), this;
    }, e.prototype.$once = function(e, r) {
        var n = function() {
            for (var i = [], s = 0; s < arguments.length; s++) i[s] = arguments[s];
            this.$off(e, n), (0, t.apply)(r, this, i);
        };
        return this.$on(e, n), this;
    }, e.prototype.$off = function(t, e) {
        if (0 === arguments.length) return this._events = Object.create(null), this;
        var r = this._events[t];
        if (!r) return this;
        if (1 === arguments.length) return this._events[t] = null, this;
        for (var n = r.length - 1; n >= 0; n--) if (r[n] === e) {
            r.splice(n, 1);
            break;
        }
        return this;
    }, e.prototype.$emit = function(e) {
        for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
        var i = this._events[e];
        if (i) for (var s = 0, o = i.length; s < o; s++) try {
            (0, t.apply)(i[s], this, r);
        } catch (t) {
            console.error("fail to execute event handler of", e, t.stack);
        }
        return this;
    }, e;
}();

exports.default = e;