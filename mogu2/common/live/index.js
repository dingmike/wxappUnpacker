Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../m.js")).default.fn.sendMsg, a = 2;

exports.default = {
    encodeLiveParamsForNavigateParam: function(a) {
        var t = "";
        try {
            t = JSON.stringify(a);
        } catch (a) {
            e(a, {
                _author: "jiangfan",
                threshold: 1,
                context: "encodeLiveParamsForNavigateParam"
            });
        }
        return t;
    },
    encodeLiveParamsForNavigateUrl: function(a) {
        var t = "";
        try {
            t = encodeURIComponent(JSON.stringify(a));
        } catch (a) {
            e(a, {
                _author: "jiangfan",
                threshold: 1,
                context: "encodeLiveParamsForNavigateUrl"
            });
        }
        return t;
    },
    decodeLiveParams: function(a) {
        if (!a) return null;
        var t = null;
        try {
            t = JSON.parse(decodeURIComponent(a));
        } catch (a) {
            e(a, {
                _author: "jiangfan",
                threshold: 1,
                context: "decodeLiveParams"
            });
        }
        return console.log(t), t;
    },
    returnToLive: function(e, a) {
        var t = getCurrentPages(), i = t.length > 1 ? t[t.length - 2] : null;
        if (i && -1 !== i.route.indexOf("pages/live/index")) wx.navigateBack({
            delta: 1
        }); else {
            var r = this.decodeLiveParams(e);
            a("/pages/live/index", {
                actorUserId: r.actorId || "",
                roomId: r.roomId || 0,
                acm: r.acm || ""
            });
        }
    },
    gotoDetailPage: function(e, a, t, i) {
        console.log({
            gotoDetailPage: e,
            liveParams: a
        });
        var r = {};
        a && (r.liveParams = this.encodeLiveParamsForNavigateParam(a)), e.cparam && (r.cparam = e.cparam), 
        e.acm && (r.acm = e.acm), i ? t("detail", Object.assign({
            itemId: e.itemId
        }, r)) : e.outerId ? t("rushDetail", Object.assign({
            itemId: e.itemId,
            activityId: e.outerId
        }, r)) : e.togetherGroup && e.togetherGroup.on ? t("pintuanDetail", Object.assign({
            itemId: e.itemId,
            activityId: e.togetherGroup.activityId
        }, r)) : e.liveChannelInfo ? t("/pages/detail/index?pageName=live&itemId=" + e.itemId + "&activityId=" + e.liveChannelInfo.activityId) : t("detail", Object.assign({
            itemId: e.itemId
        }, r));
    },
    gotoGoodsExplainPage: function(e, a, t) {
        console.log({
            gotoGoodsExplainPage: e,
            liveParams: a
        });
        var i = {};
        a && (i.liveParams = this.encodeLiveParamsForNavigateParam(a)), e.cparam && (i.cparam = e.cparam), 
        e.acm && (i.acm = e.acm), t("/pages/live/liveSaleVideo/index", Object.assign({
            itemVideoId: e.explainInfo.id
        }, i));
    },
    getFullUrl: function(e) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!e) return null;
        e = e.split("?").slice(0, 2).join("?");
        var t = [];
        Object.keys(a).forEach(function(e) {
            a[e] && t.push(e + "=" + a[e]);
        });
        var i = "";
        return t && t.length > 0 && (i = e.indexOf("?") > -1 ? "&" : "?"), "" + e + i + t.join("&");
    },
    buildLiveParams: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return Object.assign(e, {
            appId: "11m",
            platform: a
        });
    },
    setPlatfomId: function(e) {
        e && (a = e);
    }
};