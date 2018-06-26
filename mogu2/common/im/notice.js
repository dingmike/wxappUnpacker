function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), u = e(require("./init")), i = e(require("./p2pmsg")), s = e(require("../base/Events")), f = function(e, t) {
    for (var n = e.split("."), o = t.split("."), r = 0; r <= n.length; r++) {
        if (parseInt(n[r]) > parseInt(o[r])) return 1;
        if (parseInt(n[r]) < parseInt(o[r])) return -1;
    }
    return 0;
}, a = function(e) {
    function a() {
        t(this, a);
        var e = n(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
        return e._count = 0, i.default.onP2PMsg("wechat_p2p_msg_receive", function(t) {
            t && t.businessId && (e._count++, e.$emit("CountChange", e._count), e.$emit("Msg", t));
        }), e;
    }
    return o(a, s.default), r(a, [ {
        key: "init",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return this.useIM() ? Promise.resolve() : (e.client_type = 12, (0, u.default)(e));
        }
    }, {
        key: "useIM",
        value: function() {
            var e = wx.getSystemInfoSync().SDKVersion || "0.0.0";
            return f(e, "1.5.0") < 0;
        }
    }, {
        key: "onCountChange",
        value: function(e) {
            this.$on("CountChange", e), e(this._count);
        }
    }, {
        key: "offCountChange",
        value: function(e) {
            e || this.$off("CountChange"), this.$off("CountChange", e);
        }
    }, {
        key: "readMsg",
        value: function(e) {
            e > 0 ? this._count -= e : this._count = 0, this.$emit("CountChange", this._count);
        }
    }, {
        key: "offMsg",
        value: function(e) {
            e || this.$off("Msg"), this.$off("Msg", e);
        }
    }, {
        key: "onMsg",
        value: function(e) {
            this.$on("Msg", e);
        }
    } ]), a;
}();

exports.default = new a();