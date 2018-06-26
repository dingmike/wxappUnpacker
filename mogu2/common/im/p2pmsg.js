function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./sdk/api")), r = e(require("../m")), n = e(require("./conv")), s = e(require("./sdk/promise")), a = {}, i = [], u = {}, o = [ "116zzt1m", "1vnm0pe", "116zzt1m", "117025nc", "1qvugc", "1qvubc", "1172pyhu", "1qfnyw", "1172jnw8" ], c = function(e, t) {
    if (t.conversation_id) {
        var r = t.conversation_id;
        u[r] ? u[r].push(t) : u[r] = [ t ];
    }
    a[e] && a[e].map(function(e) {
        return e(t);
    });
};

t.default.on("getP2pMsg", function(e) {
    if (e && e.data && e.data.message) {
        var r = e.data.message, s = r.message_data, a = r.from_userid;
        r.to_userid;
        try {
            "string" == typeof s && (s = JSON.parse(s));
        } catch (e) {
            return void console.error("getP2pMsg error:" + e);
        }
        n.default.getConvByUserId(a).then(function(e) {
            var r = e.conversation_id;
            switch (s.action) {
              case "wechat_p2p_msg_receive":
                c("wechat_p2p_msg_receive", s);
                break;

              case "rateScore":
                var n = s.data || {};
                g(n.uid, n.shopid).then(function(e) {
                    n.isOrigin = e;
                    var s = {
                        sender_id: a,
                        conversation_id: r,
                        timestamp: "" + t.default.now(),
                        client_message_id: t.default.getClientMsgId(),
                        message_type: -1,
                        message_content: n
                    };
                    c("rateScore", s);
                }).then();
            }
        });
    } else console.error("it is not a p2pMsg " + e);
});

var d = function(e) {
    return r.default.MWP.request("mwp.imcenter.appMgjBatchShopInfo", "1", {
        userIds: [ e ]
    }).then(function(e) {
        var t = r.default.MWP.filterResult(e);
        if (t) return t[0];
    });
}, f = function(e) {
    return o.indexOf(e) >= 0;
}, g = function(e, t) {
    return t ? s.default.resolve(f(t)) : d(e).then(function(e) {
        return f(e.shopId);
    });
};

exports.default = {
    onP2PMsg: function(e, t) {
        a[e] || (a[e] = []), a[e].push(t);
    },
    getTags: function() {
        return i.length > 0 ? s.default.resolve(i) : r.default.MWP.request("mwp.cscenter.getRateTags", "1", {
            bizKey: "imCustomerRate"
        }).then(function(e) {
            var t = r.default.MWP.filterResult(e);
            return i = t.tags || [];
        });
    },
    getP2PMsg: function(e) {
        return u[e] || [];
    },
    clearP2PMsg: function(e) {
        u[e] = [];
    }
};