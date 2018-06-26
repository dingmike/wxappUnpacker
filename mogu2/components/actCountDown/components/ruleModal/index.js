Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            isShowModal: !1,
            bgImage: "",
            ruleImage: ""
        };
    },
    onLoad: function() {},
    methods: {
        show: function() {
            this.setData({
                isShowModal: !0
            });
        },
        cancelModal: function() {
            this.setData({
                isShowModal: !1
            }), this.$root.$mask && this.$root.$mask.hide();
        }
    }
};