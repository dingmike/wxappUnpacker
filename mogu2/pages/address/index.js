function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), o = e(require("../../components/toast/index")), s = e(require("../../components/loading/index")), n = e(require("../../common/base/createPage")), r = t.default.MWP;

exports.default = (0, n.default)({
    components: {
        toast: o.default,
        loading: s.default
    },
    data: {
        loading: s.default,
        toast: o.default
    },
    onLoad: function(e) {
        var t = this;
        this.referer = e && e.referer, this.isXcxTab = e && e.isXcxTab, setTimeout(function() {
            t.chooseContact();
        }, 300);
    },
    methods: {
        getListPath: function() {
            return "https://h5.mogujie.com/address/list.html";
        },
        getEditPath: function() {
            return "https://h5.mogujie.com/address/edit.html";
        },
        chooseContact: function() {
            var e = this, t = this, o = this.getListPath(), s = this.getEditPath(), n = {
                referer: encodeURIComponent(this.referer)
            };
            this.isXcxTab && (n = Object.assign(n, {
                isXcxTab: this.isXcxTab
            })), wx.canIUse && wx.canIUse("chooseAddress") ? wx.chooseAddress({
                success: function(a) {
                    var c = a.userName, i = a.postalCode, d = {
                        province: a.provinceName,
                        city: a.cityName,
                        area: a.countyName,
                        address: a.detailInfo,
                        mobile: a.telNumber,
                        zip: i,
                        realName: c,
                        marketType: "market_mogujie",
                        hasWcxFlag: !0
                    };
                    r.request("mwp.TradeWebLogistics.AddReceiveAddressActionlet", "1", d).then(function(r) {
                        if (!r.data) {
                            var a = Object.assign({}, n, {
                                params: encodeURIComponent('{"addressId": ""}')
                            });
                            return a = t.parseObjectToUrl(a), void wx.showModal({
                                title: "提示",
                                content: "出错了，请重新添加地址",
                                confirmText: "确认",
                                showCancel: !1,
                                confirmColor: "#ff5777",
                                success: function() {
                                    t.$redirect("/pages/web/index?src=" + encodeURIComponent(o + "?" + a));
                                }
                            });
                        }
                        if ("FAIL_BIZ_ADDRESS_NOT_MATCH" === r.ret) {
                            var c = r.data, i = c.province, d = c.city, m = c.area, l = c.address, u = c.mobile, f = c.zip, p = c.realName, h = Object.assign({}, n, {
                                params: encodeURIComponent(JSON.stringify({
                                    province: i,
                                    city: d,
                                    area: m,
                                    address: l,
                                    mobile: u,
                                    zip: f,
                                    realName: p
                                }))
                            });
                            h = t.parseObjectToUrl(h), wx.showModal({
                                title: r.msg,
                                content: "填写部分已保存，请补充其他信息",
                                confirmText: "确认",
                                showCancel: !1,
                                confirmColor: "#ff5777",
                                success: function() {
                                    t.$redirect("/pages/web/index?src=" + encodeURIComponent(s + "?" + h));
                                }
                            });
                        } else {
                            var b = r.data.addressId, g = Object.assign({}, n, {
                                params: encodeURIComponent('{"addressId": ' + b + "}")
                            });
                            g = t.parseObjectToUrl(g), e.$redirect("/pages/web/index?src=" + encodeURIComponent(o + "?" + g));
                        }
                    });
                },
                fail: function(t) {
                    if (t.errMsg.endsWith("cancel")) {
                        var s = Object.assign({}, n, {
                            params: encodeURIComponent('{"addressId": ""}')
                        });
                        return s = e.parseObjectToUrl(s), void e.$redirect("/pages/web/index?src=" + encodeURIComponent(o + "?" + s));
                    }
                    wx.canIUse && wx.canIUse("openSetting") ? wx.showModal({
                        title: "",
                        content: "需要打开小程序的设置重新授权获取您的收货地址",
                        confirmText: "去设置",
                        confirmColor: "#ff5777",
                        success: function(e) {
                            e.confirm && wx.openSetting({});
                        }
                    }) : e.$toast.show("需要微信版本升级才能重新授权读取地址哟～");
                }
            }) : this.$toast.show("请升级微信版本");
        },
        parseObjectToUrl: function(e) {
            var t = "";
            return Object.keys(e).forEach(function(o) {
                t += "&" + o + "=" + e[o];
            }), t.replace(/^&/, "");
        }
    }
});