function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

t(require("../../../../../common/m.js"));

var i = t(require("../../../../../common/utils/imgUrlTool.js"));

exports.default = {
    name: "seckill",
    methods: {
        setSeckillData: function(t) {
            this.seckillData = t, this.showGoods = this.canShowGoods(), this.adjustSeckillData(), 
            this.updateSeckill();
        },
        canShowGoods: function() {
            var t = !1;
            return this.seckillData && this.seckillData.goods && this.seckillData.goods.length >= 5 && (t = !0), 
            t;
        },
        adjustSeckillData: function() {
            if (this.seckillData && (this.seckillData.titleIcon = i.default.getGoodsRatioSuffix(this.seckillData.titleIcon, 30, "1:1"), 
            this.showGoods)) {
                this.seckillData.bgImage = i.default.getGoodsRatioSuffix(this.seckillData.bgImage, 750, "750:430"), 
                this.seckillData.leftIconUrl = i.default.getGoodsRatioSuffix(this.seckillData.leftIconUrl, 190, "190:306"), 
                this.seckillData.rightIconUrl = i.default.getGoodsRatioSuffix(this.seckillData.rightIconUrl, 190, "190:306");
                for (var t = 0; t < this.seckillData.goods.length; t++) {
                    var o = this.seckillData.goods[t];
                    o.cover = i.default.getGoodsRatioSuffix(o.cover, 220, "1:1"), o.topIcon = i.default.getGoodsRatioSuffix(o.topIcon, 64, "64:44"), 
                    o.priceIcon = i.default.getGoodsRatioSuffix(o.priceIcon, 62, "62:26");
                }
            }
        },
        updateSeckill: function() {
            var t = {
                showSeckill: !1
            };
            this.seckillData && (t.showSeckill = !0, t.titleIcon = this.seckillData.titleIcon, 
            t.title = this.seckillData.title, this.showGoods ? (t.showGoods = !0, t.bgImage = this.seckillData.bgImage, 
            t.leftIconUrl = this.seckillData.leftIconUrl, t.rightIconUrl = this.seckillData.rightIconUrl, 
            t.goods = this.seckillData.goods) : t.showGoods = !1), this.setData(t), this.scrollContentToLeft();
        },
        scrollContentToLeft: function() {
            var t = this;
            this.showGoods && setTimeout(function() {
                t.setData({
                    scrollToView: "LEFTICON"
                });
            }, 0);
        },
        viewHeight: function() {
            var t = 0;
            return this.seckillData && (t = this.showGoods ? 430 : 80), t;
        },
        formSubmit: function(t) {
            var i = t.detail.formId;
            this.$root.$logForm(i, 2);
        },
        leftIconTapped: function() {
            this.seckillData.leftIconLink && this.seckillData.leftIconLink.length > 0 && this.jumpMiniProgram(this.seckillData.leftIconLink);
        },
        jumpMiniProgram: function(t, i) {
            var o = Object.assign({
                appId: "wx21c17841db9593cd"
            }, i);
            this.$root.$launch(t, o);
        },
        goodsItemTapped: function(t) {
            var i = t.currentTarget.dataset.itemData;
            i && i.link && i.link.length > 0 && this.jumpMiniProgram(i.link);
        },
        rightIconTapped: function() {
            this.seckillData.rightIconLink && this.seckillData.rightIconLink.length > 0 && this.jumpMiniProgram(this.seckillData.rightIconLink);
        }
    }
};