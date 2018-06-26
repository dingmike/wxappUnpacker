Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && Date.format(new Date(1e3 * e), "yyyy-MM-dd hh:mm:ss");
};

exports.default = function(r, a) {
    if (r && r.length > 0) {
        var t = !0, s = !1, d = void 0;
        try {
            for (var i, l = r[Symbol.iterator](); !(t = (i = l.next()).done); t = !0) {
                var o = i.value;
                "其它" === o.expressName && (o.expressNameType = "other"), o.expressId = o.expressId, 
                o.createdTime = e(o.created), o.expressPhone = o.expressPhone;
                var n = o.deliveryNodeDetails;
                o.deliveryNodeDetails = n && n.length > 0 ? n.reverse() : n, o.deliveryNodeDetails && o.deliveryNodeDetails.length > 0 && (o.deliveryNodeDetails[0].nodeTimeString = e(o.deliveryNodeDetails[0].nodeTime));
            }
        } catch (e) {
            s = !0, d = e;
        } finally {
            try {
                !t && l.return && l.return();
            } finally {
                if (s) throw d;
            }
        }
    }
    var v = null;
    return a && (v = {
        mobile: Number(a.mobile),
        realName: a.realName,
        address: "" + a.province + a.city + a.area + a.address
    }), {
        packageTrackInfos: r,
        receiverAddressInfo: v
    };
};