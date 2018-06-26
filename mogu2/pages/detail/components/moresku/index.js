Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    onLoad: function() {},
    methods: {
        init: function(e) {
            var t = this;
            this.$root.$wrapper.$on("$sku.choose", function(e) {
                var r = e.message;
                t.setData({
                    message: r
                });
            }), e.sizeHelper && this.setData({
                sizeHelper: e.sizeHelper
            });
        },
        onMoreSkuClick: function(e) {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$bottomBar.bannerClickHandler", e, "banner");
        }
    }
};