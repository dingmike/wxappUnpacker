function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    return {
        modules: [],
        scrollY: !0,
        scrollX: !1,
        scrollBoxHeight: "",
        upperThreshold: 50,
        lowerThreshold: 50,
        scrollWithAnimation: !1,
        enableBackToTop: !1
    };
}

function o(t) {
    return {
        name: "wrapper",
        components: {
            toast: a.default
        },
        pageId: "",
        isCodeB: t.isCodeB,
        moduleInst: {},
        __lastModuleInst: t.lastModuleInst || {},
        lazyDataInst: null,
        __callOnReady: !1,
        __callLazyMotion: function() {
            var t = this;
            setTimeout(function() {
                t.__hasKilled || c.callModInView.call(t);
            }, 1e3);
        },
        __lazyModCache: null,
        __openLazyMod: t.openLazyMod,
        __subMod: t.subMod,
        __callOnFirstPaint: null,
        __scrollPos: 0,
        __hasLogged: {},
        __shareConfig: {},
        __throttleSetDataQueue: [],
        data: function() {
            return e();
        },
        shareInfo: function(t) {
            return this.__shareConfig;
        },
        shareInfoArray: [],
        __throtleTimer: 1e3,
        __throtleSetData: function(t) {
            var e = this;
            return u.default.fn.throttle(function() {
                if (!e.__hasKilled) for (;e.__throttleSetDataQueue.length; ) !function() {
                    var t = e.__throttleSetDataQueue.shift();
                    (Object.keys(t.obj) || []).forEach(function(e) {
                        t.vm[e] = t.obj[e];
                    });
                }();
            }, t);
        },
        __mwpRequests: {},
        __collectMwpRequest: function(t, e, o) {
            var a = t + "_" + e;
            return this.__mwpRequests[a] || (this.__mwpRequests[a] = u.default.MWP.request(t, e, o)), 
            this.__mwpRequests[a];
        },
        __deleteOldChildren: function(t) {
            for (var e in this.__lastModuleInst) {
                var o = this.__lastModuleInst[e].label;
                delete t.$wrapper.data["$" + o];
            }
        },
        methods: {
            setScrollInfo: function(t) {
                if (this.data.isUp && wx.createSelectorQuery && t.scrollIntoView) {
                    var e = wx.createSelectorQuery();
                    e.select("#" + t.scrollIntoView).boundingClientRect(), e.selectViewport().scrollOffset(), 
                    e.exec(function(t) {
                        t && t[0] && t[1] && wx.pageScrollTo({
                            scrollTop: t[0].top + t[1].scrollTop
                        });
                    });
                } else this.data.isUp && void 0 != t.scrollTop && null != t.scrollTop && wx.pageScrollTo && wx.pageScrollTo({
                    scrollTop: t.scrollTop
                });
                this.setData(t);
            },
            setGlobalCssInfo: function(t) {
                this.setData(t);
            },
            setShareInfo: function(t) {
                this.__shareConfig = Object.assign(this.__shareConfig, t);
            },
            setPageInfo: function(t, e, o, a, h, u, d) {
                var f = this;
                if (this.__deleteOldChildren(t), this.throtleSetData = this.__throtleSetData(this.__throtleTimer), 
                e.jumpConfig && e.jumpConfig.url) e.jumpConfig.appId ? this.$root.$launch(e.jumpConfig.url, {
                    appId: e.jumpConfig.appId,
                    fallback: "/pages/home/index"
                }) : this.$root.$redirect(e.jumpConfig.url); else {
                    this.pageId = e.pageId, this.pageVm = t, this.acmInfo = "" + (d && d.acmGmvType || "");
                    var _ = e.moduleList, p = e.tplConfig, m = [], g = (_ || []).filter(function(t) {
                        return !!t.isGlobalModule || 654 == t.systemModuleId;
                    }), I = new r.default({
                        modulesData: function(t) {
                            var e = {};
                            return (t || []).forEach(function(t) {
                                e[t.moduleId] = (0, n.formatModuleConfig)(JSON.parse(JSON.stringify(t.schema))), 
                                e[t.moduleId] && (e[t.moduleId].moduleOriginId = "" + t.systemModuleId);
                            }), e;
                        }(_),
                        moduleIds: (_ || []).filter(function(t) {
                            return !t.isGlobalModule && 654 != t.systemModuleId;
                        }).map(function(t) {
                            return "" + t.moduleId;
                        }),
                        globalSchema: g && g[0] && g[0].schema && g[0].schema.formData || {},
                        mModEnv: "cube"
                    }, function() {
                        f.$broadcast("vx:onGlobal");
                    });
                    if (this.lazyDataInst = new i.default(this), this.setData({
                        isUp: !!a
                    }), e && e.title) {
                        var b = e.title;
                        wx.setNavigationBarTitle({
                            title: b
                        }), this.__shareConfig = {
                            title: e.desc || e.title
                        };
                    }
                    h && wx.hideShareMenu && wx.hideShareMenu();
                    var M = Object.assign({}, s.MOD_MAP, this.__subMod);
                    _.forEach(function(e) {
                        var a = M["" + e.systemModuleId];
                        if ("" + e.systemModuleId == "654" || e.isGlobalModule) {
                            var s = e.schema && e.schema.formData && e.schema.formData.background && e.schema.formData.background[0];
                            f.setGlobalCssInfo(s);
                        }
                        if (a) {
                            var n = new l.default(t, e, a, t.$wrapper, null, {
                                setScrollInfo: function(t) {
                                    f.setScrollInfo(t);
                                },
                                setGlobalCssInfo: function(t) {
                                    f.setGlobalCssInfo(t);
                                },
                                setShareInfo: function(t) {
                                    f.setShareInfo(t);
                                },
                                setOnShare: function(t) {
                                    f.shareInfoArray.push(t);
                                },
                                setGlobal: function(t) {
                                    I.setGlobal(t);
                                },
                                getGlobal: function() {
                                    return I.getGlobal();
                                },
                                showToast: function(t, e, o) {
                                    f.$toast.show(t, e, o);
                                },
                                hideToast: function() {
                                    f.$toast.hide();
                                },
                                triggerLazyMotion: function() {
                                    c.callModInView.call(f), f.lazyDataInst && f.lazyDataInst.send(function() {
                                        f.__callLazyMotion();
                                    });
                                },
                                env: {
                                    M_ENV: o.M_ENV,
                                    PAGE_STAGE: p && p.page_stage,
                                    MOGU_MF_DEVELOP_ENV: o.MOGU_MF_DEVELOP_ENV
                                }
                            });
                            m.push({
                                moduleName: n.label,
                                module: e.systemModuleId,
                                instId: e.moduleId,
                                isShow: !0,
                                modHeight: 0,
                                modWidth: 0
                            }), f.moduleInst["m" + e.moduleId] = n, f.__hasLogged["m" + e.moduleId] = {}, f.lazyDataInst.collect({
                                instId: e.moduleId,
                                inst: n
                            });
                        }
                    }), this.lazyDataInst.prepare(), this.setData({
                        modules: m
                    }, function() {
                        f.__callOnFirstPaint && f.__callOnFirstPaint();
                    }), this.$broadcast("vx:onLoad", u), this.$broadcast("vx:onShow"), (this.__callOnReady || this.isCodeB) && this.$broadcast("vx:onReady"), 
                    this.lazyDataInst.send(function() {
                        f.__callLazyMotion();
                    }), setTimeout(function() {
                        f.__hasKilled || c.callModInView.call(f);
                    }, 1e3);
                }
            },
            onReady: function() {
                this.__callOnReady = !0;
            },
            onUnload: function() {
                for (var t in this.moduleInst) this.moduleInst[t].destroy();
                wx.hideLoading && wx.hideLoading(), this.__hasKilled = !0;
            },
            onPullDownRefresh: function() {
                var t = this;
                if (!this.__hasKilled) if (this.data && "self" === this.data.isUp) this.$broadcast("vx:onPullDownRefresh"); else if (this.data && this.data.isUp) {
                    this.$broadcast("vx:onPullDownRefresh"), this.$broadcast("vx:onUnload"), this.onUnload(), 
                    this.$kill();
                    for (var e = new h.MComponent(o({
                        isCodeB: this.isCodeB,
                        openLazyMod: this.__openLazyMod,
                        subMod: this.__subMod,
                        lastModuleInst: this.moduleInst
                    }), this.pageVm), a = 0; a < this.pageVm.$children.length; a++) this.pageVm.$children[a] && "$wrapper" === this.pageVm.$children[a].name && (this.pageVm.$children[a] = e);
                    this.pageVm.$wrapper = e, this.pageVm.$wrapper.__callOnReady = !0, this.pageVm.$wrapper.__callOnFirstPaint = function() {
                        wx.stopPullDownRefresh(), t.pageVm.$wrapper.__callOnFirstPaint = null;
                    }, this.pageVm.$root && this.pageVm.$root.$wrapper && (this.pageVm.$root.$wrapper = e), 
                    this.pageVm.requestData();
                }
            },
            onReachBottom: function() {
                this.__hasKilled || (this.$broadcast("vx:onReachBottom"), this.$broadcast("vx:lower"));
            },
            onPageScroll: function(t) {
                var e = this;
                this.__hasKilled || (this.$broadcast("vx:onPageScroll", t), this.$broadcast("vx:scroll", {
                    detail: {
                        scrollTop: t.scrollTop
                    }
                }), this.data && this.data.isUp && (this.__scrollPos = t.scrollTop, c.callModInView.call(this), 
                this.lazyDataInst && this.lazyDataInst.send(function() {
                    e.__callLazyMotion();
                })));
            },
            scroll: function(t) {
                var e = this;
                this.__hasKilled || (t && t.target && t.target.id ? this.$broadcast("vx:scroll_" + t.target.id, t) : (this.$broadcast("vx:scroll", t), 
                this.__scrollPos = t.detail.scrollTop, c.callModInView.call(this), this.lazyDataInst && this.lazyDataInst.send(function() {
                    e.__callLazyMotion();
                })));
            },
            upper: function(t) {
                this.__hasKilled || (t && t.target && t.target.id ? this.$broadcast("vx:upper_" + t.target.id, t) : this.$broadcast("vx:upper", t));
            },
            lower: function(t) {
                this.__hasKilled || (t && t.target && t.target.id ? this.$broadcast("vx:lower_" + t.target.id, t) : this.$broadcast("vx:lower", t));
            },
            onShareAppMessage: function(t) {
                if (!this.__hasKilled) {
                    var e = [], o = [], a = [], s = function(t) {
                        return function(e) {
                            t && t.length && t.forEach(function(t) {
                                try {
                                    t(e);
                                } catch (t) {
                                    console.error("share callback error", t);
                                }
                            });
                        };
                    }, l = function(t) {
                        t && (t.success && e.push(t.success), t.fail && o.push(t.fail), t.complete && a.push(t.complete));
                    }, n = this.shareInfo(t);
                    return l(n), this.shareInfoArray && this.shareInfoArray.length && this.shareInfoArray.forEach(function(e) {
                        n = e(t), l(n);
                    }), n = function(t) {
                        return t && (e && e.length && (t.success = s(e)), o && o.length && (t.fail = s(o)), 
                        a && a.length && (t.fail = s(a))), t;
                    }(n);
                }
            }
        }
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = o;

var a = t(require("../../components/toast/index")), s = require("../../cube/modules/index"), l = t(require("../../cube-core/componentClass/index")), n = require("../../cube-core/componentClass/utils/index"), i = t(require("../../cube-core/componentClass/utils/lazyData")), r = t(require("../../cube-core/componentClass/utils/global")), c = require("../../cube-core/componentClass/utils/scrollFunc"), h = require("../../common/base/PageFactory"), u = t(require("../../common/m"));