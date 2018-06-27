App({
    onLaunch: function(a) {
        var o = this;
        this.globalData.backgroundAudioManager.onPlay(function() {}), this.globalData.backgroundAudioManager.onPause(function() {}), 
        this.globalData.backgroundAudioManager.onEnded(function() {
            o.globalData.status = "onEnded";
        }), this.globalData.backgroundAudioManager.onStop(function() {}), this.globalData.backgroundAudioManager.onTimeUpdate(function() {});
    },
    globalData: {
        userInfo: "",
        url: "https://fudai.i-meihao.shop",
        trd_session: "",
        backgroundAudioManager: wx.getBackgroundAudioManager(),
        status: ""
    }
});