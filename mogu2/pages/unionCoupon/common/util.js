Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    0: "系统好像出错了",
    "-1": "领取失败，再领一次吧",
    "-2": "来晚了，活动已结束",
    "-3": "操作太快啦，慢点~",
    "-4": "手机号码输入不正确",
    "-101": "您暂无资格领取该券哦",
    "-102": "该券与商品不匹配，无法领取",
    "-104": "此优惠券仅限新购买用户专享",
    "-201": "分享者不可以领券哦～",
    "-301": "券已抢完",
    "-302": "新人专享优惠券每人仅限领取一张",
    "-303": "你已经领取过了",
    "-403": "来晚了，活动已结束",
    "-407": "券已抢完",
    "-501": "您的账号异常，领取失败~"
};

exports.default = {
    getErrorInfo: function(t) {
        return t ? e[t] || "领券失败" : "领券失败";
    },
    format: function(e, t) {
        var r = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in r) new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[n] : ("00" + r[n]).substr(("" + r[n]).length)));
        return t;
    },
    formatCdn: function(e) {
        return 0 === e.indexOf("http") ? e : "https://s10.mogucdn.com" + e;
    }
};