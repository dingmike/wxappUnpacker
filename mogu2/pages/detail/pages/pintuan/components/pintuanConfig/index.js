Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    init: function(t) {
        var e = t.pintuanInfo, o = e && e.tuanType, r = e && e.state, i = void 0;
        i = 3 === o || 8 === o ? 2 === r ? "186" : "130" : 5 !== r ? "186" : "130", this.$root.$wrapper && this.$root.$wrapper.$emit("$quickbar.bottom", i);
    }
};