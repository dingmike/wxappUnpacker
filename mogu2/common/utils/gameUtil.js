function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../service/user.js")), i = e(require("../m")), s = {
    listenData: function(e, s, t, a) {
        var o = i.default.MWP, r = this, c = !a || !1 !== a.needLogin, u = !(!a || !0 !== a.isRisk);
        a.loginSuccess = a.loginSuccess || function() {}, a.loginFail = a.loginFail || function() {}, 
        u && (s.platform = "sp"), o.request(e.name, e.version, s, {
            method: "POST",
            env: r.env
        }).then(function(e) {
            var i = "";
            if (e && e.ret == o.Code.SessionInvalid) i = "noLogin"; else if (e && e.ret == o.Code.Success) i = "win"; else if (e && /^FAIL_BIZ_/.test(e.ret)) switch (i = "noWin", 
            e.ret) {
              case "FAIL_BIZ_3001":
                i = "noWin";
                break;

              case "FAIL_BIZ_7001":
                i = "noQual";
                break;

              case "FAIL_BIZ_1005":
              case "FAIL_BIZ_8002":
                i = "limit";
                break;

              case "FAIL_BIZ_7003":
                i = "risk";
                break;

              case "FAIL_BIZ_70022":
                i = "awardLimit";
                break;

              case "FAIL_BIZ_1003":
              case "FAIL_BIZ_1002":
                i = "noWin2";
                break;

              default:
                i = "noWin3";
            } else i = "noWin4";
            t({
                status: i,
                data: e.data,
                msg: e.msg
            }), "noLogin" != i && "win" != i && r.showTip(e.msg), "noLogin" == i && c && n.default.ensure(a.loginSuccess, a.loginFail);
        }).catch(function() {
            t({
                status: "noWin4"
            }), r.showTip();
        });
    },
    showTip: function() {}
};

exports.default = s;