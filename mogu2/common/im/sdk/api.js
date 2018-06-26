function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./promise")), n = e(require("./imsdk")), u = function(e) {
    return function() {
        for (var n = arguments.length, u = Array(n), d = 0; d < n; d++) u[d] = arguments[d];
        return new t.default(function(t, n) {
            e.apply(void 0, u.concat([ function(e) {
                for (var u = arguments.length, d = Array(u > 1 ? u - 1 : 0), f = 1; f < u; f++) d[f - 1] = arguments[f];
                e ? t.apply(void 0, d) : n.apply(void 0, d);
            } ]));
        });
    };
};

exports.default = {
    config: function(e) {
        var t = Object.assign({}, e);
        n.default.config(t);
    },
    getClientMsgId: n.default.getClientMsgId,
    now: n.default.now,
    getState: n.default.getState,
    open: function(e) {
        return u(function(e, t) {
            n.default.open(e, t);
        })(e);
    },
    close: function(e, t) {
        return n.default.close(e, t);
    },
    getStatus: n.default.getState.bind(n.default),
    debug: n.default.debug.bind(n.default),
    on: n.default.on.bind(n.default),
    once: n.default.once.bind(n.default),
    send: function(e, t) {
        return u(function(e, t, u) {
            n.default.send(e, t, u);
        })(e, t);
    },
    reSend: function(e) {
        return u(function(e, t) {
            n.default.reSend(e, t);
        })(e);
    }
};