Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../components/cartComponent/index"));

exports.default = {
    data: function() {
        return {
            isLaunchAppShow: !1
        };
    },
    components: {
        cartComponent: t.default
    },
    onLoad: function() {
        var t = this;
        this.$root.$wrapper.$on("$launchApp.isShow", function(e) {
            t.setData({
                isLaunchAppShow: e
            });
        });
    },
    init: function(t, e, o) {
        var n = o.homePage;
        this.homePageConfig = n && n.length > 0 && n[0] || {};
    },
    methods: {
        showCart: function() {
            this.$cartComponent.setData({
                hideEmptyButton: !0
            }), this.$cartComponent.init();
        },
        backToHome: function(t) {
            this.$root.$redirect(this.homePageConfig.href || this.homePageConfig.page || "home", t.currentTarget.dataset);
        }
    }
};