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

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), a = e(require("../../../../../common/m.js")), r = e(require("../../../../../common/utils/cache.js")), u = a.default.MCE, i = new (function() {
    function e() {
        t(this, e);
    }
    return n(e, [ {
        key: "downloadSkinData",
        value: function() {
            var e = this;
            u.get({
                pid: "109838"
            }).then(function(t) {
                if (t && t.list) {
                    var n = null;
                    t.list.length > 0 && (n = t.list[0]), e.cacheSkinData(n);
                }
            }).catch(function() {});
        }
    }, {
        key: "cacheSkinData",
        value: function(e) {
            e ? r.default.put("LIVE_LIST_SKIN_DATA", e, {
                persistent: !0
            }) : r.default.remove("LIVE_LIST_SKIN_DATA", {
                persistent: !0
            });
        }
    }, {
        key: "getSkinData",
        value: function() {
            return r.default.get("LIVE_LIST_SKIN_DATA", {
                persistent: !0
            });
        }
    } ]), e;
}())();

exports.default = i;