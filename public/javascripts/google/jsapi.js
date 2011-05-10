if (!window['google']) {
    window['google'] = {};
}
if (!window['google']['loader']) {
    window['google']['loader'] = {};
    // google.loader.ServiceBase = 'https://www.google.com/uds';
    // google.loader.GoogleApisBase = 'https://ajax.googleapis.com/ajax';
    google.loader.ApiKey = 'notsupplied';
    google.loader.KeyVerified = true;
    google.loader.LoadFailure = false;
    google.loader.Secure = true;
    google.loader.GoogleLocale = 'www.google.com';
    google.loader.ClientLocation = null;
    google.loader.AdditionalParams = ''; (function() {
        var d = true,
        g = null,
        h = false,
        j = encodeURIComponent,
        l = window,
        n = undefined,
        o = document;
        function p(a, b) {
            return a.load = b
        }
        var q = "push",
        r = "replace",
        s = "charAt",
        t = "indexOf",
        u = "ServiceBase",
        v = "name",
        w = "getTime",
        x = "length",
        y = "prototype",
        z = "setTimeout",
        A = "loader",
        B = "substring",
        C = "join",
        D = "toLowerCase";
        function E(a) {
            if (a in F) return F[a];
            return F[a] = navigator.userAgent[D]()[t](a) != -1
        }
        var F = {};
        function G(a, b) {
            var c = function() {};
            c.prototype = b[y];
            a.S = b[y];
            a.prototype = new c
        }
        function H(a, b) {
            var c = Array[y].slice.call(arguments, 2) || [];
            return function() {
                var e = c.concat(Array[y].slice.call(arguments));
                return a.apply(b, e)
            }
        }
        function I(a) {
            a = Error(a);
            a.toString = function() {
                return this.message
            };
            return a
        }
        function J(a, b) {
            for (var c = a.split(/\./), e = l, f = 0; f < c[x] - 1; f++) {
                e[c[f]] || (e[c[f]] = {});
                e = e[c[f]]
            }
            e[c[c[x] - 1]] = b
        }
        function K(a, b, c) {
            a[b] = c
        }
        if (!L) var L = J;
        if (!M) var M = K;
        google[A].t = {};
        L("google.loader.callbacks", google[A].t);
        var N = {},
        O = {};
        google[A].eval = {};
        L("google.loader.eval", google[A].eval);
        p(google,
        function(a, b, c) {
            function e(k) {
                var m = k.split(".");
                if (m[x] > 2) throw I("Module: '" + k + "' not found!");
                else if (typeof m[1] != "undefined") {
                    f = m[0];
                    c.packages = c.packages || [];
                    c.packages[q](m[1])
                }
            }
            var f = a;
            c = c || {};
            if (a instanceof Array || a && typeof a == "object" && typeof a[C] == "function" && typeof a.reverse == "function") for (var i = 0; i < a[x]; i++) e(a[i]);
            else e(a);
            if (a = N[":" + f]) {
                if (c && !c.language && c.locale) c.language = c.locale;
                if (c && typeof c.callback == "string") {
                    i = c.callback;
                    if (i.match(/^[[\]A-Za-z0-9._]+$/)) {
                        i = l.eval(i);
                        c.callback = i
                    }
                }
                if ((i = c && c.callback != g) && !a.s(b)) throw I("Module: '" + f + "' must be loaded before DOM onLoad!");
                else if (i) a.m(b, c) ? l[z](c.callback, 0) : a.load(b, c);
                else a.m(b, c) || a.load(b, c)
            } else throw I("Module: '" + f + "' not found!");
        });
        L("google.load", google.load);
        google.R = function(a, b) {
            if (b) {
                if (P[x] == 0) {
                    Q(l, "load", R);
                    if (!E("msie") && !(E("safari") || E("konqueror")) && E("mozilla") || l.opera) l.addEventListener("DOMContentLoaded", R, h);
                    else if (E("msie")) o.write("<script defer onreadystatechange='google.loader.domReady()' src=//:><\/script>");
                    else(E("safari") || E("konqueror")) && l[z](T, 10)
                }
                P[q](a)
            } else Q(l, "load", a)
        };
        L("google.setOnLoadCallback", google.R);
        function Q(a, b, c) {
            if (a.addEventListener) a.addEventListener(b, c, h);
            else if (a.attachEvent) a.attachEvent("on" + b, c);
            else {
                var e = a["on" + b];
                a["on" + b] = e != g ? aa([c, e]) : c
            }
        }
        function aa(a) {
            return function() {
                for (var b = 0; b < a[x]; b++) a[b]()
            }
        }
        var P = [];
        google[A].L = function() {
            var a = l.event.srcElement;
            if (a.readyState == "complete") {
                a.onreadystatechange = g;
                a.parentNode.removeChild(a);
                R()
            }
        };
        L("google.loader.domReady", google[A].L);
        var ba = {
            loaded: d,
            complete: d
        };
        function T() {
            if (ba[o.readyState]) R();
            else P[x] > 0 && l[z](T, 10)
        }
        function R() {
            for (var a = 0; a < P[x]; a++) P[a]();
            P.length = 0
        }
        google[A].d = function(a, b, c) {
            if (c) {
                var e;
                if (a == "script") {
                    e = o.createElement("script");
                    e.type = "text/javascript";
                    e.src = b
                } else if (a == "css") {
                    e = o.createElement("link");
                    e.type = "text/css";
                    e.href = b;
                    e.rel = "stylesheet"
                } (a = o.getElementsByTagName("head")[0]) || (a = o.body.parentNode.appendChild(o.createElement("head")));
                a.appendChild(e)
            } else if (a == "script") o.write('<script src="' + b + '" type="text/javascript"><\/script>');
            else a == "css" && o.write('<link href="' + b + '" type="text/css" rel="stylesheet"></link>')
        };
        L("google.loader.writeLoadTag", google[A].d);
        google[A].O = function(a) {
            O = a
        };
        L("google.loader.rfm", google[A].O);
        google[A].Q = function(a) {
            for (var b in a) if (typeof b == "string" && b && b[s](0) == ":" && !N[b]) N[b] = new U(b[B](1), a[b])
        };
        L("google.loader.rpl", google[A].Q);
        google[A].P = function(a) {
            if ((a = a.specs) && a[x]) for (var b = 0; b < a[x]; ++b) {
                var c = a[b];
                if (typeof c == "string") N[":" + c] = new V(c);
                else {
                    c = new W(c[v], c.baseSpec, c.customSpecs);
                    N[":" + c[v]] = c
                }
            }
        };
        L("google.loader.rm", google[A].P);
        google[A].loaded = function(a) {
            N[":" + a.module].k(a)
        };
        L("google.loader.loaded", google[A].loaded);
        google[A].K = function() {
            return "qid=" + ((new Date)[w]().toString(16) + Math.floor(Math.random() * 1E7).toString(16))
        };
        L("google.loader.createGuidArg_", google[A].K);
        J("google_exportSymbol", J);
        J("google_exportProperty", K);
        google[A].b = {};
        L("google.loader.themes", google[A].b);
        google[A].b.A = "http://www.google.com/cse/style/look/bubblegum.css";
        M(google[A].b, "BUBBLEGUM", google[A].b.A);
        google[A].b.C = "http://www.google.com/cse/style/look/greensky.css";
        M(google[A].b, "GREENSKY", google[A].b.C);
        google[A].b.B = "http://www.google.com/cse/style/look/espresso.css";
        M(google[A].b, "ESPRESSO", google[A].b.B);
        google[A].b.F = "http://www.google.com/cse/style/look/shiny.css";
        M(google[A].b, "SHINY", google[A].b.F);
        google[A].b.D = "http://www.google.com/cse/style/look/minimalist.css";
        M(google[A].b, "MINIMALIST", google[A].b.D);
        function V(a) {
            this.a = a;
            this.q = [];
            this.p = {};
            this.i = {};
            this.e = {};
            this.l = d;
            this.c = -1
        }
        V[y].g = function(a, b) {
            var c = "";
            if (b != n) {
                if (b.language != n) c += "&hl=" + j(b.language);
                if (b.nocss != n) c += "&output=" + j("nocss=" + b.nocss);
                if (b.nooldnames != n) c += "&nooldnames=" + j(b.nooldnames);
                if (b.packages != n) c += "&packages=" + j(b.packages);
                if (b.callback != g) c += "&async=2";
                if (b.style != n) c += "&style=" + j(b.style);
                if (b.other_params != n) c += "&" + b.other_params
            }
            if (!this.l) {
                if (google[this.a] && google[this.a].JSHash) c += "&sig=" + j(google[this.a].JSHash);
                var e = [],
                f;
                for (f in this.p) f[s](0) == ":" && e[q](f[B](1));
                for (f in this.i) f[s](0) == ":" && this.i[f] && e[q](f[B](1));
                c += "&have=" + j(e[C](","))
            }
            return google[A][u] + "/?file=" + this.a + "&v=" + a + google[A].AdditionalParams + c
        };
        V[y].v = function(a) {
            var b = g;
            if (a) b = a.packages;
            var c = g;
            if (b) if (typeof b == "string") c = [a.packages];
            else if (b[x]) {
                c = [];
                for (a = 0; a < b[x]; a++) typeof b[a] == "string" && c[q](b[a][r](/^\s*|\s*$/, "")[D]())
            }
            c || (c = ["default"]);
            b = [];
            for (a = 0; a < c[x]; a++) this.p[":" + c[a]] || b[q](c[a]);
            return b
        };
        p(V[y],
        function(a, b) {
            var c = this.v(b),
            e = b && b.callback != g;
            if (e) var f = new X(b.callback);
            for (var i = [], k = c[x] - 1; k >= 0; k--) {
                var m = c[k];
                e && f.G(m);
                if (this.i[":" + m]) {
                    c.splice(k, 1);
                    e && this.e[":" + m][q](f)
                } else i[q](m)
            }
            if (c[x]) {
                if (b && b.packages) b.packages = c.sort()[C](",");
                for (k = 0; k < i[x]; k++) {
                    m = i[k];
                    this.e[":" + m] = [];
                    e && this.e[":" + m][q](f)
                }
                if (!b && O[":" + this.a] != g && O[":" + this.a].versions[":" + a] != g && !google[A].AdditionalParams && this.l) {
                    c = O[":" + this.a];
                    google[this.a] = google[this.a] || {};
                    for (var S in c.properties) if (S && S[s](0) == ":") google[this.a][S[B](1)] = c.properties[S];
                    google[A].d("script", google[A][u] + c.path + c.js, e);
                    c.css && google[A].d("css", google[A][u] + c.path + c.css, e)
                } else if (!b || !b.autoloaded) google[A].d("script", this.g(a, b), e);
                if (this.l) {
                    this.l = h;
                    this.c = (new Date)[w]();
                    if (this.c % 100 != 1) this.c = -1
                }
                for (k = 0; k < i[x]; k++) {
                    m = i[k];
                    this.i[":" + m] = d
                }
            }
        });
        V[y].k = function(a) {
            if (this.c != -1) {
                ca("al_" + this.a, "jl." + ((new Date)[w]() - this.c), d);
                this.c = -1
            }
            this.q = this.q.concat(a.components);
            google[A][this.a] || (google[A][this.a] = {});
            google[A][this.a].packages = this.q.slice(0);
            for (var b = 0; b < a.components[x]; b++) {
                this.p[":" + a.components[b]] = d;
                this.i[":" + a.components[b]] = h;
                var c = this.e[":" + a.components[b]];
                if (c) {
                    for (var e = 0; e < c[x]; e++) c[e].J(a.components[b]);
                    delete this.e[":" + a.components[b]]
                }
            }
        };
        V[y].m = function(a, b) {
            return this.v(b)[x] == 0
        };
        V[y].s = function() {
            return d
        };
        function X(a) {
            this.I = a;
            this.n = {};
            this.r = 0
        }
        X[y].G = function(a) {
            this.r++;
            this.n[":" + a] = d
        };
        X[y].J = function(a) {
            if (this.n[":" + a]) {
                this.n[":" + a] = h;
                this.r--;
                this.r == 0 && l[z](this.I, 0)
            }
        };
        function W(a, b, c) {
            this.name = a;
            this.H = b;
            this.o = c;
            this.u = this.h = h;
            this.j = [];
            google[A].t[this[v]] = H(this.k, this)
        }
        G(W, V);
        p(W[y],
        function(a, b) {
            var c = b && b.callback != g;
            if (c) {
                this.j[q](b.callback);
                b.callback = "google.loader.callbacks." + this[v]
            } else this.h = d;
            if (!b || !b.autoloaded) google[A].d("script", this.g(a, b), c)
        });
        W[y].m = function(a, b) {
            return b && b.callback != g ? this.u: this.h
        };
        W[y].k = function() {
            this.u = d;
            for (var a = 0; a < this.j[x]; a++) l[z](this.j[a], 0);
            this.j = []
        };
        var Y = function(a, b) {
            return a.string ? j(a.string) + "=" + j(b) : a.regex ? b[r](/(^.*$)/, a.regex) : ""
        };
        W[y].g = function(a, b) {
            return this.M(this.w(a), a, b)
        };
        W[y].M = function(a, b, c) {
            var e = "";
            if (a.key) e += "&" + Y(a.key, google[A].ApiKey);
            if (a.version) e += "&" + Y(a.version, b);
            b = google[A].Secure && a.ssl ? a.ssl: a.uri;
            if (c != g) for (var f in c) if (a.params[f]) e += "&" + Y(a.params[f], c[f]);
            else if (f == "other_params") e += "&" + c[f];
            else if (f == "base_domain") b = "http://" + c[f] + a.uri[B](a.uri[t]("/", 7));
            google[this[v]] = {};
            if (b[t]("?") == -1 && e) e = "?" + e[B](1);
            return b + e
        };
        W[y].s = function(a) {
            return this.w(a).deferred
        };
        W[y].w = function(a) {
            if (this.o) for (var b = 0; b < this.o[x]; ++b) {
                var c = this.o[b];
                if (RegExp(c.pattern).test(a)) return c
            }
            return this.H
        };
        function U(a, b) {
            this.a = a;
            this.f = b;
            this.h = h
        }
        G(U, V);
        p(U[y],
        function(a, b) {
            this.h = d;
            google[A].d("script", this.g(a, b), h)
        });
        U[y].m = function() {
            return this.h
        };
        U[y].k = function() {};
        U[y].g = function(a, b) {
            if (!this.f.versions[":" + a]) {
                if (this.f.aliases) {
                    var c = this.f.aliases[":" + a];
                    if (c) a = c
                }
                if (!this.f.versions[":" + a]) throw I("Module: '" + this.a + "' with version '" + a + "' not found!");
            }
            return google[A].GoogleApisBase + "/libs/" + this.a + "/" + a + "/" + this.f.versions[":" + a][b && b.uncompressed ? "uncompressed": "compressed"]
        };
        U[y].s = function() {
            return h
        };
        var da = h,
        Z = [],
        ea = (new Date)[w](),
        ca = function(a, b, c) {
            if (!da) {
                Q(l, "unload", fa);
                da = d
            }
            if (c) {
                if (!google[A].Secure && (!google[A].Options || google[A].Options.csi === h)) {
                    a = a[D]()[r](/[^a-z0-9_.]+/g, "_");
                    b = b[D]()[r](/[^a-z0-9_.]+/g, "_");
                    l[z](H($, g, "//gg.google.com/csi?s=uds&v=2&action=" + j(a) + "&it=" + j(b)), 1E4)
                }
            } else {
                Z[q]("r" + Z[x] + "=" + j(a + (b ? "|" + b: "")));
                l[z](fa, Z[x] > 5 ? 0 : 15E3)
            }
        },
        fa = function() {
            if (Z[x]) {
                var a = google[A][u];
                if (a[t]("http:") == 0) a = a[r](/^http:/, "https:");
                $(a + "/stats?" + Z[C]("&") + "&nc=" + (new Date)[w]() + "_" + ((new Date)[w]() - ea));
                Z.length = 0
            }
        },
        $ = function(a) {
            var b = new Image,
            c = $.N++;
            $.z[c] = b;
            b.onload = b.onerror = function() {
                delete $.z[c]
            };
            b.src = a;
            b = g
        };
        $.z = {};
        $.N = 0;
        J("google.loader.recordStat", ca);
        J("google.loader.createImageForLogging", $);

    })();
    google.loader.rm({
        "specs": [{
            "name": "books",
            "baseSpec": {
                "uri": "http://books.google.com/books/api.js",
                "ssl": null,
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": true,
                "params": {
                    "callback": {
                        "string": "callback"
                    },
                    "language": {
                        "string": "hl"
                    }
                }
            }
        },
        "feeds", {
            "name": "friendconnect",
            "baseSpec": {
                "uri": "http://www.google.com/friendconnect/script/friendconnect.js",
                "ssl": null,
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": false,
                "params": {}
            }
        },
        "spreadsheets", "gdata", "visualization", {
            "name": "sharing",
            "baseSpec": {
                "uri": "http://www.google.com/s2/sharing/js",
                "ssl": null,
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": false,
                "params": {
                    "language": {
                        "string": "hl"
                    }
                }
            }
        },
        "search", {
            "name": "maps",
            "baseSpec": {
                "uri": "http://maps.google.com/maps?file\u003dgoogleapi",
                "ssl": "https://maps-api-ssl.google.com/maps?file\u003dgoogleapi",
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": true,
                "params": {
                    "callback": {
                        "regex": "callback\u003d$1\u0026async\u003d2"
                    },
                    "language": {
                        "string": "hl"
                    }
                }
            },
            "customSpecs": [{
                "uri": "http://maps.google.com/maps/api/js",
                "ssl": "https://maps-api-ssl.google.com/maps/api/js",
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": true,
                "params": {
                    "callback": {
                        "string": "callback"
                    },
                    "language": {
                        "string": "hl"
                    }
                },
                "pattern": "^(3|3..*)$"
            }]
        },
        "annotations_v2", "wave", "orkut", {
            "name": "annotations",
            "baseSpec": {
                "uri": "http://www.google.com/reviews/scripts/annotations_bootstrap.js",
                "ssl": null,
                "key": {
                    "string": "key"
                },
                "version": {
                    "string": "v"
                },
                "deferred": true,
                "params": {
                    "callback": {
                        "string": "callback"
                    },
                    "language": {
                        "string": "hl"
                    },
                    "country": {
                        "string": "gl"
                    }
                }
            }
        },
        "language", "earth", "ads", "elements"]
    });
    google.loader.rfm({
        ":search": {
            "versions": {
                ":1": "1",
                ":1.0": "1"
            },
            "path": "/api/search/1.0/3268c2f995b8fbd3048de51c45033694/",
            "js": "default+zh_CN.I.js",
            "css": "default.css",
            "properties": {
                ":JSHash": "3268c2f995b8fbd3048de51c45033694",
                ":NoOldNames": false,
                ":Version": "1.0"
            }
        },
        ":language": {
            "versions": {
                ":1": "1",
                ":1.0": "1"
            },
            "path": "/api/language/1.0/ec9ac263edc07a5d2dc73beff6c05cdb/",
            "js": "default+zh_CN.I.js",
            "properties": {
                ":JSHash": "ec9ac263edc07a5d2dc73beff6c05cdb",
                ":Version": "1.0"
            }
        },
        ":feeds": {
            "versions": {
                ":1": "1",
                ":1.0": "1"
            },
            "path": "/api/feeds/1.0/4af0f9d507d970221e7badc56cb6f35a/",
            "js": "default+zh_CN.I.js",
            "css": "default.css",
            "properties": {
                ":JSHash": "4af0f9d507d970221e7badc56cb6f35a",
                ":Version": "1.0"
            }
        },
        ":wave": {
            "versions": {
                ":1": "1",
                ":1.0": "1"
            },
            "path": "/api/wave/1.0/3b6f7573ff78da6602dda5e09c9025bf/",
            "js": "default.I.js",
            "properties": {
                ":JSHash": "3b6f7573ff78da6602dda5e09c9025bf",
                ":Version": "1.0"
            }
        },
        ":spreadsheets": {
            "versions": {
                ":0": "1",
                ":0.4": "1"
            },
            "path": "/api/spreadsheets/0.4/87ff7219e9f8a8164006cbf28d5e911a/",
            "js": "default.I.js",
            "properties": {
                ":JSHash": "87ff7219e9f8a8164006cbf28d5e911a",
                ":Version": "0.4"
            }
        },
        ":earth": {
            "versions": {
                ":1": "1",
                ":1.0": "1"
            },
            "path": "/api/earth/1.0/a53f4e87830de2a72937039b5507ebdc/",
            "js": "default.I.js",
            "properties": {
                ":JSHash": "a53f4e87830de2a72937039b5507ebdc",
                ":Version": "1.0"
            }
        },
        ":annotations": {
            "versions": {
                ":1": "1",
                ":1.0": "1"
            },
            "path": "/api/annotations/1.0/ba219049fd4ec6fddec720b86f9a305f/",
            "js": "default+en.I.js",
            "properties": {
                ":JSHash": "ba219049fd4ec6fddec720b86f9a305f",
                ":Version": "1.0"
            }
        }
    });
    google.loader.rpl({
        ":scriptaculous": {
            "versions": {
                ":1.8.3": {
                    "uncompressed": "scriptaculous.js",
                    "compressed": "scriptaculous.js"
                },
                ":1.8.2": {
                    "uncompressed": "scriptaculous.js",
                    "compressed": "scriptaculous.js"
                },
                ":1.8.1": {
                    "uncompressed": "scriptaculous.js",
                    "compressed": "scriptaculous.js"
                }
            },
            "aliases": {
                ":1.8": "1.8.3",
                ":1": "1.8.3"
            }
        },
        ":yui": {
            "versions": {
                ":2.6.0": {
                    "uncompressed": "build/yuiloader/yuiloader.js",
                    "compressed": "build/yuiloader/yuiloader-min.js"
                },
                ":2.7.0": {
                    "uncompressed": "build/yuiloader/yuiloader.js",
                    "compressed": "build/yuiloader/yuiloader-min.js"
                },
                ":2.8.0r4": {
                    "uncompressed": "build/yuiloader/yuiloader.js",
                    "compressed": "build/yuiloader/yuiloader-min.js"
                },
                ":2.8.2r1": {
                    "uncompressed": "build/yuiloader/yuiloader.js",
                    "compressed": "build/yuiloader/yuiloader-min.js"
                },
                ":2.8.1": {
                    "uncompressed": "build/yuiloader/yuiloader.js",
                    "compressed": "build/yuiloader/yuiloader-min.js"
                },
                ":3.3.0": {
                    "uncompressed": "build/yui/yui.js",
                    "compressed": "build/yui/yui-min.js"
                }
            },
            "aliases": {
                ":3": "3.3.0",
                ":2": "2.8.2r1",
                ":2.7": "2.7.0",
                ":2.8.2": "2.8.2r1",
                ":2.6": "2.6.0",
                ":2.8": "2.8.2r1",
                ":2.8.0": "2.8.0r4",
                ":3.3": "3.3.0"
            }
        },
        ":swfobject": {
            "versions": {
                ":2.1": {
                    "uncompressed": "swfobject_src.js",
                    "compressed": "swfobject.js"
                },
                ":2.2": {
                    "uncompressed": "swfobject_src.js",
                    "compressed": "swfobject.js"
                }
            },
            "aliases": {
                ":2": "2.2"
            }
        },
        ":webfont": {
            "versions": {
                ":1.0.2": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.1": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.0": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.6": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.5": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.18": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.4": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.17": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.16": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.3": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.9": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.12": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.13": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.14": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.15": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.10": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                },
                ":1.0.11": {
                    "uncompressed": "webfont_debug.js",
                    "compressed": "webfont.js"
                }
            },
            "aliases": {
                ":1": "1.0.18",
                ":1.0": "1.0.18"
            }
        },
        ":ext-core": {
            "versions": {
                ":3.1.0": {
                    "uncompressed": "ext-core-debug.js",
                    "compressed": "ext-core.js"
                },
                ":3.0.0": {
                    "uncompressed": "ext-core-debug.js",
                    "compressed": "ext-core.js"
                }
            },
            "aliases": {
                ":3": "3.1.0",
                ":3.0": "3.0.0",
                ":3.1": "3.1.0"
            }
        },
        ":mootools": {
            "versions": {
                ":1.2.3": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.1.1": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.2.4": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.3.0": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.2.1": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.2.2": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.2.5": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                },
                ":1.1.2": {
                    "uncompressed": "mootools.js",
                    "compressed": "mootools-yui-compressed.js"
                }
            },
            "aliases": {
                ":1": "1.1.2",
                ":1.11": "1.1.1",
                ":1.3": "1.3.0",
                ":1.2": "1.2.5",
                ":1.1": "1.1.2"
            }
        },
        ":jqueryui": {
            "versions": {
                ":1.6.0": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.0": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.2": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.1": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.9": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.7": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.8": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.7.2": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.5": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.7.3": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.6": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.7.0": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.8.4": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.7.1": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.5.3": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                },
                ":1.5.2": {
                    "uncompressed": "jquery-ui.js",
                    "compressed": "jquery-ui.min.js"
                }
            },
            "aliases": {
                ":1.8": "1.8.9",
                ":1.7": "1.7.3",
                ":1.6": "1.6.0",
                ":1": "1.8.9",
                ":1.5": "1.5.3",
                ":1.8.3": "1.8.4"
            }
        },
        ":chrome-frame": {
            "versions": {
                ":1.0.2": {
                    "uncompressed": "CFInstall.js",
                    "compressed": "CFInstall.min.js"
                },
                ":1.0.1": {
                    "uncompressed": "CFInstall.js",
                    "compressed": "CFInstall.min.js"
                },
                ":1.0.0": {
                    "uncompressed": "CFInstall.js",
                    "compressed": "CFInstall.min.js"
                }
            },
            "aliases": {
                ":1": "1.0.2",
                ":1.0": "1.0.2"
            }
        },
        ":prototype": {
            "versions": {
                ":1.7.0.0": {
                    "uncompressed": "prototype.js",
                    "compressed": "prototype.js"
                },
                ":1.6.0.2": {
                    "uncompressed": "prototype.js",
                    "compressed": "prototype.js"
                },
                ":1.6.1.0": {
                    "uncompressed": "prototype.js",
                    "compressed": "prototype.js"
                },
                ":1.6.0.3": {
                    "uncompressed": "prototype.js",
                    "compressed": "prototype.js"
                }
            },
            "aliases": {
                ":1.7": "1.7.0.0",
                ":1.6.1": "1.6.1.0",
                ":1": "1.7.0.0",
                ":1.6": "1.6.1.0",
                ":1.7.0": "1.7.0.0",
                ":1.6.0": "1.6.0.3"
            }
        },
        ":jquery": {
            "versions": {
                ":1.2.3": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.3.1": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.3.0": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.3.2": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.2.6": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.4.3": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.4.4": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.5.0": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.4.0": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.4.1": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                },
                ":1.4.2": {
                    "uncompressed": "jquery.js",
                    "compressed": "jquery.min.js"
                }
            },
            "aliases": {
                ":1": "1.5.0",
                ":1.5": "1.5.0",
                ":1.4": "1.4.4",
                ":1.3": "1.3.2",
                ":1.2": "1.2.6"
            }
        },
        ":dojo": {
            "versions": {
                ":1.2.3": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.3.1": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.1.1": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.3.0": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.3.2": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.4.3": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.5.0": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.2.0": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.4.0": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                },
                ":1.4.1": {
                    "uncompressed": "dojo/dojo.xd.js.uncompressed.js",
                    "compressed": "dojo/dojo.xd.js"
                }
            },
            "aliases": {
                ":1": "1.5.0",
                ":1.5": "1.5.0",
                ":1.4": "1.4.3",
                ":1.3": "1.3.2",
                ":1.2": "1.2.3",
                ":1.1": "1.1.1"
            }
        }
    });
}