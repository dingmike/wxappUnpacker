Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../common/m")).default.MWP;

exports.default = {
    data: function() {
        return {
            address: "",
            realName: "",
            mobile: "",
            province: "",
            city: "",
            area: "",
            addressId: "",
            isDefault: !1,
            isSetAddr: !1
        };
    },
    onLoad: function() {},
    methods: {
        formSubmitHandler: function(e) {
            var t = e.detail.formId;
            this.$root.$logForm(t, 1), this.chooseContact();
        },
        chooseContact: function(t) {
            var s = this;
            if (wx.canIUse && wx.canIUse("web-view")) {
                var a = encodeURIComponent('{"addressId":"' + this.data.addressId + '"}'), r = encodeURIComponent("/pages/buy/index");
                this.$root.$navigate("/pages/web/index?src=" + encodeURIComponent("https://h5.mogujie.com/mgj-address/list.html?referer=" + r + "&params=" + a));
            } else {
                var o = this, n = this.$parent.dp;
                wx.canIUse && wx.canIUse("chooseAddress") ? wx.chooseAddress({
                    success: function(t) {
                        var s = t.userName, a = t.postalCode, r = {
                            province: t.provinceName,
                            city: t.cityName,
                            area: t.countyName,
                            address: t.detailInfo,
                            mobile: t.telNumber,
                            zip: a,
                            realName: s,
                            marketType: "market_mogujie"
                        };
                        e.request("mwp.TradeWebLogistics.AddReceiveAddressActionlet", "1", r).then(function(e) {
                            if (e.data) {
                                var t = e.data.addressId, s = n.reQueryString({
                                    addressId: t
                                }), a = JSON.stringify({
                                    createOrderRequestStr: JSON.stringify(s),
                                    marketType: "market_mogujie"
                                });
                                o.$emit("update", a);
                            } else o.$parent.$toast.show(e.msg);
                        });
                    },
                    fail: function(e) {
                        e.errMsg.endsWith("cancel") || (wx.canIUse && wx.canIUse("openSetting") ? wx.showModal({
                            title: "",
                            content: "需要打开小程序的设置重新授权获取您的收货地址",
                            confirmText: "去设置",
                            confirmColor: "#ff5777",
                            success: function(e) {
                                e.confirm && wx.openSetting({});
                            }
                        }) : s.$parent.$toast.show("需要微信版本升级才能重新授权读取地址哟～"));
                    }
                }) : this.$parent.$toast.show("请升级微信版本");
            }
        },
        setDefaultAddr: function(t) {
            var s = this, a = (t.currentTarget.dataset || {}).addressId;
            !!a && e.request("mwp.TradeWebLogistics.SetReceiveAddressDefaultActionlet", "1", {
                addressId: a
            }).then(function() {
                s.$parent.$toast.show("已设置为默认地址"), s.setData({
                    isSetAddr: !0
                });
            }).catch(function() {});
        }
    }
};