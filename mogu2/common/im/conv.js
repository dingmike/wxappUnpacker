function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function n(n, t) {
        var e = [], r = !0, i = !1, u = void 0;
        try {
            for (var a, o = n[Symbol.iterator](); !(r = (a = o.next()).done) && (e.push(a.value), 
            !t || e.length !== t); r = !0) ;
        } catch (n) {
            i = !0, u = n;
        } finally {
            try {
                !r && o.return && o.return();
            } finally {
                if (i) throw u;
            }
        }
        return e;
    }
    return function(t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return n(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = n(require("./sdk/api")), r = n(require("./user")), i = n(require("./group")), u = n(require("./msgformat")), a = n(require("./util")), o = n(require("./sdk/promise")), s = [], c = [], f = !1, d = 0, l = 200, v = e.default.now(), p = null;

e.default.on("message", function(n) {
    var t = n.data;
    if (p && t && t.message) {
        var e = t.message;
        _(e).then(function(n) {
            p({
                list: n
            });
        }).catch(function(n) {
            console.log(n);
        });
    }
}), e.default.on("msgReaded", function(n) {
    if (p) {
        var t = n.data.conversation_id;
        c.map(function(n) {
            n.conversation_id === t && (n.unread_count = 0);
        }), p({
            list: c
        });
    }
}), e.default.on("convUpdated", function(n) {
    if (p) {
        var t = n.data.conversation;
        if (t) {
            var e = c.findIndex(function(n) {
                return n.conversation_id === t.conversation_id;
            });
            if (!(e < 0)) {
                var r = m(t.conversation_status);
                if (r.isDelete) c.splice(e, 1); else if (r.isTop) {
                    var i = c[e];
                    i.isTop = !0, c.splice(e, 1), c.unshift(i);
                } else c[e] = Object.assign(c[e], t, {
                    isTop: !1
                });
                p({
                    list: c
                });
            }
        }
    }
});

var g = function() {
    return s.length > 0 ? o.default.resolve(s) : e.default.send("getConvList", {
        maxTime: "" + v,
        minTime: "0",
        count: l
    }).then(function(n) {
        if (s = [], n.conversation) {
            var t = n.conversation, e = [], r = [];
            (t = t.sort(function(n, t) {
                return parseInt(t.update_time) - parseInt(n.update_time);
            })).map(function(n) {
                var t = n, i = t.update_time, u = t.conversation_id, o = t.conversation_status;
                if (!(r.indexOf(u) > -1)) {
                    r.push(u);
                    var c = m(o);
                    n = Object.assign(n, c), c.isDelete || (i && (n.updateTime = a.default.dayTime(parseInt(i), !0)), 
                    c.isTop ? e.push(n) : s.push(n));
                }
            }), s = e.concat(s), l = s.length;
        }
        return s;
    });
}, h = function() {
    var n = [], t = [], e = [], r = [];
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(function(i) {
        var u = i.conversation_id, a = i.entity_id, o = i.entity_type;
        1 === o || 3 === o ? n.push(a) : 2 === o && t.push(a), e.push(u), r.push(i);
    }), {
        convs: e,
        users: n,
        groups: t,
        list: r
    };
}, _ = function(n) {
    var t = n.conversation_id || null, e = c.find(function(n) {
        return n.conversation_id === t;
    });
    return e ? (e.unread_count ? e.unread_count += 1 : e.unread_count = 1, n = Object.assign({}, n), 
    e.last_message = n, e.lastMsg = u.default.formatLastMsg(n), n.timestamp && (e.update_time = n.timestamp, 
    e.updateTime = a.default.dayTime(parseInt(n.timestamp), !0)), C(e, c), o.default.resolve(c)) : I([ t ]).then(function() {
        return c;
    });
}, m = function(n) {
    return n = n.toString(2).split("").reverse(), {
        isTop: parseInt(n[0], 10),
        isForbid: parseInt(n[1], 10),
        isMute: parseInt(n[2], 10),
        isDelete: parseInt(n[31], 10)
    };
}, y = function(n) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = h(n), c = s.convs, f = s.users, d = s.groups, l = s.list, v = [];
    if (c.length <= 0) return o.default.resolve([]);
    var p = a.withoutLastMsg, g = a.withoutUnread;
    return v.push(r.default.getUsers(f)), v.push(i.default.getGroups(d)), p || v.push(e.default.send("getLastMsg", {
        conversation_id: c
    }).then(function(n) {
        if (n && 0 === n.result && n.last_message) {
            var t = {};
            return n.last_message.map(function(n) {
                var e = n.conversation_id;
                t[e] = {
                    last_message: n.message,
                    lastMsg: u.default.formatLastMsg(n.message)
                };
            }), t;
        }
        return {};
    })), g || v.push(e.default.send("getUnreadCnt", {
        conversation_id: c
    }).then(function(n) {
        if (n && 0 === n.result && n.unread_count) {
            var t = {};
            return n.unread_count.map(function(n) {
                var e = n.conversation_id;
                t[e] = {
                    unread_count: n.unread_count
                };
            }), t;
        }
        return {};
    })), o.default.all(v).then(function(n) {
        var e = t(n, 4), r = e[0], i = e[1], u = e[2], a = e[3];
        return l.map(function(n) {
            var t = n.entity_id, e = n.conversation_id, o = r ? r[t] : {}, s = i ? i[t] : {}, c = u ? u[e] : {}, f = a ? a[e] : {};
            return Object.assign(n, o, s, c, f);
        });
    });
}, I = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e.default.send("fetchConv", {
        conversation_id: n
    }).then(function(n) {
        var e = n.conversation;
        return e = e.map(function(n) {
            var t = n, e = t.update_time, r = t.conversation_status, i = m(r);
            if (!(n = Object.assign(n, i)).isDelete) return e && (n.updateTime = a.default.dayTime(parseInt(e), !0)), 
            n;
        }), y(e, t).then(function(n) {
            return C(n, c), n;
        });
    });
}, T = function(n) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return e.default.send("createConv", {
        entity: [ {
            entity_type: t,
            entity_id: n
        } ]
    }).then(function(n) {
        var t = n.conversation;
        return y(t, r).then(function(n) {
            var t = n[0] || {};
            return C(t, c), t;
        });
    });
}, C = function n(t, e) {
    if (t instanceof Array) t.map(function(t) {
        e = n(t, e);
    }); else {
        var r = e.findIndex(function(n) {
            return t.conversation_id === n.conversation_id;
        });
        if (r > -1 && e.splice(r, 1), t.isTop) e.unshift(t); else {
            var i = e.findIndex(function(n) {
                return !n.isTop;
            });
            e.splice(i, 0, t);
        }
    }
    return e;
}, b = function(n, t) {
    var e = a.default.url2id(n), r = a.default.url2id(t);
    return e > r ? a.default.mixUint32(r, e) : a.default.mixUint32(e, r);
}, x = function(n) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, e = c.find(function(t) {
        return t.conversation_id === n;
    });
    return e ? o.default.resolve(e) : I([ n ], t).then(function(n) {
        return n && n.length > 0 ? n[0] : n;
    });
};

