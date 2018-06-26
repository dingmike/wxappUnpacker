function t(t) {
    for (var s = 0; s < e.length; s++) {
        var a = e[s];
        if (a._task && a._task.id === t) return e.splice(s, 1);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = [], s = 10, a = 0, n = 0, r = {
    setMaxRequest: function(t) {
        s = t;
    },
    sendRequest: function(r) {
        return r._task = {
            id: n++,
            task: null,
            abort: function() {
                this.task ? this.task.abort() : t(this.id);
            }
        }, a < s ? r._task.task = this._sendRequestInternal(r) : e.push(r), r._task;
    },
    _sendRequestInternal: function(t) {
        var s = this;
        return a++, wx.request({
            url: t.url,
            data: t.data,
            header: t.header,
            method: t.method,
            dataType: t.dataType,
            success: function(e) {
                t.success && t.success(e);
            },
            fail: function(e) {
                /fail abort/gi.test(e.errMsg) || t.fail && t.fail(e);
            },
            complete: function(n) {
                a--, t.complete && t.complete(n);
                var r = e.shift();
                r && (r._task.task = s._sendRequestInternal(r));
            }
        });
    }
};

exports.requestManager = r, exports.default = r;