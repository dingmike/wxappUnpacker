function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./renderOptions")), t = e(require("./renderFunc"));

exports.default = {
    componentOptions: r.default,
    renderComponentsFunc: t.default
};