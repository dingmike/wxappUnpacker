Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../common/m")).default.MWP, e = {
    isNeedSignProtocol: !1,
    isShowProtocol: !1,
    checkedProtocol: !0,
    numHasInput: [],
    numHasInputStr: "",
    canSendSms: !0,
    countdownStr: "60秒后重发",
    phoneNumTail: "",
    numArr: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "x" ],
    protocolUrlArr: [ "2dl0106lk0hkj6gga8a1hie8ch15h", "59159he92e7e70eg6fi42a5ali15h", "4547g00e5d0k839leiijhj10gca19", "018l19i4lge80gf3i0g2a13i7k0b0", "7jkj70lcal9bkh3a0i4de3fik0bce", "353hihf764hc13ied6dcib76lkb90", "13g974ld7d62f8i699lakg47iakik", "57892e3ail48i4ga3b9jdg075426g", "647b96hj1jc36638b1k6ldjec9kjb", "0je8ba66l5lhkhj1d2h16l510lkge", "3b4h44lhlei1ib0c4a7dj070kef38", "472chd378ie4l8j42l9ccfek8hifl", "55bg45i83k3k4hkcj0lke03dlabi6", "43gh4i89j6lg4ijdhb2e3ck477859", "2ac8l1g0jb0f5ll2fd6349g94k6ga", "52k96eg3ebi6l37laf60eg43jg8g2", "0g274926ld1jg867597a5cb09hca3", "54f9892e7jlch34alka2b970f6j2b", "514a160cl03ab8b294f0a965201e0", "861i73gjelc1hahh1afcgcik8jjjj" ]
};

exports.default = {
    name: "message",
    data: function() {
        return t({}, e);
    },
    methods: {
        changeCheckedProtocol: function() {
            this.setData({
                checkedProtocol: !this.data.checkedProtocol
            }), 6 === this.data.numHasInput.length && this.data.checkedProtocol && this.$parent.mailoPay({
                verifyCode: this.data.numHasInputStr
            });
        },
        sendSms: function() {
            var t = this;
            a.request("mwp.pay_cashier.bfmFirstUseWithSms", 1, {
                payId: this.$parent.data.params.payId
            }).then(function(a) {
                if ("SUCCESS" === a.ret) {
                    t.$parent.$toast.show(a.data.msg), t.setData({
                        canSendSms: !1
                    });
                    var e = 60;
                    !function a() {
                        setTimeout(function() {
                            if ((e -= 1) <= 0) return e = 60, void t.setData({
                                canSendSms: !0
                            });
                            t.setData({
                                countdownStr: e + "秒后重发"
                            }), a();
                        }, 1e3);
                    }();
                } else t.$parent.$toast.show(a.msg || "网络错误");
            });
        },
        numTap: function(t) {
            var a = t.target.dataset.num;
            if ("" !== a && !("x" !== a && this.data.numHasInput.length >= 6)) {
                var e = this.data.numHasInput;
                if ("x" === a ? e.pop() : e.push(a), this.setData({
                    numHasInput: e,
                    numHasInputStr: e.join("")
                }), 6 === e.length) {
                    if (this.data.isNeedSignProtocol && !this.data.checkedProtocol) return void this.$parent.$toast.show("您未同意借款合同");
                    this.$parent.mailoPay({
                        smsVerifyCode: this.data.numHasInputStr
                    });
                }
            }
        },
        hideProtocol: function() {
            this.setData({
                isShowProtocol: !1
            });
        },
        showProtocol: function() {
            this.setData({
                isShowProtocol: !0
            });
        },
        reSetAllData: function() {
            this.setData(t({}, e));
        }
    }
};