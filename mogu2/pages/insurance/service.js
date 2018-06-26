function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    var r = this;
    if (e.url) {
        if (e.version) return "string" != typeof e.version && console.warn("接口版本请用字符串，否则在 iOS 下会有问题"), 
        e.data || console.warn("接口无请求数据，请确认"), this.$loading && this.$loading.show(), u.request(e.url, e.version, e.data).then(u.filterResult).then(function(e) {
            return r.$loading && r.$loading.hide(), e;
        });
        console.error("接口无指定版本号");
    } else console.error("接口无指定地址");
}

function t(e, r) {
    for (var t in r) {
        var n = r[t];
        if (!e[t] && n.isRequired) return void console.error("必要参数" + t + "遗漏");
        if (n.isRequired && o(e[t]) !== n.type) return void console.error("必要参数" + t + "类型不符合要求");
    }
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.mwpRequest = r, exports.errorHandler = function(e) {
    this.$loading && this.$loading.hide(), console.log(e), l(e, {
        _author: "roushan",
        threshold: 1
    }), i.default.showUserError(e) || this.$toast && this.$toast.show(e.message);
};

var n = e(require("../../common/m")), i = e(require("../../common/service/user")), u = n.default.MWP, s = n.default.MCE, l = n.default.fn.sendMsg, a = {
    getMaitResource: function(e, r) {
        return s.get({
            pid: e
        }, !r);
    },
    getFreightDetail: function(e) {
        return r.bind(this)({
            url: "mwp.pay_insurance.freightdetail",
            version: "1",
            data: t(e, {
                orderId: {
                    type: "number",
                    isRequired: !0
                },
                refundId: {
                    type: "number"
                },
                platformType: {
                    type: "number"
                }
            })
        });
    },
    freightAllowReApplyClaim: function(e) {
        return r.bind(this)({
            url: "mwp.pay_insurance.freightAllowReApplyClaim",
            version: "1",
            data: t(e, {
                orderId: {
                    type: "number",
                    isRequired: !0
                },
                refundId: {
                    type: "number"
                },
                platformType: {
                    type: "number"
                }
            })
        });
    }
};

exports.default = a;