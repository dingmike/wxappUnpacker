Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    name: "common-buy-btn",
    props: [ "styleConfig" ],
    data: function() {
        var t = "#ff5577";
        return this.getGlobal().globalSchema && this.getGlobal().globalSchema.commonStyle && (t = this.getGlobal().globalSchema.commonStyle[0].btnBgColor || t), 
        {
            btnText: "",
            btnTextPreStageDefault: "加入购物车",
            btnTextFormalStageDefault: "立即购买",
            btnBgColor: this.styleConfig.btnBgColor || t,
            btnWidth: parseInt(this.styleConfig.btnWidth || "328", 10),
            btnHeight: parseInt(this.styleConfig.btnHeight || "56", 10),
            btnFontSize: parseInt(this.styleConfig.btnFontSize || "28", 10)
        };
    },
    mounted: function() {
        if (this.styleConfig.btnText) this.btnText = this.styleConfig.btnText; else if (this.env && this.env.PAGE_STAGE && "formalStage" === this.env.PAGE_STAGE ? this.btnText = this.styleConfig.btnTextFormalStage || this.btnTextFormalStageDefault : this.env && this.env.PAGE_STAGE && "preStage" === this.env.PAGE_STAGE ? this.btnText = this.styleConfig.btnTextPreStage || this.btnTextPreStageDefault : this.btnText = this.btnTextPreStageDefault, 
        this.getGlobal().globalSchema && this.getGlobal().globalSchema.commonStyle) {
            var t = this.getGlobal().globalSchema.commonStyle[0];
            this.btnText = t.btnTextStr || this.btnText;
        }
    },
    methods: {
        formSubmitHandler: function(t) {
            this.$root.$logForm(t.detail.formId, 1);
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};