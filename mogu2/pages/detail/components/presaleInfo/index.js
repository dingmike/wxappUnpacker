Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../base/index"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../base/color"));

exports.default = {
    data: function() {
        return {
            isShow: null
        };
    },
    components: {
        color: t.default
    },
    onLoad: function() {},
    methods: {
        init: function(e) {
            if (e.preSaleInfo && e.preSaleInfo.ruleDesc) {
                var t = e.preSaleInfo, o = t.ruleDesc;
                o.rule = o.rules.map(function(e) {
                    return e.replace(/<(\/)?[\w\d\s="']+>/g, "");
                }), t.ruleDesc = o, this.setData(t);
            }
        },
        onInnerClick: function() {},
        onCloseClick: function() {
            var t = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.hide"), this.setData({
                isShow: !1
            }), setTimeout(function() {
                t.setData({
                    isShow: null
                });
            }, e.Constant.ANIMATION_TIME);
        },
        showDetail: function() {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show"), this.setData({
                isShow: !0
            });
        }
    }
};