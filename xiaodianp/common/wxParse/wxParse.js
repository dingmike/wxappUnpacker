function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(b) {
    var c = this, a = b.target.dataset.src, d = b.target.dataset.from;
    void 0 !== d && 0 < d.length && wx.previewImage({
        current: a,
        urls: c.data[d].imageUrls
    });
}

function c(b) {
    var c = this, a = b.target.dataset.from, e = b.target.dataset.idx;
    void 0 !== a && 0 < a.length && d(b, e, c, a);
}

function d(b, c, a, d) {
    var e = a.data[d];
    if (0 != e.images.length) {
        var g = e.images, h = f(b.detail.width, b.detail.height, a, d);
        g[c].width = h.imageWidth, g[c].height = h.imageheight, e.images = g;
        var i = {};
        i[d] = e, a.setData(i);
    }
}

function f(b, c, a, e) {
    var f = 0, h = 0, i = 0, j = 0, k = {};
    return wx.getSystemInfo({
        success: function(d) {
            var l = a.data[e].view.imagePadding;
            f = d.windowWidth - 2 * l, h = d.windowHeight, console.log("windowWidth" + f), b > f ? (i = f, 
            console.log("autoWidth" + i), j = i * c / b, console.log("autoHeight" + j), k.imageWidth = i, 
            k.imageheight = j) : (k.imageWidth = b, k.imageheight = c);
        }
    }), k;
}

var e = require("./showdown.js"), g = a(e), h = require("./html2json.js"), j = a(h);

module.exports = {
    wxParse: function() {
        var f = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', h = arguments[3], i = arguments[4], k = h, l = {};
        if ("html" == e) l = j.default.html2json(a, f); else if ("md" == e || "markdown" == e) {
            var o = new g.default.Converter(), n = o.makeHtml(a);
            l = j.default.html2json(n, f);
        }
        l.view = {}, l.view.imagePadding = 0, void 0 !== i && (l.view.imagePadding = i);
        var d = {};
        d[f] = l, k.setData(d), k.wxParseImgLoad = c, k.wxParseImgTap = b;
    },
    wxParseTemArray: function(b, c, a, e) {
        for (var f, d = [], g = e.data, h = null, i = 0; i < a; i++) f = g[c + i].nodes, 
        d.push(f);
        b = b || "wxParseTemArray", h = JSON.parse('{"' + b + '":""}'), h[b] = d, e.setData(h);
    },
    emojisInit: function() {
        var b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        j.default.emojisInit(b, c, a);
    },
    wxParseImgLoad: c,
    wxParseImgTap: b
};