function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), o = e(require("../../common/utils/cache")), i = e(require("../../components/loading/index")), s = e(require("../../components/toast/index")), a = e(require("../../components/mask/index")), n = e(require("./components/address/index")), r = e(require("./components/shop/index")), d = e(require("./tool/dataParser.js")), c = e(require("./components/payBar/index")), u = e(require("./components/platformCoupon/index")), l = e(require("./components/bondedGoods/index")), m = e(require("./components/coupon/index")), p = e(require("./components/virtualBox/index")), h = e(require("./components/fenqi/index")), f = e(require("../../common/utils/imgUrlTool")), g = e(require("../../common/service/user")), y = e(require("./components/platformCoupon/coupon")), P = e(require("./components/goodsNumDialog/index")), L = t.default.MWP, D = t.default.MCE;

exports.default = {
    components: {
        goodsNumDialog: P.default,
        loading: i.default,
        address: n.default,
        shop: r.default,
        paybar: c.default,
        toast: s.default,
        couponList: m.default,
        platformCoupon: u.default,
        bondedGoods: l.default,
        virtualBox: p.default,
        mask: a.default,
        fenqi: h.default
    },
    data: function() {
        return {
            isShow: !1,
            $mask: {
                isShow: null
            },
            hasBondedGoods: !1,
            $address: {},
            $virtualBox: {},
            $shop: {},
            $couponList: {},
            operationList: [],
            promotionList: [],
            selectedPromotionList: [],
            advancedSuggestionList: [],
            oldPlatformPromotion: null,
            totalPrice: 0,
            $paybar: {},
            nextReqData: {},
            shopComments: {},
            hasData: !1,
            shopTaxMap: {},
            switchTitle: "白付美分期",
            switchDesc: "0首付0负担",
            repayStage: null,
            canRepayStage: !1,
            identityNum: null,
            needIdentityPic: !0,
            $fenqi: {
                title: "白付美分期购",
                list: []
            },
            selectFenqi: ""
        };
    },
    dp: null,
    excMsg: {
        ptFull: "FAIL_BIZ_VALIDATE_PINTUAN_IS_CAN_NOT_BUY"
    },
    onShow: function() {},
    methods: {
        init: function(e) {
            var t = this;
            this.dp = null, this.setData({
                isShow: !0,
                shopComments: {},
                noMask: e && e.noMask || !1,
                type: e && e.type || "half"
            }), this.$shop.setShopOpt({
                shops: [],
                showModifyNumberGroup: {},
                lockAdd: !1,
                lockSub: !1
            }), this.$paybar.setData({
                totalPriceStr: "",
                isPresale: !1,
                lock: !1
            }), this.$on("hideDialog", function() {
                t.setData({
                    isShow: !1
                }), t.$mask.hide();
            }), e = "half" === this.data.type ? Object.assign({}, e, {
                ptpCnt: this.$root.ptpData.ptp_cnt
            }) : Object.assign({}, e, {
                ptpCnt: this.$root.ptpData.ptp_url
            }), this.getParamsFromCache(e), this.$shop.$off("update"), this.$shop.$on("update", function(e) {
                t.requestData(e.requeryDataStr, e.callback, e.setLock);
            }), this.$address.$off("update"), this.$address.$on("update", function(e) {
                t.requestData(e);
            }), this.$mask.show();
        },
        close: function() {
            this.setData({
                isShow: !1
            }), this.$mask.hide();
        },
        getParamsFromCache: function(e) {
            var t = void 0;
            try {
                (t = o.default.get("buy.buyParams")).addressId = e.addressId ? e.addressId : t.addressId, 
                this.dp = new d.default(e);
                var i = JSON.stringify({
                    createOrderRequestStr: JSON.stringify(this.dp.changeParams(t)),
                    marketType: "market_mogujie"
                });
                this.requestData(i);
            } catch (e) {
                console.log(e);
            }
        },
        requestData: function(e, t, o) {
            var i = this, s = this.toArray, a = this.toPrice, n = this.data.shopComments, r = !1, d = this.$shop.data.showModifyNumberGroup || {}, c = this.dp;
            this.$loading.show(), L.request("mwp.TradeWebBuy.confirmOrderActionlet", "1", e, {
                method: "POST"
            }).then(function(e) {
                if (i.$loading.hide(), e.data) {
                    var u = e && e.data || {}, l = u.address || {}, m = u.shopGroupList, p = [], h = void 0, f = !1, g = 0, y = !1, P = !1, L = void 0, v = 0, S = "", q = void 0, $ = void 0, k = s(u.promotionList), w = s(u.advancedSuggestionResDTOList), x = u.oldPlatformPromotion, C = "", O = !1, N = u.haigouAuthentication && u.haigouAuthentication.identityNum, T = u.haigouAuthentication && u.haigouAuthentication.needIdentityPic, b = u.confirmRepayStageResDTO, I = b && b.canPayStage, A = u.repayStageResDTOList, R = A && A.length ? A.map(function(e) {
                        return {
                            title: "￥" + a(e.perPrice) + "x" + e.num + "期，应还总额" + a(e.totalPrice),
                            desc: "含服务费：￥" + a(e.fee) + "/期",
                            perPrice: e.perPrice,
                            num: e.num,
                            fee: e.fee
                        };
                    }) : [], F = b && b.maxFreeFeeTerms;
                    F ? i.setData({
                        switchDesc: "最高可享" + F + "期免息"
                    }) : D.get({
                        pid: "46600"
                    }, !0).then(function(e) {
                        e && e.list && e.list[0] && e.list[0].title && i.setData({
                            switchDesc: e.list[0].title
                        });
                    }), u.operationList.map(function(e) {
                        "choosePromotion" == e.operationName && (h = !0), "chooseAddress" == e.operationName && (f = !0);
                    }), m.map(function(e) {
                        var t = {}, o = s(e.skuGroupList), n = [], u = !1;
                        t.tariffResDto = e.tariffResDTO, L = e.stage ? e.stage.goodsPrice : 0, t.logisticsList = s(e.logisticsList), 
                        t.promotionList = s(e.promotionList), t.selectedLogistics = e.selectedLogistics || {}, 
                        t.postage = e.selectedLogistics.postage >= 0 ? a(e.selectedLogistics.postage) : "0.00", 
                        t.selectedPromotionKey = e.selectedPromotionList && e.selectedPromotionList[0] && e.selectedPromotionList[0].promotionKey || "", 
                        t.selectedPromotionDesc = e.selectedPromotionList && e.selectedPromotionList[0] && e.selectedPromotionList[0].promotionDesc || "", 
                        t.selectedDiscountFee = e.selectedPromotionList && e.selectedPromotionList[0] && e.selectedPromotionList[0].discountFee || 0, 
                        t.selectedPromotionDiscount = a(t.selectedDiscountFee), t.shopKey = e.shopKey, t.shopName = e.shopName, 
                        t.shopIdEsc = e.shopIdEsc, t.buyerComment = e.buyerComment, t.totalPrice = a(e.totalPrice), 
                        t.firstStagePrice = e.stageList, t.sellerUserId = e.sellerUserIdEsc || e.shopIdEsc || "", 
                        e.virtualChargeInfo && e.virtualChargeInfo.accountType && i.$virtualBox.init(e.virtualChargeInfo), 
                        t.extensions = e.extensions || {}, e.stageList && e.stageList.map(function(e) {
                            if ("first" === e.name && (t.firstStagePrice = a(e.goodsPrice)), "last" === e.name) {
                                t.lastStagePrice = a(e.goodsPrice);
                                var o = new Date(1e3 * e.beginTime);
                                t.beginTime = Date.format(o, "MM月dd日HH:mm:ss") + "开始支付尾款";
                            }
                        }), t.zero = c.pintuanReqDTO && c.pintuanReqDTO.hasQualification, e.extensions && e.extensions.shopOriginPrice && (t.shopOriginPrice = a(e.extensions.shopOriginPrice)), 
                        o.map(function(e) {
                            var t = {};
                            e.bondedGoods && (O = !0), t.imgUrlHttps = i.getCutImage(e.imgUrlHttps), t.itemIdEsc = e.itemIdEsc, 
                            t.skuIdEsc = e.skuIdEsc, t.promotionList = s(e.promotionList), t.quantity = e.quantity, 
                            t.inventory = e.inventory, t.selectedPromotionList = s(e.selectedPromotionList), 
                            t.title = e.title, t.showOriginPrice = e.skuPrice !== e.skuNowPrice, t.skuPrice = a(e.skuPrice), 
                            t.skuNowPrice = a(e.skuNowPrice), t.skuAttrList = e.skuAttrList, t.redPacketPrice = e.redPacketDTO && a(e.redPacketDTO.price), 
                            t.redPacketDesc = e.redPacketDTO && e.redPacketDTO.desc, t.showModifyNumber = d[e.skuIdEsc], 
                            t.isWareHouse = e.extensions && "WAREHOUSE" == e.extensions.itemTypeTag, t.bondedGoods = e.bondedGoods, 
                            e.extensions && e.extensions.freight && (u = e.extensions.freight), n.push(t), g += e.quantity, 
                            e.operationList.map(function(e) {
                                "modifySkuQuantity" == e.operationName && (t.canModifyNumber = !0);
                            });
                        }), t.skuGroupList = n, t.freight = u, p.push(t), r = e.tagsDTO && "YS" == e.tagsDTO.itemProcessTag || !1, 
                        e.operationList.map(function(o) {
                            "chooseShopPromotion" == o.operationName && e.promotionList.length > 1 && (t.chooseShopPromotion = !0), 
                            "chooseExpress" == o.operationName && e.logisticsList.length > 1 && (t.chooseExpress = !0), 
                            "addComment" == o.operationName && (t.addComment = !0), "virtualChargeAccount" == o.operationName && (y = !0), 
                            "addPhoneNumber" == o.operationName && (P = !0);
                        });
                    }), P && i.$virtualBox.initBeautyMedicine(), v = u.selectedPromotionList && u.selectedPromotionList[0] && u.selectedPromotionList[0].discountFee || 0, 
                    S = "¥" + a(r ? L : u.totalPrice), q = u.selectedPromotionList && u.selectedPromotionList[0] && u.selectedPromotionList[0].promotionKey || "empty_0_0", 
                    $ = u.selectedPromotionList && u.selectedPromotionList[0] && u.selectedPromotionList[0].promotionDesc || "", 
                    C = u.redPacketDTO ? "支付时最高可再减" + a(u.redPacketDTO.price) + "元" : "", i.$address.setData({
                        address: l.address || "",
                        realName: l.realName || "",
                        mobile: l.mobile || "",
                        province: l.province || "",
                        city: l.city || "",
                        area: l.area || "",
                        addressId: l.addressId || "",
                        isDefault: l.isDefault || !1,
                        isSetAddr: l.isDefault || !1
                    }), i.$shop.setShopOpt({
                        shops: p,
                        virtualChargeAccount: y,
                        addPhoneNumber: P,
                        shopComments: n,
                        isPresale: r,
                        showModifyNumberGroup: d,
                        shopTaxMap: i.data.shopTaxMap
                    }), i.$paybar.setData({
                        totalPriceStr: S,
                        isPresale: r,
                        num: g,
                        payRedpacket: C
                    }), x && i.$couponList.setData({
                        title: "请选择优惠券",
                        list: u.promotionList,
                        isExpressList: !1,
                        activeKey: q,
                        $Scope: i.$scope,
                        showList: !1
                    }), I && i.$fenqi.setData({
                        list: R,
                        showList: !1,
                        activeKey: b && b.perPrice,
                        activeFee: b && b.fee,
                        activeNum: b && b.num
                    }), i.setData({
                        hasData: !0,
                        hasBondedGoods: O,
                        choosePromotion: h,
                        chooseAddress: f,
                        virtualChargeAccount: y,
                        addPhoneNumber: P,
                        selectedPromotionKey: q,
                        selectedPromotionDesc: $,
                        promotionList: k,
                        discountFee: v,
                        advancedSuggestionList: w,
                        oldPlatformPromotion: x,
                        discountFeeStr: "-¥" + a(v),
                        nextReqData: c.parseParams(u),
                        canRepayStage: I,
                        identityNum: N,
                        needIdentityPic: T,
                        repayStage: b,
                        openRepayStage: b && b.chosen,
                        selectFenqi: b && b.perPrice ? "￥" + a(b.perPrice) + "x" + b.num + "期（含服务费￥" + a(b.fee) + "/期）" : ""
                    }), o && "function" == typeof o && o();
                } else wx.showModal({
                    title: "",
                    content: e.msg || "系统异常",
                    confirmColor: "#ff5777",
                    showCancel: !1,
                    success: function(e) {
                        if (e.confirm) if (i.data && i.data.hasData) t && "function" == typeof t && t(); else {
                            if ("normal" == i.data.type) return void wx.navigateBack();
                            i.close();
                        }
                    }
                });
            }).catch(function(e) {
                t && "function" == typeof t && t(), i.$loading.hide(), g.default.showUserError(e) || i.$toast.show(e.message);
            });
        },
        resetData: function(e) {
            this.setData({
                nextReqData: this.dp.parseParams(e)
            });
        },
        toPrice: function(e) {
            return (e / 100).toFixed(2);
        },
        toArray: function(e) {
            return e ? Array.from ? Array.from(e) : Array.prototype.slice.call(e) : [];
        },
        getCutImage: function(e) {
            return f.default.getWidthSuffix(e, 144);
        },
        callClickAllSale: function(e) {
            var t = this, o = e.target.dataset.promotionKey, i = this.data.promotionList, s = this.data.oldPlatformPromotion;
            i.length <= 1 && s || (!s && this.$loading.show(), !s && L.request("mwp.ford.getUsablePromotions", "1", {
                marketType: "market_mogujie",
                terminal: 3
            }, {
                method: "POST"
            }).then(L.filterResult).then(function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = (0, 
                y.default)(t.data.promotionList, t.data.advancedSuggestionList, e.list, t.data.selectedPromotionKey);
                o.needClose && t.$toast.show("非常抱歉，您的下单信息已失效，请重新返回商品详情页或购物车再次下单~"), !o.needClose && t.$platformCoupon.setData({
                    availableList: o.availableList,
                    addOnList: o.addOnList,
                    unAvailableList: o.unAvailableList,
                    title: "优惠券",
                    activeKey: t.data.selectedPromotionKey || "empty_0_0",
                    showList: !0,
                    scrollTop: 0
                }), t.$loading.hide();
            }).catch(function(e) {
                t.$loading.hide(), t.$toast.show(e.message);
            }), s && this.$couponList.setData({
                title: "请选择优惠券",
                shopKey: "",
                list: i,
                isExpressList: !1,
                activeKey: o,
                showList: !0
            }));
        },
        delegate: function(e) {
            var t = e.target.dataset.type;
            "function" == typeof this[t] && (e.target.dataset.activeKey || (e.target.dataset.activeKey = this.data.selectedPromotionKey || ""), 
            this[t](e));
        },
        formSubmitHandler: function(e) {
            var t = e.detail.target.dataset.handler, o = e.detail.formId;
            this.$root.$logForm(o, 2), "function" == typeof this[t] && this[t](e.detail);
        },
        chooseCouponItem: function(e) {
            var t = e.target.id, o = void 0, i = void 0, s = this.dp, a = e.target.dataset.activeKey, n = this.data.oldPlatformPromotion;
            !n && this.$platformCoupon.setData({
                showList: !1
            }), n && this.$couponList.setData({
                showList: !1
            }), a !== t && (o = s.reQueryString({
                promotionKey: t
            }), i = JSON.stringify({
                createOrderRequestStr: JSON.stringify(o),
                marketType: "market_mogujie"
            }), this.requestData(i, function() {
                s.reQueryString({
                    promotionKey: a
                });
            }));
        },
        getComment: function(e) {
            var t = e.detail.value, o = e.target.id;
            this.data.shopComments[o] = t;
        },
        setComment: function(e) {
            var t = this.data.shopComments, o = this.data.$shop, i = e.target.id;
            o.shopComments = t, this.dp.reQueryString({
                shopKey: i,
                shopComments: t
            }), this.setData({
                shopComments: t,
                $shop: o
            });
        },
        callClickFastBuy: function() {
            this.setData({
                isShow: !1
            }), this.$mask.setData({
                isShow: null
            });
        },
        switchChange: function(e) {
            var t = e.detail.value, o = this.data.repayStage;
            this.data.canRepayStage ? t ? (this.$fenqi.setData({
                showList: !0
            }), this.dp.chosenFenqi = !0) : (this.setData({
                selectFenqi: ""
            }), this.$fenqi.setData({
                showList: !1,
                activeKey: ""
            }), this.dp.chosenFenqi = !1, delete this.dp.params.repayStageReqDTO) : (this.$toast.show(o.errorMessage || "很抱歉，您不可选择分期"), 
            this.$fenqi.setData({
                showList: !1,
                activeKey: ""
            }), this.setData({
                canRepayStage: !1,
                openRepayStage: !1
            }));
        },
        callClickModifyFenqi: function() {
            this.$fenqi.setData({
                showList: !0
            });
        },
        chooseFenqiItem: function(e) {
            var t = e.target, o = t.dataset.activeKey, i = t.dataset.activeNum, s = t.dataset.activeFee, a = e.target.id, n = e.target.dataset.num, r = e.target.dataset.fee, d = void 0, c = void 0, u = this.dp, l = {
                payway: "repayStage",
                perPrice: a,
                num: n,
                fee: r,
                chosen: !0
            };
            d = u.reQueryString({
                repayStageReqDTO: l
            }), c = JSON.stringify({
                createOrderRequestStr: JSON.stringify(d),
                marketType: "market_mogujie"
            }), this.requestData(c, function() {
                u.reQueryString({
                    repayStageReqDTO: l
                });
            }), this.$fenqi.setData({
                showList: !1,
                activeKey: o || a,
                activeFee: s || r,
                activeNum: i || n
            });
        }
    }
};