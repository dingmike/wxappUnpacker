function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/m")), o = e(require("../../../../common/utils/imgUrlTool")), n = e(require("../base/color")), i = t.default.fn.sendMsg;

exports.default = {
    data: function() {
        return {
            modId: 10013
        };
    },
    components: {
        color: n.default
    },
    methods: {
        init: function(e, t) {
            var o = this, n = e.shopRecommend, r = t.itemId;
            this.$root.$mce_recommend({
                pid: 53220,
                iidE: r,
                plat: "h5",
                pageSize: 12
            }).then(function(e) {
                e.list && e.list.length > 0 ? o.setRecommendData(e, n) : i(new Error("热卖推荐数据错误"), {
                    _author: "changsheng",
                    threshold: 1
                });
            }).catch(function(e) {
                console.log(e), i(e, {
                    _author: "changsheng",
                    threshold: 1
                });
            });
        },
        setRecommendData: function(e) {
            var t = e.list || [], n = [], i = [], r = [];
            t && t.length > 0 && (e.list = t.map(function(e, t) {
                return n.push(e.item_id), r.push(e.acm), i.push(t), e.image = o.default.getGoodsRatioSuffix(e.image, 200, "2:3"), 
                e;
            }), this.setData(e));
        }
    }
};