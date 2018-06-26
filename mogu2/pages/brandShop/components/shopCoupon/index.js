function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../../../../common/utils/imgUrlTool")), e = t(require("../../../../common/m")).default.MWP;

exports.default = {
    data: function() {
        return {
            shopInfo: {},
            brandCouponBg: "",
            shopCouponBg: ""
        };
    },
    onLoad: function() {},
    onReady: function() {
        this.isRequesting = !1;
    },
    methods: {
        init: function(t) {
            var e = this, n = o.default.getWidthSuffix("https://s10.mogucdn.com/mlcdn/c45406/170912_4ai1f9k35b02aje0jgb9ka0bi032a_718x140.png", 718), a = o.default.getWidthSuffix("https://s10.mogucdn.com/mlcdn/c45406/170912_6073965h7ibdidg302g88k8aj39he_718x140.png", 718), i = t.shopInfo;
            this._toast = t.$toast, i && i.promotion && i.promotion.length > 0 && (i.promotion.map(function(t) {
                t.couponEndTimeText = t.couponEndTime ? e._formatDate(t.couponEndTime, "YYYY.MM.DD") : "", 
                t.couponStartTimeText = t.couponStartTime ? e._formatDate(t.couponStartTime, "YYYY.MM.DD") : "";
            }), this.setData({
                shopInfo: i,
                brandCouponSuffixBg: n,
                shopCouponSuffixBg: a
            }));
        },
        couponHandle: function(t) {
            var o = t && t.currentTarget && t.currentTarget.dataset || {}, e = o.campId || "", n = o.shopId || "";
            e && n ? !this.isRequesting && this._getCoupon(e, n) : this._toast.show("小伙伴们太热情啦，先看看其他的吧~");
        },
        _getCoupon: function(t, o) {
            var n = this;
            wx.showNavigationBarLoading(), this.isRequesting = !0, e.request("mwp.ford.getShopCoupon", "1", {
                campId: t,
                shopId: o
            }).then(function(t) {
                t ? "SUCCESS" === t.ret ? n._toast.show("神手一只！优惠券已领取哦~") : "FAIL_BIZ_50006" === t.ret ? n._toast.show("已经领过啦，试试其他的吧~") : n._toast.show("小伙伴们太热情啦，先看看其他的吧~") : n._toast.show("小伙伴们太热情啦，先看看其他的吧~"), 
                n._hideNavigateLoading(), n.isRequesting = !1;
            }).catch(function(t) {
                n._toast.show("小伙伴们太热情啦，先看看其他的吧~"), n._hideNavigateLoading(), n.isRequesting = !1;
            });
        },
        _hideNavigateLoading: function(t) {
            var o = t || 400, e = setTimeout(function() {
                wx.hideNavigationBarLoading(), clearTimeout(e);
            }, o);
        },
        _formatDate: function(t, o) {
            var e = new Date(1e3 * t), n = e.getFullYear(), a = e.getMonth() + 1;
            a = a <= 9 ? "0" + a : a;
            var i = e.getDate();
            i = i <= 9 ? "0" + i : i;
            var s = e.getHours();
            s = s <= 9 ? "0" + s : s;
            var u = e.getMinutes();
            u = u <= 9 ? "0" + u : u;
            var r = e.getSeconds();
            return r = r <= 9 ? "0" + r : r, o.replace("YYYY", n).replace("MM", a).replace("DD", i).replace("hh", s).replace("mm", u).replace("ss", r);
        }
    }
};