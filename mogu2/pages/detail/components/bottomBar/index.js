function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("../base/color")), e = function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}(require("../base/index")), o = t(require("../../../../common/m")), a = t(require("../../../../common/trade/index")), s = t(require("../../../../common/live/index")), n = t(require("../../../../common/utils/reminder")), r = t(require("../../../../common/utils/ItemReminder")), l = t(require("../../../../components/skudialog/index")), d = o.default.MWP, h = e.handleRequestError, u = e.getAddCartLottery, c = e.fn.getFullUrl;

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: i.default,
        skuDialog: l.default
    },
    init: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = this, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments[2], l = o.promotionType, d = o.reminderConfig;
        if (t.bottomBar) {
            Object.assign(this, t, e), this.pintuanInfo = this.pintuanInfo || {}, this.promotionTypeName = l && l.length > 0 && l[0].name || "Normal", 
            this.reminderConfig = d && d.length > 0 && d[0] || {}, this.itemSkuInfo = this.skuInfo, 
            this.pintuanSkuInfo = this.pintuanInfo.skuInfo, this.realSkuInfo = this.realSkuInfo || this.pintuanSkuInfo || this.itemSkuInfo, 
            this.virtualItemType = this.itemInfo.virtualItemType, this.activityIdInt = this.itemInfo.activityIdInt;
            var h = this.addCartLottery && this.addCartLottery.addCartTip, u = h && h.tipTimes, c = this.addCartLottery && this.addCartLottery.lotteryResult, f = this.addCartLottery && this.addCartLottery.activityId;
            this.lotteryResult = c, this.addCartActivityId = f, this.numTags = this.itemInfo.numTags, 
            this.addCartTip = h, this.addCartShowLeftTimes = u - 1 || 0, h && h.image && wx.getStorage({
                key: "footbar.date",
                success: function(t) {
                    var e = t.data, o = e.date, a = e.times;
                    (a = o !== new Date().toFormattedString("yyyy-MM-dd") || void 0 === a ? i.addCartShowLeftTimes : a - 1) >= 0 && i.initAddCartTip(a);
                },
                fail: function() {
                    i.initAddCartTip();
                }
            }), this.skuDialogOptions = {
                skuInfo: this.realSkuInfo,
                defaultImage: this.realSkuInfo.skus[0].img,
                sizeHelper: this.sizeHelper,
                isPresale: !!this.preSaleInfo,
                deposit: this.preSaleInfo && this.preSaleInfo.deposit,
                totalPrice: this.preSaleInfo && this.preSaleInfo.totalPrice,
                itemId: this.itemId,
                activityId: this.activityId,
                showLimitTips: !0,
                confirmSku: this.confirmSku.bind(this),
                skuType: "realSkuInfo"
            }, this.$skuDialog.init(this.skuDialogOptions), this.tradeApi = new a.default(null, null, Object.assign({}, e, {
                liveParams: s.default.decodeLiveParams(e.liveParams),
                isPresale: !!this.preSaleInfo,
                outType: this.pintuanInfo.outType,
                isNew: this.pintuanInfo.isNew,
                tuanType: this.pintuanInfo.tuanType,
                hasQualification: 5 === this.pintuanInfo.tuanType && this.pintuanInfo.couponFreeNum > 0,
                channelInfo: this.channelInfo
            }), this.$root), this.reminder = new n.default(null, null, this.$root), this.itemReminder = new r.default(null, null, this.$root), 
            this.$root.$wrapper.$on("$bottomBar.bannerClickHandler", this.bannerClickHandler.bind(this)), 
            this.$root.$wrapper.$on("$bottomBar.updateSkuInfo", this.updateSkuInfo.bind(this)), 
            this.initBottomBarData();
        }
    },
    initMceData: function() {},
    initBottomBarData: function() {
        var t = this, i = this.bottomBar || {}, e = this.itemInfo || {}, o = this.liveInfo || {};
        this.buttonStatus = {}, this.isBuyShow = !1, this.isCartShow = !1, this.isDisabled = !1, 
        i.buttons && i.buttons.length > 0 && i.buttons.forEach(function(i) {
            switch (i.name) {
              case "shop":
                i.iconName = "shop";
                break;

              case "fav":
                e.isFaved ? (i.iconStyle = t.$color.data.mainTx, i.iconName = "star-active") : (i.iconStyle = t.$color.data.secondaryTextTx, 
                i.iconName = "star");
                break;

              case "cart":
                "icon" === i.type ? (i.iconName = "shopping-cart", i.textColorStyle = t.$color.data.mainTx) : i.isDisabled ? (i.bgColorStyle = t.$color.data.disabledBg, 
                i.textColorStyle = t.$color.data.whiteTextTx) : (i.bgColorStyle = t.$color.data.secondaryBg, 
                i.textColorStyle = t.$color.data.mainTx), t.buttonStatus.cart = {
                    text: "加入购物车"
                }, t.isCartShow = !0, t.isDisabled = i.isDisabled, i.popup = t.addCartTip;
                break;

              case "live":
                i.iconName = o && o.liveStatus ? "online" : "offline";
                break;

              case "buy":
                i.isDisabled ? (i.bgColorStyle = t.$color.data.disBaledDimBg, i.textColorStyle = t.$color.data.whiteTextTx) : (i.bgColorStyle = t.$color.data.gradientBg, 
                i.textColorStyle = t.$color.data.whiteTextTx), t.buttonStatus.buy = {
                    text: i.nextText || i.text
                }, t.isBuyShow = !0, t.isDisabled = i.isDisabled;
                break;

              case "singleBuy":
                i.isDisabled ? (i.bgColorStyle = t.$color.data.disabledBg, i.textColorStyle = t.$color.data.whiteTextTx) : (i.bgColorStyle = t.$color.data.secondaryBg, 
                i.textColorStyle = t.$color.data.mainTx);
                break;

              case "singleBuyRedirect":
                i.bgColorStyle = t.$color.data.secondaryBg, i.textColorStyle = t.$color.data.mainTx;
                break;

              case "rushAlert":
                t.hasReminded = t.reminder.isReminded(t.activityIdInt), t.hasReminded ? (i.text = "已设置提醒", 
                i.bgColorStyle = t.$color.data.secondaryBg, i.textColorStyle = t.$color.data.mainTx) : (i.textColorStyle = t.$color.data.whiteTextTx, 
                i.bgColorStyle = t.$color.data.gradientBg), t.buttonStatus.buy = {
                    text: "即将开始"
                }, t.isBuyShow = !0, t.isDisabled = !0;
                break;

              case "alert":
                t.hasReminded = t.itemReminder.isReminded({
                    itemId: t.itemId,
                    activityId: t.activityIdInt
                }), t.startTime = i.startTime, t.hasReminded ? (i.text = "已设置提醒", i.bgColorStyle = t.$color.data.disabledBg, 
                i.textColorStyle = t.$color.data.whiteTextTx) : (i.textColorStyle = t.$color.data.whiteTextTx, 
                i.bgColorStyle = t.$color.data.gradientBg), t.buttonStatus.buy = {
                    text: "即将开始"
                }, t.isBuyShow = !0, t.isDisabled = !0;
                break;

              case "refresh":
                t.hasRefreshed || (t.originRefreshText = i.text, t.hasRefreshed = !0), i.textColorStyle = t.$color.data.whiteTextTx, 
                i.bgColorStyle = t.$color.data.gradientBg, i.text = t.refreshing ? "正在刷新..." : t.originRefreshText, 
                t.buttonStatus.buy = {
                    text: t.refreshing ? "正在刷新..." : t.originRefreshText
                }, t.isBuyShow = !0, t.isDisabled = !0;
                break;

              case "shopFav":
                t.shopInfo.isMarked ? (i.popup = null, i.text = "进店逛逛") : (t.setData({
                    isPopUpShow: !0
                }), i.text = "收藏店铺"), i.bgColorStyle = t.$color.data.secondaryBg, i.textColorStyle = t.$color.data.mainTx;
                break;

              case "follow":
                i.iconName = "weixin", i.textColorStyle = t.$color.data.whiteTextTx, i.bgColorStyle = t.$color.data.gradientBg, 
                t.isDisabled = !0;
            }
        }), this.setData({
            bottomBar: i,
            isFaved: e.isFaved,
            liveStatus: o.liveStatus || null
        });
    },
    initAddCartTip: function(t) {
        var i = this;
        this.setData({
            isPopUpShow: !0
        }), wx.setStorage({
            key: "footbar.date",
            data: {
                date: new Date().toFormattedString("yyyy-MM-dd"),
                times: "number" == typeof t ? t : this.addCartShowLeftTimes
            }
        }), setTimeout(function() {
            i.setData({
                isPopUpShow: !1
            });
        }, 6e3);
    },
    shopClickHandler: function() {
        this.$root.$redirect("shop", {
            shopId: this.shopInfo.shopId
        });
    },
    favClickHandler: function() {
        this.itemInfo.isFaved ? this.delFavItem() : this.addFavItem();
    },
    liveClickHandler: function() {
        var t = this.data.liveInfo || {}, i = t.liveListUrl, e = t.liveAnchorInfos, o = i;
        t.liveStatus && e && e.length > 0 && (o = e[0].liveUrl), this.$root.$launch(o, {
            appId: "wx21c17841db9593cd",
            fallback: "/pages/live/liveList/index",
            errMsg: "您可以搜索“蘑菇街超级购物台”获取更多服务"
        });
    },
    cartClickHandler: function(t) {
        this.$skuDialog.init(Object.assign(this.skuDialogOptions, {
            skuInfo: this.realSkuInfo,
            skuType: "realSkuInfo"
        })), this.showSku("cart", t), this.$root.$logE("016000102");
    },
    buyClickHandler: function(t) {
        this.$skuDialog.init(Object.assign(this.skuDialogOptions, {
            skuInfo: this.realSkuInfo,
            skuType: "realSkuInfo"
        })), this.showSku("buy", t), this.pintuanInfo && 5 === this.pintuanInfo.state ? this.$root.$logE("016000178") : this.$root.$logE("016000100");
    },
    singleBuyClickHandler: function(t) {
        this.$skuDialog.init(Object.assign(this.skuDialogOptions, {
            skuInfo: this.itemSkuInfo,
            skuType: "itemSkuInfo"
        })), this.showSku("singleBuy", t), this.$root.$logE("016000100");
    },
    singleBuyRedirectClickHandler: function(t) {
        t || this.$root.$navigate("detail", {
            itemId: this.itemId
        });
    },
    rushAlertClickHandler: function() {
        this.hasReminded || this.addRushAlert();
    },
    alertClickHandler: function() {
        this.hasReminded || this.addAlert();
    },
    refreshClickHandler: function() {
        var t = this;
        this.refreshing || (console.log("refreshing"), this.refreshing = !0, this.initBottomBarData(), 
        this.$root.$wrapper && this.$root.$wrapper.$emit("pageRefresh", function() {
            t.refreshing = !1, t.initBottomBarData();
        }));
    },
    shopFavClickHandler: function() {
        this.shopInfo.isMarked ? this.$root.$redirect("shop", {
            shopId: this.shopInfo.shopId
        }) : this.collectShop();
    },
    bannerClickHandler: function() {
        this.$skuDialog.init(Object.assign(this.skuDialogOptions, {
            skuInfo: this.realSkuInfo,
            skuType: "realSkuInfo"
        })), this.showSku("banner", this.isDisabled);
    },
    followClickHandler: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "在微信客户端搜索“蘑菇街拼团”公众号，点击关注，查看抽奖结果哦",
            confirmColor: "#FB4747",
            showCancel: !1,
            success: function(t) {
                t.confirm || t.cancel;
            },
            fail: function() {
                t.$root.$navigate("pintuanLotteryResult", {
                    activityId: t.activityId
                });
            }
        });
    },
    updateSkuInfo: function(t, i) {
        "realSkuInfo" === i ? this.realSkuInfo = t : "itemSkuInfo" === i && (this.itemSkuInfo = t);
    },
    showSku: function(t, i) {
        this.$skuDialog.showSku({
            isCartShow: this.isCartShow,
            isBuyShow: this.isBuyShow,
            buttonStatus: this.buttonStatus,
            isDisabled: i,
            type: t
        });
    },
    confirmSku: function(t, i) {
        console.log(i, t), this.shopInfo.nonsupportReasonRefound ? this.showBuyConfirm(t, i) : this.confirmProcess(t, i);
    },
    showBuyConfirm: function(t, i) {
        var e = this;
        wx.showModal({
            content: "此商品不支持7天无理由退货，请知晓哦",
            cancelColor: "#666666",
            confirmColor: "#FB4747",
            cancelText: "放弃购买",
            confirmText: "继续购买",
            success: function(o) {
                o.confirm ? e.confirmProcess(t, i) : o.cancel;
            }
        });
    },
    confirmProcess: function(t, i) {
        var e = this, o = t.sku, s = t.number, n = void 0;
        switch ("Normal" === this.promotionTypeName && "singleBuy" !== i && this.pintuanInfo && 5 === this.pintuanInfo.state ? n = a.default.getPromotionType().NormalPintuan : this.promotionTypeName ? n = a.default.getPromotionType()[this.promotionTypeName] : this.promotionTypeName = a.default.getPromotionType().Channel, 
        i) {
          case "cart":
            this.$root.$logE("016000111", {
                num: s,
                disprice: (o.nowprice / 100).toFixed(2),
                price: (o.price / 100).toFixed(2),
                stockId: o.stockId,
                itemid: this.itemId
            }), this.tradeApi.addCart(t, {
                type: n
            }).then(function(t) {
                "success" === t.result && (e.$skuDialog.hideSku(), e.addCartActivityId && e.lotteryResult && e.lotteryResult.length > 0 && u.bind(e)(e.addCartActivityId, e.lotteryResult, e.numTags));
            }).catch(function(t) {
                h.bind(e)(t);
            });
            break;

          default:
            this.$root.$logE("016000112", {
                num: s,
                disprice: (o.nowprice / 100).toFixed(2),
                price: (o.price / 100).toFixed(2),
                stockId: o.stockId,
                itemid: this.itemId
            }), this.tradeApi.buy(t, {
                type: n
            }).then(function(t) {
                "success" === t.result && (e.$skuDialog.hideSku(), e.$root.$navigate(c("/pages/buy/index", {
                    liveParams: e.liveParams,
                    cparam: e.cparam,
                    acm: e.acm
                })));
            }).catch(function(t) {
                h.bind(e)(t);
            });
        }
    },
    addFavItem: function() {
        var t = this;
        this.loadingFlag || (this.$root.$logE("016000012", {
            ops: "0",
            id: this.itemId,
            type: "goods"
        }), this.showLoading(), this.$root.$mwp("mwp.shopfavorite.itemLike", "1", {
            pf: "xcx",
            mids: this.itemId,
            ptpCnt: this.$root.ptpData.ptp_cnt
        }).then(d.filterResult).then(function() {
            t.itemInfo.isFaved = !0, t.initBottomBarData(), t.hideLoading();
        }).catch(function(i) {
            t.hideLoading(), h.bind(t)(i);
        }));
    },
    delFavItem: function() {
        var t = this;
        this.loadingFlag || (this.$root.$logE("016000012", {
            ops: "1",
            id: this.itemId,
            type: "goods"
        }), this.showLoading(), this.$root.$mwp("mwp.shopfavorite.itemUnLike", "1", {
            pf: "xcx",
            mids: this.itemId
        }).then(d.filterResult).then(function() {
            t.itemInfo.isFaved = !1, t.initBottomBarData(), t.hideLoading();
        }).catch(function(i) {
            t.hideLoading(), h.bind(t)(i);
        }));
    },
    collectShop: function() {
        var t = this;
        this.loadingFlag || (this.showLoading(), this.$root.$mwp("mwp.shopfavorite.collectShop", "1", {
            shopId: this.shopInfo.shopId
        }).then(d.filterResult).then(function(i) {
            "10011" === i.code ? (t.shopInfo.isMarked = !0, t.$root.$logE("016000012", {
                ops: "0",
                id: t.shopInfo.shopId,
                type: "shop"
            }), t.initBottomBarData()) : "10012" === i.code && (t.shopInfo.isMarked = !1, t.$root.$logE("016000012", {
                ops: "1",
                id: t.shopInfo.shopId,
                type: "shop"
            }), t.initBottomBarData()), t.hideLoading();
        }).catch(function(i) {
            t.hideLoading(), h.bind(t)(i);
        }));
    },
    addRushAlert: function() {
        var t = this;
        this.reminder.addReminder(this.activityIdInt).then(function(i) {
            "success" === i.result && t.initBottomBarData();
        }).catch(function(i) {
            h.bind(t)(i);
        });
    },
    addAlert: function() {
        var t = this;
        this.itemReminder.addReminder({
            itemId: this.itemId,
            activityIdNum: this.activityIdInt,
            startTime: this.startTime,
            eventId: this.reminderConfig.eventId,
            scatter: this.reminderConfig.scatter || 180,
            time: this.startTime - (this.reminderConfig.aheadTime || 300)
        }).then(function(i) {
            "success" === i.result && t.initBottomBarData();
        }).catch(function(i) {
            h.bind(t)(i);
        });
    },
    showLoading: function() {
        this.loadingFlag = !0, this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), 
        wx.showNavigationBarLoading();
    },
    hideLoading: function() {
        this.loadingFlag = !1, this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.hide"), 
        wx.hideNavigationBarLoading();
    },
    methods: {
        onButtonClick: function(t) {
            var i = t.detail.formId;
            this.$root.$logForm(i, 2);
            var e = t.detail.target.dataset, o = e.name, a = e.disable;
            a || this[o + "ClickHandler"] && this[o + "ClickHandler"](a);
        },
        hideLotteryResult: function() {
            this.$mask.hide(), this.setData({
                isLotteryResultShow: !1
            });
        }
    }
};