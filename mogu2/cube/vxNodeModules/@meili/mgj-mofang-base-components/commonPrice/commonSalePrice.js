Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    name: "common-sale-price",
    props: [ "styleConfig", "num" ],
    data: function() {
        this.num;
        return {};
    },
    computed: {
        salePrice: function() {
            return this.num && this.num > 0 ? parseFloat(this.num) : 0 == this.num ? parseFloat(this.num) : null;
        },
        priceStyle: function() {
            var t = this.styleConfig && this.styleConfig.fs ? "font-size:" + this.styleConfig.fs / 100 + "rem" : "font-size: 0.32rem";
            return this.transformStyleCode(t);
        },
        iconStyle: function() {
            var t = this.styleConfig && this.styleConfig.fs && this.styleConfig.fs < 36 ? "font-size:" + this.styleConfig.fs / 100 + "rem" : "";
            return this.transformStyleCode(t);
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};