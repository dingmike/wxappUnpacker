function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), n = e(require("../../common/im/index")), r = t.default.Promise, u = {}, o = {}, s = function(e) {
    var n = e.shopIdList;
    return u[n] ? u[n] : u[n] = t.default.MWP.request("mwp.imgolf.shopOnlineStatus", "1", e).then(t.default.MWP.filterResult).then(function(e) {
        return u[n] = null, e;
    }, function(e) {
        throw console.error("getStatus error", e), u = {}, e;
    });
};

exports.default = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = [], u = {};
    return e.map(function(e) {
        o[e] ? u[e] = o[e] : t.push(e);
    }), t.length <= 0 ? r.resolve(u) : n.default.getAppId().then(function(n) {
        var r = {
            appId: n,
            shopIds: t.join(",")
        };
        return s(r).then(function(t) {
            var n = t.shopOnlineStatus;
            return console.warn("getStatus", e, n), t ? (u = Object.assign(u, n), o = Object.assign(o, n), 
            u) : {};
        }, function() {
            return s(r);
        });
    });
};