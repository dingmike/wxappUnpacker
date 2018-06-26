function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, r) {
        var t = [], n = !0, i = !1, u = void 0;
        try {
            for (var a, o = e[Symbol.iterator](); !(n = (a = o.next()).done) && (t.push(a.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            i = !0, u = e;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (i) throw u;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = e(require("../service/user")), n = require("../m"), i = e(n), u = e(require("./sdk/api")), a = e(require("./index")), o = {
    app_version: "300",
    noce: "0",
    online_state: 1
};

exports.default = function() {
    return 3 === u.default.getState() ? Promise.resolve("已经建联切登录") : Promise.all([ t.default.ensure(), a.default.getAppConfig() ]).then(function(e) {
        var d = r(e, 2), s = (d[0], d[1].appId), f = t.default.userInfo, l = t.default.sign, c = n.System.getSync("deviceId") || i.default.MWP.getDeviceID(), p = f.uid;
        if (!p || !l) throw new Error("no userId");
        var v = {
            app_id: "" + s,
            device_id: c,
            sign: l,
            signature: l,
            timestamp: "0",
            token: l,
            user_id: p
        };
        return v = Object.assign(o, v), u.default.open({
            debug: !0,
            pf: a.default.getPlatform(),
            data: v
        });
    });
};