Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            tuanTypeValue: "",
            personNum: "",
            rules: []
        };
    },
    methods: {
        initRule: function(t) {
            var e = t.tuanTypeValue, l = [];
            l = 3 == e ? [ {
                title: "成团可抽奖"
            }, {
                title: "一等奖发货"
            }, {
                title: "全国包邮"
            } ] : 8 == e ? [ {
                title: "团满开奖"
            }, {
                title: "一等奖发货"
            }, {
                title: "未中奖退款"
            } ] : [ {
                title: "好友参团"
            }, {
                title: "人满发货"
            }, {
                title: "人不满退款"
            } ], this.setData({
                rules: l
            });
        }
    }
};