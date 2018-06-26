Object.defineProperty(exports, "__esModule", {
    value: !0
});

var x = wx.getSystemInfoSync(), e = x.pixelRatio;

(!e || e < 1) && (e = 1), e > 2.5 && (e = 2.5);

var t = {
    imgKeyArr: [ "80", "100", "160", "180", "200", "240", "280", "300", "320", "360", "400", "440", "480", "520", "540", "560", "600", "640" ],
    imgKeyMap: {
        80: {
            "1:1": "80x80",
            "7:9": "80x103",
            "3:4": "80x107",
            "2:3": "80x120",
            999: "80x999"
        },
        100: {
            "1:1": "100x100",
            "7:9": "100x129",
            "3:4": "100x134",
            "2:3": "100x150",
            999: "100x999"
        },
        160: {
            "1:1": "160x160",
            "7:9": "160x206",
            "3:4": "160x214",
            "2:3": "160x240",
            999: "160x999"
        },
        180: {
            "1:1": "180x180",
            "7:9": "180x232",
            "3:4": "180x240",
            "2:3": "180x270",
            999: "180x999"
        },
        200: {
            "1:1": "200x200",
            "7:9": "200x258",
            "3:4": "200x268",
            "2:3": "200x300",
            999: "200x999"
        },
        240: {
            "1:1": "240x240",
            "7:9": "240x308",
            "3:4": "240x320",
            "2:3": "240x360",
            999: "240x999"
        },
        280: {
            "1:1": "280x280",
            "7:9": "280x360",
            "3:4": "280x374",
            "2:3": "280x420",
            999: "280x999"
        },
        300: {
            "1:1": "300x300",
            "7:9": "300x386",
            "3:4": "300x400",
            "2:3": "300x450",
            999: "300x999"
        },
        320: {
            "1:1": "320x320",
            "7:9": "320x412",
            "3:4": "320x428",
            "2:3": "320x480",
            999: "320x999"
        },
        360: {
            "1:1": "360x360",
            "7:9": "360x463",
            "3:4": "360x480",
            "2:3": "360x540",
            999: "360x999"
        },
        400: {
            "1:1": "400x400",
            "7:9": "400x515",
            "3:4": "400x534",
            "2:3": "400x600",
            999: "400x999"
        },
        440: {
            "1:1": "440x440",
            "7:9": "440x566",
            "3:4": "440x587",
            "2:3": "440x660",
            999: "440x999"
        },
        480: {
            "1:1": "480x480",
            "7:9": "480x618",
            "3:4": "480x640",
            "2:3": "480x720",
            999: "480x999"
        },
        520: {
            "1:1": "520x520",
            "7:9": "520x670",
            "3:4": "520x694",
            "2:3": "520x780",
            999: "520x999"
        },
        540: {
            "1:1": "540x540",
            "7:9": "540x695",
            "3:4": "540x720",
            "2:3": "540x810",
            999: "540x999"
        },
        560: {
            "1:1": "560x560",
            "7:9": "560x720",
            "3:4": "560x747",
            "2:3": "560x840",
            999: "560x999"
        },
        600: {
            "1:1": "600x600",
            "7:9": "600x772",
            "3:4": "600x800",
            "2:3": "600x900",
            999: "600x999"
        },
        640: {
            "1:1": "640x640",
            "7:9": "640x824",
            "3:4": "640x854",
            "2:3": "640x960",
            999: "640x999"
        }
    },
    imgQuality: 70,
    dprDefMaxWidth: 640,
    dprDefRatio: "999",
    defCode: "999x999.v1c0",
    clientHeight: x.windowHeight,
    clientWidth: x.windowWidth,
    dpr: e,
    dprClentWidth: x.windowWidth * e || 750,
    webpSupport: "android" == x.platform || "devtools" == x.platform,
    getDefSuffix: function(x) {
        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return this.getWidthSuffix(x, 750, e);
    },
    getNoResizeSuffix: function(x) {
        !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return this.getCodeSuffix(x, this.defCode);
    },
    getWidthSuffix: function(x, e) {
        var t = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], n = this.defCode, r = e / 750 * this.clientWidth, d = i ? this.dpr : 1, f = parseInt(r) * d;
        return f && f > 0 && f < 1950 && (f += 50, n = 100 * Math.ceil(f / 100) + "x9999.v1c7E"), 
        this.getCodeSuffix(x, n, t);
    },
    getGoodsRatioSuffix: function(x, e, t) {
        var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], n = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], r = e / 750 * this.clientWidth, d = this.defCode, f = "", o = ".v1cAC", h = n ? this.dpr : 1;
        switch (t) {
          case "1:1":
          case "7:9":
          case "3:4":
          case "2:3":
            f = t;
            break;

          default:
            f = this.dprDefRatio, o = ".v1c96";
        }
        var g = parseInt(r) * h;
        (!g || g < 0 || g > this.dprDefMaxWidth) && (g = this.dprDefMaxWidth);
        var a = !0, p = !1, l = void 0;
        try {
            for (var s, u = this.imgKeyArr[Symbol.iterator](); !(a = (s = u.next()).done); a = !0) {
                var v = s.value;
                if (g <= v || v == this.dprDefMaxWidth) {
                    d = this.imgKeyMap[v][f] + o;
                    break;
                }
            }
        } catch (x) {
            p = !0, l = x;
        } finally {
            try {
                !a && u.return && u.return();
            } finally {
                if (p) throw l;
            }
        }
        return this.getCodeSuffix(x, d, i, "pngAdd");
    },
    getCodeSuffix: function(x, e) {
        var t = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "def", n = x;
        if (!x || !e || "no" == e || x.indexOf(".webp") > 0 || x.indexOf(".gif") > 0) return x;
        if (-1 === x.indexOf("mogucdn")) return x;
        if (x.indexOf(".jpg") < 0 && x.indexOf(".png") < 0) return x;
        if (x.indexOf(".jpg") > 0 && x.indexOf(".png") > 0) return x;
        var r = "", d = x.split(".");
        if ("jpg" == d[d.length - 1]) r = "jpg"; else {
            if ("png" != d[d.length - 1]) return x;
            r = "png";
        }
        e = "_" + e;
        var f = "." + this.imgQuality + ".";
        if (x.indexOf(".png_") < 0 && x.indexOf(".jpg_") < 0 && x.indexOf("." + r) == x.length - 4 && (x = x + e + f + r), 
        this.webpSupport && !1 !== t) {
            if (x.indexOf("." + r + "_") > 0) {
                var o = x.split(".");
                o[o.length - 1] == r && (o[o.length - 1] = "webp", x = o.join("."));
            }
        } else if ("png" == r && "pngAdd" != i) return n;
        return x;
    }
};

exports.default = t;