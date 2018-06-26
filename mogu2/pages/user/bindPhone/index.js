function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../common/m")), i = e(require("../../../common/base/createPage")), o = e(require("../../../components/toast/index")), n = e(require("../../../components/captcha/index.js")), s = e(require("../../../components/empty/index")), a = e(require("../../../components/countdown/index")), h = e(require("../../../components/loading/index")), c = t.default.MWP, d = (t.default.fn.sendMsg, 
/^1[3|4|5|8][0-9]\d{4,8}$/);

exports.default = (0, i.default)({
    components: {
        toast: o.default,
        captcha: n.default,
        empty: s.default,
        countdown: a.default,
        loading: h.default
    },
    data: {
        disableConfirm: !0,
        input_mobile: "",
        isLoaded: !1,
        isBindMobile: !1,
        $empty: {
            type: 0,
            text: "网络出错啦！"
        },
        error: !1,
        mobile: "",
        countdownStart: !1,
        isFirstGetCode: !0,
        isNeedCaptcha: !1
    },
    onLoad: function() {
        this.telVery = {
            isVeried: !1,
            msg: "请输入手机号"
        }, this.codeVery = {
            isVeried: !1,
            msg: "请输入手机号"
        }, this.fetchCode = 0, this.timer = 0, this.$captcha.init(), this.checkIsBindMobile();
    },
    methods: {
        showLoading: function() {
            this.loading = !0, this.$loading.show(), wx.showNavigationBarLoading();
        },
        hideLoading: function() {
            this.loading = !1, this.$loading.hide(), wx.hideNavigationBarLoading();
        },
        redirect: function() {
            var e = this, t = this.$root.query.redirectUrl;
            this.$toast.show("绑定成功", function() {
                e.$root.$redirect(t && decodeURIComponent(t) || "/pages/home/index");
            });
        },
        startCountdown: function() {
            var e = this;
            this.$countdown.init({
                format: "ss秒后重新获取",
                countdown: 60,
                endCallback: function(t) {
                    e.stopCountdown();
                }
            }), this.setData({
                countdownStart: !0,
                isFirstGetCode: !1
            });
        },
        stopCountdown: function() {
            this.$countdown.stop(), this.setData({
                countdownStart: !1
            });
        },
        checkIsBindMobile: function() {
            var e = this;
            this.showLoading(), c.request("mwp.apollo.profile.mobile.isBindMobile", "1", {}).then(c.filterResult).then(function(t) {
                e.hideLoading(), e.setData({
                    isBindMobile: t.isBindMobile,
                    mobile: t.mobile,
                    isLoaded: !0
                }), wx.setNavigationBarTitle({
                    title: t.isBindMobile ? "更换手机号" : "绑定手机号"
                });
            }).catch(function(t) {
                e.hideLoading(), e.setData({
                    isLoaded: !0,
                    error: !0
                });
            });
        },
        valedateCaptchaForChange: function() {
            var e = this;
            this.loading || (this.showLoading(), this.data.isNeedCaptcha ? this.$captcha.validate().then(function(t) {
                t.success ? e.getChangeMobileSms(t.key, t.code) : (e.hideLoading(), e.$toast.show(t.msg));
            }) : this.getChangeMobileSms());
        },
        getChangeMobileSms: function(e, t) {
            var i = this;
            c.request("mwp.apollo.profile.mobile.getChangeMobileSms", "1", {
                captkey: e,
                captcode: t
            }).then(c.filterResult).then(function(e) {
                i.startCountdown(), i.hideLoading();
            }).catch(function(e) {
                "FAIL_BIZ_40010003" !== e.code && "FAIL_BIZ_40010004" !== e.code || i.data.isNeedCaptcha ? i.$toast.show(e.message) : i.setData({
                    isNeedCaptcha: !0
                }), i.$captcha.refreshImg(), i.hideLoading();
            });
        },
        checkChangeMobileSms: function() {
            var e = this;
            this.codeVery.isVeried && (this.loading || (this.showLoading(), c.request("mwp.apollo.profile.mobile.checkChangeMobileSms", "1", {
                code: this.input_code
            }).then(c.filterResult).then(function(t) {
                e.hideLoading(), e.changeMobileToken = t.changeMobileToken, e.$toast.show("验证成功", function() {
                    e.setData({
                        isBindMobile: !1,
                        isFirstGetCode: !0,
                        isNeedCaptcha: !1
                    }), e.stopCountdown(), e.setInputCode("");
                });
            }).catch(function(t) {
                e.hideLoading(), e.$toast.show(t.message);
            })));
        },
        valedateCaptchaForBind: function() {
            var e = this;
            if (!this.telVery.isVeried) return this.$toast.show(this.telVery.msg), !1;
            this.loading || (this.showLoading(), this.data.isNeedCaptcha ? this.$captcha.validate().then(function(t) {
                t.success ? e.getBindMobileSms(t.key, t.code) : (e.hideLoading(), e.$toast.show(t.msg));
            }) : this.getBindMobileSms());
        },
        getBindMobileSms: function(e, t) {
            var i = this;
            c.request("mwp.apollo.profile.mobile.getBindMobileSms", "1", {
                mobile: this.input_mobile,
                captkey: e,
                captcode: t,
                changeMobileToken: this.changeMobileToken
            }).then(c.filterResult).then(function(e) {
                i.hideLoading(), i.handleRequestForGetBindMobileSms(e);
            }).catch(function(e) {
                "FAIL_BIZ_40010003" !== e.code && "FAIL_BIZ_40010004" !== e.code || i.data.isNeedCaptcha ? i.$toast.show(e.message) : i.setData({
                    isNeedCaptcha: !0
                }), i.$captcha.refreshImg(), i.hideLoading();
            });
        },
        handleRequestForGetBindMobileSms: function(e) {
            var t = this, i = e.status, o = e.confirmItem;
            0 === i ? this.startCountdown() : wx.showModal({
                title: o.title,
                content: o.message,
                confirmText: "解绑账号",
                cancelText: "取消",
                success: function(e) {
                    e.confirm ? (t.confirmToken_5 = o.confirmToken, t.confirmContinueBindMobile(), t.startCountdown()) : e.cancel;
                }
            });
        },
        confirmContinueBindMobile: function() {
            var e = this;
            c.request("mwp.apollo.profile.mobile.confirmContinueBindMobile", "1", {
                confirmToken: this.confirmToken_5
            }).then(c.filterResult).then(function(t) {
                e.$toast.show("验证码已发送，请查看");
            }).catch(function(t) {
                e.$toast.show(t.message || "验证码获取失败！请重新获取");
            });
        },
        checkBindMobileSms: function() {
            var e = this;
            return this.telVery.isVeried ? this.codeVery.isVeried ? void (this.loading || (this.showLoading(), 
            c.request("mwp.apollo.profile.mobile.checkBindMobileSms", "1", {
                mobile: this.input_mobile,
                code: this.input_code,
                changeMobileToken: this.changeMobileToken
            }).then(c.filterResult).then(function(t) {
                e.hideLoading(), e.handleRequest_7(t);
            }).catch(function(t) {
                e.hideLoading(), e.$toast.show(t.message || "绑定失败，请重试！");
            }))) : (this.$toast.show(this.codeVery.msg), !1) : (this.$toast.show(this.telVery.msg), 
            !1);
        },
        handleRequest_7: function(e) {
            var t = this;
            if (0 === e.status) this.redirect(); else {
                var i = e.confirmItem;
                this.confirmToken_7 = i.confirmToken, wx.showModal({
                    title: i.title,
                    content: i.message,
                    confirmText: i.buttons[0].text,
                    cancelText: i.buttons[1].text,
                    success: function(e) {
                        e.confirm ? t.confirmChangeMobile() : e.cancel;
                    }
                });
            }
        },
        confirmChangeMobile: function() {
            var e = this;
            c.request("mwp.apollo.profile.mobile.confirmChangeMobile", "1", {
                confirmToken: this.confirmToken_7
            }).then(c.filterResult).then(function(t) {
                e.redirect();
            }).catch(function(t) {
                e.$toast.show(t.message || "解绑或绑定失败，请重试！");
            });
        },
        setInputMobile: function(e) {
            this.input_mobile = e, this.setData({
                input_mobile: e
            }), this.verifyMobile(e);
        },
        setInputCode: function(e) {
            this.input_code = e, this.setData({
                input_code: e
            }), this.verifyCode(e);
        },
        clearInput: function() {
            this.setInputMobile("");
        },
        getInputMobile: function(e) {
            this.setInputMobile(e.detail.value);
        },
        handleInputMobile: function(e) {
            this.setInputMobile(e.detail.value);
        },
        getInputCode: function(e) {
            this.setInputCode(e.detail.value);
        },
        handleInputCode: function(e) {
            this.setInputCode(e.detail.value);
        },
        verifyMobile: function(e) {
            e ? d.test(e) ? this.telVery = {
                isVeried: !0,
                msg: ""
            } : this.telVery = {
                isVeried: !1,
                msg: "请输入正确的手机号"
            } : this.telVery = {
                isVeried: !1,
                msg: "请输入手机号"
            }, this.setData({
                telVery: this.telVery
            });
        },
        verifyCode: function(e) {
            e ? 6 !== e.length ? this.codeVery = {
                isVeried: !1,
                msg: "请输入6位验证码"
            } : this.codeVery = {
                isVeried: !0,
                msg: ""
            } : this.codeVery = {
                isVeried: !1,
                msg: "请输入验证码"
            }, this.setData({
                codeVery: this.codeVery
            });
        }
    }
});