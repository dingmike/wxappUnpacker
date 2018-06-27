var t = getApp(), e = require("../../utils/util.js"), a = wx.getRecorderManager();

Page({
    data: {
        REC: !1,
        countDown: "00:00",
        poem: "",
        uid: "",
        share: "",
        poem_id: "",
        count: "",
        stop: "",
        lock: "",
        checkScope: "",
        recorderManager: "",
        setInterval: ""
    },
    onLoad: function(t) {
        t.id && this.setData({
            poem_id: t.id
        });
        var a = this.getData;
        e.checkSession(a);
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        this.setData({
            checkScope: !1
        }), wx.getSetting({
            success: function(t) {
                t.authSetting.hasOwnProperty("scope.record") && !t.authSetting["scope.record"] && e.checkScope();
            }
        }), this.setData({
            stop: !1,
            lock: !1,
            count: 0
        }), t.globalData.backgroundAudioManager.stop(), wx.onAccelerometerChange(function(t) {
            (t.x > 1 || t.y > 1) && e.shake();
        }), a.onError(function(t) {
            console.log(t), clearInterval(e.data.setInterval), e.setData({
                REC: !1,
                count: 0
            }), wx.getSetting({
                success: function(t) {
                    t.authSetting.hasOwnProperty("scope.record") && t.authSetting["scope.record"] || e.checkScope();
                }
            });
        }), a.onStart(function() {
            console.log("录音开始"), e.setData({
                setInterval: e.countDown()
            });
        }), a.onStop(function(t) {
            clearInterval(e.data.setInterval), e.setData({
                count: 0
            }), e.uploadFile(t.tempFilePath);
        });
    },
    onHide: function() {
        a.stop(), wx.stopAccelerometer();
    },
    onUnload: function() {
        a.stop(), wx.stopAccelerometer();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.share.share_title,
            imageUrl: this.data.share.share_img,
            path: "pages/index/index?uid=" + this.data.uid
        };
    },
    record: function(t) {
        if (!this.data.lock) {
            var e = Number(t.currentTarget.dataset.status);
            0 == e && this.data.count < 9 ? wx.showToast({
                title: "录音时间必须超过十秒哦",
                icon: "none"
            }) : (1 == e && (this.setData({
                REC: !0
            }), a.start({
                format: "mp3",
                duration: 12e4
            })), 0 == e && this.data.count > 10 && (this.setData({
                REC: !1
            }), a.stop(), this.setData({
                stop: !0
            })));
        }
    },
    countDown: function() {
        var t = this, e = setInterval(function() {
            if (t.data.count >= 120 || t.data.stop) return clearInterval(e), void a.stop();
            t.setData({
                count: ++t.data.count
            }), t.data.count < 10 ? t.setData({
                countDown: "00:0" + t.data.count
            }) : t.setData({
                countDown: "00:" + t.data.count
            });
        }, 1e3);
        return e;
    },
    shake: function() {
        var t = this;
        this.data.lock || (this.setData({
            lock: !0
        }), wx.vibrateLong(), setTimeout(function() {
            t.setData({
                lock: !1
            });
        }, 2e3), this.setData({
            poem_id: ""
        }), this.getData());
    },
    getData: function(a) {
        var o = this, n = t.globalData.url + "/index.php?m=Mini&c=Poetry&a=poetry_preadd&poetry_id=" + this.data.poem_id, i = {};
        e.request_post(n, i, function(t) {
            o.setData({
                uid: t.data.uid,
                share: t.data.share,
                poem: t.data.poetry,
                poem_id: t.data.poetry.id
            });
        }, 0);
    },
    navigateTo: function(t) {
        e.navigateTo(t);
    },
    uploadFile: function(e) {
        var a = this;
        this.data.REC || (this.setData({
            lock: !0
        }), wx.uploadFile({
            url: "https://ydn.fudai.wuhouweixin.com/index.php?m=Mini&c=Poetry&a=upload",
            filePath: e,
            name: "file",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
                cookie: "loginSession=" + t.globalData.trd_session
            },
            success: function(t) {
                wx.hideLoading(), wx.redirectTo({
                    url: "../addBgm/addBgm?id=" + a.data.poem_id
                });
            }
        }).onProgressUpdate(function(t) {
            wx.showLoading({
                title: "上传中 " + t.progress + "%"
            });
        }));
    },
    checkScope: function() {
        var t = this;
        this.data.checkScope || (this.setData({
            checkScope: !0
        }), wx.showModal({
            title: "温馨提示",
            content: "由于您未授权语音权限，录音失败",
            showCancel: !1,
            cancelText: "前往授权",
            success: function() {
                wx.openSetting({
                    success: function(e) {
                        e.authSetting["scope.record"] || t.checkScope();
                    }
                });
            }
        }));
    }
});