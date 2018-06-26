Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    format: function(t, e) {
        if (!t) return "";
        var s = new Date(t), a = s.getFullYear(), i = s.getMonth() + 1, p = s.getDate(), d = s.getHours(), r = s.getMinutes(), h = s.getSeconds();
        return "YYYY.MM.DD HH:mm:ss" == e ? a + "." + this.pad(i, 2) + "." + this.pad(p, 2) + " " + this.pad(d, 2) + ":" + this.pad(r, 2) + ":" + this.pad(h, 2) : "YYYY.MM.DD HH:mm" == e ? a + "." + this.pad(i, 2) + "." + this.pad(p, 2) + " " + this.pad(d, 2) + ":" + this.pad(r, 2) : "YYYY.MM.DD" == e ? a + "." + this.pad(i, 2) + "." + this.pad(p, 2) : "MM-DD" == e ? this.pad(i, 2) + "-" + this.pad(p, 2) : "HH:mm" == e ? this.pad(d, 2) + ":" + this.pad(r, 2) : "MM月DD日 HH:mm" == e ? this.pad(i, 2) + "月" + this.pad(p, 2) + "日 " + this.pad(d, 2) + ":" + this.pad(r, 2) : "MM月DD日 HH:mm:ss" == e ? this.pad(i, 2) + "月" + this.pad(p, 2) + "日 " + this.pad(d, 2) + ":" + this.pad(r, 2) + ":" + this.pad(h, 2) : void 0;
    },
    pad: function(t, e) {
        var s = ("" + t).length;
        return Array(e > s ? e - s + 1 : 0).join(0) + t;
    },
    formatTime: function(t) {
        return t < 1e3 ? t + "毫秒" : t < 6e4 ? (t / 1e3).toFixed(2) + "秒" : t < 36e5 ? parseInt(t / 6e4) + "分" + parseInt(t % 6e4 / 1e3) + "秒" : t < 864e5 ? parseInt(t / 36e5) + "时" + parseInt(t % 36e5 / 6e4) + "分" : parseInt(t / 864e5) + "天" + parseInt(t % 864e5 / 36e5) + "时";
    }
};