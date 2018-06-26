function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./backupData.js")), t = e(require("../../cube/wrapper/page"));

exports.default = (0, t.default)({
    notShare: !1,
    isup: !0,
    pageDataUrl: "https://act.mogujie.com/wxca3957e5474b3670/pages/home/index.json",
    backupData: a.default
});