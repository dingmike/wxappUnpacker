Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../../../common/m");

exports.default = {
    data: function() {
        return {
            isShow: !1,
            image: "https://s3.mogucdn.com/mlcdn/c45406/180228_68h6kgj87773a3gjk047hg70a5k75_750x68.png"
        };
    },
    components: {},
    onLoad: function() {
        var t = this;
        this.$root.$wrapper.$on("$launchApp.isShow", function(e) {
            t.setData({
                isShow: e
            });
        });
    },
    methods: {
        init: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.setData({
                backUrl: decodeURIComponent(t.backUrl || "")
            });
        },
        initMceData: function(t) {
            var e = t.default && t.default.list, o = e && e.length > 0 && e[0], r = o.image, a = o.errMsg;
            this.errMsg = a, this.setData({
                image: r
            });
        },
        handleCloseLaunch: function() {
            this.setData({
                isShow: !1
            }), this.$root.$wrapper && this.$root.$wrapper.$emit("$launchApp.isShow", !1);
        },
        launchAppError: function(e) {
            var o = e.detail.errMsg, r = t.System.getSync("systemInfo");
            "invalid scene" === o ? this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", o) : "ios" === r.platform && this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", this.errMsg);
        }
    }
};