function t(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, a) {
        for (var e = 0; e < a.length; e++) {
            var n = a[e];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(a, e, n) {
        return e && t(a.prototype, e), n && t(a, n), a;
    };
}(), e = function() {
    function e(a, n) {
        t(this, e), this.data = a || {}, this.callback = n;
    }
    return a(e, [ {
        key: "setGlobal",
        value: function(t) {
            this.data = Object.assign(this.data, t), this.callGlobal(this.data);
        }
    }, {
        key: "getGlobal",
        value: function() {
            return this.data;
        }
    }, {
        key: "callGlobal",
        value: function(t) {
            this.callback && this.callback(t);
        }
    } ]), e;
}();

exports.default = e;