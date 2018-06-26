Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var t = this, e = function(e) {
        return function(t) {
            var o = arguments.length, s = void 0;
            return s = this.__isCommonComponent ? this.$vm : this, o ? o > 1 ? e.apply(s, arguments) : e.call(s, t) : e.call(s);
        }.bind(t);
    };
    this.methods && Object.keys(this.methods || {}).forEach(function(o) {
        t[o] = t.methods[o] = e(t.methods[o]);
    });
};