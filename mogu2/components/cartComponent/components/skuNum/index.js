Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    methods: {
        onInput: function(t) {
            var e = t.detail.value;
            this.setData({
                number: e
            });
        },
        closeBox: function() {
            this.setData({
                isShow: !1
            });
        },
        onConfirm: function() {
            var t = this.data, e = this.$parent, s = e.$toast, o = parseInt(t.number || 0), n = t.stockNum;
            if (o < 1) s.show("商品数量应大于0，请重新输入"); else {
                if (o > n) return s.show("商品数量应小于最大库存" + n + "，请重新输入"), void this.setData({
                    number: n
                });
                this.closeBox(), e.modifyNum({
                    stockId: t.stockId,
                    number: o,
                    shopId: t.shopId
                });
            }
        }
    }
};