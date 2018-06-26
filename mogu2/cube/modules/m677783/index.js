Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/m.js")), o = {
    name: "vx_tools_myBackTop",
    _alwaysShow: !0,
    data: function() {
        return {
            isShow: !this.config.setting[0].topNum,
            setting: this.config.setting,
            showImg: this.config.setting[0].showImg || "https://s10.mogucdn.com/p1/160527/upload_ie4doyjzmvsdsn3dhazdambqgiyde_86x86.png"
        };
    },
    methods: {
        scroll: function(o) {
            this.scrollTop = o.detail.scrollTop, this.throttleScroll || (this.throttleScroll = t.default.fn.throttle(this.show.bind(this), 10)), 
            this.throttleScroll();
        },
        show: function() {
            var t = this.setting[0].topNum;
            t ? this.scrollTop > t ? this.isShow = !0 : this.isShow = !1 : this.isShow = !0;
        },
        handleClick: function(t) {
            wx.isH5 ? wx.pageScrollTo({
                scrollTop: 0
            }) : this.setScrollInfo({
                scrollTop: 0
            });
        }
    }
};

exports.default = {
    componentOptions: o,
    renderComponentsFunc: function(t) {}
};