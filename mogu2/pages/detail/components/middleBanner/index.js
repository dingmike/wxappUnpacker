Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../common/m")), e = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
}(require("../base/index")).handleRequestError, o = t.default.MWP;

exports.default = {
    data: function() {
        return {};
    },
    getCoupon: function() {
        var t = this;
        this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), this.$root.$mwp("mwp.diana.couponLaunch", "3", {
            relationKey: this.couponPid,
            platform: "app"
        }).then(o.filterResult).then(function() {
            t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide");
            t.$root.$wrapper && t.$root.$wrapper.$emit("$toast.show", "领券成功！快去我的-优惠券-全场优惠券查看");
        }).catch(function(o) {
            t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), e.bind(t)(o);
        });
    },
    methods: {
        initMceData: function(t) {
            var e = t.default && t.default.list, o = e && e.length > 0 && e[0], r = o.couponPid, i = o.bgImage, n = o.link;
            this.couponPid = r, this.link = n, i && this.setData({
                image: i
            });
        },
        couponSubmitHandler: function(t) {
            var e = t.detail.formId;
            if (this.$root.$logForm(e, 2), this.couponPid) this.getCoupon(); else {
                if (!this.link) return;
                this.$root.$redirect(this.link);
            }
        }
    }
};