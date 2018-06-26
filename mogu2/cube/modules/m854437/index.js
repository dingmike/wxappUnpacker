Object.defineProperty(exports, "__esModule", {
    value: !0
});

!function(t) {
    t && t.__esModule;
}(require("../../../common/m.js"));

var t = {
    name: "vx_navigation_changeTab",
    components: {},
    _alwaysShow: !0,
    data: function() {
        var t = this.config.length[0].minCount, o = this.config.length[0].maxCount, i = t && t > 0 ? t : 1, e = o && o >= i ? o : i, n = this.config.nav[0].alwaysShow;
        return {
            isShow: n,
            pid: "",
            list: [],
            scrollLeft: 0,
            activeIndex: 0,
            configData: this.config,
            minCount: i,
            maxCount: e,
            boxStyle: this.transformStyleCode({
                height: n ? this.config.box[0].height / 100 + "rem" : 0
            }),
            fixedStyle: this.transformStyleCode({
                height: this.config.box[0].height / 100 + "rem",
                top: this.config.nav[0].top / 100 + "rem",
                backgroundColor: this.config.box[0].bgColor,
                backgroundImage: "url(" + (this.config.box[0].bgImage || this.config.box[0].bgImageBak) + ")"
            }),
            borderStyle: this.transformStyleCode({
                backgroundColor: this.config.box[0].borderColor
            }),
            scrollViewStyle: this.transformStyleCode({}),
            listStyle: this.transformStyleCode({
                height: this.config.box[0].height / 100 + "rem"
            }),
            itemStyle: this.transformStyleCode({
                paddingLeft: this.config.item[0].paddingLeft / 100 + "rem",
                paddingRight: this.config.item[0].paddingRight / 100 + "rem"
            }),
            titleStyle: this.transformStyleCode({
                lineHeight: this.config.box[0].height / 100 + "rem",
                color: this.config.item[0].color,
                borderBottomColor: "rgba(0, 0, 0, 0)"
            }),
            titleHoverStyle: this.transformStyleCode({
                lineHeight: this.config.box[0].height / 100 + "rem",
                color: this.config.item[0].hoverColor,
                borderBottomColor: this.config.item[0].hoverBorderColor,
                backgroundImage: "url(" + (this.config.item[0].hoverBgImage || this.config.item[0].hoverBgImageBak) + ")"
            })
        };
    },
    mounted: function() {
        this._lazyData();
    },
    methods: {
        scroll: function(t) {
            var o = t && t.detail && t.detail.scrollTop || 0, i = this.config.box[0].height || 80, e = this.config.nav[0].showTop >= i ? this.config.nav[0].showTop : i;
            this.config.nav[0].alwaysShow || (this.isShow = o >= e);
        },
        _lazyData: function() {
            var t = this;
            this.$on("__lazy-data__", function(o, i) {
                var e = (o || []).slice(0, t.maxCount);
                e.map(function(t, o) {
                    t.itemStr = JSON.stringify(t);
                }), t.pid = i, t.list = e, t.setGlobal({
                    __tab_click_index__: "0",
                    __tab_click_options__: t.list[0],
                    __tab_click_pid__: i
                });
            });
        },
        _tapHandler: function(t) {
            var o = t.currentTarget.dataset || {}, i = t.currentTarget.offsetLeft || 0, e = (o.index || 0).toString(), n = JSON.parse(o.item || ""), r = o.pid || "";
            this.setGlobal({
                __tab_click_index__: e,
                __tab_click_options__: n,
                __tab_click_pid__: r
            }), this.activeIndex = parseInt(e);
            var a = n.title, s = n.fcid, l = n.cKey;
            console.log("000000001", s, l, a), this.$root.$logE("000000001", {
                fcid: s,
                cKey: l,
                tabName: a
            });
            var h = i - 80;
            this.scrollLeft = h, console.log("MCUBE_MOD_ID_854437_setGlobal:", this.getGlobal());
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};