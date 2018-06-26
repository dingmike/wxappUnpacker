function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    return i.request("mwp.cpsunion.cpsTransferUrlActionlet", "1", {
        shortUrl: e
    }).then(i.filterResult).then(function(e) {
        var r = e.match(/^(?:\w+:\/\/)?([^?]*?)\??([^?]+)$/), t = r[1], o = r[2];
        return {
            url: t,
            options: o ? n.parse(o) : {}
        };
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transferShortQuery = r;

var t = e(require("../common/m")), o = require("./cps"), s = e(require("../common/base/PageFactory")), i = t.default.MWP, n = t.default.qs, u = {
    _optionsPromise: null,
    methods: {
        $getOptions: function(e) {
            var t = this;
            if (void 0 === e && (e = !0), null !== this._optionsPromise) return this._optionsPromise;
            var s = this.query._shortQuery;
            if (!s) {
                var i = this.query.scene;
                if ("string" == typeof i) {
                    var u = {};
                    if (i = decodeURIComponent(i), !(s = i.indexOf("=") < 0 ? i : (u = n.parse(i))._shortQuery)) return (0, 
                    o.checkCPS)(u), this._optionsPromise = Promise.resolve(u);
                }
            }
            return this._optionsPromise = s ? r(s).then(function(r) {
                var s = r.url, i = r.options, n = t.route;
                return s && s !== n ? (e && ("pages/home/index" === n ? t.$navigate("/" + s, i, !0) : t.$redirect("/" + s, i, !0)), 
                Promise.reject({
                    url: s,
                    options: i
                })) : ((0, o.checkCPS)(i), i);
            }) : Promise.resolve(this.query);
        }
    }
};

exports.default = u, s.default.addDefaultMixin(u);