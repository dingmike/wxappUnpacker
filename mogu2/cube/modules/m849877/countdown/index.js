function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
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
}(), n = (e(require("../../../../common/m.js")), e(require("../../../../common/ticker/index.js"))), u = require("./util.js"), r = function() {
    function e(i) {
        t(this, e), this._endTime = 1e3 * i.endTime, this._diff = 1e3 * i.diff || 0, this._update = i.update, 
        this._complete = i.complete, this._paused = !1, this._ticker = (0, n.default)();
    }
    return i(e, [ {
        key: "start",
        value: function() {
            var e = this, t = this._endTime, i = new Date().getTime(), n = t - this._diff, r = i, a = {
                tick: function() {
                    if (!e._paused) {
                        var t = new Date().getTime(), i = t - n, s = t - r;
                        i >= 0 ? (e._ticker.removeTick(a), e._complete("0时0分0秒")) : s >= 1e3 && (e._update((0, 
                        u.formatTime)(-i / 1e3)), r = t);
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
    } ]), e;
}();

exports.default = r;