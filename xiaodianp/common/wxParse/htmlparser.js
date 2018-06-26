function a(b) {
    for (var c = {}, d = b.split(","), a = 0; a < d.length; a++) c[d[a]] = !0;
    return c;
}

var b = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, d = /^<\/([-A-Za-z0-9_]+)[^>]*>/, c = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, f = a("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), g = a("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), e = a("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), h = a("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), j = a("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), k = a("wxxxcode-style,script,style,view,scroll-view,block");

module.exports = function(m, p) {
    function q(b, d, k, l) {
        if (d = d.toLowerCase(), g[d]) for (;u.last() && e[u.last()]; ) t("", u.last());
        if (h[d] && u.last() == d && t("", d), l = f[d] || !!l, l || u.push(d), p.start) {
            var m = [];
            k.replace(c, function(b, c) {
                var d = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : j[c] ? c : "";
                m.push({
                    name: c,
                    value: d,
                    escaped: d.replace(/(^|[^\\])"/g, '$1\\"')
                });
            }), p.start && p.start(d, m, l);
        }
    }
    function t(b, c) {
        if (c) {
            c = c.toLowerCase();
            for (var a = u.length - 1; 0 <= a && u[a] != c; a--) ;
        } else var a = 0;
        if (0 <= a) {
            for (var d = u.length - 1; d >= a; d--) p.end && p.end(u[d]);
            u.length = a;
        }
    }
    var a, r, n, u = [], i = m;
    for (u.last = function() {
        return this[this.length - 1];
    }; m; ) {
        if (r = !0, u.last() && k[u.last()]) m = m.replace(new RegExp("([\\s\\S]*?)</" + u.last() + "[^>]*>"), function(b, c) {
            return c = c.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), p.chars && p.chars(c), 
            "";
        }), t("", u.last()); else if (0 == m.indexOf("\x3c!--") ? 0 <= (a = m.indexOf("--\x3e")) && (p.comment && p.comment(m.substring(4, a)), 
        m = m.substring(a + 3), r = !1) : 0 == m.indexOf("</") ? (n = m.match(d)) && (m = m.substring(n[0].length), 
        n[0].replace(d, t), r = !1) : 0 == m.indexOf("<") && (n = m.match(b)) && (m = m.substring(n[0].length), 
        n[0].replace(b, q), r = !1), r) {
            a = m.indexOf("<");
            for (var l = ""; 0 === a; ) l += "<", m = m.substring(1), a = m.indexOf("<");
            l += 0 > a ? m : m.substring(0, a), m = 0 > a ? "" : m.substring(a), p.chars && p.chars(l);
        }
        if (m == i) throw "Parse Error: " + m;
        i = m;
    }
    t();
};