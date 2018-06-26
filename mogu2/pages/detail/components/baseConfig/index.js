function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../common/m")), i = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../base/index")), r = t(require("../../../../components/gamePop/index")), o = require("../../../../common/utils/cpcutil"), a = require("../../../../mixins/logger/index"), n = t(require("../../../../common/utils/houston")), s = t(require("../../../../common/service/user")), u = e.default.fn, h = u.sendMsg, c = u.omit, d = i.putShareParams, p = i.fn.getFullUrl, l = e.default.MWP;

exports.default = {
    components: {
        gamePop: r.default
    },
    init: function(t, e) {
        var i = this, r = t.priceInfo, o = void 0 === r ? {} : r, a = t.itemInfo, n = t.topImages, u = t.countdown, h = t.pintuanInfo, l = t.pageInfo, m = t.shareInfo, f = void 0 === m ? {} : m, g = t.userInfo, $ = void 0 === g ? {} : g, I = e.itemId, w = e.activityId, y = e.cparam, v = e.acm, P = e._mgjuuid, b = e.backUrl, L = e._fu, S = f.shareIntegral, _ = f.shareLottery, T = f.shareLog;
        this.uid = $.loginUserId || s.default.uid || "", this.did = wx.getStorageSync("mgj.did"), 
        this._fu = L, l && l.redirectUrl && (l.redirectTips ? this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", l.redirectTips, function() {
            i.$root.$redirect(l.redirectUrl);
        }) : this.$root.$redirect(l.redirectUrl)), l && l.readyTips && this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", l.readyTips), 
        this.itemInfo = a, this.topImages = n, this.setSeo(a), this.initCpcParams({
            itemId: I,
            cparam: y,
            acm: v
        });
        var U = h && h.activityId || w, x = Object.assign({
            businessId: U
        }, c(e, "liveParams")), q = this.$root.$getShareParams("/" + p(this.$root.route, x));
        d({
            url: q,
            priceInfo: o,
            topImages: n,
            itemInfo: a,
            countdown: u
        }), this.initLaunchShow(b), !this.hasPageLoaded && P && L && (this.uid && this.uid !== L && S && this.shareIntegralFun(I), 
        T && this.shareLogFun(I), this.uid && this.uid !== L && _ && this.shareLotteryFun(o.nowPrice, f.shareLotteryInfo)), 
        this.$root.$logE("016000257", {
            businessId: U
        }), this.hasPageLoaded = !0;
    },
    initLaunchShow: function(t) {
        var e = this, i = wx.canIUse("button.open-type.launchApp") && 1036 === (0, a.getScene)() && !!t;
        n.default.getConfig({
            groupName: "detail",
            key: "launchAppSwitch",
            defaultValue: !1
        }).then(function(t) {
            e.$root.$wrapper.$emit("$launchApp.isShow", t && i);
        }).catch(function() {});
    },
    shareIntegralFun: function(t) {
        this.$root.$mwp("mwp.score.doubleScoreClick", "1.0", {
            shareUid: this._fu,
            itemId: t
        }).then(l.filterResult);
    },
    shareLogFun: function(t) {
        this.$root.$mwp("mwp.cpstrack.cpsDependencyTrackActionlet", "1", {
            did: this.did,
            uid: this.uid,
            itemId: t,
            cpsUserId: this._fu,
            bizType: 5,
            refer: this.$root.route
        }).then(l.filterResult);
    },
    shareLotteryFun: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        i.relationKey && this.$root.$mwp("mwp.diana.customStep", "3", {
            relationKey: i.relationKey,
            busiType: "popWinLottery",
            rangeFactor: e,
            shareUserIdUrl: this._fu
        }).then(l.filterResult).then(function(e) {
            i = c(i, "relationKey");
            var r = Object.assign({
                data: e
            }, Object.assign({}, {
                className: "white game-pop-share",
                btnType: 1
            }, i));
            t.$gamePop.render(r), t.$gamePop.open();
        }).catch(function(t) {
            console.log(t);
        });
    },
    initMceData: function(t) {
        var e = t.default && t.default.list, i = (e && e.length > 0 && e[0]).shareTitle;
        this.$root.$wrapper.shareTitle = (i || "") + this.itemInfo.title;
    },
    initCpcParams: function(t) {
        var e = t.itemId, i = t.cparam, r = t.acm;
        (i || this.hasPageLoaded) && (0, o.requestCparam)({
            itemId: e,
            cparam: i,
            acm: r
        }).then(function(t) {
            t.result;
        }).catch(function(t) {
            h(t, {
                _author: "changsheng",
                threshold: 1
            });
        });
    },
    setSeo: function(t) {
        var e = t.title;
        wx.setNavigationBarTitle({
            title: e
        });
    }
};