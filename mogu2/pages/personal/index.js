function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    return e > 99 ? "99+" : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../../common/base/createPage")), r = require("../../common/m"), a = e(r), o = e(require("../../common/service/url")), s = e(require("../../common/service/user")), u = require("../../common/utils/cache"), l = e(u), c = e(require("../../common/utils/debug")), d = e(require("../../common/utils/imgUrlTool")), h = e(require("../../common/utils/makeup")), f = e(require("../../components/activeEntry/index")), m = e(require("../../components/imcall/index")), p = e(require("../../components/loading/index")), g = e(require("../../components/toast/index")), v = e(require("../../components/wall/index")), w = e(require("./mixins/debug")), x = a.default.MWP, _ = null;

exports.default = (0, i.default)({
    _loading: null,
    _recommendTime: 0,
    mixins: [ w.default ],
    components: {
        toast: g.default,
        loading: p.default,
        im: m.default,
        wall: v.default,
        activeEntry: f.default
    },
    data: {
        needLogin: !1,
        user: {
            userName: "",
            avatarUrl: ""
        },
        userStatus: null,
        header: {
            backgroundImage: "https://s10.mogucdn.com/mlcdn/c45406/180403_066j8h8eb1cc4291hk557h9jj11j5_750x255.jpg",
            backgroundColor: "#f96876"
        },
        notice: "",
        ads: null,
        order: {
            cObligations: 0,
            cReceipt: 0,
            cEvaluate: 0
        },
        nav: [],
        credit: null,
        mall: null,
        $activeEntry: {
            makeupKey: "top4x",
            collectFormId: !0,
            boxMinHeight: "210rpx",
            boxMargin: "0 0 18rpx",
            itemWidth: "168rpx",
            itemHeight: "180rpx",
            itemMargin: "0 0 20rpx 16rpx",
            ptpC: "mod_personal_activeEntry"
        }
    },
    onLoad: function() {
        var e = this;
        null === _ && (_ = new u.PersistentStorage("personal"));
        var t = _.get("nav");
        t && this.setData({
            nav: t
        }), this.$im.setImOpts({}), this.$wall.handleAjaxResData = function() {
            var t = e.$wall.handleAjaxResData;
            return function(e) {
                return e && e.list && e.list.forEach(function(e) {
                    e.nameTags = e.titleTags ? e.titleTags.split(";").map(function(e) {
                        return {
                            content: e
                        };
                    }) : [];
                }), t.call(this, e);
            };
        }(), this.$wall.setDataSource({
            source: "mwp_mait",
            goCdn: !1
        });
        var n = encodeURIComponent('{"addressId":""}');
        this.setData({
            canUseWebView: wx.canIUse && wx.canIUse("web-view"),
            addressSrc: "1.6.4" === r.System.getSync("systemInfo").SDKVersion ? "" : "/pages/web/index?src=" + encodeURIComponent("https://h5.mogujie.com/address/list.html?isXcxTab=1&referer=" + encodeURIComponent("/pages/personal/index") + "&params=" + n)
        });
    },
    onShow: function() {
        var e = this;
        this.$loading.show(), this.__makeup__ && this.__makeup__.reload(), this.getUserInfo().then(function() {
            return e.loadData();
        }).then(function() {
            e.$loading.hide();
        }, function(t) {
            e.$loading.hide(), e.handleError(t);
        }).then(function() {
            if (Date.now() - e._recommendTime > 6e5) return e.loadRecommends();
        });
    },
    onReady: function() {
        this.__makeup__ = new h.default(this, "75507");
    },
    onPullDownRefresh: function() {
        var e = this;
        if (this.data.needLogin) return wx.stopPullDownRefresh();
        this.__makeup__ && this.__makeup__.reload(), this.getUserInfo().then(function() {
            return e.loadData();
        }).then(function() {
            wx.stopPullDownRefresh();
        }, function(t) {
            wx.stopPullDownRefresh(), e.handleError(t);
        }).then(function() {
            return e.loadRecommends();
        });
    },
    getUserInfo: function() {
        var e = this;
        return s.default.ensure().then(function() {
            return e.setUserInfo(!1);
        }).catch(function() {
            return e.setUserInfo(!0);
        });
    },
    setUserInfo: function(e) {
        var t = {
            needLogin: e
        };
        e || (t.user = this.getUser()), this.setData(t);
    },
    refreshUserInfo: function() {
        var e = this;
        return this.$mwp("mwp.apollo.profile.userinfo.getBaseUserInfo", "1").then(x.filterResult).then(function(e) {
            return s.default.userInfo.update(e);
        }).then(function() {
            return e.setUserInfo(!1);
        }).catch(function(e) {
            return console.error("Fail to refresh user info", e.message);
        });
    },
    getUser: function() {
        var e = s.default.userInfo || {};
        return {
            userName: e.uname || "",
            avatarUrl: d.default.getGoodsRatioSuffix(e.avatar, 120, "1:1") || ""
        };
    },
    loadData: function() {
        var e = this;
        return this._loading ? this._loading : this._loading = this.getNavItems().then(function() {
            return e.data.needLogin || Promise.all([ e.refreshUserInfo(), e.getOrderStatus(), e.getExpireCoupon(), e.getPersonalMakeup() ]);
        }).then(function() {
            e._loading = null;
        }, function(t) {
            throw e._loading = null, t;
        });
    },
    getOrderStatus: function() {
        var e = this;
        return this.$mwp("mwp.OrderManagement.buyerOrderCount", "1", {
            marketType: "market_mogujie"
        }).then(x.filterResult).then(function(t) {
            e.setOrder(t);
        }, function(t) {
            e.setOrder(), c.default.error(t);
        });
    },
    getNavItems: function() {
        var e = this;
        return this.$mce_get({
            pid: "93035"
        }).then(function(t) {
            if (0 === t.list.length) return _.get("nav") || [];
            var n = t.list.reduce(function(t, n) {
                var i = n.link;
                return n.visibility = "" !== n.wxa_appId || o.default.$has(i), i.startsWith("/pages/coupon/index") ? n.subTitle = _.get("expireCoupon") : i.startsWith("/pages/im/index") ? (n._link = i, 
                n.link = "", n.isIM = !0) : i.startsWith("/pages/web/index") && (n.visibility = n.visibility && e.data.canUseWebView), 
                t[n.groupKey] = (t[n.groupKey] || []).concat(n), t;
            }, Object.create(null));
            return Object.keys(n).map(function(e) {
                return {
                    groupKey: e,
                    list: n[e]
                };
            });
        }).then(function(t) {
            _.put("nav", t), e.setData({
                nav: t
            });
        });
    },
    getExpireCoupon: function() {
        var e = this;
        return this.$mwp("mwp.member.homeCouponExpire", "1.0").then(x.filterResult).then(function(n) {
            var i = "";
            if (e.data.nav.some(function(e, t) {
                return e.list.some(function(e, n) {
                    return !!e.link.startsWith("/pages/coupon/index") && (i = "nav[" + t + "].list[" + n + "].subTitle", 
                    !0);
                });
            }), i) {
                var r = n > 0 ? n + "张优惠券即将过期" : "";
                _.put("expireCoupon", r), e.setData(t({}, i, r));
            }
        });
    },
    getUserStatus: function() {
        var e = this;
        return this.$mwp("mwp.payuser_portal.myPageUserStatus", "1").then(x.filterResult).then(function(t) {
            if (t.link) {
                var n = t.link.split(":");
                n.length > 1 && (t.appId = n[0], t.link = n.slice(1).join(":")), e.setData({
                    userStatus: t
                });
            }
        }, function(e) {
            c.default.error(e);
        });
    },
    getPersonalMakeup: function() {
        var e = this;
        return this.$mce_makeup({
            pid: "109789"
        }).then(function(t) {
            e.setHeader(t.header), e.setNotice(t.notice), e.setUserAds(t.ads), e.setMceData("mall", t.mall);
        });
    },
    setHeader: function(e) {
        if (e && e.list.length > 0) {
            var t = e.list[0];
            this.setData({
                header: t
            }), wx.canIUse && wx.canIUse("setNavigationBarColor") && wx.setNavigationBarColor({
                frontColor: t.frontColor,
                backgroundColor: t.backgroundColor
            });
        }
    },
    setNotice: function(e) {
        if (e && e.list.length > 0) {
            var t = e.list[0].text;
            if (t) {
                if (_.get("dismissedNotice") === t) return;
                this.setData({
                    notice: t
                });
            }
        }
    },
    setUserAds: function(e) {
        e && e.list.length > 0 && this.setData({
            ads: e.list[0]
        });
    },
    setMceData: function(e, n) {
        n && n.list.length > 0 ? this.setData(t({}, e, n.list)) : this.setData(t({}, e, null));
    },
    setOrder: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.setData({
            order: {
                cObligations: n(e.unpaidOrderCount),
                cReceipt: n(e.waitReceivedOrderCount),
                cEvaluate: n(e.waitingRateOrderCount)
            }
        });
    },
    loadRecommends: function() {
        this._recommendTime = Date.now(), this.$wall.maxItemNum = 40, this.$wall.initWall({
            pid: "53223"
        });
    },
    handleError: function(e) {
        s.default.showUserError(e) || (c.default.error(e.stack), this.$toast.show(e.message));
    },
    handleLogin: function() {
        var e = this;
        this.$loading.show(), s.default.login().then(function() {
            return e.$loading.hide(), e.loadData();
        }).catch(function(t) {
            e.$loading.hide(), e.handleError(t);
        });
    },
    handleNavigate: function(e) {
        e.currentTarget.dataset.appId ? this.$canLaunch() ? this.$launch(e) : wx.showModal({
            title: "提示",
            content: "当前微信版本不支持跳转小程序",
            showCancel: !1,
            confirmColor: l.default.get("primaryColor")
        }) : this.$navigate(e);
    },
    onDismissNotice: function() {
        _.put("dismissedNotice", this.data.notice), this.setData({
            notice: ""
        });
    },
    chooseAddress: function() {
        var e = this;
        wx.canIUse && wx.canIUse("chooseAddress") ? wx.chooseAddress({
            success: function(t) {
                var n = {
                    phone: "",
                    city: t.cityName,
                    mobile: t.telNumber,
                    street: "",
                    area: t.countyName,
                    realName: t.userName,
                    address: t.detailInfo,
                    zip: t.postalCode,
                    marketType: "market_mogujie",
                    province: t.provinceName
                };
                e.$mwp("mwp.TradeWebLogistics.AddReceiveAddressActionlet", "1", n).then(x.filterResult).catch(function(e) {
                    console.error("Fail to save address:", e.message);
                });
            },
            fail: function(t) {
                t.errMsg.endsWith("cancel") || (wx.canIUse && wx.canIUse("openSetting") ? wx.showModal({
                    title: "",
                    content: "需要打开小程序的设置重新授权获取您的收货地址",
                    cancelColor: "#666666",
                    confirmText: "去设置",
                    confirmColor: "#ff5777",
                    success: function(e) {
                        e.confirm && wx.openSetting({});
                    }
                }) : e.$toast.show("需要微信版本升级才能重新授权读取地址哟～"));
            }
        }) : this.$toast.show("需要微信版本升级才能读取地址哟～");
    },
    onPageScroll: function() {
        this.$expose && this.$expose();
    }
});