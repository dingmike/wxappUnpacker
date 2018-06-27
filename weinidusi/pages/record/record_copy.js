var t = getApp(), e = require("../../utils/util.js");

wx.getRecorderManager(), Page({
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
        path: "",
        is_start: -1,
        countDown_i: "",
        onHide: !1
    },
    onLoad: function(t) {
        console.log(t), t.id && this.setData({
            poem_id: t.id
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        this.data.onHide && wx.navigateBack({}), clearInterval(this.data.countDown_i), this.setData({
            stop: !1,
            lock: !1,
            count: 0,
            REC: !1
        }), wx.getSetting({
            success: function(t) {
                t.authSetting.hasOwnProperty("scope.record") && !t.authSetting["scope.record"] && a.checkScope();
            }
        });
        var o = this.getData;
        e.checkSession(o), t.globalData.backgroundAudioManager.stop(), wx.onAccelerometerChange(function(t) {
            (t.x > 1 || t.y > 1) && !a.data.REC && (a.shake(), a.setData({
                stop: !1,
                lock: !1,
                count: 0,
                REC: !1
            }));
        });
    },
    onHide: function() {
        wx.stopAccelerometer(), this.setData({
            onHide: !0
        }), wx.stopRecord(), clearInterval(this.data.countDown_i);
    },
    onUnload: function() {
        wx.stopAccelerometer(), wx.stopRecord(), clearInterval(this.data.countDown_i), this.setData({
            onHide: !0
        });
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
        var e = this;
        if (console.log(this.data.lock), !this.data.lock) {
            var a = Number(t.currentTarget.dataset.status);
            0 == a && this.data.count < 9 && wx.showToast({
                title: "录音时间必须超过十秒哦",
                icon: "none"
            }), 1 == a && (this.setData({
                REC: !0
            }), this.setData({
                countDown_i: this.countDown()
            }), wx.startRecord({
                success: function(t) {
                    clearInterval(e.data.countDown_i), console.log(t.tempFilePath, e.data.count), (!e.data.REC || e.data.count >= 60) && (console.log(111), 
                    e.uploadFile(t.tempFilePath));
                },
                fail: function(t) {
                    e.setData({
                        REC: !1,
                        count: 0
                    }), clearInterval(e.data.countDown_i), wx.getSetting({
                        success: function(t) {
                            t.authSetting.hasOwnProperty("scope.record") && t.authSetting["scope.record"] || e.checkScope();
                        }
                    });
                }
            })), 0 == a && this.data.count > 10 && (this.setData({
                REC: !1
            }), wx.stopRecord(), this.setData({
                stop: !0
            }));
        }
    },
    countDown: function() {
        var t = this;
        return setInterval(function() {
            wx.getSetting({
                success: function(e) {
                    if (console.log(e.authSetting["scope.record"]), e.authSetting.hasOwnProperty("scope.record") && e.authSetting["scope.record"] && e.authSetting["scope.record"] && t.data.REC) {
                        if (t.data.count >= 60 || t.data.stop) return wx.stopRecord(), clearInterval(t.data.countDown_i), 
                        void console.log(t.data.count);
                        t.setData({
                            count: ++t.data.count
                        }), t.data.count < 10 ? t.setData({
                            countDown: "00:0" + t.data.count
                        }) : t.setData({
                            countDown: "00:" + t.data.count
                        });
                    }
                }
            });
        }, 1e3);
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
        var o = this, n = t.globalData.url + "/index.php?m=Mini&c=Poetry&a=poetry_preadd&poetry_id=" + this.data.poem_id, c = {};
        e.request_post(n, c, function(t) {
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
        clearInterval(this.data.countDown_i), this.setData({
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
        });
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