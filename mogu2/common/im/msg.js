function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        var n = [], r = !0, s = !1, i = void 0;
        try {
            for (var a, o = e[Symbol.iterator](); !(r = (a = o.next()).done) && (n.push(a.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            s = !0, i = e;
        } finally {
            try {
                !r && o.return && o.return();
            } finally {
                if (s) throw i;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = e(require("./sdk/api")), r = e(require("./util")), s = e(require("./msgformat")), i = e(require("./sdk/promise")), a = e(require("./user")), o = e(require("./conv")), u = e(require("./p2pmsg")), d = {}, c = {}, f = {}, l = {}, m = {};

n.default.on("message", function(e) {
    var t = e.data;
    if (t && t.message) {
        var n = t.message, r = g([ n ])[0] || n, s = r.conversation_id;
        m[s] && m[s](r);
    } else console.error(e);
});

var g = function(e) {
    return (e = e.sort(function(e, t) {
        return parseInt(e.timestamp, 10) - parseInt(t.timestamp, 10);
    })).map(function(e) {
        return s.default.parseMsg(e);
    });
}, _ = function(e, n) {
    var r = [];
    return e.map(function(e) {
        var t = e.sender_id;
        t && r.indexOf(t) < 0 && r.push(t);
    }), i.default.all([ a.default.getUsers(r), o.default.getConvByConvId(n), a.default.getLoginUserId() ]).then(function(n) {
        var r = t(n, 3), s = r[0], i = r[1], a = r[2];
        return e.map(function(e) {
            var t = e.sender_id;
            return i && 1 === i.entity_type ? (t !== a ? e.sender = i : t && s[t] && (e.sender = s[t]), 
            e.owner = t === a ? "me" : "other") : (t && s[t] && (e.sender = s[t]), e.owner = t === a ? "me" : "other"), 
            e;
        });
    });
}, v = function(e) {
    var t = [], n = 0;
    return e.map(function(e) {
        e.timestamp - n >= 6e4 && t.push({
            conversation_id: e.conversation_id,
            client_message_id: e.client_message_id + ".1",
            conversation_message_id: e.conversation_message_id + ".1",
            message_content: r.default.dayTime(e.timestamp),
            message_type: 511,
            user: {},
            timestamp: n
        }), n = e.timestamp, t.push(e);
    }), t;
}, p = function(e, t) {
    var n = d[e] || "18446744073709551615", r = c[e];
    return t.map(function(e) {
        var t = e.client_message_id, s = e.conversation_message_id, i = parseInt(s, 10);
        Math.abs(n) > i && (n = "" + i, r = t);
    }), h(e, r), d[e] = n, t;
}, h = function(e, t) {
    return c[e] = t, t;
};

exports.default = {
    diffTime: 6e4,
    setScrollMsgId: h,
    getHistory: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20;
        if (!t && !0 === l[e]) return i.default.resolve({
            list: f[e],
            end: l[e] || !1,
            msgId: "msg" + c[e]
        });
        var s = {
            conversation_id: "" + e,
            min_conversation_message_id: "0",
            count: r
        }, a = c[e];
        return !t && d[e] && (s.max_conversation_message_id = d[e]), t && (d[e] = null), 
        n.default.send("getHistoryMsg", s).then(function(t) {
            var n = t.message || [];
            return 0 === n.length && (l[e] = !0), p(e, n), n;
        }).then(g).then(function(t) {
            return _(t, e);
        }).then(function(n) {
            var r = f[e] || [];
            if (t) {
                n.length && (a = "" + n[n.length - 1].client_message_id);
                var s = u.default.getP2PMsg(e);
                r = s && s.length > 0 ? n.concat(s) : n;
            } else r = n.concat(r);
            return f[e] = r, r;
        }).then(v).then(function(t) {
            return {
                list: t,
                end: l[e] || !1,
                msgId: "msg" + a
            };
        });
    },
    getSender: _,
    pushMsg: function(e) {
        var t = e.conversation_id, n = e.request_id, r = e.client_message_id;
        if (t) if (f[t]) {
            var s = f[t], i = !1;
            f[t] = s.map(function(t) {
                return n && t.request_id === n || r && t.client_message_id === r ? (i = !0, Object.assign(t, e)) : t;
            }), i || f[t].push(e);
        } else f[t] = [ e ];
    },
    onMsg: function(e, t) {
        m[e] = t;
    },
    offMsg: function(e) {
        m[e] && delete m[e];
    },
    getMsg: function(e, t) {
        return a.default.getLoginUserId().then(function(r) {
            var s = t.message_content;
            return {
                conversation_id: e,
                sender_id: r,
                push_name: "",
                client_message_id: n.default.getClientMsgId(),
                server_message_id: "0",
                message_type: t.message_type,
                message_content: s,
                timestamp: "" + n.default.now(),
                client_type: 11
            };
        });
    },
    sendMsg: function(e, t) {
        return e = r.default.clone(e), e = s.default.formatMsg(e), n.default.send("sendMsg", {
            message: e,
            allocate_type: parseInt(t) || 1
        }).then(function(e) {
            e.conversation_id;
            return e;
        });
    }
};