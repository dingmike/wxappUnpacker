getApp();

Page({
    data: {
        pic: ""
    },
    onLoad: function(o) {
        wx.showLoading({
            title: "生成中"
        }), o.id && o.uid && this.setData({
            pic: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=img&id=" + o.id + "&uid=" + o.uid
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    loadingCompleted: function() {
        wx.hideLoading();
    },
    download: function() {
        console.log("图片地址为：" + this.data.pic), wx.showLoading({
            title: "保存中"
        }), wx.downloadFile({
            url: this.data.pic,
            success: function(o) {
                wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function() {
                        wx.showToast({
                            title: "保存到相册成功"
                        });
                    },
                    fail: function() {
                        console.log(o), wx.showToast({
                            title: "保存到相册失败",
                            image: "https://fanscard.oss-cn-hangzhou.aliyuncs.com/mini/img/fail.png"
                        });
                    }
                });
            },
            fail: function(o) {
                console.log(o), wx.showToast({
                    title: "保存失败",
                    image: "https://fanscard.oss-cn-hangzhou.aliyuncs.com/mini/img/fail.png"
                });
            }
        });
    }
});