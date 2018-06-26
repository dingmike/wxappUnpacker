Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    onLoad: function() {},
    methods: {
        onCouponClick: function(t) {
            var e = t.currentTarget, o = e.dataset.id, a = e.dataset.diabled, r = e.dataset.index;
            if (!a) {
                var d = t.detail.formId;
                this.$root.$logForm(d, 2), this.$parent.$emit("getShopCoupon", o, r);
            }
        }
    }
};