function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, e = (o(require("../../../common/m.js")), o(require("../../vxNodeModules/@meili/mgj-mofang-base-components/commonTitle/commonGoodsTitle.js"))), i = o(require("../../vxNodeModules/@meili/mgj-mofang-base-components/commonPrice/commonOriginPrice.js")), s = o(require("../../vxNodeModules/@meili/mgj-mofang-base-components/commonPrice/commonSalePrice.js")), n = {
    name: "app",
    components: {
        commonGoodsTitle: e.default,
        commonOriginPrice: i.default,
        commonSalePrice: s.default
    },
    data: function() {
        var o = this.config;
        return {
            isEmpty: !1,
            topGoodsData: [],
            titleSetting: o.titleSetting[0],
            styleSetting: o.styleSetting[0],
            salePriceConfig: {
                fs: 28
            },
            originPriceConfig: {
                class: "top-goods-orgprice"
            },
            topModuleStyle: this.transformStyleCode({
                marginTop: o.styleSetting[0].marginTop / 100 + "rem"
            })
        };
    },
    mounted: function() {
        var o = this;
        this.$on("__lazy-data__", function(t) {
            o.topGoodsData = t, 0 == o.topGoodsData.length ? o.isEmpty = !0 : o.topGoodsData = o.topGoodsData.slice(0, 10);
        });
    },
    methods: {
        scrollEvt: function() {
            this.triggerLazyMotion();
        }
    }
};

exports.default = {
    componentOptions: n,
    renderComponentsFunc: function(o) {
        if (!this.isEmpty) if (0 == this.topGoodsData.length) ; else if (this.topGoodsData && this.topGoodsData.length > 0 && this.topGoodsData) {
            var e = this.topGoodsData;
            "object" === t(this.topGoodsData) && "[object Array]" == Object.prototype.toString.call(this.topGoodsData) ? e = this.topGoodsData.concat() : "object" === t(this.topGoodsData) && "[object Object]" == Object.prototype.toString.call(this.topGoodsData) && (e = Object.assign({}, this.topGoodsData));
            for (var i in e) {
                var s = this.topGoodsData[i];
                o("mvw-image", {
                    lazyLoad: !0,
                    mode: "scaleToFill",
                    "v-suffix": {
                        mode: "goods",
                        "suffix-ratio": "3:4",
                        "suffix-width": "250"
                    },
                    src: s.image,
                    __vx_class: "goods-image"
                }, {}, "15247322523980_" + i), o("common-goods-title", {
                    styleConfig: {
                        titleInfo: s.title,
                        class: "top_item_title",
                        lineNum: 1
                    }
                }, {}, "15247322523991_" + i), o("common-sale-price", {
                    num: s.discountPrice,
                    styleConfig: this.salePriceConfig,
                    __vx_class: "top-goods-price"
                }, {}, "15247322524182_" + i), o("common-origin-price", {
                    priceNum: s.price,
                    styleConfig: this.originPriceConfig
                }, {}, "15247322524183_" + i);
            }
        }
    }
};