function a(a) {
    for (var b = {}, c = a.split(","), d = 0; d < c.length; d++) b[c[d]] = !0;
    return b;
}

function b(a) {
    return a.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
}

function c(b) {
    var c = [];
    if (0 == d.length || !g) {
        var e = {};
        return e.node = "text", e.text = b, j = [ e ];
    }
    b = b.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var h = /[:]/, j = b.split(h), a = 0; a < j.length; a++) {
        var k = j[a], e = {};
        g[k] ? (e.node = "element", e.tag = "emoji", e.text = g[k], e.baseSrc = f) : (e.node = "text", 
        e.text = k), c.push(e);
    }
    return c;
}

var d = "", f = "", g = {}, h = require("./wxDiscode.js"), i = require("./htmlparser.js"), e = a("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), j = a("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), k = a("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), q = a("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), l = a("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), m = a("wxxxcode-style,script,style,view,scroll-view,block");

module.exports = {
    html2json: function(a, d) {
        a = b(a), a = h.strDiscode(a);
        var f = [], g = {
            node: d,
            nodes: [],
            images: [],
            imageUrls: []
        };
        return i(a, {
            start: function(b, r, a) {
                var o = {
                    node: "element",
                    tag: b
                };
                if (j[b] ? o.tagType = "block" : k[b] ? o.tagType = "inline" : q[b] && (o.tagType = "closeSelf"), 
                0 !== r.length && (o.attr = r.reduce(function(a, b) {
                    var c = b.name, d = b.value;
                    return "class" == c && (o.classStr = d), "style" == c && (o.styleStr = d), d.match(/ /) && (d = d.split(" ")), 
                    a[c] ? Array.isArray(a[c]) ? a[c].push(d) : a[c] = [ a[c], d ] : a[c] = d, a;
                }, {})), "img" === o.tag) {
                    o.imgIndex = g.images.length;
                    var i = o.attr.src;
                    i = h.urlToHttpUrl(i, "https"), o.attr.src = i, o.from = d, g.images.push(o), g.imageUrls.push(i);
                }
                if ("font" === o.tag) {
                    var n = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], l = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    for (var c in o.attr.style || (o.attr.style = []), o.styleStr || (o.styleStr = ""), 
                    l) if (o.attr[c]) {
                        var m = "size" === c ? n[o.attr[c] - 1] : o.attr[c];
                        o.attr.style.push(l[c]), o.attr.style.push(m), o.styleStr += l[c] + ": " + m + ";";
                    }
                }
                if ("source" === o.tag && (g.source = o.attr.src), a) {
                    var s = f[0] || g;
                    void 0 === s.nodes && (s.nodes = []), s.nodes.push(o);
                } else f.unshift(o);
            },
            end: function(b) {
                var c = f.shift();
                if (c.tag !== b && console.error("invalid state: mismatch end tag"), "video" === c.tag && g.source && (c.attr.src = g.source, 
                delete result.source), 0 === f.length) g.nodes.push(c); else {
                    var d = f[0];
                    void 0 === d.nodes && (d.nodes = []), d.nodes.push(c);
                }
            },
            chars: function(b) {
                var d = {
                    node: "text",
                    text: b,
                    textArray: c(b)
                };
                if (0 === f.length) g.nodes.push(d); else {
                    var h = f[0];
                    void 0 === h.nodes && (h.nodes = []), h.nodes.push(d);
                }
            },
            comment: function() {}
        }), g;
    },
    emojisInit: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", c = arguments[2];
        d = a, f = b, g = c;
    }
};