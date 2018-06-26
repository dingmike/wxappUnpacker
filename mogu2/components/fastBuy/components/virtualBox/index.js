function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/m")), a = e(require("../../../../common/utils/cache")), i = t.default.MCE, n = {
    "中国电信": "ChinaTelcom",
    "中国移动": "ChinaMobile",
    "中国联通": "ChinaUnion",
    "虚拟运营商": "OtherTelphone"
};

exports.default = {
    data: function() {
        return {
            virtualChargeInfo: {
                accountType: "mobile",
                mobileOperate: ""
            },
            chargeNumber: "",
            tip: null,
            placeholder: "",
            iconImage: "",
            rules: {},
            isCharge: !1
        };
    },
    methods: {
        init: function(e) {
            var t = this, l = "请输入手机号码", o = "", r = this.data.chargeNumber, c = a.default.get("local.number") || {}, s = parseInt(e.leafCid), h = 10004454 === s || 10004577 === s;
            switch (e.accountType) {
              case "mobile":
                o = "https://s10.mogucdn.com/mlcdn/c45406/171025_7abllhkc011ka5kici7532af6202g_28x40.png", 
                h && (l = "请输入充值手机号码"), "激活码" === e.rechargeMethod && (l = "请填写手机号，激活码将以短信方式发送");
                break;

              case "qq":
                o = "https://s10.mogucdn.com/mlcdn/c45406/171024_4dk50g015la22946k786bi8je3j3d_60x60.png", 
                l = "请输入充值QQ号码";
            }
            r = r || c[e.accountType + e.leafCid] || "", this.setData({
                isCharge: h,
                placeholder: l,
                iconImage: o,
                virtualChargeInfo: e,
                chargeNumber: r,
                operator: n[e.mobileOperate]
            }), "qq" === e.accountType && r && this.validateQQ(r), "mobile" === e.accountType && (h ? i.get({
                pid: 82160
            }).then(function(e) {
                e.list && e.list.length > 0 && (t.setData({
                    rules: e.list[0] || {}
                }), r && t.validateTelephone(r));
            }).catch(function(e) {
                console.log(e);
            }) : r && this.validateTelephone(r));
        },
        initBeautyMedicine: function() {
            this.setData({
                placeholder: "请输入手机号码",
                iconImage: "https://s10.mogucdn.com/mlcdn/c45406/171025_7abllhkc011ka5kici7532af6202g_28x40.png"
            });
        },
        onInput: function(e) {
            var t = e.detail.value;
            this.setData({
                chargeNumber: t
            }), this.validate(t);
        },
        onBlur: function(e) {
            var t = e.detail.value;
            this.validate(t);
        },
        clearInput: function() {
            this.setData({
                chargeNumber: "",
                tip: null
            });
        },
        validate: function(e) {
            "mobile" === this.data.virtualChargeInfo.accountType && this.validateTelephone(e), 
            "qq" === this.data.virtualChargeInfo.accountType && this.validateQQ(e);
        },
        validateTelephone: function(e) {
            var t = /^1(3|4|5|7|8)\d{9}$/, a = null, i = this.data.virtualChargeInfo;
            if (t.test(e)) if (this.data.isCharge) {
                var n = this.data.operator, l = this.data.rules[n];
                a = new RegExp(l.substring(1, l.length - 1)).test(e) ? {
                    isCorrect: !0,
                    text: i.mobileOperate
                } : {
                    isCorrect: !1,
                    text: "该商品不支持该运营商"
                };
            } else a = {
                isCorrect: !0,
                text: ""
            }; else e.length > 7 && (a = {
                isCorrect: !1,
                text: "请输入正确的手机号码"
            });
            this.setData({
                tip: a
            });
        },
        validateQQ: function(e) {
            var t = null;
            /^[1-9]\d{4,10}$/.test(e) ? t = {
                isCorrect: !0,
                text: ""
            } : e.length > 4 && (t = {
                isCorrect: !1,
                text: "请输入正确的QQ号码"
            }), this.setData({
                tip: t
            });
        }
    }
};