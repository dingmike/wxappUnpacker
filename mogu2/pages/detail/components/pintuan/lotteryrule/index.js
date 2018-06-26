Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            titleIcon: "https://s10.mogucdn.com/mlcdn/c45406/170703_4a491lk897i064468cja3dg53l851_128x32.png"
        };
    },
    components: {},
    onLoad: function() {},
    methods: {
        init: function(t) {
            var e = 1e3 * t.startTime, n = 1e3 * t.endTime, i = t.awardNum, o = t.tuanType, a = t.openAwardNum, d = 3 == o ? "活动结束后24小时内，从有资格抽奖的用户中，随机抽取中奖者。" : "抽奖商品成团数每满" + a + "，就开奖一次，每次一个中奖名额，库存开完为止。", l = 3 == o ? "4." : "5.", r = 3 == o ? "5." : "6.", m = {
                text: "支付成功的1分钱交易订单不代表中奖，中奖的用户名单会在“我的拼团-拼团成功-中奖详情”、“蘑菇街拼团”公众号、抽奖商品详情页等多个地方展示，请及时查看。",
                title: "4."
            }, s = [ {
                text: "活动时间：" + new Date(e).toFormattedString("yyyy年M月d日hh:mm") + " - " + new Date(n).toFormattedString("yyyy年M月d日hh:mm"),
                title: ""
            }, {
                text: "只有参加拼团，而且拼团成功的用户，才有资格参与抽奖。",
                title: "1. "
            }, {
                text: d,
                title: "2. "
            }, {
                text: "参与活动一等奖为本商品（" + i + "人），未中奖者会退还付款金额，0元抽奖自动关闭订单。",
                title: "3. "
            }, {
                text: "抽奖活动结束后，中奖商品3天内发货。",
                title: l
            }, {
                text: "本活动真实有效，有任何疑问请联系蘑菇街官方客服。",
                title: r
            } ];
            8 == o && s.splice(5, 0, m), this.setData({
                rules: s
            });
        }
    }
};