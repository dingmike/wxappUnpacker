function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = n(require("../m")), e = n(require("../config")), r = t.default.MWP, u = t.default.MCE, i = e.default.im, o = null, f = function() {
    return i ? Promise.resolve(i) : o || (o = u.get({
        pid: 74894
    }).then(function(n) {
        var t = r.TTID, e = n.list;
        if (o = null, !(i = e.find(function(n) {
            return t === n.TTID;
        }))) throw new Error("查找不到该小程序的IM配置,请联系@天吴!");
        return console.warn("im config:", i), i;
    }).catch(function(n) {
        o = null, console.error("麦田接口(74894):", n.message);
    }));
};

exports.default = {
    setApp: f,
    getAppConfig: function() {
        return f();
    },
    getAppNum: function() {
        return f().then(function(n) {
            return n.appNum;
        });
    },
    getNotify: function() {
        return f().then(function(n) {
            return "" + n.notify == "1";
        });
    },
    getAppId: function() {
        return f().then(function(n) {
            return n.appId;
        });
    },
    getAppTitle: function() {
        return f().then(function(n) {
            return n.appTitle;
        });
    },
    getPlatform: function() {
        return f().then(function(n) {
            return n.pf;
        });
    },
    getisMin: function() {
        return f().then(function(n) {
            return n.isMin;
        });
    }
};