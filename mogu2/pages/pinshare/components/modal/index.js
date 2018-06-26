Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            isShowModal: !1,
            itemId: "",
            activityId: ""
        };
    },
    methods: {
        initModal: function(t) {
            this.data.itemId = t.itemId, this.data.activityId = t.activityId, this.setData({
                itemId: this.data.itemId,
                activityId: this.data.activityId
            });
        },
        show: function() {
            this.setData({
                isShowModal: !0
            }), this.$root.$pinshareInfo.$dialog.$mask.show();
        },
        clickCancel: function() {
            this.hideModal(), this.$root.$logE("016000153", {});
        },
        hideModal: function() {
            this.setData({
                isShowModal: !1
            }), this.$root.$pinshareInfo.$dialog.$mask.hide();
        },
        navigateToDetail: function(t) {
            var i = this;
            this.$root.$navigate("/pages/detail/pages/pintuan/index", t.currentTarget.dataset), 
            setTimeout(function() {
                i.hideModal();
            }, 500);
        }
    }
};