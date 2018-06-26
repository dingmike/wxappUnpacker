function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/m")), a = t(require("../../../common/service/user")), o = t(require("../../../common/base/createPage")), i = t(require("../../../components/loading/index")), n = t(require("../../../components/toast/index")), r = t(require("../../../components/wall/index")), s = t(require("../../../common/utils/imgUrlTool")), d = e.default.MWP, l = e.default.fn.sendMsg;

(0, o.default)({
    data: {
        prizeIcon: "https://s10.mogucdn.com/mlcdn/c45406/170704_57j50b0j5k46c2ahh85e1lbj4hca8_322x67.png",
        $wallPtMore: {
            link: "/pages/pintuanIndex/index",
            name: "逛逛其他拼团",
            marginTop: 0,
            marginBottom: 0
        }
    },
    components: {
        loading: i.default,
        toast: n.default,
        wall: r.default
    },
    onLoad: function(t) {
        this.$loading.show(), this.activityId = t.activityId, this.orderId = t.orderId, 
        this.stage = t.stage || "";
    },
    onReady: function() {
        this.getLotteryData(this.activityId, this.orderId, this.stage);
    },
    getLotteryData: function(t, e, a) {
        var o = this;
        d.request("mwp.enzo.lotteryResult", "1", {
            activityId: t,
            orderId: e,
            stage: a
        }).then(d.filterResult).then(function(t) {
            console.log(t), o.initData(t), o.$loading.hide();
        }).catch(function(t) {
            o.$loading.hide(), o.handleRequestError(t);
        });
    },
    handleRequestError: function(t) {
        console.log(t), l(t, {
            _author: "changsheng",
            threshold: 1
        }), a.default.showUserError(t) || this.$toast.show(t.message);
    },
    initData: function(t) {
        var e = t.prizeType, a = t.lotteryProcess, o = t.awardUsers, i = t.tuanType, n = "已开奖", r = "恭喜以下幸运用户中奖！", d = !1, l = "notAward";
        if ("hasLottery" === a) {
            switch (e) {
              case "notAward":
                n = "已开奖", r = "恭喜以下幸运用户中奖！", d = !1, l = "notAward";
                break;

              case "coupon":
                n = "谢谢参与", r = "分享越多中奖概率越高，再接再厉～", d = !1, l = "coupon";
                break;

              case "prize":
                n = "中奖啦", r = "商品将在活动结束后3天内发货", d = !1, l = "prize";
                break;

              default:
                n = "已开奖", r = "恭喜以下幸运用户中奖！", d = !1, l = "notAward";
            }
            o && o.length > 0 ? o = o.map(function(t) {
                var e = t.avatar;
                return Object.assign({}, t, {
                    avatar: s.default.getGoodsRatioSuffix(e, 100, "1:1")
                });
            }) : ("notAward" === l && (r = "快去看看其他拼团吧～"), this.$wall.setDataSource({
                source: "mwp_mait"
            }), this.$wall.initWall({
                pid: "88896"
            }));
        } else n = "等待开奖", r = 8 === i ? "成团数达要求立即开奖并公布中奖结果" : "活动结束后24小时内公布中奖结果。", d = !1, 
        l = "notHasLottery", this.$wall.setDataSource({
            source: "mwp_mait"
        }), this.$wall.initWall({
            pid: "88896"
        });
        var c = t.itemInfo;
        c.pic = s.default.getGoodsRatioSuffix(c.pic, 40, "1:1"), this.setData(Object.assign({}, t, {
            prizeText: n,
            prizeDescText: r,
            showButton: d,
            type: l,
            awardUsers: o,
            itemInfo: c
        }));
    }
});