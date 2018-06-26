function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LazyData = void 0;

var i = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var a = i[e];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(i, e, a) {
        return e && t(i.prototype, e), a && t(i, a), i;
    };
}(), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../m")).default.MCE, a = function() {
    function a() {
        t(this, a), this.i = {}, this.children = [], this.pids = [], this.isCdn = !1, this.index = 1;
    }
    return i(a, [ {
        key: "init",
        value: function(t, i) {
            this.pids = t.data && t.data.pids || [], this.i = t, this.isCdn = !!i, this.getAllChildren(this.i), 
            this._request();
        }
    }, {
        key: "getAllChildren",
        value: function(t) {
            var i = t.$children || [];
            this.children = this.children.concat(i);
            for (var e = 0; e < i.length; e++) if (i[e] && i[e].$children) {
                var a = i[e] && i[e].data && i[e].data.pids || [];
                this.pids = this.pids.concat(a), this.getAllChildren(i[e]);
            }
        }
    }, {
        key: "reload",
        value: function() {
            this._request();
        }
    }, {
        key: "_request",
        value: function() {
            var t = this, i = this, a = this.isCdn || !1;
            if (!(i && i.pids && i.pids.length > 0)) return i.i.$broadcast("__lazy-data__", i.pids, {}, !1), 
            void console.log("________" + this.i.name + "_lazyData请求失败：没有需要请求的资源位！");
            var n = i.pids.join(",");
            e.multiget({
                pids: n
            }, !a).then(function(e) {
                i.i.$broadcast("__lazy-data__", i.pids, e, !0), console.log("________" + t.i.name + "_lazyData_isCdn：", a), 
                console.log("________" + t.i.name + "_lazyData请求成功：", e);
            }).catch(function(e) {
                t.index++, t.index <= 3 ? (t._request(), console.log("________" + t.i.name + "_lazyData请求失败：继续第" + t.index + "次请求！")) : (i.i.$broadcast("__lazy-data__", i.pids, {}, !1), 
                console.log("________" + t.i.name + "_lazyData请求失败：", e));
            });
        }
    } ]), a;
}(), n = new a();

exports.default = n, exports.LazyData = a;