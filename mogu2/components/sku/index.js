function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/utils/imgUrlTool")), s = t(require("../../common/m")), i = s.default.MCE, o = s.default.MWP, l = s.default.fn.sendMsg;

exports.default = {
    data: function() {
        return {
            number: 1,
            minNumber: 1,
            maxNumber: -1,
            originMaxNumber: -1,
            isNumberShow: !0,
            fullProps: null,
            skuInfo: null,
            choose: null,
            defaultImage: "",
            defaultInstallment: [],
            numberWidth: 100
        };
    },
    formatPrice: function(t) {
        return (t / 100).toFixed(2);
    },
    getPriceRange: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).skus || [], e = t[0] && t[0].nowprice, s = t[0] && t[0].nowprice, i = t[0] && t[0].price, o = t[0] && t[0].price;
        return t.forEach(function(t) {
            var l = t.nowprice, a = t.price;
            l < e && (e = l), l > s && (s = l), a < i && (i = a), a > o && (o = a);
        }), e = this.formatPrice(e), s = this.formatPrice(s), i = this.formatPrice(i), o = this.formatPrice(o), 
        {
            defaultNowPrice: "¥" + e + (e !== s && "~¥" || "") + (e !== s && s || ""),
            defaultOldPrice: "¥" + i + (i !== o && "~¥" || "") + (i !== o && o || "")
        };
    },
    getChoose: function(t, s, i, o, l) {
        var a = l.originMaxNumber, n = l.maxNumber, r = l.minNumber, u = l.number, m = i.totalStock, d = i.canInstallment, c = this.getPriceRange(i), h = c.defaultNowPrice, f = c.defaultOldPrice;
        if (t.sku) {
            t.goods.stock = t.sku.stock, t.goods.price = "¥" + (t.sku.nowprice / 100).toFixed(2), 
            t.goods.oldPrice = "¥" + (t.sku.price / 100).toFixed(2), t.goods.img = t.sku.img || o;
            var g = this.getNumberRange(t.goods.stock, a, n, r, u);
            t.number = g.number, t.numberRange = g;
            var p = this.getInstallment(t.number, t.sku);
            t.installment = this.getInstallmentByNum(p, t.installmentNum), t.installmentAll = p, 
            t.message.title = "已选择：", t.message.class = "goods-choose";
            var b = [];
            t.style && b.push("“" + t.style.name + "”"), t.size && b.push("“" + t.size.name + "”"), 
            t.size || t.style || b.push("“默认”"), d && t.installmentNum && p && p.length > 0 && b.push("“分期购" + t.installment.perPriceText + "”"), 
            t.message.text = b.join(" ");
        } else {
            t.style ? t.goods.stock = s.style.list[t.style.styleId].stock : t.size ? t.goods.stock = s.size.list[t.size.sizeId].stock : t.goods.stock = m;
            var I = this.getNumberRange(t.goods.stock, a, n, r, u);
            t.number = I.number, t.numberRange = I;
            var y = this.getInstallment(t.number, t.sku);
            t.installment = this.getInstallmentByNum(y, t.installmentNum), t.installmentAll = y, 
            t.style ? t.goods.img = s.style.list[t.style.styleId].img || o : t.goods.img = o, 
            t.message.title = "请选择：", t.message.class = "";
            var k = [];
            !t.style && s.style.count > 0 && k.push(s.style.label), !t.size && s.size.count > 0 && k.push(s.size.label), 
            t.message.text = k.join(" "), t.goods.price = h, t.goods.oldPrice = f;
        }
        var v = (t.goods.price || "").split("~"), N = v[0], P = v[1] || "", z = P && "~" || "";
        t.goods.lowPrice = N.slice(1), t.goods.lowPriceUnit = N.slice(0, 1), t.goods.highPrice = P.slice(1), 
        t.goods.highPriceUnit = P.slice(0, 1), t.goods.priceSplit = z;
        var $ = (t.goods.oldPrice || "").split("~"), w = $[0], x = $[1] || "", T = x && "~" || "";
        return t.goods.lowOldPrice = w.slice(1), t.goods.lowOldPriceUnit = w.slice(0, 1), 
        t.goods.highOldPrice = x.slice(1), t.goods.highOldPriceUnit = x.slice(0, 1), t.goods.oldPriceSplit = T, 
        t.goods.smallImg = e.default.getGoodsRatioSuffix(t.goods.img, 200, "2:3"), "function" == typeof this.$root.setSkuChoose && this.$root.setSkuChoose(t), 
        this.$root.$wrapper && this.$root.$wrapper.$emit("$sku.choose", t), t;
    },
    getFullProps: function(t, e) {
        var s = this, i = this.getStyleIdSkus(e), o = {
            dimension: 2,
            types: [ "style", "size" ],
            style: {
                list: {},
                count: 0,
                label: ""
            },
            size: {
                list: {},
                count: 0,
                label: ""
            }
        };
        return 0 === t.length && e.length > 0 ? o.dimension = 0 : t.forEach(function(t) {
            var l = t.label, a = t.list.length;
            t.list.forEach(function(t) {
                var n = t[t.type + "Id"], r = null;
                "style" === t.type && (r = (i[n] || {}).img || null), "style" === t.type ? (o.style.list[n] = s.getStyleSkus(n, e, t, r), 
                o.style.label = l, o.style.count = a, o.style.type = "style", o.style.reverseType = "size") : "size" === t.type && (o.size.list[n] = s.getSizeSkus(n, e, t), 
                o.size.label = l, o.size.count = a, o.size.type = "size", o.size.reverseType = "style");
            });
        }), o;
    },
    getStyleSkus: function(t, e, s, i) {
        var o = {}, l = 0, a = !1;
        return e.forEach(function(e) {
            e.sizeId && e.styleId === t ? (o[e.sizeId] = e, l += e.stock) : e.styleId === t && (o = e, 
            l += e.stock);
        }), 0 === l && (a = !0), {
            filter: o,
            stock: l,
            propItem: s,
            selected: !1,
            disabled: a,
            img: i
        };
    },
    getSizeSkus: function(t, e, s) {
        var i = {}, o = 0, l = !1;
        return e.forEach(function(e) {
            e.styleId && e.sizeId === t ? (i[e.styleId] = e, o += e.stock) : e.sizeId === t && (i = e, 
            o += e.stock);
        }), 0 === o && (l = !0), {
            filter: i,
            stock: o,
            propItem: s,
            selected: !1,
            disabled: l
        };
    },
    getStyleIdSkus: function(t) {
        var e = {};
        return t.forEach(function(t) {
            void 0 !== t.styleId && void 0 === e[t.styleId] && (e[t.styleId] = t);
        }), e;
    },
    getNumberRange: function(t, e, s, i, o) {
        return i = i || this.data.minNumber, s = s || this.data.maxNumber, o = o || this.data.number, 
        e = e || this.data.originMaxNumber, s = e > t ? t : e > 0 ? e : t, o > s && (o = s), 
        i > s && (i = s), o < i && (o = i), {
            minNumber: i,
            maxNumber: s,
            number: o
        };
    },
    setChooseProp: function(t, e) {
        var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = "size" === e ? "style" : "size", o = s.fullProps || this.data.fullProps, l = s.choose || this.data.choose, a = s.skuInfo || this.data.skuInfo, n = s.defaultImage || this.data.defaultImage || "";
        if (!o[e].list[t].disabled) {
            if (l[e] && l[e][e + "Id"] == t ? (l[e] = null, o[e].list[t].selected = !1, l.sku = null) : (l[e] = o[e].list[t].propItem, 
            o[e].list[t].selected = !0), o[e].list[t].filter.stockId ? l.style || l.size ? l.sku = o[e].list[t].filter : l.sku = null : l.style && l.size && (l.sku = o.size.list[l.size.sizeId].filter[l.style.styleId]), 
            l.style) {
                var r = Object.keys(o.style.list), u = l.style.styleId;
                r.forEach(function(t) {
                    t == u || l.size ? t == u && o.size.count > 0 ? Object.keys(o.style.list[t].filter).forEach(function(e) {
                        0 === o.style.list[t].filter[e].stock ? o.size.list[e].disabled = !0 : o.size.list[e].disabled = !1;
                    }) : t != u && (o.style.list[t].selected = !1) : (o.style.list[t].selected = !1, 
                    0 === o.style.list[t].stock ? o.style.list[t].disabled = !0 : o.style.list[t].disabled = !1);
                });
            }
            if (l.size) {
                var m = Object.keys(o.size.list), d = l.size.sizeId;
                m.forEach(function(t) {
                    t == d || l.style ? t == d && o.style.count > 0 ? Object.keys(o.size.list[t].filter).forEach(function(e) {
                        0 === o.size.list[t].filter[e].stock ? o.style.list[e].disabled = !0 : o.style.list[e].disabled = !1;
                    }) : t != d && (o.size.list[t].selected = !1) : (o.size.list[t].selected = !1, 0 === o.size.list[t].stock ? o.size.list[t].disabled = !0 : o.size.list[t].disabled = !1);
                });
            }
            if (!l.style && !l.size) {
                var c = Object.keys(o[e].list), h = Object.keys(o[i].list);
                c.forEach(function(t) {
                    0 === o[e].list[t].stock ? o[e].list[t].disabled = !0 : o[e].list[t].disabled = !1;
                }), h.forEach(function(t) {
                    0 === o[i].list[t].stock ? o[i].list[t].disabled = !0 : o[i].list[t].disabled = !1;
                });
            }
            var f = (l = this.getChoose(l, o, a, n, {})).numberRange;
            this.setData({
                fullProps: o,
                choose: l,
                minNumber: f.minNumber,
                maxNumber: f.maxNumber,
                number: f.number
            });
        }
    },
    setChooseInstallment: function(t) {
        var e = this.data.choose;
        e.installmentNum = e.installmentNum === t ? null : t, e = this.getChoose(e, this.data.fullProps, this.data.skuInfo, this.data.defaultImage, {}), 
        this.setData({
            choose: e
        });
    },
    setInstallmentTag: function(t) {
        var e = this;
        i.get({
            pid: 50418
        }).then(function(s) {
            if (s.list && s.list.length > 0) {
                var i = s.list[0];
                t.freePhases && i.freePhasesText && (i.text = i.freePhasesText.replace("{phases}", t.freePhases)), 
                e.setData({
                    installmentTag: i
                });
            }
        }).catch(function(t) {
            console.log(t), l(t, {
                _author: "changsheng",
                threshold: 1
            });
        });
    },
    setDefaultInstallment: function(t) {
        var e = void 0, s = void 0;
        (t.skus || []).forEach(function(t) {
            var i = t.nowprice, o = t.installment;
            (!s || s > i) && o && (e = o, s = i);
        }), this.defaultInstallment = e;
    },
    getInstallment: function(t, e) {
        var s = this, i = [];
        return (i = e ? e.installment || [] : this.defaultInstallment || []) && i.length > 0 && (i = i.map(function(i) {
            var o = s.getFormatPrice(t * i.fee), l = s.getFormatPrice(t * i.perPrice), a = i.num;
            return {
                feeText: "含服务费" + o + "元/期",
                perPriceText: "¥" + l + "×" + a + "期",
                num: a,
                disabled: !e,
                fee: i.fee,
                perPrice: i.perPrice,
                originPerPrice: l,
                originFee: i.fee > 0 ? o : "0"
            };
        })), i;
    },
    getInstallmentByNum: function(t, e) {
        for (var s = 0; s < t.length; s++) if (t[s].num === e) return t[s];
        return null;
    },
    getFormatPrice: function(t) {
        return (t / 100).toFixed(2);
    },
    initInstallment: function(t) {
        this.setInstallmentTag(t), this.setDefaultInstallment(t);
    },
    showToast: function(t) {
        this.$toast ? this.$toast.show(t) : this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", t);
    },
    methods: {
        onPropClick: function(t) {
            var e = t.currentTarget, s = e.dataset.type, i = e.dataset.id;
            this.setChooseProp(i, s);
        },
        onInstallment: function(t) {
            var e = t.currentTarget, s = e.dataset.num;
            e.dataset.disabled || this.setChooseInstallment(s);
        },
        reduceNumber: function() {
            var t = this.data.minNumber, e = this.data.number;
            e <= t ? e === t && this.showLimitTips && t > 0 && this.showToast("很抱歉，该商品至少购买" + t + "份") : (e--, 
            this.updateSkuInfo(e), this.setNumber(e));
        },
        increaseNumber: function() {
            var t = this.data.maxNumber, e = this.data.number;
            e >= t && t > -1 ? e === t && this.showLimitTips && t > 0 && this.showToast("很抱歉，该商品每位用户至多只能购买" + t + "份") : (e++, 
            this.updateSkuInfo(e), this.setNumber(e));
        },
        inputNumber: function(t) {
            var e = t.detail.value, s = e = parseInt(e, 10), i = this.data.maxNumber, o = this.data.minNumber;
            return e >= o && e <= i ? s = e : e < o ? (this.showToast("很抱歉，该商品至少购买" + o + "份"), 
            s = o) : e > i ? (this.showToast("很抱歉，该商品每位用户至多只能购买" + i + "份"), s = i) : s = "", 
            this.setNumber(s), s;
        },
        blurNumber: function(t) {
            var e = t.detail.value, s = parseInt(e), i = this.data.maxNumber, o = this.data.minNumber;
            s = e >= o && e <= i ? e : e < o ? o : e > i ? i : this.data.minNumber, this.setNumber(s);
        },
        setNumber: function(t) {
            var e = this.data.choose;
            e = this.getChoose(e, this.data.fullProps, this.data.skuInfo, this.data.defaultImage, {
                number: t
            }), this.setData({
                number: t,
                choose: e,
                numberWidth: this.getNumberWidth(t)
            });
        },
        getNumberWidth: function(t) {
            var e = 7 * t.toString().length + 60;
            return e <= 100 ? 100 : e;
        },
        getChooseData: function() {
            return this.data.choose;
        },
        updateSkuInfo: function(t) {
            var e = this, s = this.itemId, i = this.limitTotalStock;
            i > 0 && t <= i + 1 ? (this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), 
            this.$root.$mwp("mwp.detailskipmwp.skus.info", "v2", {
                iid: s,
                skuNum: t,
                appPlat: "m",
                caller: "normal"
            }).then(o.filterResult).then(function(t) {
                var s = t.data;
                e.options.skuInfo = s, e.render(e.options), e.$root.$wrapper && e.$root.$wrapper.$emit("$bottomBar.updateSkuInfo", s, e.skuType), 
                e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide");
            }).catch(function(t) {
                e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide"), l(t, {
                    _author: "changsheng",
                    threshold: 1
                });
            })) : this.render(this.options);
        },
        render: function(t) {
            var e = this;
            this.options = t, this.$toast = t.$toast || this.data.$toast, this.showLimitTips = t.showLimitTips, 
            this.skuType = t.skuType;
            var s = t.skuInfo || {}, i = t.minNumber || s.minNumber || 1, o = t.maxNumber || s.maxNumber || 0, l = o, a = t.defaultNumber || this.data.number;
            a < 1 && (a = 1);
            var n = s.props || [], r = s.skus || [], u = s.totalStock, m = s.defaultPrice, d = s.canInstallment, c = s.img || t.defaultImage || "", h = s.itemId || t.itemId, f = s.activityId || t.activityId, g = s.outType;
            this.itemId = h, this.limitTotalStock = s.limitTotalStock, d ? this.initInstallment(s) : this.defaultInstallment = [];
            var p = {
                goods: {
                    stock: u,
                    price: m,
                    img: c
                },
                message: {},
                itemId: h,
                activityId: f,
                outType: g
            }, b = this.data.choose, I = this.getFullProps(n, r);
            0 === n.length && r.length > 0 && (p.sku = r[0]), n.forEach(function(t) {
                if (t.list && 1 === t.list.length) {
                    var i = t.list[0].type;
                    e.setChooseProp(t.list[0][i + "Id"], i, {
                        skuInfo: s,
                        fullProps: I,
                        choose: p,
                        defaultImage: c
                    });
                } else t.list.forEach(function(t) {
                    var i = t.type;
                    b && b.itemId === p.itemId && b.activityId === p.activityId && b[i] && t[i + "Id"] === b[i][i + "Id"] && t.name === b[i].name && e.setChooseProp(t[i + "Id"], i, {
                        skuInfo: s,
                        fullProps: I,
                        choose: p,
                        defaultImage: c
                    });
                });
            }), b && b.itemId === p.itemId && b.activityId === p.activityId || (a = t.defaultNumber || 1), 
            b && b.installmentNum && (p.installmentNum = b.installmentNum);
            var y = (p = this.getChoose(p, I, s, c, {
                originMaxNumber: l,
                maxNumber: o,
                minNumber: i,
                number: a
            })).numberRange;
            this.setData({
                fullProps: I,
                skuInfo: s,
                choose: p,
                defaultImage: c,
                minNumber: y.minNumber,
                maxNumber: y.maxNumber,
                number: y.number,
                originMaxNumber: l,
                sizeHelper: t.sizeHelper || {},
                itemId: h
            });
        },
        init: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = this.data.number || 1, s = t.skuInfo || {}, i = s.limitTotalStock || 0, o = s.itemId || t.itemId;
            this.limitTotalStock = i, this.itemId = o, this.options = t, this.render(this.options), 
            e > 1 && this.updateSkuInfo(e);
        }
    }
};