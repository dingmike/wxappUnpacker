function a(a) {
    return a = a.replace(/&forall;/g, "∀"), a = a.replace(/&part;/g, "∂"), a = a.replace(/&exists;/g, "∃"), 
    a = a.replace(/&empty;/g, "∅"), a = a.replace(/&nabla;/g, "∇"), a = a.replace(/&isin;/g, "∈"), 
    a = a.replace(/&notin;/g, "∉"), a = a.replace(/&ni;/g, "∋"), a = a.replace(/&prod;/g, "∏"), 
    a = a.replace(/&sum;/g, "∑"), a = a.replace(/&minus;/g, "−"), a = a.replace(/&lowast;/g, "∗"), 
    a = a.replace(/&radic;/g, "√"), a = a.replace(/&prop;/g, "∝"), a = a.replace(/&infin;/g, "∞"), 
    a = a.replace(/&ang;/g, "∠"), a = a.replace(/&and;/g, "∧"), a = a.replace(/&or;/g, "∨"), 
    a = a.replace(/&cap;/g, "∩"), a = a.replace(/&cap;/g, "∪"), a = a.replace(/&int;/g, "∫"), 
    a = a.replace(/&there4;/g, "∴"), a = a.replace(/&sim;/g, "∼"), a = a.replace(/&cong;/g, "≅"), 
    a = a.replace(/&asymp;/g, "≈"), a = a.replace(/&ne;/g, "≠"), a = a.replace(/&le;/g, "≤"), 
    a = a.replace(/&ge;/g, "≥"), a = a.replace(/&sub;/g, "⊂"), a = a.replace(/&sup;/g, "⊃"), 
    a = a.replace(/&nsub;/g, "⊄"), a = a.replace(/&sube;/g, "⊆"), a = a.replace(/&supe;/g, "⊇"), 
    a = a.replace(/&oplus;/g, "⊕"), a = a.replace(/&otimes;/g, "⊗"), a = a.replace(/&perp;/g, "⊥"), 
    a = a.replace(/&sdot;/g, "⋅");
}

function b(a) {
    return a = a.replace(/&Alpha;/g, "Α"), a = a.replace(/&Beta;/g, "Β"), a = a.replace(/&Gamma;/g, "Γ"), 
    a = a.replace(/&Delta;/g, "Δ"), a = a.replace(/&Epsilon;/g, "Ε"), a = a.replace(/&Zeta;/g, "Ζ"), 
    a = a.replace(/&Eta;/g, "Η"), a = a.replace(/&Theta;/g, "Θ"), a = a.replace(/&Iota;/g, "Ι"), 
    a = a.replace(/&Kappa;/g, "Κ"), a = a.replace(/&Lambda;/g, "Λ"), a = a.replace(/&Mu;/g, "Μ"), 
    a = a.replace(/&Nu;/g, "Ν"), a = a.replace(/&Xi;/g, "Ν"), a = a.replace(/&Omicron;/g, "Ο"), 
    a = a.replace(/&Pi;/g, "Π"), a = a.replace(/&Rho;/g, "Ρ"), a = a.replace(/&Sigma;/g, "Σ"), 
    a = a.replace(/&Tau;/g, "Τ"), a = a.replace(/&Upsilon;/g, "Υ"), a = a.replace(/&Phi;/g, "Φ"), 
    a = a.replace(/&Chi;/g, "Χ"), a = a.replace(/&Psi;/g, "Ψ"), a = a.replace(/&Omega;/g, "Ω"), 
    a = a.replace(/&alpha;/g, "α"), a = a.replace(/&beta;/g, "β"), a = a.replace(/&gamma;/g, "γ"), 
    a = a.replace(/&delta;/g, "δ"), a = a.replace(/&epsilon;/g, "ε"), a = a.replace(/&zeta;/g, "ζ"), 
    a = a.replace(/&eta;/g, "η"), a = a.replace(/&theta;/g, "θ"), a = a.replace(/&iota;/g, "ι"), 
    a = a.replace(/&kappa;/g, "κ"), a = a.replace(/&lambda;/g, "λ"), a = a.replace(/&mu;/g, "μ"), 
    a = a.replace(/&nu;/g, "ν"), a = a.replace(/&xi;/g, "ξ"), a = a.replace(/&omicron;/g, "ο"), 
    a = a.replace(/&pi;/g, "π"), a = a.replace(/&rho;/g, "ρ"), a = a.replace(/&sigmaf;/g, "ς"), 
    a = a.replace(/&sigma;/g, "σ"), a = a.replace(/&tau;/g, "τ"), a = a.replace(/&upsilon;/g, "υ"), 
    a = a.replace(/&phi;/g, "φ"), a = a.replace(/&chi;/g, "χ"), a = a.replace(/&psi;/g, "ψ"), 
    a = a.replace(/&omega;/g, "ω"), a = a.replace(/&thetasym;/g, "ϑ"), a = a.replace(/&upsih;/g, "ϒ"), 
    a = a.replace(/&piv;/g, "ϖ"), a = a.replace(/&middot;/g, "·");
}

