Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    home: !0,
    installment: !1,
    message: !1,
    pwd: !1,
    result: !1
}, o = [ "home" ];

exports.default = function(t) {
    -1 === t ? (o.pop(), t = o.pop()) : "home" === t ? o = [ "home" ] : o[o.length - 1] !== t && o.push(t), 
    o.length || (o = [ "home" ], t = "home");
    for (var r in e) e[r] = r === t;
    return {
        page: t,
        showConfig: e
    };
};