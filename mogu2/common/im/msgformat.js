function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./emoji")), s = require("../service/route"), a = e(require("../utils/imgUrlTool")), r = /&\$#@~\^@\[{:(.*?(?!&\$#@~\^@\[{:)):}]&\$~@#@/i, n = /^https?:\/\/.*(jpg|png|gif)$/i, i = /(\[[a-zA-Z0-9_\u4e00-\u9fa5]*\])/gi, o = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return e.url ? "&$#@~^@[{:" + e.url + ":}]&$~@#@" : "";
}, c = function(e) {
    var t = JSON.parse(e) || {};
    return JSON.stringify({
        emotionGroup: t.groupId,
        emotionTag: t.tag,
        url: t.url
    });
}, u = function() {
    var e = "";
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(function(t) {
        switch (t.itemtype) {
          case 1:
            return void (e += t.text);

          case 2:
            return void (e += "&$#@~^@[{:" + t.url + ":}]&$~@#@");

          case 3:
            var s = t.url || "https://imapi.mogujie.com/phiz/index?groupId=" + t.groupid + "&tag=" + t.tag;
            return void (e += "&$#@~^@[{:" + s + ":}]&$~@#@");

          default:
            return;
        }
    }), e;
}, m = function(e) {
    e.type = 7;
    try {
        return JSON.stringify(e);
    } catch (t) {
        return console.warn(t), e;
    }
}, g = function(e) {
    var t = /(https?:\/\/[\d\w\.\/\-\?\=\&\#]*)/gi, a = [];
    return ((e = e.replace(/\[\&.*\&\].*$/, "")).split(t) || []).map(function(e) {
        t.test(e) ? (e = (0, s.transform)(e), /^\/pages.*/.test(e) ? a.push({
            itemtype: 4,
            url: e
        }) : a.push({
            itemtype: 1,
            text: e
        })) : e && e.trim() && a.push({
            itemtype: 1,
            text: e
        });
    }), a;
}, p = function() {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split(i), s = (0, 
    t.default)() || {}, a = [];
    return e.map(function(e) {
        s[e] ? a.push({
            itemtype: 3,
            groupid: s[e].groupId,
            tag: s[e].tag,
            url: s[e].url
        }) : a = a.concat(g(e));
    }), a;
}, f = function(e) {
    var t = e.split(r), s = [];
    for (var i in t) {
        var o = t[i];
        n.test(o) ? s.push({
            itemtype: 2,
            url: a.default.getWidthSuffix(o, 640)
        }) : s = s.concat(p(o));
    }
    return s;
}, _ = function(e) {
    try {
        e = JSON.parse(e);
    } catch (t) {
        console.log(t, e);
    }
    var t = [];
    return e.map(function(e) {
        1 !== e.itemtype ? t.push(e) : t = t.concat(p(e.text, !1));
    }), t;
}, l = function(e) {
    var t = JSON.parse(e);
    return [ {
        itemtype: 2,
        groupid: t.emotionGroup,
        tag: t.emotionTag,
        url: t.url || "https://imapi.mogujie.com/phiz/index?p=" + encodeURIComponent(e) + "&tag="
    } ];
}, y = function(e) {
    try {
        e.message_content = JSON.parse(e.message_content);
    } catch (t) {
        return e.message_type = 501, e.message_content = "[暂不支持该格式消息]", e;
    }
    switch (e.message_content.type) {
      case 6:
        e.message_type = 1001;
        break;

      case 7:
        e.message_type = 1007;
        break;

      case 11:
        e.message_type = 1011;
        break;

      case 12:
        if (e.message_type = 1012, e.message_content) {
            var t = e.message_content;
            t.orderUrl && (t.orderUrl = (0, s.transform)(t.orderUrl)), t.firstItem && t.firstItem.image && (t.firstItem.image = a.default.getWidthSuffix(t.firstItem.image, 640)), 
            e.message_content = t;
        }
        break;

      case 13:
        if (e.message_type = 1013, e.message_content) {
            var r = e.message_content;
            r.refundUrl && (r.url = (0, s.transform)(r.refundUrl)), r.firstItem && r.firstItem.image && (r.firstItem.image = a.default.getWidthSuffix(r.firstItem.image, 640)), 
            e.message_content = r;
        }
        break;

      case 1e3:
        e.message_type = 511, e.message_content = e.message_content.content;
        break;

      default:
        e.message_type = 501, e.message_content = "[暂不支持该格式消息]";
    }
    return e;
}, d = function(e) {
    var t = e, s = t.message_content;
    switch (t.message_type) {
      case 1:
      case 129:
        e.message_content = f(s), e.message_type = 505;
        break;

      case 100:
        e.message_type = 503;
        break;

      case 3:
        e = y(e);
        break;

      case 5:
      case 132:
        e.message_content = l(s), e.message_type = 505;
        break;

      case 501:
        e.message_content = p(s), e.message_type = 505;
        break;

      case 505:
        e.message_content = _(s);
        break;

      default:
        e.message_type = 501, e.message_content = "[暂不支持该格式消息]";
    }
    return e;
};

exports.default = {
    formatMsg: function(e) {
        var t = e.message_content;
        switch (e.message_type) {
          case 501:
            e.message_type = 1, e.message_content = t;
            break;

          case 502:
            e.message_type = 1, e.message_content = o(t);
            break;

          case 504:
            e.message_type = 5, e.message_content = c(t);
            break;

          case 505:
            e.message_type = 1, e.message_content = u(t);
            break;

          case 1007:
            e.message_type = 3, e.message_content = m(t);
        }
        return e;
    },
    formatLastMsg: function(e) {
        var t = e = d(e), s = t.message_content;
        switch (t.message_type) {
          case 501:
            return s;

          case 502:
            return "[图片]";

          case 503:
            return "[你收到一条语音消息，请在app端查看]";

          case 504:
            return "[表情]";

          case 505:
            var a = "";
            return (s || []).map(function(e) {
                1 === e.itemtype && (a += e.text), 2 === e.itemtype && (a += "[图片]"), 3 === e.itemtype && (a += "[表情]"), 
                4 === e.itemtype && (a += "[链接]");
            }), a;

          case 1007:
            return "[商品消息]";

          default:
            return "[通知]";
        }
    },
    parseMsg: d
};