function c(a) {
    return a = a.replace(/&nbsp;/g, " "), a = a.replace(/&quot;/g, "'"), a = a.replace(/&amp;/g, "&"), 
    a = a.replace(/&lt;/g, "<"), a = a.replace(/&gt;/g, ">");
}

function d(a) {
    return a = a.replace(/&OElig;/g, "Œ"), a = a.replace(/&oelig;/g, "œ"), a = a.replace(/&Scaron;/g, "Š"), 
    a = a.replace(/&scaron;/g, "š"), a = a.replace(/&Yuml;/g, "Ÿ"), a = a.replace(/&fnof;/g, "ƒ"), 
    a = a.replace(/&circ;/g, "ˆ"), a = a.replace(/&tilde;/g, "˜"), a = a.replace(/&ensp;/g, ""), 
    a = a.replace(/&emsp;/g, ""), a = a.replace(/&thinsp;/g, ""), a = a.replace(/&zwnj;/g, ""), 
    a = a.replace(/&zwj;/g, ""), a = a.replace(/&lrm;/g, ""), a = a.replace(/&rlm;/g, ""), 
    a = a.replace(/&ndash;/g, "–"), a = a.replace(/&mdash;/g, "—"), a = a.replace(/&lsquo;/g, "‘"), 
    a = a.replace(/&rsquo;/g, "’"), a = a.replace(/&sbquo;/g, "‚"), a = a.replace(/&ldquo;/g, "“"), 
    a = a.replace(/&rdquo;/g, "”"), a = a.replace(/&bdquo;/g, "„"), a = a.replace(/&dagger;/g, "†"), 
    a = a.replace(/&Dagger;/g, "‡"), a = a.replace(/&bull;/g, "•"), a = a.replace(/&hellip;/g, "…"), 
    a = a.replace(/&permil;/g, "‰"), a = a.replace(/&prime;/g, "′"), a = a.replace(/&Prime;/g, "″"), 
    a = a.replace(/&lsaquo;/g, "‹"), a = a.replace(/&rsaquo;/g, "›"), a = a.replace(/&oline;/g, "‾"), 
    a = a.replace(/&euro;/g, "€"), a = a.replace(/&trade;/g, "™"), a = a.replace(/&larr;/g, "←"), 
    a = a.replace(/&uarr;/g, "↑"), a = a.replace(/&rarr;/g, "→"), a = a.replace(/&darr;/g, "↓"), 
    a = a.replace(/&harr;/g, "↔"), a = a.replace(/&crarr;/g, "↵"), a = a.replace(/&lceil;/g, "⌈"), 
    a = a.replace(/&rceil;/g, "⌉"), a = a.replace(/&lfloor;/g, "⌊"), a = a.replace(/&rfloor;/g, "⌋"), 
    a = a.replace(/&loz;/g, "◊"), a = a.replace(/&spades;/g, "♠"), a = a.replace(/&clubs;/g, "♣"), 
    a = a.replace(/&hearts;/g, "♥"), a = a.replace(/&diams;/g, "♦");
}

function f(a) {
    return a = a.replace(/\r\n/g, ""), a = a.replace(/\n/g, ""), a = a.replace(/code/g, "wxxxcode-style");
}

module.exports = {
    strDiscode: function(g) {
        return g = a(g), g = b(g), g = c(g), g = d(g), g = f(g);
    },
    urlToHttpUrl: function(a, b) {
        return /^\/\//.test(a) && (a = b + ":" + a), a;
    }
};