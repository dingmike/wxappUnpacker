function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../../common/utils/imgUrlTool")), i = t(require("../../common/service/user.js"));

exports.default = {
    name: "getCoupon",
    tabLock: 0,
    _now: Date.now || function() {
        return new Date().getTime();
    },
    data: function() {
        return {
            img: "",
            acm: "",
            boxHeight: "180rpx",
            modId: "10016"
        };
    },
    onLoad: function() {},
    onReady: function() {},
    methods: {
        setCoupon: function(t) {
            var e = this;
            this.link = t.link, this.relationKey = t.relationKey, this.$toast = t.$toast, this.pid = t.pid || "56251", 
            this.isLogin = !1, this.getCouponMwpApi = t.getCouponMwpApi || "mwp.diana.couponLaunch", 
            this.getCouponMwpVersion = t.getCouponMwpVersion || "2", i.default.ensure().then(function() {
                e.isLogin = !0, e.$root.$mce_get({
                    pid: e.pid
                }, !0).then(function(t) {
                    var i = t.list[0];
                    e.relationKey = i.relationKey, e.setData({
                        img: o.default.getWidthSuffix(i.img, 700),
                        acm: i.acm || ""
                    });
                }).catch(function() {});
            }).catch(function() {
                e.setData({
                    img: o.default.getWidthSuffix(t.img, 700),
                    acm: ""
                });
            });
        },
        getCoupon: function() {
            var t = this, o = this.getCouponMwpApi || "mwp.diana.couponLaunch", i = this.getCouponMwpVersion || "2";
            this.$root.$mwp(o, i, {
                relationKey: this.relationKey,
                platform: "app"
            }).then(function(o) {
                var i = "";
                i = o && "SUCCESS" === o.ret ? "领券成功！快去我的-优惠券查看" : o.msg || "系统繁忙，请稍后重试", t.$toast && t.$toast.show(i);
            }).catch(function(o) {
                var i = "系统繁忙，请稍后重试";
                o.isUserError && (i = "需要授权登陆，才能领优惠券哟~"), t.$toast && t.$toast.show(i);
            });
        },
        couponSubmitHandler: function(t) {
            var e = this, n = this._now();
            if (!(n - this.tabLock < 2e3)) {
                this.tabLock = n;
                var a = t.detail.formId;
                this.$root.$logForm(a, 2), this.$root.$logE("016000192", {
                    modName: "____领券模块e事件____"
                }), this.link ? this.$root.$redirect(this.link) : this.isLogin ? this.getCoupon() : i.default.ensure().then(function() {
                    e.isLogin = !0, e.$root.$mce_get({
                        pid: e.pid
                    }, !0).then(function(t) {
                        var i = t.list[0];
                        e.relationKey = i.relationKey, e.setData({
                            img: o.default.getWidthSuffix(i.img, 700),
                            acm: i.acm || ""
                        }), e.getCoupon();
                    }).catch(function() {});
                }).catch(function(t) {
                    var o = "系统繁忙，请稍后重试";
                    t.isUserError && (o = "需要授权登陆，才能领优惠券哟~"), e.$toast && e.$toast.show(o);
                });
            }
        }
    }
};