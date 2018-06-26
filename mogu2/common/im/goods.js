function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../m")), t = e(require("./sdk/promise")), n = {};

exports.default = function(e, o, u, a) {
    var d = {
        goodsId: e,
        clientType: "pc"
    };
    o && (d.channelId = o), u && (d.fromType = u), a && (d.activityId = a);
    var i = [ e, o, u, a ].join("_");
    return n[i] ? t.default.resolve(n[i]) : r.default.MWP.request("mwp.imcenter.currentGoods", "1", d).then(function(e) {
        if (!e.data) throw new Error("系统找不到该商品信息");
        var r = e.data;
        return n[i] = r, r;
    });
};