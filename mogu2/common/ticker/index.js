function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}();

exports.default = function(t, e) {
    var n = t || 60, s = i[n];
    return e ? s = new a(n) : s || (s = new a(n), i[n] = s), s;
};

var i = {}, n = function() {
    function i(e) {
        t(this, i), this._paused = !1, this._tick = e.tick, this._duration = e.duration || 0, 
        this.targetTime = new Date().getTime() + this._duration;
    }
    return e(i, [ {
        key: "tick",
        value: function() {
            this._paused || this._tick && this._tick();
        }
    }, {
        key: "pause",
        value: function() {
            this._paused = !0;
        }
    }, {
        key: "resume",
        value: function(t) {
            t && (this.targetTime = new Date().getTime() + this._duration), this._paused = !1;
        }
    } ]), i;
}(), a = function() {
    function i(e) {
        t(this, i), this._paused = !1, this._intervalId = null, this._lastTime = 0, this._tickCount = 0, 
        this._tickTime = 0, this._measuredFPS = 0, this._targetFPS = e, this._interval = 1e3 / this._targetFPS, 
        this._tickers = [];
    }
    return e(i, [ {
        key: "start",
        value: function() {
            if (!this._intervalId) {
                this._lastTime = +new Date();
                var t = this, e = this._interval;
                this._paused = !1, function i() {
                    t.clear(), t._intervalId = setTimeout(i, e), t._tick();
                }();
            }
        }
    }, {
        key: "clear",
        value: function() {
            clearTimeout(this._intervalId), this._intervalId = null;
        }
    }, {
        key: "stop",
        value: function() {
            clearTimeout(this._intervalId), this._intervalId = null, this._lastTime = 0, this._paused = !0;
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
        key: "_tick",
        value: function() {
            if (!this._paused) {
                var t = +new Date(), e = t - this._lastTime, i = this._tickers;
                ++this._tickCount >= this._targetFPS ? (this._measuredFPS = 1e3 / (this._tickTime / this._tickCount) + .5 >> 0, 
                this._tickCount = 0, this._tickTime = 0) : this._tickTime += t - this._lastTime, 
                this._lastTime = t;
                for (var n = i.slice(0), a = 0, s = n.length; a < s; a++) n[a].tick(e);
            }
        }
    }, {
        key: "getMeasuredFPS",
        value: function() {
            return Math.min(this._measuredFPS, this._targetFPS);
        }
    }, {
        key: "addTick",
        value: function(t) {
            if (!t || "function" != typeof t.tick) throw new Error("Ticker: The tick object must implement the tick method.");
            this._tickers.push(t);
        }
    }, {
        key: "removeTick",
        value: function(t) {
            var e = this._tickers, i = e.indexOf(t);
            i >= 0 && e.splice(i, 1);
        }
    }, {
        key: "nextTick",
        value: function(t) {
            var e = this, i = new n({
                tick: function() {
                    e.removeTick(i), t();
                }
            });
            return e.addTick(i), i;
        }
    }, {
        key: "timeout",
        value: function(t, e) {
            var i = this, a = new n({
                tick: function() {
                    new Date().getTime() - this.targetTime >= 0 && (i.removeTick(a), t());
                },
                duration: e
            });
            return i.addTick(a), a;
        }
    }, {
        key: "interval",
        value: function(t, e) {
            var i = this, a = new n({
                tick: function() {
                    var i = new Date().getTime(), n = i - this.targetTime;
                    n >= 0 && (n < e && (i -= n), this.targetTime = i + e, t());
                },
                duration: e
            });
            return i.addTick(a), a;
        }
    } ]), i;
}();