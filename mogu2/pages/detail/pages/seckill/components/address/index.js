function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../../../common/m")), o = e(require("../../../../../../common/service/url")), r = e(require("../../../../components/base/color")), s = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../../../components/base/index")), n = t.default.fn.sendMsg, a = t.default.MWP, i = s.handleRequestError;

exports.default = {
    data: function() {
        return {
            defaultAddr: ""
        };
    },
    components: {
        color: r.default
    },
    onLoad: function() {},
    methods: {
        init: function(e, t) {
            this.getDefaultAddress(), this.query = t;
        },
        getDefaultAddress: function() {
            var e = this;
            this.$root.$mwp("mwp.TradeWebLogistics.GetDefaultReceiveAddressActionlet", "1", {}).then(a.filterResult).then(function(t) {
                if (t) {
                    var o = t.province, r = t.city, s = t.area, n = t.address, a = t.realName + " " + o + r + s + n;
                    e.setAddressShow(a);
                } else e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", "请先在下方设置默认地址哦～");
            }).catch(function(e) {
                console.log(e), n(e, {
                    _author: "yuwan",
                    threshold: 1
                });
            });
        },
        setAddressShow: function(e) {
            this.setData({
                defaultAddr: e
            });
        },
        onAddressClick: function() {
            var e = this;
            if (wx.canIUse && wx.canIUse("web-view")) {
                var t = encodeURIComponent('{"addressId":""}'), r = encodeURIComponent(o.default.seckillDetail(this.query)), s = encodeURIComponent("https://h5.mogujie.com/mgj-address/list.html?referer=" + r + "&params=" + t);
                this.$root.$navigate("/pages/web/index?src=" + s);
            } else {
                var n = this;
                wx.canIUse && wx.canIUse("chooseAddress") ? wx.chooseAddress({
                    success: function(t) {
                        console.log(t.errMsg);
                        var o = t.userName, r = t.postalCode, s = t.provinceName, d = t.cityName, c = t.countyName, l = t.detailInfo, u = {
                            province: s,
                            city: d,
                            area: c,
                            address: l,
                            mobile: t.telNumber,
                            zip: r,
                            realName: o,
                            marketType: "market_mogujie"
                        }, p = o + " " + s + d + c + l;
                        e.$root.$mwp("mwp.TradeWebLogistics.AddReceiveAddressActionlet", "1", u).then(a.filterResult).then(function(e) {
                            var t = e.addressId;
                            n.setAddressDefault(t, p);
                        }).catch(i.bind(n));
                    },
                    fail: function(t) {
                        t.errMsg.endsWith("cancel") || (wx.canIUse && wx.canIUse("openSetting") ? wx.showModal({
                            title: "",
                            content: "需要打开小程序的设置重新授权获取您的收货地址",
                            confirmText: "去设置",
                            confirmColor: "#FB4747",
                            success: function(e) {
                                e.confirm && wx.openSetting({});
                            }
                        }) : e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", "需要微信版本升级才能重新授权读取地址哟～"));
                    }
                }) : this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", "请升级微信版本");
            }
        },
        setAddressDefault: function(e, t) {
            var o = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), this.$root.$mwp("mwp.TradeWebLogistics.SetReceiveAddressDefaultActionlet", "1", {
                addressId: e
            }).then(a.filterResult).then(function(e) {
                e ? o.setData({
                    defaultAddr: t
                }) : o.$root.$wrapper && o.$root.$wrapper.$emit("$toast.show", "设置失败，请重新尝试"), o.$root.$wrapper && o.$root.$wrapper.$emit("$loading.hide");
            }).catch(function(e) {
                o.$root.$wrapper && o.$root.$wrapper.$emit("$loading.hide"), i.bind(o, e)();
            });
        }
    }
};