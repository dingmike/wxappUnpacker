function e(e, r, o) {
    var p = Date.now(), i = n.System.getSync("systemInfo") || {};
    return {
        time: p,
        ver: (0, t.getCfg)("v"),
        uid: (0, t.getCfg)("uid"),
        _channel: "",
        "tid-token": "",
        launchTime: (0, t.getCfg)("lt"),
        active: 0,
        deviceName: i.model,
        os_ver: i.system,
        root: 0,
        network: 0,
        provider: "",
        url: e.url,
        refer: e.refer,
        ptp_cnt: e.ptp_cnt,
        ptp_url: e.ptp_url,
        ptp_ref: e.ptp_ref,
        eid: r,
        ext: Object.assign({
            _notNative: !0,
            StartScene: (0, t.getCfg)("scene"),
            cpsinfo: (0, t.getCfg)("cpsinfo"),
            cpsparam: (0, t.getCfg)("cpsparam"),
            _fromId: (0, t.getFid)(),
            wxopenid: (0, t.getCfg)("openId") || ""
        }, o)
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.page = function(t) {
    var n = e(t, "0", {});
    n.ext._pagelogid = t.pid, (0, r.sendLog)("p", n);
}, exports.event = function(t, n, o, p) {
    var i = e(t, n, o);
    (0, r.sendLog)("e", i, p);
};

var t = require("./config"), r = require("./send"), n = require("../../common/m");