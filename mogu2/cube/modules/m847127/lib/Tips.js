function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
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
}(), n = (t(require("../../../../common/m.js")), t(require("../../../../common/ticker/index.js"))), s = function() {
    function t(i, s, u, a) {
        e(this, t), this._tips = i, this.isShowTip = s, this._duration = u, this._ticker = (0, 
        n.default)(), this._paused = !1, this._update = a, this._index = 0;
    }
    return i(t, [ {
        key: "start",
        value: function() {
            var t = this, e = new Date().getTime();
            if (this._tips) {
                var i = {
                    tick: function() {
                        if (!t._paused) {
                            var i = new Date().getTime();
                            i - e >= t._duration && (t.isShowTip = !t.isShowTip, t._update(t._tips[t._index], t.isShowTip), 
                            t.isShowTip || (t._index >= t._tips.length - 1 ? t._index = 0 : t._index++), e = i);
                        }
                    }
                };
                this._tickObj = i, this._ticker.addTick(i), this._ticker.start(), this._update(this._tips[0], this.isShowTip);
            }
        }
    }, {
        key: "update",
        value: function(t) {
            this._tips = t;
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
    } ]), t;
}();

exports.default = s;