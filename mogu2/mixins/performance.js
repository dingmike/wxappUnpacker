function t(t, e, n) {
    var r = "function" == typeof a.create ? a.create(t, e) : new a(t, e);
    return this.$_async.push({
        type: 2,
        task: r.task
    }), r.request(n);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common/m")), n = e.default.MWP, a = e.default.MCE;

exports.default = {
    onLoad: function() {
        this.$_async = [];
    },
    onUnload: function() {
        this.$isPageUnload = !0, this.$_async.forEach(function(t) {
            switch (t.type) {
              case 0:
                clearTimeout(t.id);
                break;

              case 1:
                clearInterval(t.id);
                break;

              case 2:
                var e = t.task;
                e && e.abort && e.abort();
            }
        }), this.$_async = [], this.$off("__makeup_done__"), this.$off("__lazy-data__");
    },
    methods: {
        $setTimeout: function() {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            var a = setTimeout.apply(null, e);
            return this.$_async.push({
                type: 0,
                id: a
            }), a;
        },
        $setInterval: function() {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            var a = setInterval.apply(null, e);
            return this.$_async.push({
                type: 1,
                id: a
            }), a;
        },
        $mwp: function(t, e, a, r) {
            var u = n.getContext(t, e, r);
            return this.$_async.push({
                type: 2,
                task: u.task
            }), u.request(a);
        },
        $mce_get: function(e, n) {
            return t.call(this, "get", e, n);
        },
        $mce_multiget: function(e, n) {
            return t.call(this, "multiget", e, n);
        },
        $mce_makeup: function(e) {
            return t.call(this, "makeup", e);
        },
        $mce_recommend: function(e) {
            return t.call(this, "get", e, !0);
        },
        $mce_multirecommend: function(e) {
            return t.call(this, "multiget", e, !0);
        }
    }
};