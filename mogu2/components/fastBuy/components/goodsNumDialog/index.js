Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
};

exports.default = {
    data: function() {
        return {
            state: "colse",
            placeholder: "请输入购买的商品数量",
            counter: 1,
            stock: 1,
            ok: function() {}
        };
    },
    methods: {
        inputGoodsNum: function(t) {
            var e = t.detail.value, o = this.data.stock;
            return +e > o ? (this.$parent.$toast.show("商品数量应小于最大库存" + o + "，请重新输入"), e.slice(0, -1)) : 0 == +e && 1 === e.toString().length ? (this.$parent.$toast.show("商品数量应大于0，请重新输入"), 
            e.slice(0, -1)) : (this.setData({
                counter: isNaN(e) ? 1 : e
            }), isNaN(e) ? 1 : e);
        },
        show: function(e) {
            var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.setData(t({}, o, {
                counter: e,
                state: "show"
            }));
        },
        hide: function() {
            this.setData({
                state: "close",
                counter: 0
            });
        },
        cancelHandler: function() {
            this.hide();
        },
        okHandler: function() {
            var t = this.data.ok;
            "function" == typeof t && t(this.data.counter), this.hide();
        }
    },
    onLoad: function() {}
};