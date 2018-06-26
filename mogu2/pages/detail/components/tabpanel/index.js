Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../base/color"));

exports.default = {
    data: function() {
        return {
            configs: [ {
                title: "图文详情",
                elementId: "moduleTabpanelGrighic"
            }, {
                title: "商品参数",
                elementId: "moduleTabpanelParameter"
            }, {
                title: "热卖推荐",
                elementId: "moduleTabpanelRecommend"
            } ]
        };
    },
    components: {
        color: e.default
    },
    onLoad: function() {},
    methods: {
        init: function(e, t, n) {
            var o = n.jcubeOptions;
            if (o && o.length > 0 && o[0].isRecommendHide) {
                var a = this.data.configs;
                a = a.filter(function(e) {
                    return "热卖推荐" !== e.title;
                }), this.setData({
                    configs: a
                });
            }
        },
        onTabClick: function(e) {
            var t = e.currentTarget, n = t.dataset.elementId, o = t.dataset.title;
            this.$root.$logE("016000104", {
                tableName: o
            }), this.$root.$wrapper.setData({
                scrollIntoView: n
            });
        }
    }
};