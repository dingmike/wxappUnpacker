Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, t = {
    isPaySuccess: !1
};

exports.default = {
    name: "result",
    data: function() {
        return e({}, t);
    },
    methods: {
        goHome: function() {
            this.$parent.routeGo("home");
        }
    }
};