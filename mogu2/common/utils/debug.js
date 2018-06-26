function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DEFAULT_CONFIG = exports.LOG_LEVEL = void 0;

var o = e(require("../../lib/system")), t = require("../../lib/utils"), n = require("./cache"), r = {
    debug: 0,
    log: 1,
    warn: 2,
    error: 3,
    silent: 9
}, i = {
    get: function(e) {
        return d.read()[e];
    }
}, l = new (e(require("../base/Events")).default)(), u = i, d = {
    Level: r,
    $on: void 0,
    $once: void 0,
    $off: void 0,
    $emit: void 0,
    read: function() {
        return u === i && (u = new n.PersistentStorage("debug")), u.getAll();
    },
    write: function(e) {
        null === u && (u = new n.PersistentStorage("debug")), Object.keys(e).forEach(function(o) {
            u.put(o, e[o]);
        }), l.$emit("update");
    },
    debug: void 0,
    log: void 0,
    warn: void 0,
    error: void 0,
    time: function(e) {
        u.get("level") === r.debug && console.time(e);
    },
    timeEnd: function(e) {
        u.get("level") === r.debug && console.timeEnd(e);
    }
};

"function" != typeof console.debug && (console.debug = console.log), [ "debug", "log", "warn", "error" ].forEach(function(e) {
    d[e] = function() {
        for (var o = [], n = 0; n < arguments.length; n++) o[n] = arguments[n];
        u.get("level") > r[e] || (0, t.apply)(console[e], console, o);
    };
}), [ "$on", "$once", "$off", "$emit" ].forEach(function(e) {
    d[e] = l[e].bind(l);
});

var s = {
    level: r.silent
};

0 === Object.keys(d.read()).length && d.write(s), o.default.get("systemInfo").then(function(e) {
    "devtools" === e.platform && d.read().level > r.warn && d.write({
        level: r.warn
    });
}), exports.LOG_LEVEL = r, exports.DEFAULT_CONFIG = s, exports.default = d;