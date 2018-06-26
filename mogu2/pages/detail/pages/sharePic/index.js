function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../common/m")), o = t(require("../../../../common/base/createPage")), n = t(require("../../../../components/loading/index")), a = t(require("../../../../components/toast/index")), i = t(require("../../../../common/utils/imgUrlTool")), r = t(require("../../../../common/utils/cache")), l = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
}(require("../../components/base/index")), s = e.default.MWP, c = e.default.fn.sendMsg, u = l.generatePicture;

exports.default = (0, o.default)({
    components: {
        loading: n.default,
        toast: a.default
    },
    data: {
        imageUrl: ""
    },
    onLoad: function() {
        var t = this;
        this.$loading.show(), wx.showNavigationBarLoading(), this.optionsReady = this.$getOptions().then(function(e) {
            t.options = e || {}, console.log("options: ", e);
        });
    },
    onReady: function() {
        var t = this;
        this.optionsReady.then(function() {
            t.$loading.show(), wx.showNavigationBarLoading(), t.template = {}, t.template.default = {
                url: "https://s3.mogucdn.com/mlcdn/c45406/171220_513lj8f90ad3h6j3libd0a7858e1b.html",
                height: 880
            };
            var e = r.default.get("detail.shareparams") || {}, o = e.page, n = e.scene;
            Promise.all([ t.getQrCode(o, n), t.getTemplate() ]).then(function(o) {
                var n = o[0], a = t.getShareParams(e, n);
                t.getSharePic(a);
            }).catch(function(e) {
                console.log(e), t.$loading.hide(), wx.hideNavigationBarLoading(), t.$toast.show("获取图片信息失败");
            });
        });
    },
    getTemplate: function() {
        var t = this;
        return this.$root.$mce_get({
            pid: 97290
        }).then(function(e) {
            e.list && e.list.length > 0 && e.list.map(function(e) {
                t.template[e.type] = e;
            });
        }).catch(function(t) {
            console.log(t), c(t, {
                _author: "yuwan",
                threshold: 1
            });
        });
    },
    getQrCode: function(t, e) {
        return this.$root.$mwp("mwp.ad_wxcode.wxcodeGenActionlet", "1", {
            page: t,
            scene: e,
            appType: 1,
            returnContentType: 2,
            width: 200,
            autoColor: !1,
            lineColor: {
                r: 255,
                g: 34,
                b: 68
            }
        }).then(s.filterResult);
    },
    getShareParams: function(t, e) {
        var o = this, n = t.topImage, a = t.topBanner, r = t.title, l = t.currency, s = t.nowPrice, c = t.highNowPrice, u = t.oldPrice, h = t.priceTags, g = t.priceSplit, d = this.subString(r || "", 28), f = {
            topBanner: a,
            nowPrice: s,
            highNowPrice: c,
            topImage: i.default.getGoodsRatioSuffix(n, 750, "3:4", !1),
            title0: d.newStr_0,
            title1: this.subString(d.newStr_1, 25, !0).newStr_0,
            currencyLow: s ? l : "",
            currencyHigh: c ? l : "",
            priceSplit: c ? g : "",
            oldPrice: u ? {
                svgContent: "" + l + u || "",
                x: p
            } : "",
            qrcode: e
        }, p = 32;
        return h && h.length > 0 && h.map(function(t, e) {
            f["tag" + e] = {
                svgContent: t.text,
                x: p + 11
            }, f["tagBg" + e] = {
                width: 10 * o.calculateLen(t.text) + 22,
                x: p
            }, p += 10 * o.calculateLen(t.text) + 22 + 10;
        }), f;
    },
    getSharePic: function(t) {
        var e = this, o = t.topBanner ? this.template.sharePic_act : this.template.sharePic_normal || this.template.default;
        u({
            appKey: "168",
            url: o.url,
            params: t,
            success: function(t) {
                t ? e.setData({
                    imageUrl: t.surl,
                    imageHeight: o.height
                }) : (console.log(t), e.$toast.show("生成图片失败"));
            },
            error: function(t) {
                console.log(t), e.$toast.show("生成图片失败");
            },
            complete: function() {
                e.$loading.hide(), wx.hideNavigationBarLoading();
            }
        });
    },
    saveImage: function() {
        var t = this;
        this.$loading.show(), this.$root.$logE("016000286"), wx.downloadFile({
            url: this.data.imageUrl,
            success: function(e) {
                var o = e.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: o,
                    success: function() {
                        console.log("文件保存成功"), t.$toast.show("保存成功，可以分享到朋友圈"), t.$loading.hide();
                    },
                    fail: function() {
                        t.$toast.show("图片保存失败"), t.$loading.hide();
                    }
                }), console.log("图片下载成功");
            },
            fail: function() {
                console.log("图片下载失败"), t.$toast.show("图片下载失败"), t.$loading.hide();
            }
        });
    },
    calculateLen: function(t) {
        var e = /[^\x00-\xff]/g;
        return t.replace(e, "**").length;
    },
    subString: function(t, e, o) {
        for (var n = 0, a = "", i = "", r = /[^\x00-\xff]/g, l = this.calculateLen(t), s = 0; s < l && (null != (i = t.charAt(s).toString()).match(r) ? n += 2 : n++, 
        !(n > e)); s++) a += i;
        return o && l > e && (a += "..."), {
            newStr_0: a || "",
            newStr_1: t.substring(a.length) || ""
        };
    }
});