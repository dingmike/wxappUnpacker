Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../base/color"));

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: t.default
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            this.setData(t);
        },
        onShopClick: function(t) {
            var e = t.detail.formId;
            this.$root.$logForm(e, 2), this.$root.$redirect("shop", t.currentTarget.dataset);
        }
    }
};