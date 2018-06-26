Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    init: function(t, e) {
        var r = this;
        t.rushInfo || this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", "本场快抢已结束，快抢落幕抢购不停，正在为您跳转至新购买地址~", function() {
            r.$root.$redirect("detail", {
                itemId: e.itemId
            }, !0);
        });
    }
};