Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
};

exports.getConfig = function(n) {
    n = n || t.default.get("APPID") || r.wxAppList[0].id;
    var o = r.wxAppList.find(function(e) {
        return n === e.id;
    });
    return o = e({}, o, {
        showTab: o.tabs.length > 1
    });
};

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/utils/cache")), r = require("./constant");