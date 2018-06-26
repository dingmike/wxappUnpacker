Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../common/m.js"), t = !1;

try {
    var s = e.System.getSync("systemInfo");
    t = /ios/gi.test(s.system);
} catch (e) {
    console.error(e);
}

exports.default = {
    lazyload: !1,
    lazydata: !0,
    lazymod: !t,
    useModInView: !0
};