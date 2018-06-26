Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../mask/index"));

exports.default = {
    components: {
        mask: t.default
    },
    data: function() {
        return {
            lightSrc: "https://s10.mogucdn.com/mlcdn/c45406/170920_28b9ge46iil7hd8ebd697947bk6gg_750x790.png",
            coinSrc: "https://s10.mogucdn.com/mlcdn/c45406/170920_3f619e6haah4lf1i4je69bld865bc_167x167.png",
            redpacketSrc: "https://s10.mogucdn.com/mlcdn/c45406/171023_6ccb7lkdc90c15elf459dj7l8gb2b_600x480.png",
            topSrc: "https://s10.mogucdn.com/mlcdn/c45406/170925_4aab240l9jke748l6hc4bi09bk4ha_510x163.png",
            backSrc: "https://s10.mogucdn.com/mlcdn/c45406/170925_7h0ga4h0llibka47fa971jg7162f9_510x150.png",
            couponSrc: "https://s10.mogucdn.com/mlcdn/c45406/170921_0jlf8lkf4kj1jka25g1b6h5hldkd0_195x90.png",
            couponbgSrc: "https://s10.mogucdn.com/mlcdn/c45406/171023_26d00g65hb7g4127kfaea0b80i2a6_410x526.png",
            couponFull: "",
            couponCut: "",
            countTime: 5,
            isShowCouponInfo: !1,
            isShowModal: void 0,
            link: ""
        };
    },
    initSearchCoupon: function(t) {
        if (t.lotteryResult && t.lotteryResult.isLucky) {
            var n = t.lotteryResult;
            this.setData({
                isShowModal: !0,
                couponFull: n.title || "",
                couponCut: n.subtitle || "",
                link: n.link || ""
            }), this.initModal(), this.$root.$logE("016000559", {});
        }
    },
    initModal: function() {
        var t = this;
        this.$mask.show(), this.coinEndTime = 500;
        this.rotateCoin(), this.countdown(), setTimeout(function() {
            t.setData({
                isShowCouponInfo: !0
            }), t.hideCoin(), t.showCouponInfo(), t.openTop(), t.popCoupons(), t.showCouponTip(), 
            t.rotateLight(), t.setData({
                animCouponInfo: t.animCouponInfo.export(),
                animTopFront: t.animTopFront.export(),
                animTopBack: t.animTopBack.export(),
                animCoupons: t.animCoupons.export(),
                animCouponTip: t.animCouponTip.export(),
                animLight: t.animLight.export()
            });
        }, 2 * t.coinEndTime);
    },
    countdown: function() {
        var t = this;
        0 == this.data.countTime ? this.colseModal() : setTimeout(function() {
            t.setData({
                countTime: t.data.countTime - 1
            }), t.countdown();
        }, 1e3);
    },
    rotateCoin: function() {
        var t = this;
        this.animCoin = wx.createAnimation({
            duration: this.coinEndTime,
            timingFunction: "ease"
        }), this.rotateCoinY(120), setTimeout(function() {
            t.rotateCoinY(-120);
        }, this.coinEndTime);
    },
    rotateCoinY: function(t) {
        this.animCoin.rotateY(t).step(), this.setData({
            animCoin: this.animCoin.export()
        });
    },
    hideCoin: function() {
        this.animCoin = wx.createAnimation({
            duration: 300,
            timingFunction: "ease-in"
        }), this.animCoin.opacity(0).step(), this.setData({
            animCoin: this.animCoin.export()
        });
    },
    showCouponInfo: function() {
        this.animCouponInfo = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-in"
        }), this.animCouponInfo.opacity(1).step();
    },
    openTop: function() {
        this.animTopFront = wx.createAnimation({
            duration: 300,
            timingFunction: "ease",
            transformOrigin: "100%,100%"
        }), this.animTopFront.rotate3d(1, 0, 0, 90).step(), this.animTopBack = wx.createAnimation({
            duration: 300,
            timingFunction: "ease",
            transformOrigin: "100%,100%",
            delay: 300
        }), this.animTopBack.scaleY(1).step();
    },
    popCoupons: function() {
        this.animCoupons = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease",
            delay: 300
        });
        var t = this.countMoveY();
        this.animCoupons.opacity(1).translateY(t).step();
    },
    countMoveY: function() {
        var t = "";
        try {
            var n = wx.getSystemInfoSync();
            t = n.screenHeight || n.windowHeight || 0;
        } catch (n) {
            var i = wx.getSystemInfoSync();
            t = i.screenHeight || i.windowHeight || 0;
        }
        return -100 * t / 750 || 90;
    },
    showCouponTip: function() {
        this.animCouponTip = wx.createAnimation({
            duration: 300,
            timingFunction: "ease-in",
            delay: 800
        }), this.animCouponTip.opacity(1).step();
    },
    rotateLight: function() {
        this.animLight = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease-in",
            delay: 500
        }), this.animLight.opacity(1).rotate(90).step();
    },
    methods: {
        colseModal: function() {
            if (this.data.isShowModal) {
                var t = wx.createAnimation({
                    duration: 500,
                    timingFunction: "ease-in"
                });
                t.opacity(0).step(), this.setData({
                    isShowModal: !1,
                    animModal: t.export()
                }), this.$mask.hide();
            }
        },
        linkTo: function() {
            var t = this.data.link;
            t && this.$root.$redirect(t, {});
        }
    }
};