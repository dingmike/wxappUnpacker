function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../mask/index")), i = t(require("../footprintdialog/index")), o = t(require("../cartComponent/index")), a = t(require("../../common/m")), s = t(require("../imcall/index")), n = t(require("../../common/service/url")), h = a.default.fn.sendMsg;

exports.default = {
    data: function() {
        return {
            isShowTop: !0,
            isNeedTop: !0,
            scrollTop: 0,
            scrollTopRange: 600,
            bottom: 120,
            topShow: !1,
            entryShow: null,
            navStatus: "close",
            guideImage: "https://s10.mogucdn.com/mlcdn/c45406/170711_0gk13eg5gld0ddb016663lli28bfc_750x552.png",
            topImage: "http://s3.mogucdn.com/mlcdn/c45406/170607_542jddkeff0ceg0l7gh7cji40dc98_108x108.png",
            navImage: "http://s11.mogucdn.com/mlcdn/c45406/170607_36gj28a16508a9hcjf5i6f03dida8_108x108.png",
            closeImage: "http://s2.mogucdn.com/mlcdn/c45406/170607_5c4790367g1e2ee3b42026a1gllih_108x108.png",
            webImImage: "https://s10.mogucdn.com/mlcdn/c45406/170911_1f8kb6k4680j9h5g7gi4de1hajj9i_108x108.png",
            configsList: [ {
                image: "http://s3.mogucdn.com/mlcdn/c45406/170607_1c1j7dfcih0bei34gk9djjkbdhg21_80x80.png",
                page: "home",
                text: "首页",
                name: "home",
                isShow: !!n.default.home
            }, {
                image: "http://s11.mogucdn.com/mlcdn/c45406/170607_32g439e2gig2588dkgalf7jf1c49a_80x80.png",
                page: "footprint",
                text: "足迹",
                name: "foot",
                isShow: !0
            }, {
                image: "http://s11.mogucdn.com/mlcdn/c45406/170607_55897ack5k25629b8i8d20chehaha_80x80.png",
                page: "searchMiddle",
                text: "搜索",
                name: "search",
                isShow: !!n.default.searchMiddle
            }, {
                image: "https://s10.mogucdn.com/mlcdn/c45406/170607_7b7d927f81fhe9b2gibe3g06akl5f_80x80.png",
                page: "cart",
                text: "购物车",
                name: "cart",
                isShow: !0
            } ],
            hasGuideShow: !1,
            webIm: null,
            isWebImTipsShow: null
        };
    },
    components: {
        mask: e.default,
        footPrintDialog: i.default,
        cartComponent: o.default,
        imCall: s.default
    },
    onLoad: function() {
        this.$on("hideDialog", this.hideEntry);
    },
    init: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        try {
            var i = wx.getStorageSync("quickNavigateData");
            this.hasGuideShow = i && i.hasGuideShow || !1;
        } catch (t) {
            h(t, {
                _author: "changsheng",
                threshold: 1
            });
        }
        this.$footPrintDialog.init({
            $mask: this.$mask
        }), e.webIm && this.$imCall.setImOpts(e.webIm), this.setData({
            scrollTopRange: e.scrollTopRange || this.data.scrollTopRange,
            bottom: e.bottom || this.data.bottom,
            hasGuideShow: this.hasGuideShow || !1,
            webIm: e.webIm
        }), e.webIm && !e.isWebImTipsHide && wx.getStorage({
            key: "quickNavigation.webImTipsHide",
            success: function(e) {
                e.data || t.initWebImTips();
            },
            fail: function() {
                t.initWebImTips();
            }
        });
    },
    initWebImTips: function() {
        var t = this;
        setTimeout(function() {
            t.showWebImTips();
        }, 2e3), setTimeout(function() {
            t.hideWebImTips();
        }, 7e3);
    },
    showWebImTips: function() {
        this.setData({
            isWebImTipsShow: !0
        });
    },
    hideWebImTips: function() {
        var t = this;
        this.setData({
            isWebImTipsShow: !1
        }), setTimeout(function() {
            t.setData({
                isWebImTipsShow: null
            });
        }, 400);
    },
    hideGuide: function() {
        var t = this;
        this.hasGuideShow = !0, wx.setStorage({
            key: "quickNavigateData",
            data: {
                hasGuideShow: this.hasGuideShow
            },
            success: function() {
                t.setData({
                    hasGuideShow: t.hasGuideShow
                });
            },
            fail: function(t) {
                h(t, {
                    _author: "changsheng",
                    threshold: 1
                });
            }
        });
    },
    methods: {
        setScrollTop: function(t) {
            var e = this.data.scrollTopRange;
            t >= e && !this.data.topShow ? this.setData({
                topShow: !0
            }) : t < e && this.data.topShow && this.setData({
                topShow: !1
            });
        },
        showEntry: function() {
            this.hideGuide(), this.$mask.show(), this.setData({
                entryShow: !0
            });
        },
        hideEntry: function() {
            var t = this;
            this.$mask.hide(), this.setData({
                entryShow: !1
            }), setTimeout(function() {
                t.setData({
                    entryShow: null
                });
            }, 400);
        },
        onGuideClick: function() {
            this.hideGuide();
        },
        showCart: function() {
            this.$cartComponent.setData({
                hideEmptyButton: !0
            }), this.$cartComponent.init();
        },
        onNavClick: function(t) {
            var e = t.currentTarget.dataset, i = e.page;
            switch (i) {
              case "home":
              case "searchMiddle":
                this.$root.$redirect(i, {
                    fromPage: e.fromPage
                });
                break;

              case "cart":
                this.$cartComponent.setData({
                    hideEmptyButton: !0,
                    noMask: !0
                }), this.$cartComponent.init();
                break;

              case "footprint":
                this.$footPrintDialog.showDialog();
            }
        },
        onImClick: function() {
            wx.setStorage({
                key: "quickNavigation.webImTipsHide",
                data: !0
            });
        }
    }
};