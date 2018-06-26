function e(e) {
    for (var o = 0; o < t.length; o++) if (t[o].test(e)) return o;
    return -1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    if (this.methods && Object.keys(this.methods).length) for (var t in this.methods) -1 != e(t) && this.$vm.$on("vx:" + t, (0, 
    o.bind)(this.methods[t], this));
};

var o = require("../utils/index"), t = [ /^onLoad$/, /^onReady$/, /^onShow$/, /^onHide$/, /^onUnload$/, /^onPullDownRefresh$/, /^onReachBottom$/, /^onPageScroll$/, /^scroll$/, /^scroll_[\s\S]*/, /^upper$/, /^upper_[\s\S]*/, /^lower$/, /^lower_[\s\S]*/, /^onGlobal$/, /^modInView$/, /^modNotInView$/ ];