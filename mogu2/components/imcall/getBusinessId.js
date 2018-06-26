function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), n = e(require("../../common/im/index")), r = t.default.Promise, u = {}, o = {}, i = function(e) {
    var n = e.shopIdList;
    return o[n] ? o[n] : t.default.MWP.request("mwp.wechat_callback_service.getOrCreateBusinessAccount", "1", e).then(t.default.MWP.filterResult).then(function(e) {
        return o[n] = null, e;
    }, function(e) {
        throw console.error("getBusinessId error", e), o = {}, e;
    });
};

exports.default = function() {
    var e = [], t = {};
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(function(n) {
        u[n] ? t[n] = u[n] : e.push(n);
    }), e.length <= 0 ? r.resolve(t) : n.default.getAppNum().then(function(n) {
        var o = {
            appId: n,
            shopIdList: e.join(",")
        };
        return i(o).then(function(e) {
            return e ? (t = Object.assign(t, e), u = Object.assign(u, e), t) : {};
        }, function(e) {
            return new r(function(e, t) {
                setTimeout(function() {
                    i(o).then(e).catch(t);
                }, 2e3);
            });
        });
    });
};