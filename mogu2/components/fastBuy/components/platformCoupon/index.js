Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            availableList: null,
            addOnList: null,
            unAvailableList: null,
            title: "优惠券",
            activeKey: null,
            showList: !1,
            scrollTop: 0
        };
    },
    onLoad: function() {},
    methods: {
        callClickCloseCoupon: function(t) {
            this.$parent.$platformCoupon.setData({
                showList: !1,
                scrollTop: 0
            });
        },
        handleChoosePromotion: function(t) {
            var e = t.currentTarget.dataset.promotionKey;
            this.$parent.$platformCoupon.setData({
                activeKey: e
            });
        },
        delegate: function(t) {
            t.target.id = this.data.activeKey, t.target.dataset = {
                type: "chooseCouponItem"
            }, this.$parent.delegate(t);
        }
    }
};