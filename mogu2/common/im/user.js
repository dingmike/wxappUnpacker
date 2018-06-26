function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./sdk/api")), r = e(require("../m")), n = e(require("./util")), u = e(require("./sdk/promise")), o = Object.assign, i = {}, a = null;

t.default.on("open", function(e) {
    a = e.user_id;
});

var s = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return r.default.MWP.request("mwp.imcenter.appMgjUsersInfo", "1", {
        userIds: e
    }).then(function(e) {
        if (!e.data) throw new Error("系统找不到用户信息");
        var t = {};
        return (e.data || []).map(function(e) {
            var r = e.userId;
            t[r] = {
                entity_id: r,
                entity_type: 1,
                avatar: e.avatar,
                userRole: e.userRole,
                intro: e.intro || "",
                showStrategy: e.showStrategy || 0,
                hideInput: 4 === e.userRole && 2 != (2 & e.officialAuth),
                name: e.userName
            };
        }), i = o(i, t), t;
    });
}, f = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (!e || e.length <= 0) return u.default.resolve({});
    var t = n.default.objPick(i, e), r = t.leftKeys, a = t.pickObj;
    return r.length <= 0 ? u.default.resolve(a) : s(r).then(function(e) {
        return o(a, e);
    });
}, l = function(e) {
    return f([ e ]).then(function(t) {
        return t && t[e] ? t[e] : null;
    });
};

exports.default = {
    getUsersReq: s,
    getUsers: f,
    getUser: l,
    getLoginUserId: function() {
        return a ? u.default.resolve(a) : a ? void 0 : new u.default(function(e) {
            t.default.once("open", function(t) {
                a = t.user_id, e(a);
            });
        });
    },
    getLoginUser: function() {
        return a ? l(a) : new u.default(function(e) {
            t.default.once("open", function(t) {
                a = t.user_id, e(l(a));
            });
        });
    }
};