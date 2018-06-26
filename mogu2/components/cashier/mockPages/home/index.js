Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = {
    payMethods: [],
    selectedMethod: {},
    topbanner: [],
    isShowTopbanner: !1,
    isCopytopbannerText: !1,
    animationData: {}
};

exports.default = {
    name: "home",
    data: function() {
        return t({}, e);
    },
    methods: {
        setHomeData: function(e) {
            var a = this;
            e.topbanner.length && (e.isShowTopbanner = !0), this.setData(t({}, e)), e.isShowTopbanner && setTimeout(function() {
                a.topbannerScroll();
            }, 1e3);
        },
        goInstallment: function() {
            this.$parent.goInstallment();
        },
        paySubmit: function() {
            this.$parent.paySubmit();
        },
        hideTopbanner: function() {
            this.setData({
                isShowTopbanner: !1
            });
        },
        changeMethod: function(t) {
            var e = this.data.payMethods.filter(function(e) {
                return e.payType === t.detail.value;
            })[0];
            "mailoPay" === t.detail.value && this.$parent.data.selectedMethod.installmentPrice && (e.data.price = this.$parent.data.selectedMethod.installmentPrice), 
            this.$parent.setSelectMethod({
                payType: e.payType,
                data: e.data,
                price: e.data.price,
                hongbaoUse: e.data.hongbaoUse
            });
        },
        topbannerScroll: function() {
            var t = this;
            if (wx.createSelectorQuery) {
                var e = wx.createSelectorQuery();
                e.select("#cashier-notice-scroll").boundingClientRect(), e.selectViewport().boundingClientRect(), 
                e.exec(function(e) {
                    var a = e[0], n = e[1];
                    if (a && n && a.width > n.width - 70) {
                        var i = a.width / n.width * 5e3;
                        t.setData({
                            isCopytopbannerText: !0
                        });
                        var o = wx.createAnimation({
                            duration: i,
                            timingFunction: "linear"
                        });
                        o.translateX("-" + a.width + "px").step();
                        var r = o.export(), s = wx.createAnimation({
                            duration: 0
                        });
                        s.translateX(0).step();
                        var c = s.export();
                        !function e() {
                            t.data.isShowTopbanner && (t.setData({
                                animationData: r
                            }), setTimeout(function() {
                                t.setData({
                                    animationData: c
                                }), setTimeout(function() {
                                    e();
                                }, 500);
                            }, i));
                        }();
                    }
                });
            }
        },
        reSetAllData: function() {
            this.setData(t({}, e));
        }
    }
};