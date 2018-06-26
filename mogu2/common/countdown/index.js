function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../ticker/index.js")), n = require("./util.js"), r = function() {
    function r(t) {
        e(this, r), this._endTime = 1e3 * t.endTime, this._diff = 1e3 * t.diff || 0, this._update = t.update, 
        this._complete = t.complete, this._format = t.format, this._paused = !1, this._ticker = (0, 
        i.default)();
    }
    return t(r, [ {
        key: "start",
        value: function() {
            var e = this, t = this._endTime, i = new Date().getTime(), r = t - this._diff, u = i, a = {
                tick: function() {
                    if (!e._paused) {
                        var t = new Date().getTime(), i = t - r, s = t - u;
                        i >= 0 ? (e._ticker.removeTick(a), e._complete()) : s >= 1e3 && (e._update((0, n.formatTime)(-i / 1e3, e._format)), 
                        u = t);
                    }
                }
            };
            this._tickObj = a, this._ticker.addTick(a), this._ticker.start();
        }
    }, {
        key: "pause",
        value: function() {
            this._paused = !0;
        }
    }, {
        key: "resume",
        value: function() {
            this._paused = !1;
        }
    }, {
        key: "stop",
        value: function() {
            this._tickObj = null, this._paused = !0;
        }
    } ]), r;
}();

exports.default = r;