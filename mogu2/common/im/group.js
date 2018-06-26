function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./sdk/api")), r = e(require("./sdk/promise")), u = e(require("./util")), n = Object.assign, a = {}, i = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (e.length <= 0) return r.default.resolve({});
    var i = u.default.objPick(a, e), o = i.leftKeys, l = i.pickObj;
    return o.length <= 0 ? r.default.resolve(l) : t.default.send("getGroupSimple", {
        group_id: o
    }).then(function(e) {
        var t = {};
        return e.group.map(function(e) {
            var r = e.group_id;
            t[r] = n(e, {
                entity_id: r,
                entity_type: 2,
                avatar: "https://imapi.mogujie.com/mtalk/avatar?url=" + e.group_avatar,
                name: e.group_name
            });
        }), a = n(a, t), n(l, t);
    });
};

exports.default = {
    getGroups: i,
    getGroup: function(e) {
        return i([ e ]).then(function(t) {
            return t && t[e] ? t[e] : null;
        });
    }
};