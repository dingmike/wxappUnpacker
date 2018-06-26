function a(a) {
    var b = {
        omitExtraWLInCodeBlocks: {
            defaultValue: !1,
            describe: "Omit the default extra whiteline added to code blocks",
            type: "boolean"
        },
        noHeaderId: {
            defaultValue: !1,
            describe: "Turn on/off generated header id",
            type: "boolean"
        },
        prefixHeaderId: {
            defaultValue: !1,
            describe: "Specify a prefix to generated header ids",
            type: "string"
        },
        headerLevelStart: {
            defaultValue: !1,
            describe: "The header blocks level start",
            type: "integer"
        },
        parseImgDimensions: {
            defaultValue: !1,
            describe: "Turn on/off image dimension parsing",
            type: "boolean"
        },
        simplifiedAutoLink: {
            defaultValue: !1,
            describe: "Turn on/off GFM autolink style",
            type: "boolean"
        },
        literalMidWordUnderscores: {
            defaultValue: !1,
            describe: "Parse midword underscores as literal underscores",
            type: "boolean"
        },
        strikethrough: {
            defaultValue: !1,
            describe: "Turn on/off strikethrough support",
            type: "boolean"
        },
        tables: {
            defaultValue: !1,
            describe: "Turn on/off tables support",
            type: "boolean"
        },
        tablesHeaderId: {
            defaultValue: !1,
            describe: "Add an id to table headers",
            type: "boolean"
        },
        ghCodeBlocks: {
            defaultValue: !0,
            describe: "Turn on/off GFM fenced code blocks support",
            type: "boolean"
        },
        tasklists: {
            defaultValue: !1,
            describe: "Turn on/off GFM tasklist support",
            type: "boolean"
        },
        smoothLivePreview: {
            defaultValue: !1,
            describe: "Prevents weird effects in live previews due to incomplete input",
            type: "boolean"
        },
        smartIndentationFix: {
            defaultValue: !1,
            description: "Tries to smartly fix identation in es6 strings",
            type: "boolean"
        }
    };
    if (!1 === a) return JSON.parse(JSON.stringify(b));
    var c = {};
    for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d].defaultValue);
    return c;
}

function b(b, c) {
    var e = c ? "Error in " + c + " extension->" : "Error in unnamed extension", g = {
        valid: !0,
        error: ""
    };
    f.helper.isArray(b) || (b = [ b ]);
    for (var h = 0; h < b.length; ++h) {
        var j = e + " sub-extension " + h + ": ", k = b[h];
        if ("object" !== (void 0 === k ? "undefined" : d(k))) return g.valid = !1, g.error = j + "must be an object, but " + (void 0 === k ? "undefined" : d(k)) + " given", 
        g;
        if (!f.helper.isString(k.type)) return g.valid = !1, g.error = j + 'property "type" must be a string, but ' + d(k.type) + " given", 
        g;
        var a = k.type = k.type.toLowerCase();
        if ("language" === a && (a = k.type = "lang"), "html" === a && (a = k.type = "output"), 
        "lang" !== a && "output" !== a && "listener" !== a) return g.valid = !1, g.error = j + "type " + a + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', 
        g;
        if ("listener" === a) {
            if (f.helper.isUndefined(k.listeners)) return g.valid = !1, g.error = j + '. Extensions of type "listener" must have a property called "listeners"', 
            g;
        } else if (f.helper.isUndefined(k.filter) && f.helper.isUndefined(k.regex)) return g.valid = !1, 
        g.error = j + a + ' extensions must define either a "regex" property or a "filter" method', 
        g;
        if (k.listeners) {
            if ("object" !== d(k.listeners)) return g.valid = !1, g.error = j + '"listeners" property must be an object but ' + d(k.listeners) + " given", 
            g;
            for (var i in k.listeners) if (k.listeners.hasOwnProperty(i) && "function" != typeof k.listeners[i]) return g.valid = !1, 
            g.error = j + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + i + " must be a function but " + d(k.listeners[i]) + " given", 
            g;
        }
        if (k.filter) {
            if ("function" != typeof k.filter) return g.valid = !1, g.error = j + '"filter" must be a function, but ' + d(k.filter) + " given", 
            g;
        } else if (k.regex) {
            if (f.helper.isString(k.regex) && (k.regex = new RegExp(k.regex, "g")), !k.regex instanceof RegExp) return g.valid = !1, 
            g.error = j + '"regex" property must either be a string or a RegExp object, but ' + d(k.regex) + " given", 
            g;
            if (f.helper.isUndefined(k.replace)) return g.valid = !1, g.error = j + '"regex" extensions must implement a replace string or function', 
            g;
        }
    }
    return g;
}

function c(a, b) {
    return "~E" + b.charCodeAt(0) + "E";
}

