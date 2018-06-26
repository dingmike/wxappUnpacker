Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    name: "mvw-game-pop",
    props: [ "pop", "basicColor", "showInfo", "showContent" ],
    data: function() {
        return {};
    },
    components: {},
    computed: {
        info: function() {
            return this.renderPop(this.pop);
        },
        popClass: function() {
            return this.info && this.info.giftType || " " + (this.info && this.info.className) || "";
        },
        btnStyle: function() {
            return this.transformStyleCode && this.transformStyleCode({
                background: this.info && this.info.btnBg ? "url(" + this.info.btnBg + ") 0% 0% / 100% no-repeat" : this.basicColor || ""
            });
        },
        btnRightStyle: function() {
            return this.transformStyleCode && this.transformStyleCode({
                background: this.info && this.info.btnRightBg ? "url(" + this.info.btnRightBg + ") 0% 0% / 100% no-repeat" : this.basicColor || ""
            });
        }
    },
    methods: {
        close: function(t) {
            this.$emit("closeModal", t);
        },
        renderPop: function(t) {
            return t && t.data ? this.renderWin(t) : this.renderFail(t);
        },
        renderWin: function(t) {
            var e = {
                bg: "//s10.mogucdn.com/mlcdn/c45406/170519_8423gkead9849gjehhh8gh6jj1ih4_630x714.png",
                title: "恭喜你中奖!",
                btnLink: "close",
                btnRightLink: "close"
            }, i = t.data.giftContent;
            switch (t.content = i, t.giftType) {
              case "platformCoupon":
                e.title = "恭喜获得" + i.giftName;
                break;

              case "shopCoupon":
                e.title = "恭喜获得" + i.giftName, e.subTitle = i.shopName;
                break;

              case "card":
                e.title = "恭喜获得卡片", e.subTitle = i.giftName + "一张";
                break;

              case "itemGift":
              case "welfareItem":
                break;

              case "platPackage":
                e.title = "恭喜获得平台券礼包";
                break;

              case "shopPackage":
                e.title = "恭喜获得店铺券礼包";
                break;

              case "userQual":
                break;

              case "goodsGift":
                e.title = "恭喜获得" + i.giftName, t.content.image = i.picUrl, t.content.name = i.giftName, 
                t.btnType = 1;
                break;

              case "memberCard":
                e.title = "恭喜你获得会员卡!", e.btnType = 1;
                break;

              case "movieTicket":
                e.title = "恭喜你获得电影票!", e.btnType = 1;
            }
            return this._mix(e, t), t;
        },
        renderFail: function(t) {
            var e = {
                bg: "//s10.mogucdn.com/mlcdn/c45406/170519_8423gkead9849gjehhh8gh6jj1ih4_630x714.png",
                title: "奖品与你擦肩而过",
                btnLink: "close",
                btnRightLink: "close"
            };
            return this._mix(e, t), t;
        },
        _mix: function(t, e) {
            for (var i in t) e[i] = e[i] ? e[i] : t[i];
        },
        closeBtn: function(t) {
            var e = t.target.dataset;
            if ("close" == e.href) this.close(t); else if ("click" == e.href) switch (e.btn) {
              case "1":
                this.$emit("btnClick", t);
                break;

              case "2":
                this.$emit("btnRightClick", t);
            } else this.$root.$logE && this.$root.$logE("016000341", {
                activeId: this.pop.code || ""
            }), this.$root.$redirect && this.$root.$redirect(e.xcx);
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {
        this.info && this.showInfo && this.showContent && ("rule" != this.info.giftType || t("mvw-image", {
            src: this.info.contentBg,
            lazyLoad: !1,
            "v-suffix": {
                mode: "width",
                "suffix-width": "700"
            },
            mode: "widthFix",
            __vx_class: "game-rule-img"
        }, {}, "15247322536090"));
    }
};