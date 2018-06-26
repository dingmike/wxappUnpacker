Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            title: "",
            list: [],
            activeKey: "",
            open: !1
        };
    },
    onLoad: function() {},
    methods: {
        callClickCloseCoupon: function() {
            this.setData({
                showList: !1,
                open: !1
            }), this.data.activeKey || this.$parent.setData({
                openRepayStage: !1
            });
        },
        formSubmitHandler: function(t) {
            var e = t.detail.formId;
            this.$root.$logForm(e, 2), this.delegate(t.detail);
        },
        delegate: function(t) {
            this.$parent.delegate(t);
        }
    }
};