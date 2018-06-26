function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var b = require("./../npm/wepy/lib/wepy.js"), c = a(b), d = require("./global.js"), f = a(d);

exports.default = {
    report: function(b, h, j) {
        var k = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "", m = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "", q = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : f.default.getFid(), v = arguments[6], n = Math.ceil(new Date().getTime() / 1e3), w = f.default.getSeeInfo(), x = 0;
        w && (x = w.u_id);
        var y = {
            dynamic_args: []
        }, u = {
            time: n,
            user_id: x,
            page_id: b,
            content_id: j,
            module_id: h,
            opt_id: 1,
            extend_str1: k,
            extend_str2: m,
            extend_str3: q,
            extend_static_str1: f.default.config.scene
        };
        v && Object.assign(u, v), y.dynamic_args.push(u);
        var s = v ? "search" : "page", p = {
            url: "https://da.seeapp.com/report/" + s,
            data: JSON.stringify(y),
            method: "POST"
        };
        c.default.request(p).then(function() {}).catch(function() {});
    }
};