function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

require("./common/setup");

var r = e(require("./common/service/user")), n = require("./mixins/logger/index"), s = require("./mixins/cps"), t = e(require("./common/utils/cache")), o = require("./mixins/navigation");

require("./common/utils/updateManager"), App({
    onLaunch: function(e) {
        console.log("App Launch"), r.default.init({
            appName: t.default.get("appName"),
            color: t.default.get("primaryColor")
        }).catch(function(e) {
            r.default.showUserError(e);
        }), e && e.scene && (this.scene = e.scene, (0, n.setScene)(e.scene));
    },
    onShow: function(e) {
        if (console.log("App Show"), (0, n.stopLogger)(!1), e) {
            var r = e.query;
            if ("string" == typeof r) try {
                r = JSON.parse(r.replace(/([^,\s{=]+)=([^,\s}]+)/g, '"$1":"$2"'));
            } catch (e) {
                r = {};
            }
            e.scene && (t.default.put("global.scene", e.scene, {
                persistent: !0
            }), this.scene = e.scene, (0, n.setScene)(e.scene)), t.default.put("shareTicket", e.shareTicket ? e.shareTicket : ""), 
            (0, s.checkCPS)(r), (0, n.setFromId)(r), (0, o.initPersistentParams)(r);
        } else t.default.remove("shareTicket");
    },
    onHide: function() {
        (0, n.stopLogger)(!0), console.log("App Hide");
    },
    onError: function(e) {
        (0, n.reportMsg)(e);
    }
});