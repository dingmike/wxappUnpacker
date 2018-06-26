function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = o(require("../coupon/index")), e = require("../base/index"), i = o(require("../../../../common/m")), r = i.default.MWP, n = i.default.fn.sendMsg;

exports.default = {
    data: function() {
        return {
            isDetailShow: null,
            promotions: {},
            $coupon: {
                couponCardImage: "https://s10.mogucdn.com/mlcdn/c45406/171220_4ejfgdl74kgjb62l9jjbe793042gk_400x250.png",
                disabledCardImage: "https://s10.mogucdn.com/p2/170213/117603130_4a8d76d1e2l7b854b0hk76lg97g3a_176x116.png",
                specialCardImage: "https://s10.mogucdn.com/p2/170213/117603130_6i5767h706g683dj35febbc2c37a4_176x116.png"
            }
        };
    },
    components: {
        coupon: t.default
    },
    onLoad: function() {
        this.$on("getShopCoupon", this.getShopCoupon);
    },
    init: function(o, t) {
        var e = o.shopInfo, i = e.userId, r = e.shopId;
        this.getPromotionData(i, r, t.itemId);
    },
    initMceData: function(o) {
        var t = o.default && o.default.list, e = (t && t.length > 0 && t[0]).defaultImage;
        this.setSpecialCardImage(e);
    },
    getPromotionData: function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = this, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        this.$root.$mwp("mwp.ford.getValidShopProList", "1", {
            sellerId: o,
            shopId: e,
            marketType: "market_mogujie",
            itemIds: i
        }).then(r.filterResult).then(function(o) {
            t.setPromotionData(o), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide");
        }).catch(function(o) {
            t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), console.log(o), n(o, {
                _author: "changsheng",
                threshold: 1
            });
        });
    },
    setPromotionData: function(o) {
        var t = 0, e = 0, i = "";
        (o && o.list || []).forEach(function(r) {
            r.isNeedGet ? o.needGet && o.needGet.length > 0 ? o.needGet.push(r) : o.needGet = [ r ] : (o[r.promotionCode] && o[r.promotionCode].list.length > 0 ? (o[r.promotionCode].list.push(r), 
            o[r.promotionCode].desc += "，" + r.limitDesc + r.effectDesc + (1 === r.scope ? "(指定商品享受)" : "")) : o[r.promotionCode] = {
                list: [ r ],
                desc: r.limitDesc + r.effectDesc + (1 === r.scope ? "(指定商品享受)" : "")
            }, i += "，" + r.limitDesc + r.effectDesc), r.isNeedGet || "packageSale" === r.promotionCode || t++, 
            e++;
        }), t > 0 && (o.isReduceContentShow = !0), o.count = e, this.setData({
            promotions: o,
            desc: i.slice(1)
        });
    },
    getShopCoupon: function(o, t) {
        var e = this;
        this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), this.$root.$mwp("mwp.ford.getShopCoupon", "1", {
            campId: o,
            source: 13
        }).then(r.filterResult).then(function() {
            var i = e.data.promotions;
            i.needGet[t].isAlreadGet = !0, e.setData({
                promotions: i
            }), e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", "领取成功"), e.$root.$logE("016000502", {
                CouponID: o,
                IsSuccess: 1
            }), e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide");
        }).catch(function(t) {
            console.log("error", t), e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", t.message), 
            e.$root.$logE("016000502", {
                CouponID: o,
                IsSuccess: 0
            }), e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide");
        });
    },
    methods: {
        onCloseClick: function() {
            var o = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.hide"), this.setData({
                isDetailShow: !1
            }), setTimeout(function() {
                o.setData({
                    isDetailShow: null
                });
            }, e.Constant.ANIMATION_TIME);
        },
        showDetail: function() {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show"), this.setData({
                isDetailShow: !0
            });
        },
        onInnerClick: function() {},
        setSpecialCardImage: function(o) {
            this.$coupon.setData({
                specialCardImage: o || this.$coupon.data.specialCardImage
            });
        }
    }
};