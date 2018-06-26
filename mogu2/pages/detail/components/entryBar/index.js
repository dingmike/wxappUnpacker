Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    methods: {
        init: function(t) {
            var i = t.entry, o = void 0 === i ? {} : i, e = o.icon, r = o.tagBgColor, a = o.tagTextColor, n = o.iconWidth, c = o.iconHeight, l = "";
            e && (l += "background-image: url(" + e + ");background-size: 100% 100%;"), r && (l += "background-color: " + r + ";"), 
            a && (l += "color: " + a + ";"), n && (l += "width: " + n + "rpx;"), c && (l += "height: " + n + "rpx;"), 
            this.setData({
                iconStyle: l
            }), this.setData(o);
        },
        onClick: function() {
            this.data.linkUrl && this.$root.$navigate(this.data.linkUrl);
        }
    }
};