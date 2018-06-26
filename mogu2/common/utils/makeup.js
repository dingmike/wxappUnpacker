function e(e, _) {
    if (!(e instanceof _)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _ = function() {
    function e(e, _) {
        for (var n = 0; n < _.length; n++) {
            var t = _[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(_, n, t) {
        return n && e(_.prototype, n), t && e(_, t), _;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../m")).default.MCE, t = function() {
    function t(_, n) {
        e(this, t), this.i = _, this.pid = n, this.index = 1, n ? this._request() : (this.i.$broadcast("__makeup_done__", n, {}, !1), 
        console.log("________makeup请求失败：pid不能为空！"));
    }
    return _(t, [ {
        key: "reload",
        value: function() {
            this._request();
        }
    }, {
        key: "_request",
        value: function() {
            var e = this, _ = this.pid || "";
            _ && n.makeup({
                pid: _
            }).then(function(n) {
                e.i.$broadcast("__makeup_done__", _, n, !0), console.log("________makeup请求" + _ + "成功：", n);
            }).catch(function(n) {
                e.index++, e.index <= 3 ? (e._request(), console.log("________makeup请求失败：继续第" + e.index + "次请求！")) : (e.i.$broadcast("__makeup_done__", _, {}, !1), 
                console.log("________makeup请求" + _ + "失败：", n));
            });
        }
    } ]), t;
}();

exports.default = t;