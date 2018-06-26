Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/countdown/index.js"));

exports.default = {
    name: "qualityItem",
    data: function() {
        return {
            time: ""
        };
    },
    methods: {
        start: function(t, n, u) {
            if (t) {
                var o = t - +new Date() / 1e3, r = void 0;
                if (o >= 86400) return r = "剩下" + parseInt(o / 86400) + "天", void u(r);
                new e.default({
                    endTime: t,
                    diff: n || 0,
                    update: function(e) {
                        u("剩下" + (r = e));
                    },
                    complete: function(e) {
                        r = e, u("已结束");
                    }
                }).start();
            }
        }
    }
};