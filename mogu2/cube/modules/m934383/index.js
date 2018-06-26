function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = (t(require("../../../common/m.js")), t(require("../../vxNodeModules/@meili/mgj-mofang-base-components/commonTitle/commonGoodsTitle.js"))), e = t(require("../../vxNodeModules/@meili/mgj-mofang-base-components/commonPrice/commonSalePrice.js")), s = {
    data: function() {
        var t = this.config.baseConfig[0];
        return {
            isRequesting: !0,
            isEmpty: !1,
            brands: [],
            shopSize: this.config.length[0].shopSize,
            goodSize: this.config.length[0].goodSize,
            brandTitle: t.title,
            rightCornorH5Link: t.rightCornorH5Link,
            rightCornorXcxLink: t.rightCornorXcxLink,
            rightCornorText: t.rightCornorText,
            subscriptImg: t.subscriptImg,
            moreStyle: this.transformStyleCode({
                backgroundImage: "url(" + t.moreBg + ")"
            }),
            moduleStyle: this.transformStyleCode({
                marginBottom: this.config.module[0].marginBottom / 100 + "rem",
                marginTop: this.config.module[0].marginTop / 100 + "rem",
                backgroundColor: this.config.module[0].bgColor
            })
        };
    },
    components: {
        commonGoodsTitle: i.default,
        commonSalePrice: e.default
    },
    methods: {
        getData: function() {
            var t = this;
            this.$on("__lazy-data__", function(o) {
                t.isRequesting = !1;
                for (var i = (o || []).slice(0, t.shopSize), e = !0, s = 0; s < i.length; s++) {
                    var r = o[s];
                    r.list.length > 0 && (e = !1), r.list = r.list.slice(0, t.goodSize);
                }
                t.isEmpty = e, t.brands = i;
            });
        },
        scrollEvt: function() {
            this.triggerLazyMotion();
        }
    },
    mounted: function() {
        this.getData();
    }
};

exports.default = {
    componentOptions: s,
    renderComponentsFunc: function(t) {
        if (!this.isEmpty) if (0 === this.brands.length) ; else if (this.brands) {
            var i = this.brands;
            "object" === o(this.brands) && "[object Array]" == Object.prototype.toString.call(this.brands) ? i = this.brands.concat() : "object" === o(this.brands) && "[object Object]" == Object.prototype.toString.call(this.brands) && (i = Object.assign({}, this.brands));
            for (var e in i) {
                var s = this.brands[e];
                if (t("mvw-image", {
                    lazyLoad: !0,
                    src: s.appShopHeadImg,
                    "v-suffix": {
                        mode: "width",
                        "suffix-width": "750"
                    },
                    __vx_class: "brand-box-head-image"
                }, {}, "15247322526610_" + e), t("mvw-image", {
                    lazyLoad: !0,
                    src: this.subscriptImg,
                    "v-suffix": {
                        mode: "width",
                        "suffix-width": "70"
                    },
                    __vx_class: "brand-box-head-subscript"
                }, {}, "15247322526621_" + e), s.list) {
                    var r = s.list;
                    "object" === o(s.list) && "[object Array]" == Object.prototype.toString.call(s.list) ? r = s.list.concat() : "object" === o(s.list) && "[object Object]" == Object.prototype.toString.call(s.list) && (r = Object.assign({}, s.list));
                    for (var n in r) {
                        var a = s.list[n];
                        t("mvw-image", {
                            lazyLoad: !0,
                            src: a.image,
                            "v-suffix": {
                                mode: "goods",
                                "suffix-ratio": "3:4"
                            },
                            __vx_class: "brand-good-image"
                        }, {}, "15247322526622_" + e + "_" + n), t("common-goods-title", {
                            styleConfig: {
                                titleInfo: a.title,
                                class: "brand-good-title"
                            }
                        }, {}, "15247322526623_" + e + "_" + n), "10.00" != a.discountPrice && t("common-sale-price", {
                            num: a.discountPrice.toString(),
                            __vx_class: "brand-good-price"
                        }, {}, "15247322526624_" + e + "_" + n);
                    }
                }
            }
        }
    }
};