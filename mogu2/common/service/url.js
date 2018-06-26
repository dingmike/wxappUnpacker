function r(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}

function e(r, e) {
    return !e || 0 === e.length || (e.forEach(function(e) {
        if (void 0 === r[e]) throw new Error("miss parameter: " + e);
    }), !0);
}

function t(r, t) {
    return r = "/pages/" + r + "/index", function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(n, t);
        var a = r;
        return Object.keys(n).length > 0 && (a += "?" + o(n)), a;
    };
}

function n(r) {
    if (r.startsWith("/pages")) return r.replace(/^\/pages\/(.+)\/index(?:\?.*)?/, "$1");
    throw new Error("Invalid url");
}

function a(r) {
    try {
        var e = n(r);
        return c[e];
    } catch (e) {
        return r;
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = r(require("../config")), i = r(require("../m")).default.qs, o = i.stringify, f = i.parse, c = Object.create(null), s = {
    $has: function(r) {
        var e = a(r);
        return "function" == typeof s[e];
    },
    $validate: function(r) {
        if (s.$has(r)) {
            var t = f(r.split("?")[1] || "");
            try {
                var n = a(r);
                return e(t, u.default.urls.find(function(r) {
                    return r.name === n;
                }).params), !0;
            } catch (r) {
                return !1;
            }
        }
        return !1;
    }
};

u.default.urls.forEach(function(r) {
    var e = void 0;
    e = r.params ? t(r.url, r.params) : t(r.url), s[r.name] = e, c[r.url] = r.name, 
    r.alias && r.alias.forEach(function(r) {
        s[r] = e;
    });
}), exports.default = s;