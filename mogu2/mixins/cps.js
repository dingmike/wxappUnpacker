function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    (0, i.updateCPS)(a.getMWPCookies(d, m));
}

function r(e) {
    return a.request(d, m, e).then(a.filterResult).then(t).catch(function(e) {
        n.default.warn("Fail to fetch cps cookies:", e.message);
    });
}

function o(e) {
    if (!e) return Promise.resolve();
    if (e[l]) {
        var t = {};
        return Object.keys(e).forEach(function(r) {
            r.startsWith(s) && (t[r.slice(f)] = e[r]);
        }), r(t);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkCPS = o;

var u = e(require("../common/m")), n = e(require("../common/utils/debug")), i = require("./logger/index"), c = e(require("../common/base/PageFactory")), a = u.default.MWP, s = "_uni_", f = s.length, l = s + "uid", d = "mwp.cpstrack.cpsTrackActionlet", m = "1";

t();

var p = {
    onLoad: function(e) {
        o(e);
    }
};

exports.default = p, c.default.addDefaultMixin(p);