Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}(require("../../../common/m.js")), i = {
    name: "vx_pit_signIn",
    components: {},
    data: function() {
        return {
            isSignIn: !1,
            configData: this.config,
            signInAppId: this.config.signInLaunch[0].isNeedLaunch && this.config.signInLaunch[0].appId ? this.config.signInLaunch[0].appId : "",
            unSignInAppId: this.config.unSignInLaunch[0].isNeedLaunch && this.config.unSignInLaunch[0].appId ? this.config.unSignInLaunch[0].appId : "",
            signInXcxHref: this.config.signInLaunch[0].isNeedLaunch && this.config.signInLaunch[0].appId ? this.config.signInLaunch[0].link_wxa : this.config.signInContent[0].link,
            unSignInXcxHref: this.config.unSignInLaunch[0].isNeedLaunch && this.config.unSignInLaunch[0].appId ? this.config.unSignInLaunch[0].link_wxa : this.config.unSignInContent[0].link,
            signInBoxStyle: this.transformStyleCode({
                marginTop: this.config.box[0].marginTop / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem",
                backgroundColor: this.config.box[0].bgColor,
                backgroundImage: "url(" + (this.config.signInStyle[0].bgImage || this.config.signInStyle[0].bgImageBak) + ")",
                paddingTop: this.config.signInStyle[0].paddingTop / 100 + "rem",
                paddingBottom: this.config.signInStyle[0].paddingBottom / 100 + "rem"
            }),
            unSignInBoxStyle: this.transformStyleCode({
                marginTop: this.config.box[0].marginTop / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem",
                backgroundColor: this.config.box[0].bgColor,
                backgroundImage: "url(" + (this.config.unSignInStyle[0].bgImage || this.config.unSignInStyle[0].bgImageBak) + ")",
                paddingTop: this.config.unSignInStyle[0].paddingTop / 100 + "rem",
                paddingBottom: this.config.unSignInStyle[0].paddingBottom / 100 + "rem"
            }),
            signInTitleStyle: this.transformStyleCode({
                color: this.config.signInStyle[0].titleColor
            }),
            unSignInTitleStyle: this.transformStyleCode({
                color: this.config.unSignInStyle[0].titleColor
            }),
            signInBtnStyle: this.transformStyleCode({
                backgroundColor: this.config.signInStyle[0].btnBgColor,
                color: this.config.signInStyle[0].btnTextColor,
                borderColor: this.config.signInStyle[0].btnBorderColor
            }),
            unSignInBtnStyle: this.transformStyleCode({
                backgroundColor: this.config.unSignInStyle[0].btnBgColor,
                color: this.config.unSignInStyle[0].btnTextColor,
                borderColor: this.config.unSignInStyle[0].btnBorderColor
            })
        };
    },
    mounted: function() {},
    updated: function() {
        this.triggerLazyMotion();
    },
    methods: {
        onShow: function() {
            this._getSignStatus();
        },
        _getSignStatus: function() {
            var i = this;
            n.default.MWP.request("mwp.mogucheckin.showCheckInBtn", "1.0", {
                businessKey: "MOGUJIE_CHECKIN_REDPACKAGE"
            }).then(function(n) {
                i.isSignIn = !!n && !n.data;
            }).catch(function() {
                i.isSignIn = !1;
            });
        }
    }
};

exports.default = {
    componentOptions: i,
    renderComponentsFunc: function(n) {}
};