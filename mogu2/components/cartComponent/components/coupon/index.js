Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../common/m")).default.MWP;

exports.default = {
    data: function() {
        return {
            list: [],
            shopName: ""
        };
    },
    onLoad: function() {},
    methods: {
        closeCoupon: function() {
            this.setData({
                show: !1
            }), this.$parent.setData({
                openCoupon: null
            });
        },
        formSubmitHandler: function(t) {
            var o = t.detail.formId;
            this.$root.$logForm(o, 2), this.delegate(t.detail);
        },
        delegate: function(t) {
            var o = t.target.dataset.type;
            "function" == typeof this[o] && this[o](t);
        },
        getShopCoupon: function(o) {
            var e = this, a = o.target.dataset.campid;
            a && t.request("mwp.ford.getShopCoupon", "1", {
                campId: a
            }).then(function(t) {
                t && t.data ? (e.data.list.map(function(t) {
                    t.campId == a && (t.isAlreadGet = !0);
                }), e.setData({
                    list: e.data.list
                })) : e.$parent.$toast.show(t.msg || "系统异常");
            });
        },
        couponTouch: function() {
            console.log("touch");
        }
    }
};