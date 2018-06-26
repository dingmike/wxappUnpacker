function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = t(require("../sku/index")), i = t(require("../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {
            isSkuShow: null,
            cartShow: !1,
            confirmText: "确认",
            zIndex: 200
        };
    },
    components: {
        sku: s.default
    },
    onLoad: function() {},
    methods: {
        hideSku: function() {
            var t = this;
            this.$mask && this.$mask.hide(), this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.hide"), 
            this.setData({
                isSkuShow: !1
            }), setTimeout(function() {
                t.setData({
                    isSkuShow: null
                }), t.closeSkuEnd && t.closeSkuEnd(), t.context && "function" == typeof t.context.closeSkuEnd && t.context.closeSkuEnd();
            }, 300), this.closeSkuStart && this.closeSkuStart(), this.context && "function" == typeof this.context.closeSkuStart && this.context.closeSkuStart();
        },
        showSku: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = t.isCartShow, i = void 0 !== s && s, o = t.isBuyShow, e = void 0 !== o && o, a = t.buttonStatus, r = void 0 === a ? {
                cart: {
                    text: ""
                },
                buy: {
                    text: ""
                }
            } : a, u = t.isDisabled, n = void 0 !== u && u, h = t.type, c = void 0 === h ? "" : h, d = t.zIndex, k = t.buyType, S = void 0 === k ? "buy" : k, l = t.cartType, m = void 0 === l ? "cart" : l;
            d = d || this.data.zIndex, this.$mask && this.$mask.show(), this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show"), 
            this.setData({
                isSkuShow: !0,
                cartShow: "banner" === c,
                isCartShow: i,
                isBuyShow: e,
                buttonStatus: r,
                isDisabled: n,
                type: c,
                zIndex: d,
                buyType: S,
                cartType: m
            });
        },
        onInnerClick: function() {},
        onConfirmSku: function(t) {
            var s = t.detail.formId;
            this.$root.$logForm(s, 2);
            var i = t.currentTarget.dataset.type, o = this.$sku.data.choose, e = o && o.sku;
            if (!this.data.isDisabled) {
                if (!e) return this.$toast && this.$toast.show("请选择商品规格"), void (this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", "请选择商品规格"));
                this.confirmSku && this.confirmSku(o, i), this.context && "function" == typeof this.context.confirmSku && this.context.confirmSku(o, i);
            }
        },
        init: function(t) {
            this.context = this.context || t.context, this.$toast = this.$toast || t.$toast, 
            this.$mask = this.$mask || t.$mask, this.confirmSku = this.confirmSku || t.confirmSku, 
            this.closeSkuStart = this.closeSkuStart || t.closeSkuStart, this.closeSkuEnd = this.closeSkuEnd || t.closeSkuEnd;
            var s = t.isPresale || !1, i = t.deposit || "", o = t.totalPrice || "", e = t.isSkuShow || this.data.isSkuShow || null;
            e && (this.$mask && this.$mask.show(), this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show")), 
            this.$sku.init({
                skuInfo: t.skuInfo,
                defaultImage: t.defaultImage,
                sizeHelper: t.sizeHelper,
                maxNumber: t.maxNumber,
                itemId: t.itemId,
                activityId: t.activityId,
                $toast: this.$toast,
                showLimitTips: t.showLimitTips,
                skuType: t.skuType
            }), this.setData({
                isPresale: s,
                deposit: i,
                totalPrice: o,
                isSkuShow: e
            });
        },
        setOptions: function(t) {
            this.init(t);
        },
        showBigImage: function() {
            var t = this.$sku.data.choose, s = t && t.goods && t.goods.img;
            if (s) {
                var o = i.default.getWidthSuffix(s, 750);
                wx.previewImage({
                    current: o,
                    urls: [ o ]
                });
            }
        }
    }
};