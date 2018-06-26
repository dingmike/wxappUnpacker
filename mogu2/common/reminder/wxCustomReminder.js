Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    api: "mwp.walch.PushMessageActionlet",
    versions: "1.0"
}, t = {
    api: "mwp.walch.PushItemNoticeActionlet",
    versions: "2.0"
}, i = {
    api: "mwp.walch.BatchPushMessageActionlet",
    versions: "1.0"
}, s = e, n = "", a = {}, r = !1, c = !1;

try {
    c = !(!wx || wx.isH5);
} catch (e) {
    console.log("不是微信环境不可使用wxCustomReminder");
}

var o = "", u = "", d = "";

if (c) {
    var m = require;
    o = m("../../common/utils/cache.js").default, d = m("../../common/m").default, u = d.MWP;
} else d = window.M, u = d.MWP;

var g = {
    getReminderStatus: function(e) {
        var t = {}, i = (e = e.wxConfig || {}).reminderType;
        return i ? (t[e.bizType_xcx] = !1, "goods-single" === i && c && (t[e.bizType_xcx] = !(!o || !o.get("mogu-remind-" + e.bizType_xcx + "_" + e.activityId + "_" + e.bizIds))), 
        t) : (console.error("lost reminderType when getReminderStatus"), !1);
    },
    setReminder: function(e, t) {
        getCurrentPages().length > 0 && getCurrentPages()[0].$logE && getCurrentPages()[0].$logE("016000116", {
            status: "on"
        });
        var i = {
            reminderType: "single",
            aheadTime: 10,
            channel: "300"
        };
        if (e = e.wxConfig || {}, "goods-single" === (e = Object.assign(i, e)).reminderType) {
            var s = g.getReminderStatus({
                wxConfig: e
            });
            (s = s[e.bizType_xcx]) ? t && t({
                status: "fail",
                msg: "已经设置过提醒了~"
            }) : c && p(e, function(e) {
                t && t(e);
            });
        } else c && p(e, function(e) {
            t && t(e);
        });
    },
    cancelReminder: function() {}
}, l = function(e, t) {
    if ("goods-single" === e && t) {
        var i = "mogu-remind-" + a.bizType_xcx + "_" + a.activityId + "_" + a.bizIds, s = t;
        c && o && o.put(i, s, {
            persistent: !0
        });
    }
}, p = function(c, o) {
    var d = 0, m = (a = c).reminderType;
    switch (a.startTime && (d = a.startTime - 60 * a.aheadTime), a.bizIds = a.bizIds + "", 
    m) {
      case "single":
        s = e, n = {
            bizType: a.bizType_xcx,
            bizId: a.bizIds.split(",")[0],
            time: d,
            startTime: a.startTime
        };
        break;

      case "goods-single":
        s = t, n = {
            bizType: a.bizType_xcx,
            bizId: a.bizIds,
            time: d,
            startTime: a.startTime,
            activityId: a.activityId,
            channel: a.channel
        };
        break;

      case "batch":
        s = i, n = {
            bizType: a.bizType_xcx,
            bizIdList: a.bizIds
        };
        break;

      default:
        o && o({
            status: "fail",
            msg: "提醒的事件类型不存在~"
        });
    }
    n = Object.assign({}, n, a.extraData), s && n && !r ? (r = !0, u && u.request(s.api, s.versions, n).then(u.filterResult).then(function() {
        r = !1, l(m, d), o && o({
            status: "success",
            msg: "设置提醒成功"
        });
    }).catch(function(e) {
        r = !1;
        var t = {
            status: "fail",
            msg: "设置提醒失败~"
        };
        e && e.code && "FAIL_BIZ_4003" === e.code ? t.msg = "请不要;设置过多提醒" : e && e.code && "FAIL_BIZ_4006" === e.code && (t.msg = "已设置提醒", 
        "goods-single" === m && (t = {
            status: "success",
            msg: "设置提醒成功"
        }, l(m, d))), o && o(t);
    })) : r = !1;
}, f = function() {
    return Math.floor(new Date().getTime() / 1e3);
}, b = function() {
    var e = f(), t = /^mogu-remind-/;
    o && o.put("remind-cleanup-date", e, {
        persistent: !0
    }), o && o.forEach(function(i, s) {
        if (t.test(s)) {
            var n = +(o && o.get(s));
            n < e && e - n > 86400 && o && o.remove(s);
        }
    });
};

c && function() {
    var e = o && o.get("remind-cleanup-date"), t = f();
    e ? t - e > 86400 && b() : o && o.put("remind-cleanup-date", t, {
        persistent: !0
    });
}(), exports.default = g;