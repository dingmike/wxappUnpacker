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
    installmentList: [],
    isSlected: !1,
    selectedId: ""
};

exports.default = {
    name: "installment",
    data: function() {
        return t({}, e);
    },
    methods: {
        changeInstallment: function(t) {
            var e = this.data.installmentList.filter(function(e) {
                return +e.installmentId == +t.detail.value;
            })[0];
            this.setData({
                isSlected: !0,
                selectedId: t.detail.value
            }), this.$parent.setSelectMethod({
                payType: "mailoPay",
                price: e.totalPrice,
                installmentPrice: e.totalPrice,
                installmentDesc: e.number,
                installmentId: e.installmentId
            });
        },
        setInstallmentData: function(t) {
            var e = this;
            this.data.isSlected && this.data.selectedId && t.map(function(t) {
                return +t.installmentId == +e.data.selectedId ? t.checked = !0 : t.checked = !1, 
                t;
            }), this.setData({
                installmentList: t
            });
        },
        paySubmit: function() {
            this.$parent.paySubmit();
        },
        reSetAllData: function() {
            this.setData(t({}, e));
        }
    }
};