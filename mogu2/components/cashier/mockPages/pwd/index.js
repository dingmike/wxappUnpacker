function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, n = t(require("../../../../common/m")), s = t(require("../../../../common/utils/encrypt/aes.js")), i = t(require("../../../../common/utils/encrypt/rsa.js")), r = n.default.MWP, u = {
    isSetPwd: !0,
    isReInput: !1,
    numHasInput: [],
    numHasInputAgain: [],
    hasVerifyPwd: "",
    numArr: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "x" ]
};

exports.default = {
    name: "pwd",
    data: function() {
        return a({}, u);
    },
    methods: {
        numTap: function(t) {
            var a = t.currentTarget.dataset.num;
            if ("" !== a) {
                var n = this.data.isReInput ? "numHasInputAgain" : "numHasInput";
                "x" !== a && this.data[n].length >= 6 || ("x" === a ? this.data[n].pop() : this.data[n].push(a), 
                this.setData(e({}, n, this.data[n])), this.handlerInput());
            }
        },
        handlerInput: function() {
            var t = this;
            if (6 === this.data.numHasInput.length) {
                if (!this.data.isSetPwd) return this.data.isSetPwd || 0 !== this.data.numHasInputAgain.length ? void (this.data.isSetPwd || 6 !== this.data.numHasInputAgain.length || (this.data.numHasInput.join("") === this.data.numHasInputAgain.join("") ? this.getSeedAndAes(this.data.numHasInput.join("")).then(function(e) {
                    t.setPwd(e).then(function() {
                        t.$parent.afterPwd(e);
                    });
                }) : (this.$parent.$toast.show("两次密码输入不一致"), this.reSetData()))) : (this.$parent.$toast.show("请再次输入支付密码"), 
                void this.setData({
                    isReInput: !0
                }));
                this.getSeedAndAes(this.data.numHasInput.join("")).then(function(e) {
                    t.verifyPwd(e).then(function(a) {
                        a && t.$parent.afterPwd(e);
                    });
                });
            }
        },
        getSeedAndAes: function(t) {
            var e = this;
            return new Promise(function(a) {
                r.request("mwp.pay_cashier.getSrandNum", 1, {}).then(function(n) {
                    if ("SUCCESS" === n.ret) {
                        var r = s.default.encrypt(n.data.randNum, t), u = i.default.encrypt(r);
                        a(u);
                    } else e.$parent.$toast.show(n.msg || "网络错误");
                });
            });
        },
        verifyPwd: function(t) {
            var e = this;
            return new Promise(function(a) {
                r.request("mwp.pay_cashier.passwordCheck", 1, {
                    pwd: t
                }).then(function(n) {
                    e.reSetData(), "SUCCESS" === n.ret ? (e.$parent.$toast.show(n.data.desc), 1001 === n.data.type && (e.setData({
                        hasVerifyPwd: t
                    }), a(t))) : e.$parent.$toast.show(n.msg || "网络错误");
                });
            });
        },
        setPwd: function(t) {
            var e = this;
            return new Promise(function(a) {
                r.request("mwp.pay_cashier.passwordAdd", 1, {
                    pwd: t,
                    pwdConfirm: t
                }).then(function(n) {
                    if ("SUCCESS" !== n.ret) return e.$parent.$toast.show(n.msg), void e.reSetData();
                    n.data.setResult && (e.$parent.$toast.show("密码设置成功"), e.setData({
                        hasVerifyPwd: t
                    }), a(t));
                });
            });
        },
        reSetData: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.isSetPwd;
            this.setData({
                isSetPwd: t,
                isReInput: !1,
                numHasInput: [],
                numHasInputAgain: []
            });
        },
        reSetAllData: function() {
            this.setData(a({}, u));
        }
    }
};