var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, f = {}, g = {}, h = {}, i = a(!0), j = {
    github: {
        omitExtraWLInCodeBlocks: !0,
        prefixHeaderId: "user-content-",
        simplifiedAutoLink: !0,
        literalMidWordUnderscores: !0,
        strikethrough: !0,
        tables: !0,
        tablesHeaderId: !0,
        ghCodeBlocks: !0,
        tasklists: !0
    },
    vanilla: a(!0)
};

f.helper = {}, f.extensions = {}, f.setOption = function(a, b) {
    return i[a] = b, this;
}, f.getOption = function(a) {
    return i[a];
}, f.getOptions = function() {
    return i;
}, f.resetOptions = function() {
    i = a(!0);
}, f.setFlavor = function(a) {
    if (j.hasOwnProperty(a)) {
        var b = j[a];
        for (var c in b) b.hasOwnProperty(c) && (i[c] = b[c]);
    }
}, f.getDefaultOptions = function(b) {
    return a(b);
}, f.subParser = function(a, b) {
    if (f.helper.isString(a)) {
        if (void 0 === b) {
            if (g.hasOwnProperty(a)) return g[a];
            throw Error("SubParser named " + a + " not registered!");
        }
        g[a] = b;
    }
}, f.extension = function(a, c) {
    if (!f.helper.isString(a)) throw Error("Extension 'name' must be a string");
    if (a = f.helper.stdExtName(a), f.helper.isUndefined(c)) {
        if (!h.hasOwnProperty(a)) throw Error("Extension named " + a + " is not registered!");
        return h[a];
    }
    "function" == typeof c && (c = c()), f.helper.isArray(c) || (c = [ c ]);
    var d = b(c, a);
    if (!d.valid) throw Error(d.error);
    h[a] = c;
}, f.getAllExtensions = function() {
    return h;
}, f.removeExtension = function(a) {
    delete h[a];
}, f.resetExtensions = function() {
    h = {};
}, f.validateExtension = function(a) {
    var c = b(a, null);
    return !!c.valid || (console.warn(c.error), !1);
}, f.hasOwnProperty("helper") || (f.helper = {}), f.helper.isString = function(a) {
    return "string" == typeof a || a instanceof String;
}, f.helper.isFunction = function(a) {
    return a && "[object Function]" === {}.toString.call(a);
}, f.helper.forEach = function(a, b) {
    if ("function" == typeof a.forEach) a.forEach(b); else for (var c = 0; c < a.length; c++) b(a[c], c, a);
}, f.helper.isArray = function(a) {
    return a.constructor === Array;
}, f.helper.isUndefined = function(a) {
    return void 0 === a;
}, f.helper.stdExtName = function(a) {
    return a.replace(/[_-]||\s/g, "").toLowerCase();
}, f.helper.escapeCharactersCallback = c, f.helper.escapeCharacters = function(a, b, d) {
    var e = "([" + b.replace(/([\[\]\\])/g, "\\$1") + "])";
    d && (e = "\\\\" + e);
    var f = new RegExp(e, "g");
    return a = a.replace(f, c);
};

var k = function(b, e, f, g) {
    var j, k, m, a, n, o = g || "", c = -1 < o.indexOf("g"), q = new RegExp(e + "|" + f, "g" + o.replace(/g/g, "")), r = new RegExp(e, o.replace(/g/g, "")), d = [];
    do {
        for (j = 0; m = q.exec(b); ) if (r.test(m[0])) j++ || (k = q.lastIndex, a = k - m[0].length); else if (j && !--j) {
            n = m.index + m[0].length;
            var p = {
                left: {
                    start: a,
                    end: k
                },
                match: {
                    start: k,
                    end: m.index
                },
                right: {
                    start: m.index,
                    end: n
                },
                wholeMatch: {
                    start: a,
                    end: n
                }
            };
            if (d.push(p), !c) return d;
        }
    } while (j && (q.lastIndex = k));
    return d;
};

