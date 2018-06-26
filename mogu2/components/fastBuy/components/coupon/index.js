Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            title: "",
            list: [],
            isExpressList: null,
            activeKey: "",
            shopKey: "",
            $Scope: ""
        };
    },
    onLoad: function() {},
    methods: {
        callClickCloseCoupon: function() {
            this.$parent.setData({
                $couponList: {
                    showList: !1
                }
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