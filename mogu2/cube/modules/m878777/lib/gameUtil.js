function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../../../../common/m.js")), i = e(require("../../../../common/service/user.js")), s = {
    listenData: function(e, s, o, a) {
        var t = n.default.MWP, r = this, c = !a || !1 !== a.needLogin, u = !(!a || !0 !== a.isRisk);
        a.loginSuccess = a.loginSuccess || function() {}, a.loginFail = a.loginFail || function() {}, 
        u && (s.platform = "sp"), t.request(e.name, e.version, s).then(function(e) {
            var n = "";
            if (e && e.ret == t.Code.SessionInvalid) n = "noLogin"; else if (e && e.ret == t.Code.Success) n = "win"; else if (e && /^FAIL_BIZ_/.test(e.ret)) switch (n = "noWin", 
            e.ret) {
              case "FAIL_BIZ_3001":
                n = "noWin";
                break;

              case "FAIL_BIZ_7001":
                n = "noQual";
                break;

              case "FAIL_BIZ_1005":
              case "FAIL_BIZ_8002":
                n = "limit";
                break;

              case "FAIL_BIZ_7003":
                n = "risk";
                break;

              case "FAIL_BIZ_70022":
                n = "awardLimit";
                break;

              case "FAIL_BIZ_1003":
              case "FAIL_BIZ_1002":
                n = "noWin2";
                break;

              default:
                n = "noWin3";
            } else n = "noWin4";
            o({
                status: n,
                data: e.data,
                msg: e.msg
            }), "noLogin" != n && "win" != n && r.showTip(e.msg), "noLogin" == n && c && i.default.ensure(a.loginSuccess, a.loginFail);
        }).catch(function(e) {
            o({
                status: "noWin4"
            }), r.showTip();
        });
    },
    showTip: function() {}
};

exports.default = s;