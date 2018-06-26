function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../m")), r = e(require("./util")), u = e(require("./sdk/promise")), i = r.default.getCache("__emoji") || {};

setTimeout(function(e) {
    var o = 6 === e ? 19 : 0;
    return i && i[o] ? u.default.resolve(i[o]) : t.default.MWP.request("mwp.imgolf.listEmoticon", 1, {
        groupId: o
    }).then(function(e) {
        var u = t.default.MWP.filterResult(e) || [];
        return i[o] = {}, u.map(function(e) {
            var t = e.tag;
            i[o][t] = e;
        }), r.default.setCache("__emoji", i), i[o];
    });
}), exports.default = function(e) {
    var t = 6 === e ? 19 : 0;
    return i ? i[t] : {};
};