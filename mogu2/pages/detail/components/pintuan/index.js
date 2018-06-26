function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("./rule/index")), u = e(require("./success/index")), t = e(require("./join/index")), i = e(require("./lotteryrule/index"));

exports.default = {
    data: function() {
        return {
            isShow: !1
        };
    },
    components: {
        pintuanRule: n.default,
        pintuanSuccess: u.default,
        pintuanJoin: t.default,
        lotteryRule: i.default
    },
    onLoad: function() {},
    methods: {
        init: function(e, n, u) {
            var t = u.jcubeOptions, i = e.pintuanInfo, s = t && t.length > 0 && t[0].showOrder;
            if (i) {
                var a = i.tuanType;
                "1" === s && 2 !== a || ("2" !== s || 9 !== a && 2 !== a) && (this.$pintuanRule.init({
                    tuanNum: i.tuanNum
                }), this.$pintuanJoin.init({
                    joinTuanList: i.joinTuanList
                }), this.$pintuanSuccess.init({
                    successTuan: i.successTuan,
                    successTuanNum: i.successTuanNum
                }), this.$lotteryRule.init({
                    startTime: i.startTime,
                    endTime: i.endTime,
                    awardNum: i.awardNum,
                    tuanType: i.tuanType,
                    openAwardNum: i.progressDTO && i.progressDTO.openAwardNum || ""
                }), this.setData(i));
            }
        }
    }
};