function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/base/createPage")), i = e(require("../../common/utils/imgUrlTool")), a = e(require("../../common/utils/makeup")), l = e(require("../../common/m")), n = e(require("../../components/loading/index")), o = e(require("../../components/toast/index")), s = e(require("../../components/empty/index")), r = e(require("../../components/wall/index")), u = e(require("./components/shopCoupon/index")), d = e(require("./components/superSeckill/index")), p = e(require("./components/selectItem/index")), c = l.default.MWP;

(0, t.default)({
    components: {
        loading: n.default,
        toast: o.default,
        empty: s.default,
        shopCoupon: u.default,
        superSeckill: d.default,
        selectItem: p.default,
        wall: r.default
    },
    data: {
        show: !0,
        appBanner: "",
        defaultHeight: "",
        $empty: {
            type: 4,
            text: "稍后再来试试吧~",
            button: ""
        },
        $shopCoupon: {
            ptpC: "mod_brandShop_shopCoupon"
        },
        $superSeckill: {
            ptpC: "mod_brandShop_superSeckill"
        },
        $selectItem: {
            ptpC: "mod_brandShop_selectItem"
        },
        $headingWall: {
            bgColor: "none",
            height: "100rpx",
            padding: "20rpx 0 0 0"
        },
        showSeckill: !0,
        superSeckillTitle: "超级秒杀",
        superSeckillSubTitle: "SUPER SECKILL",
        selectItemTitle: "甄选爆款",
        selectItemSubTitle: "SELECTED ITEMS",
        wallTitle: "特卖推荐",
        wallSubTitle: "HOT ITEMS"
    },
    onLoad: function(e) {
        this._brandId = e.brandId || "", this._shopId = e.shopId || "", this.pageTitle = e.brandTitle || "", 
        this.requestIndex = 0, this.$loading.show(), this._request(), this.makeup();
    },
    onShow: function() {
        this._setPageTitle();
    },
    onReady: function() {
        new a.default(this, "75612"), this._setPageTitle();
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    onPageScroll: function() {
        this.$wall.isSupportSelector && this.$wall.getInViewItems();
    },
    onShareAppMessage: function(e) {
        return {
            title: this.pageTitle ? "特卖店铺-" + decodeURIComponent(this.pageTitle) : "特卖店铺",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    methods: {
        makeup: function() {
            var e = this;
            this.$on("__makeup_done__", function(t, i, a) {
                if (a && i && i.config && i.config.list && i.config.list.length > 0) {
                    var l = i.config.list[0] || {};
                    e.setData({
                        showSeckill: "1" === l.showSeckill,
                        $superSeckillTitle: l.seckillTitle,
                        $superSeckillSubTitle: l.seckillSubTitle,
                        $selectItemTitle: l.selectTitle,
                        $selectItemSubTitle: l.selectSubTitle,
                        $headingWallTitle: l.wallTitle,
                        $headingWallSubTitle: l.wallSubTitle
                    }), e.wallPid = l.wallPid || "46339";
                }
                e.requestIndex++, e._wallInit();
            });
        },
        _request: function() {
            var e = this, t = this._brandId || "", a = this._shopId || "";
            c.request("mwp.mclaren.BrandSaleListActionlet", "1.0", {
                brandId: t,
                shopId: a,
                appPlat: "xcx"
            }).then(function(t) {
                if (t && t.data && t.data.list && t.data.list.length > 0) {
                    var a = t.data.list[0], l = a.seckillList || [], n = a.onsaleList || [], o = a.appBanner ? i.default.getWidthSuffix(a.appBanner, 750) : "", s = t.data.nowTime || 0, r = a.shopId ? e._urltoid(a.shopId) : "", u = a.brandName || "", d = a.name || "";
                    e.$superSeckill.init({
                        list: l,
                        nowTime: s
                    }), e.$selectItem.init({
                        list: n,
                        nowTime: s
                    }), e.$shopCoupon.init({
                        $toast: e.$toast,
                        shopInfo: a
                    }), e.setData({
                        appBanner: o,
                        show: !0,
                        defaultHeight: "auto"
                    }), e.shopId = r, e.brandName = u, e.pageTitle = d, e.requestIndex++, e._wallInit();
                } else e.setData({
                    appBanner: "",
                    show: !1,
                    defaultHeight: "auto"
                });
                console.log("________本次特卖店铺接口请求完成：", t), e.timer_1 = setTimeout(function() {
                    e.$loading.hide(), clearTimeout(e.timer_1);
                }, 600);
            }).catch(function(t) {
                e.setData({
                    appBanner: "",
                    show: !1,
                    defaultHeight: "auto"
                }), e.$loading.hide(), console.log("________本次特卖店铺接口请求失败：", t);
            });
        },
        _setPageTitle: function() {
            var e = this.pageTitle ? "特卖店铺-" + decodeURIComponent(this.pageTitle) : "特卖店铺";
            wx.setNavigationBarTitle({
                title: e
            });
        },
        _wallInit: function() {
            if (console.log("________本次特卖店铺图墙请求" + this.requestIndex + "：", {
                pid: this.wallPid,
                sp: this.shopId
            }), !(this.requestIndex < 2)) {
                var e = this.shopId || "", t = this.wallPid || "46339", i = this.brandName || "";
                this.$wall.setDataSource({
                    source: "mwp_mait",
                    goCdn: !1
                }), this.$wall.initWall({
                    pid: t,
                    sp: e,
                    brandName: i
                }), this.$wall.handMaitItem = this._wallHandMaitItem;
            }
        },
        _urltoid: function(e) {
            return (parseInt(e.substring(1), 36) - 56) / 2;
        },
        _wallHandMaitItem: function(e, t) {
            var a = this;
            if (e.imgOrg = e.eventImage, e.img = i.default.getGoodsRatioSuffix(e.eventImage, a.itemImgWidth, a.itemImgRatio), 
            e.link = e.item_xcx_url || e.item_url, e.orgPrice = e.price, e.price = e.discountPrice, 
            e.sale = e.itemSale, e.botRight = e.itemLikes, e.itemLikes || 0 === e.itemLikes) {
                var l = e.itemLikes;
                l > 1e4 && (l = (l / 1e4).toFixed(1) + "w"), e.botRight = l + " 收藏";
            }
            if (e.sale || 0 === e.sale) {
                var n = e.sale;
                n > 1e4 && (n = (n / 1e4).toFixed(1) + "w"), e.saleText = n;
            }
            if (e.pintuanAvatar && (e.pintuanAvatar = i.default.getGoodsRatioSuffix(e.pintuanAvatar, 50, "1:1")), 
            e.pintuanAvatarList && e.pintuanAvatarList.length > 0) {
                e.ptAvatarArr = e.pintuanAvatarList.split(","), e.pintuanAvatarArr = [];
                for (var o = 0, s = e.ptAvatarArr.length; o < s; o++) e.ptAvatarArr[o] && e.pintuanAvatarArr.push(i.default.getGoodsRatioSuffix(e.ptAvatarArr[o], 50, "1:1"));
            }
            return e.tradeItemId = e.item_id, e;
        }
    }
});