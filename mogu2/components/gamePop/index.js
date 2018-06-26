Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../mask/index"));

exports.default = {
    name: "gamePop",
    components: {
        mask: t.default
    },
    data: function() {
        return {
            info: null,
            showInfo: !1,
            showContent: !0
        };
    },
    onLoad: function() {
        var t = this;
        this.$on("hideDialog", function() {
            t.close();
        });
    },
    onReady: function() {},
    methods: {
        render: function(t, e) {
            !1 !== e ? t && t.data ? this._renderWin(t) : this._renderFail(t) : this.setData({
                info: t,
                showContent: e
            });
        },
        _renderWin: function(t) {
            var e = {
                bg: "//s10.mogucdn.com/mlcdn/c45406/170519_8423gkead9849gjehhh8gh6jj1ih4_630x714.png",
                title: "恭喜你中奖!"
            }, n = t.data.giftContent;
            t.content = n;
            var i = t.giftType || t.content && t.content.giftType;
            switch (t.giftType = i, i) {
              case "platformCoupon":
              case "shopCoupon":
                e.title = "恭喜获得" + n.giftName;
                break;

              case "card":
              case "itemGift":
              case "welfareItem":
                break;

              case "platPackage":
                e.title = "恭喜获得平台券礼包";
                break;

              case "shopPackage":
                e.title = "恭喜获得店铺券礼包";
                break;

              case "userQual":
                break;

              case "goodsGift":
                e.title = "恭喜获得" + n.giftName, t.content.image = n.picUrl, t.content.name = n.giftName, 
                t.btnType = 1, t.btnLink = "/pages/act/index";
                break;

              case "memberCard":
                e.title = "恭喜你获得会员卡!", e.btnType = 1;
                break;

              case "movieTicket":
                e.title = "恭喜你获得电影票!", e.btnType = 1;
            }
            this._mix(e, t), this.setData({
                info: this.organize(t),
                showContent: !0
            });
        },
        _renderFail: function(t) {
            var e = {
                bg: "//s10.mogucdn.com/mlcdn/c45406/170519_8423gkead9849gjehhh8gh6jj1ih4_630x714.png",
                btnLink: "close",
                btnRightLink: "close"
            };
            this._mix(e, t), this.setData({
                info: t,
                showContent: !0
            });
        },
        _mix: function(t, e) {
            for (var n in t) e[n] = e[n] ? e[n] : t[n];
        },
        organize: function(t) {
            if (t.title = t.content && t.content.hitPopTitle ? t.content.hitPopTitle : t.title || "", 
            t.subTitle = "movieTicket" == t.giftType && t.content ? "兑换码" + t.content.cardCouponCode : t.subTitle || "", 
            t.content && t.content.shareUserName) switch (t.title = t.giftName, t.giftType) {
              case "platformCoupon":
                t.subTitle = "平台通用";
                break;

              case "payPackage":
                t.subTitle = "可叠加使用";
                break;

              case "shopCoupon":
                t.subTitle = (t.content && t.content.shopName) + "店铺";
            }
            return t;
        },
        open: function() {
            this.$mask.show(), this.setData({
                showInfo: !0
            });
        },
        close: function() {
            this.$mask.hide(), this.setData({
                showInfo: !1
            }), this.$parent.$emit("popClose");
        },
        closeBtn: function(t) {
            var e = t.target.dataset;
            if (!e || "close" != e.href && e.href) {
                var n = t.target.dataset.href;
                n && (this.$root.$logE("016000565", {
                    activityCode: this.data.info && this.data.info.activityCode
                }), this.$root.$redirect(n));
            } else this.close();
        }
    }
};