function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = t(require("../../common/m")), o = t(require("../../common/utils/cache")), s = t(require("../../components/loading/index")), i = t(require("./components/coupon/index")), r = t(require("./components/crossShopDiscount/index")), n = t(require("./components/skuNum/index")), c = t(require("../../components/empty/index")), u = t(require("../../components/toast/index")), d = t(require("../../common/utils/imgUrlTool")), h = t(require("../../components/mask/index")), p = t(require("../../common/service/url")), m = a.default.MWP, l = a.default.MCE;

exports.default = {
    timer: 0,
    delay: 500,
    timestamp: 0,
    tickParam: null,
    components: {
        loading: s.default,
        couponList: i.default,
        skuNum: n.default,
        crossShopDiscount: r.default,
        empty: c.default,
        toast: u.default,
        mask: h.default
    },
    splitStrategy: "fullSplitStrategy",
    page: 0,
    _now: Date.now || function() {
        return new Date().getTime();
    },
    scrollIndTime: 2e3,
    hasMore: !1,
    resultList: [],
    requesting: !1,
    iidsE: [],
    initWall: !1,
    data: function() {
        return {
            isShow: !1,
            $mask: {
                isShow: null
            },
            hideEmptyButton: !1,
            shops: [],
            shopMap: {},
            skuMap: o.default.get("cart.listSkuMap") || {},
            allChecked: !1,
            allCheckedNumber: 0,
            mixed: !1,
            normalGoodsNum: 0,
            bondedGoodsNum: 0,
            totalPrice: "￥0.00",
            $couponList: {},
            $bottomTag: [],
            showEmptyPage: !1,
            $empty: {},
            checkedItems: [],
            skuDeleteMap: {},
            openCoupon: null,
            tickMap: {},
            tickArr: [],
            cartLevelCoudan: {},
            shopCdMap: {},
            cartCoudanOrigin: {},
            shopCdMapOrigin: {},
            recommends: [],
            autoplay: !1,
            current: 0,
            isRecommendChecked: !1,
            barBgColor: "#ffe6e8",
            showRecommend: null,
            marginBottom: "0",
            scrollEvent: "$cartComponent.cartScrollEvent",
            cartOver: !1,
            scrollIntoView: ""
        };
    },
    onHide: function() {
        this.setData({
            autoplay: !1
        });
    },
    onShow: function() {
        var t = o.default.get("tick.recommend");
        t && "half" == this.data.type && this.setData({
            autoplay: !t.isRecommendChecked
        }), this.setData({
            scrollIntoView: "scrollIntoView"
        });
    },
    methods: {
        cacheRecommend: function() {
            var t = {
                tickParam: this.tickParam,
                isRecommendChecked: this.data.isRecommendChecked,
                current: this.data.current,
                recommends: this.data.recommends,
                barBgColor: this.data.barBgColor,
                showRecommend: this.data.showRecommend
            };
            o.default.put("tick.recommend", t);
        },
        showRecommend: function() {
            var t = o.default.get("tick.recommend");
            t && t.isRecommendChecked ? (this.setData({
                isRecommendChecked: t.isRecommendChecked || !1,
                recommends: t.recommends || [],
                current: t.current || 0,
                barBgColor: t.barBgColor,
                showRecommend: t.showRecommend,
                autoplay: !t.isRecommendChecked
            }), this.tickParam = t.tickParam || null) : (this.setData({
                autoplay: !1,
                isRecommendChecked: !1,
                recommends: [],
                current: 0
            }), this.tickParam = null);
        },
        setMarginBottom: function() {
            var t = this.data.cartLevelCoudan, e = this.data.recommends, a = 116;
            t.coudanStatus && (a += 60), e && e.length && (a += 90), a = a ? a + "rpx" : 0, 
            this.setData({
                marginBottom: a
            });
        },
        hide: function() {
            this.setData({
                isShow: !1,
                openCoupon: null
            }), this.$mask.hide(), this.$parent.$emit("hide");
        },
        init: function(t) {
            var e = this;
            this.$loading.show(), console.log(o.default.get("cart.listSkuMap"));
            var a = wx.getSystemInfoSync(), s = this.$root.$page;
            s.$id.indexOf("@detail") > -1 && s.setData({
                isPageScrollDisabled: !0
            }), this.page = 0, this.hasMore = !1, this.resultList = [], this.requesting = !1, 
            this.initWall = !1, this.checkedShopNumber = 0, this.totalShopNumber = 0, this.numberPerShopMap = null, 
            this.firstShopId = "", this.isSplitOneShop = !1, this.setData({
                isShow: !0,
                type: t && t.type || "half",
                winHeight: t && "normal" == t.type ? a.windowHeight : "",
                cartLevelCoudan: {},
                shopCdMap: {},
                cartCoudanOrigin: {},
                shopCdMapOrigin: {},
                scrollEvent: "$cartComponent.cartScrollEvent",
                cartOver: !1
            }), this.$parent.$wall && this.$parent.$wall.setData({
                itemPackageList: []
            }), t && t.noMask ? this.$mask.showWithoutAnimation({
                opacity: "0"
            }) : this.$mask.show(), this.$on("hideDialog", function() {
                e.hide();
            }), l.get({
                pid: "85853"
            }, !0).then(function(t) {
                t && t.list && t.list[0] ? e.setData({
                    resource: {
                        link_xcx: t.list[0].link_xcx,
                        img: t.list[0].img
                    }
                }) : e.setData({
                    resource: {}
                });
            }).catch(function(t) {
                console.error(t.message);
            }), this.requestData(t), this.timeFlag = this._now();
        },
        cacheSku: function() {
            var t = o.default.get("cart.listSkuMap") || {}, e = o.default.get("cart.skuMap") || {};
            return this.$loading.show(), this.timer = 0, e && Object.keys(e).forEach(function(e) {
                t[e] = !0;
            }), t;
        },
        isSplitOneShop: !1,
        splitShopId: "",
        totalShopNumber: 0,
        checkedShopNumber: 0,
        numberPerShopMap: {},
        firstShopId: "",
        requestData: function(t) {
            var e = this, a = [], s = this.getCutImage, i = this.data.shopMap, r = this.data.skuDeleteMap, n = !1, c = this.fix2Price, u = {
                marketType: "market_mogujie",
                sourceMarket: "weixin",
                splitStrategy: this.splitStrategy,
                page: this.page
            };
            this.requesting = !0, this.$loading.show(), m.request("mwp.CartWeb.cartList", "1", u).then(function(u) {
                var d = u.data || {}, h = [], m = 0, l = e.cacheSku();
                if (e.hasMore = d.hasMore, u.data && d.shopGroup && d.shopGroup.length) {
                    if (d.shopGroup.map(function(t, o) {
                        var n = {}, u = {}, d = t.shopInfo && t.shopInfo.shopIdEsc || "", p = t.shopInfo && t.shopInfo.isHideShopLink || !1;
                        0 == o && (e.firstShopId = d), e.numberPerShopMap = e.numberPerShopMap || {}, e.numberPerShopMap[d] || (e.numberPerShopMap[d] = {
                            totalSkuNum: 0,
                            checkedSkuNum: 0,
                            outStockNum: 0
                        }), u = e.numberPerShopMap[d], Object.assign(n, {
                            shopIdEsc: d,
                            shopName: t.shopInfo && t.shopInfo.shopName || "",
                            sellerId: t.shopInfo && t.shopInfo.sellerUserIdEsc || ""
                        }), n.cartItemGroup = [], n.groupTypeEnum = t.groupTypeEnum || "", n.promotionTag = (t.promotionRelatedTagList || []).length > 0, 
                        n.shopTags = e.shopTagImage(t.shopRelatedTagList || []), n.deleted = !1, n.normalGroup = "FUTURESALE" != t.groupTypeEnum && "INVALID" != t.groupTypeEnum && "PRESALE" != t.groupTypeEnum, 
                        t.cartItemGroup && t.cartItemGroup.length && (t.cartItemGroup.map(function(e) {
                            var o = {}, i = "";
                            o.number = e.number || 1, o.ptp = e.ptp || "", e.extensions && (o.ptpCnt = e.extensions.ptpCnt, 
                            o.liveParams = e.extensions.liveParams), e.titleRelatedTagList && e.titleRelatedTagList.length && e.titleRelatedTagList.map(function(t) {
                                i += t.text;
                            }), o.remindTags = [];
                            var d = e.remindRelatedTagList || [], h = e.skuImageBottomTagList || [];
                            d.length && d.forEach(function(t) {
                                var e = "ui-skuTag";
                                "SKU_REDUCED_PRICE_REMIND_TAG" === t.tagNodeEnum ? e += " ui-skuTag-border" : 2 === t.type && (e += " ui-skuTag-img"), 
                                o.remindTags.push({
                                    text: t.text,
                                    tagClass: e,
                                    tagStyle: "background: " + (t.image ? "url(" + t.image + ") no-repeat" : t.bgColor || "#fff") + ";color: " + t.textColor
                                });
                            }), h.length && h.forEach(function(t) {
                                o.remindTags.push({
                                    text: t.text,
                                    tagClass: "ui-skuTag",
                                    tagStyle: "background: " + (t.extra && t.extra.image ? "url(" + t.extra.image + ") no-repeat" : "#fff") + "; color: " + t.textColor
                                });
                            }), e.sku && Object.assign(o, {
                                bondedGoods: e.sku.bondedGoods || !1,
                                inValid: e.sku.inValid,
                                imgHttps: s(e.sku.imgHttps),
                                title: e.sku.title || "",
                                stockIdEsc: e.sku.stockIdEsc || "",
                                skuAttributes: e.sku.skuAttributes || [],
                                stock: e.sku.stock,
                                nowprice: c(e.sku.nowprice || 0),
                                price: c(e.sku.price || 0),
                                reason: e.sku.reason || "",
                                itemIdEsc: e.sku.itemIdEsc || "",
                                tuanType: e.sku.tuanType || ""
                            });
                            var p = e.skuPriceRelatedTagList || [];
                            o.priceTagList = [], p.forEach(function(t) {
                                o.priceTagList.push(t.image);
                            }), o.isPintuan = o.tuanType, o.inStock = o.stock >= o.number, o.skuTitleTag = i, 
                            o.hideInput = !o.inStock || o.inValid && ("FUTURESALE" == t.groupTypeEnum || "PRESALE" == t.groupTypeEnum || "INVALID" == t.groupTypeEnum), 
                            o.hideInput && u.outStockNum++, r[o.stockIdEsc] && (r[o.stockIdEsc] = !r[o.stockIdEsc], 
                            l[o.stockIdEsc] && (l[o.stockIdEsc] = !1)), l[o.stockIdEsc] && !o.inValid && (u.checkedSkuNum++, 
                            m++), r[o.stockIdEsc] || o.inValid || o.hideInput || u.totalSkuNum++, a.push(o.itemIdEsc), 
                            n.cartItemGroup.push(o);
                        }), i[n.shopIdEsc] = u.totalSkuNum == u.checkedSkuNum && 0 != u.checkedSkuNum, i[n.shopIdEsc] && !t.deleted && e.checkedShopNumber++, 
                        u.outStockNum == u.totalSkuNum && (n.outStock = !0), n.hideShopInput = "FUTURESALE" == t.groupTypeEnum || "PRESALE" == t.groupTypeEnum || "INVALID" == t.groupTypeEnum || n.outStock, 
                        n.noHref = "FUTURESALE" == t.groupTypeEnum || "PRESALE" == t.groupTypeEnum || "INVALID" == t.groupTypeEnum || p), 
                        h.push(n), "INVALID" == t.groupTypeEnum || "FUTURESALE" == t.groupTypeEnum || "PRESALE" == t.groupTypeEnum || t.deleted || e.totalShopNumber++;
                    }), e.resultList.length > 0) {
                        var g = e.resultList, k = e.resultList.length - 1, f = e.resultList[k], I = f && f.shopIdEsc, S = h[0], E = S && S.shopIdEsc;
                        if (I == E) {
                            e.isSplitOneShop = !0, e.splitShopId = E;
                            var b = f.cartItemGroup, v = S.cartItemGroup;
                            g.pop();
                            var C = h.shift(), y = b.concat(v);
                            C.cartItemGroup = y, e.resultList = g = g.concat(C, h);
                        } else e.resultList = e.resultList.concat(h);
                    } else e.resultList = e.resultList.concat(h);
                    e.isSplitOneShop && (e.totalShopNumber -= 1), i[e.splitShopId] && e.page > 0 && (e.checkedShopNumber -= 1), 
                    e.checkedShopNumber == e.totalShopNumber && 0 != e.checkedShopNumber && (n = !0);
                    var T = null;
                    d.globalExtInfoDTO && d.globalExtInfoDTO.crossShopDiscountBannerDTO && (T = d.globalExtInfoDTO.crossShopDiscountBannerDTO), 
                    e.$crossShopDiscount.setData({
                        crossShopDiscountBanner: T
                    }), e.setData({
                        showEmptyPage: !1,
                        allChecked: n,
                        shops: e.resultList,
                        skuMap: l,
                        shopMap: i,
                        skuDeleteMap: r
                    }), e.requesting = !1, e.$loading.hide();
                    var P = d.coudanResDTO && d.coudanResDTO.cartLevelAdvancedSuggestionDTO && d.coudanResDTO.cartLevelAdvancedSuggestionDTO.searchKeys && d.coudanResDTO.cartLevelAdvancedSuggestionDTO.searchKeys.fromPrice;
                    e.showRecommend(P), e.coudanCallback(d, [], !0), e.hasMore || (e.setData({
                        cartOver: !0,
                        scrollEvent: "$wall.wallScrollEvent"
                    }), e.$parent.$wall && e.$parent.$wall.initWall({
                        cKey: "xcx-car",
                        pid: 53221,
                        iidsE: e.iidsE
                    }));
                } else {
                    var D = e, $ = e.data.hideEmptyButton;
                    e.$empty.setData({
                        type: 11,
                        text: "购物车还是空的哦~",
                        button: $ ? null : "去逛逛",
                        tip: null,
                        callback: function() {
                            D.$root.$navigate(p.default.home());
                        }
                    }), e.setData({
                        showEmptyPage: !0,
                        cartOver: !0,
                        scrollEvent: "$wall.wallScrollEvent"
                    }), e.$parent.$wall && e.$parent.$wall.initWall({
                        cKey: "xcx-car",
                        pid: 53221,
                        iidsE: e.iidsE
                    }), e.$crossShopDiscount.setData({
                        crossShopDiscountBanner: null
                    });
                }
                o.default.put("cart.listSkuMap", l), e.calculation(0 == m && 0 == e.data.tickArr.length), 
                e.iidsE = a = a.join(",") || "", t && t.callback && "function" == typeof t.callback && t.callback(a), 
                e.$loading.hide();
            }).catch(function(t) {
                e.$loading.hide(), e.$toast.show("网络请求失败，请稍后再试"), console.error(t);
            });
        },
        getCutImage: function(t) {
            return d.default.getWidthSuffix(t, 160);
        },
        shopChange: function(t) {
            var a, s = this, i = t.currentTarget.id, r = this.data.skuMap, n = void 0;
            this.data.shops.map(function(t) {
                t.shopIdEsc == i && (n = s.data.shopMap[i], t.cartItemGroup.map(function(t) {
                    t.hideInput || (r[t.stockIdEsc] = !n);
                }));
            }), n ? (this.numberPerShopMap[i].checkedSkuNum = 0, this.checkedShopNumber--) : this.checkedShopNumber++, 
            this.calculation(), this.setData((a = {}, e(a, "shopMap." + i, !this.data.shopMap[i]), 
            e(a, "skuMap", r), a)), o.default.put("cart.listSkuMap", r), this.ifAllChecked();
        },
        itemBoxChange: function(t) {
            var a, s = this, i = t.currentTarget.id, r = t.currentTarget.dataset.shopId, n = 0, c = this.data.skuMap[i], u = this.data.skuMap, d = this.data.shopMap;
            this.data.shops.map(function(t) {
                if (t.shopIdEsc && t.shopIdEsc == r) {
                    var e = 0;
                    t.cartItemGroup.map(function(t) {
                        t.stockIdEsc == i && (u[i] = !c), u[t.stockIdEsc] && n++, t.hideInput || e++;
                    }), d[r] = n == e, d[r] && s.checkedShopNumber++;
                }
            }), c ? (this.numberPerShopMap[r].checkedSkuNum--, this.checkedShopNumber--) : this.numberPerShopMap[r].checkedSkuNum++, 
            this.setData((a = {}, e(a, "shopMap." + r, d[r]), e(a, "skuMap", u), a)), o.default.put("cart.listSkuMap", u), 
            this.calculation(), this.ifAllChecked();
        },
        ifAllChecked: function() {
            var t = this.data.shops, e = this.data.shopMap, a = t.filter(function(t) {
                return !t.hideShopInput && !t.deleted;
            }), o = a.filter(function(t) {
                return e[t.shopIdEsc] && !t.deleted;
            }), s = o.length == a.length && 0 != o.length;
            this.setData({
                allChecked: s
            });
        },
        addCart: function(t) {
            var e = this, a = t.target.id, o = t.target.dataset.num, s = t.target.dataset.shopid || "", i = t.target.dataset.stock, r = this.data.skuMap, n = this.fix2Price;
            if (this.$root.$logE("016010000"), !(o >= i)) {
                var c = {
                    number: ++o,
                    stockId: a,
                    calcPrice: !0,
                    marketType: "market_mogujie",
                    sourceMarket: "weixin"
                };
                this.$loading.show(), m.request("mwp.CartWeb.modifyCart", "1", c).then(function(t) {
                    t && t.data && e.data.shops.length ? (e.data.shops.map(function(e) {
                        var i = 0;
                        e.shopIdEsc && e.shopIdEsc == s && e.cartItemGroup.map(function(s) {
                            if (s.stockIdEsc == a) {
                                var r = t.data && t.data.cartItemDTO || {};
                                s.number = o, s.inStock = s.number <= s.stock, r.sku && (s.nowprice = r.sku && n(r.sku.nowprice), 
                                s.isPintuan = r.sku && r.sku.tuanType);
                            }
                            s.inStock || i++, s.hideInput = !s.inStock || s.inValid && ("FUTURESALE" == e.groupTypeEnum || "PRESALE" == e.groupTypeEnum || "INVALID" == e.groupTypeEnum);
                        }), i == e.cartItemGroup.length ? e.outStock = !0 : e.outStock = !1, e.hideShopInput = "FUTURESALE" == e.groupTypeEnum || "PRESALE" == e.groupTypeEnum || "INVALID" == e.groupTypeEnum || e.outStock;
                    }), e.calculation(!r[a]), e.setData({
                        shops: e.data.shops
                    })) : e.$toast.show(t.msg || t.message || "系统出错"), e.$loading.hide();
                }).catch(function(t) {
                    e.$loading.hide(), console.error(t);
                });
            }
        },
        openNumBox: function(t) {
            if ("normal" === this.data.type) {
                var e = t.target.id, a = t.target.dataset.num, o = t.target.dataset.shopid || "", s = t.target.dataset.stock;
                this.$skuNum.setData({
                    stockId: e,
                    number: a,
                    shopId: o,
                    stockNum: s,
                    isShow: !0
                });
            }
        },
        modifyNum: function(t) {
            var e = this, a = {}, o = t.stockId, s = t.number, i = t.shopId, r = this.data.skuMap, n = this.fix2Price;
            this.$root.$logE("016010000");
            var c = {
                number: s,
                stockId: o,
                calcPrice: !0,
                marketType: "market_mogujie",
                sourceMarket: "weixin"
            };
            this.$loading.show(), m.request("mwp.CartWeb.modifyCart", "1", c).then(function(t) {
                t && t.data && e.data.shops.length || "FAIL_BIZ_stock_not_enough" == t.ret ? (e.data.shops.map(function(e) {
                    var a = 0;
                    e.shopIdEsc && e.shopIdEsc == i && e.cartItemGroup.map(function(i) {
                        if (i.stockIdEsc === o) {
                            var r = t.data && t.data.cartItemDTO || {};
                            i.number = s, i.inStock = i.number <= i.stock, r.sku && (i.nowprice = r.sku && n(r.sku.nowprice), 
                            i.isPintuan = r.sku && r.sku.tuanType);
                        }
                        i.inStock || a++, i.hideInput = !i.inStock || i.inValid && ("FUTURESALE" == e.groupTypeEnum || "PRESALE" == e.groupTypeEnum || "INVALID" == e.groupTypeEnum);
                    }), a == e.cartItemGroup.length ? e.outStock = !0 : e.outStock = !1, e.hideShopInput = "FUTURESALE" == e.groupTypeEnum || "PRESALE" == e.groupTypeEnum || "INVALID" == e.groupTypeEnum || e.outStock;
                }), a.shops = e.data.shops, e.calculation(!r[o]), e.setData({
                    shops: a.shops
                })) : e.$toast.show(t.msg || t.message || "系统出错"), e.$loading.hide();
            }).catch(function(t) {
                e.$loading.hide(), console.error(t);
            });
        },
        minusCart: function(t) {
            var e = this, a = {}, o = t.target.id, s = t.target.dataset.num, i = t.target.dataset.shopid || "", r = this.data.skuMap, n = this.fix2Price;
            if (this.$root.$logE("016010000"), !(s <= 1)) {
                var c = {
                    number: --s,
                    stockId: o,
                    calcPrice: !0,
                    marketType: "market_mogujie",
                    sourceMarket: "weixin"
                };
                this.$loading.show(), m.request("mwp.CartWeb.modifyCart", "1", c).then(function(t) {
                    t && t.data && e.data.shops.length || "FAIL_BIZ_stock_not_enough" == t.ret ? (e.data.shops.map(function(e) {
                        var a = 0;
                        e.shopIdEsc && e.shopIdEsc == i && e.cartItemGroup.map(function(i) {
                            if (i.stockIdEsc === o) {
                                var r = t.data && t.data.cartItemDTO || {};
                                i.number = s, i.inStock = i.number <= i.stock, r.sku && (i.nowprice = r.sku && n(r.sku.nowprice), 
                                i.isPintuan = r.sku && r.sku.tuanType);
                            }
                            i.inStock || a++, i.hideInput = !i.inStock || i.inValid && ("FUTURESALE" == e.groupTypeEnum || "PRESALE" == e.groupTypeEnum || "INVALID" == e.groupTypeEnum);
                        }), a == e.cartItemGroup.length ? e.outStock = !0 : e.outStock = !1, e.hideShopInput = "FUTURESALE" == e.groupTypeEnum || "PRESALE" == e.groupTypeEnum || "INVALID" == e.groupTypeEnum || e.outStock;
                    }), a.shops = e.data.shops, e.calculation(!r[o]), e.setData({
                        shops: a.shops
                    })) : e.$toast.show(t.msg || t.message || "系统出错"), e.$loading.hide();
                }).catch(function(t) {
                    e.$loading.hide(), console.error(t);
                });
            }
        },
        delCart: function(t) {
            var e = this, a = {}, s = t.target.id, i = t.target.dataset.shopid, r = {
                stockId: s,
                marketType: "market_mogujie",
                sourceMarket: "weixin"
            }, n = 0, c = this.data.skuDeleteMap, u = this.data.skuMap, d = this.data.shopMap, h = u[s];
            this.$root.$logE("016000119"), wx.showModal({
                title: "确定要删除该商品吗",
                confirmColor: "#ff5777",
                success: function(t) {
                    t.confirm && (e.$loading.show(), m.request("mwp.CartWeb.deleteCart", "1", r).then(function(t) {
                        e.$loading.hide(), t && t.data && e.data.shops.length ? (e.data.shops.map(function(t) {
                            if (t.shopIdEsc && t.shopIdEsc == i || "" == i) {
                                var e = 0, a = 0;
                                t.cartItemGroup && t.cartItemGroup.length && t.cartItemGroup.map(function(t) {
                                    t.stockIdEsc === s && (c[s] = !0, u[s] = !1), c[t.stockIdEsc] && (n++, console.log(n)), 
                                    t.hideInput && !c[t.stockIdEsc] && e++, c[t.stockIdEsc] || a++;
                                }), e == a && (t.hideShopInput = !0, d[t.shopIdEsc] = !1), 0 == a && (t.deleted = !0);
                            }
                        }), u[s] && e.numberPerShopMap[i].checkedSkuNum--, a.shops = e.data.shops, e.calculation(!h), 
                        e.setData({
                            shops: a.shops,
                            skuDeleteMap: c,
                            skuMap: u,
                            shopMap: d
                        }), o.default.put("cart.listSkuMap", u), e.ifAllChecked(), e.setEmpty()) : e.$toast.show(t.msg || t.message || "系统出错");
                    }).catch(function(t) {
                        e.$loading.hide(), console.error(t);
                    }));
                }
            });
        },
        allChange: function() {
            var t = {}, e = this.data.allChecked, a = this.data.shopMap, s = this.data.skuMap, i = this.splitShopId;
            if (this.data.shops && this.data.shops.length && this.data.shops.map(function(t) {
                t.hideShopInput || (a[t.shopIdEsc] = !e), t.cartItemGroup && t.cartItemGroup.length && t.cartItemGroup.map(function(t) {
                    t.hideInput || (s[t.stockIdEsc] = !e);
                });
            }), t.allChecked = !e, a[i] = t.allChecked, t.allChecked) {
                0 == this.checkedShopNumber ? this.checkedShopNumber += this.totalShopNumber : this.checkedShopNumber = this.totalShopNumber;
                for (var r in this.numberPerShopMap) {
                    var n = this.numberPerShopMap[r];
                    0 == n.checkedSkuNum ? n.checkedSkuNum += n.totalSkuNum : n.checkedSkuNum = n.totalSkuNum;
                }
            } else this.checkedShopNumber = 0, this.numberPerShopMap[i] && (this.numberPerShopMap[i].checkedSkuNum = 0);
            this.calculation(), this.setData({
                allChecked: t.allChecked,
                shopMap: a,
                skuMap: s
            }), o.default.put("cart.listSkuMap", s);
        },
        calculation: function(t) {
            var e = [], a = {}, o = [], s = 0, i = 0, r = this.data.skuMap, n = this.data.skuDeleteMap, c = this.fix2Price;
            if (this.data.shops.length && this.data.shops.map(function(t) {
                if (t.cartItemGroup && t.cartItemGroup.length) {
                    var c = [];
                    t.cartItemGroup.map(function(e) {
                        var u = e.stockIdEsc, d = {};
                        if (r[e.stockIdEsc] && !e.inValid && e.number <= e.stock && "INVALID" !== t.groupTypeEnum && "PRESALE" !== t.groupTypeEnum && "FUTURESALE" !== t.groupTypeEnum && !n[e.stockIdEsc]) {
                            i++, s += e.nowprice * e.number * 100, d = {
                                stockId: u,
                                number: parseInt(e.number),
                                ptp: e.ptp || ""
                            };
                            var h = {
                                shopId: t.shopIdEsc,
                                number: parseInt(e.number)
                            }, p = {
                                stockId: u,
                                number: parseInt(e.number)
                            };
                            e.liveParams && (d.liveParams = e.liveParams), e.ptpCnt && (d.ptpCnt = e.ptpCnt), 
                            e.isPintuan && (d.pinTuan = {
                                tuanType: e.tuanType
                            }), d.bondedGoods = e.bondedGoods, c.push(d), o.push(p), a[u] = h;
                        }
                    }), c.length > 0 && e.push({
                        skus: c
                    });
                }
            }), this.data.isRecommendChecked && this.data.recommends[this.data.current]) {
                for (var u = this.data.recommends[this.data.current], d = !1, h = 0; h < o.length; h++) if (o[h].stockId == u.stockId) {
                    o[h].number += 1, d = !0;
                    break;
                }
                d || o.push({
                    stockId: u.stockId,
                    number: 1
                }), t = !1, s += 100 * u.price;
            }
            t ? this.setData({
                totalPrice: "￥" + c(s)
            }) : this.tick(s), this.setData({
                allCheckedNumber: i,
                checkedItems: e,
                tickMap: a,
                tickArr: o
            });
        },
        getCoupon: function(t) {
            var e = this, a = {
                sellerId: t.currentTarget.id,
                marketType: "market_mogujie"
            }, o = t.currentTarget.dataset.shopname;
            m.request("mwp.ford.getValidShopProList", "1", a).then(m.filterResult).then(function(t) {
                var a = {
                    list: t.list,
                    shopName: o,
                    show: !0,
                    type: e.data.type
                };
                e.$couponList.setData(a), e.setData({
                    openCoupon: !0
                });
            });
        },
        goToBuy: function() {
            var t = !1, e = this.data.allCheckedNumber;
            if (this.data.isRecommendChecked && this.data.recommends[this.data.current]) {
                e += 1;
                for (var a = this.data.recommends[this.data.current], s = this.data.checkedItems, i = 0; i < s.length; i++) {
                    for (var r = s[i].skus, n = 0; n < r.length; n++) {
                        var c = r[n];
                        if (c.stockId == a.stockId) {
                            c.number += 1, t = !0;
                            break;
                        }
                    }
                    if (t) break;
                }
                if (!t) {
                    var u = this.$root.ptpData;
                    s.push({
                        skus: [ {
                            stockId: a.stockId,
                            number: 1,
                            ptp: u.ptp_cnt || ""
                        } ]
                    });
                }
                this.setData({
                    checkedItems: s,
                    allCheckedNumber: e
                });
            }
            if (this.data.checkedItems.length <= 0) this.$toast.show("请先选择商品哦"); else {
                var d = {
                    orderFrom: "cart",
                    shops: this.data.checkedItems
                }, h = 0, m = 0;
                if (this.data.checkedItems.map(function(t) {
                    t.skus.map(function(t) {
                        t.bondedGoods ? h++ : m++;
                    });
                }), m && h) return this.setData({
                    openCoupon: !0,
                    mixed: !0,
                    normalGoodsNum: m,
                    bondedGoodsNum: h
                }), void console.log("请分开结算以下商品");
                e > 50 ? this.$toast.show("最多50样商品同时下单结算哦~") : (o.default.put("buy.buyParams", d), 
                this.$root.$navigate(p.default.buy()), this.hide());
            }
        },
        buySingle: function(t) {
            var e = t.detail.formId, a = t.detail.target.dataset.bonded;
            this.$root.$logForm(e, 1);
            var s = [], i = 0;
            this.data.checkedItems.map(function(t) {
                var e = [];
                t.skus.map(function(t) {
                    t.bondedGoods === a && (e.push(t), i++);
                }), e.length > 0 && s.push({
                    skus: e
                });
            }), i > 50 ? this.$toast.show("最多50样商品同时下单结算哦~") : (o.default.put("buy.buyParams", {
                orderFrom: "cart",
                shops: s
            }), this.closeCheckout(), this.$root.$navigate(p.default.buy()), this.hide());
        },
        closeCheckout: function() {
            this.setData({
                mixed: !1,
                openCoupon: null
            });
        },
        shopTagImage: function(t) {
            var e = /(\.jpg|\.webp|\.png|\.gif)/gi;
            return t && t.length && t.map(function(t) {
                var a = t.image;
                if (e.test(a)) {
                    var o = a.split(e), s = (o.slice(0, 1).join("") + o[1]).match(/(\d+)x(\d+)\.\w+$/), i = s && s[1] || 60;
                    i = (i = Number(i)) && i >= 195 ? 132 : 60, t.width = i, t.image = t.image;
                }
            }), t;
        },
        setEmpty: function() {
            var t = this.data.shops, e = 0, a = this, o = this.data.hideEmptyButton;
            t && t.length && (t.map(function(t) {
                t.deleted && e++;
            }), e == t.length && (this.$empty.setData({
                type: 11,
                text: "购物车还是空的哦~",
                button: o ? null : "去逛逛",
                tip: null,
                callback: function() {
                    a.$root.$navigate(p.default.home());
                }
            }), this.setData({
                showEmptyPage: !0,
                isRecommendChecked: !1,
                recommends: [],
                current: 0,
                showRecommend: null,
                cartOver: !0,
                scrollEvent: "$wall.wallScrollEvent"
            }), this.$parent.$wall && this.$parent.$wall.initWall({
                cKey: "xcx-car",
                pid: 53221,
                iidsE: this.iidsE
            }), this.$crossShopDiscount.setData({
                crossShopDiscountBanner: null
            }), this.tickParam = null, this.cacheRecommend()));
        },
        formSubmitHandler: function(t) {
            var e = t.detail.formId, a = t.detail.target.dataset.handler;
            return "checkout" == a ? (this.$root.$logForm(e, 1), void this.goToBuy()) : "minus" == a ? (this.$root.$logForm(e, 1), 
            void this.minusCart(t.detail)) : "add" == a ? (this.$root.$logForm(e, 1), void this.addCart(t.detail)) : "delete" == a ? (this.$root.$logForm(e, 1), 
            void this.delCart(t.detail)) : void 0;
        },
        closeCartComponent: function() {
            this.setData({
                isShow: !1,
                openCoupon: null,
                $mask: {
                    isShow: null
                }
            });
            var t = this.$root.$page;
            t.$id.indexOf("@detail") > -1 && t.setData({
                isPageScrollDisabled: !1
            }), this.setData({
                autoplay: !1
            }), this.cacheRecommend();
        },
        fixPrice: function(t) {
            return (t = t ? "" + (t / 100).toFixed(2) : "").indexOf(".") ? t.replace(/0+?$/, "").replace(/\.$/, "") : t;
        },
        fix2Price: function(t) {
            return t = t ? "" + (t / 100).toFixed(2) : "0.00";
        },
        tick: function(t) {
            var e = this, a = this.delay, o = this.fix2Price, s = void 0;
            this.timer ? console.log(this.timer) : this.timer = setTimeout(function() {
                clearTimeout(e.timer), e.timer = 0, s = +Date.now(), e.isTicking = !0, m.request("mwp.CartWeb.tick", "1", {
                    tick: JSON.stringify(e.data.tickArr),
                    marketType: "market_mogujie"
                }, {
                    method: "POST"
                }).then(function(a) {
                    if (e.isTicking = !1, a && a.data) {
                        if (e.timestamp > s) return;
                        e.timestamp = s;
                        var i = a.data;
                        e.delay = i.coudanResDTO && i.coudanResDTO.delay > 500 ? i.coudanResDTO.delay : 500, 
                        e.coudanCallback(i, e.data.tickMap), a.data.coudanResDTO || e.setData({
                            totalPrice: "￥" + o(t)
                        });
                    } else e.setData({
                        totalPrice: "￥" + o(t)
                    }), e.resetRecommend();
                }).catch(function(a) {
                    e.isTicking = !1, console.log(a), e.setData({
                        totalPrice: "￥" + o(t)
                    }), e.resetRecommend();
                });
            }, a);
        },
        coudanCallback: function(t, e, a) {
            var s = this, i = this.data.shopCdMap, r = this.fixPrice;
            if (o.default.put("cart.skuMap", e), t.coudanResDTO) {
                var n = t.coudanResDTO.cartLevelAdvancedSuggestionDTO, c = t.coudanResDTO.shopLevelAdvancedSuggestionDTOList;
                if (a || (this.cacheRecommend(), this.tickRecommend(n, this.data.tickArr)), n.coudanStatus >= 0) {
                    var u = this.data.cartLevelCoudan, d = n.promotionCode, h = n.parameters, p = n.searchKeys, m = n.styles, l = n.decorate;
                    u.coudanStatus = n.coudanStatus, u.activityName = h.activityName || "", u.desc = l, 
                    m ? (u.tagStyle = "color:" + (m.tagTextColor || "#ff5777") + "; background: " + (m.tagBgColor || "#FFE6E8") + ";", 
                    u.styles = "color: " + (m.barTextColor || "#ff5777") + ";background:" + (m.barBgUrl ? "url(" + m.barBgUrl + ") no-repeat;background-size:100%;" : "#FFE6E8;")) : (u.tagStyle = "color: #ff5777; background: #FFE6E8;", 
                    u.styles = "color: #ff5777;background: #FFE6E8;"), 1 == n.coudanStatus || 2 == n.coudanStatus && (u.promotionId = p && p.promotionId, 
                    u.promotionCode = d, "platformCoupon" == d && (u.deltaPrice = r(h.deltaPrice), u.cutPrice = r(h.cutPrice), 
                    u.limitPrice = r(h.limitPrice), u.title = "以下商品满" + u.limitPrice + "元，立减" + u.cutPrice + "元", 
                    u.desc = a ? "满" + u.limitPrice + "元，立减" + u.cutPrice + "元" : "再购" + u.deltaPrice + "元，立减" + u.cutPrice + "元")), 
                    this.setData({
                        totalPrice: "￥" + r(h.selectedPrice),
                        cartLevelCoudan: u
                    }, function() {
                        s.setMarginBottom();
                    }), a && this.setData({
                        cartCoudanOrigin: JSON.parse(JSON.stringify(u))
                    });
                }
                i = JSON.parse(JSON.stringify(this.data.shopCdMapOrigin)), c.length && (c.forEach(function(t) {
                    var e = {}, o = t.coudanStatus, s = t.parameters, n = t.promotionCode, c = t.searchKeys, u = t.promotionTag, d = t.decorate;
                    if (o >= 0) {
                        if (e.promotionTag = u, e.coudanStatus = o, e.desc = d, 1 == o) ; else if (2 == o) {
                            var h = "";
                            e.promotionCode = n, c && c.promotionId && (e.promotionId = c.promotionId), "reachReduce" == n ? (e.cutPrice = r(s.cutPrice), 
                            e.limitPrice = r(s.limitPrice), e.deltaPrice = r(s.deltaPrice), h = "满" + e.limitPrice + "元，立减" + e.cutPrice + "元") : "reachFreePostage" == n ? (e.limitPrice = r(s.limitPrice), 
                            e.deltaPrice = r(s.deltaPrice), h = "满" + e.limitPrice + "元，立享包邮") : "itemCountOverReduce" == n ? (e.cutPrice = r(s.cutPrice), 
                            e.limitNumber = s.limitNumber, e.needNumber = s.needNumber, h = "满" + e.limitNumber + "件，立减" + e.cutPrice + "元") : "itemCountOverDiscount" == n ? (e.disCount = r(s.disCount), 
                            e.limitNumber = s.limitNumber, e.needNumber = s.needNumber, h = "满" + e.limitNumber + "件，立享" + e.disCount + "折") : "itemCountOverFreePostage" == n ? (e.limitNumber = s.limitNumber, 
                            e.needNumber = s.needNumber, h = "满" + e.limitNumber + "件，立享包邮") : "packageSale" == n && (e.limitPrice = r(s.limitPrice), 
                            e.limitNumber = s.limitNumber, e.needNumber = s.needNumber, h = e.limitPrice + "元任选" + e.limitNumber + "件"), 
                            a && (e.desc = h), e.title = "以下商品" + h;
                        }
                        i[t.shopIdEsc] = e;
                    } else i[t.shopIdEsc] = null;
                }), this.setData({
                    shopCdMap: i
                }), a && this.setData({
                    shopCdMapOrigin: JSON.parse(JSON.stringify(i))
                }));
            } else this.setData({
                cartLevelCoudan: JSON.parse(JSON.stringify(this.data.cartCoudanOrigin)),
                shopCdMap: JSON.parse(JSON.stringify(this.data.shopCdMapOrigin))
            }, function() {
                s.setMarginBottom();
            }), this.resetRecommend();
        },
        goCoudan: function(t) {
            var e = t.currentTarget.dataset, a = e.shopId, o = e.promotionId, s = e.promotionCode, i = {
                promotionCode: s,
                title: e.title,
                type: "cart",
                cKey: "platformCoupon" == s ? "xcx-coupon-mass" : "xcx-shop-coupon"
            };
            a && (i.shopId = a), o && (i.promotionId = o), this.$root.$navigate(p.default.wallPackage(i)), 
            this.closeCartComponent();
        },
        paramChanged: function(t) {
            if (!this.tickParam) return !0;
            var e = !1;
            for (var a in t) t[a] !== this.tickParam[a] && (e = !0);
            return e;
        },
        resetRecommend: function() {
            this.data.isRecommendChecked ? this.cacheRecommend() : (this.tickParam = null, this.clearRecommend());
        },
        clearRecommend: function() {
            var t = this, e = this.data.recommends;
            e && e.length && (this.animating = !0, this.setData({
                showRecommend: !1
            }), setTimeout(function() {
                t.setData({
                    recommends: [],
                    current: 0,
                    isRecommendChecked: !1,
                    showRecommend: null
                }, function() {
                    t.setMarginBottom();
                }), t.cacheRecommend(), t.animating = !1;
            }, 280));
        },
        tickRecommend: function(t, e) {
            var a = this;
            if (!this.data.isRecommendChecked) {
                var o = t.promotionCode, s = t.searchKeys;
                if (2 !== t.coudanStatus || "platformCoupon" !== o) return this.tickParam = null, 
                void this.clearRecommend();
                var i = parseInt(s.fromPrice);
                if (!i || !e.length) return this.tickParam = null, void this.clearRecommend();
                for (var r = [], n = 0; n < e.length; n++) r.push(e[n].stockId);
                var c = {
                    marketType: "market_mogujie",
                    fromPrice: i,
                    promotionId: s.promotionId,
                    stockIdList: JSON.stringify(r)
                };
                this.paramChanged(c) && (this.tickParam = c, this.isRequesting = !0, m.request("mwp.CartWeb.tickRecommend", "1", this.tickParam).then(function(t) {
                    if (t && t.data) {
                        var e = t.data, o = e.recommends, s = e.styles, i = [];
                        if (o && o.length) for (var r = 0; r < o.length; r++) o[r].price = (o[r].price / 100).toFixed(2), 
                        o[r].image = d.default.getWidthSuffix(o[r].image, 160), i.push(o[r].acm);
                        i.length && a.$root.$logE("0x00000000", {
                            acms: i
                        }), a.setData({
                            barBgColor: s && s.barBgColor ? s.barBgColor : "#ffe6e8",
                            recommends: o || [],
                            current: 0,
                            showRecommend: !0,
                            autoplay: !0
                        }, function() {
                            a.setMarginBottom();
                        }), a.cacheRecommend();
                    } else a.clearRecommend();
                    a.isRequesting = !1;
                }).catch(function() {
                    a.clearRecommend(), a.isRequesting = !1;
                }));
            }
        },
        onSwiperChange: function(t) {
            var e = t.detail;
            this.setData({
                current: e.current
            }), this.cacheRecommend();
        },
        checkRecommend: function() {
            if (this.isRequesting || this.timer || this.animating || this.isTicking) console.log("不能点击。。。"); else {
                var t = this.data.recommends[this.data.current];
                if (t) {
                    var e = this.data.isRecommendChecked, a = !(e = !e);
                    this.setData({
                        isRecommendChecked: e,
                        autoplay: a
                    });
                    var o = {
                        isSelect: e ? 1 : 0,
                        itemId: t.itemId,
                        acm: t.acm,
                        stockId: t.stockId,
                        disprice: 100 * t.price,
                        num: 1
                    };
                    this.$root.$logE("016000558", o), this.calculation();
                }
            }
        },
        goDetail: function() {
            var t = this.data.recommends[this.data.current];
            t && t.itemId && (this.setData({
                autoplay: !1
            }), this.cacheRecommend(), this.$root.$navigate(p.default.detail({
                itemId: t.itemId,
                acm: t.acm
            })), this.closeCartComponent());
        },
        clickHandler: function(t) {
            var e = t.currentTarget.dataset, a = e.itemId, o = e.ptp_from, s = e.ptpFromCnt;
            this.$root.$navigate(p.default.detail({
                itemId: a,
                ptp_from: o,
                ptpFromCnt: s
            })), this.closeCartComponent();
        },
        navigateShop: function(t) {
            var e = t.currentTarget.dataset, a = e.shopId, o = void 0 === a ? "" : a;
            !e.nohref && o && (this.$root.$navigate(p.default.shop({
                shopId: o
            })), this.closeCartComponent());
        },
        cartScrollEvent: function() {
            this.$log("cartScrollEvent"), this._now() - this.timeFlag > this.scrollIndTime && (this.hasMore ? this.requesting || (this.page++, 
            this.requestData()) : this.requesting || this.initWall || (this.setData({
                cartOver: !0,
                scrollEvent: "$wall.wallScrollEvent"
            }), this.$parent.$wall && this.$parent.$wall.initWall({
                cKey: "xcx-car",
                pid: 53221,
                iidsE: this.iidsE
            })));
        }
    }
};