exports.default = {
    getConvList: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return n.refresh && (s = [], c = [], l = 200, v = e.default.now(), f = !1, d = 0), 
        g().then(function(t) {
            var e = n.count || 20, r = t.slice(d, d + e);
            return y(r, n).then(function(n) {
                return c = c.concat(n), (d += e) >= l && (f = !0), {
                    list: c,
                    end: f
                };
            });
        });
    },
    clearUnread: function(n) {
        return e.default.send("msgRead", {
            conversation_id: n
        }).then(function() {
            for (var t in c) {
                var e = c[t];
                if (n === e.conversation_id) {
                    c[t].unread_count = 0;
                    break;
                }
            }
            return {
                list: c
            };
        });
    },
    onConvChange: function(n) {
        p = n;
    },
    offConvChage: function() {
        p = null;
    },
    getConvByConvId: x,
    createConv: T,
    getConvs: I,
    getConvId: b,
    getConvByUserId: function(n, t) {
        var e = s.find(function(t) {
            return t.entity_id === n && 1 === t.entity_type;
        });
        return e ? o.default.resolve([ e ]).then(y).then(function(n) {
            return n && n.length > 0 ? n[0] : {};
        }) : r.default.getLoginUserId().then(function(e) {
            var r = b(n, e);
            return x(r, t).then(function(e) {
                return console.log(e), e || !0 !== t.create ? e : T(n, 1, t);
            });
        });
    }
};