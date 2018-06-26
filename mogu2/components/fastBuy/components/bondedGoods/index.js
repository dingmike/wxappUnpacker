Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            canUseWebView: wx.canIUse && wx.canIUse("web-view"),
            identitySrc: "/pages/web/index?src=" + encodeURIComponent("https://h5.mogujie.com/realname/id_card_upload.html")
        };
    },
    onLoad: function() {},
    methods: {
        goToIdentity: function() {
            this.$parent.$toast.show("需要微信版本升级才能填写相关用户信息哟～");
        }
    }
};