function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return e && e.__esModule ? e.default : e;
}

function a(e, a) {
    var r = require(e);
    return a ? r[a] : t(r);
}

var r = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../mixins/logger/index")), l = e(require("./base/PageFactory")), u = e(require("./config")), n = require("./m"), i = e(n), o = e(require("./service/user")), d = e(require("./utils/cache")), f = e(require("./utils/debug")), c = i.default.MWP, s = i.default.MCE;

u.default.MWP.AppKey && (c.AppKey = u.default.MWP.AppKey), u.default.MWP.TTID && (c.TTID = u.default.MWP.TTID.replace(/^(.+_)[\d.]+$/, "$1" + u.default.$version));

try {
    s.config(u.default.MCE);
} catch (e) {
    f.default.error("Please update @meili/wxa-mce@1.0.2");
}

if (Object.keys(u.default.cache).forEach(function(e) {
    d.default.put(e, u.default.cache[e], {
        keep: !0
    });
}), d.default.put("TABS", u.default.tabs.reduce(function(e, t) {
    return e[t.path] = 1, e;
}, {}), {
    keep: !0
}), u.default.$mixins && u.default.$mixins.length > 0 && u.default.$mixins.forEach(function(e) {
    try {
        var t = Array.isArray(e) ? a(e[0], e[1]) : a(e);
        l.default.addDefaultMixin(t);
    } catch (t) {
        f.default.error('Fail to load mixin "' + e + '":', t.message);
    }
}), u.default.$globalTemplate) try {
    var p = t(require(u.default.$globalTemplate.path));
    l.default.addGlobalComponent(u.default.$globalTemplate.name, p);
} catch (e) {
    f.default.error('Fail to load global component "' + u.default.$globalTemplate.name + '":', e.message);
}

r.initializeLogger({
    platform: u.default.logger.platform,
    uuid: n.System.getSync("deviceId"),
    uid: function() {
        return o.default.uid;
    },
    openId: function() {
        return o.default.userInfo.openId;
    }
}), r.initQueue(), i.default.fn.sendMsg = r.reportMsg;

try {
    var g = f.default.read().env;
    c._setGlobalEnv = c.setGlobalEnv, c.setGlobalEnv = function(e, t) {
        !0 === e ? this._setGlobalEnv(t) : console.error(new Error("Please use debug page to switch MWP environment!"));
    }, c.setGlobalEnv(!0, g);
} catch (e) {
    f.default.warn("fail to set default MWP env");
}