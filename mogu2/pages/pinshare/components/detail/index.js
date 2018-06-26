Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../common/utils/imgUrlTool"));

exports.default = {
    components: {
        imgUrlTool: t.default
    },
    data: function() {
        return {
            status: "",
            itemInfo: {},
            tagContent: "",
            isJoin: !1,
            itemServices: []
        };
    },
    methods: {
        initDetail: function(e, i) {
            var a = e.itemInfo;
            a && a.pic && (a.pic = t.default.getGoodsRatioSuffix(a.pic, 400, "1:1"));
            var o = "", s = !1;
            e.isNew ? o = "老带新" : 3 != e.tuanTypeValue && 8 != e.tuanTypeValue || (o = "抽奖团", 
            s = !0);
            var u = "";
            "tuanSuccess" == e.tuanStatus ? u = "success" : "tuanFailed" == e.tuanStatus && (u = "fail"), 
            this.setData({
                itemInfo: a,
                status: u,
                tagContent: o,
                isShowRuleArea: s,
                isJoin: i,
                itemServices: e.itemServices || []
            });
        },
        goodRedirect: function() {
            var t = this.data.itemInfo.link;
            this.$root.$redirect(t, {
                cparam: this.$root.query.cparam || "",
                acm: this.$root.query.acm || ""
            });
        }
    }
};