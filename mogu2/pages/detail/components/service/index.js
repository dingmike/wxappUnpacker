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
            isServiceShow: null
        };
    },
    components: {
        color: t.default
    },
    onLoad: function() {},
    methods: {
        showServices: function() {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show"), this.setData({
                isServiceShow: !0
            });
        },
        onCloseClick: function() {
            var t = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.hide"), this.setData({
                isServiceShow: !1
            }), setTimeout(function() {
                t.setData({
                    isServiceShow: null
                });
            }, e.Constant.ANIMATION_TIME);
        },
        onInnerClick: function() {},
        setBackgroundImage: function(e) {
            this.setData({
                backgroundImage: e
            });
        },
        init: function(e) {
            var t = e.itemServices;
            t && this.setData(t);
        }
    }
};