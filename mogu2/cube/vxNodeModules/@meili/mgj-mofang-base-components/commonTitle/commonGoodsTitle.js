Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    name: "common-goods-title",
    props: [ "styleConfig" ],
    computed: {
        classData: function() {
            if (this.styleConfig) {
                var t = " title-one-line";
                return +(this.styleConfig.lineNum || 1) > 1 && (t = " title-two-line"), t = this.styleConfig.class ? this.styleConfig.class + t : t;
            }
        }
    },
    data: function() {
        return {
            titleInfo: this.styleConfig.titleInfo ? this.styleConfig.titleInfo : "商品标题"
        };
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};