f.helper.matchRecursiveRegExp = function(b, c, d, e) {
    for (var f = k(b, c, d, e), g = [], h = 0; h < f.length; ++h) g.push([ b.slice(f[h].wholeMatch.start, f[h].wholeMatch.end), b.slice(f[h].match.start, f[h].match.end), b.slice(f[h].left.start, f[h].left.end), b.slice(f[h].right.start, f[h].right.end) ]);
    return g;
}, f.helper.replaceRecursiveRegExp = function(b, d, e, g, j) {
    if (!f.helper.isFunction(d)) {
        var m = d;
        d = function() {
            return m;
        };
    }
    var n = k(b, e, g, j), a = b, i = n.length;
    if (0 < i) {
        var l = [];
        0 !== n[0].wholeMatch.start && l.push(b.slice(0, n[0].wholeMatch.start));
        for (var c = 0; c < i; ++c) l.push(d(b.slice(n[c].wholeMatch.start, n[c].wholeMatch.end), b.slice(n[c].match.start, n[c].match.end), b.slice(n[c].left.start, n[c].left.end), b.slice(n[c].right.start, n[c].right.end))), 
        c < i - 1 && l.push(b.slice(n[c].wholeMatch.end, n[c + 1].wholeMatch.start));
        n[i - 1].wholeMatch.end < b.length && l.push(b.slice(n[i - 1].wholeMatch.end)), 
        a = l.join("");
    }
    return a;
}, f.helper.isUndefined(console) && (console = {
    warn: function(a) {
        alert(a);
    },
    log: function(a) {
        alert(a);
    },
    error: function(a) {
        throw a;
    }
}), f.Converter = function(c) {
    function g(a, d) {
        if (d = d || null, f.helper.isString(a)) {
            if (a = f.helper.stdExtName(a), d = a, f.extensions[a]) return console.warn("DEPRECATION WARNING: " + a + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), 
            void k(f.extensions[a], a);
            if (f.helper.isUndefined(h[a])) throw Error('Extension "' + a + '" could not be loaded. It was either not found or is not a valid extension.');
            a = h[a];
        }
        "function" == typeof a && (a = a()), f.helper.isArray(a) || (a = [ a ]);
        var g = b(a, d);
        if (!g.valid) throw Error(g.error);
        for (var i = 0; i < a.length; ++i) {
            switch (a[i].type) {
              case "lang":
                p.push(a[i]);
                break;

              case "output":
                q.push(a[i]);
            }
            if (a[i].hasOwnProperty(u)) for (var j in a[i].listeners) a[i].listeners.hasOwnProperty(j) && m(j, a[i].listeners[j]);
        }
    }
    function k(a, c) {
        "function" == typeof a && (a = a(new f.Converter())), f.helper.isArray(a) || (a = [ a ]);
        var d = b(a, c);
        if (!d.valid) throw Error(d.error);
        for (var g = 0; g < a.length; ++g) switch (a[g].type) {
          case "lang":
            p.push(a[g]);
            break;

          case "output":
            q.push(a[g]);
            break;

          default:
            throw Error("Extension loader error: Type unrecognized!!!");
        }
    }
    function m(a, b) {
        if (!f.helper.isString(a)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (void 0 === a ? "undefined" : d(a)) + " given");
        if ("function" != typeof b) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (void 0 === b ? "undefined" : d(b)) + " given");
        u.hasOwnProperty(a) || (u[a] = []), u[a].push(b);
    }
    function n(a) {
        var b = a.match(/^\s*/)[0].length, c = new RegExp("^\\s{0," + b + "}", "gm");
        return a.replace(c, "");
    }
    var o = {}, p = [], q = [], u = {};
    !function() {
        for (var a in c = c || {}, i) i.hasOwnProperty(a) && (o[a] = i[a]);
        if ("object" !== (void 0 === c ? "undefined" : d(c))) throw Error("Converter expects the passed parameter to be an object, but " + (void 0 === c ? "undefined" : d(c)) + " was passed instead.");
        for (var b in c) c.hasOwnProperty(b) && (o[b] = c[b]);
        o.extensions && f.helper.forEach(o.extensions, g);
    }(), this._dispatch = function(a, b, c, d) {
        if (u.hasOwnProperty(a)) for (var e, f = 0; f < u[a].length; ++f) e = u[a][f](a, b, this, c, d), 
        e && void 0 !== e && (b = e);
        return b;
    }, this.listen = function(a, b) {
        return m(a, b), this;
    }, this.makeHtml = function(b) {
        if (!b) return b;
        var c = {
            gHtmlBlocks: [],
            gHtmlMdBlocks: [],
            gHtmlSpans: [],
            gUrls: {},
            gTitles: {},
            gDimensions: {},
            gListLevel: 0,
            hashLinkCounts: {},
            langExtensions: p,
            outputModifiers: q,
            converter: this,
            ghCodeBlocks: []
        };
        return b = b.replace(/~/g, "~T"), b = b.replace(/\$/g, "~D"), b = b.replace(/\r\n/g, "\n"), 
        b = b.replace(/\r/g, "\n"), o.smartIndentationFix && (b = n(b)), b = b, b = f.subParser("detab")(b, o, c), 
        b = f.subParser("stripBlankLines")(b, o, c), f.helper.forEach(p, function(a) {
            b = f.subParser("runExtension")(a, b, o, c);
        }), b = f.subParser("hashPreCodeTags")(b, o, c), b = f.subParser("githubCodeBlocks")(b, o, c), 
        b = f.subParser("hashHTMLBlocks")(b, o, c), b = f.subParser("hashHTMLSpans")(b, o, c), 
        b = f.subParser("stripLinkDefinitions")(b, o, c), b = f.subParser("blockGamut")(b, o, c), 
        b = f.subParser("unhashHTMLSpans")(b, o, c), b = f.subParser("unescapeSpecialChars")(b, o, c), 
        b = b.replace(/~D/g, "$$"), b = b.replace(/~T/g, "~"), f.helper.forEach(q, function(a) {
            b = f.subParser("runExtension")(a, b, o, c);
        }), b;
    }, this.setOption = function(a, b) {
        o[a] = b;
    }, this.getOption = function(a) {
        return o[a];
    }, this.getOptions = function() {
        return o;
    }, this.addExtension = function(a, b) {
        b = b || null, g(a, b);
    }, this.useExtension = function(a) {
        g(a);
    }, this.setFlavor = function(a) {
        if (j.hasOwnProperty(a)) {
            var b = j[a];
            for (var c in b) b.hasOwnProperty(c) && (o[c] = b[c]);
        }
    }, this.removeExtension = function(a) {
        f.helper.isArray(a) || (a = [ a ]);
        for (var b = 0; b < a.length; ++b) {
            for (var c = a[b], d = 0; d < p.length; ++d) p[d] === c && p[d].splice(d, 1);
            for (;0 < q.length; ++d) q[0] === c && q[0].splice(d, 1);
        }
    }, this.getAllExtensions = function() {
        return {
            language: p,
            output: q
        };
    };
}, f.subParser("anchors", function(a, b, g) {
    a = g.converter._dispatch("anchors.before", a, b, g);
    var c = function(b, e, j, k, m, n, a, i) {
        f.helper.isUndefined(i) && (i = ""), b = e;
        var l = j, c = k.toLowerCase(), h = m, o = i;
        if (!h) if (c || (c = l.toLowerCase().replace(/ ?\n/g, " ")), h = "#" + c, f.helper.isUndefined(g.gUrls[c])) {
            if (!(-1 < b.search(/\(\s*\)$/m))) return b;
            h = "";
        } else h = g.gUrls[c], f.helper.isUndefined(g.gTitles[c]) || (o = g.gTitles[c]);
        h = f.helper.escapeCharacters(h, "*_", !1);
        var d = '<a href="' + h + '"';
        return "" !== o && null !== o && (o = o.replace(/"/g, "&quot;"), o = f.helper.escapeCharacters(o, "*_", !1), 
        d += ' title="' + o + '"'), d += ">" + l + "</a>";
    };
    return a = a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, c), 
    a = a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, c), 
    a = a.replace(/(\[([^\[\]]+)])()()()()()/g, c), a = g.converter._dispatch("anchors.after", a, b, g);
}), f.subParser("autoLinks", function(b, c, d) {
    function e(a, b) {
        var c = b;
        return /^www\./i.test(b) && (b = b.replace(/^www\./i, "http://www.")), '<a href="' + b + '">' + c + "</a>";
    }
    function g(a, b) {
        var c = f.subParser("unescapeSpecialChars")(b);
        return f.subParser("encodeEmailAddress")(c);
    }
    b = d.converter._dispatch("autoLinks.before", b, c, d);
    var h = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi, j = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi, a = /(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-\/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi, i = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;
    return b = b.replace(j, e), b = b.replace(i, g), c.simplifiedAutoLink && (b = b.replace(h, e), 
    b = b.replace(a, g)), b = d.converter._dispatch("autoLinks.after", b, c, d);
}), f.subParser("blockGamut", function(a, b, c) {
    a = c.converter._dispatch("blockGamut.before", a, b, c), a = f.subParser("blockQuotes")(a, b, c), 
    a = f.subParser("headers")(a, b, c);
    var d = f.subParser("hashBlock")("<hr />", b, c);
    return a = a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, d), a = a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, d), 
    a = a.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, d), a = f.subParser("lists")(a, b, c), 
    a = f.subParser("codeBlocks")(a, b, c), a = f.subParser("tables")(a, b, c), a = f.subParser("hashHTMLBlocks")(a, b, c), 
    a = f.subParser("paragraphs")(a, b, c), a = c.converter._dispatch("blockGamut.after", a, b, c);
}), f.subParser("blockQuotes", function(a, b, c) {
    return a = c.converter._dispatch("blockQuotes.before", a, b, c), a = a.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(a, d) {
        var e = d;
        return e = e.replace(/^[ \t]*>[ \t]?/gm, "~0"), e = e.replace(/~0/g, ""), e = e.replace(/^[ \t]+$/gm, ""), 
        e = f.subParser("githubCodeBlocks")(e, b, c), e = f.subParser("blockGamut")(e, b, c), 
        e = e.replace(/(^|\n)/g, "$1  "), e = e.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(a, b) {
            var c = b;
            return c = c.replace(/^  /gm, "~0"), c = c.replace(/~0/g, "");
        }), f.subParser("hashBlock")("<blockquote>\n" + e + "\n</blockquote>", b, c);
    }), a = c.converter._dispatch("blockQuotes.after", a, b, c);
}), f.subParser("codeBlocks", function(a, b, c) {
    a = c.converter._dispatch("codeBlocks.before", a, b, c), a += "~0";
    var d = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
    return a = a.replace(d, function(a, d, e) {
        var g = d, h = "\n";
        return g = f.subParser("outdent")(g), g = f.subParser("encodeCode")(g), g = f.subParser("detab")(g), 
        g = g.replace(/^\n+/g, ""), g = g.replace(/\n+$/g, ""), b.omitExtraWLInCodeBlocks && (h = ""), 
        g = "<pre><code>" + g + h + "</code></pre>", f.subParser("hashBlock")(g, b, c) + e;
    }), a = a.replace(/~0/, ""), a = c.converter._dispatch("codeBlocks.after", a, b, c);
}), f.subParser("codeSpans", function(a, b, c) {
    return a = c.converter._dispatch("codeSpans.before", a, b, c), void 0 === a && (a = ""), 
    a = a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(a, b, c, d) {
        var e = d;
        return e = e.replace(/^([ \t]*)/g, ""), e = e.replace(/[ \t]*$/g, ""), e = f.subParser("encodeCode")(e), 
        b + "<code>" + e + "</code>";
    }), a = c.converter._dispatch("codeSpans.after", a, b, c);
}), f.subParser("detab", function(a) {
    return a = a.replace(/\t(?=\t)/g, "    "), a = a.replace(/\t/g, "~A~B"), a = a.replace(/~B(.+?)~A/g, function(a, b) {
        for (var c = b, d = 4 - c.length % 4, e = 0; e < d; e++) c += " ";
        return c;
    }), a = a.replace(/~A/g, "    "), a = a.replace(/~B/g, "");
}), f.subParser("encodeAmpsAndAngles", function(a) {
    return a = a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), a = a.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
}), f.subParser("encodeBackslashEscapes", function(a) {
    return a = a.replace(/\\(\\)/g, f.helper.escapeCharactersCallback), a = a.replace(/\\([`*_{}\[\]()>#+-.!])/g, f.helper.escapeCharactersCallback);
}), f.subParser("encodeCode", function(a) {
    return a = a.replace(/&/g, "&amp;"), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), 
    a = f.helper.escapeCharacters(a, "*_{}[]\\", !1);
}), f.subParser("encodeEmailAddress", function(a) {
    var b = [ function(a) {
        return "&#" + a.charCodeAt(0) + ";";
    }, function(a) {
        return "&#x" + a.charCodeAt(0).toString(16) + ";";
    }, function(a) {
        return a;
    } ];
    return a = "mailto:" + a, a = a.replace(/./g, function(a) {
        if ("@" === a) a = b[Math.floor(2 * Math.random())](a); else if (":" !== a) {
            var c = Math.random();
            a = .9 < c ? b[2](a) : .45 < c ? b[1](a) : b[0](a);
        }
        return a;
    }), a = '<a href="' + a + '">' + a + "</a>", a = a.replace(/">.+:/g, '">');
}), f.subParser("escapeSpecialCharsWithinTagAttributes", function(a) {
    var b = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
    return a = a.replace(b, function(a) {
        var b = a.replace(/(.)<\/?code>(?=.)/g, "$1`");
        return b = f.helper.escapeCharacters(b, "\\`*_", !1);
    });
}), f.subParser("githubCodeBlocks", function(a, b, c) {
    return b.ghCodeBlocks ? (a = c.converter._dispatch("githubCodeBlocks.before", a, b, c), 
    a += "~0", a = a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(a, d, g) {
        var h = b.omitExtraWLInCodeBlocks ? "" : "\n";
        return g = f.subParser("encodeCode")(g), g = f.subParser("detab")(g), g = g.replace(/^\n+/g, ""), 
        g = g.replace(/\n+$/g, ""), g = "<pre><code" + (d ? ' class="' + d + " language-" + d + '"' : "") + ">" + g + h + "</code></pre>", 
        g = f.subParser("hashBlock")(g, b, c), "\n\n~G" + (c.ghCodeBlocks.push({
            text: a,
            codeblock: g
        }) - 1) + "G\n\n";
    }), a = a.replace(/~0/, ""), c.converter._dispatch("githubCodeBlocks.after", a, b, c)) : a;
}), f.subParser("hashBlock", function(a, b, c) {
    return a = a.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (c.gHtmlBlocks.push(a) - 1) + "K\n\n";
}), f.subParser("hashElement", function(a, b, c) {
    return function(a, b) {
        var d = b;
        return d = d.replace(/\n\n/g, "\n"), d = d.replace(/^\n/, ""), d = d.replace(/\n+$/g, ""), 
        d = "\n\n~K" + (c.gHtmlBlocks.push(d) - 1) + "K\n\n";
    };
}), f.subParser("hashHTMLBlocks", function(a, b, c) {
    for (var d = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], e = function(a, b, d, e) {
        var f = a;
        return -1 !== d.search(/\bmarkdown\b/) && (f = d + c.converter.makeHtml(b) + e), 
        "\n\n~K" + (c.gHtmlBlocks.push(f) - 1) + "K\n\n";
    }, g = 0; g < d.length; ++g) a = f.helper.replaceRecursiveRegExp(a, e, "^(?: |\\t){0,3}<" + d[g] + "\\b[^>]*>", "</" + d[g] + ">", "gim");
    return a = a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, f.subParser("hashElement")(a, b, c)), 
    a = a.replace(/(<!--[\s\S]*?-->)/g, f.subParser("hashElement")(a, b, c)), a = a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, f.subParser("hashElement")(a, b, c));
}), f.subParser("hashHTMLSpans", function(a, b, c) {
    for (var d = f.helper.matchRecursiveRegExp(a, "<code\\b[^>]*>", "</code>", "gi"), e = 0; e < d.length; ++e) a = a.replace(d[e][0], "~L" + (c.gHtmlSpans.push(d[e][0]) - 1) + "L");
    return a;
}), f.subParser("unhashHTMLSpans", function(a, b, c) {
    for (var d = 0; d < c.gHtmlSpans.length; ++d) a = a.replace("~L" + d + "L", c.gHtmlSpans[d]);
    return a;
}), f.subParser("hashPreCodeTags", function(a, b, c) {
    return a = f.helper.replaceRecursiveRegExp(a, function(a, b, d, g) {
        var h = d + f.subParser("encodeCode")(b) + g;
        return "\n\n~G" + (c.ghCodeBlocks.push({
            text: a,
            codeblock: h
        }) - 1) + "G\n\n";
    }, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim");
}), f.subParser("headers", function(b, d, g) {
    function h(a) {
        var b, d = a.replace(/[^\w]/g, "").toLowerCase();
        return g.hashLinkCounts[d] ? b = d + "-" + g.hashLinkCounts[d]++ : (b = d, g.hashLinkCounts[d] = 1), 
        !0 === c && (c = "section"), f.helper.isString(c) ? c + b : b;
    }
    b = g.converter._dispatch("headers.before", b, d, g);
    var c = d.prefixHeaderId, j = isNaN(parseInt(d.headerLevelStart)) ? 1 : parseInt(d.headerLevelStart), e = d.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, a = d.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
    return b = b.replace(e, function(b, c) {
        var e = f.subParser("spanGamut")(c, d, g), a = d.noHeaderId ? "" : ' id="' + h(c) + '"', i = j;
        return f.subParser("hashBlock")("<h" + i + a + ">" + e + "</h" + i + ">", d, g);
    }), b = b.replace(a, function(b, c) {
        var e = f.subParser("spanGamut")(c, d, g), a = d.noHeaderId ? "" : ' id="' + h(c) + '"', i = j + 1;
        return f.subParser("hashBlock")("<h" + i + a + ">" + e + "</h" + i + ">", d, g);
    }), b = b.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(b, e, k) {
        var a = f.subParser("spanGamut")(k, d, g), i = d.noHeaderId ? "" : ' id="' + h(k) + '"', l = j - 1 + e.length;
        return f.subParser("hashBlock")("<h" + l + i + ">" + a + "</h" + l + ">", d, g);
    }), b = g.converter._dispatch("headers.after", b, d, g);
}), f.subParser("images", function(a, b, g) {
    function c(b, e, j, k, m, n, a, i) {
        var l = g.gUrls, c = g.gTitles, h = g.gDimensions;
        if (j = j.toLowerCase(), i || (i = ""), "" === k || null === k) {
            if ("" !== j && null !== j || (j = e.toLowerCase().replace(/ ?\n/g, " ")), k = "#" + j, 
            f.helper.isUndefined(l[j])) return b;
            k = l[j], f.helper.isUndefined(c[j]) || (i = c[j]), f.helper.isUndefined(h[j]) || (m = h[j].width, 
            n = h[j].height);
        }
        e = e.replace(/"/g, "&quot;"), e = f.helper.escapeCharacters(e, "*_", !1), k = f.helper.escapeCharacters(k, "*_", !1);
        var o = '<img src="' + k + '" alt="' + e + '"';
        return i && (i = i.replace(/"/g, "&quot;"), i = f.helper.escapeCharacters(i, "*_", !1), 
        o += ' title="' + i + '"'), m && n && (m = "*" === m ? "auto" : m, n = "*" === n ? "auto" : n, 
        o += ' width="' + m + '"', o += ' height="' + n + '"'), o += " />";
    }
    a = g.converter._dispatch("images.before", a, b, g);
    var d = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g, e = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;
    return a = a.replace(e, c), a = a.replace(d, c), a = g.converter._dispatch("images.after", a, b, g);
}), f.subParser("italicsAndBold", function(a, b, c) {
    return a = c.converter._dispatch("italicsAndBold.before", a, b, c), b.literalMidWordUnderscores ? (a = a.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>"), 
    a = a.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>"), 
    a = a.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>"), a = a.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>")) : (a = a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"), 
    a = a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>")), a = c.converter._dispatch("italicsAndBold.after", a, b, c);
}), f.subParser("lists", function(a, b, d) {
    function c(a, c) {
        d.gListLevel++, a = a.replace(/\n{2,}$/, "\n"), a += "~0";
        var e = /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, g = /\n[ \t]*\n(?!~0)/.test(a);
        return a = a.replace(e, function(j, e, k, m, a, i, l) {
            l = l && "" !== l.trim();
            var c = f.subParser("outdent")(a, b, d), h = "";
            return i && b.tasklists && (h = ' class="task-list-item" style="list-style-type: none;"', 
            c = c.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                var a = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                return l && (a += " checked"), a += ">";
            })), e || -1 < c.search(/\n{2,}/) ? (c = f.subParser("githubCodeBlocks")(c, b, d), 
            c = f.subParser("blockGamut")(c, b, d)) : (c = f.subParser("lists")(c, b, d), c = c.replace(/\n$/, ""), 
            c = g ? f.subParser("paragraphs")(c, b, d) : f.subParser("spanGamut")(c, b, d)), 
            c = "\n<li" + h + ">" + c + "</li>\n";
        }), a = a.replace(/~0/g, ""), d.gListLevel--, c && (a = a.replace(/\s+$/, "")), 
        a;
    }
    function g(b, d, f) {
        var g = "ul" === d ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, e = [], h = "";
        if (-1 !== b.search(g)) {
            !function a(b) {
                var e = b.search(g);
                -1 === e ? h += "\n\n<" + d + ">" + c(b, !!f) + "</" + d + ">\n\n" : (h += "\n\n<" + d + ">" + c(b.slice(0, e), !!f) + "</" + d + ">\n\n", 
                d = "ul" === d ? "ol" : "ul", g = "ul" === d ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, 
                a(b.slice(e)));
            }(b);
            for (var a = 0; a < e.length; ++a) ;
        } else h = "\n\n<" + d + ">" + c(b, !!f) + "</" + d + ">\n\n";
        return h;
    }
    a = d.converter._dispatch("lists.before", a, b, d), a += "~0";
    var e = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    return d.gListLevel ? a = a.replace(e, function(a, b, c) {
        return g(b, -1 < c.search(/[*+-]/g) ? "ul" : "ol", !0);
    }) : (e = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, 
    a = a.replace(e, function(a, b, c, d) {
        return g(c, -1 < d.search(/[*+-]/g) ? "ul" : "ol");
    })), a = a.replace(/~0/, ""), a = d.converter._dispatch("lists.after", a, b, d);
}), f.subParser("outdent", function(a) {
    return a = a.replace(/^(\t|[ ]{1,4})/gm, "~0"), a = a.replace(/~0/g, "");
}), f.subParser("paragraphs", function(b, e, g) {
    b = g.converter._dispatch("paragraphs.before", b, e, g), b = b.replace(/^\n+/g, ""), 
    b = b.replace(/\n+$/g, "");
    for (var j, i = b.split(/\n{2,}/g), k = [], m = i.length, n = 0; n < m; n++) j = i[n], 
    0 <= j.search(/~(K|G)(\d+)\1/g) ? k.push(j) : (j = f.subParser("spanGamut")(j, e, g), 
    j = j.replace(/^([ \t]*)/g, "<p>"), j += "</p>", k.push(j));
    for (m = k.length, n = 0; n < m; n++) {
        for (var a = "", l = k[n], c = !1; 0 <= l.search(/~(K|G)(\d+)\1/); ) {
            var h = RegExp.$1, o = RegExp.$2;
            a = "K" === h ? g.gHtmlBlocks[o] : c ? f.subParser("encodeCode")(g.ghCodeBlocks[o].text) : g.ghCodeBlocks[o].codeblock, 
            a = a.replace(/\$/g, "$$$$"), l = l.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, a), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l) && (c = !0);
        }
        k[n] = l;
    }
    return b = k.join("\n\n"), b = b.replace(/^\n+/g, ""), b = b.replace(/\n+$/g, ""), 
    g.converter._dispatch("paragraphs.after", b, e, g);
}), f.subParser("runExtension", function(a, b, c, d) {
    if (a.filter) b = a.filter(b, d.converter, c); else if (a.regex) {
        var e = a.regex;
        !e instanceof RegExp && (e = new RegExp(e, "g")), b = b.replace(e, a.replace);
    }
    return b;
}), f.subParser("spanGamut", function(a, b, c) {
    return a = c.converter._dispatch("spanGamut.before", a, b, c), a = f.subParser("codeSpans")(a, b, c), 
    a = f.subParser("escapeSpecialCharsWithinTagAttributes")(a, b, c), a = f.subParser("encodeBackslashEscapes")(a, b, c), 
    a = f.subParser("images")(a, b, c), a = f.subParser("anchors")(a, b, c), a = f.subParser("autoLinks")(a, b, c), 
    a = f.subParser("encodeAmpsAndAngles")(a, b, c), a = f.subParser("italicsAndBold")(a, b, c), 
    a = f.subParser("strikethrough")(a, b, c), a = a.replace(/  +\n/g, " <br />\n"), 
    a = c.converter._dispatch("spanGamut.after", a, b, c);
}), f.subParser("strikethrough", function(a, b, c) {
    return b.strikethrough && (a = c.converter._dispatch("strikethrough.before", a, b, c), 
    a = a.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), a = c.converter._dispatch("strikethrough.after", a, b, c)), 
    a;
}), f.subParser("stripBlankLines", function(a) {
    return a.replace(/^[ \t]+$/gm, "");
}), f.subParser("stripLinkDefinitions", function(a, b, c) {
    var d = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;
    return a += "~0", a = a.replace(d, function(d, e, g, h, j, k, i) {
        return e = e.toLowerCase(), c.gUrls[e] = f.subParser("encodeAmpsAndAngles")(g), 
        k ? k + i : (i && (c.gTitles[e] = i.replace(/"|'/g, "&quot;")), b.parseImgDimensions && h && j && (c.gDimensions[e] = {
            width: h,
            height: j
        }), "");
    }), a = a.replace(/~0/, "");
}), f.subParser("tables", function(b, c, d) {
    function e(a) {
        return /^:[ \t]*--*$/.test(a) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(a) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(a) ? ' style="text-align:center;"' : "";
    }
    function g(a, b) {
        var e = "";
        return a = a.trim(), c.tableHeaderId && (e = ' id="' + a.replace(/ /g, "_").toLowerCase() + '"'), 
        a = f.subParser("spanGamut")(a, c, d), "<th" + e + b + ">" + a + "</th>\n";
    }
    function j(a, b) {
        return "<td" + b + ">" + f.subParser("spanGamut")(a, c, d) + "</td>\n";
    }
    function k(a, b) {
        for (var c = "<table>\n<thead>\n<tr>\n", d = a.length, e = 0; e < d; ++e) c += a[e];
        for (c += "</tr>\n</thead>\n<tbody>\n", e = 0; e < b.length; ++e) {
            c += "<tr>\n";
            for (var f = 0; f < d; ++f) c += b[e][f];
            c += "</tr>\n";
        }
        return c += "</tbody>\n</table>\n";
    }
    if (!c.tables) return b;
    var a = /^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;
    return b = d.converter._dispatch("tables.before", b, c, d), b = b.replace(a, function(a) {
        var b, m = a.split("\n");
        for (b = 0; b < m.length; ++b) /^[ \t]{0,3}\|/.test(m[b]) && (m[b] = m[b].replace(/^[ \t]{0,3}\|/, "")), 
        /\|[ \t]*$/.test(m[b]) && (m[b] = m[b].replace(/\|[ \t]*$/, ""));
        var n = m[0].split("|").map(function(a) {
            return a.trim();
        }), i = m[1].split("|").map(function(a) {
            return a.trim();
        }), l = [], c = [], h = [], o = [];
        for (m.shift(), m.shift(), b = 0; b < m.length; ++b) "" !== m[b].trim() && l.push(m[b].split("|").map(function(a) {
            return a.trim();
        }));
        if (n.length < i.length) return a;
        for (b = 0; b < i.length; ++b) h.push(e(i[b]));
        for (b = 0; b < n.length; ++b) f.helper.isUndefined(h[b]) && (h[b] = ""), c.push(g(n[b], h[b]));
        for (b = 0; b < l.length; ++b) {
            for (var d = [], p = 0; p < c.length; ++p) f.helper.isUndefined(l[b][p]), d.push(j(l[b][p], h[p]));
            o.push(d);
        }
        return k(c, o);
    }), b = d.converter._dispatch("tables.after", b, c, d);
}), f.subParser("unescapeSpecialChars", function(a) {
    return a = a.replace(/~E(\d+)E/g, function(a, b) {
        var c = parseInt(b);
        return String.fromCharCode(c);
    });
}), module.exports = f;