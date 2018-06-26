Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    name: "common-title",
    props: [ "styleConfig" ],
    data: function() {
        var t = "https://s10.mogucdn.com/mlcdn/c45406/180305_2ieh10e3hjdgf46g800757885j074_750x50.png", e = "#fff";
        if (this.getGlobal().globalSchema && this.getGlobal().globalSchema.commonStyle) {
            var o = this.getGlobal().globalSchema.commonStyle[0];
            t = o.titleBgImg || t, e = o.titleColor || e;
        }
        return {
            wrapStyle: this.styleConfig.marginTop || 0 === this.styleConfig.marginTop ? parseInt(this.styleConfig.marginTop, 10) / 100 : .2,
            titleImgStyle: this.styleConfig.subTitle ? "" : "modal-title-bg-img-pos",
            titleStyle: "color: " + (this.styleConfig.titleColor || e),
            titleImg: this.styleConfig.bgImg || t
        };
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};