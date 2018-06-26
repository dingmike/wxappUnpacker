Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/utils/imgUrlTool")), i = function(e) {
    var i = "";
    return e && "center" === e ? i = "flex f-fw-w f-jc-c" : e && "flex-start" === e ? i = "flex f-fw-w f-jc-fs" : e && "flex-end" === e ? i = "flex f-fw-w f-jc-fe" : e && "space-around" === e ? i = "flex f-fw-w f-jc-sa" : e && "space-between" === e && (i = "flex f-fw-w f-jc-sb"), 
    i;
}, t = function(e) {
    var i = {};
    for (var t in e) e[t] && "" !== e[t] && (i[t] = e[t]);
    return i;
};

exports.default = {
    activeEntryTansData: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            data: {},
            config: {},
            minCount: 1,
            maxCount: 100
        }, o = n.data, a = void 0 === o ? {} : o, r = n.config, g = void 0 === r ? {} : r, d = n.minCount, f = void 0 === d ? 1 : d, l = n.maxCount, u = void 0 === l ? 100 : l, s = a && a.list || [], m = a && a.info || {}, c = {}, x = [], h = t(g);
        Object.assign(m, h);
        var p = function() {
            var e = "", i = "";
            if (1 === arguments.length) e = arguments[0], i = arguments[0]; else {
                if (!(arguments.length >= 2)) return;
                e = arguments[0], i = arguments[1];
            }
            void 0 !== m[e] && null !== m[e] && "" !== m[e] && (c[i] = m[e]);
        };
        return m.listClassName = i(m.justifyContent), m && (p("title", "$headingTitle"), 
        p("titleColor", "$headingColor"), p("titleIcon", "$headingTitleIcon"), p("moreTitle", "$headingMoreText"), 
        p("moreLink", "$headingMoreLink"), p("moreColor", "$headingMoreTextColor"), p("wxaMoreLink", "$headingWxaMoreLink"), 
        p("wxaMoreAppId", "$headingAppId"), p("boxBgColor"), m.boxBgImage && (c.boxBgImage = e.default.getWidthSuffix(m.boxBgImage, 750)), 
        p("boxMargin"), p("boxPadding"), p("boxHeight"), p("boxMinHeight"), p("backgroundColor", "boxBgColor"), 
        m.backgroundImage && (c.boxBgImage = e.default.getWidthSuffix(m.backgroundImage, 750)), 
        p("margin", "boxMargin"), p("padding", "boxPadding"), p("listClassName"), p("listMargin"), 
        p("listPadding"), p("itemWidth"), p("itemHeight"), p("itemPadding"), p("itemMargin"), 
        p("itemBorderRadius"), p("itemBgColor"), p("imageWidth"), p("imageHeight"), p("imageMargin"), 
        p("itemBorderRadius", "imageBorderRadius"), p("titleIsShow"), p("titleWidth"), p("titleHeight"), 
        p("titleTextAlign"), p("titleFontSize"), p("titleFontWight"), p("titleTop"), p("titleLeft"), 
        p("descriptionIsShow"), p("descriptionWidth"), p("descriptionHeight"), p("descriptionTextAlign"), 
        p("descriptionFontSize"), p("descriptionTop"), p("descriptionLeft"), p("minCount"), 
        p("maxCount")), s && s.length >= f && ((s = s.slice(0, u)).map(function(i) {
            var t = i.width || 500;
            i.suffixImage = i.image ? e.default.getWidthSuffix(i.image, t) : "", i.wxa_suffixImage = i.wxa_image ? e.default.getWidthSuffix(i.wxa_image, t) : "";
        }), x = s), {
            activeEntryItem: x,
            headingConfig: c
        };
    },
    deleteEmptyValue: t,
    arrayToObject: function(e) {
        var i = {};
        return e.map(function(e) {
            e.key && (i[e.key] = e);
        }), i;
    },
    changeListClassName: i
};