function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n() {
    l.default.getConfig({
        groupName: "base",
        key: "versionManager",
        listener: t
    }).then(o).catch(function(e) {
        console.log(e), f(e, {
            _author: "changsheng",
            threshold: "1"
        });
    });
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    r(e.forceUpdateVersion) && a(e);
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.recommendVersion, t = e.forceUpdateVersion;
    (r(n) || r(t)) && a(e);
}

function r(e) {
    return e && c(e, u) > 0;
}

function a(e) {
    var n = e.title, t = e.content, o = e.cancelText, r = e.cancelColor, a = e.confirmText, c = e.confirmColor, i = e.hideCancel;
    wx.showModal({
        title: n || "更新提示",
        content: t || "新版本已经准备好，是否重启应用？",
        cancelText: o || "取消",
        cancelColor: r || "#000000",
        confirmText: a || "确定",
        confirmColor: c || "#FB4747",
        showCancel: !i,
        success: function(e) {
            e.confirm && s.applyUpdate();
        }
    });
}

function c(e, n) {
    e = e.split("."), n = n.split(".");
    for (var t = Math.max(e.length, n.length); e.length < t; ) e.push("0");
    for (;n.length < t; ) n.push("0");
    for (var o = 0; o < t; o++) {
        var r = parseInt(e[o]), a = parseInt(n[o]);
        if (r > a) return 1;
        if (r < a) return -1;
    }
    return 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../m")), l = e(require("./houston")), u = i.default.v, f = i.default.fn.sendMsg, s = void 0;

exports.default = (wx.getUpdateManager && wx.getUpdateManager().onUpdateReady(n), 
s);