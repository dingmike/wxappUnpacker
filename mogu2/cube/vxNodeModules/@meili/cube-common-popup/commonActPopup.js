Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    name: "common-act-popup",
    props: {
        showPopup: {
            type: Boolean,
            default: function() {
                return !1;
            }
        },
        popSetting: {
            type: Object,
            default: function() {
                return {};
            }
        },
        btnCallback: {
            type: Function,
            default: function() {
                console.log("按钮点击~");
            }
        },
        closeCallback: {
            type: Function,
            default: function() {
                console.log("弹窗关闭~");
            }
        }
    },
    watch: {
        showPopup: function(t, i) {
            if ("boolean" != typeof t) return !1;
            t ? this._show() : this._hide();
        },
        popSetting: function(t, i) {
            this.backgroundImg = t.backgroundImg, this.showBtn = t.showBtn, this.wxPopLink = t.wxPopLink, 
            this.h5PopLink = t.h5PopLink, this.acm = t.acm, this.wxa_link = t.wxa_link, this.wxa_appId = t.wxa_appId;
        }
    },
    created: function() {},
    data: function() {
        return {
            isShow: !1,
            showClose: !0,
            width: parseInt(this.popSetting.width, 10) / 100 || "4.8",
            height: parseInt(this.popSetting.height, 10) / 100 || "6.6",
            backgroundImg: this.popSetting.backgroundImg || "",
            showBtn: this.popSetting.showBtn || !1,
            wxPopLink: this.popSetting.wxPopLink || "",
            h5PopLink: this.popSetting.h5PopLink || "",
            acm: this.popSetting.acm,
            wxa_appId: this.popSetting.wxa_appId,
            wxa_link: this.popSetting.wxa_link
        };
    },
    methods: {
        jumpFun: function(t) {
            var i = t.target.dataset, o = i.href, n = i.xcxHref, s = i.acm;
            this.$logE("016000306"), wx.isH5 ? (o = o.indexOf("?") > 0 ? o + "&acm=" + s : o + "?acm=" + s, 
            window.logger.goTo(o)) : this.wxa_link && this.wxa_appId ? this.vx_launch(this.wxa_link, {
                appId: this.wxa_appId
            }, t) : this.vx_navigate(n, {}, t);
        },
        clickClose: function(t) {
            this.isShow = !1, this.closeCallback && this.closeCallback();
        },
        clickBtn: function(t) {
            this.$root.$logForm(t.detail.formId, 2), this.isShow = !1, this.btnCallback && this.btnCallback();
        },
        _triggerLazyMotion: function() {
            try {
                this.triggerLazyMotion();
            } catch (t) {
                console.log(t);
            }
        },
        _show: function() {
            var t = this;
            this.isShow = !0, this.$logE("016000305"), wx.isH5 ? this.$nextTick(function() {
                t._triggerLazyMotion();
            }) : this.$vm.setData({
                isShow: !0
            }, function() {
                t._triggerLazyMotion();
            });
        },
        _hide: function() {
            this.isShow = !1;
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};