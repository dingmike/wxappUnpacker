function n(n) {
    var e = {};
    return o.forEach(function(o) {
        n[o] && (e[o] = n[o], delete n[o]);
    }), n.methods = Object.assign({}, n.methods, e), n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o, e) {
    return o = n(o), o.__isCommonComponent = !0, o.__propsFunc = e || function() {
        return {};
    }, {
        componentOptions: o,
        renderComponentsFunc: function() {}
    };
};

var o = [ "onLoad", "onShow", "onReady", "onHide", "onUnload" ];