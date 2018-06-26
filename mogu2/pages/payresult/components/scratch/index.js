function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = require("../../../../common/m"), e = t(a), r = t(require("../../../../common/utils/imgUrlTool")), s = e.default.MWP;

exports.default = {
    data: function() {
        return {
            orderId: "",
            shopOrderIds: "",
            lottery: null,
            gift: null,
            lotteryStatus: 0
        };
    },
    methods: {
        init: function(t) {
            this.$root.$logE("016000277");
            var a = t.lottery, e = /\_(\d+)x(\d+)\./, s = a.defautBGImage.match(e);
            s[0] && s[1] && s[2] && (a.height = Math.round(750 * s[2] / s[1])), a.defautBGImage = r.default.getWidthSuffix(a.defautBGImage, 750), 
            a.scratchCardBGImage = r.default.getWidthSuffix(a.scratchCardBGImage, 750), a.cardBGResouce = a.scratchCardBGImage.replace(/s(\d+)\.mogucdn\.com/, "s10.mogucdn.com"), 
            a.prizeBGImage = r.default.getWidthSuffix(a.prizeBGImage, 750), this.setData({
                orderId: t.orderId,
                shopOrderIds: t.shopOrderIds,
                lottery: t.lottery
            });
        },
        getLottery: function() {
            var t = this;
            this.$root.$logE("016000278");
            var a = this.data, e = a.lottery, r = a.orderId, i = a.shopOrderIds, c = {
                gameName: e.gameName,
                sceneName: e.sceneName,
                shopOrderIds: i,
                payOrderId: r
            };
            s.request("mwp.aston.simpleGamePort", "1.0", c).then(s.filterResult).then(function() {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t.startScratch(a);
            }).catch(function() {
                t.startScratch({});
            });
        },
        startScratch: function(t) {
            this.minX = "", this.minY = "", this.maxX = "", this.maxY = "", this.lastX = 0, 
            this.lastY = 0;
            var a = this, e = this.data.lottery;
            t.isReady = !1, this.ctx = wx.createCanvasContext("scratch"), this.ctx.clearRect(0, 0, 375, 130), 
            wx.downloadFile({
                url: e.cardBGResouce,
                success: function(e) {
                    a.drawScratch(e.tempFilePath, t);
                },
                fail: function() {
                    a.drawScratch(e.scratchCardBGImage, t);
                }
            });
        },
        drawScratch: function(t, e) {
            var r = this, s = this.data.lottery;
            a.System.get("systemInfo").then(function(a) {
                var i = a.windowWidth, c = a.windowWidth * s.height / 750;
                r.ctx.drawImage(t, 0, 0, i, c), r.ctx.draw(), r.setData({
                    gift: e,
                    lotteryStatus: 1
                });
            });
        },
        drawRect: function(t, a) {
            var e = this.minX, r = this.minY, s = this.maxX, i = this.maxY, c = t - 8 > 0 ? t - 8 : 0, h = a - 8 > 0 ? a - 8 : 0;
            return "" != e ? (this.minX = e > c ? c : e, this.minY = r > h ? h : r, this.maxX = s > c ? s : c, 
            this.maxY = i > h ? i : h) : (this.minX = c, this.minY = h, this.maxX = c, this.maxY = h), 
            this.lastX = c, this.lastY = h, [ c, h, 16 ];
        },
        touchStart: function(t) {
            var a = this.data.gift;
            a.isReady = !0, this.setData({
                gift: a
            });
            var e = this.drawRect(t.touches[0].x, t.touches[0].y);
            this.ctx.clearRect(e[0], e[1], e[2], e[2]), this.ctx.draw(!0);
        },
        touchMove: function(t) {
            var a = this.drawRect(t.touches[0].x, t.touches[0].y);
            this.ctx.clearRect(a[0], a[1], a[2], a[2]), this.ctx.draw(!0);
        },
        touchEnd: function() {
            this.ctx.draw(), this.setData({
                lotteryStatus: 2
            });
        },
        navigate: function(t) {
            var a = t.currentTarget.dataset.url;
            a && this.$root.$navigate(a);
        }
    }
};