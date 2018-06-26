function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../ruleInfo/index")), n = e(require("../productInfo/index"));

exports.default = {
    data: function() {
        return {};
    },
    components: {
        ruleInfo: t.default,
        productInfo: n.default
    },
    onLoad: function() {},
    methods: {
        init: function(e) {
            this.setData(e.itemParams), this.$ruleInfo.init(e.itemParams), this.$productInfo.init(e.itemParams);
        }
    }
};