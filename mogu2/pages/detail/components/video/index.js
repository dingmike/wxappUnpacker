Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        var t = wx.getSystemInfoSync(), o = 120 * t.windowWidth / 750;
        return {
            isProShow: !1,
            bottom: o / 2,
            height: t.windowHeight - o
        };
    },
    components: {},
    onLoad: function() {
        var t = this;
        this.$root.$wrapper.$on("swiper.video", function(o, e) {
            t.setData({
                url: o,
                cover: e
            });
        });
    },
    methods: {
        init: function() {},
        handleVideoEnd: function() {
            this.setData({
                url: ""
            });
        }
    }
};