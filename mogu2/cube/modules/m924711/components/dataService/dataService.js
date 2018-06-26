function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var u = t[n];
            u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), 
            Object.defineProperty(e, u.key, u);
        }
    }
    return function(t, n, u) {
        return n && e(t.prototype, n), u && e(t, u), t;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../common/m.js")).default.MWP, u = new (function() {
    function u() {
        e(this, u), this.requestTimestamp = 0;
    }
    return t(u, [ {
        key: "getHeaderData",
        value: function(e) {
            this.updateRequestTimestamp(), this.sendRequest(e, this.requestTimestamp);
        }
    }, {
        key: "updateRequestTimestamp",
        value: function() {
            this.requestTimestamp = new Date().valueOf();
        }
    }, {
        key: "sendRequest",
        value: function(e, t) {
            var u = this;
            n.request("mwp.livelist.xcxLiveTabHeader", "2").then(n.filterResult).then(function(n) {
                t == u.requestTimestamp && e && e(n, void 0);
            }).catch(function(n) {
                t == u.requestTimestamp && e && e(void 0, n);
            });
        }
    } ]), u;
}())();

exports.default = u;