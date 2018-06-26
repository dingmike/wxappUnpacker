function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

t(require("../../../common/m.js"));

var i = t(require("./lib/Tips.js")), o = {
    name: "app",
    components: {},
    data: function() {
        return {
            tip: "",
            isShowTip: !0,
            styleConfig: this.config.styleConfig[0]
        };
    },
    mounted: function() {
        this.data = [], this.getMce();
    },
    methods: {
        onShow: function() {
            this.floatTip && this.floatTip.resume();
        },
        onHide: function() {
            this.floatTip && this.floatTip.pause();
        },
        onUnload: function() {
            this.floatTip && this.floatTip.stop();
        },
        getMce: function() {
            var t = this;
            this.$on("__lazy-data__", function(i) {
                t.data = i, t.start();
            });
        },
        start: function(t) {
            var o = this;
            o.floatTip = new i.default(o.data, o.isShowTip, 1e3 * o.styleConfig.interval, function(t, i) {
                o.tip = t, o.isShowTip = i, o.isShowTip && o.triggerLazyMotion && o.triggerLazyMotion();
            }), o.floatTip.start();
        }
    }
};

exports.default = {
    componentOptions: o,
    renderComponentsFunc: function(t) {
        this.tip && this.isShowTip && t("mvw-image", {
            lazyLoad: !1,
            src: this.tip.image,
            "v-suffix": {
                mode: "width",
                "suffix-width": "60"
            },
            __vx_class: "suspend-user-img"
        }, {}, "15247322529630");
    }
};