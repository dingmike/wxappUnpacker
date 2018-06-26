Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.device = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    o.System.get("networkType").then(function(i) {
        var n = (0, t.getNetworkVal)(i), d = o.System.getSync("systemInfo") || {}, s = "devtools" === d.platform ? "dev" : "", v = {
            time: Date.now(),
            ver: (0, t.getCfg)("v"),
            uid: (0, t.getCfg)("uid"),
            launchTime: (0, t.getCfg)("lt"),
            _channel: "",
            new_did: "",
            "tid-token": "",
            deviceName: s || d.model,
            os_ver: s || d.system,
            root: 0,
            network: n,
            provider: "",
            wh: d.windowWidth + "x" + d.windowHeight,
            ext: {
                wx_ver: d.version,
                wxa_ver: d.SDKVersion || "",
                setupTime: r
            }
        };
        (0, e.sendLog)("d", v);
    });
};

var e = require("./send"), t = require("./config"), o = require("../../common/m");