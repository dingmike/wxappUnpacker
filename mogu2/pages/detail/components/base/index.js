function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return "object" == (void 0 === t ? "undefined" : s(t)) && null !== t;
}

function r(t) {
    if (!e(t) || "[object Object]" != Object.prototype.toString.call(t)) return !1;
    var r = Object.getPrototypeOf(t);
    if (null === r) return !0;
    var o = Object.prototype.hasOwnProperty.call(r, "constructor") && r.constructor;
    return "function" == typeof o && o instanceof o && Function.prototype.toString.call(o) == Function.prototype.toString.call(Object);
}

function o(t) {
    var e = 0;
    for (var r in t) t.hasOwnProperty(r) && e++;
    return 0 === e;
}

function n() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    for (var i in e) e.hasOwnProperty(i) && (r(e[i]) && !o(e[i]) ? t[i] = n(t[i], e[i]) : t[i] = e[i]);
    return t;
}

function i(t) {
    var e = /^http\:\/\/i\.meilishuo\.net\//;
    return !(!/\/([a-zA-Z0-9]{28})_/.test(t) && !e.test(t));
}

function a() {
    var t = "https://s17.mogucdn.com/mlcdn/c45406/171225_19618fb4d8b8hkgd284kj3k73hl52.html";
    return h.get({
        pid: 97290
    }).then(function(e) {
        if (e.list && e.list.length > 0) {
            var r = {};
            return e.list.map(function(t) {
                r[t.type] = t;
            }), r.detail.url;
        }
        return t;
    }).catch(function() {
        return t;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getMergedShopRecommend = exports.generatePicture = exports.getSharePicture = exports.putShareParams = exports.responseErrorhandle = exports.responseSuccessHandle = exports.handleRequestError = exports.fn = exports.PageStatus = exports.Constant = void 0;

var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.getAddCartLottery = function(t, e, r) {
    var o = this;
    f.request("mwp.aston.simpleGamePort", "2", {
        activityCode: t
    }).then(f.filterResult).then(function(t) {
        var n = t.giftContent, i = n && n.giftName || "", a = e.filter(function(t) {
            return t.giftKey === i;
        });
        a.length <= 0 && (a = e.filter(function(t) {
            return "0" === t.giftKey;
        }));
        var s = a.filter(function(t) {
            return t.itemTag && r && r.length > 0 && r.indexOf(t.itemTag);
        });
        s.length <= 0 && (s = a.filter(function(t) {
            return !t.itemTag;
        }));
        var c = s, u = c && c.length > 0 && c[0].image || "";
        o.$mask && o.$mask.show(), o.$root.$wrapper && o.$root.$wrapper.$emit("$mask.show"), 
        o.setData({
            lotteryResultImage: u,
            isLotteryResultShow: !0
        });
    }).catch(function(t) {
        console.log(t);
    });
};

var c = t(require("../../../../common/m")), u = t(require("../../../../common/service/user")), l = t(require("../../../../common/utils/cache")), p = t(require("../../../../common/utils/imgUrlTool")), f = c.default.MWP, h = c.default.MCE, g = c.default.fn.sendMsg, d = (exports.Constant = {
    ANIMATION_TIME: 400
}, exports.PageStatus = {
    NO_REQUEST: "NO_REQUEST",
    REQUEST_SUCCESS: "REQUEST_SUCCESS",
    REQUEST_ERROR: "REQUEST_ERROR",
    ITEM_ERROR: "ITEM_ERROR"
}), m = (exports.fn = {
    getFullUrl: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!t) return null;
        t = t.split("?").slice(0, 2).join("?");
        var r = [];
        Object.keys(e).forEach(function(t) {
            e[t] && r.push(t + "=" + encodeURIComponent(e[t]));
        });
        var o = "";
        return r && r.length > 0 && (o = t.indexOf("?") > -1 ? "&" : "?"), "" + t + o + r.join("&");
    },
    getImageSize: function(t) {
        var e = 0, r = 0;
        if (t) {
            var o = t.match(/_(\d+)x(\d+)\./);
            i(t) || (r = Number(o[1]), e = Number(o[2]));
        }
        return {
            width: r,
            height: e
        };
    }
}, exports.handleRequestError = function(t) {
    console.log(t), g(t, {
        _author: "changsheng",
        threshold: 1
    }), u.default.showUserError(t) || (this.$toast && this.$toast.show(t.message), this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", t.message));
}, exports.responseSuccessHandle = function(t, e) {
    var r = t.success, o = t.fail, i = t.done, a = t.itemId, s = t.activityId, c = e.result && e.result.esi || "";
    try {
        e = n(e, JSON.parse(c));
    } catch (t) {}
    if (e.status && 1001 === e.status.code) r && "function" == typeof r && r.call(this, e.result); else {
        var u = e.status && e.status.msg || "商品信息错误";
        this.$toast.show(u), this.setData({
            pageStatus: d.ITEM_ERROR
        }), this.$errorPage.init({
            type: "NOT_FOUND",
            title: f.getGlobalEnv() === f.Env.Release ? "" : u
        }), "商品不存在" !== u && (u += "itemId:" + a + ";activityId:" + s, g(new Error(u), {
            _author: "changsheng,xiaoyao",
            threshold: 1
        })), o && "function" == typeof o && o.call(this, u);
    }
    this.$loading.hide(), wx.hideNavigationBarLoading(), this.loadingFlag = !1, i && "function" == typeof i && i.call(this, e);
}, exports.responseErrorhandle = function(t, e) {
    var r = t.itemId, o = t.activityId, n = t.done;
    console.log("error", e.code + ":" + e.message), this.setData({
        pageStatus: d.REQUEST_ERROR
    }), this.$errorPage.init({
        type: "REQUEST_ERROR",
        callback: this.getItemData.bind(this, r, o),
        title: f.getGlobalEnv() === f.Env.Release ? "" : e.toString()
    }), g(e, {
        _author: "changsheng",
        threshold: 1
    }), this.$loading.hide(), wx.hideNavigationBarLoading(), this.loadingFlag = !1, 
    n && "function" == typeof n && n.call(this, e);
}, exports.putShareParams = function(t) {
    var e = t.url, r = t.topImages, o = void 0 === r ? [] : r, n = t.priceInfo, i = void 0 === n ? {} : n, a = t.itemInfo, s = void 0 === a ? {} : a, c = t.countdown, u = void 0 === c ? {} : c, p = i.currency, f = i.nowPrice, h = i.priceSplit, g = i.highNowPrice, d = i.oldPrice, m = i.priceTags, v = {
        page: (e = e.split("?"))[0] || "",
        scene: e[1] || "",
        topImage: o[0] || "",
        title: s.title || "",
        currency: p || "¥",
        nowPrice: f || "",
        priceSplit: h || "~",
        highNowPrice: g || "",
        oldPrice: d || "",
        priceTags: m || [],
        topBanner: u.image || ""
    };
    l.default.put("detail.shareparams", v);
}, exports.getSharePicture = function(t) {
    var e = l.default.get("detail.shareparams"), r = /[^\x00-\xff]/g, o = {
        topImage: p.default.getGoodsRatioSuffix(e.topImage, 450, "3:4", !1),
        oldPrice: e.oldPrice ? "" + e.currency + e.oldPrice : "",
        tag: e.priceTags.length > 0 ? e.priceTags[0].text : ""
    };
    o.tagBg = {
        width: o.tag ? 15 * o.tag.replace(r, "**").length + 24 : 0
    }, a().then(function(r) {
        m({
            appKey: "16c",
            url: r,
            params: Object.assign({}, e, o),
            success: function(e) {
                t && "function" == typeof t && e && t.call(void 0, e.surl);
            }
        });
    });
}, exports.generatePicture = function(t) {
    var e = t.appKey, r = t.url, o = t.params, n = void 0 === o ? {} : o, i = t.success, a = t.error, s = t.complete;
    c.default.requestManager.sendRequest({
        url: "https://log.mogujie.com/wxmedia/svg/render",
        method: "GET",
        data: {
            appKey: e,
            url: r,
            params: JSON.stringify(n)
        },
        complete: function(t) {
            s && "function" == typeof s && s.call(this, t);
        },
        success: function(t) {
            var e = t.data, r = e.status, o = e.result;
            r && 1001 === r.code && o ? i && "function" == typeof i && i.call(this, o) : a && "function" == typeof a && a.call(this, t);
        },
        error: function(t) {
            a && "function" == typeof a && a.call(this, t);
        }
    });
});

exports.getMergedShopRecommend = function() {
    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.recommendItemList, r = t.realTimeRecommendItemList, o = [], n = e && e.length || 0, i = r && r.length || 0, a = 0; a < 3; a++) n > a ? o.push(e[a]) : i > a - n && function() {
        var t = r[a - n];
        o.findIndex(function(e) {
            return e.iid === t.iid;
        }) < 0 && o.push(t);
    }();
    return o;
};