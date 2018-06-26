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

var a = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var c = t[a];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), 
            Object.defineProperty(e, c.key, c);
        }
    }
    return function(t, a, c) {
        return a && e(t.prototype, a), c && e(t, c), t;
    };
}(), c = (e(require("../../../common/m.js")), e(require("../../../common/utils/cache.js"))), i = function() {
    function e(a, c) {
        t(this, e), this.cacheKey = a, this.spaceTime = 24 * parseInt(c) * 3600;
    }
    return a(e, [ {
        key: "getCache",
        value: function() {
            this.cacheKey, this.spaceTime;
            return wx && !wx.isH5 ? this.getXcxCache() : this.getH5Cache();
        }
    }, {
        key: "setCache",
        value: function() {
            wx && !wx.isH5 ? this.setXcxCache() : this.setH5Cache();
        }
    }, {
        key: "getH5Cache",
        value: function() {
            var e = this.cacheKey, t = this.spaceTime, a = localStorage.getItem("spaceTime_" + e);
            (!a || a && a != t) && (localStorage.setItem("spaceTime_" + e, t), this.clearH5Cache());
            var c = localStorage.getItem(e);
            if (c) {
                var i = this.getNowTime() - c;
                return console.log("timeLength::" + i), !(i >= t) || (this.clearH5Cache(), !1);
            }
            return !1;
        }
    }, {
        key: "getXcxCache",
        value: function() {
            var e = this.cacheKey, t = this.spaceTime, a = c.default.get("spaceTime_" + e);
            (!a || a && a != t) && (c.default.put("spaceTime_" + e, t, {
                persistent: !0
            }), this.clearXcxCache());
            var i = c.default.get(e);
            return !!i && (!(this.getNowTime() - i >= t) || (this.clearXcxCache(), !1));
        }
    }, {
        key: "setH5Cache",
        value: function() {
            localStorage.setItem(this.cacheKey, this.getNowTime());
        }
    }, {
        key: "setXcxCache",
        value: function() {
            c.default.put(this.cacheKey, this.getNowTime(), {
                persistent: !0
            });
        }
    }, {
        key: "clearH5Cache",
        value: function() {
            localStorage.removeItem(this.cacheKey);
        }
    }, {
        key: "clearXcxCache",
        value: function() {
            c.default.remove(this.cacheKey);
        }
    }, {
        key: "getNowTime",
        value: function() {
            return Math.floor(new Date().getTime() / 1e3);
        }
    } ]), e;
}();

exports.default = i;