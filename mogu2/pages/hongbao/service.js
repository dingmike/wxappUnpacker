function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function o(e) {
    var o = this;
    if (e.url) {
        if (e.version) return e.data || console.warn("接口无请求数据，请确认"), this.$loading && this.$loading.show(), 
        n.request(e.url, e.version, e.data).then(n.filterResult).then(function(e) {
            return o.$loading && o.$loading.hide(), e;
        });
        console.error("接口无指定版本号");
    } else console.error("接口无指定地址");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mwpRequest = o, exports.handleRequestError = function(e) {
    this.$loading && this.$loading.hide(), console.log(e), s(e, {
        _author: "roushan",
        threshold: 1
    }), r.default.showUserError(e) || this.$toast && this.$toast.show(e.message);
};

var t = e(require("../../common/m")), r = e(require("../../common/service/user")), n = t.default.MWP, i = t.default.MCE, s = t.default.fn.sendMsg, a = (n.Env.Mock, 
{
    getMaitResource: function(e, o) {
        return i.get({
            pid: e
        }, !o);
    },
    hongbaoList: function(e) {
        return o.bind(this)({
            url: "mwp.payhongbao.hongbaolist11",
            version: 1,
            data: e
        });
    },
    hongbaoDetail: function(e) {
        return o.bind(this)({
            url: "mwp.payhongbao.hongbaodetail11",
            version: 1,
            data: {
                id: e
            }
        });
    },
    hongbaoWithdraw: function(e) {
        return o.bind(this)({
            url: "mwp.payhongbao.withdraw",
            version: 1,
            data: {
                id: e
            }
        });
    }
});

exports.default = a;