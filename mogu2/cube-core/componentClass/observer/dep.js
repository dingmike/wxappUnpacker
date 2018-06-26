function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}();

exports.pushTarget = function(e) {
    u.target && a.push(u.target), u.target = e;
}, exports.popTarget = function() {
    u.target = a.pop();
};

var n = require("../utils/index"), r = 0, u = function() {
    function u() {
        e(this, u), this.id = r++, this.subs = [];
    }
    return t(u, [ {
        key: "addSub",
        value: function(e) {
            this.subs.push(e);
        }
    }, {
        key: "removeSub",
        value: function(e) {
            (0, n.remove)(this.subs, e);
        }
    }, {
        key: "depend",
        value: function() {
            u.target && u.target.addDep(this);
        }
    }, {
        key: "notify",
        value: function() {
            for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) e[t].update();
        }
    } ]), u;
}();

exports.default = u, u.target = null;

var a = [];