function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}(require("../base/index")), r = t(require("../../../../common/utils/cache")), o = t(require("../../../../common/m")), a = t(require("../../../../common/utils/imgUrlTool")), i = t(require("../../../../common/utils/abtest.js")), n = t(require("../../../../common/utils/debug")), s = o.default.MWP, c = e.generatePicture, l = "https://s10.mogucdn.com";

exports.default = {
    data: function() {
        return {
            isShow: null,
            friendsIcon: "",
            momentsIcon: "",
            bgImage: "https://s3.mogucdn.com/mlcdn/c45406/180316_21cjdccgc4iiklag7j8jh57b6bh4h_750x723.jpg",
            color: "#ffffff",
            strongColor: "#fff555"
        };
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            var e = this;
            this.template = {}, this.template.sharePic_default = {
                url: "https://s3.mogucdn.com/mlcdn/c45406/171220_513lj8f90ad3h6j3libd0a7858e1b.html",
                height: 880
            }, this.isNotFirst ? this.isNotFirst = !0 : this.$root.$logAb("detail_share_ab");
            var r = t.isNeedShareIntegral, o = t.shareIntegralInfo, a = void 0 === o ? {} : o, i = a.rules, n = a.bgImage, s = a.color, c = [ "ruleContent", "ruleDesc", "ruleTips" ];
            i && i.map(function(t) {
                t.ruleList = [], c.map(function(r) {
                    t[r] && t.ruleList.push({
                        name: r,
                        content: e.parseText(t[r])
                    });
                });
            }), this.setData(Object.assign({
                isNeedShareIntegral: r,
                dialogStyle: r ? "background-image: url(" + n + "); color: " + s : ""
            }, a));
        },
        setShareInfo: function(t) {
            var e = this, r = t.iconConfig, o = void 0 === r ? {} : r, a = t.shareTemplate, i = this.data.friendsIcon || o.friendsIcon || "https://s10.mogucdn.com/mlcdn/c45406/180307_7ifi8b67j7a7jhfe28cgkd60hji1j_220x220.png", n = this.data.momentsIcon || o.momentsIcon || "https://s10.mogucdn.com/mlcdn/c45406/180307_4h542k9kk4lc52755g63lgj4fh700_220x220.png";
            this.setData({
                friendsIcon: i,
                momentsIcon: n
            }), a && a.map(function(t) {
                e.template[t.type] = t;
            });
        },
        showShareDialog: function() {
            var t = i.default.libra.alterWithExpCode("detail_share_ab"), e = t && t.extraParams || {};
            this.params = r.default.get("detail.shareparams") || {}, e.isNew && this.getFriendsPicure(), 
            this.$root.$wrapper && this.$root.$wrapper.$emit("$shareDialog.zIndex", 100), this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show"), 
            this.setData({
                isShow: !0
            });
        },
        hideShareDialog: function() {
            var t = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.hide"), this.$root.$wrapper && this.$root.$wrapper.$emit("$shareDialog.zIndex", 98), 
            this.setData({
                isShow: !1
            }), setTimeout(function() {
                t.setData({
                    isShow: null
                });
            }, 300);
        },
        getFriendsPicure: function() {
            var t = this;
            if (this.template.detail) {
                var e = this.params, r = /[^\x00-\xff]/g, o = {
                    topImage: a.default.getGoodsRatioSuffix(e.topImage, 450, "3:4", !1),
                    oldPrice: e.oldPrice ? "" + e.currency + e.oldPrice : "",
                    tag: e.priceTags.length > 0 ? e.priceTags[0].text : ""
                };
                o.tagBg = {
                    width: o.tag ? 15 * o.tag.replace(r, "**").length + 24 : 0
                }, c({
                    appKey: "16c",
                    url: this.template.detail.url,
                    params: Object.assign({}, e, o),
                    success: function(e) {
                        t.$root.$wrapper.shareImageUrl = "" + l + e.path;
                    }
                });
            }
        },
        getMomentsPicure: function() {
            var t = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show");
            var e = this.params, r = e.page, o = e.scene;
            this.getQrCode(r, o).then(function(e) {
                t.getSharePic(t.params, e);
            }).catch(function(e) {
                console.log(e), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), wx.hideNavigationBarLoading(), 
                t.$toast.show("获取图片信息失败");
            });
        },
        getQrCode: function(t, e) {
            return n.default.log("page：" + t), n.default.log("scene：" + e), this.$root.$mwp("mwp.ad_wxcode.wxcodeGenActionlet", "1", {
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
            var r = this, o = t.topImage, i = t.topBanner, n = t.title, s = t.currency, c = t.nowPrice, l = t.highNowPrice, h = t.oldPrice, p = t.priceTags, u = t.priceSplit, g = this.subString(n || "", 28), $ = {
                topBanner: i,
                nowPrice: c,
                highNowPrice: l,
                topImage: a.default.getGoodsRatioSuffix(o, 750, "3:4", !1),
                title0: g.newStr_0,
                title1: this.subString(g.newStr_1, 25, !0).newStr_0,
                currencyLow: c ? s : "",
                currencyHigh: l ? s : "",
                priceSplit: l ? u : "",
                oldPrice: h ? {
                    svgContent: "" + s + h || "",
                    x: m
                } : "",
                qrcode: e
            }, m = 32;
            return p && p.length > 0 && p.map(function(t, e) {
                $["tag" + e] = {
                    svgContent: t.text,
                    x: m + 11
                }, $["tagBg" + e] = {
                    width: 10 * r.calculateLen(t.text) + 22,
                    x: m
                }, m += 10 * r.calculateLen(t.text) + 22 + 10;
            }), $;
        },
        getSharePic: function(t, e) {
            var r = this, o = this, a = ((t = this.getShareParams(t, e)).topBanner ? this.template.sharePic_act : this.template.sharePic_normal) || this.template.sharePic_default;
            c({
                appKey: "168",
                url: a.url,
                params: t,
                success: function(t) {
                    t ? r.saveImage("" + l + t.path) : o.$root.$wrapper && o.$root.$wrapper.$emit("$toast.show", "图片生成失败");
                },
                error: function(t) {
                    console.log(t), o.$root.$wrapper && o.$root.$wrapper.$emit("$toast.show", "图片生成失败");
                },
                complete: function() {
                    o.$root.$wrapper && o.$root.$wrapper.$emit("$loading.hide");
                }
            });
        },
        saveImage: function(t) {
            var e = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), this.$root.$logE("016000286"), 
            wx.downloadFile({
                url: t,
                success: function(t) {
                    var r = t.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: r,
                        success: function() {
                            n.default.log("文件保存成功"), e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", "图片保存成功，可以分享到朋友圈"), 
                            e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide");
                        },
                        fail: function() {
                            e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", "图片保存失败"), e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide");
                        }
                    }), n.default.log("图片下载成功");
                },
                fail: function() {
                    n.default.log("图片下载失败"), e.$root.$wrapper && e.$root.$wrapper.$emit("$toast.show", "图片下载失败"), 
                    e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide");
                }
            });
        },
        onInnerClick: function() {},
        cancelShare: function() {
            this.$root.$logE("016000285"), this.hideShareDialog();
        },
        shareToFriend: function() {
            this.hideShareDialog();
        },
        shareToMoments: function() {
            this.$root.$logE("016000284"), this.getMomentsPicure(), this.hideShareDialog();
        },
        parseText: function(t) {
            var e = t.split(/\{[^\{\}]*\}/g), r = t.match(/\{[^\{\}]*\}/g) || [], o = [];
            return e.forEach(function(t, e) {
                o.push({
                    text: t
                });
                var a = (r[e] || "").replace(/\{|\}/g, "");
                o.push({
                    text: a,
                    colorFlag: !0
                });
            }), o;
        },
        calculateLen: function(t) {
            var e = /[^\x00-\xff]/g;
            return t.replace(e, "**").length;
        },
        subString: function(t, e, r) {
            for (var o = 0, a = "", i = "", n = /[^\x00-\xff]/g, s = this.calculateLen(t), c = 0; c < s && (null != (i = t.charAt(c).toString()).match(n) ? o += 2 : o++, 
            !(o > e)); c++) a += i;
            return r && s > e && (a += "..."), {
                newStr_0: a || "",
                newStr_1: t.substring(a.length) || ""
            };
        }
    }
};