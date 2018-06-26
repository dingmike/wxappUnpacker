function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/utils/cache")), i = t(require("../../common/m")), o = t(require("../../common/base/createPage")), r = t(require("../../common/service/user")), a = t(require("../../components/wall/index_sortNav")), s = t(require("../../components/skudialog/index")), n = t(require("../../common/trade/index")), u = t(require("../../components/mask/index")), c = t(require("../../components/toast/index")), m = i.default.MWP;

exports.default = (0, o.default)({
    components: {
        wall: a.default,
        skuDialog: s.default,
        mask: u.default,
        toast: c.default
    },
    data: {
        isFromCart: !1,
        totAmount: 0,
        promotionText: ""
    },
    itemSkuInfos: {},
    options: {
        promotionCode: "",
        shopId: "",
        stockId: ""
    },
    onReady: function() {},
    onLoad: function(t) {
        var e = this;
        this.$skuDialog.init({
            context: this,
            $toast: this.$toast,
            $mask: this.$mask
        }), this.tradeApi = new n.default(this.$toast, this.$loading, t, this.$root), t.promotionCode && t.promotionCode.length > 0 && "platformCoupon" === t.promotionCode ? wx.setNavigationBarTitle({
            title: "全场优惠"
        }) : wx.setNavigationBarTitle({
            title: "店铺优惠"
        });
        var i = decodeURI(t.title || "");
        i && e.setData({
            title: i,
            navClass: "wall_nav_box_package"
        }), this.initCartBottomInfo(t), e.setParams = {
            cKey: t.cKey || "xcx-shop-coupon",
            promotionId: t.promotionId || "",
            shopId: t.shopId || "",
            minPrice: t.minPrice || "",
            maxPrice: t.maxPrice || ""
        }, this.$wall.setWallNav({
            scrollNavRpxTop: 0
        }), this.$wall.initWall(this.setParams), this.options = {
            promotionCode: t.promotionCode || "",
            shopId: t.shopId || "",
            type: t.type || ""
        };
    },
    getGoodsSku: function(t) {
        var e = this, i = t.currentTarget.dataset.iid;
        if (this.itemSkuInfos[i]) {
            var o = this.itemSkuInfos[i];
            this.initSkuDialog(o);
        } else m.request("mwp.detailskipmwp.skus.info", "v2", {
            iid: i
        }).then(function(t) {
            if (t.ret === m.Code.Success) {
                var o = t.data.data;
                e.itemSkuInfos[i] = o, e.initSkuDialog(o);
            } else e.$toast.show(t.msg);
        }).catch(function(t) {
            e.$toast.show(t.toString());
        });
    },
    initSkuDialog: function(t) {
        this.$skuDialog.setOptions({
            skuInfo: t,
            isSkuShow: !0
        }), this.$skuDialog.showSku();
    },
    confirmSku: function(t) {
        var e = this;
        this.tradeApi.addCart(t).then(function(i) {
            "success" === i.result && (e.$skuDialog.hideSku(), e.options.type && "cart" === e.options.type && e.resetCartTick(t));
        }).catch(function(t) {
            e.$toast.show(t.message);
        });
    },
    initCartBottomInfo: function(t) {
        var i = t.type || "", o = t.promotionCode || "", r = e.default.get("cart.skuMap");
        if (i.length > 0 && "cart" === i && o.length > 0 && r && Object.keys(r).length > 0) if ("platformCoupon" !== o) {
            var a = !1;
            for (var s in r) if (r[s].shopId === t.shopId) {
                a = !0;
                break;
            }
            a && this.initCartTick();
        } else this.initCartTick();
    },
    initCartTick: function() {
        var t = {
            marketType: "market_mogujie",
            userId: r.default.uid,
            tick: ""
        }, i = e.default.get("cart.skuMap"), o = [];
        for (var a in i) o.push({
            stockId: a,
            number: i[a].number
        });
        t.tick = JSON.stringify(o), this.fetchCartTick(t);
    },
    resetCartTick: function(t) {
        var i = {
            marketType: "market_mogujie",
            userId: r.default.uid,
            tick: []
        }, o = t.sku.stockId;
        this.options.stockId = o;
        var a = [], s = e.default.get("cart.skuMap");
        if (s) {
            s[o] || a.push({
                stockId: o,
                number: 1
            });
            for (var n in s) n === o ? a.push({
                stockId: n,
                number: s[n].number + 1
            }) : a.push({
                stockId: n,
                number: s[n].number
            });
            i.tick = JSON.stringify(a);
        } else i.tick = JSON.stringify([ {
            stockId: o,
            number: 1
        } ]);
        this.fetchCartTick(i);
    },
    fetchCartTick: function(t) {
        var e = this;
        m.request("mwp.CartWeb.tick", "1", t).then(function(t) {
            "SUCCESS" === t.ret && e.initCartTickContent(t.data);
        }).catch(function(t) {
            e.$toast.show(t.message);
        });
    },
    initCartTickContent: function(t) {
        var e = this.options.promotionCode, i = this.options.shopId, o = {};
        if ("platformCoupon" === e) {
            var r = t.coudanResDTO.cartLevelAdvancedSuggestionDTO;
            0 !== parseInt(r.coudanStatus, 10) && (o = {
                coudanStatus: r.coudanStatus,
                promotionCode: r.promotionCode,
                parameters: r.parameters
            });
        } else {
            var a = t.coudanResDTO.shopLevelAdvancedSuggestionDTOList;
            if (a && a.length > 0) for (var s = 0; s < a.length; s++) 0 !== a[s].coudanStatus && a[s].shopIdEsc === i && (o = {
                coudanStatus: a[s].coudanStatus,
                promotionCode: a[s].promotionCode,
                parameters: a[s].parameters
            });
        }
        var n = this.getCartPromotionInfo(o), u = n.isShow, c = n.msg;
        0 !== Object.keys(o).length && u && (this.setData({
            isFromCart: !0,
            totAmount: o.parameters.selectedPrice / 100,
            promotionText: c
        }), this.updateSkuListCache());
    },
    updateSkuListCache: function() {
        var t = this.options.stockId;
        if (t && 0 !== t.length) {
            var i = e.default.get("cart.skuMap");
            i ? i[t] ? i[t].number = i[t].number + 1 : i[t] = {
                shopId: this.options.shopId,
                number: 1
            } : (i = {})[t] = {
                shopId: this.options.shopId,
                number: 1
            }, e.default.put("cart.skuMap", i);
        }
    },
    getCartPromotionInfo: function(t) {
        var e = "", i = !0, o = t.coudanStatus, r = t.promotionCode, a = t.parameters;
        switch (r) {
          case "itemCountOverDiscount":
            2 === parseInt(o, 10) ? a.needNumber && a.disCount && a.limitNumber ? e = "再购" + a.needNumber + "件，可享【满" + a.limitNumber + "件打" + a.disCount / 100 + "折】" : i = !1 : a.limitNumber && a.disCount ? e = "已满" + a.limitNumber + "件，立享【满" + a.limitNumber + "件打" + a.disCount / 100 + "折】" : i = !1;
            break;

          case "packageSale":
            2 === parseInt(o, 10) ? a.needNumber && a.limitPrice && a.limitNumber ? e = "再购" + a.needNumber + "件，可享【" + a.limitPrice / 100 + "元任选" + a.limitNumber + "件】" : i = !1 : a.limitNumber && a.limitPrice ? e = "已满" + a.limitNumber + "件，立享【" + a.limitPrice / 100 + "元任选" + a.limitNumber + "件】" : i = !1;
            break;

          case "itemCountOverFreePostage":
            2 === parseInt(o, 10) ? a.needNumber && a.limitNumber ? e = "再购" + a.needNumber + "件，可享【满" + a.limitNumber + "件包邮】" : i = !1 : a.limitNumber ? e = "已满" + a.limitNumber + "件，立享【" + a.limitNumber + "件包邮】" : i = !1;
            break;

          case "reachFreePostage":
            2 === parseInt(o, 10) ? a.deltaPrice && a.limitPrice ? e = "再购" + a.deltaPrice / 100 + "元，可享【满" + a.limitPrice / 100 + "元包邮】" : i = !1 : a.limitPrice ? e = "已满" + a.limitPrice / 100 + "元，立享【" + a.limitPrice / 100 + "元包邮】" : i = !1;
            break;

          case "itemCountOverReduce":
            2 === parseInt(o, 10) ? a.needNumber && a.limitNumber && a.cutPrice ? e = "再购" + a.needNumber + "件，可享【满" + a.limitNumber + "件减" + a.cutPrice / 100 + "元】" : i = !1 : a.limitNumber && a.cutPrice ? e = "已满" + a.limitNumber + "件，立享【满" + a.limitNumber + "件减" + a.cutPrice / 100 + "元】" : i = !1;
            break;

          case "reachReduce":
          case "platformCoupon":
            2 === parseInt(o, 10) ? a.deltaPrice && a.limitPrice && a.cutPrice ? e = "再购" + a.deltaPrice / 100 + "元，可享【满" + a.limitPrice / 100 + "元减" + a.cutPrice / 100 + "元】" : i = !1 : a.limitPrice && a.cutPrice ? e = "已满" + a.limitPrice / 100 + "元，立享【满" + a.limitPrice / 100 + "元减" + a.cutPrice / 100 + "元】" : i = !1;
        }
        return {
            msg: e,
            isShow: i
        };
    }
});