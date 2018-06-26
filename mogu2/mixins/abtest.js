function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../common/utils/abtest")), r = t(require("../common/utils/track"));

exports.default = {
    methods: {
        $logAb: function(t, o, a, i) {
            var l = [];
            if (Array.isArray(t) && t && t.length > 0) t.forEach(function(t) {
                var r = e.default.libra.alterWithExpCode(t);
                r && l.push(r);
            }); else if (t) {
                var s = e.default.libra.alterWithExpCode(t);
                s && l.push(s);
            }
            var u = r.default.statinEvent({}, l);
            o ? this.$root.$logE(o, Object.assign({}, a, u), i) : this.$root.$logE("016000154", u, i);
        }
    }
};