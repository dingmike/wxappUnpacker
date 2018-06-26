function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../common/m")), i = t(require("../../../common/utils/pageutil")), a = t(require("../../../common/utils/imgUrlTool")), s = t(require("../../../common/service/user")), o = t(require("../../../components/loading/index")), n = t(require("../../../components/toast/index")), h = t(require("../../../components/mask/index")), r = t(require("../../../components/error/index")), d = t(require("../components/video/index")), c = t(require("./components")), u = t(require("../config")), l = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../components/base/index")), m = l.fn.getFullUrl, f = l.PageStatus, p = l.responseSuccessHandle, g = l.responseErrorhandle, $ = e.default.MWP, I = e.default.fn, v = I.sendMsg, b = I.omit, w = {
    loading: o.default,
    toast: n.default,
    mask: h.default,
    errorPage: r.default,
    video: d.default
};

exports.default = {
    components: w,
    onLoad: function() {
        var t = this;
        this.$loading.show(), wx.showNavigationBarLoading(), this.setWindowHeight(), this.optionsReady = this.$root.$getOptions().then(function(e) {
            t.options = e || {}, t.itemId = e.itemId || "", t.activityId = e.activityId || "", 
            t.ptp = e.ptp || "", t.cparam = e.cparam || "", t.acm = e.acm || "", t._mgjuuid = e._mgjuuid || "", 
            t.noPintuan = e.noPintuan || !1, t.pageName = e.pageName || t.pageName, t.backUrl = e.backUrl || "", 
            console.log("options: ", e);
        }), this.initComponentAction();
    },
    onReady: function() {
        var t = this;
        this.optionsReady.then(function() {
            t.getPageInfo();
        });
    },
    setWindowHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.windowHeight = e.windowHeight, t.setData({
                    windowHeight: e.windowHeight + "px"
                });
            },
            fail: function(t) {
                console.log(t), v(t, {
                    _author: "changsheng",
                    threshold: 1
                });
            }
        });
    },
    initComponentAction: function() {
        this.$on("$mask.show", this.$mask.show.bind(this.$mask)), this.$on("$mask.hide", this.$mask.hide.bind(this.$mask)), 
        this.$on("$mask.showWithoutAnimation", this.$mask.showWithoutAnimation.bind(this.$mask)), 
        this.$on("$mask.forceHide", this.$mask.forceHide.bind(this.$mask)), this.$on("$loading.show", this.$loading.show.bind(this.$loading)), 
        this.$on("$loading.hide", this.$loading.hide.bind(this.$loading)), this.$on("$toast.show", this.$toast.show.bind(this.$toast)), 
        this.$on("$toast.hide", this.$toast.hide.bind(this.$toast)), this.$on("pageRefresh", this.getPageInfo.bind(this));
    },
    setPageConfig: function(t) {
        var e = t.pageName, i = t.path, a = t.prefix, s = t.getExtraItemDataFunc, o = t.dataProcess, n = t.beforeModuleRenderFunc, h = t.afterModuleRenderFunc;
        this.pageName = e, this.path = i, this.prefix = a, this.getExtraItemDataFunc = s, 
        this.dataProcess = o || this.defaultDataProcess, this.beforeModuleRenderFunc = n, 
        this.afterModuleRenderFunc = h;
    },
    getPageInfo: function(t) {
        var e = this;
        this.loadSuccessFunc = t, this.$loading.show(), wx.showNavigationBarLoading();
        var a = this.pageName, s = this.prefix, o = this.path;
        i.default.getPageInfo(s, a, o).then(function(t) {
            e.setPageInfo(t);
        }).catch(function(t) {
            e.$loading.hide(), e.$errorPage.init({
                type: "REQUEST_ERROR",
                callback: e.getPageInfo.bind(e),
                title: $.getGlobalEnv() === $.Env.Release ? "" : t.toString()
            }), console.log(t), v(t, {
                _author: "changsheng",
                threshold: "1"
            });
        });
    },
    setPageInfo: function(t) {
        this.pageInfo = t, this.moduleList = t.moduleList, this.pageGlobalModule = this.moduleList[this.moduleList.length - 1], 
        this.moduleList = this.moduleList.slice(0, -1), this.setPageGlobalInfo(this.pageGlobalModule), 
        this.setComponent(this.moduleList), this.getItemData(this.itemId, this.activityId);
    },
    setPageGlobalInfo: function(t) {
        var e = t.schema.formData || {}, i = e.dataApi, a = e.globalStyle;
        this.dataApi = i && i.length > 0 && i[0] || {}, this.globalStyle = a && a.length > 0 && a[0] || {};
    },
    setComponent: function(t) {
        var e = this, i = {};
        t.forEach(function(t) {
            var a = new RegExp("^" + e.prefix + "_"), s = t.moduleKey.replace(a, ""), o = "m" + t.moduleId;
            c.default[s] && (i[o] = c.default[s]);
        }), this.addChildren(i);
    },
    addChildren: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = this.constructor.getComponentClass(), a = [], s = [];
        Object.keys(e).forEach(function(o) {
            var n = t.$children.findIndex(function(t) {
                return t.name === "$" + o;
            });
            if (n < 0) {
                var h = Object.assign({}, e[o], {
                    name: o
                }), r = new i(h, t);
                t.$children.push(r), a.push(r), s.push(r);
            } else a.push(t.$children[n]);
        }), this.$moduleChildren = a, this.$newModuleChildren = s, this.broadcast("wx:onLoad", this.options), 
        this.broadcast("wx:onShow"), this.broadcast("wx:onReady");
    },
    broadcast: function() {
        for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        for (var a = 0, s = this.$newModuleChildren.length; a < s; a++) {
            var o = this.$newModuleChildren[a];
            o.$broadcast.apply(o, e);
        }
    },
    collectMcePIds: function(t, e) {
        var i = this;
        t.forEach(function(t) {
            var a = t.pid, s = t.alias;
            a && i.collectMcePId(a, e, s);
        });
    },
    collectMcePId: function(t, e, i) {
        this.pidMaps = this.pidMaps || {}, this.pidMaps[t] = this.pidMaps[t] || [], this.pidMaps[t].push({
            componentName: e,
            alias: i
        });
    },
    getItemData: function(t, i) {
        this.$loading.show(), wx.showNavigationBarLoading();
        var a = [ this.getItemDataFunc(t, i) ];
        this.getExtraItemDataFunc && a.push(this.getExtraItemDataFunc(t, i)), e.default.Promise.all(a).then(this.dataProcess).then(p.bind(this, {
            success: this.setItemData,
            itemId: t
        })).catch(g.bind(this, {
            itemId: t
        }));
    },
    getItemDataFunc: function(t, e) {
        var i = this.dataApi, a = i.api, s = i.version, o = i.template, n = u.default[this.pageName] || {}, h = u.default.common.extraParams || {}, r = n.extraParams || {};
        return this.$root.$mwp(a, s, Object.assign({
            template: o,
            iid: t,
            activityId: e,
            fastbuyId: e
        }, this.noPintuan ? {
            noPintuan: this.noPintuan
        } : {}, h, r)).then($.filterResult);
    },
    defaultDataProcess: function(t) {
        return t[0];
    },
    setItemData: function(t) {
        var e = this;
        this.itemData = t, this.beforeModuleRenderFunc && this.beforeModuleRenderFunc(t, this.options) || (this.moduleList.every(function(i) {
            var a = i && i.schema && i.schema.formData || {}, s = a.moduleParams || [], o = a.mcePIds || [], n = b(a, "moduleParams", "mcePIds"), h = new RegExp("^" + e.prefix + "_"), r = i.moduleKey.replace(h, ""), d = "m" + i.moduleId;
            i.moduleKey = r, i.componentName = d, e.collectMcePIds(o, d);
            var c = {};
            return s.forEach(function(e) {
                var i = e.paramName, a = e.dataKey;
                c[i] = a && t[a] || t[i];
            }), !(e["$" + d] && e["$" + d].init && e["$" + d].init(c, e.options, n));
        }), this.getMceData(), "function" == typeof this.loadSuccessFunc && this.loadSuccessFunc(), 
        this.setData({
            moduleList: this.moduleList,
            pageStatus: f.REQUEST_SUCCESS
        }), this.afterModuleRenderFunc && this.afterModuleRenderFunc(t, this.options));
    },
    getMceData: function() {
        var t = this, e = this.pidMaps || {}, i = Object.keys(e).join(",");
        this.$root.$mce_multiget({
            pids: i
        }).then(function(e) {
            t.setComponentMceData(e);
        }).catch(function(t) {
            console.log(t), v(t, {
                _author: "changsheng",
                threshold: 1
            });
        });
    },
    setComponentMceData: function(t) {
        var e = this, i = this.pidMaps || {}, a = {};
        Object.keys(i).forEach(function(e) {
            i[e].forEach(function(i) {
                var s = i.componentName, o = i.alias || "default";
                a[s] = a[s] || {}, a[s][o] = t[e];
            });
        }), Object.keys(a).forEach(function(t) {
            e["$" + t] && e["$" + t].initMceData && e["$" + t].initMceData(a[t] || {});
        });
    },
    getShareAppMessage: function() {
        var t = this, e = this.itemData || {}, i = e.pintuanInfo, o = e.topImages, n = e.shareInfo, h = i && i.activityId || this.activityId, r = this.shareImageUrl || o && o.length > 0 && a.default.getGoodsRatioSuffix(o[0], 400, "1:1"), d = Object.assign({
            businessId: h
        }, b(this.options, "liveParams", "backUrl")), c = n && n.isNeedShareIntegral, u = s.default.uid;
        return {
            title: this.shareTitle,
            path: m(this.$root.route, d),
            imageUrl: r,
            eventParams: {
                businessId: h,
                status: c ? 0 : 1
            },
            success: function() {
                c && u && t.$root.$mwp("mwp.score.shareScoreDaily", "1.0", {
                    itemId: t.itemId
                }).then($.filterResult).then(function(e) {
                    e && e.ret && e.showText && t.$toast.show(e.showText);
                });
            }
        };
    },
    methods: {
        scrollHandler: function() {
            this.$root.$expose && this.$root.$expose();
        }
    }
};