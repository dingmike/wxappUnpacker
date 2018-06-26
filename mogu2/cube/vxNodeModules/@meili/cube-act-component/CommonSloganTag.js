Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = {
    name: "common-slogan-tag",
    props: [ "styleConfig" ],
    data: function() {
        var o = "color: #ff5777; border-color: #ff5777;", l = "3.24";
        if (this.getGlobal().globalSchema && this.getGlobal().globalSchema.commonStyle) {
            var t = this.getGlobal().globalSchema.commonStyle[0];
            o = t.actSloganColor ? "color: " + t.actSloganColor + "; border-color:" + t.actSloganColor + ";" : o, 
            l = t.actSlogan || l;
        }
        return {
            colorStyle: this.styleConfig.actSloganColor ? "color: " + this.styleConfig.actSloganColor + "; border-color:" + this.styleConfig.actSloganColor + "; " : o,
            actSlogan: this.styleConfig.actSlogan || l
        };
    }
};

exports.default = {
    componentOptions: o,
    renderComponentsFunc: function(o) {}
};