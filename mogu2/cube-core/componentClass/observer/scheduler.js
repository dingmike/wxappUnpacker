function e() {
    s = t.length = n.length = 0, o = {}, l = u = !1;
}

function r() {
    u = !0;
    var r = void 0, i = void 0;
    t.sort(function(e, r) {
        return e.id - r.id;
    });
    try {
        for (s = 0; s < t.length; s++) i = (r = t[s]).id, o[i] = null, r.run();
    } catch (e) {
        console.error(e);
    } finally {
        e();
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MAX_UPDATE_COUNT = void 0, exports.queueWatcher = function(e) {
    var n = e.id;
    if (null == o[n]) {
        if (o[n] = !0, u) {
            for (var c = t.length - 1; c > s && t[c].id > e.id; ) c--;
            t.splice(c + 1, 0, e);
        } else t.push(e);
        l || (l = !0, (0, i.nextTick)(r, e.vm));
    }
};

var i = require("../utils/index"), t = (exports.MAX_UPDATE_COUNT = 100, []), n = [], o = {}, l = !1, u = !1, s = 0;