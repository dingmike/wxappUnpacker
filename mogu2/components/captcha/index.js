Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/m.js")).default.MWP;

exports.default = {
    name: "captcha",
    data: function() {
        return {
            show: !1,
            imgUrl: "",
            loading: !0,
            showValidateResult: !1,
            validateResult: "失败",
            clickCount: [ 0, 0, 0, 0 ],
            code: null
        };
    },
    methods: {
        init: function() {
            this.setData({
                show: !0
            }), this.refreshImg();
        },
        refreshImg: function() {
            var e = this;
            this.setData({
                loading: !0,
                showValidateResult: !1,
                clickCount: [ 0, 0, 0, 0 ],
                code: null
            }), t.request("mwp.shieldcaptain.keyActionlet", "1", {}).then(function(t) {
                return t.data.code;
            }).then(function(t) {
                return e.setData({
                    code: t
                }), e.downloadImg(t);
            }).then(function(t) {
                e.setData({
                    imgUrl: t,
                    loading: !1
                });
            });
        },
        handleClick: function(t) {
            if (!this.data.showValidateResult) {
                var e = t.currentTarget.dataset.index, a = Array.prototype.slice.call(this.data.clickCount);
                a[e]++, this.setData({
                    clickCount: a
                });
            }
        },
        handleRefresh: function() {
            this.data.showValidateResult || this.refreshImg();
        },
        validate: function() {
            var e = this;
            return new Promise(function(a, n) {
                e.setData({
                    loading: !0
                }), t.request("mwp.shieldcaptain.validateActionlet", "1", {
                    captkey: e.data.code,
                    captcode: e.data.clickCount.join("_")
                }).then(function(t) {
                    return e.setData({
                        loading: !1,
                        showValidateResult: !0,
                        validateResult: t.data.result ? "成功" : "失败"
                    }), "SUCCESS" === t.ret ? a({
                        success: !0,
                        msg: "验证通过",
                        key: e.data.code,
                        code: e.data.clickCount.join("_")
                    }) : (setTimeout(function() {
                        e.refreshImg();
                    }, 500), a({
                        success: !1,
                        msg: t.msg,
                        key: e.data.code,
                        code: e.data.clickCount.join("_")
                    }));
                }).catch(function(t) {
                    return n(t);
                });
            });
        }
    },
    downloadImg: function(e) {
        return new Promise(function(a, n) {
            t.request("mwp.shieldcaptain.aPPCaptchaActionlet", "1", {
                code: e
            }).then(function(t) {
                a("data:image/jpg;base64," + t.data.data);
            }).catch(function(t) {
                n(t);
            });
        });
    }
};