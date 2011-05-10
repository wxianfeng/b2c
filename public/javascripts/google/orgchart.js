(function() {
    /**
 * SWFObject v1.4.2: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * **SWFObject is the SWF embed script formerly known as FlashObject. The name was changed for
 *   legal reasons.
 */
    if (typeof deconcept == "undefined") {
        var deconcept = new Object();
    }
    if (typeof deconcept.util == "undefined") {
        deconcept.util = new Object();
    }
    if (typeof deconcept.SWFObjectUtil == "undefined") {
        deconcept.SWFObjectUtil = new Object();
    }
    deconcept.SWFObject = function(_1, id, w, h, _5, c, _7, _8, _9, _a, _b) {
        if (!document.getElementById) {
            return;
        }
        this.DETECT_KEY = _b ? _b: "detectflash";
        this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
        this.params = new Object();
        this.variables = new Object();
        this.attributes = new Array();
        if (_1) {
            this.setAttribute("swf", _1);
        }
        if (id) {
            this.setAttribute("id", id);
        }
        if (w) {
            this.setAttribute("width", w);
        }
        if (h) {
            this.setAttribute("height", h);
        }
        if (_5) {
            this.setAttribute("version", new deconcept.PlayerVersion(_5.toString().split(".")));
        }
        this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
        if (c) {
            this.addParam("bgcolor", c);
        }
        var q = _8 ? _8: "high";
        this.addParam("quality", q);
        this.setAttribute("useExpressInstall", _7);
        this.setAttribute("doExpressInstall", false);
        var _d = (_9) ? _9: window.location;
        this.setAttribute("xiRedirectUrl", _d);
        this.setAttribute("redirectUrl", "");
        if (_a) {
            this.setAttribute("redirectUrl", _a);
        }
    };
    deconcept.SWFObject.prototype = {
        setAttribute: function(_e, _f) {
            this.attributes[_e] = _f;
        },
        getAttribute: function(_10) {
            return this.attributes[_10];
        },
        addParam: function(_11, _12) {
            this.params[_11] = _12;
        },
        getParams: function() {
            return this.params;
        },
        addVariable: function(_13, _14) {
            this.variables[_13] = _14;
        },
        getVariable: function(_15) {
            return this.variables[_15];
        },
        getVariables: function() {
            return this.variables;
        },
        getVariablePairs: function() {
            var _16 = new Array();
            var key;
            var _18 = this.getVariables();
            for (key in _18) {
                _16.push(key + "=" + _18[key]);
            }
            return _16;
        },
        getSWFHTML: function() {
            var _19 = "";
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                if (this.getAttribute("doExpressInstall")) {
                    this.addVariable("MMplayerType", "PlugIn");
                }
                _19 = "<embed type=\"application/x-shockwave-flash\" src=\"" + this.getAttribute("swf") + "\" width=\"" + this.getAttribute("width") + "\" height=\"" + this.getAttribute("height") + "\"";
                _19 += " id=\"" + this.getAttribute("id") + "\" name=\"" + this.getAttribute("id") + "\" ";
                var _1a = this.getParams();
                for (var key in _1a) {
                    _19 += key + "=\"" + _1a[key] + "\" ";
                }
                var _1c = this.getVariablePairs().join("&");
                if (_1c.length > 0) {
                    _19 += "flashvars=\"" + _1c + "\"";
                }
                _19 += "/>";
            } else {
                if (this.getAttribute("doExpressInstall")) {
                    this.addVariable("MMplayerType", "ActiveX");
                }
                _19 = "<object id=\"" + this.getAttribute("id") + "\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"" + this.getAttribute("width") + "\" height=\"" + this.getAttribute("height") + "\">";
                _19 += "<param name=\"movie\" value=\"" + this.getAttribute("swf") + "\" />";
                var _1d = this.getParams();
                for (var key in _1d) {
                    _19 += "<param name=\"" + key + "\" value=\"" + _1d[key] + "\" />";
                }
                var _1f = this.getVariablePairs().join("&");
                if (_1f.length > 0) {
                    _19 += "<param name=\"flashvars\" value=\"" + _1f + "\" />";
                }
                _19 += "</object>";
            }
            return _19;
        },
        write: function(_20) {
            if (this.getAttribute("useExpressInstall")) {
                var _21 = new deconcept.PlayerVersion([6, 0, 65]);
                if (this.installedVer.versionIsValid(_21) && !this.installedVer.versionIsValid(this.getAttribute("version"))) {
                    this.setAttribute("doExpressInstall", true);
                    this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl")));
                    document.title = document.title.slice(0, 47) + " - Flash Player Installation";
                    this.addVariable("MMdoctitle", document.title);
                }
            }
            if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
                var n = (typeof _20 == "string") ? document.getElementById(_20) : _20;
                n.innerHTML = this.getSWFHTML();
                return true;
            } else {
                if (this.getAttribute("redirectUrl") != "") {
                    document.location.replace(this.getAttribute("redirectUrl"));
                }
            }
            return false;
        }
    };
    deconcept.SWFObjectUtil.getPlayerVersion = function() {
        var _23 = new deconcept.PlayerVersion([0, 0, 0]);
        if (navigator.plugins && navigator.mimeTypes.length) {
            var x = navigator.plugins["Shockwave Flash"];
            if (x && x.description) {
                _23 = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
            }
        } else {
            try {
                var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            } catch(e) {
                try {
                    var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    _23 = new deconcept.PlayerVersion([6, 0, 21]);
                    axo.AllowScriptAccess = "always";
                } catch(e) {
                    if (_23.major == 6) {
                        return _23;
                    }
                }
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch(e) {}
            }
            if (axo != null) {
                _23 = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
            }
        }
        return _23;
    };
    deconcept.PlayerVersion = function(_27) {
        this.major = _27[0] != null ? parseInt(_27[0], 10) : 0;
        this.minor = _27[1] != null ? parseInt(_27[1], 10) : 0;
        this.rev = _27[2] != null ? parseInt(_27[2], 10) : 0;
    };
    deconcept.PlayerVersion.prototype.versionIsValid = function(fv) {
        if (this.major < fv.major) {
            return false;
        }
        if (this.major > fv.major) {
            return true;
        }
        if (this.minor < fv.minor) {
            return false;
        }
        if (this.minor > fv.minor) {
            return true;
        }
        if (this.rev < fv.rev) {
            return false;
        }
        return true;
    };
    deconcept.util = {
        getRequestParameter: function(_29) {
            var q = document.location.search || document.location.hash;
            if (q) {
                var _2b = q.substring(1).split("&");
                for (var i = 0; i < _2b.length; i++) {
                    if (_2b[i].substring(0, _2b[i].indexOf("=")) == _29) {
                        return _2b[i].substring((_2b[i].indexOf("=") + 1));
                    }
                }
            }
            return "";
        }
    };
    deconcept.SWFObjectUtil.cleanupSWFs = function() {
        var _2d = document.getElementsByTagName("OBJECT");
        for (var i = 0; i < _2d.length; i++) {
            _2d[i].style.display = "none";
            for (var x in _2d[i]) {
                if (typeof _2d[i][x] == "function") {
                    _2d[i][x] = null;
                }
            }
        }
    };
    if (typeof window.onunload == "function") {
        if (!deconcept.SWFObjectUtil.cleanupInstalled) {
            deconcept.SWFObjectUtil.cleanupInstalled = true;
            var oldunload = window.onunload;
            window.onunload = function() {
                deconcept.SWFObjectUtil.cleanupSWFs();
                oldunload();
            };
        }
    } else {
        window.onunload = deconcept.SWFObjectUtil.cleanupSWFs;
        deconcept.SWFObjectUtil.cleanupInstalled = true;
    }
    if (Array.prototype.push == null) {
        Array.prototype.push = function(_30) {
            this[this.length] = _30;
            return this.length;
        };
    }

    var getQueryParamValue = deconcept.util.getRequestParameter;
    var FlashObject = deconcept.SWFObject; // for legacy support
    var SWFObject = deconcept.SWFObject; (function() {
        if (window["__gvizguard__"]) return;
        function e(a) {
            throw a;
        }
        var h = true,
        i = null,
        k = false,
        aa = Infinity,
        l = Error,
        ba = clearInterval,
        m = undefined,
        ca = encodeURIComponent,
        o = google_exportSymbol,
        da = parseInt,
        ea = parseFloat,
        fa = String,
        ia = window,
        ja = isFinite,
        ka = Number,
        la = Object,
        ma = document,
        na = google,
        oa = decodeURIComponent,
        pa = isNaN,
        p = google_exportProperty,
        qa = RegExp,
        r = Math,
        ra = Array;
        function sa(a, b) {
            return a.length = b
        }
        function ta(a, b) {
            return a.setValue = b
        }
        function ua(a, b) {
            return a.className = b
        }
        function va(a, b) {
            return a.width = b
        }
        function wa(a, b) {
            return a.innerHTML = b
        }
        function xa(a, b) {
            return a.currentTarget = b
        }
        function ya(a, b) {
            return a.left = b
        }
        function za(a, b) {
            return a.clone = b
        }
        function Aa(a, b) {
            return a.target = b
        }
        function Ba(a, b) {
            return a.screenX = b
        }
        function Ca(a, b) {
            return a.screenY = b
        }
        function Ea(a, b) {
            return a.format = b
        }
        function Fa(a, b) {
            return a.keyCode = b
        }
        function Ga(a, b) {
            return a.handleEvent = b
        }
        function Ha(a, b) {
            return a.type = b
        }
        function Ia(a, b) {
            return a.contains = b
        }
        function Ja(a, b) {
            return a.clear = b
        }
        function Ka(a, b) {
            return a.setContent = b
        }
        function La(a, b) {
            return a.getValue = b
        }
        function Ma(a, b) {
            return a.display = b
        }
        function Na(a, b) {
            return a.height = b
        }
        function Oa(a, b) {
            return a.clientX = b
        }
        function Pa(a, b) {
            return a.clientY = b
        }
        function Qa(a, b) {
            return a.visibility = b
        }
        var Ra = "appendChild",
        Sa = "scrollTop",
        s = "push",
        Ta = "toString",
        Ua = "getMonth",
        Va = "altKey",
        Wa = "setStart",
        Xa = "getNumberOfRows",
        Ya = "isCollapsed",
        Za = "trigger",
        t = "length",
        $a = "propertyIsEnumerable",
        ab = "getBoundingClientRect",
        bb = "getProperties",
        cb = "addError",
        db = "open",
        eb = "DataTable",
        u = "prototype",
        gb = "test",
        hb = "toJSON",
        ib = "setValue",
        jb = "clearTimeout",
        kb = "exec",
        w = "width",
        lb = "collapse",
        mb = "clientWidth",
        nb = "round",
        ob = "abort",
        pb = "slice",
        qb = "setTimeout",
        x = "replace",
        rb = "nodeType",
        sb = "document",
        tb = "removeEventListener",
        ub = "events",
        vb = "getSeconds",
        wb = "ctrlKey",
        xb = "split",
        yb = "floor",
        zb = "getElementById",
        Ab = "getOptions",
        Cb = "RequestParameters",
        Db = "offsetWidth",
        Eb = "getColumnProperty",
        Fb = "concat",
        Gb = "constructor",
        Hb = "charAt",
        Ib = "createTextNode",
        Jb = "getNumberOfColumns",
        Kb = "stopPropagation",
        Lb = "getDate",
        Mb = "value",
        Nb = "getDataTable",
        Ob = "location",
        Pb = "preventDefault",
        Qb = "setFormattedValue",
        Rb = "insertBefore",
        Sb = "visualization",
        y = "indexOf",
        Tb = "disabled",
        Ub = "message",
        Vb = "hasOwnProperty",
        Wb = "setEnd",
        z = "dispatchEvent",
        Xb = "style",
        Yb = "getProperty",
        Zb = "getColumnProperties",
        $b = "setQuery",
        cc = "nodeName",
        dc = "body",
        C = "left",
        ec = "removeChild",
        fc = "clone",
        gc = "target",
        hc = "setColumnProperties",
        ic = "screenX",
        jc = "screenY",
        kc = "lastChild",
        E = "call",
        lc = "match",
        mc = "format",
        nc = "getBoxObjectFor",
        oc = "send",
        pc = "isOpen",
        qc = "charCode",
        rc = "removeAll",
        sc = "remove",
        tc = "start",
        uc = "lastIndexOf",
        vc = "isError",
        wc = "focus",
        xc = "draw",
        yc = "createElement",
        zc = "getColumnLabel",
        Ac = "setProperty",
        Bc = "toDataTable",
        Cc = "scrollHeight",
        Dc = "keyCode",
        Ec = "getColumnType",
        Fc = "firstChild",
        Gc = "getFullYear",
        Hc = "getSortedRows",
        Ic = "DataView",
        Jc = "forEach",
        Kc = "getColumnRange",
        Lc = "clientHeight",
        Mc = "addRange",
        Nc = "scrollLeft",
        Oc = "charCodeAt",
        Pc = "clientLeft",
        Qc = "getChartType",
        Rc = "getTableRowIndex",
        Sc = "addEventListener",
        Tc = "bottom",
        Uc = "setAttribute",
        Vc = "href",
        Wc = "substring",
        Xc = "clientTop",
        Yc = "handleEvent",
        Zc = "getRowProperties",
        $c = "setRefreshInterval",
        F = "type",
        ad = "apply",
        bd = "childNodes",
        cd = "shiftKey",
        dd = "tagName",
        ed = "addColumn",
        fd = "setPosition",
        gd = "getFormattedValue",
        hd = "errors",
        id = "defaultView",
        jd = "setCell",
        kd = "setContent",
        ld = "name",
        md = "parentNode",
        nd = "getHours",
        H = "getValue",
        od = "getMinutes",
        pd = "label",
        qd = "offsetTop",
        I = "height",
        rd = "splice",
        sd = "getTime",
        td = "offsetHeight",
        ud = "join",
        vd = "addRows",
        wd = "setColumns",
        xd = "setActive",
        yd = "getElementsByTagName",
        zd = "toLowerCase",
        Ad = "clientX",
        Bd = "clientY",
        Cd = "documentElement",
        Dd = "substr",
        Ed = "right",
        Fd = "getTimezoneOffset",
        K, Gd = Gd || {},
        L = this,
        Hd = i,
        Id = ".";
        function Jd(a, b) {
            for (var c = a[xb](Id), d = b || L, f; f = c.shift();) if (Kd(d[f])) d = d[f];
            else return i;
            return d
        }
        function Ld() {}
        function Md(a) {
            a.ja = function() {
                return a.Y || (a.Y = new a)
            }
        }
        var Nd = "object",
        Od = "[object Array]",
        O = "number",
        Pd = "splice",
        Qd = "array",
        Rd = "[object Function]",
        Sd = "call",
        Td = "function",
        Ud = "null";
        function Vd(a) {
            var b = typeof a;
            if (b == Nd) if (a) {
                if (a instanceof ra || !(a instanceof la) && la[u][Ta][E](a) == Od || typeof a[t] == O && typeof a[rd] != "undefined" && typeof a[$a] != "undefined" && !a[$a](Pd)) return Qd;
                if (! (a instanceof la) && (la[u][Ta][E](a) == Rd || typeof a[E] != "undefined" && typeof a[$a] != "undefined" && !a[$a](Sd))) return Td
            } else return Ud;
            else if (b == Td && typeof a[E] == "undefined") return Nd;
            return b
        }
        function Kd(a) {
            return a != i
        }
        function Wd(a) {
            return Vd(a) == Qd
        }
        function Xd(a) {
            var b = Vd(a);
            return b == Qd || b == Nd && typeof a[t] == O
        }
        function Yd(a) {
            return Zd(a) && typeof a[Gc] == Td
        }
        var P = "string";
        function Q(a) {
            return typeof a == P
        }
        function $d(a) {
            return typeof a == O
        }
        function ae(a) {
            return Vd(a) == Td
        }
        function Zd(a) {
            a = Vd(a);
            return a == Nd || a == Qd || a == Td
        }
        function be(a) {
            return a[ce] || (a[ce] = ++de)
        }
        var ce = "closure_uid_" + r[yb](r.random() * 2147483648)[Ta](36),
        de = 0;
        function ee(a) {
            var b = Vd(a);
            if (b == Nd || b == Qd) {
                if (a[fc]) return a[fc]();
                b = b == Qd ? [] : {};
                for (var c in a) b[c] = ee(a[c]);
                return b
            }
            return a
        }
        function fe(a) {
            return a[E][ad](a.bind, arguments)
        }
        function ge(a, b) {
            var c = b || L;
            if (arguments[t] > 2) {
                var d = ra[u][pb][E](arguments, 2);
                return function() {
                    var f = ra[u][pb][E](arguments);
                    ra[u].unshift[ad](f, d);
                    return a[ad](c, f)
                }
            } else return function() {
                return a[ad](c, arguments)
            }
        }
        var he = "native code";
        function ie() {
            ie = Function[u].bind && Function[u].bind[Ta]()[y](he) != -1 ? fe: ge;
            return ie[ad](i, arguments)
        }
        function je(a) {
            var b = ra[u][pb][E](arguments, 1);
            return function() {
                var c = ra[u][pb][E](arguments);
                c.unshift[ad](c, b);
                return a[ad](this, c)
            }
        }
        var ke = Date.now ||
        function() {
            return + new Date
        },
        le = "JavaScript",
        me = "var _et_ = 1;",
        ne = "script",
        oe = "text/javascript";
        function pe(a) {
            if (L.execScript) L.execScript(a, le);
            else if (L.eval) {
                if (Hd == i) {
                    L.eval(me);
                    if (typeof L._et_ != "undefined") {
                        delete L._et_;
                        Hd = h
                    } else Hd = k
                }
                if (Hd) L.eval(a);
                else {
                    var b = L[sb],
                    c = b[yc](ne);
                    Ha(c, oe);
                    c.defer = k;
                    c[Ra](b[Ib](a));
                    b[dc][Ra](c);
                    b[dc][ec](c)
                }
            } else e(l("goog.globalEval not available"))
        }
        function R(a, b) {
            function c() {}
            c.prototype = b[u];
            a.b = b[u];
            a.prototype = new c;
            a[u].constructor = a
        };
        function qe() {}
        var S = "";
        qe[u].Fl = function(a) {
            var b = [];
            this.Df(a, b);
            return b[ud](S)
        };
        var re = "boolean";
        qe[u].Df = function(a, b) {
            switch (typeof a) {
            case P:
                this.Jh(a, b);
                break;
            case O:
                this.Hl(a, b);
                break;
            case re:
                b[s](a);
                break;
            case "undefined":
                b[s](Ud);
                break;
            case Nd:
                if (a == i) {
                    b[s](Ud);
                    break
                }
                if (Wd(a)) {
                    this.Gl(a, b);
                    break
                }
                this.Il(a, b);
                break;
            case Td:
                break;
            default:
                e(l("Unknown type: " + typeof a))
            }
        };
        var se = "\\\\",
        te = {
            '"': '\\"',
            "\\": se,
            "/": "\\/",
            "\u0008": "\\b",
            "\u000c": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\u000b": "\\u000b"
        },
        ue = /\uffff/ [gb]("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g: /[\\\"\x00-\x1f\x7f-\xff]/g,
        ve = '"',
        we = "\\u",
        xe = "000",
        ye = "00",
        ze = "0";
        qe[u].Jh = function(a, b) {
            b[s](ve, a[x](ue,
            function(c) {
                if (c in te) return te[c];
                var d = c[Oc](0),
                f = we;
                if (d < 16) f += xe;
                else if (d < 256) f += ye;
                else if (d < 4096) f += ze;
                return te[c] = f + d[Ta](16)
            }), ve)
        };
        qe[u].Hl = function(a, b) {
            b[s](ja(a) && !pa(a) ? a: Ud)
        };
        var Ae = "[",
        Be = ",",
        Ce = "]";
        qe[u].Gl = function(a, b) {
            var c = a[t];
            b[s](Ae);
            for (var d = S,
            f = 0; f < c; f++) {
                b[s](d);
                this.Df(a[f], b);
                d = Be
            }
            b[s](Ce)
        };
        var De = "{",
        Ee = ":",
        Fe = "}";
        qe[u].Il = function(a, b) {
            b[s](De);
            var c = S,
            d;
            for (d in a) if (a[Vb](d)) {
                var f = a[d];
                if (typeof f != Td) {
                    b[s](c);
                    this.Jh(d, b);
                    b[s](Ee);
                    this.Df(f, b);
                    c = Be
                }
            }
            b[s](Fe)
        };
        function Ge(a) {
            a = He(a, Ie);
            return (new qe).Fl(a)
        }
        var Je = "@",
        Ke = "(",
        Le = ")";
        function Me(a) {
            a: {
                var b = fa(a),
                c;
                c = b;
                if (/^\s*$/ [gb](c)) c = k;
                else {
                    var d = /\\["\\\/bfnrtu]/g,
                    f = /"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    g = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,
                    j = /^[\],:{}\s\u2028\u2029]*$/;
                    c = j[gb](c[x](d, Je)[x](f, Ce)[x](g, S))
                }
                if (c) try {
                    eval(Ke + b + Le);
                    break a
                } catch(n) {}
                e(l("Invalid JSON string: " + b))
            }
            return Ne(a)
        }
        function Ne(a) {
            a = Oe(a);
            a = Ke + a + Le;
            return eval(a)
        }
        function He(a, b) {
            a = b(a);
            var c = Vd(a);
            if (c == Nd || c == Qd) {
                c = c == Qd ? [] : {};
                for (var d in a) {
                    var f = He(a[d], b);
                    if (f !== m) c[d] = f
                }
            } else c = a;
            return c
        }
        var Pe = "new ";
        function Oe(a) {
            var b = /"(Date\([\d,\s]*\))"/g;
            return a[x](b,
            function(c, d) {
                return Pe + d
            })
        }
        var Qe = "Date(",
        Re = ", ";
        function Ie(a) {
            a = a;
            if (Yd(a)) {
                a = a.getMilliseconds() !== 0 ? [a[Gc](), a[Ua](), a[Lb](), a[nd](), a[od](), a[vb](), a.getMilliseconds()] : a[vb]() !== 0 || a[od]() !== 0 || a[nd]() !== 0 ? [a[Gc](), a[Ua](), a[Lb](), a[nd](), a[od](), a[vb]()] : [a[Gc](), a[Ua](), a[Lb]()];
                a = Qe + a[ud](Re) + Le
            }
            return a
        };
        function Se(a) {
            return a[x](/^[\s\xa0]+|[\s\xa0]+$/g, S)
        }
        var Te = /^[a-zA-Z0-9\-_.!~*'()]*$/;
        function Ue(a) {
            a = fa(a);
            if (!Te[gb](a)) return ca(a);
            return a
        }
        var Ve = " ";
        function We(a) {
            return oa(a[x](/\+/g, Ve))
        }
        var Xe = "&amp;",
        Ye = "&lt;",
        Ze = "&gt;",
        $e = "&quot;",
        af = "&",
        bf = "<",
        cf = ">";
        function df(a, b) {
            if (b) return a[x](ef, Xe)[x](ff, Ye)[x](gf, Ze)[x](hf, $e);
            else {
                if (!jf[gb](a)) return a;
                if (a[y](af) != -1) a = a[x](ef, Xe);
                if (a[y](bf) != -1) a = a[x](ff, Ye);
                if (a[y](cf) != -1) a = a[x](gf, Ze);
                if (a[y](ve) != -1) a = a[x](hf, $e);
                return a
            }
        }
        var ef = /&/g,
        ff = /</g,
        gf = />/g,
        hf = /\"/g,
        jf = /[&<>\"]/;
        function kf(a, b, c) {
            a = c !== m ? a.toFixed(c) : fa(a);
            c = a[y](Id);
            if (c == -1) c = a[t];
            return ra(r.max(0, b - c) + 1)[ud](ze) + a
        }
        var lf = "(\\d*)(\\D*)",
        mf = "g";
        function nf(a, b) {
            for (var c = 0,
            d = Se(fa(a))[xb](Id), f = Se(fa(b))[xb](Id), g = r.max(d[t], f[t]), j = 0; c == 0 && j < g; j++) {
                var n = d[j] || S,
                q = f[j] || S,
                v = qa(lf, mf),
                B = qa(lf, mf);
                do {
                    var M = v[kb](n) || [S, S, S], A = B[kb](q) || [S, S, S];
                    if (M[0][t] == 0 && A[0][t] == 0) break;
                    c = M[1][t] == 0 ? 0 : da(M[1], 10);
                    var J = A[1][t] == 0 ? 0 : da(A[1], 10);
                    c = of(c, J) || of(M[2][t] == 0, A[2][t] == 0) || of(M[2], A[2])
                } while ( c == 0 )
            }
            return c
        }
        function of(a, b) {
            if (a < b) return - 1;
            else if (a > b) return 1;
            return 0
        };
        var pf = ra[u],
        qf = pf[y] ?
        function(a, b, c) {
            return pf[y][E](a, b, c)
        }: function(a, b, c) {
            c = c == i ? 0 : c < 0 ? r.max(0, a[t] + c) : c;
            if (Q(a)) {
                if (!Q(b) || b[t] != 1) return - 1;
                return a[y](b, c)
            }
            for (c = c; c < a[t]; c++) if (c in a && a[c] === b) return c;
            return - 1
        },
        rf = pf[Jc] ?
        function(a, b, c) {
            pf[Jc][E](a, b, c)
        }: function(a, b, c) {
            for (var d = a[t], f = Q(a) ? a[xb](S) : a, g = 0; g < d; g++) g in f && b[E](c, f[g], g, a)
        },
        sf = pf.filter ?
        function(a, b, c) {
            return pf.filter[E](a, b, c)
        }: function(a, b, c) {
            for (var d = a[t], f = [], g = 0, j = Q(a) ? a[xb](S) : a, n = 0; n < d; n++) if (n in j) {
                var q = j[n];
                if (b[E](c, q, n, a)) f[g++] = q
            }
            return f
        },
        tf = pf.map ?
        function(a, b, c) {
            return pf.map[E](a, b, c)
        }: function(a, b, c) {
            for (var d = a[t], f = ra(d), g = Q(a) ? a[xb](S) : a, j = 0; j < d; j++) if (j in g) f[j] = b[E](c, g[j], j, a);
            return f
        },
        uf = pf.every ?
        function(a, b, c) {
            return pf.every[E](a, b, c)
        }: function(a, b, c) {
            for (var d = a[t], f = Q(a) ? a[xb](S) : a, g = 0; g < d; g++) if (g in f && !b[E](c, f[g], g, a)) return k;
            return h
        };
        function vf(a, b) {
            return qf(a, b) >= 0
        }
        function wf(a, b) {
            var c = qf(a, b),
            d;
            if (d = c >= 0) {
                var f = a;
                c = c;
                pf[rd][E](f, c, 1)
            }
            return d
        }
        function xf() {
            return pf[Fb][ad](pf, arguments)
        }
        function yf(a) {
            if (Wd(a)) return xf(a);
            else {
                for (var b = [], c = 0, d = a[t]; c < d; c++) b[c] = a[c];
                return b
            }
        }
        var zf = "callee";
        function Af(a) {
            for (var b = 1; b < arguments[t]; b++) {
                var c = arguments[b],
                d;
                if (Wd(c) || (d = Xd(c)) && c[Vb](zf)) a[s][ad](a, c);
                else if (d) for (var f = a[t], g = c[t], j = 0; j < g; j++) a[f + j] = c[j];
                else a[s](c)
            }
        }
        function Bf(a) {
            return pf[rd][ad](a, Cf(arguments, 1))
        }
        function Cf(a, b, c) {
            return arguments[t] <= 2 ? pf[pb][E](a, b) : pf[pb][E](a, b, c)
        }
        function Df(a, b) {
            function c(g, j) {
                return f(g[Mb], j[Mb]) || g.index - j.index
            }
            for (var d = 0; d < a[t]; d++) a[d] = {
                index: d,
                value: a[d]
            };
            var f = b || Ef;
            pf.sort[E](a, c || Ef);
            for (d = 0; d < a[t]; d++) a[d] = a[d][Mb]
        }
        function Ef(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        };
        function Ff(a, b) {
            this.x = a !== m ? a: 0;
            this.y = b !== m ? b: 0
        }
        za(Ff[u],
        function() {
            return new Ff(this.x, this.y)
        });
        function Gf(a, b) {
            return new Ff(a.x - b.x, a.y - b.y)
        };
        function Hf(a, b) {
            va(this, a);
            Na(this, b)
        }
        za(Hf[u],
        function() {
            return new Hf(this[w], this[I])
        });
        Hf[u].ceil = function() {
            va(this, r.ceil(this[w]));
            Na(this, r.ceil(this[I]));
            return this
        };
        Hf[u].floor = function() {
            va(this, r[yb](this[w]));
            Na(this, r[yb](this[I]));
            return this
        };
        Hf[u].round = function() {
            va(this, r[nb](this[w]));
            Na(this, r[nb](this[I]));
            return this
        };
        function If(a, b, c) {
            for (var d in a) b[E](c, a[d], d, a)
        }
        function Jf(a) {
            var b = [],
            c = 0,
            d;
            for (d in a) b[c++] = a[d];
            return b
        }
        function Kf(a) {
            var b = [],
            c = 0,
            d;
            for (d in a) b[c++] = d;
            return b
        }
        function Lf(a, b) {
            for (var c in a) if (a[c] == b) return h;
            return k
        }
        function Mf(a, b) {
            var c;
            if (c = b in a) delete a[b];
            return c
        }
        var Nf = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
        function Of(a) {
            for (var b, c, d = 1; d < arguments[t]; d++) {
                c = arguments[d];
                for (b in c) a[b] = c[b];
                for (var f = 0; f < Nf[t]; f++) {
                    b = Nf[f];
                    if (la[u][Vb][E](c, b)) a[b] = c[b]
                }
            }
        }
        var Pf = "Uneven number of arguments";
        function Qf() {
            var a = arguments[t];
            if (a == 1 && Wd(arguments[0])) return Qf[ad](i, arguments[0]);
            if (a % 2) e(l(Pf));
            for (var b = {},
            c = 0; c < a; c += 2) b[arguments[c]] = arguments[c + 1];
            return b
        };
        var Rf, Sf, Tf, Uf, Vf, Wf, Xf;
        function Yf() {
            return L.navigator ? L.navigator.userAgent: i
        }
        function Zf() {
            return L.navigator
        }
        Vf = Uf = Tf = Sf = Rf = k;
        var $f;
        if ($f = Yf()) {
            var ag = Zf();
            Rf = $f[y]("Opera") == 0;
            Sf = !Rf && $f[y]("MSIE") != -1;
            Uf = (Tf = !Rf && $f[y]("WebKit") != -1) && $f[y]("Mobile") != -1;
            Vf = !Rf && !Tf && ag.product == "Gecko"
        }
        var bg = Rf,
        T = Sf,
        cg = Vf,
        dg = Tf,
        eg = Uf,
        fg, gg = Zf(),
        hg = fg = gg && gg.platform || S;
        Wf = hg[y]("Mac") != -1;
        hg[y]("Win");
        hg[y]("Linux");
        Xf = !!Zf() && (Zf().appVersion || S)[y]("X11") != -1;
        var ig = Wf,
        jg = Xf,
        kg;
        a: {
            var lg = S,
            mg;
            if (bg && L.opera) {
                var ng = L.opera.version;
                lg = typeof ng == Td ? ng() : ng
            } else {
                if (cg) mg = /rv\:([^\);]+)(\)|;)/;
                else if (T) mg = /MSIE\s+([^\);]+)(\)|;)/;
                else if (dg) mg = /WebKit\/(\S+)/;
                if (mg) {
                    var og = mg[kb](Yf());
                    lg = og ? og[1] : S
                }
            }
            if (T) {
                var pg, qg = L[sb];
                pg = qg ? qg.documentMode: m;
                if (pg > ea(lg)) {
                    kg = fa(pg);
                    break a
                }
            }
            kg = lg
        }
        var rg = kg,
        sg = {};
        function tg(a) {
            return sg[a] || (sg[a] = nf(rg, a) >= 0)
        };
        var ug, vg = "9",
        wg = !T || tg(vg),
        xg = T && !tg(vg);
        function yg(a) {
            return (a = a.className) && typeof a[xb] == Td ? a[xb](/\s+/) : []
        }
        function zg(a) {
            var b = yg(a),
            c = Cf(arguments, 1),
            d;
            d = b;
            c = c;
            for (var f = 0,
            g = 0; g < c[t]; g++) if (!vf(d, c[g])) {
                d[s](c[g]);
                f++
            }
            d = f == c[t];
            ua(a, b[ud](Ve));
            return d
        }
        function Ag(a) {
            var b = yg(a),
            c = Cf(arguments, 1),
            d;
            d = b;
            c = c;
            for (var f = 0,
            g = 0; g < d[t]; g++) if (vf(c, d[g])) {
                Bf(d, g--, 1);
                f++
            }
            d = f == c[t];
            ua(a, b[ud](Ve));
            return d
        };
        function Bg(a) {
            return a ? new Cg(Dg(a)) : ug || (ug = new Cg)
        }
        function Eg(a) {
            return Q(a) ? ma[zb](a) : a
        }
        var Fg = "style",
        Gg = "class",
        Hg = "for";
        function Ig(a, b) {
            If(b,
            function(c, d) {
                if (d == Fg) a[Xb].cssText = c;
                else if (d == Gg) ua(a, c);
                else if (d == Hg) a.htmlFor = c;
                else if (d in Jg) a[Uc](Jg[d], c);
                else a[d] = c
            })
        }
        var Kg = "type",
        Jg = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            rowspan: "rowSpan",
            valign: "vAlign",
            height: "height",
            width: "width",
            usemap: "useMap",
            frameborder: "frameBorder",
            type: Kg
        },
        Lg = "500",
        Mg = "9.50";
        function Ng(a) {
            var b = a[sb];
            if (dg && !tg(Lg) && !eg) {
                if (typeof a.innerHeight == "undefined") a = ia;
                b = a.innerHeight;
                var c = a[sb][Cd][Cc];
                if (a == a.top) if (c < b) b -= 15;
                return new Hf(a.innerWidth, b)
            }
            a = Og(b);
            if (bg && !tg(Mg)) a = k;
            a = a ? b[Cd] : b[dc];
            return new Hf(a[mb], a[Lc])
        }
        function Pg(a) {
            return a ? a.parentWindow || a[id] : ia
        }
        function Qg() {
            return Rg(ma, arguments)
        }
        var Sg = ' name="',
        Tg = ' type="';
        function Rg(a, b) {
            var c = b[0],
            d = b[1];
            if (!wg && d && (d[ld] || d[F])) {
                c = [bf, c];
                d[ld] && c[s](Sg, df(d[ld]), ve);
                if (d[F]) {
                    c[s](Tg, df(d[F]), ve);
                    var f = {};
                    Of(f, d);
                    d = f;
                    delete d[F]
                }
                c[s](cf);
                c = c[ud](S)
            }
            c = a[yc](c);
            if (d) if (Q(d)) ua(c, d);
            else Wd(d) ? zg[ad](i, [c][Fb](d)) : Ig(c, d);
            b[t] > 2 && Ug(a, c, b, 2);
            return c
        }
        function Ug(a, b, c, d) {
            function f(j) {
                if (j) b[Ra](Q(j) ? a[Ib](j) : j)
            }
            for (d = d; d < c[t]; d++) {
                var g = c[d];
                Xd(g) && !(Zd(g) && g[rb] > 0) ? rf(Vg(g) ? yf(g) : g, f) : f(g)
            }
        }
        var Wg = "CSS1Compat";
        function Og(a) {
            return a.compatMode == Wg
        }
        function Xg(a, b) {
            a[Ra](b)
        }
        function Yg(a) {
            for (var b; b = a[Fc];) a[ec](b)
        }
        function Zg(a, b) {
            b[md] && b[md][Rb](a, b)
        }
        function $g(a) {
            return a && a[md] ? a[md][ec](a) : i
        }
        function ah(a, b) {
            if (a.contains && b[rb] == 1) return a == b || a.contains(b);
            if (typeof a.compareDocumentPosition != "undefined") return a == b || Boolean(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b[md];
            return b == a
        }
        function Dg(a) {
            return a[rb] == 9 ? a: a.ownerDocument || a[sb]
        }
        var bh = "textContent";
        function ch(a, b) {
            if (bh in a) a.textContent = b;
            else if (a[Fc] && a[Fc][rb] == 3) {
                for (; a[kc] != a[Fc];) a[ec](a[kc]);
                a[Fc].data = b
            } else {
                Yg(a);
                var c = Dg(a);
                a[Ra](c[Ib](b))
            }
        }
        var dh = {
            SCRIPT: 1,
            STYLE: 1,
            HEAD: 1,
            IFRAME: 1,
            OBJECT: 1
        },
        eh = "\n",
        fh = {
            IMG: Ve,
            BR: eh
        },
        gh = "tabindex";
        function hh(a) {
            var b = a.getAttributeNode(gh);
            if (b && b.specified) {
                a = a.tabIndex;
                return $d(a) && a >= 0
            }
            return k
        }
        var ih = "innerText";
        function jh(a) {
            if (xg && ih in a) a = a.innerText[x](/(\r\n|\r|\n)/g, eh);
            else {
                var b = [];
                kh(a, b, h);
                a = b[ud](S)
            }
            a = a[x](/ \xAD /g, Ve)[x](/\xAD/g, S);
            T || (a = a[x](/ +/g, Ve));
            if (a != Ve) a = a[x](/^\s*/, S);
            return a
        }
        function kh(a, b, c) {
            if (! (a[cc] in dh)) if (a[rb] == 3) c ? b[s](fa(a.nodeValue)[x](/(\r\n|\r|\n)/g, S)) : b[s](a.nodeValue);
            else if (a[cc] in fh) b[s](fh[a[cc]]);
            else for (a = a[Fc]; a;) {
                kh(a, b, c);
                a = a.nextSibling
            }
        }
        function Vg(a) {
            if (a && typeof a[t] == O) if (Zd(a)) return typeof a.item == Td || typeof a.item == P;
            else if (ae(a)) return typeof a.item == Td;
            return k
        }
        function Cg(a) {
            this.l = a || L[sb] || ma
        }
        K = Cg[u];
        K.B = Bg;
        K.a = function(a) {
            return Q(a) ? this.l[zb](a) : a
        };
        K.setProperties = Ig;
        K.fk = function(a) {
            a = a || this.Qg();
            return a = Ng(a || ia)
        };
        K.d = function() {
            return Rg(this.l, arguments)
        };
        K.createElement = function(a) {
            return this.l[yc](a)
        };
        K.createTextNode = function(a) {
            return this.l[Ib](a)
        };
        K.$g = function() {
            return Og(this.l)
        };
        K.Qg = function() {
            return this.l.parentWindow || this.l[id]
        };
        K.Tj = function() {
            return ! dg && Og(this.l) ? this.l[Cd] : this.l[dc]
        };
        K.$b = function() {
            var a;
            a = !dg && Og(this.l) ? this.l[Cd] : this.l[dc];
            return a = new Ff(a[Nc], a[Sa])
        };
        K.appendChild = Xg;
        K.yf = Yg;
        K.Gk = Zg;
        K.removeNode = $g;
        Ia(K, ah);
        var lh, mh = "M",
        nh = "A",
        oh = "S",
        ph = "W",
        qh = {
            li: ["BC", "AD"],
            ki: ["Before Christ", "Anno Domini"],
            oi: ["J", "F", mh, nh, mh, "J", "J", nh, oh, "O", "N", "D"],
            vi: ["J", "F", mh, nh, mh, "J", "J", nh, oh, "O", "N", "D"],
            ni: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            ui: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            ri: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            xi: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            Bi: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            zi: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            ti: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            yi: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            rm: [oh, mh, "T", ph, "T", "F", oh],
            wi: [oh, mh, "T", ph, "T", "F", oh],
            si: ["Q1", "Q2", "Q3", "Q4"],
            pi: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
            ji: ["AM", "PM"],
            Tf: ["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"],
            Wf: ["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"],
            im: {
                Md: "M/d",
                MMMMd: "MMMM d",
                MMMd: "MMM d"
            },
            nm: 6,
            ym: [5, 6],
            om: 2
        };
        lh = qh;
        function rh() {}
        var sh = "Etc/GMT",
        th = "-",
        uh = "+",
        vh = "UTC";
        function wh(a) {
            if (typeof a == O) {
                var b = a;
                a = new rh;
                a.Sh = b;
                var c = a,
                d;
                d = b;
                if (d == 0) d = sh;
                else {
                    var f = [sh, d < 0 ? th: uh];
                    d = r.abs(d);
                    f[s](r[yb](d / 60) % 100);
                    d %= 60;
                    d != 0 && f[s](Ee, kf(d, 2));
                    d = f[ud](S)
                }
                c.ai = d;
                b = b;
                if (b == 0) b = vh;
                else {
                    c = [vh, b < 0 ? uh: th];
                    b = r.abs(b);
                    c[s](r[yb](b / 60) % 100);
                    b %= 60;
                    b != 0 && c[s](Ee, b);
                    b = c[ud](S)
                }
                a.Of = [b, b];
                a.he = [];
                return a = a
            }
            b = new rh;
            b.ai = a.id;
            b.Sh = -a.std_offset;
            b.Of = a.names;
            b.he = a.transitions;
            return b
        }
        K = rh[u];
        K.Lg = function(a) {
            a = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes());
            a = a / 36E5;
            for (var b = 0; b < this.he[t] && a >= this.he[b];) b += 2;
            return b == 0 ? 0 : this.he[b - 1]
        };
        var xh = "GMT";
        K.Vj = function(a) {
            a = this.Pe(a);
            var b = [xh];
            b[s](a <= 0 ? uh: th);
            a = r.abs(a);
            b[s](kf(r[yb](a / 60) % 100, 2), Ee, kf(a % 60, 2));
            return a = b[ud](S)
        };
        K.Xj = function(a) {
            return this.Of[this.ah(a) ? 3 : 1]
        };
        K.Pe = function(a) {
            return this.Sh - this.Lg(a)
        };
        K.$j = function(a) {
            a = -this.Pe(a);
            var b = [a < 0 ? th: uh];
            a = r.abs(a);
            b[s](kf(r[yb](a / 60) % 100, 2), kf(a % 60, 2));
            return b[ud](S)
        };
        K.bk = function(a) {
            return this.Of[this.ah(a) ? 2 : 0]
        };
        K.ah = function(a) {
            return this.Lg(a) > 0
        };
        function yh(a) {
            this.Jd = [];
            typeof a == O ? this.$f(a) : this.Zf(a)
        }
        var zh = [/^\'(?:[^\']|\'\')*\'/, /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|z+|Z+)/, /^[^\'GyMkSEahKHcLQdmsvzZ]+/];
        K = yh[u];
        var Ah = "''",
        Bh = "'";
        K.Zf = function(a) {
            for (; a;) for (var b = 0; b < zh[t]; ++b) {
                var c = a[lc](zh[b]);
                if (c) {
                    c = c[0];
                    a = a[Wc](c[t]);
                    if (b == 0) if (c == Ah) c = Bh;
                    else {
                        c = c[Wc](1, c[t] - 1);
                        c = c[x](/\'\'/, Bh)
                    }
                    this.Jd[s]({
                        text: c,
                        type: b
                    });
                    break
                }
            }
        };
        Ea(K,
        function(a, b) {
            var c = b ? (a[Fd]() - b.Pe(a)) * 6E4: 0,
            d = c ? new Date(a[sd]() + c) : a,
            f = d;
            if (b && d[Fd]() != a[Fd]()) {
                c += c > 0 ? -864E5: 864E5;
                f = new Date(a[sd]() + c)
            }
            c = [];
            for (var g = 0; g < this.Jd[t]; ++g) {
                var j = this.Jd[g].text;
                1 == this.Jd[g][F] ? c[s](this.zj(j, a, d, f, b)) : c[s](j)
            }
            return c[ud](S)
        });
        K.$f = function(a) {
            if (a < 4) a = lh.Tf[a];
            else if (a < 8) a = lh.Wf[a - 4];
            else if (a < 12) a = lh.Tf[a - 8] + Ve + lh.Wf[a - 8];
            else {
                this.$f(10);
                return
            }
            this.Zf(a)
        };
        K.yj = function(a, b) {
            var c = b[Gc]() > 0 ? 1 : 0;
            return a >= 4 ? lh.ki[c] : lh.li[c]
        };
        K.Lj = function(a, b) {
            var c = b[Gc]();
            if (c < 0) c = -c;
            return a == 2 ? kf(c % 100, 2) : fa(c)
        };
        K.Cj = function(a, b) {
            var c = b[Ua]();
            switch (a) {
            case 5:
                return lh.oi[c];
            case 4:
                return lh.ni[c];
            case 3:
                return lh.ri[c];
            default:
                return kf(c + 1, a)
            }
        };
        K.uj = function(a, b) {
            return kf(b[nd]() || 24, a)
        };
        K.Aj = function(a, b) {
            var c = b[sd]() % 1E3 / 1E3;
            return c.toFixed(r.min(3, a))[Dd](2) + (a > 3 ? kf(0, a - 3) : S)
        };
        K.xj = function(a, b) {
            var c = b.getDay();
            return a >= 4 ? lh.Bi[c] : lh.ti[c]
        };
        K.vj = function(a, b) {
            var c = b[nd]();
            return lh.ji[c >= 12 && c < 24 ? 1 : 0]
        };
        K.tj = function(a, b) {
            return kf(b[nd]() % 12 || 12, a)
        };
        K.rj = function(a, b) {
            return kf(b[nd]() % 12, a)
        };
        K.sj = function(a, b) {
            return kf(b[nd](), a)
        };
        K.Fj = function(a, b) {
            var c = b.getDay();
            switch (a) {
            case 5:
                return lh.wi[c];
            case 4:
                return lh.zi[c];
            case 3:
                return lh.yi[c];
            default:
                return kf(c, 1)
            }
        };
        K.Gj = function(a, b) {
            var c = b[Ua]();
            switch (a) {
            case 5:
                return lh.vi[c];
            case 4:
                return lh.ui[c];
            case 3:
                return lh.xi[c];
            default:
                return kf(c + 1, a)
            }
        };
        K.Dj = function(a, b) {
            var c = r[yb](b[Ua]() / 3);
            return a < 4 ? lh.si[c] : lh.pi[c]
        };
        K.wj = function(a, b) {
            return kf(b[Lb](), a)
        };
        K.Bj = function(a, b) {
            return kf(b[od](), a)
        };
        K.Ej = function(a, b) {
            return kf(b[vb](), a)
        };
        K.Ij = function(a, b, c) {
            c = c || wh(b[Fd]());
            return a < 4 ? c.$j(b) : c.Vj(b)
        };
        K.Jj = function(a, b, c) {
            c = c || wh(b[Fd]());
            return a < 4 ? c.bk(b) : c.Xj(b)
        };
        K.Hj = function(a, b) {
            b = b || wh(a[Fd]());
            return b.ai
        };
        var Ch = "G",
        Dh = "y",
        Eh = "k",
        Fh = "E",
        Gh = "a",
        Hh = "h",
        Ih = "K",
        Jh = "H",
        Kh = "c",
        Lh = "L",
        Mh = "Q",
        Nh = "d",
        Oh = "m",
        Ph = "s",
        Qh = "v",
        Rh = "z",
        Sh = "Z";
        K.zj = function(a, b, c, d, f) {
            var g = a[t];
            switch (a[Hb](0)) {
            case Ch:
                return this.yj(g, c);
            case Dh:
                return this.Lj(g, c);
            case mh:
                return this.Cj(g, c);
            case Eh:
                return this.uj(g, d);
            case oh:
                return this.Aj(g, d);
            case Fh:
                return this.xj(g, c);
            case Gh:
                return this.vj(g, d);
            case Hh:
                return this.tj(g, d);
            case Ih:
                return this.rj(g, d);
            case Jh:
                return this.sj(g, d);
            case Kh:
                return this.Fj(g, c);
            case Lh:
                return this.Gj(g, c);
            case Mh:
                return this.Dj(g, c);
            case Nh:
                return this.wj(g, c);
            case Oh:
                return this.Bj(g, d);
            case Ph:
                return this.Ej(g, d);
            case Qh:
                return this.Hj(b, f);
            case Rh:
                return this.Jj(g, b, f);
            case Sh:
                return this.Ij(g, b, f);
            default:
                return S
            }
        };
        var Th = "StopIteration" in L ? L.StopIteration: l("StopIteration");
        function Uh() {}
        Uh[u].kc = function() {
            e(Th)
        };
        Uh[u].Xf = function() {
            return this
        };
        function Vh(a) {
            if (typeof a.Ab == Td) return a.Ab();
            if (Q(a)) return a[xb](S);
            if (Xd(a)) {
                for (var b = [], c = a[t], d = 0; d < c; d++) b[s](a[d]);
                return b
            }
            return Jf(a)
        }
        function Wh(a, b, c) {
            if (typeof a[Jc] == Td) a[Jc](b, c);
            else if (Xd(a) || Q(a)) rf(a, b, c);
            else {
                var d;
                var f = a;
                if (typeof f.zb == Td) d = f.zb();
                else if (typeof f.Ab != Td) if (Xd(f) || Q(f)) {
                    d = [];
                    f = f[t];
                    for (var g = 0; g < f; g++) d[s](g);
                    d = d
                } else d = Kf(f);
                else d = void 0;
                f = Vh(a);
                g = f[t];
                for (var j = 0; j < g; j++) b[E](c, f[j], d && d[j], a)
            }
        };
        function Xh(a) {
            this.ta = {};
            this.n = [];
            var b = arguments[t];
            if (b > 1) {
                if (b % 2) e(l(Pf));
                for (var c = 0; c < b; c += 2) this.oa(arguments[c], arguments[c + 1])
            } else a && this.Di(a)
        }
        K = Xh[u];
        K.u = 0;
        K.Qb = 0;
        K.Ab = function() {
            this.cd();
            for (var a = [], b = 0; b < this.n[t]; b++) {
                var c = this.n[b];
                a[s](this.ta[c])
            }
            return a
        };
        K.zb = function() {
            this.cd();
            return this.n[Fb]()
        };
        K.db = function(a) {
            return Yh(this.ta, a)
        };
        Ja(K,
        function() {
            this.ta = {};
            sa(this.n, 0);
            this.Qb = this.u = 0
        });
        K.remove = function(a) {
            if (Yh(this.ta, a)) {
                delete this.ta[a];
                this.u--;
                this.Qb++;
                this.n[t] > 2 * this.u && this.cd();
                return h
            }
            return k
        };
        K.cd = function() {
            if (this.u != this.n[t]) {
                for (var a = 0,
                b = 0; a < this.n[t];) {
                    var c = this.n[a];
                    if (Yh(this.ta, c)) this.n[b++] = c;
                    a++
                }
                sa(this.n, b)
            }
            if (this.u != this.n[t]) {
                var d = {};
                for (b = a = 0; a < this.n[t];) {
                    c = this.n[a];
                    if (!Yh(d, c)) {
                        this.n[b++] = c;
                        d[c] = 1
                    }
                    a++
                }
                sa(this.n, b)
            }
        };
        K.ia = function(a, b) {
            if (Yh(this.ta, a)) return this.ta[a];
            return b
        };
        K.oa = function(a, b) {
            if (!Yh(this.ta, a)) {
                this.u++;
                this.n[s](a);
                this.Qb++
            }
            this.ta[a] = b
        };
        K.Di = function(a) {
            var b;
            if (a instanceof Xh) {
                b = a.zb();
                a = a.Ab()
            } else {
                b = Kf(a);
                a = Jf(a)
            }
            for (var c = 0; c < b[t]; c++) this.oa(b[c], a[c])
        };
        za(K,
        function() {
            return new Xh(this)
        });
        K.Xf = function(a) {
            this.cd();
            var b = 0,
            c = this.n,
            d = this.ta,
            f = this.Qb,
            g = this,
            j = new Uh;
            j.kc = function() {
                for (;;) {
                    if (f != g.Qb) e(l("The map has changed since the iterator was created"));
                    if (b >= c[t]) e(Th);
                    var n = c[b++];
                    return a ? n: d[n]
                }
            };
            return j
        };
        function Yh(a, b) {
            return la[u][Vb][E](a, b)
        };
        var Zh = new Function(Gh, "return a");
        var $h, ai = !T || tg(vg),
        bi = T && !tg("8");
        function ci() {}
        ci[u].Fe = k;
        ci[u].J = function() {
            if (!this.Fe) {
                this.Fe = h;
                this.i()
            }
        };
        ci[u].i = function() {};
        function ei(a, b) {
            Ha(this, a);
            Aa(this, b);
            xa(this, this[gc])
        }
        R(ei, ci);
        K = ei[u];
        K.i = function() {
            delete this[F];
            delete this[gc];
            delete this.currentTarget
        };
        K.Ib = k;
        K.Sc = h;
        K.stopPropagation = function() {
            this.Ib = h
        };
        K.preventDefault = function() {
            this.Sc = k
        };
        function fi(a) {
            a[Pb]()
        };
        function gi(a, b) {
            a && this.Mc(a, b)
        }
        R(gi, ei);
        var hi = [1, 4, 2];
        K = gi[u];
        Aa(K, i);
        K.relatedTarget = i;
        K.offsetX = 0;
        K.offsetY = 0;
        Oa(K, 0);
        Pa(K, 0);
        Ba(K, 0);
        Ca(K, 0);
        K.button = 0;
        Fa(K, 0);
        K.charCode = 0;
        K.ctrlKey = k;
        K.altKey = k;
        K.shiftKey = k;
        K.metaKey = k;
        K.jl = k;
        K.Da = i;
        var ii = "mouseover",
        ji = "mouseout",
        ki = "keypress";
        K.Mc = function(a, b) {
            var c = Ha(this, a[F]);
            Aa(this, a[gc] || a.srcElement);
            xa(this, b);
            var d = a.relatedTarget;
            if (d) {
                if (cg) try {
                    Zh(d[cc])
                } catch(f) {
                    d = i
                }
            } else if (c == ii) d = a.fromElement;
            else if (c == ji) d = a.toElement;
            this.relatedTarget = d;
            this.offsetX = a.offsetX !== m ? a.offsetX: a.layerX;
            this.offsetY = a.offsetY !== m ? a.offsetY: a.layerY;
            Oa(this, a[Ad] !== m ? a[Ad] : a.pageX);
            Pa(this, a[Bd] !== m ? a[Bd] : a.pageY);
            Ba(this, a[ic] || 0);
            Ca(this, a[jc] || 0);
            this.button = a.button;
            Fa(this, a[Dc] || 0);
            this.charCode = a[qc] || (c == ki ? a[Dc] : 0);
            this.ctrlKey = a[wb];
            this.altKey = a[Va];
            this.shiftKey = a[cd];
            this.metaKey = a.metaKey;
            this.jl = ig ? a.metaKey: a[wb];
            this.state = a.state;
            this.Da = a;
            delete this.Sc;
            delete this.Ib
        };
        var li = "click";
        K.kf = function(a) {
            return ai ? this.Da.button == a: this[F] == li ? a == 0 : !!(this.Da.button & hi[a])
        };
        K.stopPropagation = function() {
            gi.b[Kb][E](this);
            if (this.Da[Kb]) this.Da[Kb]();
            else this.Da.cancelBubble = h
        };
        K.preventDefault = function() {
            gi.b[Pb][E](this);
            var a = this.Da;
            if (a[Pb]) a[Pb]();
            else {
                a.returnValue = k;
                if (bi) try {
                    if (a[wb] || a[Dc] >= 112 && a[Dc] <= 123) Fa(a, -1)
                } catch(b) {}
            }
        };
        K.i = function() {
            gi.b.i[E](this);
            this.Da = i;
            Aa(this, i);
            xa(this, i);
            this.relatedTarget = i
        };
        function mi(a, b) {
            this.lh = b;
            this.xb = [];
            this.cj(a)
        }
        R(mi, ci);
        K = mi[u];
        K.Ae = i;
        K.ug = i;
        K.Uc = function(a) {
            this.Ae = a
        };
        K.cc = function() {
            if (this.xb[t]) return this.xb.pop();
            return this.og()
        };
        K.nc = function(a) {
            this.xb[t] < this.lh ? this.xb[s](a) : this.tg(a)
        };
        K.cj = function(a) {
            if (a > this.lh) e(l("[goog.structs.SimplePool] Initial cannot be greater than max"));
            for (var b = 0; b < a; b++) this.xb[s](this.og())
        };
        K.og = function() {
            return this.Ae ? this.Ae() : {}
        };
        K.tg = function(a) {
            if (this.ug) this.ug(a);
            else if (Zd(a)) if (ae(a.J)) a.J();
            else for (var b in a) delete a[b]
        };
        K.i = function() {
            mi.b.i[E](this);
            for (var a = this.xb; a[t];) this.tg(a.pop());
            delete this.xb
        };
        var ni, oi, pi = "ScriptEngine" in L;
        oi = (ni = pi && L.ScriptEngine() == "JScript") ? L.ScriptEngineMajorVersion() + Id + L.ScriptEngineMinorVersion() + Id + L.ScriptEngineBuildVersion() : ze;
        var qi = ni,
        ri = oi;
        function si() {}
        var ti = 0;
        K = si[u];
        K.Q = 0;
        K.pc = k;
        K.eg = k;
        var ui = "Invalid listener argument";
        K.Mc = function(a, b, c, d, f, g) {
            if (ae(a)) this.dh = h;
            else if (a && a[Yc] && ae(a[Yc])) this.dh = k;
            else e(l(ui));
            this.jc = a;
            this.xh = b;
            this.src = c;
            Ha(this, d);
            this.yc = !!f;
            this.ud = g;
            this.eg = k;
            this.Q = ++ti;
            this.pc = k
        };
        Ga(K,
        function(a) {
            if (this.dh) return this.jc[E](this.ud || this.src, a);
            return this.jc[Yc][E](this.jc, a)
        });
        var vi, wi, xi, yi, zi, Ai, Bi, Ci, Di, Ei, Fi, Gi = "5.7"; (function() {
            function a() {
                return {
                    u: 0,
                    va: 0
                }
            }
            function b() {
                return []
            }
            function c() {
                function A(J) {
                    return j[E](A.src, A.Q, J)
                }
                return A
            }
            function d() {
                return new si
            }
            function f() {
                return new gi
            }
            var g = qi && !(nf(ri, Gi) >= 0),
            j;
            Ai = function(A) {
                j = A
            };
            if (g) {
                vi = function() {
                    return n.cc()
                };
                wi = function(A) {
                    n.nc(A)
                };
                xi = function() {
                    return q.cc()
                };
                yi = function(A) {
                    q.nc(A)
                };
                zi = function() {
                    return v.cc()
                };
                Bi = function() {
                    v.nc(c())
                };
                Ci = function() {
                    return B.cc()
                };
                Di = function(A) {
                    B.nc(A)
                };
                Ei = function() {
                    return M.cc()
                };
                Fi = function(A) {
                    M.nc(A)
                };
                var n = new mi(0, 600);
                n.Uc(a);
                var q = new mi(0, 600);
                q.Uc(b);
                var v = new mi(0, 600);
                v.Uc(c);
                var B = new mi(0, 600);
                B.Uc(d);
                var M = new mi(0, 600);
                M.Uc(f)
            } else {
                vi = a;
                wi = Ld;
                xi = b;
                yi = Ld;
                zi = c;
                Bi = Ld;
                Ci = d;
                Di = Ld;
                Ei = f;
                Fi = Ld
            }
        })();
        var Hi = {},
        Ii = {},
        Ji = {},
        Ki = "on",
        Li = Ki,
        Mi = {};
        function Ni(a, b, c, d, f) {
            if (b) if (Wd(b)) {
                for (var g = 0; g < b[t]; g++) Ni(a, b[g], c, d, f);
                return i
            } else {
                d = !!d;
                var j = Ii;
                b in j || (j[b] = vi());
                j = j[b];
                if (! (d in j)) {
                    j[d] = vi();
                    j.u++
                }
                j = j[d];
                var n = be(a),
                q;
                j.va++;
                if (j[n]) {
                    q = j[n];
                    for (g = 0; g < q[t]; g++) {
                        j = q[g];
                        if (j.jc == c && j.ud == f) {
                            if (j.pc) break;
                            return q[g].Q
                        }
                    }
                } else {
                    q = j[n] = xi();
                    j.u++
                }
                g = zi();
                g.src = a;
                j = Ci();
                j.Mc(c, g, a, b, d, f);
                c = j.Q;
                g.Q = c;
                q[s](j);
                Hi[c] = j;
                Ji[n] || (Ji[n] = xi());
                Ji[n][s](j);
                if (a[Sc]) {
                    if (a == L || !a.pg) a[Sc](b, g, d)
                } else a.attachEvent(Oi(b), g);
                return c
            } else e(l("Invalid event type"))
        }
        function Pi(a, b, c, d, f) {
            if (Wd(b)) {
                for (var g = 0; g < b[t]; g++) Pi(a, b[g], c, d, f);
                return i
            }
            d = !!d;
            a = Qi(a, b, d);
            if (!a) return k;
            for (g = 0; g < a[t]; g++) if (a[g].jc == c && a[g].yc == d && a[g].ud == f) return Ri(a[g].Q);
            return k
        }
        function Ri(a) {
            if (!Hi[a]) return k;
            var b = Hi[a];
            if (b.pc) return k;
            var c = b.src,
            d = b[F],
            f = b.xh,
            g = b.yc;
            if (c[tb]) {
                if (c == L || !c.pg) c[tb](d, f, g)
            } else c.detachEvent && c.detachEvent(Oi(d), f);
            c = be(c);
            f = Ii[d][g][c];
            if (Ji[c]) {
                var j = Ji[c];
                wf(j, b);
                j[t] == 0 && delete Ji[c]
            }
            b.pc = h;
            f.mh = h;
            Si(d, g, c, f);
            delete Hi[a];
            return h
        }
        function Si(a, b, c, d) {
            if (!d.Ed) if (d.mh) {
                for (var f = 0,
                g = 0; f < d[t]; f++) if (d[f].pc) {
                    var j = d[f].xh;
                    j.src = i;
                    Bi(j);
                    Di(d[f])
                } else {
                    if (f != g) d[g] = d[f];
                    g++
                }
                sa(d, g);
                d.mh = k;
                if (g == 0) {
                    yi(d);
                    delete Ii[a][b][c];
                    Ii[a][b].u--;
                    if (Ii[a][b].u == 0) {
                        wi(Ii[a][b]);
                        delete Ii[a][b];
                        Ii[a].u--
                    }
                    if (Ii[a].u == 0) {
                        wi(Ii[a]);
                        delete Ii[a]
                    }
                }
            }
        }
        function Ti(a, b, c) {
            var d = 0,
            f = a == i,
            g = b == i,
            j = c == i;
            c = !!c;
            if (f) If(Ji,
            function(q) {
                for (var v = q[t] - 1; v >= 0; v--) {
                    var B = q[v];
                    if ((g || b == B[F]) && (j || c == B.yc)) {
                        Ri(B.Q);
                        d++
                    }
                }
            });
            else {
                a = be(a);
                if (Ji[a]) {
                    a = Ji[a];
                    for (f = a[t] - 1; f >= 0; f--) {
                        var n = a[f];
                        if ((g || b == n[F]) && (j || c == n.yc)) {
                            Ri(n.Q);
                            d++
                        }
                    }
                }
            }
            return d
        }
        function Qi(a, b, c) {
            var d = Ii;
            if (b in d) {
                d = d[b];
                if (c in d) {
                    d = d[c];
                    a = be(a);
                    if (d[a]) return d[a]
                }
            }
            return i
        }
        function Oi(a) {
            if (a in Mi) return Mi[a];
            return Mi[a] = Li + a
        }
        function Ui(a, b, c, d, f) {
            var g = 1;
            b = be(b);
            if (a[b]) {
                a.va--;
                a = a[b];
                if (a.Ed) a.Ed++;
                else a.Ed = 1;
                try {
                    for (var j = a[t], n = 0; n < j; n++) {
                        var q = a[n];
                        if (q && !q.pc) g &= Vi(q, f) !== k
                    }
                } finally {
                    a.Ed--;
                    Si(c, d, b, a)
                }
            }
            return Boolean(g)
        }
        function Vi(a, b) {
            var c = a[Yc](b);
            a.eg && Ri(a.Q);
            return c
        }
        var Wi = "window.event";
        function Xi(a, b) {
            if (!Hi[a]) return h;
            var c = Hi[a],
            d = c[F],
            f = Ii;
            if (! (d in f)) return h;
            f = f[d];
            var g, j, n;
            if ($h === m) $h = T && !L[Sc];
            if (n = $h) {
                g = b || Jd(Wi);
                n = h in f;
                var q = k in f;
                if (n) {
                    if (g[Dc] < 0 || g.returnValue != m) return h;
                    a: {
                        var v = g,
                        B = k;
                        if (v[Dc] == 0) try {
                            Fa(v, -1);
                            break a
                        } catch(M) {
                            B = h
                        }
                        if (B || v.returnValue == m) v.returnValue = h
                    }
                }
                v = Ei();
                v.Mc(g, this);
                g = h;
                try {
                    if (n) {
                        for (var A = xi(), J = v.currentTarget; J; J = J[md]) A[s](J);
                        j = f[h];
                        j.va = j.u;
                        for (var N = A[t] - 1; ! v.Ib && N >= 0 && j.va; N--) {
                            xa(v, A[N]);
                            g &= Ui(j, A[N], d, h, v)
                        }
                        if (q) {
                            j = f[k];
                            j.va = j.u;
                            for (N = 0; ! v.Ib && N < A[t] && j.va; N++) {
                                xa(v, A[N]);
                                g &= Ui(j, A[N], d, k, v)
                            }
                        }
                    } else g = Vi(c, v)
                } finally {
                    if (A) {
                        sa(A, 0);
                        yi(A)
                    }
                    v.J();
                    Fi(v)
                }
                return g
            }
            d = new gi(b, this);
            try {
                g = Vi(c, d)
            } finally {
                d.J()
            }
            return g
        }
        Ai(Xi);
        function Yi() {}
        R(Yi, ci);
        K = Yi[u];
        K.pg = h;
        K.Id = i;
        K.If = function(a) {
            this.Id = a
        };
        K.addEventListener = function(a, b, c, d) {
            Ni(this, a, b, c, d)
        };
        K.removeEventListener = function(a, b, c, d) {
            Pi(this, a, b, c, d)
        };
        K.dispatchEvent = function(a) {
            a = a;
            if (Q(a)) a = new ei(a, this);
            else if (a instanceof ei) Aa(a, a[gc] || this);
            else {
                var b = a;
                a = new ei(a[F], this);
                Of(a, b)
            }
            b = 1;
            var c, d = a[F],
            f = Ii;
            if (d in f) {
                f = f[d];
                d = h in f;
                var g;
                if (d) {
                    c = [];
                    for (g = this; g; g = g.Id) c[s](g);
                    g = f[h];
                    g.va = g.u;
                    for (var j = c[t] - 1; ! a.Ib && j >= 0 && g.va; j--) {
                        xa(a, c[j]);
                        b &= Ui(g, c[j], a[F], h, a) && a.Sc != k
                    }
                }
                if (g = k in f) {
                    g = f[k];
                    g.va = g.u;
                    if (d) for (j = 0; ! a.Ib && j < c[t] && g.va; j++) {
                        xa(a, c[j]);
                        b &= Ui(g, c[j], a[F], k, a) && a.Sc != k
                    } else for (c = this; ! a.Ib && c && g.va; c = c.Id) {
                        xa(a, c);
                        b &= Ui(g, c, a[F], k, a) && a.Sc != k
                    }
                }
                a = Boolean(b)
            } else a = h;
            return a
        };
        K.i = function() {
            Yi.b.i[E](this);
            Ti(this);
            this.Id = i
        };
        var Zi = qa("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
        $i = /#|$/;
        function aj(a, b) {
            var c;
            if (a instanceof aj) {
                this.sc(b == i ? a.Ia: b);
                this.Yd(a.wa);
                this.Zd(a.Pb);
                this.Rd(a.vb);
                this.Wd(a.qb);
                this.Vd(a.La);
                this.Jf(a.$[fc]());
                this.Sd(a.wb)
            } else if (a && (c = fa(a)[lc](Zi))) {
                this.sc( !! b);
                this.Yd(c[1] || S, h);
                this.Zd(c[2] || S, h);
                this.Rd(c[3] || S, h);
                this.Wd(c[4]);
                this.Vd(c[5] || S, h);
                this[$b](c[6] || S, h);
                this.Sd(c[7] || S, h)
            } else {
                this.sc( !! b);
                this.$ = new bj(i, this, this.Ia)
            }
        }
        K = aj[u];
        K.wa = S;
        K.Pb = S;
        K.vb = S;
        K.qb = i;
        K.La = S;
        K.wb = S;
        K.Ok = k;
        K.Ia = k;
        var cj = "//",
        dj = "/",
        ej = "?",
        fj = "#";
        K.toString = function() {
            if (this.ra) return this.ra;
            var a = [];
            this.wa && a[s](gj(this.wa, hj), Ee);
            if (this.vb) {
                a[s](cj);
                this.Pb && a[s](gj(this.Pb, hj), Je);
                a[s](ij(this.vb));
                this.qb != i && a[s](Ee, fa(this.qb))
            }
            if (this.La) {
                this.cf() && this.La[Hb](0) != dj && a[s](dj);
                a[s](gj(this.La, jj))
            }
            var b = fa(this.$);
            b && a[s](ej, b);
            this.wb && a[s](fj, gj(this.wb, kj));
            return this.ra = a[ud](S)
        };
        var lj = "..",
        mj = "./",
        nj = "/.";
        K.yl = function(a) {
            var b = this[fc](),
            c = a.wk();
            if (c) b.Yd(a.wa);
            else c = a.xk();
            if (c) b.Zd(a.Pb);
            else c = a.cf();
            if (c) b.Rd(a.vb);
            else c = a.uk();
            var d = a.La;
            if (c) b.Wd(a.qb);
            else if (c = a.Vg()) {
                if (d[Hb](0) != dj) if (this.cf() && !this.Vg()) d = dj + d;
                else {
                    var f = b.La[uc](dj);
                    if (f != -1) d = b.La[Dd](0, f + 1) + d
                }
                f = d;
                if (f == lj || f == Id) d = S;
                else if (f[y](mj) == -1 && f[y](nj) == -1) d = f;
                else {
                    d = f[uc](dj, 0) == 0;
                    f = f[xb](dj);
                    for (var g = [], j = 0; j < f[t];) {
                        var n = f[j++];
                        if (n == Id) d && j == f[t] && g[s](S);
                        else if (n == lj) {
                            if (g[t] > 1 || g[t] == 1 && g[0] != S) g.pop();
                            d && j == f[t] && g[s](S)
                        } else {
                            g[s](n);
                            d = h
                        }
                    }
                    d = g[ud](dj)
                }
            }
            if (c) b.Vd(d);
            else c = a.vk();
            if (c) b[$b](a.Sj());
            else c = a.tk();
            c && b.Sd(a.wb);
            return b
        };
        za(K,
        function() {
            var a;
            a = this.wa;
            var b = this.Pb,
            c = this.vb,
            d = this.qb,
            f = this.La,
            g = this.$[fc](),
            j = this.wb,
            n = new aj(i, this.Ia);
            a && n.Yd(a);
            b && n.Zd(b);
            c && n.Rd(c);
            d && n.Wd(d);
            f && n.Vd(f);
            g && n.Jf(g);
            j && n.Sd(j);
            return a = n
        });
        K.Yd = function(a, b) {
            this.Pa();
            delete this.ra;
            if (this.wa = b ? a ? oa(a) : S: a) this.wa = this.wa[x](/:$/, S);
            return this
        };
        K.wk = function() {
            return !! this.wa
        };
        K.Zd = function(a, b) {
            this.Pa();
            delete this.ra;
            this.Pb = b ? a ? oa(a) : S: a;
            return this
        };
        K.xk = function() {
            return !! this.Pb
        };
        K.Rd = function(a, b) {
            this.Pa();
            delete this.ra;
            this.vb = b ? a ? oa(a) : S: a;
            return this
        };
        K.cf = function() {
            return !! this.vb
        };
        K.Wd = function(a) {
            this.Pa();
            delete this.ra;
            if (a) {
                a = ka(a);
                if (pa(a) || a < 0) e(l("Bad port number " + a));
                this.qb = a
            } else this.qb = i;
            return this
        };
        K.uk = function() {
            return this.qb != i
        };
        K.Vd = function(a, b) {
            this.Pa();
            delete this.ra;
            this.La = b ? a ? oa(a) : S: a;
            return this
        };
        K.Vg = function() {
            return !! this.La
        };
        K.vk = function() {
            return this.$[Ta]() !== S
        };
        K.Jf = function(a, b) {
            this.Pa();
            delete this.ra;
            if (a instanceof bj) {
                this.$ = a;
                this.$.Qf = this;
                this.$.sc(this.Ia)
            } else {
                b || (a = gj(a, oj));
                this.$ = new bj(a, this, this.Ia)
            }
            return this
        };
        K.setQuery = function(a, b) {
            return this.Jf(a, b)
        };
        K.Uj = function() {
            return this.$[Ta]()
        };
        K.Sj = function() {
            return this.$.dm()
        };
        K.getQuery = function() {
            return this.Uj()
        };
        K.Gf = function(a, b) {
            this.Pa();
            delete this.ra;
            this.$.oa(a, b);
            return this
        };
        K.Og = function(a) {
            return this.$.ia(a)
        };
        K.Sd = function(a, b) {
            this.Pa();
            delete this.ra;
            this.wb = b ? a ? oa(a) : S: a;
            return this
        };
        K.tk = function() {
            return !! this.wb
        };
        var pj = "zx";
        K.Vk = function() {
            this.Pa();
            this.Gf(pj, r[yb](r.random() * 2147483648)[Ta](36) + (r[yb](r.random() * 2147483648) ^ ke())[Ta](36));
            return this
        };
        K.Pa = function() {
            if (this.Ok) e(l("Tried to modify a read-only Uri"))
        };
        K.sc = function(a) {
            this.Ia = a;
            this.$ && this.$.sc(a)
        };
        function ij(a) {
            if (Q(a)) return ca(a);
            return i
        }
        var qj = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
        function gj(a, b) {
            var c = i;
            if (Q(a)) {
                c = a;
                qj[gb](c) || (c = encodeURI(a));
                if (c.search(b) >= 0) c = c[x](b, rj)
            }
            return c
        }
        var sj = "%";
        function rj(a) {
            a = a[Oc](0);
            return sj + (a >> 4 & 15)[Ta](16) + (a & 15)[Ta](16)
        }
        var hj = /[#\/\?@]/g,
        jj = /[\#\?]/g,
        oj = /[\#\?@]/g,
        kj = /#/g;
        function bj(a, b, c) {
            this.Oa = a || i;
            this.Qf = b || i;
            this.Ia = !!c
        }
        K = bj[u];
        var tj = "=";
        K.gb = function() {
            if (!this.w) {
                this.w = new Xh;
                if (this.Oa) for (var a = this.Oa[xb](af), b = 0; b < a[t]; b++) {
                    var c = a[b][y](tj),
                    d = i,
                    f = i;
                    if (c >= 0) {
                        d = a[b][Wc](0, c);
                        f = a[b][Wc](c + 1)
                    } else d = a[b];
                    d = We(d);
                    d = this.yb(d);
                    this.add(d, f ? We(f) : S)
                }
            }
        };
        K.w = i;
        K.u = i;
        K.add = function(a, b) {
            this.gb();
            this.Nc();
            a = this.yb(a);
            if (this.db(a)) {
                var c = this.w.ia(a);
                Wd(c) ? c[s](b) : this.w.oa(a, [c, b])
            } else this.w.oa(a, b);
            this.u++;
            return this
        };
        K.remove = function(a) {
            this.gb();
            a = this.yb(a);
            if (this.w.db(a)) {
                this.Nc();
                var b = this.w.ia(a);
                if (Wd(b)) this.u -= b[t];
                else this.u--;
                return this.w[sc](a)
            }
            return k
        };
        Ja(K,
        function() {
            this.Nc();
            this.w && this.w.clear();
            this.u = 0
        });
        K.db = function(a) {
            this.gb();
            a = this.yb(a);
            return this.w.db(a)
        };
        K.zb = function() {
            this.gb();
            for (var a = this.w.Ab(), b = this.w.zb(), c = [], d = 0; d < b[t]; d++) {
                var f = a[d];
                if (Wd(f)) for (var g = 0; g < f[t]; g++) c[s](b[d]);
                else c[s](b[d])
            }
            return c
        };
        K.Ab = function(a) {
            this.gb();
            if (a) {
                a = this.yb(a);
                if (this.db(a)) {
                    var b = this.w.ia(a);
                    if (Wd(b)) return b;
                    else {
                        a = [];
                        a[s](b)
                    }
                } else a = []
            } else {
                b = this.w.Ab();
                a = [];
                for (var c = 0; c < b[t]; c++) {
                    var d = b[c];
                    Wd(d) ? Af(a, d) : a[s](d)
                }
            }
            return a
        };
        K.oa = function(a, b) {
            this.gb();
            this.Nc();
            a = this.yb(a);
            if (this.db(a)) {
                var c = this.w.ia(a);
                if (Wd(c)) this.u -= c[t];
                else this.u--
            }
            this.w.oa(a, b);
            this.u++;
            return this
        };
        K.ia = function(a, b) {
            this.gb();
            a = this.yb(a);
            if (this.db(a)) {
                var c = this.w.ia(a);
                return Wd(c) ? c[0] : c
            } else return b
        };
        K.toString = function() {
            if (this.Oa) return this.Oa;
            if (!this.w) return S;
            for (var a = [], b = 0, c = this.w.zb(), d = 0; d < c[t]; d++) {
                var f = c[d],
                g = Ue(f);
                f = this.w.ia(f);
                if (Wd(f)) for (var j = 0; j < f[t]; j++) {
                    b > 0 && a[s](af);
                    a[s](g);
                    f[j] !== S && a[s](tj, Ue(f[j]));
                    b++
                } else {
                    b > 0 && a[s](af);
                    a[s](g);
                    f !== S && a[s](tj, Ue(f));
                    b++
                }
            }
            return this.Oa = a[ud](S)
        };
        K.dm = function() {
            if (!this.Ub) this.Ub = this[Ta]() ? oa(this[Ta]()) : S;
            return this.Ub
        };
        K.Nc = function() {
            delete this.Ub;
            delete this.Oa;
            this.Qf && delete this.Qf.ra
        };
        za(K,
        function() {
            var a = new bj;
            if (this.Ub) a.Ub = this.Ub;
            if (this.Oa) a.Oa = this.Oa;
            if (this.w) a.w = this.w[fc]();
            return a
        });
        K.yb = function(a) {
            a = fa(a);
            if (this.Ia) a = a[zd]();
            return a
        };
        K.sc = function(a) {
            var b = a && !this.Ia;
            if (b) {
                this.gb();
                this.Nc();
                Wh(this.w,
                function(c, d) {
                    var f = d[zd]();
                    if (d != f) {
                        this[sc](d);
                        this.add(f, c)
                    }
                },
                this)
            }
            this.Ia = a
        };
        K.extend = function() {
            for (var a = 0; a < arguments[t]; a++) {
                var b = arguments[a];
                Wh(b,
                function(c, d) {
                    this.add(d, c)
                },
                this)
            }
        };
        if (ia[Ob] && (ia[Ob].hash[y]("xdrp") == 1 || ia[Ob].search[y]("xdrp") == 1)) if (T) ma.execCommand("Stop");
        else if (cg) ia.stop();
        else e(l("stopped"));
        var uj = ma.referrer,
        vj = uj[y](ej);
        if (vj > 0) uj = uj[Wc](0, vj);
        var wj = uj[y](fj);
        if (wj > 0) uj = uj[Wc](0, wj);
        function xj(a, b) {
            this.Ad = a || 1;
            this.Wc = b || yj;
            this.re = ie(this.Zl, this);
            this.pf = ke()
        }
        R(xj, Yi);
        xj[u].gd = k;
        var yj = L.window,
        zj = 0.8;
        K = xj[u];
        K.pa = i;
        K.Zl = function() {
            if (this.gd) {
                var a = ke() - this.pf;
                if (a > 0 && a < this.Ad * zj) this.pa = this.Wc[qb](this.re, this.Ad - a);
                else {
                    this.hj();
                    if (this.gd) {
                        this.pa = this.Wc[qb](this.re, this.Ad);
                        this.pf = ke()
                    }
                }
            }
        };
        var Aj = "tick";
        K.hj = function() {
            this[z](Aj)
        };
        K.start = function() {
            this.gd = h;
            if (!this.pa) {
                this.pa = this.Wc[qb](this.re, this.Ad);
                this.pf = ke()
            }
        };
        K.stop = function() {
            this.gd = k;
            if (this.pa) {
                this.Wc[jb](this.pa);
                this.pa = i
            }
        };
        K.i = function() {
            xj.b.i[E](this);
            this.stop();
            delete this.Wc
        };
        function Bj() {
            if (cg) {
                this.ub = {};
                this.je = {};
                this.$d = []
            }
        }
        K = Bj[u];
        K.ga = cg;
        K.yh = function(a) {
            if (this.ga) {
                a = Q(a) ? a: Zd(a) ? be(a) : S;
                this.$d[s](a)
            }
        };
        K.vh = function() {
            if (this.ga) {
                var a = this.$d.pop();
                this.fm(a)
            }
        };
        K.Yk = function(a) {
            if (this.ga) {
                a = be(a);
                for (var b = 0; b < this.$d[t]; b++) {
                    var c = this.$d[b];
                    this.Zc(this.ub, c, a);
                    this.Zc(this.je, a, c)
                }
            }
        };
        K.Xk = function(a) {
            if (this.ga) {
                a = be(a);
                delete this.je[a];
                for (var b in this.ub) {
                    wf(this.ub[b], a);
                    this.ub[b][t] == 0 && delete this.ub[b]
                }
            }
        };
        K.fm = function(a) {
            var b = this.je[a],
            c = this.ub[a];
            b && c && rf(b,
            function(d) {
                rf(c,
                function(f) {
                    this.Zc(this.ub, d, f);
                    this.Zc(this.je, f, d)
                },
                this)
            },
            this)
        };
        K.Zc = function(a, b, c) {
            a[b] || (a[b] = []);
            vf(a[b], c) || a[b][s](c)
        };
        var Cj = new Bj;
        function Dj() {}
        Dj[u].cg = i;
        Dj[u].getOptions = function() {
            return this.cg || (this.cg = this.Hk())
        };
        function Ej() {
            return Fj.ng()
        }
        var Fj;
        function Gj() {}
        R(Gj, Dj);
        Gj[u].ng = function() {
            var a = this.Pg();
            return a ? new ActiveXObject(a) : new XMLHttpRequest
        };
        Gj[u].Hk = function() {
            var a = this.Pg(),
            b = {};
            if (a) {
                b[0] = h;
                b[1] = h
            }
            return b
        };
        Gj[u].ff = i;
        var Hj = "MSXML2.XMLHTTP.6.0",
        Ij = "MSXML2.XMLHTTP.3.0",
        Jj = "MSXML2.XMLHTTP",
        Kj = "Microsoft.XMLHTTP";
        Gj[u].Pg = function() {
            if (!this.ff && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
                for (var a = [Hj, Ij, Jj, Kj], b = 0; b < a[t]; b++) {
                    var c = a[b];
                    try {
                        new ActiveXObject(c);
                        return this.ff = c
                    } catch(d) {}
                }
                e(l("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
            }
            return this.ff
        };
        var Lj = new Gj;
        Fj = Lj;
        function Mj(a) {
            this.headers = new Xh;
            this.ke = a || i
        }
        R(Mj, Yi);
        var Nj = /^https?:?$/i,
        Oj = [],
        Pj = "complete",
        Rj = "ready";
        function Sj(a, b, c, d, f, g) {
            var j = new Mj;
            Oj[s](j);
            b && Ni(j, Pj, b);
            Ni(j, Rj, je(Tj, j));
            g && j.Vl(g);
            j[oc](a, c, d, f)
        }
        function Uj() {
            for (var a = Oj; a[t];) a.pop().J()
        }
        function Vj(a) {
            Mj[u].tf = a.Im(Mj[u].tf)
        }
        function Tj(a) {
            a.J();
            wf(Oj, a)
        }
        K = Mj[u];
        K.Ya = k;
        K.t = i;
        K.ie = i;
        K.Dd = S;
        K.Rk = S;
        K.Pc = 0;
        K.Hb = S;
        K.He = k;
        K.yd = k;
        K.hf = k;
        K.Eb = k;
        K.ce = 0;
        K.Ob = i;
        K.Vl = function(a) {
            this.ce = r.max(0, a)
        };
        var Wj = "GET",
        Xj = "POST",
        Yj = "Content-Type",
        Zj = "application/x-www-form-urlencoded;charset=utf-8";
        K.send = function(a, b, c, d) {
            if (this.t) e(l("[goog.net.XhrIo] Object is active with another request"));
            b = b || Wj;
            this.Dd = a;
            this.Hb = S;
            this.Pc = 0;
            this.Rk = b;
            this.He = k;
            this.Ya = h;
            this.t = this.dj();
            this.ie = this.ke ? this.ke[Ab]() : Fj[Ab]();
            Cj.Yk(this.t);
            this.t.onreadystatechange = ie(this.ph, this);
            try {
                this.hf = h;
                this.t[db](b, a, h);
                this.hf = k
            } catch(f) {
                this.Dg(5, f);
                return
            }
            a = c || S;
            var g = this.headers[fc]();
            d && Wh(d,
            function(n, q) {
                g.oa(q, n)
            });
            b == Xj && !g.db(Yj) && g.oa(Yj, Zj);
            Wh(g,
            function(n, q) {
                this.t.setRequestHeader(q, n)
            },
            this);
            try {
                if (this.Ob) {
                    yj[jb](this.Ob);
                    this.Ob = i
                }
                if (this.ce > 0) this.Ob = yj[qb](ie(this.am, this), this.ce);
                this.yd = h;
                this.t[oc](a);
                this.yd = k
            } catch(j) {
                this.Dg(5, j)
            }
        };
        K.dj = function() {
            return this.ke ? this.ke.ng() : new Ej
        };
        K.dispatchEvent = function(a) {
            if (this.t) {
                Cj.yh(this.t);
                try {
                    return Mj.b[z][E](this, a)
                } finally {
                    Cj.vh()
                }
            } else return Mj.b[z][E](this, a)
        };
        var $j = "Timed out after ",
        ak = "ms, aborting",
        bk = "timeout";
        K.am = function() {
            if (typeof Gd != "undefined") if (this.t) {
                this.Hb = $j + this.ce + ak;
                this.Pc = 8;
                this[z](bk);
                this[ob](8)
            }
        };
        K.Dg = function(a, b) {
            this.Ya = k;
            if (this.t) {
                this.Eb = h;
                this.t[ob]();
                this.Eb = k
            }
            this.Hb = b;
            this.Pc = a;
            this.sg();
            this.bd()
        };
        var ck = "error";
        K.sg = function() {
            if (!this.He) {
                this.He = h;
                this[z](Pj);
                this[z](ck)
            }
        };
        var dk = "abort";
        K.abort = function(a) {
            if (this.t && this.Ya) {
                this.Ya = k;
                this.Eb = h;
                this.t[ob]();
                this.Eb = k;
                this.Pc = a || 7;
                this[z](Pj);
                this[z](dk);
                this.bd()
            }
        };
        K.i = function() {
            if (this.t) {
                if (this.Ya) {
                    this.Ya = k;
                    this.Eb = h;
                    this.t[ob]();
                    this.Eb = k
                }
                this.bd(h)
            }
            Mj.b.i[E](this)
        };
        K.ph = function() { ! this.hf && !this.yd && !this.Eb ? this.tf() : this.oh()
        };
        K.tf = function() {
            this.oh()
        };
        var ek = "readystatechange",
        fk = "success",
        gk = " [";
        K.oh = function() {
            if (this.Ya) if (typeof Gd != "undefined") if (! (this.ie[1] && this.Kc() == 4 && this.Qe() == 2)) if (this.yd && this.Kc() == 4) yj[qb](ie(this.ph, this), 0);
            else {
                this[z](ek);
                if (this.Kk()) {
                    this.Ya = k;
                    if (this.fh()) {
                        this[z](Pj);
                        this[z](fk)
                    } else {
                        this.Pc = 6;
                        this.Hb = this.ck() + gk + this.Qe() + Ce;
                        this.sg()
                    }
                    this.bd()
                }
            }
        };
        K.bd = function(a) {
            if (this.t) {
                var b = this.t,
                c = this.ie[0] ? Ld: i;
                this.ie = this.t = i;
                if (this.Ob) {
                    yj[jb](this.Ob);
                    this.Ob = i
                }
                if (!a) {
                    Cj.yh(b);
                    this[z](Rj);
                    Cj.vh()
                }
                Cj.Xk(b);
                try {
                    b.onreadystatechange = c
                } catch(d) {}
            }
        };
        K.Ja = function() {
            return !! this.t
        };
        K.Kk = function() {
            return this.Kc() == 4
        };
        K.fh = function() {
            switch (this.Qe()) {
            case 0:
                return ! this.Nk();
            case 200:
            case 204:
            case 304:
                return h;
            default:
                return k
            }
        };
        K.Nk = function() {
            var a = Q(this.Dd) ? this.Dd[lc](Zi)[1] || i: this.Dd.wa;
            if (a) return Nj[gb](a);
            return self[Ob] ? Nj[gb](self[Ob].protocol) : h
        };
        K.Kc = function() {
            return this.t ? this.t.readyState: 0
        };
        K.Qe = function() {
            try {
                return this.Kc() > 2 ? this.t.status: -1
            } catch(a) {
                return - 1
            }
        };
        K.ck = function() {
            try {
                return this.Kc() > 2 ? this.t.statusText: S
            } catch(a) {
                return S
            }
        };
        K.ak = function() {
            try {
                return this.t ? this.t.responseText: S
            } catch(a) {
                return S
            }
        };
        K.Wj = function() {
            return Q(this.Hb) ? this.Hb: fa(this.Hb)
        };
        var hk = Mj;
        hk.send = Sj;
        hk.Cm = Uj;
        hk.Jm = Vj;
        hk.Dm = Tj;
        hk.km = Yj;
        hk.pm = Zj;
        hk.Lm = Oj;
        var ik = h;
        var jk = "head",
        kk = "html",
        lk = "body";
        function mk(a) {
            var b;
            if (ma[yd](jk)[t] == 0) {
                b = ma[yd](kk)[0];
                var c = ma[yd](lk)[0],
                d = ma[yc](jk);
                b[Rb](d, c)
            }
            b = ma[yd](jk)[0];
            c = ma[yc](ne);
            Ha(c, oe);
            c.src = a;
            b[Ra](c)
        }
        function nk(a) {
            return function(b) {
                na[Sb][hd][rc](a);
                var c = b[vc]();
                c && na[Sb][hd].addErrorFromQueryResponse(a, b);
                return ! c
            }
        };
        var ok = "column",
        pk = "desc";
        function qk(a, b, c) {
            if (typeof b != Nd || !(ok in b)) e(l(c + ' must have a property "column"'));
            else if (pk in b && typeof b.desc != re) e(l('Property "desc" in ' + c + " must be boolean."));
            U(a, b.column)
        }
        var rk = "sortColumns[",
        sk = "Column index ",
        tk = " is duplicate in sortColumns.",
        uk = "sortColumns";
        function vk(a, b) {
            if (typeof b == O) {
                U(a, b);
                return [{
                    column: b
                }]
            } else if (typeof b == Nd) if (Xd(b)) {
                if (b[t] < 1) e(l("sortColumns is an empty array. Must have at least one element."));
                var c = {};
                if (typeof b[0] == Nd) {
                    for (var d = 0; d < b[t]; d++) {
                        qk(a, b[d], rk + d + Ce);
                        var f = b[d].column;
                        if (f in c) e(l(sk + f + tk));
                        c[f] = h
                    }
                    return b
                } else if (typeof b[0] == O) {
                    var g = [];
                    for (d = 0; d < b[t]; d++) {
                        U(a, b[d]);
                        if (b[d] in c) e(l(sk + f + tk));
                        c[f] = h;
                        g[s]({
                            column: b[d]
                        })
                    }
                    return g
                } else e(l("sortColumns is an array, but neither of objects nor of numbers. Must be either of those."))
            } else {
                qk(a, b, uk);
                return [b]
            }
        }
        function wk(a, b) {
            var c = a[Xa]();
            if (c > 0) {
                if (r[yb](b) !== b || b < 0 || b >= c) e(l("Invalid row index " + b + ". Should be in the range [0-" + (c - 1) + "]."))
            } else e(l("Table has no rows."))
        }
        function U(a, b) {
            var c = a[Jb]();
            if (c > 0) {
                if (r[yb](b) !== b || b < 0 || b >= c) e(l("Invalid column index " + b + ". Should be an integer in the range [0-" + (c - 1) + "]."))
            } else e(l("Table has no columns."))
        }
        var xk = "date",
        yk = "datetime",
        zk = "timeofday";
        function Ak(a, b, c) {
            if (c != i) {
                a = a[Ec](b);
                var d = typeof c;
                switch (a) {
                case O:
                    if (d == O) return;
                    break;
                case P:
                    if (d == P) return;
                    break;
                case re:
                    if (d == re) return;
                    break;
                case xk:
                case yk:
                    if (Yd(c)) return;
                    break;
                case zk:
                    if (Xd(c) && c[t] > 2 && c[t] < 5) {
                        d = h;
                        for (var f = 0; f < c[t]; f++) {
                            var g = c[f];
                            if (typeof g != O || g != r[yb](g)) {
                                d = k;
                                break
                            }
                        }
                        if (c[0] < 0 || c[0] > 23 || c[1] < 0 || c[1] > 59 || c[2] < 0 || c[2] > 59) d = k;
                        if (c[t] == 4 && (c[3] < 0 || c[3] > 999)) d = k;
                        if (d) return
                    }
                }
                e(l("Type mismatch. Value " + c + " does not match type " + a + " in column index " + b))
            }
        }
        function Bk(a, b, c) {
            if (b == i) return c == i ? 0 : -1;
            if (c == i) return 1;
            switch (a) {
            case re:
            case O:
            case P:
            case xk:
            case yk:
                return b < c ? -1 : c < b ? 1 : 0;
            case zk:
                for (a = 0; a < 3; a++) if (b[a] < c[a]) return - 1;
                else if (c[a] < b[a]) return 1;
                b = b[t] < 4 ? 0 : b[3];
                c = c[t] < 4 ? 0 : c[3];
                return b < c ? -1 : c < b ? 1 : 0
            }
        }
        function Ck(a, b) {
            U(a, b);
            var c = a[Ec](b),
            d = i,
            f = i,
            g,
            j,
            n = a[Xa]();
            for (g = 0; g < n; g++) {
                j = a[H](g, b);
                if (Kd(j)) {
                    f = d = j;
                    break
                }
            }
            if (d == i) return {
                min: i,
                max: i
            };
            for (g++; g < n; g++) {
                j = a[H](g, b);
                if (Kd(j)) if (Bk(c, j, d) < 0) d = j;
                else if (Bk(c, f, j) < 0) f = j
            }
            return {
                min: d,
                max: f
            }
        }
        function Dk(a, b) {
            b = vk(a, b);
            for (var c = [], d = a[Xa](), f = 0; f < d; f++) c[s](f);
            Df(c,
            function(g, j) {
                for (var n = 0; n < b[t]; n++) {
                    var q = b[n],
                    v = q.column;
                    v = Bk(a[Ec](v), a[H](g, v), a[H](j, v));
                    if (v != 0) {
                        n = q.desc ? -1 : 1;
                        return v * n
                    }
                }
                return 0
            });
            return c
        }
        function Ek(a, b) {
            U(a, b);
            var c = a[Xa]();
            if (c == 0) return [];
            for (var d = [], f = 0; f < c; ++f) d[s](a[H](f, b));
            var g = a[Ec](b);
            Df(d,
            function(q, v) {
                return Bk(g, q, v)
            });
            c = d[0];
            var j = [];
            j[s](c);
            for (f = 1; f < d[t]; f++) {
                var n = d[f];
                Bk(g, n, c) != 0 && j[s](n);
                c = n
            }
            return j
        }
        function Fk(a, b, c) {
            for (var d = 0; d < b[t]; d++) {
                var f = b[d],
                g = f.column,
                j = a[H](c, g);
                g = a[Ec](g);
                if (f.minValue != i || f.maxValue != i) {
                    if (j == i) return k;
                    if (f.minValue != i && Bk(g, j, f.minValue) < 0) return k;
                    if (f.maxValue != i && Bk(g, j, f.maxValue) > 0) return k
                } else if (Bk(g, j, f[Mb]) != 0) return k
            }
            return h
        }
        var Gk = "value",
        Hk = "minValue",
        Ik = "maxValue",
        Jk = "columnFilters[";
        function Kk(a, b) {
            var c = a,
            d = b;
            if (!Xd(d) || d[t] == 0) e(l("columnFilters must be a non-empty array"));
            for (var f = {},
            g = 0; g < d[t]; g++) {
                if (typeof d[g] != Nd || !(ok in d[g])) if (Gk in d[g] || Hk in d[g] || Ik in d[g]) {
                    if (Gk in d[g] && (Hk in d[g] || Ik in d[g])) e(l(Jk + g + '] must specify either "value" or range properties ("minValue" and/or "maxValue"'))
                } else e(l(Jk + g + '] must have properties "column" and "value", "minValue"or "maxValue"'));
                var j = d[g].column;
                if (j in f) e(l(sk + j + " is duplicate in columnFilters."));
                U(c, j);
                Ak(c, j, d[g][Mb]);
                f[j] = h
            }
            c = [];
            d = a[Xa]();
            for (f = 0; f < d; f++) Fk(a, b, f) && c[s](f);
            return c
        }
        function Lk(a, b) {
            var c;
            if (b == zk) {
                c = [];
                var d = a;
                c[s](d[0]);
                var f = (d[1] < 10 ? ze: S) + d[1];
                c[s](f);
                f = (d[2] < 10 ? ze: S) + d[2];
                c[s](f);
                c = c[ud](Ee);
                if (d[t] > 3 && d[3] > 0) c += Id + (d[3] < 10 ? ye: d[3] < 100 ? ze: S) + d[3]
            } else if (b == xk) {
                d = new yh(2);
                c = d[mc](a)
            } else if (b == yk) {
                d = new yh(10);
                c = d[mc](a)
            } else c = fa(a);
            return c
        }
        var Mk = "Not a valid 2D array.";
        function Nk(a, b) {
            var c = new V,
            d, f, g;
            if (!Wd(a)) e(l("Not an array"));
            if (a[t] == 0) return c;
            if (!Wd(a[0])) e(l(Mk));
            var j = a[0][t];
            for (d = 1; d < a[t]; d++) if (!Wd(a[d]) || a[d][t] != j) e(l(Mk));
            var n = (d = !b) ? a[0] : [],
            q = d ? a[pb](1, a[t]) : a,
            v = [];
            for (f = 0; f < j; f++) {
                var B = P;
                for (d = 0; d < q[t]; d++) {
                    g = q[d][f];
                    if (Kd(g)) {
                        if (Q(g)) B = P;
                        else if ($d(g)) B = O;
                        else if (Wd(g)) B = zk;
                        else if (typeof g == re) B = re;
                        else if (Yd(g)) e(l("Date and datetime column types are not supported"));
                        else e(l("Invalid value in " + d + Be + f));
                        break
                    }
                }
                v[f] = B
            }
            for (f = 0; f < j; f++) c[ed](v[f], n[f]);
            c[vd](q);
            return c
        }
        function Ok(a, b, c, d) {
            var f = i,
            g = a[Xa]();
            for (b = b; (d ? b >= 0 : b < g) && f === i;) {
                f = a[H](b, c);
                b += d ? -1 : 1
            }
            return f
        };
        var Pk = "0.5",
        Qk = "0.6";
        function V(a, b) {
            this.Qb = b ? b == Pk ? Pk: Qk: Qk;
            if (a) {
                if (Q(a)) a = Me(a);
                this.A = a.cols || [];
                this.D = a.rows || [];
                this.Xa = a.p || i
            } else {
                this.A = [];
                this.D = [];
                this.Xa = i
            }
        }
        var Rk = {
            jm: re,
            sm: O,
            um: P,
            lm: xk,
            vm: zk,
            mm: yk
        };
        K = V[u];
        K.A = i;
        K.Qb = i;
        K.D = i;
        K.Xa = i;
        K.getNumberOfRows = function() {
            return this.D[t]
        };
        K.getNumberOfColumns = function() {
            return this.A[t]
        };
        za(K,
        function() {
            return new V(this[hb]())
        });
        K.getColumnId = function(a) {
            U(this, a);
            return this.A[a].id
        };
        K.getColumnIndex = function(a) {
            for (var b = this.A,
            c = 0; c < b[t]; c++) if (b[c].id == a) return c;
            return - 1
        };
        K.getColumnLabel = function(a) {
            U(this, a);
            return this.A[a][pd]
        };
        K.getColumnPattern = function(a) {
            U(this, a);
            return this.A[a].pattern
        };
        K.getColumnType = function(a) {
            U(this, a);
            return a = this.A[a][F]
        };
        La(K,
        function(a, b) {
            wk(this, a);
            U(this, b);
            var c = this.Gc(a, b),
            d = i;
            if (c) {
                d = c.v;
                d = d !== m ? d: i
            }
            return d
        });
        K.Gc = function(a, b) {
            return this.D[a].c[b]
        };
        K.getFormattedValue = function(a, b) {
            wk(this, a);
            U(this, b);
            var c = this.Gc(a, b),
            d = S;
            if (c) if (typeof c.f != "undefined" && c.f != i) d = c.f;
            else {
                c = this[H](a, b);
                if (c !== i) return Lk(c, this[Ec](b))
            }
            return d
        };
        K.getProperty = function(a, b, c) {
            wk(this, a);
            U(this, b);
            return (a = (a = this.Gc(a, b)) && a.p) && c in a ? a[c] : i
        };
        K.getProperties = function(a, b) {
            wk(this, a);
            U(this, b);
            var c = this.Gc(a, b);
            if (!c) {
                c = {
                    v: i,
                    f: i
                };
                this.D[a].c[b] = c
            }
            c.p || (c.p = {});
            return c.p
        };
        K.getTableProperties = function() {
            return this.Xa
        };
        K.getTableProperty = function(a) {
            var b = this.Xa;
            return b && a in b ? b[a] : i
        };
        K.setTableProperties = function(a) {
            this.Xa = a
        };
        K.setTableProperty = function(a, b) {
            if (!this.Xa) this.Xa = {};
            this.Xa[a] = b
        };
        ta(K,
        function(a, b, c) {
            this[jd](a, b, c, m, m)
        });
        K.setFormattedValue = function(a, b, c) {
            this[jd](a, b, m, c, m)
        };
        K.setProperties = function(a, b, c) {
            this[jd](a, b, m, m, c)
        };
        K.setProperty = function(a, b, c, d) {
            a = this[bb](a, b);
            a[c] = d
        };
        K.setCell = function(a, b, c, d, f) {
            wk(this, a);
            U(this, b);
            var g = this.Gc(a, b);
            if (!g) {
                g = {};
                this.D[a].c[b] = g
            }
            if (typeof c != "undefined") {
                Ak(this, b, c);
                g.v = c
            }
            if (typeof d != "undefined") g.f = d;
            if (f !== m) g.p = Zd(f) ? f: {}
        };
        K.setRowProperties = function(a, b) {
            wk(this, a);
            var c = this.D[a];
            c.p = b
        };
        K.setRowProperty = function(a, b, c) {
            a = this[Zc](a);
            a[b] = c
        };
        K.getRowProperty = function(a, b) {
            wk(this, a);
            var c = this.D[a];
            return (c = c && c.p) && b in c ? c[b] : i
        };
        K.getRowProperties = function(a) {
            wk(this, a);
            a = this.D[a];
            a.p || (a.p = {});
            return a.p
        };
        K.setColumnLabel = function(a, b) {
            U(this, a);
            var c = this.A[a];
            c.label = b
        };
        K.setColumnProperties = function(a, b) {
            U(this, a);
            var c = this.A[a];
            c.p = b
        };
        K.setColumnProperty = function(a, b, c) {
            a = this[Zb](a);
            a[b] = c
        };
        K.getColumnProperty = function(a, b) {
            U(this, a);
            var c = this.A[a];
            return (c = c && c.p) && b in c ? c[b] : i
        };
        K.getColumnProperties = function(a) {
            U(this, a);
            a = this.A[a];
            a.p || (a.p = {});
            return a.p
        };
        K.insertColumn = function(a, b, c, d) {
            a !== this.A[t] && U(this, a);
            c = c || S;
            d = d || S;
            if (!Lf(Rk, b)) e(l("Invalid type: " + b + Id));
            this.A[rd](a, 0, {
                id: d,
                label: c,
                pattern: S,
                type: b
            });
            for (b = 0; b < this.D[t]; b++) this.D[b].c[rd](a, 0, {
                v: i,
                f: i
            })
        };
        K.addColumn = function(a, b, c) {
            this.insertColumn(this.A[t], a, b, c);
            return this.A[t] - 1
        };
        K.gl = function(a, b) {
            var c = {};
            if (Vd(b) == Nd && !Yd(b)) {
                c.v = typeof b.v == "undefined" ? i: b.v;
                var d = typeof b.f;
                if (d == "undefined" || d == Ud) c.f = i;
                else if (d == P) c.f = b.f;
                else e(l("Formatted value ('f'), if specified, must be a string."));
                d = typeof b.p;
                if (d == Nd) c.p = b.p;
                else if (d != Ud && d != "undefined") e(l("Properties ('p'), if specified, must be an Object."))
            } else {
                c.v = Kd(b) ? b: i;
                c.f = i
            }
            Ak(this, a, c.v);
            return c
        };
        K.insertRows = function(a, b) {
            a !== this.D[t] && wk(this, a);
            var c;
            if (typeof b == Nd && b[Gb] == ra) c = b;
            else if (typeof b == O) {
                if (b != r[yb](b) || b < 0) e(l("Invalid value for numOrArray: " + b + ". If numOrArray is a number it should be a nonnegative integer."));
                var d = b;
                c = [];
                for (var f = 0; f < d; f++) c[f] = i;
                c = c
            } else e(l("Invalid value for numOrArray. Should be a number or an array of arrays of cells."));
            d = [];
            for (f = 0; f < c[t]; f++) {
                var g = c[f],
                j = [];
                if (g === i) for (g = 0; g < this.A[t]; g++) j[s]({
                    v: i,
                    f: i
                });
                else if (Wd(g)) {
                    if (g[t] != this.A[t]) e(l("Row given with size different than " + this.A[t] + " (the number of columns in the table)."));
                    for (var n = 0; n < g[t]; n++) j[s](this.gl(n, g[n]))
                } else e(l("Every row given must be either null or an array."));
                g = {};
                g.c = j;
                d[s](g)
            }
            c = d;
            je(Bf, this.D, a, 0)[ad](i, c);
            return a + d[t] - 1
        };
        K.addRows = function(a) {
            if (typeof a == O || typeof a == Nd && a[Gb] == ra) return this.insertRows(this.D[t], a);
            else e(l("Argument given to addRows must be either a number or an array"))
        };
        K.addRow = function(a) {
            if (typeof a == Nd && a[Gb] == ra) return this[vd]([a]);
            else if (typeof a == "undefined" || a == i) return this[vd](1);
            else e(l("If argument is given to addRow, it must be an array, or null"))
        };
        K.getColumnRange = function(a) {
            return Ck(this, a)
        };
        K.getSortedRows = function(a) {
            return Dk(this, a)
        };
        K.sort = function(a) {
            a = vk(this, a);
            var b = this;
            Df(this.D,
            function(c, d) {
                for (var f = 0; f < a[t]; f++) {
                    var g = a[f],
                    j = g.column,
                    n = c.c[j],
                    q = d.c[j];
                    n = n ? n.v: i;
                    q = q ? q.v: i;
                    j = Bk(b[Ec](j), n, q);
                    if (j != 0) {
                        f = g.desc ? -1 : 1;
                        return j * f
                    }
                }
                return 0
            })
        };
        K.toJSON = function() {
            return Ge({
                cols: this.A,
                rows: this.D,
                p: this.Xa
            })
        };
        K.getDistinctValues = function(a) {
            return Ek(this, a)
        };
        K.getFilteredRows = function(a) {
            return Kk(this, a)
        };
        K.removeRows = function(a, b) {
            if (! (b <= 0)) {
                wk(this, a);
                if (a + b > this.D[t]) b = this.D[t] - a;
                this.D[rd](a, b)
            }
        };
        K.removeRow = function(a) {
            this.removeRows(a, 1)
        };
        K.removeColumns = function(a, b) {
            if (! (b <= 0)) {
                U(this, a);
                if (a + b > this.A[t]) b = this.A[t] - a;
                this.A[rd](a, b);
                for (var c = 0; c < this.D[t]; c++) this.D[c].c[rd](a, b)
            }
        };
        K.removeColumn = function(a) {
            this.removeColumns(a, 1)
        };
        function Sk(a) {
            var b;
            b = a.version || Qk;
            this.Al = b = Lf(Tk, b) ? b: Qk;
            this.Ke = a.status;
            this.hb = [];
            this.rb = [];
            this.rb = a.warnings || [];
            this.hb = a[hd] || [];
            Uk(this.rb);
            Uk(this.hb);
            if (this.Ke != ck) {
                this.Rh = a.sig;
                this.g = new V(a.table, this.Al)
            }
        }
        function Uk(a) {
            for (var b = 0; b < a[t]; b++) {
                var c = a[b].detailed_message;
                if (c) {
                    var d = a[b];
                    c = (c = c) ? c[lc](Vk) && !c[lc](Wk) ? c: c[x](/&/g, Xe)[x](/</g, Ye)[x](/>/g, Ze)[x](/\"/g, $e) : S;
                    d.detailed_message = c
                }
            }
        }
        var Vk = /^[^<]*(<a(( )+target=('_blank')?("_blank")?)?( )+(href=('[^']*')?("[^"]*")?)>[^<]*<\/a>[^<]*)*$/,
        Wk = /javascript((s)?( )?)*:/,
        Tk = {
            wm: Pk,
            xm: Qk
        };
        K = Sk[u];
        K.Rh = i;
        K.g = i;
        K.isError = function() {
            return this.Ke == ck
        };
        var Xk = "warning";
        K.hasWarning = function() {
            return this.Ke == Xk
        };
        K.containsReason = function(a) {
            for (var b = 0; b < this.hb[t]; b++) if (this.hb[b].reason == a) return h;
            for (b = 0; b < this.rb[t]; b++) if (this.rb[b].reason == a) return h;
            return k
        };
        K.getDataSignature = function() {
            return this.Rh
        };
        K.getDataTable = function() {
            return this.g
        };
        K.Ne = function(a) {
            if (this[vc]() && this.hb && this.hb[0] && this.hb[0][a]) return this.hb[0][a];
            if (this.hasWarning() && this.rb && this.rb[0] && this.rb[0][a]) return this.rb[0][a];
            return i
        };
        var Yk = "reason";
        K.getReasons = function() {
            var a = this.Ne(Yk);
            return Kd(a) && a != S ? [a] : []
        };
        var Zk = "message";
        K.getMessage = function() {
            return this.Ne(Zk) || S
        };
        var $k = "detailed_message";
        K.getDetailedMessage = function() {
            return this.Ne($k) || S
        };
        var al = "auto";
        function bl(a, b) {
            var c = b || {};
            this.Cf = c.sendMethod || al;
            if (!Lf(cl, this.Cf)) e(l("Send method not supported: " + this.Cf));
            this.kh = c.makeRequestParams_ || {};
            if (/spreadsheets/ [gb](a) || /\.corp\.google\.com((:4040)|(:433))?/ [gb](a)) {
                a = this.sl(a);
                a = this.vl(a)
            }
            this.Qk = /spreadsheets[0-9]?\.google\.com\/a\/.*\/tq\?.*/ [gb](a) || /.*corp\.google\.com((:4040)|(:433))?\/a\/.*\/tq\?.*/ [gb](a);
            this.fj = a;
            this.Eh = dl++;
            el[s](this)
        }
        var fl = "xhr",
        gl = "makeRequest",
        cl = {
            zm: fl,
            tm: "scriptInjection",
            qm: gl,
            hm: al
        },
        hl = new Xh({
            "X-DataSource-Auth": Gh
        }),
        dl = 0,
        il = {};
        bl[u].bi = 30;
        var el = [],
        jl = L.gadgets;
        function kl() {
            for (var a = 0; a < el[t]; a++) {
                var b = el[a];
                b.xf && b.Pd()
            }
        }
        K = bl[u];
        var ll = "/tq?",
        ml = "/tq?pub=1&";
        K.vl = function(a) {
            if (/.google\.com(:4040)?(\/a\/.*)?\/ccc\?.*key=/ [gb](a)) a = a[x](/\/ccc\?/, ll);
            else if (/.google\.com(:4040)?(\/a\/.*)?\/pub\?.*key=/ [gb](a)) a = a[x](/\/pub\?/, ml);
            return a
        };
        var nl = ".google.com";
        K.sl = function(a) {
            if (/\.google\.com:433/ [gb](a)) a = a[x](/\.google\.com:433/, nl);
            return a
        };
        function ol(a) {
            if (a[gc].fh()) {
                a = Se(a[gc].ak());
                if (a[lc](/^({.*})$/)) {
                    a = Ne(a);
                    pl(a)
                } else pe(Oe(a))
            } else e(l("google.visualization.Query: " + a[gc].Wj()))
        }
        function pl(a) {
            var b = a.reqId,
            c = il[b];
            if (c) {
                il[b] = i;
                c.td(a)
            } else e(l("Missing query for request id: " + b))
        }
        K.Af = i;
        K.Ld = i;
        K.de = i;
        K.Ta = i;
        K.$e = i;
        K.gc = i;
        K.xf = h;
        K.Jb = 0;
        K.of = i;
        K.Ja = k;
        K.setRefreshInterval = function(a) {
            if (typeof a != O || a < 0) e(l("Refresh interval must be a non-negative number"));
            this.Jb = a;
            this.Fh()
        };
        K.xe = function() {
            if (this.de) {
                ia[jb](this.de);
                this.de = i
            }
        };
        var ql = "Request timed out";
        K.$l = function() {
            var a = bk,
            b = ql;
            this.Mh(a, b)
        };
        K.Mh = function(a, b, c) {
            a = {
                version: Qk,
                status: ck,
                errors: [{
                    reason: a,
                    message: b,
                    detailed_message: c
                }]
            };
            this.td(a)
        };
        var rl = "reqId:",
        sl = ";sig:",
        tl = ";type:",
        ul = ";";
        K.Hi = function(a) {
            var b = {};
            if (this.Ta) b.tq = fa(this.Ta);
            var c = rl + fa(this.Eh),
            d = this.of;
            if (d) c += sl + d;
            if (this.$e) c += tl + this.$e;
            b.tqx = c;
            if (this.gc) {
                c = [];
                for (var f in this.gc) c[s](f + Ee + this.gc[f]);
                b.tqh = c[ud](ul)
            }
            f = a;
            b = b;
            a = f[y](fj);
            if (a != -1) f = f[Wc](0, a);
            c = f[y](ej);
            d = a = S;
            d = [];
            if (c == -1) a = f;
            else {
                a = f[Wc](0, c);
                d = f[Wc](c + 1);
                d = d[xb](af)
            }
            f = [];
            for (c = 0; c < d[t]; c++) {
                var g = d[c][xb](tj),
                j = {};
                j.name = g[0];
                j.uf = d[c];
                f[s](j)
            }
            for (var n in b) {
                d = b[n];
                g = k;
                for (c = 0; c < f[t]; c++) if (f[c][ld] == n) {
                    f[c].uf = n + tj + ca(d);
                    g = h;
                    break
                }
                if (!g) {
                    c = {};
                    c.name = n;
                    c.uf = n + tj + ca(d);
                    f[s](c)
                }
            }
            n = a;
            if (f[t] > 0) {
                n += ej;
                b = [];
                for (c = 0; c < f[t]; c++) b[s](f[c].uf);
                n += b[ud](af)
            }
            a = n;
            if (this.Jb) {
                n = new aj(a);
                n.Vk();
                a = n[Ta]()
            }
            return a
        };
        var vl = "tqrt",
        wl = "gadgets.io.makeRequest",
        xl = "img";
        K.Pd = function() {
            var a = this.Hi(this.fj);
            il[fa(this.Eh)] = this;
            var b = this.Cf;
            if (b == al) {
                b = a;
                if (/[?&]alt=gviz(&[^&]*)*$/ [gb](b)) b = gl;
                else {
                    b = b;
                    var c = vl,
                    d = b.search($i),
                    f;
                    b: {
                        f = b;
                        for (var g = c,
                        j = d,
                        n = 0,
                        q = g[t]; (n = f[y](g, n)) >= 0 && n < j;) {
                            var v = f[Oc](n - 1);
                            if (v == 38 || v == 63) {
                                v = f[Oc](n + q);
                                if (!v || v == 61 || v == 38 || v == 35) {
                                    f = n;
                                    break b
                                }
                            }
                            n += q + 1
                        }
                        f = -1
                    }
                    if (f < 0) b = i;
                    else {
                        g = b[y](af, f);
                        if (g < 0 || g > d) g = d;
                        f += c[t] + 1;
                        b = We(b[Dd](f, g - f))
                    }
                    b = b || al;
                    Lf(cl, b) || (b = al)
                }
                b = b
            }
            if (b == gl) if (Jd(wl)) this.El(a, this.kh);
            else e(l("gadgets.io.makeRequest is not defined."));
            else {
                if (! (c = b == fl)) {
                    if (b = b == al) {
                        c = (new aj(L[Ob][Vc])).yl(new aj(a))[Ta]();
                        b = L[Ob][Vc][lc](Zi);
                        c = c[lc](Zi);
                        b = b[3] == c[3] && b[1] == c[1] && b[4] == c[4]
                    }
                    c = b
                }
                if (c) hk[oc](a, ol, Wj, m, hl);
                else {
                    b = ma[yd](lk)[0];
                    c = this.of === i;
                    if (this.Qk && c) {
                        c = ma[yc](xl);
                        this.ml(c, a);
                        b[Ra](c)
                    } else this.qe(a)
                }
            }
        };
        var yl = "none",
        zl = "&requireauth=1&";
        K.ml = function(a, b) {
            var c = this;
            a.onerror = function() {
                c.qe(b)
            };
            a.onload = function() {
                c.qe(b)
            };
            Ma(a[Xb], yl);
            var d = b + zl + (new Date)[sd]();
            a.src = d
        };
        K.El = function(a, b) {
            var c = jl;
            if (b[c.io[Cb].CONTENT_TYPE] == i) b[c.io[Cb].CONTENT_TYPE] = c.io.ContentType.TEXT;
            if (b[c.io[Cb].AUTHORIZATION] == i) b[c.io[Cb].AUTHORIZATION] = c.io.AuthorizationType.SIGNED;
            if (b.OAUTH_ENABLE_PRIVATE_NETWORK == i) b.OAUTH_ENABLE_PRIVATE_NETWORK = h;
            if (b.OAUTH_ADD_EMAIL == i) b.OAUTH_ADD_EMAIL = h;
            c.io.makeRequest(a, ie(this.mk, this), b);
            this.Uh()
        };
        var Al = "make_request_failed",
        Bl = "gadgets.io.makeRequest failed";
        K.mk = function(a) {
            if (a != i && a.data) pe(Oe(a.data));
            else {
                var b = Al,
                c = Bl,
                d = S;
                if (a && a[hd]) {
                    a = a[hd];
                    d = a[ud](Ve)
                }
                this.Mh(b, c, d)
            }
        };
        K.qe = function(a) {
            this.Uh();
            mk(a);
            this.Fh()
        };
        K.Uh = function() {
            var a = this;
            this.xe();
            this.de = ia[qb](function() {
                a.$l()
            },
            this.bi * 1E3)
        };
        K.Zh = function() {
            if (this.Ld) {
                ia[jb](this.Ld);
                this.Ld = i
            }
        };
        K.Fh = function() {
            this.Zh();
            if (this.Jb != 0 && this.xf && this.Ja) {
                var a = this;
                this.Ld = ia[qb](function() {
                    a.Pd()
                },
                this.Jb * 1E3)
            }
        };
        K.send = function(a) {
            this.Ja = h;
            this.Af = a;
            this.Pd()
        };
        K.makeRequest = function(a, b) {
            this.Ja = h;
            this.Af = a;
            this.Mm = gl;
            this.kh = b || {};
            this.Pd()
        };
        K.abort = function() {
            this.Ja = k;
            this.xe();
            this.Zh()
        };
        var Cl = "not_modified";
        K.td = function(a) {
            this.xe();
            a = new Sk(a);
            if (!a.containsReason(Cl)) {
                this.of = a[vc]() ? i: a.getDataSignature();
                var b = this.Af;
                b[E](b, a)
            }
        };
        K.setTimeout = function(a) {
            if (typeof a != O || pa(a) || a <= 0) e(l("Timeout must be a positive number"));
            this.bi = a
        };
        K.setRefreshable = function(a) {
            if (typeof a != re) e(l("Refreshable must be a boolean"));
            return this.xf = a
        };
        K.setQuery = function(a) {
            if (typeof a != P) e(l("queryString must be a string"));
            this.Ta = a
        };
        K.Rl = function(a) {
            this.$e = a;
            a != i && this.Oh(Kg, a)
        };
        var Dl = "\\c",
        El = "\\s";
        K.Oh = function(a, b) {
            a = a[x](/\\/g, se);
            b = b[x](/\\/g, se);
            a = a[x](/:/g, Dl);
            b = b[x](/:/g, Dl);
            a = a[x](/;/g, El);
            b = b[x](/;/g, El);
            if (!this.gc) this.gc = {};
            this.gc[a] = b
        };
        var Fl = ["opera", "msie", "applewebkit", "firefox", "camino", "mozilla"],
        Gl = ["x11;", "macintosh", "windows"],
        Hl = "[ /]?([0-9]+(.[0-9]+)?)",
        Il = "intel";
        function Jl(a) {
            Ha(this, -1);
            this.Wi = this.rh = -1;
            this.Cl = this.version = 0;
            a = a[zd]();
            for (var b = 0; b < Fl[t]; b++) {
                var c = Fl[b];
                if (a[y](c) != -1) {
                    Ha(this, b);
                    b = qa(c + Hl);
                    if (b[kb](a)) this.version = ea(qa.$1);
                    break
                }
            }
            for (b = 0; b < Gl[t]; b++) {
                c = Gl[b];
                if (a[y](c) != -1) {
                    this.rh = b;
                    break
                }
            }
            if (this.rh == 1 && a[y](Il) != -1) this.Wi = 0;
            if (this.Lk() && /\brv:\s*(\d+\.\d+)/ [kb](a)) this.Cl = ea(qa.$1)
        }
        Jl[u].Lk = function() {
            return this[F] == 3 || this[F] == 5 || this[F] == 4
        };
        var Kl = new Jl(navigator.userAgent);
        function Ll(a, b) {
            for (var c = a[t], d = 0; d < c; ++d) b(a[d], d)
        }
        function Ml(a, b, c) {
            for (var d in a) if (c || !a[Vb] || a[Vb](d)) b(d, a[d])
        }
        function Nl(a, b, c, d) {
            c = typeof c != "undefined" && c != i ? c: 0;
            d = typeof d != "undefined" && d != i ? d: b[t];
            for (c = c; c < d; ++c) a[s](b[c])
        }
        function Ol() {
            return Function[u][E][ad](ra[u][pb], arguments)
        }
        function Pl(a) {
            if (!a.Y) a.Y = new a;
            return a.Y
        };
        var Ql = "blur",
        Rl = Ql,
        Sl = li,
        Tl = "dblclick",
        Ul = Tl,
        Vl = "focus",
        Wl = Vl,
        Xl = "unload",
        Yl = "focusin",
        Zl = Yl,
        $l = "focusout",
        am = $l,
        bm = "clearlisteners";
        var cm = k;
        function dm() {
            this.pb = []
        }
        dm[u].removeListener = function(a) {
            var b = a.Yg;
            if (! (b < 0)) {
                var c = this.pb.pop();
                if (b < this.pb[t]) {
                    this.pb[b] = c;
                    c.Td(b)
                }
                a.Td( - 1)
            }
        };
        dm[u].zh = function(a) {
            this.pb[s](a);
            a.Td(this.pb[t] - 1)
        };
        Ja(dm[u],
        function() {
            for (var a = 0; a < this.pb[t]; ++a) this.pb[a].Td( - 1);
            this.pb = []
        });
        function em(a) {
            fm(a, bm);
            Ll(gm(a),
            function(b) {
                b[sc]();
                Pl(dm).removeListener(b)
            })
        }
        function gm(a, b) {
            var c = [],
            d = a.__e_;
            if (d) if (b) d[b] && Nl(c, d[b]);
            else Ml(d,
            function(f, g) {
                Nl(c, g)
            });
            return c
        }
        function hm(a, b, c) {
            var d = i,
            f = a.__e_;
            if (f) {
                d = f[b];
                if (!d) {
                    d = [];
                    if (c) f[b] = d
                }
            } else {
                d = [];
                if (c) {
                    a.__e_ = {};
                    a.__e_[b] = d
                }
            }
            return d
        }
        function fm(a, b) {
            var c = Ol(arguments, 2);
            Ll(gm(a, b),
            function(d) {
                if (cm) d.jf(c);
                else try {
                    d.jf(c)
                } catch(f) {}
            })
        }
        function im() {
            this.gf = i
        }
        im[u].Tl = function(a) {
            this.gf = a
        };
        im[u].Qc = function(a, b, c, d) {
            return this.gf ? new this.gf(a, b, c, d) : i
        };
        function jm(a, b, c, d) {
            var f = this;
            f.Y = a;
            f.Fc = b;
            f.Db = c;
            f.af = i;
            f.ol = d;
            f.Yg = -1;
            hm(a, b, h)[s](f)
        }
        K = jm[u];
        var km = "javascript:void(0)";
        K.bj = function() {
            var a = this;
            return this.af = function(b) {
                if (!b) b = ia.event;
                if (b && !b[gc]) try {
                    Aa(b, b.srcElement)
                } catch(c) {}
                var d = a.jf([b]);
                if (b && Sl == b[F]) if ((b = b.srcElement) && nh == b[dd] && km == b[Vc]) return k;
                return d
            }
        };
        K.remove = function() {
            var a = this;
            if (a.Y) {
                switch (a.ol) {
                case 1:
                    a.Y[tb](a.Fc, a.Db, k);
                    break;
                case 4:
                    a.Y[tb](a.Fc, a.Db, h);
                    break;
                case 2:
                    a.Y.detachEvent(Ki + a.Fc, a.af);
                    break;
                case 3:
                    a.Y[Ki + a.Fc] = i
                }
                for (var b = hm(a.Y, a.Fc), c = a, d = 0, f = 0; f < b[t]; ++f) if (b[f] === c) {
                    b[rd](f--, 1);
                    d++
                }
                a.Y = i;
                a.Db = i;
                a.af = i
            }
        };
        K.Td = function(a) {
            this.Yg = a
        };
        K.jf = function(a) {
            if (this.Y) return this.Db[ad](this.Y, a)
        };
        K.ja = function() {
            return this.Y
        };
        Pl(im).Tl(jm);
        var W = {};
        W.ne = "google-visualization-errors";
        W.Uf = W.ne + th;
        W.Vf = W.ne + Ee;
        W.le = W.ne + "-all-";
        W.me = W.Vf + " container is null";
        W.mi = "background-color: #c00000; color: white; padding: 2px;";
        W.Ai = "background-color: #fff4c2; color: black; white-space: nowrap; padding: 2px; border: 1px solid black;";
        W.Ci = "font: normal 0.8em arial,sans-serif; margin-bottom: 5px;";
        W.qi = "font-size: 1.1em; color: #0000cc; font-weight: bold; cursor: pointer; padding-left: 10px; color: black;text-align: right; vertical-align: top;";
        W.Eg = 0;
        var lm = "span",
        mm = "div",
        nm = "padding: 2px",
        om = "\u00d7";
        W.addError = function(a, b, c, d) {
            if (!W.Sf(a)) e(l(W.me + ". message: " + b));
            c = W.Ek(b, c, d);
            var f = c.errorMessage;
            b = c.detailedMessage;
            d = c.options;
            c = Kd(d.showInTooltip) ? !!d.showInTooltip: h;
            var g = d[F] == Xk ? Xk: ck,
            j = g == ck ? W.mi: W.Ai;
            j += d[Xb] ? d[Xb] : S;
            g = !!d.removable;
            d = Bg();
            f = d.d(lm, {
                style: j
            },
            d[Ib](f));
            j = W.Uf + W.Eg++;
            var n = d.d(mm, {
                id: j,
                style: W.Ci
            },
            f);
            if (b) if (c) f.title = b;
            else {
                c = ma[yc](lm);
                wa(c, b);
                d[Ra](n, d.d(mm, {
                    style: nm
                },
                c))
            }
            if (g) {
                b = d.d(lm, {
                    style: W.qi
                },
                d[Ib](om));
                b.onclick = je(W.Tg, n);
                d[Ra](f, b)
            }
            W.Fi(a, n);
            return j
        };
        W.removeAll = function(a) {
            if (!W.Sf(a)) e(l(W.me));
            if (a = W.Mg(a, k)) {
                Ma(a[Xb], yl);
                Yg(a)
            }
        };
        var pm = " response is null",
        qm = "user_not_authenticated",
        rm = "invalid_query";
        W.addErrorFromQueryResponse = function(a, b) {
            if (!W.Sf(a)) e(l(W.me));
            if (!b) {
                var c = W.Vf + pm;
                e(l(c))
            }
            if (! (b[vc]() || b.hasWarning())) return i;
            var d = b.getReasons();
            c = h;
            if (b[vc]()) c = !(vf(d, qm) || vf(d, rm));
            d = b.getMessage();
            var f = b.getDetailedMessage();
            c = {
                showInTooltip: c
            };
            Ha(c, b[vc]() ? ck: Xk);
            return W[cb](a, d, f, c)
        };
        W.removeError = function(a) {
            a = ma[zb](a);
            if (W.ei(a)) {
                W.Tg(a);
                return h
            }
            return k
        };
        W.getContainer = function(a) {
            a = ma[zb](a);
            if (W.ei(a)) return a[md][md];
            return i
        };
        W.createProtectedCallback = function(a, b) {
            return function() {
                try {
                    a[ad](i, arguments)
                } catch(c) {
                    ae(b) ? b(c) : na[Sb][hd][cb](b, c[Ub])
                }
            }
        };
        W.Tg = function(a) {
            var b = a[md];
            $g(a);
            if (b[bd][t] == 0) Ma(b[Xb], yl)
        };
        W.ei = function(a) {
            if (a && a.id) {
                if (a.id[uc](W.Uf, 0) == 0) var b = a[md];
                if (b && b.id && b.id[uc](W.le, 0) == 0) if (b[md]) return h;
                return k
            }
        };
        W.Ek = function(a, b, c) {
            var d = Kd(a) && a ? a: ck,
            f = S,
            g = {},
            j = arguments[t];
            if (j == 2) if (b && Vd(b) == Nd) g = b;
            else f = Kd(b) ? b: f;
            else if (j == 3) {
                f = Kd(b) ? b: f;
                g = c || {}
            }
            d = Se(d);
            f = Se(f);
            return {
                errorMessage: d,
                detailedMessage: f,
                options: g
            }
        };
        W.Sf = function(a) {
            return Kd(a) && Zd(a) && a[rb] > 0
        };
        var sm = "display: none; padding-top: 2px";
        W.Mg = function(a, b) {
            for (var c = a[bd], d = i, f = Bg(), g = 0; g < c[t]; g++) if (c[g].id && c[g].id[uc](W.le, 0) == 0) {
                d = c[g];
                f.removeNode(d);
                break
            }
            if (!d && b) {
                d = W.le + W.Eg++;
                d = Qg(mm, {
                    id: d,
                    style: sm
                },
                i)
            }
            if (d)(c = a[Fc]) ? f.Gk(d, c) : f[Ra](a, d);
            return d
        };
        var tm = "block";
        W.Fi = function(a, b) {
            var c = W.Mg(a, h);
            Ma(c[Xb], tm);
            c[Ra](b)
        };
        var um = {};
        um.addListener = function(a, b, c) {
            a = a;
            b = b;
            c = c;
            c = Pl(im).Qc(a, b, c, 0);
            Pl(dm).zh(c);
            return c = c
        };
        um.trigger = function(a, b, c) {
            fm(a, b, c)
        };
        um.Am = function(a, b, c) {
            a = a;
            b = b;
            c = c;
            if (Kl[F] == 2 && Kl.version < 419.2 && b == Ul) {
                a[Ki + b] = c;
                c = Pl(im).Qc(a, b, c, 3)
            } else if (a[Sc]) {
                var d = k;
                if (b == Zl) {
                    b = Wl;
                    d = h
                } else if (b == am) {
                    b = Rl;
                    d = h
                }
                var f = d ? 4 : 1;
                a[Sc](b, c, d);
                c = Pl(im).Qc(a, b, c, f)
            } else if (a.attachEvent) {
                c = Pl(im).Qc(a, b, c, 2);
                a.attachEvent(Ki + b, c.bj())
            } else {
                a[Ki + b] = c;
                c = Pl(im).Qc(a, b, c, 3)
            }
            if (a != ia || b != Xl) Pl(dm).zh(c);
            return a = c
        };
        um.removeListener = function(a) {
            a = a;
            a[sc]();
            Pl(dm).removeListener(a)
        };
        um.removeAllListeners = function(a) {
            em(a)
        };
        var vm = "draw";
        function wm(a, b, c, d) {
            this.Ta = a;
            this.ii = b;
            this.U = c || {};
            this.Sb = d;
            this.Ec = i;
            if (d) this.Ec = this.Ee = nk(d);
            if (!b || !(vm in b) || typeof b[xc] != Td) e(l("Visualization must have a draw method."))
        }
        K = wm[u];
        K.Ee = i;
        K.rg = i;
        K.qg = i;
        K.g = i;
        K.setOptions = function(a) {
            this.U = a || {}
        };
        K.draw = function() {
            this.g && this.ii[xc](this.g, this.U)
        };
        K.Nl = function(a) {
            var b = this.Sb;
            this.Ec = a ? a: b ? this.Ec = this.Ee: i
        };
        K.sendAndDraw = function() {
            if (!this.Ec) e(l("If no container was supplied, a custom error handler must be supplied instead."));
            var a = this.Ta,
            b = this;
            a[oc](function(c) {
                var d = b.rg;
                d && d(c);
                b.td(c); (d = b.qg) && d(c)
            })
        };
        K.td = function(a) {
            var b = this.Ec;
            if (b(a)) {
                this.g = a[Nb]();
                this.ii[xc](this.g, this.U)
            }
        };
        K.setCustomResponseHandler = function(a) {
            if (a == i) this.Fm = i;
            else {
                if (typeof a != Td) e(l("Custom response handler must be a function."));
                this.rg = a
            }
        };
        K.setCustomPostResponseHandler = function(a) {
            if (a != i) {
                if (typeof a != Td) e(l("Custom post response handler must be a function."));
                this.qg = a
            }
        };
        K.abort = function() {
            this.Ta[ob]()
        };
        function X(a) {
            this.g = a;
            var b = [];
            a = a[Jb]();
            for (var c = 0; c < a; c++) b[s](c);
            this.r = b;
            this.Sa = h;
            this.Va = i;
            this.te = [];
            this.se = h
        }
        K = X[u];
        K.wl = function() {
            for (var a = 0; a < this.r[t]; a++) {
                var b = this.r[a];
                if (Zd(b)) this.te[a] = []
            }
            this.se = k
        };
        K.Oc = function() {
            this.se = h
        };
        K.Dk = function() {
            for (var a = [], b = this.g[Xa](), c = 0; c < b; c++) a[s](c);
            this.Va = a;
            this.Oc()
        };
        K.setColumns = function(a) {
            for (var b = 0; b < a[t]; b++) {
                var c = a[b];
                if ($d(c)) U(this.g, c);
                else if (!Zd(c) || c.calc == i || c[F] == i) e(l('Invalid column input, expected either a number or an object with "calc" and "type" properties.'));
                else {
                    var d = c.calc;
                    if (Q(d)) {
                        d = xm[d];
                        if (!ae(d)) e(l("Unknown function " + d));
                        c = c.sourceColumn;
                        Kd(c) && U(this.g, c)
                    }
                }
            }
            this.r = ee(a);
            this.Oc()
        };
        K.Th = function(a, b) {
            if (Wd(a)) {
                if (b !== m) e(l("If the first parameter is an array, no second parameter is expected"));
                for (var c = 0; c < a[t]; c++) wk(this.g, a[c]);
                return yf(a)
            } else if (Vd(a) == O) {
                if (!Vd(b) == O) e(l("If first parameter is a number, second parameter must be specified and be a number."));
                if (a > b) e(l("The first parameter (min) must be smaller than or equal to the second parameter (max)."));
                wk(this.g, a);
                wk(this.g, b);
                var d = [];
                for (c = a; c <= b; c++) d[s](c);
                return d
            } else e(l("First parameter must be a number or an array."))
        };
        K.setRows = function(a, b) {
            this.Va = this.Th(a, b);
            this.Sa = k;
            this.Oc()
        };
        K.getViewColumns = function() {
            return ee(this.r)
        };
        K.getViewRows = function() {
            if (this.Sa) {
                for (var a = [], b = this.g[Xa](), c = 0; c < b; c++) a[s](c);
                return a
            }
            return yf(this.Va)
        };
        K.hideColumns = function(a) {
            this[wd](sf(this.r,
            function(b) {
                return ! vf(a, b)
            }));
            this.Oc()
        };
        K.hideRows = function(a, b) {
            var c = this.Th(a, b);
            if (this.Sa) {
                this.Dk();
                this.Sa = k
            }
            this.setRows(sf(this.Va,
            function(d) {
                return ! vf(c, d)
            }));
            this.Oc()
        };
        K.getViewColumnIndex = function(a) {
            return qf(this.r, a)
        };
        K.getViewRowIndex = function(a) {
            if (this.Sa) {
                if (a < 0 || a >= this.g[Xa]()) return - 1;
                return a
            }
            return qf(this.Va, a)
        };
        K.getTableColumnIndex = function(a) {
            U(this, a);
            a = this.r[a];
            return $d(a) ? a: -1
        };
        K.getUnderlyingTableColumnIndex = function(a) {
            a = this.getTableColumnIndex(a);
            if (a == -1) return a;
            if (ae(this.g.getUnderlyingTableColumnIndex)) a = this.g.getUnderlyingTableColumnIndex(a);
            return a
        };
        K.getTableRowIndex = function(a) {
            wk(this, a);
            return this.Sa ? a: this.Va[a]
        };
        K.getUnderlyingTableRowIndex = function(a) {
            a = this[Rc](a);
            if (ae(this.g.getUnderlyingTableRowIndex)) a = this.g.getUnderlyingTableRowIndex(a);
            return a
        };
        K.getNumberOfRows = function() {
            return this.Sa ? this.g[Xa]() : this.Va[t]
        };
        K.getNumberOfColumns = function() {
            return this.r[t]
        };
        K.getColumnId = function(a) {
            U(this, a);
            a = this.r[a];
            return $d(a) ? this.g.getColumnId(a) : a.id
        };
        K.getColumnIndex = function(a) {
            for (var b = 0; b < this.r[t]; b++) {
                var c = this.r[b];
                if (Zd(c) && c.id == a) return b
            }
            a = this.g.getColumnIndex(a);
            return this.getViewColumnIndex(a)
        };
        K.getColumnLabel = function(a) {
            U(this, a);
            a = this.r[a];
            return $d(a) ? this.g[zc](a) : a[pd]
        };
        K.getColumnPattern = function(a) {
            U(this, a);
            a = this.r[a];
            return $d(a) ? this.g.getColumnPattern(a) : i
        };
        K.getColumnType = function(a) {
            U(this, a);
            a = this.r[a];
            return $d(a) ? this.g[Ec](a) : a[F]
        };
        La(K,
        function(a, b) {
            U(this, b);
            var c = this[Rc](a),
            d = this.r[b];
            return $d(d) ? this.g[H](c, d) : this.ek(c, b)
        });
        K.ek = function(a, b) {
            this.se && this.wl();
            var c = this.te[b][a];
            if (c !== m) return c;
            else {
                c = this.r[b];
                var d = c.calc;
                if (Q(d)) {
                    d = xm[d];
                    c = d(this.g, a, c.sourceColumn)
                } else c = d[E](i, this.g, a);
                return this.te[b][a] = c
            }
        };
        K.getFormattedValue = function(a, b) {
            U(this, b);
            var c = this.r[b];
            if (Zd(c)) return Lk(this[H](a, b), this[Ec](b));
            else if ($d(c)) {
                var d = this[Rc](a);
                return this.g[gd](d, c)
            } else return S
        };
        K.getProperty = function(a, b, c) {
            U(this, b);
            b = this.r[b];
            if ($d(b)) {
                a = this[Rc](a);
                return this.g[Yb](a, b, c)
            } else return i
        };
        K.getProperties = function(a, b) {
            U(this, b);
            var c = this.r[b];
            if ($d(c)) {
                var d = this[Rc](a);
                return this.g[bb](d, c)
            } else return {}
        };
        K.getColumnProperty = function(a, b) {
            U(this, a);
            var c = this.r[a];
            return $d(c) ? this.g[Eb](c, b) : i
        };
        K.getColumnProperties = function(a) {
            U(this, a);
            a = this.r[a];
            return $d(a) ? this.g[Zb](a) : {}
        };
        K.getTableProperty = function(a) {
            return this.g.getTableProperty(a)
        };
        K.getTableProperties = function() {
            return this.g.getTableProperties()
        };
        K.getRowProperty = function(a, b) {
            var c = this[Rc](a);
            return this.g.getRowProperty(c, b)
        };
        K.getRowProperties = function(a) {
            wk(this, a);
            a = this[Rc](a);
            return this.g[Zc](a)
        };
        K.getColumnRange = function(a) {
            return Ck(this, a)
        };
        K.getDistinctValues = function(a) {
            return Ek(this, a)
        };
        K.getSortedRows = function(a) {
            return Dk(this, a)
        };
        K.getFilteredRows = function(a) {
            return Kk(this, a)
        };
        var ym = "Invalid DataView column type.";
        K.toDataTable = function() {
            var a = this.g;
            if (ae(a[Bc])) a = a[Bc]();
            a = Me(a[hb]());
            var b = this[Jb](),
            c = this[Xa](),
            d,
            f,
            g,
            j = [],
            n = [];
            for (d = 0; d < b; d++) {
                g = this.r[d];
                if (Zd(g)) {
                    f = g;
                    g = {};
                    var q = void 0;
                    for (q in f) g[q] = f[q];
                    f = g;
                    delete f.calc
                } else if ($d(g)) f = a.cols[g];
                else e(l(ym));
                j[s](f)
            }
            for (f = 0; f < c; f++) {
                d = this.Sa ? f: this.Va[f];
                q = a.rows[d];
                var v = [];
                for (d = 0; d < b; d++) {
                    g = this.r[d];
                    var B;
                    if (Zd(g)) B = {
                        v: this[H](f, d)
                    };
                    else if ($d(g)) B = q.c[this.r[d]];
                    else e(l(ym));
                    v[s](B)
                }
                q.c = v;
                n[s](q)
            }
            a.cols = j;
            a.rows = n;
            return a = new V(a)
        };
        K.toJSON = function() {
            for (var a = {},
            b = [], c = 0; c < this.r[t]; c++) {
                var d = this.r[c];
                if (!Zd(d) || Q(d.calc)) b[s](d)
            }
            b[t] == 0 || (a.columns = b);
            this.Sa || (a.rows = yf(this.Va));
            return Ge(a)
        };
        function zm(a, b) {
            if (Q(b)) b = Me(b);
            var c = new X(a),
            d = b.columns,
            f = b.rows;
            Kd(d) && c[wd](d);
            Kd(f) && c.setRows(f);
            return c
        }
        var xm = {
            emptyString: function() {
                return S
            },
            toString: function(a, b, c) {
                return a[gd](b, c)
            },
            fillFromTop: function(a, b, c) {
                return Ok(a, b, c, h)
            },
            fillFromBottom: function(a, b, c) {
                return Ok(a, b, c, k)
            }
        };
        function Am(a, b, c, d) {
            this.top = a;
            this.right = b;
            this.bottom = c;
            ya(this, d)
        }
        za(Am[u],
        function() {
            return new Am(this.top, this[Ed], this[Tc], this[C])
        });
        Ia(Am[u],
        function(a) {
            a = !this || !a ? k: a instanceof Am ? a[C] >= this[C] && a[Ed] <= this[Ed] && a.top >= this.top && a[Tc] <= this[Tc] : a.x >= this[C] && a.x <= this[Ed] && a.y >= this.top && a.y <= this[Tc];
            return a
        });
        function Bm(a, b, c, d) {
            ya(this, a);
            this.top = b;
            va(this, c);
            Na(this, d)
        }
        za(Bm[u],
        function() {
            return new Bm(this[C], this.top, this[w], this[I])
        });
        Bm[u].Ik = function(a) {
            var b = r.max(this[C], a[C]),
            c = r.min(this[C] + this[w], a[C] + a[w]);
            if (b <= c) {
                var d = r.max(this.top, a.top);
                a = r.min(this.top + this[I], a.top + a[I]);
                if (d <= a) {
                    ya(this, b);
                    this.top = d;
                    va(this, c - b);
                    Na(this, a - d);
                    return h
                }
            }
            return k
        };
        Ia(Bm[u],
        function(a) {
            return a instanceof Bm ? this[C] <= a[C] && this[C] + this[w] >= a[C] + a[w] && this.top <= a.top && this.top + this[I] >= a.top + a[I] : a.x >= this[C] && a.x <= this[C] + this[w] && a.y >= this.top && a.y <= this.top + this[I]
        });
        function Cm(a, b) {
            var c = Dg(a);
            if (c[id] && c[id].getComputedStyle) if (c = c[id].getComputedStyle(a, i)) return c[b] || c.getPropertyValue(b);
            return S
        }
        function Dm(a, b) {
            return Cm(a, b) || (a.currentStyle ? a.currentStyle[b] : i) || a[Xb][b]
        }
        var Em = "position";
        function Fm(a) {
            return Dm(a, Em)
        }
        var Gm = "1.9";
        function Hm(a, b, c) {
            var d, f = cg && (ig || jg) && tg(Gm);
            if (b instanceof Ff) {
                d = b.x;
                b = b.y
            } else {
                d = b;
                b = c
            }
            ya(a[Xb], Im(d, f));
            a[Xb].top = Im(b, f)
        }
        function Jm(a) {
            var b = a[ab]();
            if (T) {
                a = a.ownerDocument;
                b.left -= a[Cd][Pc] + a[dc][Pc];
                b.top -= a[Cd][Xc] + a[dc][Xc]
            }
            return b
        }
        var Km = "fixed",
        Lm = "absolute",
        Mm = "static";
        function Nm(a) {
            if (T) return a.offsetParent;
            var b = Dg(a),
            c = Dm(a, Em),
            d = c == Km || c == Lm;
            for (a = a[md]; a && a != b; a = a[md]) {
                c = Dm(a, Em);
                d = d && c == Mm && a != b[Cd] && a != b[dc];
                if (!d && (a.scrollWidth > a[mb] || a[Cc] > a[Lc] || c == Km || c == Lm)) return a
            }
            return i
        }
        var Om = "overflow",
        Pm = "visible",
        Qm = "borderLeftWidth",
        Rm = "borderRightWidth",
        Sm = "borderTopWidth";
        function Tm(a) {
            var b = new Am(0, aa, aa, 0),
            c = Bg(a),
            d = c.l[dc],
            f = c.Tj(),
            g;
            for (a = a; a = Nm(a);) if ((!T || a[mb] != 0) && (!dg || a[Lc] != 0 || a != d) && (a.scrollWidth != a[mb] || a[Cc] != a[Lc]) && Dm(a, Om) != Pm) {
                var j = Um(a),
                n;
                n = a;
                if (cg && !tg(Gm)) {
                    var q = ea(Cm(n, Qm));
                    if (Vm(n)) {
                        var v = n[Db] - n[mb] - q - ea(Cm(n, Rm));
                        q += v
                    }
                    n = new Ff(q, ea(Cm(n, Sm)))
                } else n = new Ff(n[Pc], n[Xc]);
                j.x += n.x;
                j.y += n.y;
                b.top = r.max(b.top, j.y);
                b.right = r.min(b[Ed], j.x + a[mb]);
                b.bottom = r.min(b[Tc], j.y + a[Lc]);
                ya(b, r.max(b[C], j.x));
                g = g || a != f
            }
            d = f[Nc];
            f = f[Sa];
            if (dg) {
                b.left += d;
                b.top += f
            } else {
                ya(b, r.max(b[C], d));
                b.top = r.max(b.top, f)
            }
            if (!g || dg) {
                b.right += d;
                b.bottom += f
            }
            c = c.fk();
            b.right = r.min(b[Ed], d + c[w]);
            b.bottom = r.min(b[Tc], f + c[I]);
            return b.top >= 0 && b[C] >= 0 && b[Tc] > b.top && b[Ed] > b[C] ? b: i
        }
        var Wm = "TR";
        function Um(a) {
            var b, c = Dg(a),
            d = Dm(a, Em),
            f = cg && c[nc] && !a[ab] && d == Lm && (b = c[nc](a)) && (b[ic] < 0 || b[jc] < 0),
            g = new Ff(0, 0),
            j;
            b = c ? c[rb] == 9 ? c: Dg(c) : ma;
            j = T && !Bg(b).$g() ? b[dc] : b[Cd];
            if (a == j) return g;
            if (a[ab]) {
                b = Jm(a);
                a = Bg(c).$b();
                g.x = b[C] + a.x;
                g.y = b.top + a.y
            } else if (c[nc] && !f) {
                b = c[nc](a);
                a = c[nc](j);
                g.x = b[ic] - a[ic];
                g.y = b[jc] - a[jc]
            } else {
                b = a;
                do {
                    g.x += b.offsetLeft;
                    g.y += b[qd];
                    if (b != a) {
                        g.x += b[Pc] || 0;
                        g.y += b[Xc] || 0
                    }
                    if (dg && Fm(b) == Km) {
                        g.x += c[dc][Nc];
                        g.y += c[dc][Sa];
                        break
                    }
                    b = b.offsetParent
                } while ( b && b != a );
                if (bg || dg && d == Lm) g.y -= c[dc][qd];
                for (b = a; (b = Nm(b)) && b != c[dc] && b != j;) {
                    g.x -= b[Nc];
                    if (!bg || b[dd] != Wm) g.y -= b[Sa]
                }
            }
            return g
        }
        function Xm(a, b, c) {
            if (b instanceof Hf) {
                c = b[I];
                b = b[w]
            } else {
                if (c == m) e(l("missing height argument"));
                c = c
            }
            va(a[Xb], Im(b, h));
            Na(a[Xb], Im(c, h))
        }
        var Ym = "px";
        function Im(a, b) {
            if (typeof a == O) a = (b ? r[nb](a) : a) + Ym;
            return a
        }
        var Zm = "10",
        $m = "display",
        an = "hidden",
        bn = "inline";
        function cn(a) {
            var b = bg && !tg(Zm);
            if (Dm(a, $m) != yl) return b ? new Hf(a[Db] || a[mb], a[td] || a[Lc]) : new Hf(a[Db], a[td]);
            var c = a[Xb],
            d = c.display,
            f = c.visibility,
            g = c.position;
            Qa(c, an);
            c.position = Lm;
            Ma(c, bn);
            if (b) {
                b = a[Db] || a[mb];
                a = a[td] || a[Lc]
            } else {
                b = a[Db];
                a = a[td]
            }
            Ma(c, d);
            c.position = g;
            Qa(c, f);
            return new Hf(b, a)
        }
        function dn(a) {
            var b = Um(a);
            a = cn(a);
            return new Bm(b.x, b.y, a[w], a[I])
        }
        var en = "opacity",
        fn = "MozOpacity",
        gn = "filter",
        hn = "alpha(opacity=";
        function jn(a, b) {
            var c = a[Xb];
            if (en in c) c.opacity = b;
            else if (fn in c) c.MozOpacity = b;
            else if (gn in c) c.filter = b === S ? S: hn + b * 100 + Le
        }
        function kn(a, b) {
            Ma(a[Xb], b ? S: yl)
        }
        var ln = "rtl",
        mn = "direction";
        function Vm(a) {
            return ln == Dm(a, mn)
        }
        var nn = cg ? "MozUserSelect": dg ? "WebkitUserSelect": i,
        on = "*",
        pn = "unselectable";
        function qn(a, b, c) {
            c = !c ? a[yd](on) : i;
            if (nn) {
                b = b ? yl: S;
                a[Xb][nn] = b;
                if (c) {
                    a = 0;
                    for (var d; d = c[a]; a++) d[Xb][nn] = b
                }
            } else if (T || bg) {
                b = b ? Ki: S;
                a[Uc](pn, b);
                if (c) for (a = 0; d = c[a]; a++) d[Uc](pn, b)
            }
        };
        var rn = "google.loader.GoogleApisBase",
        sn = "http://ajax.googleapis.com/ajax",
        tn = "google.visualization.Version",
        un = "1.0",
        vn = "/static/modules/gviz/";
        function wn() {
            var a = Jd(rn);
            Kd(a) || (a = sn);
            var b = Jd(tn);
            Kd(b) || (b = un);
            return a + vn + b
        }
        var xn = "LINK",
        yn = "link",
        zn = "stylesheet",
        An = "text/css";
        function Bn(a) {
            var b = wn();
            b = b + a;
            a = ma[yd](xn);
            for (var c = 0; c < a[t]; c++) if (a[c] && a[c][Vc] && a[c][Vc] == b) return;
            a = ma[yc](yn);
            a.href = b;
            a.rel = zn;
            Ha(a, An);
            if (ma[yd](jk)[t] == 0) {
                b = ma[yd](kk)[0];
                c = ma[yd](lk)[0];
                var d = ma[yc](jk);
                b[Rb](d, c)
            }
            b = ma[yd](jk)[0];
            b[Ra](a)
        };
        function Cn(a, b) {
            a = ka(a);
            b = ka(b);
            this.start = a < b ? a: b;
            this.Ge = a < b ? b: a
        }
        za(Cn[u],
        function() {
            return new Cn(this[tc], this.Ge)
        });
        function Dn() {}
        K = Dn[u];
        K.ca = function(a) {
            if (! (Zd(a) && ae(a[Jb]) && ae(a[Xa]))) e(l("Invalid data table."))
        };
        K.Yl = function(a) {
            this.ca(a);
            a = new na[Sb][Ic](a);
            if (this.W(a)) return a;
            a = this.rl(a);
            a = this.oc(a);
            a = this.Dh(a);
            return this.W(a) ? a: i
        };
        K.e = function(a, b, c) {
            return c == a[Ec](b)
        };
        K.indexOf = function(a, b) {
            for (var c = 0; c < a[Jb](); c++) if (a[Ec](c) == b) return c;
            return - 1
        };
        K.we = function(a, b) {
            return this.e(a, b, O) ? this.sb(a, b,
            function(c) {
                return c >= 0
            }) : k
        };
        K.sb = function(a, b, c) {
            for (var d = r.min(a[Xa](), 20), f = 0; f < d; f++) {
                var g = a[H](f, b);
                if (g != i && !c(g)) return k
            }
            return h
        };
        K.ig = function(a, b, c) {
            if (!this.e(a, b, O)) return k;
            if (!this.e(a, c, O)) return k;
            var d = ie(this.Pi, this),
            f = ie(this.Qi, this);
            return this.sb(a, b, d) && this.sb(a, c, f)
        };
        K.Pi = function(a) {
            var b = new Cn( - 90, 90);
            return b[tc] <= a && b.Ge >= a && !(ja(a) && a % 1 == 0)
        };
        K.Qi = function(a) {
            var b = new Cn( - 180, 180);
            return b[tc] <= a && b.Ge >= a && !(ja(a) && a % 1 == 0)
        };
        K.Ma = function(a, b) {
            var c = new na[Sb][Ic](a);
            c[wd](b);
            return c
        };
        K.Fa = function(a, b) {
            for (var c = a[Jb](), d = 0; d < c; d++) b(d)
        };
        K.od = function(a, b) {
            var c = this,
            d = 0;
            this.Fa(a,
            function(f) {
                c.e(a, f, b) && d++
            });
            return d
        };
        K.oc = function(a) {
            var b = this,
            c = [],
            d = this.od(a, P);
            this.Fa(a,
            function(f) {
                if (b.e(a, f, O)) c[s](f);
                else b.e(a, f, P) && d == 1 && c[s](f)
            });
            return this.Ma(a, c)
        };
        K.Dh = function(a) {
            if (this.od(a, P) == 1) {
                var b = this[y](a, P),
                c = [b];
                this.Fa(a,
                function(d) {
                    d != b && c[s](d)
                });
                a = this.Ma(a, c)
            }
            return a
        };
        K.rl = function(a) {
            var b = this,
            c = [];
            this.Fa(a,
            function(d) {
                if (b.e(a, d, P)) {
                    var f = b.sb(a, d,
                    function(g) {
                        return /^[\s\xa0]*$/ [gb](g)
                    });
                    f || c[s](d)
                } else c[s](d)
            });
            return this.Ma(a, c)
        };
        K.Ug = function(a) {
            for (var b = a.getDistinctValues(0), c = r.min(a[Xa](), 20), d = 0, f = 0; f < c; f++) {
                var g = a[H](f, 1);
                if (!g || vf(b, g)) d++
            }
            return d / c > 0.6
        };
        function En() {}
        R(En, Dn);
        En[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 2) return k;
            var c = a[Ec](0);
            if (c != xk && c != yk) return k;
            c = a[Ec](1);
            if (c != O) return k;
            c = 0;
            for (var d = 1; d < b; d++) {
                var f = a[Ec](d);
                if (f == O) c = 0;
                else if (f == P) {
                    c++;
                    if (c > 2) return k
                } else return k
            }
            return h
        };
        En[u].oc = function(a) {
            var b = this,
            c = [];
            this.Fa(a,
            function(d) {
                if (b.e(a, d, P) || b.e(a, d, O) || b.e(a, d, xk) || b.e(a, d, yk)) c[s](d)
            });
            return this.Ma(a, c)
        };
        En[u].Dh = function(a) {
            var b = 0;
            b += this.od(a, xk);
            b += this.od(a, yk);
            if (b == 1) {
                var c = this[y](a, xk);
                c = c == -1 ? this[y](a, yk) : c;
                var d = [c];
                this.Fa(a,
                function(f) {
                    f != c && d[s](f)
                });
                a = this.Ma(a, d)
            }
            return a
        };
        function Fn() {}
        R(Fn, Dn);
        Fn[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b == 0) return k;
            var c = !this.e(a, 0, O) ? 1 : 0,
            d = b > c;
            for (c = c; c < b; c++) if (!this.e(a, c, O)) {
                d = k;
                break
            }
            return d
        };
        function Gn() {}
        R(Gn, Dn);
        Gn[u].W = function(a) {
            this.ca(a);
            return this.nj(a) || this.oj(a)
        };
        Gn[u].nj = function(a) {
            var b = a[Jb]();
            if (b < 1 || b > 2) return k;
            var c = h;
            if (b == 2) c = c && this.e(a, 0, P);
            b = b - 1;
            return c = c && this.we(a, b)
        };
        Gn[u].oj = function(a) {
            var b = a[Jb](),
            c = a[Xa]();
            if (b == 0 || c != 1) return k;
            c = h;
            for (var d = 0; d < b; d++) if (!this.e(a, d, O)) {
                c = k;
                break
            }
            return c
        };
        function Hn() {}
        R(Hn, Dn);
        Hn[u].W = function(a) {
            return this.Je(a) || this.Ie(a)
        };
        Hn[u].Je = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 2 || b > 4) return k;
            var c = this.e(a, 0, O);
            c = c && this.e(a, 1, O);
            if (b == 3) c = c && this.e(a, 2, O);
            if (b == 4) c = c && this.e(a, 3, P);
            return c && this.ig(a, 0, 1)
        };
        Hn[u].Ie = function(a) {
            var b = a[Jb]();
            if (b < 1 || b > 3) return k;
            var c = this.e(a, 0, P);
            if (b == 2) c = c && this.e(a, 1, O);
            if (b == 3) c = c && this.e(a, 2, P);
            return c
        };
        function In() {}
        R(In, Dn);
        In[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b == 0) return k;
            var c = !this.e(a, 0, O) ? 1 : 0,
            d = b > c;
            for (c = c; c < b; c++) if (!this.e(a, c, O)) {
                d = k;
                break
            }
            return d
        };
        function Jn() {}
        R(Jn, Dn);
        Jn[u].W = function(a) {
            return this.Je(a) || this.Ie(a)
        };
        Jn[u].Je = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 2 || b > 3) return k;
            var c = this.e(a, 0, O);
            c = c && this.e(a, 1, O);
            if (b == 3) c = c && this.e(a, 2, P);
            return c && this.ig(a, 0, 1)
        };
        Jn[u].Ie = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 1 || b > 2) return k;
            if (!this.e(a, 0, P)) return k;
            if (b == 2 && !this.e(a, 1, P)) return k;
            return h
        };
        function Kn() {}
        R(Kn, Dn);
        Kn[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 3) return k;
            var c = a[Ec](0);
            if (c != P) return k;
            c = a[Ec](1);
            if (c != O && c != xk && c != P) return k;
            if (c == P && !this.Si(a, 1) && !this.Ri(a, 1)) return k;
            if (c == O && !this.sb(a, 1,
            function(f) {
                return ja(f) && f % 1 == 0
            })) return k;
            for (c = 2; c < b; c++) {
                var d = a[Ec](c);
                if (d != O && d != P) return k
            }
            return h
        };
        Kn[u].Si = function(a, b) {
            return this.sb(a, b,
            function(c) {
                if (c[t] != 7) return k;
                var d = c[Wc](0, 3);
                if (pa(d)) return k;
                if (c[Hb](4) != ph) return k;
                c = c[Wc](6, 7);
                if (pa(c)) return k;
                return h
            })
        };
        Kn[u].Ri = function(a, b) {
            return this.sb(a, b,
            function(c) {
                if (c[t] != 6) return k;
                var d = c[Wc](0, 3);
                if (pa(d)) return k;
                if (c[Hb](4) != Mh) return k;
                c = c[Hb](5);
                if (pa(c)) return k;
                return h
            })
        };
        function Ln() {}
        R(Ln, Dn);
        Ln[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 2 || b > 3) return k;
            var c = this.e(a, 0, P) && this.e(a, 1, P);
            if (b == 3) c = c && this.e(a, 2, P);
            return c && this.Ug(a)
        };
        Ln[u].oc = function(a) {
            var b = this,
            c = [];
            this.Fa(a,
            function(d) {
                b.e(a, d, P) && c[s](d)
            });
            return this.Ma(a, c)
        };
        function Mn() {}
        R(Mn, Dn);
        Mn[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 1 || b > 2) return k;
            var c = this.e(a, b - 1, O);
            return c = c && this.we(a, b - 1)
        };
        function Nn() {}
        R(Nn, Dn);
        Nn[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b == 0) return k;
            var c = this.e(a, 0, P) ? 1 : 0,
            d = b > c;
            for (c = c; c < b; c++) if (!this.e(a, c, O)) {
                d = k;
                break
            }
            return d
        };
        function On() {}
        R(On, Dn);
        On[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b < 2) return k;
            if (this.e(a, 0, re) || this.e(a, 0, P)) return k;
            var c = !this.e(a, 0, O) ? 1 : 0,
            d = b > c;
            for (c = c; c < b; c++) if (!this.e(a, c, O)) {
                d = k;
                break
            }
            return d
        };
        On[u].oc = function(a) {
            var b = this,
            c = [];
            this.Fa(a,
            function(d) { ! b.e(a, d, P) && !b.e(a, d, re) && c[s](d)
            });
            return this.Ma(a, c)
        };
        function Pn() {}
        R(Pn, Dn);
        Pn[u].W = function(a) {
            this.ca(a);
            for (var b = h,
            c = a[Jb](), d = 0; d < c; d++) if (!this.e(a, d, O)) {
                b = k;
                break
            }
            return b
        };
        Pn[u].oc = function(a) {
            var b = this,
            c = [];
            this.Fa(a,
            function(d) {
                b.e(a, d, O) && c[s](d)
            });
            return this.Ma(a, c)
        };
        function Qn() {}
        R(Qn, Dn);
        Qn[u].W = function() {
            return h
        };
        function Rn() {}
        R(Rn, Dn);
        Rn[u].W = function(a) {
            this.ca(a);
            var b = a[Jb]();
            if (b != 4) return k;
            var c = this.e(a, 0, P) && this.e(a, 1, P);
            if (b > 2) if ((c = c && this.we(a, 2)) && b > 3) c = c && this.e(a, 3, O);
            return c && this.Ug(a)
        };
        Rn[u].oc = function(a) {
            var b = this,
            c = [];
            this.Fa(a,
            function(d) {
                if (b.e(a, d, P) || b.e(a, d, O)) c[s](d)
            });
            return this.Ma(a, c)
        };
        var Sn = "ImageRadarChart",
        Tn = Qf("AnnotatedTimeLine", {
            format: new En,
            V: 3
        },
        "AreaChart", {
            format: new Fn,
            V: 2
        },
        "BarChart", {
            format: new In,
            V: 2
        },
        "ColumnChart", {
            format: new In,
            V: 2
        },
        "Gauge", {
            format: new Gn,
            V: 1
        },
        "GeoMap", {
            format: new Hn,
            V: 2
        },
        "LineChart", {
            format: new In,
            V: 2
        },
        Sn, {
            format: new Nn,
            V: 1
        },
        "ImageSparkLine", {
            format: new Pn,
            V: 1
        },
        "Map", {
            format: new Jn,
            V: 2
        },
        "MotionChart", {
            format: new Kn,
            V: 3
        },
        "OrgChart", {
            format: new Ln,
            V: 2
        },
        "PieChart", {
            format: new Mn,
            V: 2
        },
        "ScatterChart", {
            format: new On,
            V: 2
        },
        "Table", {
            format: new Qn,
            V: 0
        },
        "TreeMap", {
            format: new Rn,
            V: 2
        });
        function Y(a) {
            a = a || {};
            if (Q(a)) a = Me(a);
            this.lg = a.containerId || i;
            this.ve = a.chartType || i;
            this.hg = a.chartName || i;
            this.zc = i;
            this.Ce = a.dataSourceUrl || i;
            this.g = i;
            this.setDataTable(a.dataTable);
            this.U = a.options || {};
            var b = a.packages;
            this.sh = b !== m ? b: i;
            this.Ta = a.query || i;
            this.Jb = a.refreshInterval || i;
            this.gi = a.view || i
        }
        var Un = "corechart",
        Vn = {
            AnnotatedTimeLine: "annotatedtimeline",
            AreaChart: Un,
            BarChart: Un,
            ColumnChart: Un,
            Gauge: "gauge",
            GeoMap: "geomap",
            ImageAreaChart: "imageareachart",
            ImageBarChart: "imagebarchart",
            ImageChart: "imagechart",
            ImageLineChart: "imagelinechart",
            ImagePieChart: "imagepiechart",
            ImageSparkLine: "imagesparkline",
            IntensityMap: "intensitymap",
            LineChart: Un,
            Map: "map",
            MotionChart: "motionchart",
            OrgChart: "orgchart",
            PieChart: Un,
            ScatterChart: Un,
            Table: "table",
            Timeline: "timeline",
            TreeMap: "treemap"
        };
        K = Y[u];
        K.wf = i;
        K.draw = function(a) {
            a = Eg(a || S);
            if (! (Zd(a) && a[rb] > 0)) {
                a = Eg(this.getContainerId());
                if (! (Zd(a) && a[rb] > 0)) e(l("The container is null or not defined."))
            }
            try {
                if (!Kd(this[Qc]())) e(l("The chart type is not defined."));
                if (this.Kg()) this.xg(a);
                else {
                    var b = ie(this.xg, this, a);
                    b = na[Sb][hd].createProtectedCallback(b, ie(this.Te, this, a));
                    this.Uk(b)
                }
            } catch(c) {
                this.Te(a, c)
            }
        };
        K.toJSON = function() {
            var a = this[Nb](),
            b = this.getPackages(),
            c = a && Me(a[hb]());
            return Ge({
                chartType: this[Qc]() || m,
                chartName: this.getChartName() || m,
                dataSourceUrl: this.getDataSourceUrl() || m,
                dataTable: a === i ? m: c,
                options: this[Ab]() || m,
                packages: b === i ? m: b,
                refreshInterval: this.getRefreshInterval() || m,
                query: this.getQuery() || m,
                view: this.getView() || m
            })
        };
        K.getDataSourceUrl = function() {
            return this.Ce
        };
        K.getDataTable = function() {
            return this.g
        };
        K.getChartType = function() {
            return this.ve
        };
        K.getChartName = function() {
            return this.hg
        };
        K.Qj = function() {
            return this.zc
        };
        K.getContainerId = function() {
            return this.lg
        };
        K.getQuery = function() {
            return this.Ta
        };
        K.getRefreshInterval = function() {
            return this.Jb
        };
        K.getOption = function(a, b) {
            var c = this.U[a];
            b = b !== m ? b: i;
            return c = Kd(c) ? c: b
        };
        K.getOptions = function() {
            return this.U
        };
        K.setDataSourceUrl = function(a) {
            if (a != this.Ce) this.Em = i;
            this.Ce = a
        };
        K.setDataTable = function(a) {
            this.g = a == i ? i: a instanceof na[Sb][eb] ? a: Wd(a) ? na[Sb].arrayToDataTable(a) : new na[Sb][eb](a)
        };
        K.setChartType = function(a) {
            this.ve = a
        };
        K.setChartName = function(a) {
            this.hg = a
        };
        K.setContainerId = function(a) {
            this.lg = a
        };
        K.setQuery = function(a) {
            this.Ta = a
        };
        K.setRefreshInterval = function(a) {
            this.Jb = a
        };
        K.setOption = function(a, b) {
            this.U[a] = Kd(b) ? b: m
        };
        K.setOptions = function(a) {
            this.U = a || {}
        };
        K.setPackages = function(a) {
            this.sh = a
        };
        K.setView = function(a) {
            this.gi = a
        };
        K.getSnapshot = function() {
            var a = new Y(this[hb]()),
            b = this.wf && this.wf[hb]();
            if (b) {
                b = new na[Sb][eb](b);
                a.setDataTable(b)
            }
            return a
        };
        K.getView = function() {
            return this.gi
        };
        var Wn = "google.visualization.";
        K.Kg = function() {
            var a = this[Qc](),
            b = Jd(a);
            if (!ae(b)) {
                b = Jd(Wn + a);
                b = ae(b) ? b: i
            }
            return b
        };
        K.getPackages = function() {
            return this.sh
        };
        K.Te = function(a, b) {
            var c = b && b[Ub] || ck,
            d = na[Sb][hd][cb](a, c);
            na[Sb][ub][Za](this, ck, {
                id: d,
                message: c
            })
        };
        K.pk = function(a, b) {
            var c = b.getMessage(),
            d = b.getDetailedMessage(),
            f = na[Sb][hd].addErrorFromQueryResponse(a, b);
            na[Sb][ub][Za](this, ck, {
                id: f,
                message: c,
                detailedMessage: d
            })
        };
        var Xn = "Invalid chart type: ";
        K.Vi = function() {
            var a = this.getPackages();
            if (!Kd(a)) {
                var b = this[Qc]();
                b = b[x](Wn, S);
                a = Vn[b];
                if (!Kd(a)) e(l(Xn + b))
            }
            if (Q(a)) a = [a];
            return a
        };
        var Yn = "select",
        Zn = "ImageChart",
        $n = "cht",
        ao = "r",
        bo = "rs";
        K.yg = function(a, b) {
            var c = this.Kg();
            if (!c) e(l(Xn + this[Qc]()));
            var d;
            if (!this.zc || this.zc[Gb] != c) {
                d = new c(a);
                c = [Rj, Yn, ck];
                var f = this;
                rf(c,
                function(j) {
                    na[Sb][ub].addListener(d, j,
                    function(n) {
                        if (j == Rj) f.zc = d;
                        na[Sb][ub][Za](f, j, n)
                    })
                })
            } else d = this.zc;
            c = this.getView();
            if (c == al) {
                c = this.ve;
                if (c == Zn) {
                    var g = this.getOption($n);
                    if (g == ao || g == bo) c = Sn
                }
                if (c = (c = Tn[c]) && c[mc]) b = (c = c.Yl(b)) ? c[Bc]() : b
            } else if (Kd(c)) b = na[Sb][Ic].fromJSON(b, c);
            this.wf = new na[Sb][eb](b[hb]());
            d[xc](b, this[Ab]())
        };
        K.kj = function(a, b) {
            if (b[vc]()) this.pk(a, b);
            else {
                var c = b[Nb]();
                this.yg(a, c)
            }
        };
        var co = "visualization";
        K.Uk = function(a) {
            var b = this.Vi();
            a = {
                packages: b,
                callback: a
            };
            b = Jd(tn);
            if (b === i) b = un;
            na.load(co, b, a)
        };
        K.xg = function(a) {
            var b = this[Nb]();
            if (b) this.yg(a, b);
            else {
                b = ie(this.kj, this, a);
                b = na[Sb][hd].createProtectedCallback(b, ie(this.Te, this, a));
                this.Ih(b, h)
            }
        };
        K.Ih = function(a, b) {
            var c = typeof b == re ? b: k,
            d = this.getDataSourceUrl() || S;
            d = new na[Sb].Query(d);
            var f = this.getRefreshInterval();
            f && c && d[$c](f); (c = this.getQuery()) && d[$b](c);
            d[oc](a)
        };
        function eo(a, b) { (new Y(a))[xc](b)
        }
        var fo = "json";
        function go(a, b) {
            var c = new aj(b || ma[Ob][Vc]),
            d = c.Og(fo),
            f;
            if (Kd(d)) f = d;
            else {
                f = {};
                rf(c.$.zb(),
                function(g) {
                    var j = c.Og(g);
                    try {
                        if (Kd(j)) j = Me(j)
                    } catch(n) {}
                    f[g] = j
                });
                f.options = ee(f)
            }
            eo(f, a)
        }
        var ho = "options",
        io = "/chart.html",
        jo = "%27",
        ko = "%22";
        function lo(a, b) {
            if (Q(a)) a = Me(a);
            var c = [],
            d,
            f;
            for (f in a) if (f == ho) {
                var g = a[f],
                j;
                for (j in g) {
                    d = g[j];
                    Q(d) || (d = Ge(d));
                    c[s](j + tj + Ue(d))
                }
            } else {
                d = a[f];
                Q(d) || (d = ae(d[hb]) ? d[hb]() : Ge(d));
                c[s](f + tj + Ue(d))
            }
            d = wn() + io;
            d = d[x](/^https?:/, S);
            d = b || d;
            c = d + ej + c[ud](af);
            c = c[x](/'/g, jo);
            return c = c[x](/"/g, ko)
        }
        var mo = "/chart.js",
        no = '<script type="text/javascript" src="',
        oo = '">\n',
        po = "\n<\/script>";
        function qo(a) {
            var b = wn() + mo;
            b = b[x](/^https?:/, S);
            b = no + b + oo;
            a = (new Y(a))[hb]();
            a = a[x](/</g, Ye);
            a = a[x](/>/g, Ze);
            b += a;
            b += po;
            return b
        };
        var ro = "true",
        so = "Unspported type";
        Qf(O,
        function(a) {
            a = a;
            var b = ea(a);
            if (pa(b)) e(l("Not a number " + a));
            return a = b
        },
        P,
        function(a) {
            return a
        },
        re,
        function(a) {
            return a == ro
        },
        xk,
        function() {
            e(l(so))
        },
        yk,
        function() {
            e(l(so))
        },
        zk,
        function() {
            e(l(so))
        });
        var to = "left",
        uo = "full",
        vo = "right";
        function wo(a, b, c, d, f, g) {
            var j = c == to || c == uo,
            n = c == vo || c == uo,
            q = new na[Sb][eb],
            v = [];
            rf(d,
            function(ga) {
                var fb = a[Ec](ga[0]),
                di = b[Ec](ga[1]);
                if (fb != di) e(l("Key types do not match:" + fb + Re + di));
                di = q[ed](fb, a[zc](ga[0]));
                q[hc](di, a[Zb](ga[0]));
                v[s](fb)
            });
            var B = [],
            M = [];
            rf(d,
            function(ga) {
                B[s]({
                    column: ga[0]
                });
                M[s]({
                    column: ga[1]
                })
            });
            var A = a[Hc](B),
            J = b[Hc](M);
            rf(f,
            function(ga) {
                var fb = q[ed](a[Ec](ga), a[zc](ga));
                q[hc](fb, a[Zb](ga))
            });
            rf(g,
            function(ga) {
                var fb = q[ed](b[Ec](ga), b[zc](ga));
                q[hc](fb, b[Zb](ga))
            });
            for (var N = k,
            Z = 0,
            Da = 0,
            ha = 0; Z < A[t] || Da < J[t];) {
                var $ = 0,
                G = [];
                if (Da >= J[t]) if (j) {
                    G[0] = A[Z];
                    $ = -1
                } else break;
                else if (Z >= A[t]) if (n) {
                    G[1] = J[Da];
                    $ = 1
                } else break;
                else {
                    G[0] = A[Z];
                    G[1] = J[Da];
                    for (var D = 0; D < d[t]; D++) {
                        $ = a[H](G[0], d[D][0]);
                        var ac = b[H](G[1], d[D][1]);
                        $ = na[Sb].datautils.compareValues(v[D], $, ac);
                        if ($ != 0) break
                    }
                }
                if (N && $ != 0) {
                    N = k;
                    Da++
                } else {
                    if ($ == -1 && j || $ == 1 && n || $ == 0) {
                        q.addRow();
                        var bc, Bb;
                        if ($ == -1 && j || $ == 0 && c != vo) {
                            bc = a;
                            Bb = 0
                        } else {
                            bc = b;
                            Bb = 1
                        }
                        rf(d,
                        function(ga, fb) {
                            c == uo ? q[ib](ha, fb, bc[H](G[Bb], ga[Bb])) : q[jd](ha, fb, bc[H](G[Bb], ga[Bb]), bc[gd](G[Bb], ga[Bb]), bc[bb](G[Bb], ga[Bb]))
                        });
                        if ($ == -1 && j || $ == 0) {
                            var Qj = d[t];
                            rf(f,
                            function(ga, fb) {
                                q[jd](ha, fb + Qj, a[H](G[0], ga), a[gd](G[0], ga), a[bb](G[0], ga))
                            })
                        }
                        if ($ == 1 && n || $ == 0) {
                            Qj = f[t] + d[t];
                            rf(g,
                            function(ga, fb) {
                                q[jd](ha, fb + Qj, b[H](G[1], ga), b[gd](G[1], ga), b[bb](G[1], ga))
                            })
                        }
                        ha++
                    }
                    if ($ == 1) Da++;
                    else Z++;
                    if ($ == 0) N = h
                }
            }
            return q
        }
        function xo(a) {
            for (var b = 0,
            c = 0; c < a[t]; c++) b += a[c];
            return b
        }
        function yo(a) {
            return a[t]
        }
        function zo(a) {
            return xo(a) / a[t]
        }
        function Ao(a) {
            if (a[t] == 0) return i;
            for (var b = a[0], c = 1; c < a[t]; c++) {
                var d = a[c];
                if (d != i && d < b) b = d
            }
            return b
        }
        function Bo(a) {
            if (a[t] == 0) return i;
            for (var b = a[0], c = 1; c < a[t]; c++) {
                var d = a[c];
                if (d != i && d > b) b = d
            }
            return b
        }
        function Co(a) {
            return a[Ua]() + 1
        }
        var Do = "modifier";
        function Eo(a, b, c) {
            function d(G, D, ac, bc) {
                return D[E](i, ac[H](bc, G))
            }
            var f = [],
            g = [];
            rf(b,
            function(G) {
                if ($d(G)) f[s](G);
                else if (Vd(G) == Nd) {
                    var D = G.column;
                    Do in G && g[s]([D, {
                        calc: je(d, D, G.modifier),
                        type: G[F],
                        label: G[pd],
                        id: G.id
                    }]);
                    f[s](D)
                }
            });
            if (g[t] != 0) {
                for (var j = new na[Sb][Ic](a), n = j.getViewColumns(), q = a[Xa](), v = 0; v < q; v++) rf(g,
                function(G) {
                    n[G[0]] = G[1]
                });
                j[wd](n);
                a = j
            }
            var B = new na[Sb][eb],
            M = [];
            rf(f,
            function(G, D) {
                var ac = a[Ec](G),
                bc = b[D][pd] || a[zc](G),
                Bb = b[D].id;
                B[ed](ac, bc, Bb);
                M[s](ac)
            });
            c = c || [];
            rf(c,
            function(G) {
                var D = G.column;
                D = G[pd] || a[zc](D);
                var ac = G.id;
                B[ed](G[F], D, ac)
            });
            var A = [];
            rf(f,
            function(G) {
                A[s]({
                    column: G
                })
            });
            for (var J = a[Hc](A), N = [], Z = 0; Z < c[t]; Z++) N[s]([]);
            for (Z = 0; Z < J[t]; Z++) {
                rf(c,
                function(G, D) {
                    N[D][s](a[H](J[Z], G.column))
                });
                j = k;
                if (Z < J[t] - 1) {
                    j = h;
                    for (q = 0; q < f[t]; q++) {
                        v = a[H](J[Z], f[q]);
                        var Da = a[H](J[Z + 1], f[q]);
                        if (na[Sb].datautils.compareValues(M[q], v, Da) != 0) {
                            j = k;
                            break
                        }
                    }
                }
                if (!j) {
                    var ha = B.addRow();
                    rf(f,
                    function(G, D) {
                        B[ib](ha, D, a[H](J[Z], G))
                    });
                    var $ = b[t];
                    rf(c,
                    function(G, D) {
                        var ac = G.aggregation[E](this, N[D]);
                        B[ib](ha, $ + D, ac)
                    });
                    for (j = 0; j < J[t]; j++) N[j] = []
                }
            }
            return B
        };
        var Fo = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkgrey: "#a9a9a9",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            grey: "#808080",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        };
        var Go = "hex",
        Ho = "rgb",
        Io = "named";
        function Jo(a) {
            var b = {};
            a = fa(a);
            var c = a[Hb](0) == fj ? a: fj + a;
            if (Ko[gb](c)) {
                b.vd = Lo(c);
                Ha(b, Go);
                return b
            } else {
                a: {
                    var d = a[lc](Mo);
                    if (d) {
                        c = ka(d[1]);
                        var f = ka(d[2]);
                        d = ka(d[3]);
                        if (c >= 0 && c <= 255 && f >= 0 && f <= 255 && d >= 0 && d <= 255) {
                            c = [c, f, d];
                            break a
                        }
                    }
                    c = []
                }
                if (c[t]) {
                    b.vd = No(c[0], c[1], c[2]);
                    Ha(b, Ho);
                    return b
                } else if (Fo) if (c = Fo[a[zd]()]) {
                    b.vd = c;
                    Ha(b, Io);
                    return b
                }
            }
            e(l(a + " is not a valid color string"))
        }
        var Oo = /#(.)(.)(.)/,
        Po = "#$1$1$2$2$3$3";
        function Lo(a) {
            if (!Ko[gb](a)) e(l(Bh + a + "' is not a valid hex color"));
            if (a[t] == 4) a = a[x](Oo, Po);
            return a[zd]()
        }
        function Qo(a) {
            a = Lo(a);
            var b = da(a[Dd](1, 2), 16),
            c = da(a[Dd](3, 2), 16);
            a = da(a[Dd](5, 2), 16);
            return [b, c, a]
        }
        function No(a, b, c) {
            a = ka(a);
            b = ka(b);
            c = ka(c);
            if (pa(a) || a < 0 || a > 255 || pa(b) || b < 0 || b > 255 || pa(c) || c < 0 || c > 255) e(l('"(' + a + Be + b + Be + c + '") is not a valid RGB color'));
            a = Ro(a[Ta](16));
            b = Ro(b[Ta](16));
            c = Ro(c[Ta](16));
            return fj + a + b + c
        }
        var Ko = /^#(?:[0-9a-f]{3}){1,2}$/i,
        Mo = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
        function Ro(a) {
            return a[t] == 1 ? ze + a: a
        };
        var So = "/util/util.css";
        function To(a) {
            this.U = a || {};
            Bn(So)
        }
        var Uo = "google-visualization-formatters-arrow-dr",
        Vo = "google-visualization-formatters-arrow-ug",
        Wo = "google-visualization-formatters-arrow-empty",
        Xo = "className";
        Ea(To[u],
        function(a, b) {
            if (a[Ec](b) == O) {
                var c = this.U;
                c = c.base || 0;
                for (var d = 0; d < a[Xa](); d++) {
                    var f = a[H](d, b),
                    g = i;
                    g = f < c ? Uo: f > c ? Vo: Wo;
                    a[Ac](d, b, Xo, g)
                }
            }
        });
        var Yo = "/util/bar_";
        function Zo(a) {
            this.U = a || {};
            $o || ($o = wn() + Yo)
        }
        var $o = i,
        ap = "b",
        bp = {
            red: ao,
            blue: ap,
            green: mf
        },
        cp = '<img style="padding: 0" src="',
        dp = '.png" height="12" width="',
        ep = '" />';
        function fp(a, b, c) {
            b > 0 && c[s](cp, $o, a, dp, b, ep)
        }
        var gp = '<span style="padding: 0; float: left; white-space: nowrap;">',
        hp = "w",
        ip = "_bar_format_old_value",
        jp = "\u00a0",
        kp = "</span>\u00a0";
        Ea(Zo[u],
        function(a, b) {
            if (a[Ec](b) == O) {
                var c = this.U,
                d = c.min,
                f = c.max,
                g = i;
                if (d == i || f == i) {
                    g = a[Kc](b);
                    if (f == i) f = g.max;
                    if (d == i) d = r.min(0, g.min)
                }
                if (d >= f) {
                    g = g || a[Kc](b);
                    f = g.max;
                    d = g.min
                }
                if (d == f) if (d == 0) f = 1;
                else if (d > 0) d = 0;
                else f = 0;
                g = f - d;
                var j = c.base || 0;
                j = r.max(d, r.min(f, j));
                var n = c[w] || 100,
                q = c.showValue;
                if (q == i) q = h;
                for (var v = r[nb]((j - d) / g * n), B = n - v, M = 0; M < a[Xa](); M++) {
                    var A = a[H](M, b),
                    J = [];
                    A = r.max(d, r.min(f, A));
                    var N = r.ceil((A - d) / g * n);
                    J[s](gp);
                    fp(Ph, 1, J);
                    var Z = lp(c.colorPositive, ap),
                    Da = lp(c.colorNegative, ao),
                    ha = c.drawZeroLine ? 1 : 0;
                    if (v > 0) if (A < j) {
                        fp(hp, N, J);
                        fp(Da, v - N, J);
                        ha > 0 && fp(Rh, ha, J);
                        fp(hp, B, J)
                    } else {
                        fp(hp, v, J);
                        ha > 0 && fp(Rh, ha, J);
                        fp(Z, N - v, J);
                        fp(hp, n - N, J)
                    } else {
                        fp(Z, N, J);
                        fp(hp, n - N, J)
                    }
                    fp(Ph, 1, J);
                    A = a[Yb](M, b, ip);
                    if (A == i) {
                        A = a[gd](M, b);
                        a[Ac](M, b, ip, A)
                    }
                    if (q) {
                        J[s](jp);
                        J[s](A)
                    }
                    J[s](kp);
                    a[Qb](M, b, J[ud](S))
                }
            }
        });
        function lp(a, b) {
            a = (a || S)[zd]();
            return bp[a] || b
        };
        function mp(a, b, c, d) {
            if (Yd(a)) a = a[sd]();
            if (Yd(b)) b = b[sd]();
            if (Wd(a)) a = np(a);
            if (Wd(b)) b = np(b);
            this.Gg = a;
            this.em = b;
            this.Ti = c;
            this.Oi = d
        }
        Ia(mp[u],
        function(a) {
            var b = this.Gg,
            c = this.em;
            if (a == i) return b == i && c == i;
            else if (Yd(a)) a = a[sd]();
            else if (Wd(a)) a = np(a);
            return (b == i || a >= b) && (c == i || a < c)
        });
        mp[u].Ig = function() {
            return this.Oi
        };
        function op(a, b, c, d, f) {
            mp[E](this, a, b, c, S);
            this.vf = b - a;
            if (this.vf <= 0) this.vf = 1;
            this.Mj = Qo(Jo(d).vd);
            this.cm = Qo(Jo(f).vd)
        }
        R(op, mp);
        op[u].Ig = function(a) {
            var b = 1 - (a - this.Gg) / this.vf;
            a = this.Mj;
            var c = this.cm;
            b = b;
            b = r.min(r.max(b, 0), 1);
            a = [r[nb](b * a[0] + (1 - b) * c[0]), r[nb](b * a[1] + (1 - b) * c[1]), r[nb](b * a[2] + (1 - b) * c[2])];
            return No(a[0], a[1], a[2])
        };
        function pp() {
            this.Kd = []
        }
        pp[u].addRange = function(a, b, c, d) {
            this.Kd[s](new mp(a, b, c, d))
        };
        pp[u].addGradientRange = function(a, b, c, d, f) {
            this.Kd[s](new op(a, b, c, d, f))
        };
        var qp = "color:",
        rp = "background-color:";
        Ea(pp[u],
        function(a, b) {
            var c = a[Ec](b);
            if (c == O || c == P || c == xk || c == yk || c == zk) for (c = 0; c < a[Xa](); c++) {
                for (var d = a[H](c, b), f = S, g = 0; g < this.Kd[t]; g++) {
                    var j = this.Kd[g];
                    if (j.contains(d)) {
                        g = j.Ti;
                        d = j.Ig(d);
                        if (g) f += qp + g + ul;
                        if (d) f += rp + d + ul;
                        break
                    }
                }
                a[Ac](c, b, Fg, f)
            }
        });
        function np(a) {
            return a[0] * 36E5 + a[1] * 6E4 + a[2] * 1E3 + (a[t] == 4 ? a[3] : 0)
        };
        function sp(a) {
            this.U = a || {}
        }
        var tp = "short",
        up = "long",
        vp = "medium",
        wp = "Invalid formatType parameter ";
        Ea(sp[u],
        function(a, b) {
            var c = a[Ec](b);
            if (! (c != xk && c != yk)) {
                var d = this.U;
                if (d.pattern != i) c = new yh(d.pattern);
                else {
                    var f = d.formatType || tp,
                    g;
                    if (c == xk) switch (f) {
                    case up:
                        g = 1;
                        break;
                    case vp:
                        g = 2;
                        break;
                    case tp:
                        g = 3;
                        break;
                    default:
                        e(l(wp + f + Id))
                    } else if (c == yk) switch (f) {
                    case up:
                        g = 9;
                        break;
                    case vp:
                        g = 10;
                        break;
                    case tp:
                        g = 11;
                        break;
                    default:
                        e(l(wp + f + Id))
                    } else e(l("Column type: required date or datetime found " + c));
                    c = new yh(g)
                }
                d = d.timeZone;
                if (Kd(d)) var j = wh( - d * 60);
                d = a[Xa]();
                for (f = 0; f < d; f++) {
                    g = a[H](f, b);
                    g = g === i ? S: j == i ? c[mc](g, wh(g[Fd]())) : c[mc](g, j);
                    a[Qb](f, b, g)
                }
            }
        });
        function xp(a) {
            this.U = a || {}
        }
        Ea(xp[u],
        function(a, b) {
            if (a[Ec](b) == O) {
                var c = this.U,
                d = c.fractionDigits;
                if (d == i) d = 2;
                var f = c.decimalSymbol || Id,
                g = c.groupingSymbol;
                if (g == i) g = f == Be ? Id: Be;
                var j = c.prefix || S,
                n = c.suffix || S,
                q = c.negativeColor;
                c = c.negativeParens;
                for (var v = 0; v < a[Xa](); v++) {
                    var B = a[H](v, b);
                    if (B != i) {
                        var M = B;
                        if (c) M = r.abs(M);
                        M = this.Kj(M, d, f, g);
                        M = j + M + n;
                        if (c && B < 0) M = Ke + M + Le;
                        a[Qb](v, b, M);
                        q && B < 0 && a[Ac](v, b, Fg, qp + q + ul)
                    }
                }
            }
        });
        var yp = "0000000000000000";
        xp[u].Kj = function(a, b, c, d) {
            if (b == 0) a = r[nb](a);
            var f = [];
            if (a < 0) {
                a = -a;
                f[s](th)
            }
            var g = r.pow(10, b),
            j = r[nb](a * g);
            a = fa(r[yb](j / g));
            g = fa(j % g);
            if (a[t] > 3 && d) {
                j = a[t] % 3;
                if (j > 0) {
                    f[s](a[Wc](0, j), d);
                    a = a[Wc](j)
                }
                for (; a[t] > 3;) {
                    f[s](a[Wc](0, 3), d);
                    a = a[Wc](3)
                }
            }
            f[s](a);
            if (b > 0) {
                f[s](c);
                if (g[t] < b) g = yp + g;
                f[s](g[Wc](g[t] - b))
            }
            return f[ud](S)
        };
        function zp(a) {
            this.il = a || S
        }
        var Ap = "\\";
        function Bp(a, b, c, d, f, g, j) {
            return g > 0 && j[g - 1] == Ap ? d: b[gd](a, c[da(f, 10)])
        }
        var Cp = "$1";
        Ea(zp[u],
        function(a, b, c, d) {
            var f = b[0];
            if (c != i && Vd(c) == O) f = c;
            c = d || i;
            for (d = 0; d < a[Xa](); d++) {
                var g = this.il[x](/{(\d+)}/g, je(Bp, d, a, b));
                g = g[x](/\\(.)/g, Cp);
                c ? a[Ac](d, f, c, g) : a[Qb](d, f, g)
            }
        });
        o("google.visualization.NumberFormat", xp);
        var Dp = "format";
        p(xp[u], Dp, xp[u][mc]);
        o("google.visualization.ColorFormat", pp);
        p(pp[u], Dp, pp[u][mc]);
        p(pp[u], "addRange", pp[u][Mc]);
        var Ep = "addGradientRange";
        p(pp[u], Ep, pp[u].addGradientRange);
        o("google.visualization.BarFormat", Zo);
        p(Zo[u], Dp, Zo[u][mc]);
        o("google.visualization.ArrowFormat", To);
        p(To[u], Dp, To[u][mc]);
        o("google.visualization.PatternFormat", zp);
        p(zp[u], Dp, zp[u][mc]);
        o("google.visualization.DateFormat", sp);
        p(sp[u], Dp, sp[u][mc]);
        o("google.visualization.TableNumberFormat", xp);
        p(xp[u], Dp, xp[u][mc]);
        o("google.visualization.TableColorFormat", pp);
        p(pp[u], Dp, pp[u][mc]);
        p(pp[u], "addRange", pp[u][Mc]);
        p(pp[u], Ep, pp[u].addGradientRange);
        o("google.visualization.TableBarFormat", Zo);
        p(Zo[u], Dp, Zo[u][mc]);
        o("google.visualization.TableArrowFormat", To);
        p(To[u], Dp, To[u][mc]);
        o("google.visualization.TablePatternFormat", zp);
        p(zp[u], Dp, zp[u][mc]);
        o("google.visualization.TableDateFormat", sp);
        p(sp[u], Dp, sp[u][mc]);
        var Fp = "google.visualization.Player.",
        Gp = "_swf";
        function Hp(a) {
            this.Na = Bg();
            this.Sb = a;
            this.Nf = this.th = this.ej = this.Ba = this.Yh = this.Xb = this.ae = i;
            this.wc = Fp + Ip+++Gp;
            Jp[this.wc] = this;
            Bn(So)
        }
        var Ip = 0,
        Jp = {},
        Kp = wn() + "/util/player.swf";
        K = Hp[u];
        K.hl = function(a) {
            this.ae = a[tc] || 0;
            this.Xb = a.end || i;
            if (!this.Xb) e(l("end is mandatory."));
            this.Yh = a.step || 1;
            this.Ba = a.current || this.ae;
            this.ej = a.play || k;
            this.th = a.timeInterval || 100
        };
        var Lp = "Container is not defined";
        K.draw = function(a) {
            a = a || {};
            this.hl(a);
            var b = this.Sb,
            c = this.Na;
            c.yf(b);
            if (!b) e(l(Lp));
            this.Fk(a)
        };
        var Mp = "#fff",
        Np = "menu",
        Op = "false",
        Pp = "allowScriptAccess",
        Qp = "always",
        Rp = "allowFullscreen",
        Sp = "name";
        K.Fk = function(a) {
            var b = this.Sb,
            c = a[w] || b[w] || 500;
            a = a[I] || b[I] || 25;
            c = new SWFObject(Kp, this.wc, c, a, vg, Mp);
            c.addParam(Np, Op);
            c.addParam(Pp, Qp);
            c.addParam(Rp, ro);
            c.addVariable(Sp, this.wc);
            if (!b.id) b.id = this.wc;
            c.write(b.id)
        };
        K.Xd = function() {
            var a = ma[zb](this.wc);
            a.setPos(this.Ba)
        };
        K.Xi = function() {
            var a = ma[zb](this.wc);
            a.init(this.ae, this.Xb);
            this.Xd()
        };
        K.Sg = function(a) {
            if (a) {
                if (this.Ba == this.Xb) this.Ba = this.ae;
                this.Nf = setInterval(ie(this.kl, this), this.th)
            } else ba(this.Nf)
        };
        var Tp = "play";
        K.kl = function() {
            this.Xd();
            na[Sb][ub][Za](this, Tp, {
                current: this.Ba
            });
            this.Ba += this.Yh;
            if (this.Ba >= this.Xb) {
                this.Ba = this.Xb;
                ba(this.Nf)
            }
            this.Xd()
        };
        var Up = "pause",
        Vp = "seek",
        Wp = "seekRelease";
        function Xp(a, b, c) {
            a = Jp[a];
            switch (b) {
            case Tp:
                a.Sg(h);
                break;
            case Up:
                a.Sg(k);
                break;
            case Rj:
                a.Xi();
                break;
            case Vp:
            case Wp:
                a.Ba = r[yb](c);
                na[Sb][ub][Za](a, Tp, {
                    current: a.Ba
                });
                a.Xd()
            }
        };
        function Yp(a, b, c, d, f) {
            this.aa = !!b;
            a && this[fd](a, d);
            this.eb = f != m ? f: this.za || 0;
            if (this.aa) this.eb *= -1;
            this.dd = !c
        }
        R(Yp, Uh);
        K = Yp[u];
        K.ua = i;
        K.za = 0;
        K.Mf = k;
        K.setPosition = function(a, b, c) {
            if (this.ua = a) this.za = $d(b) ? b: this.ua[rb] != 1 ? 0 : this.aa ? -1 : 1;
            if ($d(c)) this.eb = c
        };
        K.ye = function(a) {
            this.ua = a.ua;
            this.za = a.za;
            this.eb = a.eb;
            this.aa = a.aa;
            this.dd = a.dd
        };
        za(K,
        function() {
            return new Yp(this.ua, this.aa, !this.dd, this.za, this.eb)
        });
        K.Bl = function() {
            var a = this.aa ? 1 : -1;
            if (this.za == a) {
                this.za = a * -1;
                this.eb += this.za * (this.aa ? -1 : 1)
            }
        };
        K.kc = function() {
            var a;
            if (this.Mf) {
                if (!this.ua || this.dd && this.eb == 0) e(Th);
                a = this.ua;
                var b = this.aa ? -1 : 1;
                if (this.za == b) {
                    var c = this.aa ? a[kc] : a[Fc];
                    c ? this[fd](c) : this[fd](a, b * -1)
                } else(c = this.aa ? a.previousSibling: a.nextSibling) ? this[fd](c) : this[fd](a[md], b * -1);
                this.eb += this.za * (this.aa ? -1 : 1)
            } else this.Mf = h;
            a = this.ua;
            if (!this.ua) e(Th);
            return a
        };
        K.Pk = function() {
            return this.za == 1
        };
        K.splice = function() {
            var a = this.ua;
            this.Bl();
            this.aa = !this.aa;
            Yp[u].kc[E](this);
            this.aa = !this.aa;
            for (var b = Xd(arguments[0]) ? arguments[0] : arguments, c = b[t] - 1; c >= 0; c--) a[md] && a[md][Rb](b[c], a.nextSibling);
            $g(a)
        };
        function Zp(a, b) {
            Yp[E](this, a, b, h)
        }
        R(Zp, Yp);
        var $p = "BR";
        function aq(a, b, c, d, f) {
            var g;
            if (a) {
                this.H = a;
                this.M = b;
                this.C = c;
                this.K = d;
                if (a[rb] == 1 && a[dd] != $p) {
                    a = a[bd];
                    if (b = a[b]) {
                        this.H = b;
                        this.M = 0
                    } else {
                        if (a[t]) this.H = a[a[t] - 1];
                        g = h
                    }
                }
                if (c[rb] == 1) if (this.C = c[bd][d]) this.K = 0;
                else this.C = c
            }
            Zp[E](this, f ? this.C: this.H, f);
            if (g) try {
                this.kc()
            } catch(j) {
                if (j != Th) e(j)
            }
        }
        R(aq, Zp);
        K = aq[u];
        K.H = i;
        K.C = i;
        K.M = 0;
        K.K = 0;
        K.ka = function() {
            return this.H
        };
        K.Ga = function() {
            return this.C
        };
        K.Mk = function() {
            return this.Mf && this.ua == this.C && (!this.K || !this.Pk())
        };
        K.kc = function() {
            if (this.Mk()) e(Th);
            return aq.b.kc[E](this)
        };
        K.ye = function(a) {
            this.H = a.H;
            this.C = a.C;
            this.M = a.M;
            this.K = a.K;
            this.eh = a.eh;
            aq.b.ye[E](this, a)
        };
        za(K,
        function() {
            var a = new aq(this.H, this.M, this.C, this.K, this.eh);
            a.ye(this);
            return a
        });
        function bq() {}
        bq[u].mg = function(a, b) {
            var c = b && !a[Ya](),
            d = a.o;
            try {
                return c ? this.fa(d, 0, 1) >= 0 && this.fa(d, 1, 0) <= 0 : this.fa(d, 0, 0) >= 0 && this.fa(d, 1, 1) <= 0
            } catch(f) {
                if (!T) e(f);
                return k
            }
        };
        bq[u].Xf = function() {
            return new aq(this.ka(), this.Qa(), this.Ga(), this.lb())
        };
        function cq(a) {
            this.o = a
        }
        R(cq, bq);
        function dq(a) {
            var b = Dg(a).createRange();
            if (a[rb] == 3) {
                b[Wa](a, 0);
                b[Wb](a, a[t])
            } else if (eq(a)) {
                for (var c, d = a; (c = d[Fc]) && eq(c);) d = c;
                b[Wa](d, 0);
                for (d = a; (c = d[kc]) && eq(c);) d = c;
                b[Wb](d, d[rb] == 1 ? d[bd][t] : d[t])
            } else {
                c = a[md];
                a = qf(c[bd], a);
                b[Wa](c, a);
                b[Wb](c, a + 1)
            }
            return b
        }
        function fq(a, b, c, d) {
            var f = Dg(a).createRange();
            f[Wa](a, b);
            f[Wb](c, d);
            return f
        }
        K = cq[u];
        za(K,
        function() {
            return new this[Gb](this.o.cloneRange())
        });
        K.getContainer = function() {
            return this.o.commonAncestorContainer
        };
        K.ka = function() {
            return this.o.startContainer
        };
        K.Qa = function() {
            return this.o.startOffset
        };
        K.Ga = function() {
            return this.o.endContainer
        };
        K.lb = function() {
            return this.o.endOffset
        };
        K.fa = function(a, b, c) {
            return this.o.compareBoundaryPoints(c == 1 ? b == 1 ? L.Range.START_TO_START: L.Range.START_TO_END: b == 1 ? L.Range.END_TO_START: L.Range.END_TO_END, a)
        };
        K.isCollapsed = function() {
            return this.o.collapsed
        };
        K.select = function(a) {
            var b = Pg(Dg(this.ka()));
            this.Nd(b.getSelection(), a)
        };
        K.Nd = function(a) {
            a.removeAllRanges();
            a[Mc](this.o)
        };
        K.collapse = function(a) {
            this.o[lb](a)
        };
        function gq(a) {
            this.o = a
        }
        R(gq, cq);
        gq[u].Nd = function(a, b) {
            var c = b ? this.Ga() : this.ka(),
            d = b ? this.lb() : this.Qa(),
            f = b ? this.ka() : this.Ga(),
            g = b ? this.Qa() : this.lb();
            a[lb](c, d);
            if (c != f || d != g) a.extend(f, g)
        };
        function hq(a, b) {
            this.o = a;
            this.jj = b
        }
        R(hq, bq);
        var iq = "character";
        function jq(a) {
            var b = Dg(a)[dc].createTextRange();
            if (a[rb] == 1) {
                b.moveToElementText(a);
                eq(a) && !a[bd][t] && b[lb](k)
            } else {
                for (var c = 0,
                d = a; d = d.previousSibling;) {
                    var f = d[rb];
                    if (f == 3) c += d[t];
                    else if (f == 1) {
                        b.moveToElementText(d);
                        break
                    }
                }
                d || b.moveToElementText(a[md]);
                b[lb](!d);
                c && b.move(iq, c);
                b.moveEnd(iq, a[t])
            }
            return b
        }
        var kq = "EndToEnd";
        function lq(a, b, c, d) {
            var f;
            var g = a,
            j = b,
            n = c;
            f = d;
            var q = k;
            if (g[rb] == 1) {
                j = g[bd][j];
                q = !j;
                g = j || g[kc] || g;
                j = 0
            }
            var v = jq(g);
            j && v.move(iq, j);
            if (g == n && j == f) v[lb](h);
            else {
                q && v[lb](k);
                q = k;
                if (n[rb] == 1) {
                    n = (j = n[bd][f]) || n[kc] || n;
                    f = 0;
                    q = !j
                }
                g = jq(n);
                g[lb](!q);
                f && g.moveEnd(iq, f);
                v.setEndPoint(kq, g)
            }
            f = v;
            f = new hq(f, Dg(a));
            f.H = a;
            f.M = b;
            f.C = c;
            f.K = d;
            return f
        }
        K = hq[u];
        K.Ka = i;
        K.H = i;
        K.C = i;
        K.M = -1;
        K.K = -1;
        za(K,
        function() {
            var a = new hq(this.o.duplicate(), this.jj);
            a.Ka = this.Ka;
            a.H = this.H;
            a.C = this.C;
            return a
        });
        K.getContainer = function() {
            if (!this.Ka) {
                var a = this.o.text,
                b = this.o.duplicate(),
                c = a[x](/ +$/, S); (c = a[t] - c[t]) && b.moveEnd(iq, -c);
                c = b.parentElement();
                b = b.htmlText;
                b = b[x](/(\r\n|\r|\n)+/g, Ve)[t];
                if (this[Ya]() && b > 0) return this.Ka = c;
                for (; b > c.outerHTML[x](/(\r\n|\r|\n)+/g, Ve)[t];) c = c[md];
                for (; c[bd][t] == 1 && c.innerText == (c[Fc][rb] == 3 ? c[Fc].nodeValue: c[Fc].innerText);) {
                    if (!eq(c[Fc])) break;
                    c = c[Fc]
                }
                if (a[t] == 0) c = this.Fg(c);
                this.Ka = c
            }
            return this.Ka
        };
        K.Fg = function(a) {
            for (var b = a[bd], c = 0, d = b[t]; c < d; c++) {
                var f = b[c];
                if (eq(f)) {
                    var g = jq(f),
                    j = 1,
                    n = 0,
                    q = g.htmlText != f.outerHTML;
                    if (g = (q = this[Ya]() && q) ? this.fa(g, j, j) >= 0 && this.fa(g, j, n) <= 0 : this.o.inRange(g)) return this.Fg(f)
                }
            }
            return a
        };
        K.ka = function() {
            if (!this.H) {
                this.H = this.Hc(1);
                if (this[Ya]()) this.C = this.H
            }
            return this.H
        };
        K.Qa = function() {
            if (this.M < 0) {
                this.M = this.Ng(1);
                if (this[Ya]()) this.K = this.M
            }
            return this.M
        };
        K.Ga = function() {
            if (this[Ya]()) return this.ka();
            if (!this.C) this.C = this.Hc(0);
            return this.C
        };
        K.lb = function() {
            if (this[Ya]()) return this.Qa();
            if (this.K < 0) {
                this.K = this.Ng(0);
                if (this[Ya]()) this.M = this.K
            }
            return this.K
        };
        var mq = "Start",
        nq = "End",
        oq = "To";
        K.fa = function(a, b, c) {
            return this.o.compareEndPoints((b == 1 ? mq: nq) + oq + (c == 1 ? mq: nq), a)
        };
        K.Hc = function(a, b) {
            var c = b || this.getContainer();
            if (!c || !c[Fc]) return c;
            for (var d = a == 1,
            f = 0,
            g = c[bd][t]; f < g; f++) {
                var j = d ? f: g - f - 1,
                n = c[bd][j],
                q;
                try {
                    q = pq(n)
                } catch(v) {
                    continue
                }
                var B = q.o;
                if (this[Ya]()) if (eq(n)) {
                    if (q.mg(this)) return this.Hc(a, n)
                } else {
                    if (this.fa(B, 1, 1) == 0) {
                        this.M = this.K = j;
                        break
                    }
                } else if (this.mg(q)) {
                    if (!eq(n)) {
                        if (d) this.M = j;
                        else this.K = j + 1;
                        break
                    }
                    return this.Hc(a, n)
                } else if (this.fa(B, 1, 0) < 0 && this.fa(B, 0, 1) > 0) return this.Hc(a, n)
            }
            return c
        };
        K.Ui = function(a, b, c) {
            return this.o.compareEndPoints((b == 1 ? mq: nq) + oq + (c == 1 ? mq: nq), pq(a).o)
        };
        var qq = "StartToStart";
        K.Ng = function(a, b) {
            var c = a == 1,
            d = b || (c ? this.ka() : this.Ga());
            if (d[rb] == 1) {
                d = d[bd];
                var f = d[t],
                g = c ? 0 : f - 1,
                j = c ? 1 : -1;
                for (g = g; g >= 0 && g < f; g += j) {
                    var n = d[g];
                    if (!eq(n)) {
                        n = this.Ui(n, a, a);
                        if (n == 0) return c ? g: g + 1
                    }
                }
                return g == -1 ? 0 : g
            } else {
                f = this.o.duplicate();
                j = jq(d);
                f.setEndPoint(c ? kq: qq, j);
                f = f.text[t];
                return c ? d[t] - f: f
            }
        };
        var rq = "StartToEnd";
        K.isCollapsed = function() {
            return this.o.compareEndPoints(rq, this.o) == 0
        };
        K.select = function() {
            this.o.select()
        };
        K.collapse = function(a) {
            this.o[lb](a);
            if (a) {
                this.C = this.H;
                this.K = this.M
            } else {
                this.H = this.C;
                this.M = this.K
            }
        };
        function sq(a) {
            this.o = a
        }
        R(sq, cq);
        sq[u].Nd = function(a) {
            a[lb](this.ka(), this.Qa());
            if (this.Ga() != this.ka() || this.lb() != this.Qa()) a.extend(this.Ga(), this.lb());
            a.rangeCount == 0 && a[Mc](this.o)
        };
        function tq(a) {
            this.o = a
        }
        R(tq, cq);
        var uq = "528";
        tq[u].fa = function(a, b, c) {
            if (tg(uq)) return tq.b.fa[E](this, a, b, c);
            return this.o.compareBoundaryPoints(c == 1 ? b == 1 ? L.Range.START_TO_START: L.Range.END_TO_START: b == 1 ? L.Range.START_TO_END: L.Range.END_TO_END, a)
        };
        tq[u].Nd = function(a, b) {
            a.removeAllRanges();
            b ? a.setBaseAndExtent(this.Ga(), this.lb(), this.ka(), this.Qa()) : a.setBaseAndExtent(this.ka(), this.Qa(), this.Ga(), this.lb())
        };
        function pq(a) {
            var b;
            if (T) {
                a = a;
                var c = new hq(jq(a), Dg(a));
                if (eq(a)) {
                    for (var d = a; (b = d[Fc]) && eq(b);) d = b;
                    c.H = d;
                    c.M = 0;
                    for (d = a; (b = d[kc]) && eq(b);) d = b;
                    c.C = d;
                    c.K = d[rb] == 1 ? d[bd][t] : d[t];
                    c.Ka = a
                } else {
                    c.H = c.C = c.Ka = a[md];
                    c.M = qf(c.Ka[bd], a);
                    c.K = c.M + 1
                }
                b = c
            } else b = dg ? new tq(dq(a)) : cg ? new gq(dq(a)) : bg ? new sq(dq(a)) : new cq(dq(a));
            return b
        }
        var vq = "APPLET",
        wq = "AREA",
        xq = "BASE",
        yq = "COL",
        zq = "FRAME",
        Aq = "HR",
        Bq = "IMG",
        Cq = "INPUT",
        Dq = "IFRAME",
        Eq = "ISINDEX",
        Fq = "NOFRAMES",
        Gq = "NOSCRIPT",
        Hq = "META",
        Iq = "OBJECT",
        Jq = "PARAM",
        Kq = "SCRIPT",
        Lq = "STYLE";
        function eq(a) {
            var b;
            a: if (a[rb] != 1) b = k;
            else {
                switch (a[dd]) {
                case vq:
                case wq:
                case xq:
                case $p:
                case yq:
                case zq:
                case Aq:
                case Bq:
                case Cq:
                case Dq:
                case Eq:
                case xn:
                case Fq:
                case Gq:
                case Hq:
                case Iq:
                case Jq:
                case Kq:
                case Lq:
                    b = k;
                    break a
                }
                b = h
            }
            return b || a[rb] == 3
        };
        var Mq = "role";
        function Nq(a, b) {
            a[Uc](Mq, b);
            a.Km = b
        }
        var Oq = "aria-";
        function Pq(a, b, c) {
            a[Uc](Oq + b, c)
        };
        function Qq(a) {
            this.k = a;
            a = T ? Yl: Vl;
            var b = T ? $l: Ql;
            this.Sk = Ni(this.k, a, this, !T);
            this.Tk = Ni(this.k, b, this, !T)
        }
        R(Qq, Yi);
        Ga(Qq[u],
        function(a) {
            var b = a.Da;
            b = new gi(b);
            Ha(b, a[F] == Yl || a[F] == Vl ? Yl: $l);
            try {
                this[z](b)
            } finally {
                b.J()
            }
        });
        Qq[u].i = function() {
            Qq.b.i[E](this);
            Ri(this.Sk);
            Ri(this.Tk);
            delete this.k
        };
        var Rq = "525";
        function Sq(a, b, c, d, f) {
            if (!T && !(dg && tg(Rq))) return h;
            if (ig && f) return Tq(a);
            if (f && !d) return k;
            if (!c && (b == 17 || b == 18)) return k;
            if (T && d && b == a) return k;
            switch (a) {
            case 13:
                return h;
            case 27:
                return ! dg
            }
            return Tq(a)
        }
        function Tq(a) {
            if (a >= 48 && a <= 57) return h;
            if (a >= 96 && a <= 106) return h;
            if (a >= 65 && a <= 90) return h;
            if (dg && a == 0) return h;
            switch (a) {
            case 32:
            case 63:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                return h;
            default:
                return k
            }
        };
        function Uq(a) {
            this.Db = a
        }
        R(Uq, ci);
        var Vq = new mi(0, 100),
        Wq = [];
        K = Uq[u];
        K.j = function(a, b, c, d, f) {
            if (!Wd(b)) {
                Wq[0] = b;
                b = Wq
            }
            for (var g = 0; g < b[t]; g++) {
                var j = Ni(a, b[g], c || this, d || k, f || this.Db || this);
                this.nl(j)
            }
            return this
        };
        K.nl = function(a) {
            if (this.n) this.n[a] = h;
            else if (this.nb) {
                this.n = Vq.cc();
                this.n[this.nb] = h;
                this.nb = i;
                this.n[a] = h
            } else this.nb = a
        };
        K.ba = function(a, b, c, d, f) {
            if (this.nb || this.n) if (Wd(b)) for (var g = 0; g < b[t]; g++) this.ba(a, b[g], c, d, f);
            else {
                a: {
                    c = c || this;
                    f = f || this.Db || this;
                    d = !!d;
                    if (a = Qi(a, b, d)) for (b = 0; b < a[t]; b++) if (a[b].jc == c && a[b].yc == d && a[b].ud == f) {
                        a = a[b];
                        break a
                    }
                    a = i
                }
                if (a) {
                    a = a.Q;
                    Ri(a);
                    if (this.n) Mf(this.n, a);
                    else if (this.nb == a) this.nb = i
                }
            }
            return this
        };
        K.removeAll = function() {
            if (this.n) {
                for (var a in this.n) {
                    Ri(a);
                    delete this.n[a]
                }
                Vq.nc(this.n);
                this.n = i
            } else this.nb && Ri(this.nb)
        };
        K.i = function() {
            Uq.b.i[E](this);
            this[rc]()
        };
        Ga(K,
        function() {
            e(l("EventHandler.handleEvent not implemented"))
        });
        var Xq = "mousedown";
        function Yq(a, b, c) {
            Aa(this, a);
            this.Re = b || a;
            this.qf = c || new Bm(NaN, NaN, NaN, NaN);
            this.l = Dg(a);
            this.Ca = new Uq(this);
            Ni(this.Re, Xq, this.Vh, k, this)
        }
        R(Yq, Yi);
        var Zq = T || cg && tg("1.9.3");
        K = Yq[u];
        Ba(K, 0);
        Ca(K, 0);
        K.Wh = 0;
        K.Xh = 0;
        K.Cc = 0;
        K.Dc = 0;
        K.ga = h;
        K.fb = k;
        K.Xg = 0;
        K.Zk = 0;
        K.Bk = k;
        K.X = function() {
            return this.Ca
        };
        K.i = function() {
            Yq.b.i[E](this);
            Pi(this.Re, Xq, this.Vh, k, this);
            this.Ca.J();
            delete this[gc];
            delete this.Re;
            delete this.Ca
        };
        K.Vh = function(a) {
            if (this.ga && !this.fb && (a[F] != Xq || a.kf(0))) {
                if (this.Xg == 0) {
                    this.Zg(a);
                    if (this.fb) a[Pb]();
                    else return
                } else a[Pb]();
                this.Xl();
                Ba(this, this.Wh = a[ic]);
                Ca(this, this.Xh = a[jc]);
                this.Cc = this[gc].offsetLeft;
                this.Dc = this[gc][qd];
                this.Rc = Bg(this.l).$b();
                this.Zk = ke()
            }
        };
        var $q = "mousemove",
        ar = "mouseup",
        br = "losecapture",
        cr = "dragstart",
        dr = "scroll";
        K.Xl = function() {
            var a = this.l,
            b = a[Cd],
            c = !Zq;
            this.Ca.j(a, $q, this.$k, c);
            this.Ca.j(a, ar, this.hd, c);
            if (Zq) {
                b.setCapture(k);
                this.Ca.j(b, br, this.hd)
            } else this.Ca.j(Pg(a), Ql, this.hd);
            T && this.Bk && this.Ca.j(a, cr, fi);
            this.Dl && this.Ca.j(this.Dl, dr, this.cl, c)
        };
        var er = "start";
        K.Zg = function(a) {
            a = this[z](new fr(er, this, a[Ad], a[Bd], a));
            if (a !== k) this.fb = h
        };
        var gr = "end";
        K.hd = function(a, b) {
            this.Ca[rc]();
            Zq && this.l.releaseCapture();
            if (this.fb) {
                this.fb = k;
                var c = this.hh(this.Cc),
                d = this.ih(this.Dc);
                this[z](new fr(gr, this, a[Ad], a[Bd], a, c, d, b))
            }
        };
        var hr = "beforedrag";
        K.$k = function(a) {
            if (this.ga) {
                var b = a[ic] - this[ic],
                c = a[jc] - this[jc];
                Ba(this, a[ic]);
                Ca(this, a[jc]);
                if (!this.fb) {
                    var d = this.Wh - this[ic],
                    f = this.Xh - this[jc];
                    d = d * d + f * f;
                    if (d > this.Xg) {
                        this.Zg(a);
                        if (!this.fb) {
                            this.hd(a);
                            return
                        }
                    }
                }
                c = this.dg(b, c);
                b = c.x;
                c = c.y;
                if (this.fb) {
                    d = this[z](new fr(hr, this, a[Ad], a[Bd], a, b, c));
                    if (d !== k) {
                        this.vg(a, b, c, k);
                        a[Pb]()
                    }
                }
            }
        };
        K.dg = function(a, b) {
            var c = Bg(this.l).$b();
            a += c.x - this.Rc.x;
            b += c.y - this.Rc.y;
            this.Rc = c;
            this.Cc += a;
            this.Dc += b;
            c = this.hh(this.Cc);
            var d = this.ih(this.Dc);
            return new Ff(c, d)
        };
        K.cl = function(a) {
            var b = this.dg(0, 0);
            Oa(a, this.Rc.x - this[ic]);
            Pa(a, this.Rc.x - this[jc]);
            this.vg(a, b.x, b.y, h)
        };
        var ir = "drag";
        K.vg = function(a, b, c) {
            this.gj(b, c);
            this[z](new fr(ir, this, a[Ad], a[Bd], a, b, c))
        };
        K.hh = function(a) {
            var b = this.qf,
            c = !pa(b[C]) ? b[C] : i;
            b = !pa(b[w]) ? b[w] : 0;
            b = c != i ? c + b: aa;
            c = c != i ? c: -aa;
            return r.min(b, r.max(c, a))
        };
        K.ih = function(a) {
            var b = this.qf,
            c = !pa(b.top) ? b.top: i;
            b = !pa(b[I]) ? b[I] : 0;
            b = c != i ? c + b: aa;
            c = c != i ? c: -aa;
            return r.min(b, r.max(c, a))
        };
        K.gj = function(a, b) {
            ya(this[gc][Xb], a + Ym);
            this[gc][Xb].top = b + Ym
        };
        function fr(a, b, c, d, f, g, j, n) {
            ei[E](this, a);
            Oa(this, c);
            Pa(this, d);
            this.Bm = f;
            ya(this, g !== m ? g: b.Cc);
            this.top = j !== m ? j: b.Dc;
            this.Hm = b;
            this.Gm = !!n
        }
        R(fr, ei);
        function jr() {}
        Md(jr);
        jr[u].al = 0;
        jr[u].Yj = function() {
            return Ee + (this.al++)[Ta](36)
        };
        jr.ja();
        function kr(a) {
            this.Na = a || Bg();
            this.Tc = lr
        }
        R(kr, Yi);
        kr[u].Ak = jr.ja();
        var lr = i,
        mr = "disable",
        nr = "enable",
        or = "highlight",
        pr = "unhighlight",
        qr = "activate",
        rr = "deactivate",
        sr = "unselect",
        tr = "check",
        ur = "uncheck",
        vr = "open",
        wr = "close";
        function xr(a, b) {
            switch (a) {
            case 1:
                return b ? mr: nr;
            case 2:
                return b ? or: pr;
            case 4:
                return b ? qr: rr;
            case 8:
                return b ? Yn: sr;
            case 16:
                return b ? tr: ur;
            case 32:
                return b ? Vl: Ql;
            case 64:
                return b ? vr: wr
            }
            e(l("Invalid component state"))
        }
        K = kr[u];
        K.xd = i;
        K.q = k;
        K.k = i;
        K.Tc = i;
        K.rf = i;
        K.na = i;
        K.T = i;
        K.cb = i;
        K.gm = k;
        K.bc = function() {
            return this.xd || (this.xd = this.Ak.Yj())
        };
        K.a = function() {
            return this.k
        };
        K.Ef = function(a) {
            this.k = a
        };
        K.X = function() {
            return this.ec || (this.ec = new Uq(this))
        };
        var yr = "Unable to set parent component";
        K.Hf = function(a) {
            if (this == a) e(l(yr));
            if (a && this.na && this.xd && this.na.Me(this.xd) && this.na != a) e(l(yr));
            this.na = a;
            kr.b.If[E](this, a)
        };
        K.If = function(a) {
            if (this.na && this.na != a) e(l("Method not supported"));
            kr.b.If[E](this, a)
        };
        K.B = function() {
            return this.Na
        };
        K.d = function() {
            this.k = this.Na[yc](mm)
        };
        K.Ua = function(a) {
            this.Ch(a)
        };
        var zr = "Component already rendered";
        K.Ch = function(a, b) {
            if (this.q) e(l(zr));
            this.k || this.d();
            a ? a[Rb](this.k, b || i) : this.Na.l[dc][Ra](this.k);
            if (!this.na || this.na.q) this.S()
        };
        K.S = function() {
            this.q = h;
            this.Yb(function(a) { ! a.q && a.a() && a.S()
            })
        };
        K.ha = function() {
            this.Yb(function(a) {
                a.q && a.ha()
            });
            this.ec && this.ec[rc]();
            this.q = k
        };
        K.i = function() {
            kr.b.i[E](this);
            this.q && this.ha();
            if (this.ec) {
                this.ec.J();
                delete this.ec
            }
            this.Yb(function(a) {
                a.J()
            }); ! this.gm && this.k && $g(this.k);
            this.na = this.rf = this.k = this.cb = this.T = i
        };
        K.Ul = function(a) {
            this.rf = a
        };
        K.Yc = function(a, b) {
            this.xc(a, this.kb(), b)
        };
        K.xc = function(a, b, c) {
            if (a.q && (c || !this.q)) e(l(zr));
            if (b < 0 || b > this.kb()) e(l("Child component index out of bounds"));
            if (!this.cb || !this.T) {
                this.cb = {};
                this.T = []
            }
            if (a.na == this) {
                var d = a.bc();
                this.cb[d] = a;
                wf(this.T, a)
            } else {
                d = this.cb;
                var f = a.bc();
                if (f in d) e(l('The object already contains the key "' + f + ve));
                d[f] = a
            }
            a.Hf(this);
            Bf(this.T, b, 0, a);
            if (a.q && this.q && a.na == this) {
                c = this.N();
                c[Rb](a.a(), c[bd][b] || i)
            } else if (c) {
                this.k || this.d();
                b = this.jb(b + 1);
                a.Ch(this.N(), b ? b.k: i)
            } else this.q && !a.q && a.k && a.S()
        };
        K.N = function() {
            return this.k
        };
        K.mf = function() {
            if (this.Tc == i) this.Tc = Vm(this.q ? this.k: this.Na.l[dc]);
            return this.Tc
        };
        K.uc = function(a) {
            if (this.q) e(l(zr));
            this.Tc = a
        };
        K.sk = function() {
            return !! this.T && this.T[t] != 0
        };
        K.kb = function() {
            return this.T ? this.T[t] : 0
        };
        K.Me = function(a) {
            if (this.cb && a) {
                var b = this.cb;
                a = a in b ? b[a] : void 0;
                a = a || i
            } else a = i;
            return a
        };
        K.jb = function(a) {
            return this.T ? this.T[a] || i: i
        };
        K.Yb = function(a, b) {
            this.T && rf(this.T, a, b)
        };
        K.zd = function(a) {
            return this.T && a ? qf(this.T, a) : -1
        };
        K.removeChild = function(a, b) {
            if (a) {
                var c = Q(a) ? a: a.bc();
                a = this.Me(c);
                if (c && a) {
                    Mf(this.cb, c);
                    wf(this.T, a);
                    if (b) {
                        a.ha();
                        a.k && $g(a.k)
                    }
                    a.Hf(i)
                }
            }
            if (!a) e(l("Child is not in parent component"));
            return a
        };
        K.pl = function(a, b) {
            return this[ec](this.jb(a), b)
        };
        K.yf = function(a) {
            for (; this.sk();) this.pl(0, a)
        };
        var Ar = "modal-dialog";
        function Br(a, b, c) {
            kr[E](this, c);
            this.sa = a || Ar;
            this.Rf = !!b;
            this.ab = Cr()
        }
        R(Br, kr);
        K = Br[u];
        K.jd = i;
        K.mj = h;
        K.Wg = h;
        K.Rf = k;
        K.Fd = h;
        K.wg = h;
        K.Ni = 0.5;
        K.bm = S;
        K.Aa = S;
        K.ab = i;
        K.Vb = i;
        K.s = k;
        K.ij = k;
        K.I = i;
        K.F = i;
        K.fe = i;
        K.ge = i;
        K.ci = i;
        K.ee = i;
        K.Ac = i;
        K.$a = i;
        Ka(K,
        function(a) {
            this.Aa = a;
            if (this.Ac) wa(this.Ac, a)
        });
        K.zf = function() {
            this.a() || this.Ua()
        };
        K.N = function() {
            this.zf();
            return this.Ac
        };
        K.dk = function() {
            this.zf();
            return this.ge
        };
        K.Pj = function() {
            this.zf();
            return this.$a
        };
        var Dr = "-title-draggable";
        K.$i = function() {
            var a = new Yq(this.a(), this.fe);
            zg(this.fe, this.sa + Dr);
            return a
        };
        var Er = "-title",
        Fr = "-title-text",
        Gr = "-title-close",
        Hr = "-content",
        Ir = "-buttons",
        Jr = "dialog",
        Kr = "labelledby";
        K.d = function() {
            this.Wk();
            var a = this.B();
            this.Ef(a.d(mm, {
                className: this.sa,
                tabIndex: 0
            },
            this.fe = a.d(mm, {
                className: this.sa + Er,
                id: this.bc()
            },
            this.ge = a.d(lm, this.sa + Fr, this.bm), this.ee = a.d(lm, this.sa + Gr)), this.Ac = a.d(mm, this.sa + Hr), this.$a = a.d(mm, this.sa + Ir), this.$h = a.d(lm, {
                tabIndex: 0
            })));
            this.ci = this.fe.id;
            Nq(this.a(), Jr);
            Pq(this.a(), Kr, this.ci || S);
            if (this.Aa) wa(this.Ac, this.Aa);
            kn(this.ee, this.Wg);
            kn(this.a(), k);
            this.ab && this.ab.Mi(this.$a)
        };
        var Lr = "iframe",
        Mr = "border:0;vertical-align:bottom;",
        Nr = 'javascript:""',
        Or = "-bg";
        K.Wk = function() {
            if (this.Rf && this.Fd && !this.F) {
                var a;
                a = this.B();
                this.F = a = a.d(Lr, {
                    frameborder: 0,
                    style: Mr,
                    src: Nr
                });
                ua(this.F, this.sa + Or);
                kn(this.F, k);
                jn(this.F, 0)
            } else if ((!this.Rf || !this.Fd) && this.F) {
                $g(this.F);
                this.F = i
            }
            if (this.Fd && !this.I) {
                this.I = this.B().d(mm, this.sa + Or);
                jn(this.I, this.Ni);
                kn(this.I, k)
            } else if (!this.Fd && this.I) {
                $g(this.I);
                this.I = i
            }
        };
        K.Ua = function(a) {
            if (this.q) e(l(zr));
            this.a() || this.d();
            a = a || this.B().l[dc];
            this.tl(a);
            Br.b.Ua[E](this, a)
        };
        K.tl = function(a) {
            this.F && a[Ra](this.F);
            this.I && a[Ra](this.I)
        };
        K.S = function() {
            Br.b.S[E](this);
            this.jd = new Qq(this.B().l);
            if (this.wg && !this.Vb) this.Vb = this.$i();
            this.X().j(this.ee, li, this.el).j(this.jd, Yl, this.bl);
            Nq(this.a(), Jr);
            this.ge.id !== S && Pq(this.a(), Kr, this.ge.id)
        };
        K.ha = function() {
            this.s && this.R(k);
            this.jd.J();
            this.jd = i;
            if (this.Vb) {
                this.Vb.J();
                this.Vb = i
            }
            Br.b.ha[E](this)
        };
        var Pr = "keydown",
        Qr = "resize",
        Rr = "afterhide";
        K.R = function(a) {
            if (a != this.s) {
                var b = this.B().l,
                c = Pg(b) || ia;
                this.q || this.Ua(b[dc]);
                if (a) {
                    this.Gh();
                    this.Kb();
                    this.X().j(this.a(), Pr, this.Gd).j(this.a(), ki, this.Gd).j(c, Qr, this.qh)
                } else this.X().ba(this.a(), Pr, this.Gd).ba(this.a(), ki, this.Gd).ba(c, Qr, this.qh);
                this.F && kn(this.F, a);
                this.I && kn(this.I, a);
                kn(this.a(), a);
                a && this[wc]();
                if (this.s = a) this.X().j(this.$a, li, this.nh);
                else {
                    this.X().ba(this.$a, li, this.nh);
                    this[z](Rr);
                    this.ij && this.J()
                }
            }
        };
        var Sr = "button",
        Tr = "input",
        Ur = "position:fixed;width:0;height:0;left:0;top:0;";
        K.focus = function() {
            try {
                this.a()[wc]()
            } catch(a) {}
            if (this.ab) {
                var b = this.ab.ed;
                if (b) for (var c = this.B().l, d = this.$a[yd](Sr), f = 0, g; g = d[f]; f++) if (g[ld] == b) {
                    try {
                        if (dg || bg) {
                            var j = c[yc](Tr);
                            j[Xb].cssText = Ur;
                            this.a()[Ra](j);
                            j[wc]();
                            this.a()[ec](j)
                        }
                        g[wc]()
                    } catch(n) {}
                    break
                }
            }
        };
        K.Gh = function() {
            this.F && kn(this.F, k);
            this.I && kn(this.I, k);
            var a = this.B().l,
            b = Pg(a) || ia,
            c = Ng(b || ia);
            b = r.max(a[dc].scrollWidth, c[w]);
            a = r.max(a[dc][Cc], c[I]);
            if (this.F) {
                kn(this.F, h);
                Xm(this.F, b, a)
            }
            if (this.I) {
                kn(this.I, h);
                Xm(this.I, b, a)
            }
            if (this.wg) {
                c = cn(this.a());
                this.Vb.qf = new Bm(0, 0, b - c[w], a - c[I])
            }
        };
        K.Kb = function() {
            var a = this.B().l,
            b = Pg(a) || ia;
            if (Fm(this.a()) == Km) var c = a = 0;
            else {
                c = this.B().$b();
                a = c.x;
                c = c.y
            }
            var d = cn(this.a());
            b = Ng(b || ia);
            a = r.max(a + b[w] / 2 - d[w] / 2, 0);
            c = r.max(c + b[I] / 2 - d[I] / 2, 0);
            Hm(this.a(), a, c)
        };
        K.el = function() {
            if (this.Wg) {
                var a = this.ab,
                b = a && a.ue;
                if (b) {
                    a = a.ia(b);
                    this[z](new Vr(b, a)) && this.R(k)
                } else this.R(k)
            }
        };
        K.i = function() {
            Br.b.i[E](this);
            if (this.I) {
                $g(this.I);
                this.I = i
            }
            if (this.F) {
                $g(this.F);
                this.F = i
            }
            this.$h = this.$a = this.ee = i
        };
        K.nh = function(a) {
            if ((a = this.pj(a[gc])) && !a[Tb]) {
                a = a[ld];
                var b = this.ab.ia(a);
                this[z](new Vr(a, b)) && this.R(k)
            }
        };
        var Wr = "BUTTON";
        K.pj = function(a) {
            for (a = a; a != i && a != this.$a;) {
                if (a[dd] == Wr) return a;
                a = a[md]
            }
            return i
        };
        var Xr = "SELECT",
        Yr = "TEXTAREA";
        K.Gd = function(a) {
            var b = k,
            c = k,
            d = this.ab,
            f = a[gc];
            if (a[F] == Pr) if (this.mj && a[Dc] == 27) {
                var g = d && d.ue;
                f = f[dd] == Xr && !f[Tb];
                if (g && !f) {
                    c = h;
                    b = d.ia(g);
                    b = this[z](new Vr(g, b))
                } else f || (b = h)
            } else {
                if (a[Dc] == 9 && a[cd] && f == this.a()) c = h
            } else if (a[Dc] == 13) {
                if (f[dd] == Wr) g = f[ld];
                else if (d) {
                    var j = d.ed,
                    n = j && d.Oj(j);
                    f = (f[dd] == Yr || f[dd] == Xr) && !f[Tb];
                    if (n && !n[Tb] && !f) g = j
                }
                if (g) {
                    c = h;
                    b = this[z](new Vr(g, fa(d.ia(g))))
                }
            }
            if (b || c) {
                a[Kb]();
                a[Pb]()
            }
            b && this.R(k)
        };
        K.qh = function() {
            this.Gh()
        };
        K.bl = function(a) {
            if (this.$h == a[gc]) {
                a = this.qj;
                if (ae(a)) {
                    if (this) a = ie(a, this)
                } else if (a && typeof a[Yc] == Td) a = ie(a[Yc], a);
                else e(l(ui));
                yj[qb](a, 0)
            }
        };
        K.qj = function() {
            T && this.B().l[dc][wc]();
            this.a()[wc]()
        };
        var Zr = "dialogselect";
        function Vr(a, b) {
            Ha(this, Zr);
            this.Q = a;
            this.caption = b
        }
        R(Vr, ei);
        function $r(a) {
            this.Na = a || Bg();
            Xh[E](this)
        }
        R($r, Xh);
        K = $r[u];
        K.sa = "goog-buttonset";
        K.ed = i;
        K.k = i;
        K.ue = i;
        K.oa = function(a, b, c, d) {
            Xh[u].oa[E](this, a, b);
            if (c) this.ed = a;
            if (d) this.ue = a;
            return this
        };
        K.qa = function(a, b, c) {
            return this.oa(a.Q, a.caption, b, c)
        };
        K.Mi = function(a) {
            this.k = a;
            this.Ua()
        };
        var as = "-default";
        K.Ua = function() {
            if (this.k) {
                wa(this.k, S);
                var a = Bg(this.k);
                Wh(this,
                function(b, c) {
                    var d = a.d(Sr, {
                        name: c
                    },
                    b);
                    if (c == this.ed) ua(d, this.sa + as);
                    this.k[Ra](d)
                },
                this)
            }
        };
        K.Oj = function(a) {
            for (var b = this.Nj(), c = 0, d; d = b[c]; c++) if (d[ld] == a || d.id == a) return d;
            return i
        };
        K.Nj = function() {
            return this.k[yd](Wr)
        };
        var bs = {
            Q: "ok",
            caption: "OK"
        },
        cs = {
            Q: "cancel",
            caption: "Cancel"
        },
        ds = {
            Q: "yes",
            caption: "Yes"
        },
        es = {
            Q: "no",
            caption: "No"
        },
        fs = {
            Q: "save",
            caption: "Save"
        },
        gs = {
            Q: "continue",
            caption: "Continue"
        };
        function Cr() {
            return (new $r).qa(bs, h).qa(cs, k, h)
        } (new $r).qa(bs, h, h);
        Cr(); (new $r).qa(ds, h).qa(es, k, h); (new $r).qa(ds).qa(es, h).qa(cs, k, h); (new $r).qa(gs).qa(fs).qa(cs, h, h);
        function hs(a, b) {
            a && this.ag(a, b)
        }
        R(hs, Yi);
        K = hs[u];
        K.k = i;
        K.Bd = i;
        K.nf = i;
        K.Cd = i;
        K.ob = -1;
        K.mb = -1;
        var is = {
            "3": 13,
            "12": 144,
            "63232": 38,
            "63233": 40,
            "63234": 37,
            "63235": 39,
            "63236": 112,
            "63237": 113,
            "63238": 114,
            "63239": 115,
            "63240": 116,
            "63241": 117,
            "63242": 118,
            "63243": 119,
            "63244": 120,
            "63245": 121,
            "63246": 122,
            "63247": 123,
            "63248": 44,
            "63272": 46,
            "63273": 36,
            "63275": 35,
            "63276": 33,
            "63277": 34,
            "63289": 144,
            "63302": 45
        },
        js = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "U+007F": 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        ks = {
            61 : 187,
            59 : 186
        },
        ls = T || dg && tg(Rq);
        K = hs[u];
        K.kk = function(a) {
            if (dg && (this.ob == 17 && !a[wb] || this.ob == 18 && !a[Va])) this.mb = this.ob = -1;
            if (ls && !Sq(a[Dc], this.ob, a[cd], a[wb], a[Va])) this[Yc](a);
            else this.mb = cg && a[Dc] in ks ? ks[a[Dc]] : a[Dc]
        };
        K.lk = function() {
            this.mb = this.ob = -1
        };
        Ga(K,
        function(a) {
            var b = a.Da,
            c, d;
            if (T && a[F] == ki) {
                c = this.mb;
                d = c != 13 && c != 27 ? b[Dc] : 0
            } else if (dg && a[F] == ki) {
                c = this.mb;
                d = b[qc] >= 0 && b[qc] < 63232 && Tq(c) ? b[qc] : 0
            } else if (bg) {
                c = this.mb;
                d = Tq(c) ? b[Dc] : 0
            } else {
                c = b[Dc] || this.mb;
                d = b[qc] || 0;
                if (ig && d == 63 && !c) c = 191
            }
            var f = c,
            g = b.keyIdentifier;
            if (c) if (c >= 63232 && c in is) f = is[c];
            else {
                if (c == 25 && a[cd]) f = 9
            } else if (g && g in js) f = js[g];
            a = f == this.ob;
            this.ob = f;
            b = new ms(f, d, a, b);
            try {
                this[z](b)
            } finally {
                b.J()
            }
        });
        K.a = function() {
            return this.k
        };
        var ns = "keyup";
        K.ag = function(a, b) {
            this.Cd && this.detach();
            this.k = a;
            this.Bd = Ni(this.k, ki, this, b);
            this.nf = Ni(this.k, Pr, this.kk, b, this);
            this.Cd = Ni(this.k, ns, this.lk, b, this)
        };
        K.detach = function() {
            if (this.Bd) {
                Ri(this.Bd);
                Ri(this.nf);
                Ri(this.Cd);
                this.Cd = this.nf = this.Bd = i
            }
            this.k = i;
            this.mb = this.ob = -1
        };
        K.i = function() {
            hs.b.i[E](this);
            this.detach()
        };
        var os = "key";
        function ms(a, b, c, d) {
            d && this.Mc(d, void 0);
            Ha(this, os);
            Fa(this, a);
            this.charCode = b;
            this.repeat = c
        }
        R(ms, gi);
        var ps = "HTML",
        qs = "BODY";
        function rs(a, b, c, d, f, g, j, n) {
            var q, v = c.offsetParent;
            if (v) {
                var B = v[dd] == ps || v[dd] == qs;
                if (!B || Fm(v) != Mm) {
                    q = Um(v);
                    B || (q = Gf(q, new Ff(v[Nc], v[Sa])))
                }
            }
            B = a;
            v = dn(B); (B = Tm(B)) && v.Ik(new Bm(B[C], B.top, B[Ed] - B[C], B[Tc] - B.top));
            B = v = v;
            var M = Bg(a),
            A = Bg(c);
            if (M.l != A.l) {
                var J = M.l[dc];
                A = A.Qg();
                var N = new Ff(0, 0),
                Z = Pg(Dg(J)),
                Da = J;
                do {
                    var ha;
                    if (Z == A) ha = Um(Da);
                    else {
                        var $ = Da;
                        ha = new Ff;
                        if ($[rb] == 1) if ($[ab]) {
                            var G = Jm($);
                            ha.x = G[C];
                            ha.y = G.top
                        } else {
                            G = Bg($).$b();
                            $ = Um($);
                            ha.x = $.x - G.x;
                            ha.y = $.y - G.y
                        } else {
                            ha.x = $[Ad];
                            ha.y = $[Bd]
                        }
                        ha = ha
                    }
                    ha = ha;
                    N.x += ha.x;
                    N.y += ha.y
                } while ( Z && Z != A && ( Da = Z . frameElement ) && (Z = Z.parent));
                A = N;
                A = Gf(A, Um(J));
                if (T && !M.$g()) A = Gf(A, M.$b());
                B.left += A.x;
                B.top += A.y
            }
            a = (b & 4 && Vm(a) ? b ^ 2 : b) & -5;
            b = new Ff(a & 2 ? v[C] + v[w] : v[C], a & 1 ? v.top + v[I] : v.top);
            if (q) b = Gf(b, q);
            if (f) {
                b.x += (a & 2 ? -1 : 1) * f.x;
                b.y += (a & 1 ? -1 : 1) * f.y
            }
            var D;
            if (j) if ((D = Tm(c)) && q) {
                D.top = r.max(0, D.top - q.y);
                D.right -= q.x;
                D.bottom -= q.y;
                ya(D, r.max(0, D[C] - q.x))
            }
            a: {
                f = b;
                c = c;
                q = d;
                d = g;
                D = D;
                g = j;
                j = n;
                f = f[fc]();
                a = 0;
                q = (q & 4 && Vm(c) ? q ^ 2 : q) & -5;
                n = cn(c);
                j = j ? j[fc]() : n;
                if (d || q != 0) {
                    if (q & 2) f.x -= j[w] + (d ? d[Ed] : 0);
                    else if (d) f.x += d[C];
                    if (q & 1) f.y -= j[I] + (d ? d[Tc] : 0);
                    else if (d) f.y += d.top
                }
                if (g) {
                    if (D) {
                        d = f;
                        q = j;
                        D = D;
                        g = g;
                        a = 0;
                        if (d.x < D[C] && g & 1) {
                            d.x = D[C];
                            a |= 1
                        }
                        if (d.x < D[C] && d.x + q[w] > D[Ed] && g & 16) {
                            q.width -= d.x + q[w] - D[Ed];
                            a |= 4
                        }
                        if (d.x + q[w] > D[Ed] && g & 1) {
                            d.x = r.max(D[Ed] - q[w], D[C]);
                            a |= 1
                        }
                        if (g & 2) a |= (d.x < D[C] ? 16 : 0) | (d.x + q[w] > D[Ed] ? 32 : 0);
                        if (d.y < D.top && g & 4) {
                            d.y = D.top;
                            a |= 2
                        }
                        if (d.y >= D.top && d.y + q[I] > D[Tc] && g & 32) {
                            q.height -= d.y + q[I] - D[Tc];
                            a |= 8
                        }
                        if (d.y + q[I] > D[Tc] && g & 4) {
                            d.y = r.max(D[Tc] - q[I], D.top);
                            a |= 2
                        }
                        if (g & 8) a |= (d.y < D.top ? 64 : 0) | (d.y + q[I] > D[Tc] ? 128 : 0);
                        D = a
                    } else D = 256;
                    a = D;
                    if (a & 496) {
                        n = a;
                        break a
                    }
                }
                Hm(c, f);
                n = n == j ? h: !n || !j ? k: n[w] == j[w] && n[I] == j[I];
                n || Xm(c, j);
                n = a
            }
            return n
        };
        function ss() {}
        ss[u].Kb = function() {};
        function ts(a, b) {
            this.Wb = a;
            this.Tb = b
        }
        R(ts, ss);
        ts[u].Kb = function(a, b, c) {
            rs(this.Wb, this.Tb, a, b, m, c)
        };
        function us(a, b, c) {
            ts[E](this, a, b);
            this.Ii = c
        }
        R(us, ts);
        us[u].Kb = function(a, b, c, d) {
            var f = rs(this.Wb, this.Tb, a, b, i, c, 10, d);
            if (f & 496) {
                var g = this.Tb,
                j = b;
                if (f & 48) {
                    g ^= 2;
                    j ^= 2
                }
                if (f & 192) {
                    g ^= 1;
                    j ^= 1
                }
                f = rs(this.Wb, g, a, j, i, c, 10, d);
                if (f & 496) this.Ii ? rs(this.Wb, this.Tb, a, b, i, c, 5, d) : rs(this.Wb, this.Tb, a, b, i, c, 0, d)
            }
        };
        function vs(a, b, c, d) {
            us[E](this, a, b, c);
            this.xl = d
        }
        R(vs, us);
        vs[u].Kb = function(a, b, c, d) {
            this.xl ? rs(this.Wb, this.Tb, a, b, i, c, 33, d) : vs.b.Kb[E](this, a, b, c, d)
        };
        function ws() {}
        var xs;
        Md(ws);
        K = ws[u];
        K.ib = function() {};
        K.d = function(a) {
            return a.B().d(mm, this.Zb(a)[ud](Ve), a.Aa)
        };
        K.N = function(a) {
            return a
        };
        var ys = "7";
        K.fd = function(a, b, c) {
            if (a = a.a ? a.a() : a) if (T && !tg(ys)) {
                var d = this.Hg(yg(a), b);
                d[s](b);
                c = c ? zg: Ag;
                je(c, a)[ad](i, d)
            } else {
                a = a;
                b = b;
                c ? zg(a, b) : Ag(a, b)
            }
        };
        K.zg = function(a, b, c) {
            this.fd(a, b, c)
        };
        K.hc = function(a) {
            a.mf() && this.uc(a.a(), h);
            a.Z() && this.Mb(a, a.s)
        };
        K.Kl = function(a) {
            var b = this.ib();
            b && Nq(a, b)
        };
        K.Qd = function(a, b) {
            qn(a, !b, !T && !bg)
        };
        var zs = "-rtl";
        K.uc = function(a, b) {
            this.fd(a, this.dc() + zs, b)
        };
        K.Fb = function(a) {
            var b;
            if (a.ea(32) && (b = a.P())) return hh(b);
            return k
        };
        var As = "tabIndex";
        K.Mb = function(a, b) {
            var c;
            if (a.ea(32) && (c = a.P())) {
                if (!b && a.bh()) {
                    try {
                        c.blur()
                    } catch(d) {}
                    a.bh() && a.Bb(i)
                }
                if (hh(c) != b) {
                    c = c;
                    if (b) c.tabIndex = 0;
                    else c.removeAttribute(As)
                }
            }
        };
        K.R = function(a, b) {
            kn(a, b)
        };
        K.xa = function(a, b, c) {
            var d = a.a();
            if (d) {
                var f = this.ld(b);
                f && this.fd(a, f, c);
                this.Xc(d, b, c)
            }
        };
        var Bs = "disabled",
        Cs = "pressed",
        Ds = "selected",
        Es = "checked",
        Fs = "expanded";
        K.Xc = function(a, b, c) {
            xs || (xs = Qf(1, Bs, 4, Cs, 8, Ds, 16, Es, 64, Fs)); (b = xs[b]) && Pq(a, b, c)
        };
        var Gs = "nodeType";
        Ka(K,
        function(a, b) {
            var c = this.N(a);
            if (c) {
                Yg(c);
                if (b) if (Q(b)) ch(c, b);
                else {
                    var d = function(f) {
                        if (f) {
                            var g = Dg(c);
                            c[Ra](Q(f) ? g[Ib](f) : f)
                        }
                    };
                    if (Wd(b)) rf(b, d);
                    else Xd(b) && !(Gs in b) ? rf(yf(b), d) : d(b)
                }
            }
        });
        K.P = function(a) {
            return a.a()
        };
        var Hs = "goog-control";
        K.O = function() {
            return Hs
        };
        K.dc = function() {
            return this.O()
        };
        K.Zb = function(a) {
            var b = this.O(),
            c = [b],
            d = this.dc();
            d != b && c[s](d);
            b = this.Rj(a.getState());
            c[s][ad](c, b); (a = a.Ea) && c[s][ad](c, a);
            T && !tg(ys) && c[s][ad](c, this.Hg(c));
            return c
        };
        var Is = "_";
        K.Hg = function(a, b) {
            var c = [];
            if (b) a = a[Fb]([b]);
            rf([],
            function(d) {
                if (uf(d, je(vf, a)) && (!b || vf(d, b))) c[s](d[ud](Is))
            });
            return c
        };
        K.Rj = function(a) {
            for (var b = []; a;) {
                var c = a & -a;
                b[s](this.ld(c));
                a &= ~c
            }
            return b
        };
        K.ld = function(a) {
            this.jg || this.Yi();
            return this.jg[a]
        };
        var Js = "-disabled",
        Ks = "-hover",
        Ls = "-active",
        Ms = "-selected",
        Ns = "-checked",
        Os = "-focused",
        Ps = "-open";
        K.Yi = function() {
            var a = this.dc();
            this.jg = Qf(1, a + Js, 2, a + Ks, 4, a + Ls, 8, a + Ms, 16, a + Ns, 32, a + Os, 64, a + Ps)
        };
        function Qs() {}
        R(Qs, ws);
        Md(Qs);
        K = Qs[u];
        K.ib = function() {
            return Sr
        };
        K.Xc = function(a, b, c) {
            b == 16 ? Pq(a, Cs, c) : Qs.b.Xc[E](this, a, b, c)
        };
        K.d = function(a) {
            var b = Qs.b.d[E](this, a),
            c = a.rd();
            c && this.Lf(b, c); (c = a[H]()) && this[ib](b, c);
            a.ea(16) && this.Xc(b, 16, k);
            return b
        };
        La(K, Ld);
        ta(K, Ld);
        K.rd = function(a) {
            return a.title
        };
        K.Lf = function(a, b) {
            if (a) a.title = b || S
        };
        var Rs = "goog-button";
        K.O = function() {
            return Rs
        };
        function Ss(a, b) {
            if (!a) e(l("Invalid class name " + a));
            if (!ae(b)) e(l("Invalid decorator function " + b))
        }
        var Ts = {};
        function Us(a, b, c) {
            kr[E](this, c);
            if (! (b = b)) {
                b = this[Gb];
                for (var d; b;) {
                    d = be(b);
                    if (d = Ts[d]) break;
                    b = b.b ? b.b[Gb] : i
                }
                b = d ? ae(d.ja) ? d.ja() : new d: i
            }
            this.m = b;
            this.Kh(a)
        }
        R(Us, kr);
        K = Us[u];
        K.Aa = i;
        K.vc = 0;
        K.Vc = 39;
        K.ad = 255;
        K.be = 0;
        K.s = h;
        K.Ea = i;
        K.We = h;
        K.pe = k;
        K.Ff = function(a) {
            this.q && a != this.We && this.Bg(a);
            this.We = a
        };
        K.P = function() {
            return this.m.P(this)
        };
        K.nd = function() {
            return this.ma || (this.ma = new hs)
        };
        K.Ei = function(a) {
            if (a) {
                if (this.Ea) vf(this.Ea, a) || this.Ea[s](a);
                else this.Ea = [a];
                this.m.zg(this, a, h)
            }
        };
        K.ql = function(a) {
            if (a && this.Ea) {
                wf(this.Ea, a);
                if (this.Ea[t] == 0) this.Ea = i;
                this.m.zg(this, a, k)
            }
        };
        K.fd = function(a, b) {
            b ? this.Ei(a) : this.ql(a)
        };
        K.d = function() {
            var a = this.m.d(this);
            this.Ef(a);
            this.m.Kl(a);
            this.pe || this.m.Qd(a, k);
            this.s || this.m.R(a, k)
        };
        K.N = function() {
            return this.m.N(this.a())
        };
        K.S = function() {
            Us.b.S[E](this);
            this.m.hc(this);
            if (this.Vc & -2) {
                this.We && this.Bg(h);
                if (this.ea(32)) {
                    var a = this.P();
                    if (a) {
                        var b = this.nd();
                        b.ag(a);
                        this.X().j(b, os, this.Ra).j(a, Vl, this.sd).j(a, Ql, this.Bb)
                    }
                }
            }
        };
        K.Bg = function(a) {
            var b = this.X(),
            c = this.a();
            if (a) {
                b.j(c, ii, this.Ye).j(c, Xq, this.Cb).j(c, ar, this.Lc).j(c, ji, this.Xe);
                T && b.j(c, Tl, this.Rg)
            } else {
                b.ba(c, ii, this.Ye).ba(c, Xq, this.Cb).ba(c, ar, this.Lc).ba(c, ji, this.Xe);
                T && b.ba(c, Tl, this.Rg)
            }
        };
        K.ha = function() {
            Us.b.ha[E](this);
            this.ma && this.ma.detach();
            this.s && this.Z() && this.m.Mb(this, k)
        };
        K.i = function() {
            Us.b.i[E](this);
            if (this.ma) {
                this.ma.J();
                delete this.ma
            }
            delete this.m;
            this.Ea = this.Aa = i
        };
        Ka(K,
        function(a) {
            this.m[kd](this.a(), a);
            this.Kh(a)
        });
        K.Kh = function(a) {
            this.Aa = a
        };
        K.Jg = function(a) {
            var b = this.Aa;
            if (!b || Q(b)) return b;
            return (a = Wd(b) ? tf(b, a)[ud](S) : jh(b)) && Se(a)
        };
        K.kd = function() {
            return this.Jg(jh)
        };
        K.uc = function(a) {
            Us.b.uc[E](this, a);
            var b = this.a();
            b && this.m.uc(b, a)
        };
        K.Qd = function(a) {
            this.pe = a;
            var b = this.a();
            b && this.m.Qd(b, a)
        };
        var Vs = "show",
        Ws = "hide";
        K.R = function(a, b) {
            if (b || this.s != a && this[z](a ? Vs: Ws)) {
                var c = this.a();
                c && this.m.R(c, a);
                this.Z() && this.m.Mb(this, a);
                this.s = a;
                return h
            }
            return k
        };
        K.Z = function() {
            return ! this.Ha(1)
        };
        K.Wa = function(a) {
            this.ic(2, a) && this.xa(2, a)
        };
        K.Ja = function() {
            return this.Ha(4)
        };
        K.setActive = function(a) {
            this.ic(4, a) && this.xa(4, a)
        };
        K.Kf = function(a) {
            this.ic(8, a) && this.xa(8, a)
        };
        K.Jk = function() {
            return this.Ha(16)
        };
        K.Ml = function(a) {
            this.ic(16, a) && this.xa(16, a)
        };
        K.bh = function() {
            return this.Ha(32)
        };
        K.Nh = function(a) {
            this.ic(32, a) && this.xa(32, a)
        };
        K.isOpen = function() {
            return this.Ha(64)
        };
        K.G = function(a) {
            this.ic(64, a) && this.xa(64, a)
        };
        K.getState = function() {
            return this.vc
        };
        K.Ha = function(a) {
            return !! (this.vc & a)
        };
        K.xa = function(a, b) {
            if (this.ea(a) && b != this.Ha(a)) {
                this.m.xa(this, a, b);
                this.vc = b ? this.vc | a: this.vc & ~a
            }
        };
        K.Qh = function(a) {
            this.vc = a
        };
        K.ea = function(a) {
            return !! (this.Vc & a)
        };
        K.ya = function(a, b) {
            if (this.q && this.Ha(a) && !b) e(l(zr)); ! b && this.Ha(a) && this.xa(a, k);
            this.Vc = b ? this.Vc | a: this.Vc & ~a
        };
        K.da = function(a) {
            return !! (this.ad & a) && this.ea(a)
        };
        K.Ll = function(a, b) {
            this.ad = b ? this.ad | a: this.ad & ~a
        };
        K.Lh = function(a, b) {
            this.be = b ? this.be | a: this.be & ~a
        };
        K.ic = function(a, b) {
            return this.ea(a) && this.Ha(a) != b && (!(this.be & a) || this[z](xr(a, b))) && !this.Fe
        };
        var Xs = "enter";
        K.Ye = function(a) { ! Ys(a, this.a()) && this[z](Xs) && this.Z() && this.da(2) && this.Wa(h)
        };
        var Zs = "leave";
        K.Xe = function(a) {
            if (!Ys(a, this.a()) && this[z](Zs)) {
                this.da(4) && this[xd](k);
                this.da(2) && this.Wa(k)
            }
        };
        function Ys(a, b) {
            return !! a.relatedTarget && ah(b, a.relatedTarget)
        }
        K.Cb = function(a) {
            if (this.Z()) {
                this.da(2) && this.Wa(h);
                if (a.kf(0)) {
                    this.da(4) && this[xd](h);
                    this.m.Fb(this) && this.P()[wc]()
                }
            } ! this.pe && a.kf(0) && a[Pb]()
        };
        K.Lc = function(a) {
            if (this.Z()) {
                this.da(2) && this.Wa(h);
                this.Ja() && this.mc(a) && this.da(4) && this[xd](k)
            }
        };
        K.Rg = function(a) {
            this.Z() && this.mc(a)
        };
        var $s = "action",
        at = "altKey",
        bt = "ctrlKey",
        ct = "metaKey",
        dt = "shiftKey",
        et = "platformModifierKey";
        K.mc = function(a) {
            this.da(16) && this.Ml(!this.Jk());
            this.da(8) && this.Kf(h);
            this.da(64) && this.G(!this[pc]());
            var b = new ei($s, this);
            if (a) for (var c = [at, bt, ct, dt, et], d, f = 0; d = c[f]; f++) b[d] = a[d];
            return this[z](b)
        };
        K.sd = function() {
            this.da(32) && this.Nh(h)
        };
        K.Bb = function() {
            this.da(4) && this[xd](k);
            this.da(32) && this.Nh(k)
        };
        K.Ra = function(a) {
            if (this.s && this.Z() && this.fc(a)) {
                a[Pb]();
                a[Kb]();
                return h
            }
            return k
        };
        K.fc = function(a) {
            return a[Dc] == 13 && this.mc(a)
        };
        var ft = Us,
        gt = ws;
        if (!ae(ft)) e(l("Invalid component class " + ft));
        if (!ae(gt)) e(l("Invalid renderer class " + gt));
        var ht = be(ft);
        Ts[ht] = gt;
        Ss(Hs,
        function() {
            return new Us(i)
        });
        function it() {}
        R(it, Qs);
        Md(it);
        K = it[u];
        K.ib = function() {};
        K.d = function(a) {
            this.Wl(a);
            return a.B().d(Sr, {
                "class": this.Zb(a)[ud](Ve),
                disabled: !a.Z(),
                title: a.rd() || S,
                value: a[H]() || S
            },
            a.kd() || S)
        };
        K.hc = function(a) {
            a.X().j(a.a(), li, a.mc)
        };
        K.Qd = Ld;
        K.uc = Ld;
        K.Fb = function(a) {
            return a.Z()
        };
        K.Mb = Ld;
        K.xa = function(a, b, c) {
            it.b.xa[E](this, a, b, c);
            if ((a = a.a()) && b == 1) a.disabled = c
        };
        La(K,
        function(a) {
            return a[Mb]
        });
        ta(K,
        function(a, b) {
            if (a) a.value = b
        });
        K.Xc = Ld;
        K.Wl = function(a) {
            a.Ff(k);
            a.Ll(255, k);
            a.ya(32, k)
        };
        function jt(a, b, c) {
            Us[E](this, a, b || it.ja(), c)
        }
        R(jt, Us);
        K = jt[u];
        La(K,
        function() {
            return this.fi
        });
        ta(K,
        function(a) {
            this.fi = a;
            this.m[ib](this.a(), a)
        });
        K.rd = function() {
            return this.di
        };
        K.Lf = function(a) {
            this.di = a;
            this.m.Lf(this.a(), a)
        };
        K.i = function() {
            jt.b.i[E](this);
            delete this.fi;
            delete this.di
        };
        K.S = function() {
            jt.b.S[E](this);
            if (this.ea(32)) {
                var a = this.P();
                a && this.X().j(a, ns, this.fc)
            }
        };
        K.fc = function(a) {
            if (a[Dc] == 13 && a[F] == os || a[Dc] == 32 && a[F] == ns) return this.mc(a);
            return a[Dc] == 32
        };
        Ss(Rs,
        function() {
            return new jt(i)
        });
        function kt() {}
        R(kt, ws);
        Md(kt);
        kt[u].d = function(a) {
            return a.B().d(mm, this.O())
        };
        Ka(kt[u],
        function() {});
        var lt = "goog-menuseparator";
        kt[u].O = function() {
            return lt
        };
        function mt(a, b) {
            Us[E](this, i, a || kt.ja(), b);
            this.ya(1, k);
            this.ya(2, k);
            this.ya(4, k);
            this.ya(32, k);
            this.Qh(1)
        }
        R(mt, Us);
        var nt = "separator";
        mt[u].S = function() {
            mt.b.S[E](this);
            Nq(this.a(), nt)
        };
        Ss(lt,
        function() {
            return new mt
        });
        function ot() {}
        Md(ot);
        K = ot[u];
        K.ib = function() {};
        K.Cg = function(a, b) {
            if (a) a.tabIndex = b ? 0 : -1
        };
        K.d = function(a) {
            return a.B().d(mm, this.Zb(a)[ud](Ve))
        };
        K.N = function(a) {
            return a
        };
        K.hc = function(a) {
            a = a.a();
            qn(a, h, cg);
            if (T) a.hideFocus = h;
            var b = this.ib();
            b && Nq(a, b)
        };
        K.P = function(a) {
            return a.a()
        };
        var pt = "goog-container";
        K.O = function() {
            return pt
        };
        var qt = "horizontal",
        rt = "-horizontal",
        st = "-vertical";
        K.Zb = function(a) {
            var b = this.O(),
            c = a.lc == qt;
            c = [b, c ? b + rt: b + st];
            a.Z() || c[s](b + Js);
            return c
        };
        var tt = "vertical";
        function ut(a, b, c) {
            kr[E](this, c);
            this.m = b || ot.ja();
            this.lc = a || tt
        }
        R(ut, kr);
        K = ut[u];
        K.gh = i;
        K.ma = i;
        K.m = i;
        K.lc = i;
        K.s = h;
        K.ga = h;
        K.Le = h;
        K.la = -1;
        K.L = i;
        K.sf = k;
        K.Ji = k;
        K.fl = h;
        K.bb = i;
        K.P = function() {
            return this.gh || this.m.P(this)
        };
        K.nd = function() {
            return this.ma || (this.ma = new hs(this.P()))
        };
        K.d = function() {
            this.Ef(this.m.d(this))
        };
        K.N = function() {
            return this.m.N(this.a())
        };
        K.S = function() {
            ut.b.S[E](this);
            this.Yb(function(b) {
                b.q && this.Ah(b)
            },
            this);
            var a = this.a();
            this.m.hc(this);
            this.R(this.s, h);
            this.X().j(this, Xs, this.Se).j(this, or, this.Ue).j(this, pr, this.Ze).j(this, vr, this.ok).j(this, wr, this.hk).j(a, Xq, this.Cb).j(Dg(a), ar, this.jk).j(a, [Xq, ar, ii, ji], this.gk);
            this.Fb() && this.Ag(h)
        };
        K.Ag = function(a) {
            var b = this.X(),
            c = this.P();
            a ? b.j(c, Vl, this.sd).j(c, Ql, this.Bb).j(this.nd(), os, this.Ra) : b.ba(c, Vl, this.sd).ba(c, Ql, this.Bb).ba(this.nd(), os, this.Ra)
        };
        K.ha = function() {
            this.rc( - 1);
            this.L && this.L.G(k);
            this.sf = k;
            ut.b.ha[E](this)
        };
        K.i = function() {
            ut.b.i[E](this);
            if (this.ma) {
                this.ma.J();
                this.ma = i
            }
            this.m = this.L = this.bb = i
        };
        K.Se = function() {
            return h
        };
        var vt = "activedescendant";
        K.Ue = function(a) {
            var b = this.zd(a[gc]);
            if (b > -1 && b != this.la) {
                var c = this.ac();
                c && c.Wa(k);
                this.la = b;
                c = this.ac();
                this.sf && c[xd](h);
                if (this.fl && this.L && c != this.L) c.ea(64) ? c.G(h) : this.L.G(k)
            }
            Pq(this.a(), vt, a[gc].a().id)
        };
        K.Ze = function(a) {
            if (a[gc] == this.ac()) this.la = -1;
            Pq(this.a(), vt, S)
        };
        K.ok = function(a) {
            if ((a = a[gc]) && a != this.L && a.na == this) {
                this.L && this.L.G(k);
                this.L = a
            }
        };
        K.hk = function(a) {
            if (a[gc] == this.L) this.L = i
        };
        K.Cb = function(a) {
            this.ga && this.tc(h);
            var b = this.P();
            b && hh(b) ? b[wc]() : a[Pb]()
        };
        K.jk = function() {
            this.tc(k)
        };
        K.gk = function(a) {
            var b = this.Zj(a[gc]);
            if (b) switch (a[F]) {
            case Xq:
                b.Cb(a);
                break;
            case ar:
                b.Lc(a);
                break;
            case ii:
                b.Ye(a);
                break;
            case ji:
                b.Xe(a)
            }
        };
        K.Zj = function(a) {
            if (this.bb) for (var b = this.a(); a && a !== b;) {
                var c = a.id;
                if (c in this.bb) return this.bb[c];
                a = a[md]
            }
            return i
        };
        K.sd = function() {};
        K.Bb = function() {
            this.rc( - 1);
            this.tc(k);
            this.L && this.L.G(k)
        };
        K.Ra = function(a) {
            if (this.Z() && this.s && (this.kb() != 0 || this.gh) && this.fc(a)) {
                a[Pb]();
                a[Kb]();
                return h
            }
            return k
        };
        K.fc = function(a) {
            var b = this.ac();
            if (b && typeof b.Ra == Td && b.Ra(a)) return h;
            if (this.L && this.L != b && typeof this.L.Ra == Td && this.L.Ra(a)) return h;
            if (a[cd] || a[wb] || a.metaKey || a[Va]) return k;
            switch (a[Dc]) {
            case 27:
                if (this.Fb()) this.P().blur();
                else return k;
                break;
            case 36:
                this.yk();
                break;
            case 35:
                this.zk();
                break;
            case 38:
                if (this.lc == tt) this.ef();
                else return k;
                break;
            case 37:
                if (this.lc == qt) this.mf() ? this.df() : this.ef();
                else return k;
                break;
            case 40:
                if (this.lc == tt) this.df();
                else return k;
                break;
            case 39:
                if (this.lc == qt) this.mf() ? this.ef() : this.df();
                else return k;
                break;
            default:
                return k
            }
            return h
        };
        K.Ah = function(a) {
            var b = a.a();
            b = b.id || (b.id = a.bc());
            if (!this.bb) this.bb = {};
            this.bb[b] = a
        };
        K.Yc = function(a, b) {
            ut.b.Yc[E](this, a, b)
        };
        K.xc = function(a, b, c) {
            a.Lh(2, h);
            a.Lh(64, h);
            if (this.Fb() || !this.Ji) a.ya(32, k);
            a.Ff(k);
            ut.b.xc[E](this, a, b, c);
            c && this.q && this.Ah(a);
            b <= this.la && this.la++
        };
        K.removeChild = function(a, b) {
            if (a = Q(a) ? this.Me(a) : a) {
                var c = this.zd(a);
                if (c != -1) if (c == this.la) a.Wa(k);
                else c < this.la && this.la--; (c = a.a()) && c.id && Mf(this.bb, c.id)
            }
            a = ut.b[ec][E](this, a, b);
            a.Ff(h);
            return a
        };
        var wt = "aftershow";
        K.R = function(a, b) {
            if (b || this.s != a && this[z](a ? Vs: Ws)) {
                this.s = a;
                var c = this.a();
                if (c) {
                    kn(c, a);
                    this.Fb() && this.m.Cg(this.P(), this.ga && this.s);
                    b || this[z](this.s ? wt: Rr)
                }
                return h
            }
            return k
        };
        K.Z = function() {
            return this.ga
        };
        K.Fb = function() {
            return this.Le
        };
        K.Mb = function(a) {
            a != this.Le && this.q && this.Ag(a);
            this.Le = a;
            this.ga && this.s && this.m.Cg(this.P(), a)
        };
        K.rc = function(a) {
            if (a = this.jb(a)) a.Wa(h);
            else this.la > -1 && this.ac().Wa(k)
        };
        K.Wa = function(a) {
            this.rc(this.zd(a))
        };
        K.ac = function() {
            return this.jb(this.la)
        };
        K.yk = function() {
            this.wd(function(a, b) {
                return (a + 1) % b
            },
            this.kb() - 1)
        };
        K.zk = function() {
            this.wd(function(a, b) {
                a--;
                return a < 0 ? b - 1 : a
            },
            0)
        };
        K.df = function() {
            this.wd(function(a, b) {
                return (a + 1) % b
            },
            this.la)
        };
        K.ef = function() {
            this.wd(function(a, b) {
                a--;
                return a < 0 ? b - 1 : a
            },
            this.la)
        };
        K.wd = function(a, b) {
            var c = b < 0 ? this.zd(this.L) : b,
            d = this.kb();
            c = a[E](this, c, d);
            for (var f = 0; f <= d;) {
                var g = this.jb(c);
                if (g && this.gg(g)) {
                    this.Sl(c);
                    return h
                }
                f++;
                c = a[E](this, c, d)
            }
            return k
        };
        K.gg = function(a) {
            return a.s && a.Z() && a.ea(2)
        };
        K.Sl = function(a) {
            this.rc(a)
        };
        K.tc = function(a) {
            this.sf = a
        };
        function xt() {}
        R(xt, ws);
        Md(xt);
        var yt = "goog-menuheader";
        xt[u].O = function() {
            return yt
        };
        function zt(a, b, c) {
            Us[E](this, a, c || xt.ja(), b);
            this.ya(1, k);
            this.ya(2, k);
            this.ya(4, k);
            this.ya(32, k);
            this.Qh(1)
        }
        R(zt, Us);
        Ss(yt,
        function() {
            return new zt(i)
        });
        function At() {
            this.kg = []
        }
        R(At, ws);
        Md(At);
        K = At[u];
        var Bt = "-highlight",
        Ct = "-checkbox";
        K.md = function(a) {
            var b = this.kg[a];
            if (!b) {
                switch (a) {
                case 0:
                    b = this.dc() + Bt;
                    break;
                case 1:
                    b = this.dc() + Ct;
                    break;
                case 2:
                    b = this.dc() + Hr
                }
                this.kg[a] = b
            }
            return b
        };
        var Dt = "menuitem";
        K.ib = function() {
            return Dt
        };
        K.d = function(a) {
            var b = a.B().d(mm, this.Zb(a)[ud](Ve), this.Zi(a.Aa, a.B()));
            this.Ql(a, b, a.ea(8) || a.ea(16));
            return b
        };
        K.N = function(a) {
            return a && a[Fc]
        };
        Ka(K,
        function(a, b) {
            var c = this.N(a),
            d = this.bf(a) ? c[Fc] : i;
            At.b[kd][E](this, a, b);
            if (d && !this.bf(a)) c[Rb](d, c[Fc] || i)
        });
        K.Zi = function(a, b) {
            var c = this.md(2);
            return b.d(mm, c, a)
        };
        K.bf = function(a) {
            if (a = this.N(a)) {
                a = a[Fc];
                var b = this.md(1);
                return !! a && !!a.className && a.className[y](b) != -1
            }
            return k
        };
        var Et = "goog-option";
        K.Ql = function(a, b, c) {
            if (c != this.bf(b)) {
                var d = b,
                f = Et;
                c ? zg(d, f) : Ag(d, f);
                b = this.N(b);
                if (c) {
                    c = this.md(1);
                    b[Rb](a.B().d(mm, c), b[Fc] || i)
                } else b[ec](b[Fc])
            }
        };
        var Ft = "goog-option-selected";
        K.ld = function(a) {
            switch (a) {
            case 2:
                return this.md(0);
            case 16:
            case 8:
                return Ft;
            default:
                return At.b.ld[E](this, a)
            }
        };
        var Gt = "goog-menuitem";
        K.O = function() {
            return Gt
        };
        function Ht(a, b, c, d) {
            Us[E](this, a, d || At.ja(), c);
            this[ib](b)
        }
        R(Ht, Us);
        La(Ht[u],
        function() {
            var a = this.rf;
            return a != i ? a: this.kd()
        });
        ta(Ht[u],
        function(a) {
            this.Ul(a)
        });
        var It = "goog-menuitem-accel";
        Ht[u].kd = function() {
            return this.Jg(function(a) {
                return vf(yg(a), It) ? S: jh(a)
            })
        };
        Ss(Gt,
        function() {
            return new Ht(i)
        });
        function Jt() {}
        R(Jt, ot);
        Md(Jt);
        Jt[u].ib = function() {
            return Np
        };
        Jt[u].tb = function(a, b) {
            return ah(a.a(), b)
        };
        var Kt = "goog-menu";
        Jt[u].O = function() {
            return Kt
        };
        var Lt = "haspopup";
        Jt[u].hc = function(a) {
            Jt.b.hc[E](this, a);
            a = a.a();
            Pq(a, Lt, ro)
        };
        Ss(lt,
        function() {
            return new mt
        });
        function Mt(a, b) {
            ut[E](this, tt, b || Jt.ja(), a);
            this.Mb(k)
        }
        R(Mt, ut);
        K = Mt[u];
        K.oe = h;
        K.Ki = k;
        K.O = function() {
            return this.m.O()
        };
        K.tb = function(a) {
            if (this.m.tb(this, a)) return h;
            for (var b = 0,
            c = this.kb(); b < c; b++) {
                var d = this.jb(b);
                if (typeof d.tb == Td && d.tb(a)) return h
            }
            return k
        };
        K.Za = function(a) {
            this.Yc(a, h)
        };
        K.Rb = function(a, b) {
            this.xc(a, b, h)
        };
        K.Ic = function(a) {
            return this.jb(a)
        };
        K.Oe = function() {
            return this.kb()
        };
        K.setPosition = function(a, b) {
            var c = this.s;
            c || kn(this.a(), h);
            var d = this.a(),
            f = a,
            g = b,
            j = Um(d);
            if (f instanceof Ff) {
                g = f.y;
                f = f.x
            }
            f = f - j.x;
            g = g - j.y;
            Hm(d, d.offsetLeft + f, d[qd] + g);
            c || kn(this.a(), k)
        };
        K.Jl = function(a) { (this.oe = a) && this.Mb(h)
        };
        K.R = function(a, b) {
            var c = Mt.b.R[E](this, a, b);
            c && a && this.q && this.oe && this.P()[wc]();
            return c
        };
        K.Se = function(a) {
            this.oe && this.P()[wc]();
            return Mt.b.Se[E](this, a)
        };
        K.gg = function(a) {
            return (this.Ki || a.Z()) && a.s && a.ea(2)
        };
        function Nt() {}
        R(Nt, Qs);
        Md(Nt);
        K = Nt[u];
        var Ot = "goog-inline-block ";
        K.d = function(a) {
            var b = this.Zb(a);
            b = {
                "class": Ot + b[ud](Ve),
                title: a.rd() || S
            };
            return a.B().d(mm, b, this.ze(a.Aa, a.B()))
        };
        K.ib = function() {
            return Sr
        };
        K.N = function(a) {
            return a && a[Fc][Fc]
        };
        var Pt = "-outer-box",
        Qt = "-inner-box";
        K.ze = function(a, b) {
            return b.d(mm, Ot + (this.O() + Pt), b.d(mm, Ot + (this.O() + Qt), a))
        };
        var Rt = "goog-custom-button";
        K.O = function() {
            return Rt
        };
        function St() {}
        R(St, Nt);
        Md(St);
        if (cg) Ka(St[u],
        function(a, b) {
            var c = St.b.N[E](this, a && a[Fc]);
            if (c) {
                var d = this.createCaption(b, Bg(a)),
                f = c[md];
                f && f.replaceChild(d, c)
            }
        });
        K = St[u];
        K.N = function(a) {
            a = St.b.N[E](this, a && a[Fc]);
            if (cg && a && a.__goog_wrapper_div) a = a[Fc];
            return a
        };
        K.ze = function(a, b) {
            return St.b.ze[E](this, [this.createCaption(a, b), this.aj(b)], b)
        };
        var Tt = "-caption";
        K.createCaption = function(a, b) {
            return b.d(mm, Ot + (this.O() + Tt), a)
        };
        var Ut = "-dropdown";
        K.aj = function(a) {
            return a.d(mm, Ot + (this.O() + Ut), jp)
        };
        var Vt = "goog-menu-button";
        K.O = function() {
            return Vt
        };
        function Wt(a, b, c, d) {
            jt[E](this, a, c || St.ja(), d);
            this.ya(64, h);
            b && this.Ud(b);
            this.pa = new xj(500)
        }
        R(Wt, jt);
        K = Wt[u];
        K.Yf = h;
        K.Bf = k;
        K.lf = k;
        K.ul = k;
        K.S = function() {
            Wt.b.S[E](this);
            this.h && this.$c(this.h, h);
            Pq(this.a(), Lt, ro)
        };
        K.ha = function() {
            Wt.b.ha[E](this);
            if (this.h) {
                this.G(k);
                this.h.ha();
                this.$c(this.h, k);
                var a = this.h.a();
                a && $g(a)
            }
        };
        K.i = function() {
            Wt.b.i[E](this);
            if (this.h) {
                this.h.J();
                delete this.h
            }
            delete this.ll;
            this.pa.J()
        };
        K.Cb = function(a) {
            Wt.b.Cb[E](this, a);
            if (this.Ja()) {
                this.G(!this[pc]());
                this.h && this.h.tc(this[pc]())
            }
        };
        K.Lc = function(a) {
            Wt.b.Lc[E](this, a);
            this.h && !this.Ja() && this.h.tc(k)
        };
        K.mc = function() {
            this[xd](k);
            return h
        };
        K.ik = function(a) {
            this.h && this.h.s && !this.tb(a[gc]) && this.G(k)
        };
        K.tb = function(a) {
            return a && ah(this.a(), a) || this.h && this.h.tb(a) || k
        };
        K.fc = function(a) {
            if (a[Dc] == 32) {
                a[Pb]();
                if (a[F] != ns) return k
            } else if (a[F] != os) return k;
            if (this.h && this.h.s) {
                var b = this.h.Ra(a);
                if (a[Dc] == 27) {
                    this.G(k);
                    return h
                }
                return b
            }
            if (a[Dc] == 40 || a[Dc] == 38 || a[Dc] == 32) {
                this.G(h);
                return h
            }
            return k
        };
        K.Ve = function() {
            this.G(k)
        };
        K.nk = function() {
            this.Ja() || this.G(k)
        };
        K.Bb = function(a) {
            this.lf || this.G(k);
            Wt.b.Bb[E](this, a)
        };
        K.Jc = function() {
            this.h || this.Ud(new Mt(this.B()));
            return this.h || i
        };
        K.Ud = function(a) {
            var b = this.h;
            if (a != b) {
                if (b) {
                    this.G(k);
                    this.q && this.$c(b, k);
                    delete this.h
                }
                if (a) {
                    this.h = a;
                    a.Hf(this);
                    a.R(k);
                    a.Jl(this.lf);
                    this.q && this.$c(a, h)
                }
            }
            return b
        };
        K.Za = function(a) {
            this.Jc().Yc(a, h)
        };
        K.Rb = function(a, b) {
            this.Jc().xc(a, b, h)
        };
        K.Ic = function(a) {
            return this.h ? this.h.jb(a) : i
        };
        K.Oe = function() {
            return this.h ? this.h.kb() : 0
        };
        K.R = function(a, b) {
            var c = Wt.b.R[E](this, a, b);
            c && !this.s && this.G(k);
            return c
        };
        K.G = function(a) {
            Wt.b.G[E](this, a);
            if (this.h && this.Ha(64) == a) {
                if (a) {
                    this.h.q || (this.ul ? this.h.Ua(this.a().Ka) : this.h.Ua());
                    this.hi = Tm(this.a());
                    this.bg = dn(this.a());
                    this.wh();
                    this.h.rc( - 1)
                } else {
                    this[xd](k);
                    this.h.tc(k);
                    if (Kd(this.Hd)) {
                        this.Hd = m;
                        var b = this.h.a();
                        b && Xm(b, S, S)
                    }
                }
                this.h.R(a);
                this.Li(a)
            }
        };
        K.wh = function() {
            if (this.h.q) {
                var a = this.ll || this.a(),
                b = this.Yf ? 5 : 7;
                a = new vs(a, b, !this.Bf, this.Bf);
                b = this.h.a();
                if (!this.h.s) {
                    Qa(b[Xb], an);
                    kn(b, h)
                }
                if (!this.Hd && this.Bf) this.Hd = cn(b);
                var c = this.Yf ? 4 : 6;
                a.Kb(b, c, i, this.Hd);
                if (!this.h.s) {
                    kn(b, k);
                    Qa(b[Xb], Pm)
                }
            }
        };
        K.dl = function() {
            var a = dn(this.a()),
            b = Tm(this.a()),
            c;
            c = this.bg;
            c = c == a ? h: !c || !a ? k: c[C] == a[C] && c[w] == a[w] && c.top == a.top && c[I] == a[I];
            if (! (c = !c)) {
                c = this.hi;
                c = c == b ? h: !c || !b ? k: c.top == b.top && c[Ed] == b[Ed] && c[Tc] == b[Tc] && c[C] == b[C];
                c = !c
            }
            if (c) {
                this.bg = a;
                this.hi = b;
                this.wh()
            }
        };
        K.$c = function(a, b) {
            var c = this.X(),
            d = b ? c.j: c.ba;
            d[E](c, a, $s, this.Ve);
            d[E](c, a, or, this.Ue);
            d[E](c, a, pr, this.Ze)
        };
        K.Ue = function(a) {
            Pq(this.a(), vt, a[gc].a().id)
        };
        K.Ze = function() {
            this.h.ac() || Pq(this.a(), vt, S)
        };
        K.Li = function(a) {
            var b = this.X(),
            c = a ? b.j: b.ba;
            c[E](b, this.B().l, Xq, this.ik, h);
            this.lf && c[E](b, this.h, Ql, this.nk);
            c[E](b, this.pa, Aj, this.dl);
            a ? this.pa[tc]() : this.pa.stop()
        };
        Ss(Vt,
        function() {
            return new Wt(i)
        });
        function Xt(a) {
            this.Gb = [];
            this.Gi(a)
        }
        R(Xt, Yi);
        K = Xt[u];
        K.Lb = i;
        K.Hh = i;
        K.Oe = function() {
            return this.Gb[t]
        };
        K.Ck = function(a) {
            return a ? qf(this.Gb, a) : -1
        };
        K.Ic = function(a) {
            return this.Gb[a] || i
        };
        K.Gi = function(a) {
            if (a) {
                rf(a,
                function(b) {
                    this.Od(b, k)
                },
                this);
                Af(this.Gb, a)
            }
        };
        K.Za = function(a) {
            this.Rb(a, this.Oe())
        };
        K.Rb = function(a, b) {
            if (a) {
                this.Od(a, k);
                Bf(this.Gb, b, 0, a)
            }
        };
        K.qd = function() {
            return this.Lb
        };
        K.Nb = function(a) {
            if (a != this.Lb) {
                this.Od(this.Lb, k);
                this.Lb = a;
                this.Od(a, h)
            }
            this[z](Yn)
        };
        K.pd = function() {
            return this.Ck(this.Lb)
        };
        K.Ph = function(a) {
            this.Nb(this.Ic(a))
        };
        Ja(K,
        function() {
            var a = this.Gb;
            if (!Wd(a)) for (var b = a[t] - 1; b >= 0; b--) delete a[b];
            sa(a, 0);
            this.Lb = i
        });
        K.i = function() {
            Xt.b.i[E](this);
            delete this.Gb;
            this.Lb = i
        };
        K.Od = function(a, b) {
            if (a) if (typeof this.Hh == Td) this.Hh(a, b);
            else typeof a.Kf == Td && a.Kf(b)
        };
        function Yt(a, b, c, d) {
            Wt[E](this, a, b, c, d);
            this.Ol(a)
        }
        R(Yt, Wt);
        K = Yt[u];
        K.z = i;
        K.De = i;
        K.S = function() {
            Yt.b.S[E](this);
            this.Pf();
            this.jh()
        };
        K.i = function() {
            Yt.b.i[E](this);
            if (this.z) {
                this.z.J();
                this.z = i
            }
            this.De = i
        };
        K.Ve = function(a) {
            this.Nb(a[gc]);
            Yt.b.Ve[E](this, a);
            a[Kb]();
            this[z]($s)
        };
        K.qk = function() {
            var a = this.qd();
            Yt.b[ib][E](this, a && a[H]());
            this.Pf()
        };
        K.Ud = function(a) {
            var b = Yt.b.Ud[E](this, a);
            if (a != b) {
                this.z && this.z.clear();
                if (a) this.z ? a.Yb(function(c) {
                    this.z.Za(c)
                },
                this) : this.Be(a)
            }
            return b
        };
        K.Ol = function(a) {
            this.De = a;
            this.Pf()
        };
        K.Za = function(a) {
            Yt.b.Za[E](this, a);
            this.z ? this.z.Za(a) : this.Be(this.Jc())
        };
        K.Rb = function(a, b) {
            Yt.b.Rb[E](this, a, b);
            this.z ? this.z.Rb(a, b) : this.Be(this.Jc())
        };
        K.Nb = function(a) {
            this.z && this.z.Nb(a)
        };
        K.Ph = function(a) {
            this.z && this.Nb(this.z.Ic(a))
        };
        ta(K,
        function(a) {
            if (Kd(a) && this.z) for (var b = 0,
            c; c = this.z.Ic(b); b++) if (c && typeof c[H] == Td && c[H]() == a) {
                this.Nb(c);
                return
            }
            this.Nb(i)
        });
        K.qd = function() {
            return this.z ? this.z.qd() : i
        };
        K.pd = function() {
            return this.z ? this.z.pd() : -1
        };
        K.Be = function(a) {
            this.z = new Xt;
            a && a.Yb(function(b) {
                this.z.Za(b)
            },
            this);
            this.jh()
        };
        K.jh = function() {
            this.z && this.X().j(this.z, Yn, this.qk)
        };
        K.Pf = function() {
            var a = this.qd();
            this[kd](a ? a.kd() : this.De)
        };
        K.G = function(a) {
            Yt.b.G[E](this, a);
            this[pc]() && this.Jc().rc(this.pd())
        };
        Ss("goog-select",
        function() {
            return new Yt(i)
        });
        function Zt(a, b) {
            this.Na = Bg();
            this.Sb = a;
            this.fg = [];
            Bn(So);
            this.lj(b)
        }
        Zt[u].qc = i;
        var $t = "google-visualization-toolbar",
        au = $t + "-export-igoogle",
        bu = $t + "-export-data",
        cu = $t + "-html-code",
        du = $t + "-small-dialog",
        eu = $t + "-big-dialog",
        fu = $t + "-html-code-explanation",
        gu = $t + "-triangle",
        hu = "range",
        iu = "Copy-Paste this code to an HTML page",
        ju = "br",
        ku = "pre",
        lu = "Google Visualization";
        function mu(a, b) {
            var c = Bg(),
            d,
            f,
            g = i;
            switch (a) {
            case 2:
                d = new Br(du);
                g = hu + d.bc();
                f = c.d(mm, i, c.d(mm, {
                    "class": fu
                },
                iu), c.d(ju, i), c.d(ku, i, c.d(mm, {
                    id: g
                },
                b[Ub])));
                break;
            case 3:
                d = new Br(eu);
                f = c.d(mm, i, c.d(mm, {
                    "class": fu
                },
                iu), c.d(ju, i));
                var j = b[Ub];
                j = c.d(mm, i, c.d(ku, i, j));
                c[Ra](f, j)
            }
            d[kd](f.innerHTML);
            wa(d.dk(), lu);
            wa(d.Pj(), S);
            d.R(h);
            if (g) {
                c = Eg(g); (T ? lq(c, 0, c, 1) : dg ? new tq(fq(c, 0, c, 1)) : cg ? new gq(fq(c, 0, c, 1)) : bg ? new sq(fq(c, 0, c, 1)) : new cq(fq(c, 0, c, 1))).select()
            }
        }
        var nu = "Chart options",
        ou = "\u25bc",
        pu = "package",
        qu = "width: 700px; height: 500px;",
        ru = "csv",
        su = "tqx",
        tu = "out:csv;",
        uu = "Google_Visualization",
        vu = "Export data as CSV",
        wu = "htmlcode",
        xu = '<iframe style="',
        yu = '" src="http://www.google.com/ig/ifr?url=',
        zu = "&up__table_query_url=",
        Au = "Publish to web page",
        Bu = "jscode",
        Cu = '<html>\n <head>\n  <title>Google Visualization API</title>\n  <script type="text/javascript" src="http://www.google.com/jsapi"><\/script>\n  <script type="text/javascript">\n   google.load(\'visualization\', \'1\', {packages: [\'',
        Du = "']});\n\n   function drawVisualization() {\n    new google.visualization.Query('",
        Eu = "').send(\n     function(response) {\n      new ",
        Fu = '(\n       document.getElementById(\'visualization\')).\n        draw(response.getDataTable(), null);\n      });\n   }\n\n   google.setOnLoadCallback(drawVisualization);\n  <\/script>\n </head>\n <body>\n  <div id="visualization" style="width: 500px; height: 500px;"></div>\n </body>\n</html>',
        Gu = "Javascript code",
        Hu = "out:html;",
        Iu = "Export data as HTML",
        Ju = "igoogle",
        Ku = "http://www.google.com/ig/adde?moduleurl=",
        Lu = "Add to iGoogle";
        Zt[u].lj = function(a) {
            a = a || {};
            var b = this.Sb,
            c = this.Na;
            c.yf(b);
            if (!b) e(l(Lp));
            var d = c.d(lm, i),
            f = [c.d(lm, i, nu), c.d(mm, {
                "class": gu
            },
            ou)];
            this.qc = new Yt(f);
            if (a) for (f = 0; f < a[t]; f++) {
                var g = i,
                j = a[f],
                n = j[F],
                q = j.datasource,
                v = j.gadget,
                B = j.userprefs,
                M = j[Sb],
                A = j[pu],
                J = j[Xb] || qu;
                switch (n) {
                case ru:
                    g = this.Bc(f, je(function(N) {
                        ia[db]((new aj(N)).Gf(su, tu), uu)
                    },
                    q), vu, bu);
                    break;
                case wu:
                    g = this.Bc(f, je(function(N, Z) {
                        var Da = xu + J + yu + ca(N) + zu + ca(Z) + Mu(B) + ep;
                        mu(2, {
                            message: Da
                        })
                    },
                    v, q), Au, cu);
                    break;
                case Bu:
                    g = this.Bc(f, je(function(N, Z, Da) {
                        N = Cu + ca(Z) + Du + N + Eu + ca(Da) + Fu;
                        mu(3, {
                            message: N
                        })
                    },
                    q, A, M), Gu, cu);
                    break;
                case kk:
                    g = this.Bc(f, je(function(N) {
                        ia[db]((new aj(N)).Gf(su, Hu), uu)
                    },
                    q), Iu, bu);
                    break;
                case Ju:
                    g = this.Bc(f, je(function(N, Z, Da) {
                        ia[db](Ku + ca(N) + zu + ca(Z) + Mu(Da))
                    },
                    v, q, B), Lu, au);
                    break;
                default:
                    e(l("No such toolbar component as: " + j.toSource()))
                }
                g && this.qc.Za(g)
            }
            Ni(this.qc, $s, ie(this.rk, this));
            this.qc.Ua(d);
            c[Ra](b, d)
        };
        Zt[u].Pl = function() {
            this.qc.Ph( - 1)
        };
        Zt[u].rk = function() {
            var a = this.qc.pd();
            this.fg[a]();
            this.Pl()
        };
        Zt[u].Bc = function(a, b, c) {
            c = new Ht(c);
            this.fg[a] = b;
            return c
        };
        var Nu = "&up_";
        function Mu(a) {
            if (!a) return S;
            var b = S,
            c;
            for (c in a) b += Nu + c + tj + ca(a[c]);
            return b
        }
        function Ou(a, b) {
            new Zt(a, b)
        };
        o("google.visualization.drawChart", eo);
        o("google.visualization.drawFromUrl", go);
        o("google.visualization.createUrl", lo);
        o("google.visualization.createSnippet", qo);
        o("google.visualization.ChartWrapper", Y);
        p(Y[u], vm, Y[u][xc]);
        p(Y[u], "toJSON", Y[u][hb]);
        p(Y[u], "getSnapshot", Y[u].getSnapshot);
        p(Y[u], "getDataSourceUrl", Y[u].getDataSourceUrl);
        p(Y[u], "getDataTable", Y[u][Nb]);
        p(Y[u], "getChartName", Y[u].getChartName);
        p(Y[u], "getChartType", Y[u][Qc]);
        p(Y[u], "getChart", Y[u].Qj);
        p(Y[u], "getContainerId", Y[u].getContainerId);
        p(Y[u], "getPackages", Y[u].getPackages);
        p(Y[u], "getQuery", Y[u].getQuery);
        p(Y[u], "getRefreshInterval", Y[u].getRefreshInterval);
        p(Y[u], "getView", Y[u].getView);
        p(Y[u], "getOption", Y[u].getOption);
        p(Y[u], "getOptions", Y[u][Ab]);
        p(Y[u], "sendQuery", Y[u].Ih);
        p(Y[u], "setDataSourceUrl", Y[u].setDataSourceUrl);
        p(Y[u], "setDataTable", Y[u].setDataTable);
        p(Y[u], "setChartName", Y[u].setChartName);
        p(Y[u], "setChartType", Y[u].setChartType);
        p(Y[u], "setContainerId", Y[u].setContainerId);
        p(Y[u], "setPackages", Y[u].setPackages);
        p(Y[u], "setQuery", Y[u][$b]);
        var Pu = "setRefreshInterval";
        p(Y[u], Pu, Y[u][$c]);
        p(Y[u], "setView", Y[u].setView);
        p(Y[u], "setOption", Y[u].setOption);
        p(Y[u], "setOptions", Y[u].setOptions);
        o("google.visualization.Player", Hp);
        p(Hp[u], vm, Hp[u][xc]);
        o("onPlayBarEvent", Xp);
        o("google.visualization.drawToolbar", Ou);
        o("google.visualization.data.avg", zo);
        o("google.visualization.data.count", yo);
        o("google.visualization.data.group", Eo);
        o("google.visualization.data.join", wo);
        o("google.visualization.data.max", Bo);
        o("google.visualization.data.min", Ao);
        o("google.visualization.data.month", Co);
        o("google.visualization.data.sum", xo);
        function Qu() {
            var a;
            if (!Ru) {
                Ru = h;
                L.IDIModule && L.IDIModule.registerListener(kl, {
                    pollingInterval: 100
                });
                if (L.gadgets) {
                    Su(lj);
                    this.Bh()
                }
            }
            var b = lk;
            a = ma;
            b = b && b != on ? b.toUpperCase() : S;
            if (a.querySelectorAll && a.querySelector && (!dg || Og(ma) || tg(uq)) && b) {
                b = b + S;
                a = a.querySelectorAll(b)
            } else a = a = a[yd](b || on);
            a = a[0];
            this.zl = nk(a)
        }
        var Ru = k;
        Qu[u].uh = 200;
        function Tu() {
            return !! L.gadgets && !!L.gadgets.rpc
        }
        var Uu = "refresh";
        Qu[u].Bh = function() {
            if (Tu()) {
                var a = L.gadgets;
                ae(a.rpc.register) && a.rpc.register(Uu, kl)
            } else if (this.uh > 0) {
                this.uh--;
                ia[qb](ie(this.Bh, this), 100)
            }
        };
        var Vu = "_table_query_url",
        Wu = "http%",
        Xu = "https%",
        Yu = "_table_query_refresh_interval";
        Qu[u].createQueryFromPrefs = function(a) {
            var b = a.getString(Vu),
            c = b[zd]();
            if (c[y](Wu) == 0 || c[y](Xu) == 0) b = oa(b);
            b = new bl(b);
            a = a.getInt(Yu);
            b[$c](a);
            return b
        };
        Qu[u].validateResponse = function(a) {
            return this.zl(a)
        };
        var Zu = "http://dummy.com";
        function Su(a) {
            if (Tu()) {
                var b = L.gadgets;
                try {
                    b.rpc.getRelayUrl(a) || b.rpc.setRelayUrl(a, Zu)
                } catch(c) {
                    ae(b.rpc.setRelayUrl) && b.rpc.setRelayUrl(a, Zu)
                }
            }
        }
        L.gadgets && !Tu() && mk("http://www.gmodules.com/gadgets/rpc/rpc.v.js");
        Su(lj);
        o("__gvizguard__", ik);
        o("google.visualization.Query", bl);
        p(bl[u], gl, bl[u].makeRequest);
        p(bl[u], Pu, bl[u][$c]);
        p(bl[u], "setQuery", bl[u][$b]);
        p(bl[u], "send", bl[u][oc]);
        p(bl[u], "setRefreshable", bl[u].setRefreshable);
        p(bl[u], "setTimeout", bl[u][qb]);
        p(bl[u], "setHandlerType", bl[u].Rl);
        p(bl[u], "setHandlerParameter", bl[u].Oh);
        p(bl, "setResponse", pl);
        p(bl, dk, bl[ob]);
        o("google.visualization.QueryResponse", Sk);
        p(Sk[u], "getDataTable", Sk[u][Nb]);
        p(Sk[u], "isError", Sk[u][vc]);
        p(Sk[u], "hasWarning", Sk[u].hasWarning);
        p(Sk[u], "getReasons", Sk[u].getReasons);
        p(Sk[u], "getMessage", Sk[u].getMessage);
        p(Sk[u], "getDetailedMessage", Sk[u].getDetailedMessage);
        o("google.visualization.DataTable", V);
        p(V[u], "addColumn", V[u][ed]);
        p(V[u], "addRow", V[u].addRow);
        p(V[u], "addRows", V[u][vd]);
        p(V[u], "clone", V[u][fc]);
        p(V[u], "getColumnId", V[u].getColumnId);
        var $u = "getColumnIndex";
        p(V[u], $u, V[u].getColumnIndex);
        var av = "getColumnLabel";
        p(V[u], av, V[u][zc]);
        var bv = "getColumnPattern";
        p(V[u], bv, V[u].getColumnPattern);
        var cv = "getColumnProperty";
        p(V[u], cv, V[u][Eb]);
        var dv = "getColumnProperties";
        p(V[u], dv, V[u][Zb]);
        var ev = "getColumnRange";
        p(V[u], ev, V[u][Kc]);
        p(V[u], "getColumnType", V[u][Ec]);
        var fv = "getDistinctValues";
        p(V[u], fv, V[u].getDistinctValues);
        var gv = "getFilteredRows";
        p(V[u], gv, V[u].getFilteredRows);
        var hv = "getFormattedValue";
        p(V[u], hv, V[u][gd]);
        var iv = "getNumberOfColumns";
        p(V[u], iv, V[u][Jb]);
        var jv = "getNumberOfRows";
        p(V[u], jv, V[u][Xa]);
        p(V[u], "getProperties", V[u][bb]);
        p(V[u], "getProperty", V[u][Yb]);
        var kv = "getRowProperty";
        p(V[u], kv, V[u].getRowProperty);
        var lv = "getRowProperties";
        p(V[u], lv, V[u][Zc]);
        p(V[u], "getSortedRows", V[u][Hc]);
        var mv = "getTableProperty";
        p(V[u], mv, V[u].getTableProperty);
        var nv = "getTableProperties";
        p(V[u], nv, V[u].getTableProperties);
        p(V[u], "getValue", V[u][H]);
        p(V[u], "insertColumn", V[u].insertColumn);
        p(V[u], "insertRows", V[u].insertRows);
        p(V[u], "removeColumn", V[u].removeColumn);
        p(V[u], "removeColumns", V[u].removeColumns);
        p(V[u], "removeRow", V[u].removeRow);
        p(V[u], "removeRows", V[u].removeRows);
        p(V[u], "setCell", V[u][jd]);
        p(V[u], "setColumnLabel", V[u].setColumnLabel);
        p(V[u], "setColumnProperties", V[u][hc]);
        p(V[u], "setColumnProperty", V[u].setColumnProperty);
        p(V[u], "setFormattedValue", V[u][Qb]);
        p(V[u], "setProperties", V[u].setProperties);
        p(V[u], "setProperty", V[u][Ac]);
        p(V[u], "setRowProperties", V[u].setRowProperties);
        p(V[u], "setRowProperty", V[u].setRowProperty);
        p(V[u], "setTableProperties", V[u].setTableProperties);
        p(V[u], "setTableProperty", V[u].setTableProperty);
        p(V[u], "setValue", V[u][ib]);
        p(V[u], "sort", V[u].sort);
        p(V[u], "toJSON", V[u][hb]);
        o("google.visualization.DataView", X);
        p(X, "fromJSON", zm);
        p(X[u], "getColumnId", X[u].getColumnId);
        p(X[u], $u, X[u].getColumnIndex);
        p(X[u], av, X[u][zc]);
        p(X[u], bv, X[u].getColumnPattern);
        p(X[u], cv, X[u][Eb]);
        p(X[u], cv, X[u][Eb]);
        p(X[u], dv, X[u][Zb]);
        p(X[u], ev, X[u][Kc]);
        p(X[u], "getColumnType", X[u][Ec]);
        p(X[u], fv, X[u].getDistinctValues);
        p(X[u], gv, X[u].getFilteredRows);
        p(X[u], hv, X[u][gd]);
        p(X[u], iv, X[u][Jb]);
        p(X[u], jv, X[u][Xa]);
        p(X[u], "getProperties", X[u][bb]);
        p(X[u], "getProperty", X[u][Yb]);
        p(X[u], kv, X[u].getRowProperty);
        p(X[u], lv, X[u][Zc]);
        p(X[u], "getSortedRows", X[u][Hc]);
        p(X[u], "getTableColumnIndex", X[u].getTableColumnIndex);
        p(X[u], "getUnderlyingTableColumnIndex", X[u].getUnderlyingTableColumnIndex);
        p(X[u], "getTableRowIndex", X[u][Rc]);
        p(X[u], "getUnderlyingTableRowIndex", X[u].getUnderlyingTableRowIndex);
        p(X[u], mv, X[u].getTableProperty);
        p(X[u], nv, X[u].getTableProperties);
        p(X[u], "getValue", X[u][H]);
        p(X[u], "getViewColumnIndex", X[u].getViewColumnIndex);
        p(X[u], "getViewColumns", X[u].getViewColumns);
        p(X[u], "getViewRowIndex", X[u].getViewRowIndex);
        p(X[u], "getViewRows", X[u].getViewRows);
        p(X[u], "hideColumns", X[u].hideColumns);
        p(X[u], "hideRows", X[u].hideRows);
        p(X[u], "setColumns", X[u][wd]);
        p(X[u], "setRows", X[u].setRows);
        p(X[u], "toDataTable", X[u][Bc]);
        p(X[u], "toJSON", X[u][hb]);
        o("google.visualization.GadgetHelper", Qu);
        p(Qu[u], "createQueryFromPrefs", Qu[u].createQueryFromPrefs);
        p(Qu[u], "validateResponse", Qu[u].validateResponse);
        o("google.visualization.errors", W);
        p(W, "addError", W[cb]);
        p(W, "removeAll", W[rc]);
        p(W, "removeError", W.removeError);
        p(W, "addErrorFromQueryResponse", W.addErrorFromQueryResponse);
        p(W, "getContainer", W.getContainer);
        p(W, "createProtectedCallback", W.createProtectedCallback);
        o("google.visualization.events", um);
        p(um, "addListener", um.addListener);
        p(um, "trigger", um[Za]);
        p(um, "removeListener", um.removeListener);
        p(um, "removeAllListeners", um.removeAllListeners);
        o("google.visualization.QueryWrapper", wm);
        p(wm[u], "setOptions", wm[u].setOptions);
        p(wm[u], vm, wm[u][xc]);
        p(wm[u], "setCustomErrorHandler", wm[u].Nl);
        p(wm[u], "sendAndDraw", wm[u].sendAndDraw);
        p(wm[u], "setCustomPostResponseHandler", wm[u].setCustomPostResponseHandler);
        p(wm[u], "setCustomResponseHandler", wm[u].setCustomResponseHandler);
        p(wm[u], dk, wm[u][ob]);
        o("google.visualization.arrayToDataTable", Nk);
        o("google.visualization.datautils.compareValues", Bk);
    })();

    (function() {
        var h = true,
        i = null,
        o = false,
        p = Error,
        q = undefined,
        t = parseInt,
        u = String,
        w = Object,
        x = document,
        aa = google,
        y = google_exportProperty,
        z = Math,
        ba = Array;
        function ca(a, c) {
            return a.className = c
        }
        function da(a, c) {
            return a.currentTarget = c
        }
        function ea(a, c) {
            return a.target = c
        }
        function fa(a, c) {
            return a.type = c
        }
        var A = "appendChild",
        B = "push",
        ga = "toString",
        ha = "trigger",
        C = "length",
        ia = "propertyIsEnumerable",
        D = "prototype",
        ja = "round",
        ka = "slice",
        E = "replace",
        la = "events",
        F = "split",
        ma = "visualization",
        G = "indexOf",
        na = "color",
        H = "style",
        I = "call",
        oa = "createElement",
        pa = "keyCode",
        qa = "handleEvent",
        J = "type",
        K = "apply",
        ra = "name",
        sa = "getElementsByTagName",
        L, M = this,
        ta = ".";
        function ua(a, c) {
            for (var b = a[F](ta), d = c || M, f; f = b.shift();) if (d[f] != i) d = d[f];
            else return i;
            return d
        }
        function va() {}
        var wa = "object",
        xa = "[object Array]",
        ya = "number",
        za = "splice",
        N = "array",
        Aa = "[object Function]",
        Ba = "call",
        O = "function",
        Ca = "null";
        function P(a) {
            var c = typeof a;
            if (c == wa) if (a) {
                if (a instanceof ba || !(a instanceof w) && w[D][ga][I](a) == xa || typeof a[C] == ya && typeof a.splice != "undefined" && typeof a[ia] != "undefined" && !a[ia](za)) return N;
                if (! (a instanceof w) && (w[D][ga][I](a) == Aa || typeof a[I] != "undefined" && typeof a[ia] != "undefined" && !a[ia](Ba))) return O
            } else return Ca;
            else if (c == O && typeof a[I] == "undefined") return wa;
            return c
        }
        function Da(a) {
            var c = P(a);
            return c == N || c == wa && typeof a[C] == ya
        }
        var Ea = "string";
        function Fa(a) {
            return typeof a == Ea
        }
        function Ga(a) {
            return P(a) == O
        }
        function Ha(a) {
            a = P(a);
            return a == wa || a == N || a == O
        }
        var Q = "closure_uid_" + z.floor(z.random() * 2147483648)[ga](36),
        Ia = 0;
        function Ja(a) {
            return a[I][K](a.bind, arguments)
        }
        function Ka(a, c) {
            var b = c || M;
            if (arguments[C] > 2) {
                var d = ba[D][ka][I](arguments, 2);
                return function() {
                    var f = ba[D][ka][I](arguments);
                    ba[D].unshift[K](f, d);
                    return a[K](b, f)
                }
            } else return function() {
                return a[K](b, arguments)
            }
        }
        var La = "native code";
        function R() {
            R = Function[D].bind && Function[D].bind[ga]()[G](La) != -1 ? Ja: Ka;
            return R[K](i, arguments)
        }
        function Ma(a, c) {
            function b() {}
            b.prototype = c[D];
            a.ga = c[D];
            a.prototype = new b
        };
        var Na = "&amp;",
        Oa = "&lt;",
        Pa = "&gt;",
        Qa = "&quot;",
        Sa = "&",
        Ta = "<",
        Ua = ">",
        Va = '"';
        function Wa(a, c) {
            if (c) return a[E](Xa, Na)[E](Ya, Oa)[E](Za, Pa)[E]($a, Qa);
            else {
                if (!ab.test(a)) return a;
                if (a[G](Sa) != -1) a = a[E](Xa, Na);
                if (a[G](Ta) != -1) a = a[E](Ya, Oa);
                if (a[G](Ua) != -1) a = a[E](Za, Pa);
                if (a[G](Va) != -1) a = a[E]($a, Qa);
                return a
            }
        }
        var Xa = /&/g,
        Ya = /</g,
        Za = />/g,
        $a = /\"/g,
        ab = /[&<>\"]/,
        S = "",
        bb = "(\\d*)(\\D*)",
        cb = "g";
        function db(a, c) {
            for (var b = 0,
            d = u(a)[E](/^[\s\xa0]+|[\s\xa0]+$/g, S)[F](ta), f = u(c)[E](/^[\s\xa0]+|[\s\xa0]+$/g, S)[F](ta), e = z.max(d[C], f[C]), g = 0; b == 0 && g < e; g++) {
                var m = d[g] || S,
                k = f[g] || S,
                l = RegExp(bb, cb),
                j = RegExp(bb, cb);
                do {
                    var r = l.exec(m) || [S, S, S], n = j.exec(k) || [S, S, S];
                    if (r[0][C] == 0 && n[0][C] == 0) break;
                    b = r[1][C] == 0 ? 0 : t(r[1], 10);
                    var s = n[1][C] == 0 ? 0 : t(n[1], 10);
                    b = eb(b, s) || eb(r[2][C] == 0, n[2][C] == 0) || eb(r[2], n[2])
                } while ( b == 0 )
            }
            return b
        }
        function eb(a, c) {
            if (a < c) return - 1;
            else if (a > c) return 1;
            return 0
        };
        var T = ba[D],
        fb = T[G] ?
        function(a, c, b) {
            return T[G][I](a, c, b)
        }: function(a, c, b) {
            b = b == i ? 0 : b < 0 ? z.max(0, a[C] + b) : b;
            if (Fa(a)) {
                if (!Fa(c) || c[C] != 1) return - 1;
                return a[G](c, b)
            }
            for (b = b; b < a[C]; b++) if (b in a && a[b] === c) return b;
            return - 1
        },
        gb = T.forEach ?
        function(a, c, b) {
            T.forEach[I](a, c, b)
        }: function(a, c, b) {
            for (var d = a[C], f = Fa(a) ? a[F](S) : a, e = 0; e < d; e++) e in f && c[I](b, f[e], e, a)
        };
        function hb(a, c) {
            var b = fb(a, c),
            d;
            if (d = b >= 0) {
                var f = a;
                b = b;
                T.splice[I](f, b, 1)
            }
            return d
        }
        function ib() {
            return T.concat[K](T, arguments)
        }
        function jb(a) {
            if (P(a) == N) return ib(a);
            else {
                for (var c = [], b = 0, d = a[C]; b < d; b++) c[b] = a[b];
                return c
            }
        }
        function kb(a) {
            return T.splice[K](a, lb(arguments, 1))
        }
        function lb(a, c, b) {
            return arguments[C] <= 2 ? T[ka][I](a, c) : T[ka][I](a, c, b)
        }
        function mb(a, c) {
            T.sort[I](a, c || nb)
        }
        function nb(a, c) {
            return a > c ? 1 : a < c ? -1 : 0
        };
        function ob(a, c, b) {
            for (var d in a) c[I](b, a[d], d, a)
        }
        var pb = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
        function qb(a) {
            for (var c, b, d = 1; d < arguments[C]; d++) {
                b = arguments[d];
                for (c in b) a[c] = b[c];
                for (var f = 0; f < pb[C]; f++) {
                    c = pb[f];
                    if (w[D].hasOwnProperty[I](b, c)) a[c] = b[c]
                }
            }
        };
        var U, rb, sb, tb, ub;
        function vb() {
            return M.navigator ? M.navigator.userAgent: i
        }
        function wb() {
            return M.navigator
        }
        tb = sb = rb = U = o;
        var xb;
        if (xb = vb()) {
            var yb = wb();
            U = xb[G]("Opera") == 0;
            rb = !U && xb[G]("MSIE") != -1; (sb = !U && xb[G]("WebKit") != -1) && xb[G]("Mobile");
            tb = !U && !sb && yb.product == "Gecko"
        }
        var zb = U,
        V = rb,
        Ab = tb,
        Bb = sb,
        Cb, Db = wb(),
        Eb = Cb = Db && Db.platform || S;
        ub = Eb[G]("Mac") != -1;
        Eb[G]("Win");
        Eb[G]("Linux");
        wb() && (wb().appVersion || S)[G]("X11");
        var Fb = ub,
        Gb;
        a: {
            var Hb = S,
            Ib;
            if (zb && M.opera) {
                var Jb = M.opera.version;
                Hb = typeof Jb == O ? Jb() : Jb
            } else {
                if (Ab) Ib = /rv\:([^\);]+)(\)|;)/;
                else if (V) Ib = /MSIE\s+([^\);]+)(\)|;)/;
                else if (Bb) Ib = /WebKit\/(\S+)/;
                if (Ib) {
                    var Kb = Ib.exec(vb());
                    Hb = Kb ? Kb[1] : S
                }
            }
            if (V) {
                var Lb, Mb = M.document;
                Lb = Mb ? Mb.documentMode: q;
                if (Lb > parseFloat(Hb)) {
                    Gb = u(Lb);
                    break a
                }
            }
            Gb = Hb
        }
        var Nb = Gb,
        Ob = {};
        function Pb(a) {
            return Ob[a] || (Ob[a] = db(Nb, a) >= 0)
        };
        var Qb = new Function("a", "return a");
        var Rb; ! V || Pb("9");
        V && Pb("8");
        function Sb() {}
        Sb[D].X = o;
        Sb[D].C = function() {
            if (!this.X) {
                this.X = h;
                this.k()
            }
        };
        Sb[D].k = function() {};
        function Tb(a, c) {
            fa(this, a);
            ea(this, c);
            da(this, this.target)
        }
        Ma(Tb, Sb);
        Tb[D].k = function() {
            delete this[J];
            delete this.target;
            delete this.currentTarget
        };
        Tb[D].N = o;
        Tb[D].wa = h;
        function Ub(a, c) {
            a && this.D(a, c)
        }
        Ma(Ub, Tb);
        L = Ub[D];
        ea(L, i);
        L.relatedTarget = i;
        L.offsetX = 0;
        L.offsetY = 0;
        L.clientX = 0;
        L.clientY = 0;
        L.screenX = 0;
        L.screenY = 0;
        L.button = 0;
        L.keyCode = 0;
        L.charCode = 0;
        L.ctrlKey = o;
        L.altKey = o;
        L.shiftKey = o;
        L.metaKey = o;
        L.ta = o;
        L.Y = i;
        var Vb = "mouseover",
        Wb = "mouseout",
        Xb = "keypress";
        L.D = function(a, c) {
            var b = fa(this, a[J]);
            ea(this, a.target || a.srcElement);
            da(this, c);
            var d = a.relatedTarget;
            if (d) {
                if (Ab) try {
                    Qb(d.nodeName)
                } catch(f) {
                    d = i
                }
            } else if (b == Vb) d = a.fromElement;
            else if (b == Wb) d = a.toElement;
            this.relatedTarget = d;
            this.offsetX = a.offsetX !== q ? a.offsetX: a.layerX;
            this.offsetY = a.offsetY !== q ? a.offsetY: a.layerY;
            this.clientX = a.clientX !== q ? a.clientX: a.pageX;
            this.clientY = a.clientY !== q ? a.clientY: a.pageY;
            this.screenX = a.screenX || 0;
            this.screenY = a.screenY || 0;
            this.button = a.button;
            this.keyCode = a[pa] || 0;
            this.charCode = a.charCode || (b == Xb ? a[pa] : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.ta = Fb ? a.metaKey: a.ctrlKey;
            this.state = a.state;
            this.Y = a;
            delete this.wa;
            delete this.N
        };
        L.k = function() {
            Ub.ga.k[I](this);
            this.Y = i;
            ea(this, i);
            da(this, i);
            this.relatedTarget = i
        };
        function W(a, c) {
            this.ca = c;
            this.f = [];
            this.la(a)
        }
        Ma(W, Sb);
        L = W[D];
        L.I = i;
        L.W = i;
        L.A = function(a) {
            this.I = a
        };
        L.s = function() {
            if (this.f[C]) return this.f.pop();
            return this.T()
        };
        L.w = function(a) {
            this.f[C] < this.ca ? this.f[B](a) : this.V(a)
        };
        L.la = function(a) {
            if (a > this.ca) throw p("[goog.structs.SimplePool] Initial cannot be greater than max");
            for (var c = 0; c < a; c++) this.f[B](this.T())
        };
        L.T = function() {
            return this.I ? this.I() : {}
        };
        L.V = function(a) {
            if (this.W) this.W(a);
            else if (Ha(a)) if (Ga(a.C)) a.C();
            else for (var c in a) delete a[c]
        };
        L.k = function() {
            W.ga.k[I](this);
            for (var a = this.f; a[C];) this.V(a.pop());
            delete this.f
        };
        var Yb, Zb, $b = "ScriptEngine" in M;
        Yb = $b && M.ScriptEngine() == "JScript";
        var ac = "0";
        Zb = Yb ? M.ScriptEngineMajorVersion() + ta + M.ScriptEngineMinorVersion() + ta + M.ScriptEngineBuildVersion() : ac;
        var bc = Yb,
        cc = Zb;
        function dc() {}
        var ec = 0;
        L = dc[D];
        L.n = 0;
        L.p = o;
        L.R = o;
        L.D = function(a, c, b, d, f, e) {
            if (Ga(a)) this.ba = h;
            else if (a && a[qa] && Ga(a[qa])) this.ba = o;
            else throw p("Invalid listener argument");
            this.F = a;
            this.ea = c;
            this.src = b;
            fa(this, d);
            this.ja = !!f;
            this.$ = e;
            this.R = o;
            this.n = ++ec;
            this.p = o
        };
        L.handleEvent = function(a) {
            if (this.ba) return this.F[I](this.$ || this.src, a);
            return this.F[qa][I](this.F, a)
        };
        var fc, gc, hc, ic, jc, kc, lc, mc, nc, oc, pc, qc = "5.7"; (function() {
            function a() {
                return {
                    e: 0,
                    o: 0
                }
            }
            function c() {
                return []
            }
            function b() {
                function n(s) {
                    return g[I](n.src, n.n, s)
                }
                return n
            }
            function d() {
                return new dc
            }
            function f() {
                return new Ub
            }
            var e = bc && !(db(cc, qc) >= 0),
            g;
            kc = function(n) {
                g = n
            };
            if (e) {
                fc = function() {
                    return m.s()
                };
                gc = function(n) {
                    m.w(n)
                };
                hc = function() {
                    return k.s()
                };
                ic = function(n) {
                    k.w(n)
                };
                jc = function() {
                    return l.s()
                };
                lc = function() {
                    l.w(b())
                };
                mc = function() {
                    return j.s()
                };
                nc = function(n) {
                    j.w(n)
                };
                oc = function() {
                    return r.s()
                };
                pc = function(n) {
                    r.w(n)
                };
                var m = new W(0, 600);
                m.A(a);
                var k = new W(0, 600);
                k.A(c);
                var l = new W(0, 600);
                l.A(b);
                var j = new W(0, 600);
                j.A(d);
                var r = new W(0, 600);
                r.A(f)
            } else {
                fc = a;
                gc = va;
                hc = c;
                ic = va;
                jc = b;
                lc = va;
                mc = d;
                nc = va;
                oc = f;
                pc = va
            }
        })();
        var X = {},
        Y = {},
        Z = {},
        rc = "on",
        sc = {};
        function tc(a, c, b, d, f) {
            if (c) if (P(c) == N) {
                for (var e = 0; e < c[C]; e++) tc(a, c[e], b, d, f);
                return i
            } else {
                d = !!d;
                var g = Y;
                c in g || (g[c] = fc());
                g = g[c];
                if (! (d in g)) {
                    g[d] = fc();
                    g.e++
                }
                g = g[d];
                var m = a[Q] || (a[Q] = ++Ia),
                k;
                g.o++;
                if (g[m]) {
                    k = g[m];
                    for (e = 0; e < k[C]; e++) {
                        g = k[e];
                        if (g.F == b && g.$ == f) {
                            if (g.p) break;
                            return k[e].n
                        }
                    }
                } else {
                    k = g[m] = hc();
                    g.e++
                }
                e = jc();
                e.src = a;
                g = mc();
                g.D(b, e, a, c, d, f);
                b = g.n;
                e.n = b;
                k[B](g);
                X[b] = g;
                Z[m] || (Z[m] = hc());
                Z[m][B](g);
                if (a.addEventListener) {
                    if (a == M || !a.ma) a.addEventListener(c, e, d)
                } else a.attachEvent(uc(c), e);
                return b
            } else throw p("Invalid event type");
        }
        function vc(a, c, b, d) {
            if (!d.G) if (d.da) {
                for (var f = 0,
                e = 0; f < d[C]; f++) if (d[f].p) {
                    var g = d[f].ea;
                    g.src = i;
                    lc(g);
                    nc(d[f])
                } else {
                    if (f != e) d[e] = d[f];
                    e++
                }
                d.length = e;
                d.da = o;
                if (e == 0) {
                    ic(d);
                    delete Y[a][c][b];
                    Y[a][c].e--;
                    if (Y[a][c].e == 0) {
                        gc(Y[a][c]);
                        delete Y[a][c];
                        Y[a].e--
                    }
                    if (Y[a].e == 0) {
                        gc(Y[a]);
                        delete Y[a]
                    }
                }
            }
        }
        function uc(a) {
            if (a in sc) return sc[a];
            return sc[a] = rc + a
        }
        function wc(a, c, b, d, f) {
            var e = 1;
            c = c[Q] || (c[Q] = ++Ia);
            if (a[c]) {
                a.o--;
                a = a[c];
                if (a.G) a.G++;
                else a.G = 1;
                try {
                    for (var g = a[C], m = 0; m < g; m++) {
                        var k = a[m];
                        if (k && !k.p) e &= xc(k, f) !== o
                    }
                } finally {
                    a.G--;
                    vc(b, d, c, a)
                }
            }
            return Boolean(e)
        }
        function xc(a, c) {
            var b = a[qa](c);
            if (a.R) {
                var d = a.n;
                if (X[d]) {
                    var f = X[d];
                    if (!f.p) {
                        var e = f.src,
                        g = f[J],
                        m = f.ea,
                        k = f.ja;
                        if (e.removeEventListener) {
                            if (e == M || !e.ma) e.removeEventListener(g, m, k)
                        } else e.detachEvent && e.detachEvent(uc(g), m);
                        e = e[Q] || (e[Q] = ++Ia);
                        m = Y[g][k][e];
                        if (Z[e]) {
                            var l = Z[e];
                            hb(l, f);
                            l[C] == 0 && delete Z[e]
                        }
                        f.p = h;
                        m.da = h;
                        vc(g, k, e, m);
                        delete X[d]
                    }
                }
            }
            return b
        }
        var yc = "window.event";
        function zc(a, c) {
            if (!X[a]) return h;
            var b = X[a],
            d = b[J],
            f = Y;
            if (! (d in f)) return h;
            f = f[d];
            var e, g, m;
            if (Rb === q) Rb = V && !M.addEventListener;
            if (m = Rb) {
                e = c || ua(yc);
                m = h in f;
                var k = o in f;
                if (m) {
                    if (e[pa] < 0 || e.returnValue != q) return h;
                    a: {
                        var l = e,
                        j = o;
                        if (l[pa] == 0) try {
                            l.keyCode = -1;
                            break a
                        } catch(r) {
                            j = h
                        }
                        if (j || l.returnValue == q) l.returnValue = h
                    }
                }
                l = oc();
                l.D(e, this);
                e = h;
                try {
                    if (m) {
                        for (var n = hc(), s = l.currentTarget; s; s = s.parentNode) n[B](s);
                        g = f[h];
                        g.o = g.e;
                        for (var v = n[C] - 1; ! l.N && v >= 0 && g.o; v--) {
                            da(l, n[v]);
                            e &= wc(g, n[v], d, h, l)
                        }
                        if (k) {
                            g = f[o];
                            g.o = g.e;
                            for (v = 0; ! l.N && v < n[C] && g.o; v++) {
                                da(l, n[v]);
                                e &= wc(g, n[v], d, o, l)
                            }
                        }
                    } else e = xc(b, l)
                } finally {
                    if (n) {
                        n.length = 0;
                        ic(n)
                    }
                    l.C();
                    pc(l)
                }
                return e
            }
            d = new Ub(c, this);
            try {
                e = xc(b, d)
            } finally {
                d.C()
            }
            return e
        }
        kc(zc);
        var Ac, Bc = !V || Pb("9");
        V && Pb("9");
        function Cc(a) {
            return (a = a.className) && typeof a[F] == O ? a[F](/\s+/) : []
        }
        var Dc = " ";
        function Ec(a) {
            var c = Cc(a),
            b = lb(arguments, 1),
            d;
            d = c;
            b = b;
            for (var f = 0,
            e = 0; e < b[C]; e++) if (! (fb(d, b[e]) >= 0)) {
                d[B](b[e]);
                f++
            }
            d = f == b[C];
            ca(a, c.join(Dc));
            return d
        }
        function Fc(a) {
            var c = Cc(a),
            b = lb(arguments, 1),
            d;
            d = c;
            b = b;
            for (var f = 0,
            e = 0; e < d[C]; e++) if (fb(b, d[e]) >= 0) {
                kb(d, e--, 1);
                f++
            }
            d = f == b[C];
            ca(a, c.join(Dc));
            return d
        };
        var Gc = "style",
        Hc = "class",
        Ic = "for";
        function Jc(a, c) {
            ob(c,
            function(b, d) {
                if (d == Gc) a[H].cssText = b;
                else if (d == Hc) ca(a, b);
                else if (d == Ic) a.htmlFor = b;
                else if (d in Kc) a.setAttribute(Kc[d], b);
                else a[d] = b
            })
        }
        var Kc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            rowspan: "rowSpan",
            valign: "vAlign",
            height: "height",
            width: "width",
            usemap: "useMap",
            frameborder: "frameBorder",
            type: "type"
        };
        function Lc(a, c, b, d) {
            function f(g) {
                if (g) c[A](Fa(g) ? a.createTextNode(g) : g)
            }
            for (d = d; d < b[C]; d++) {
                var e = b[d];
                Da(e) && !(Ha(e) && e.nodeType > 0) ? gb(Mc(e) ? jb(e) : e, f) : f(e)
            }
        }
        function Nc(a, c) {
            a[A](c)
        }
        function Oc(a) {
            for (var c; c = a.firstChild;) a.removeChild(c)
        }
        function Pc(a, c) {
            if (a.contains && c.nodeType == 1) return a == c || a.contains(c);
            if (typeof a.compareDocumentPosition != "undefined") return a == c || Boolean(a.compareDocumentPosition(c) & 16);
            for (; c && a != c;) c = c.parentNode;
            return c == a
        }
        function Mc(a) {
            if (a && typeof a[C] == ya) if (Ha(a)) return typeof a.item == O || typeof a.item == Ea;
            else if (Ga(a)) return typeof a.item == O;
            return o
        }
        function Qc(a) {
            this.J = a || M.document || x
        }
        L = Qc[D];
        var Rc = ' name="',
        Sc = ' type="';
        L.j = function() {
            var a;
            a = this.J;
            var c = arguments,
            b = c[0],
            d = c[1];
            if (!Bc && d && (d[ra] || d[J])) {
                b = [Ta, b];
                d[ra] && b[B](Rc, Wa(d[ra]), Va);
                if (d[J]) {
                    b[B](Sc, Wa(d[J]), Va);
                    var f = {};
                    qb(f, d);
                    d = f;
                    delete d[J]
                }
                b[B](Ua);
                b = b.join(S)
            }
            b = a[oa](b);
            if (d) if (Fa(d)) ca(b, d);
            else P(d) == N ? Ec[K](i, [b].concat(d)) : Jc(b, d);
            c[C] > 2 && Lc(a, b, c, 2);
            return a = b
        };
        L.createElement = function(a) {
            return this.J[oa](a)
        };
        L.createTextNode = function(a) {
            return this.J.createTextNode(a)
        };
        L.appendChild = Nc;
        L.fa = Oc;
        L.contains = Pc;
        function Tc() {
            this.b = {};
            this.r = {};
            this.q = {}
        }
        L = Tc[D];
        var Uc = "row";
        L.Z = function(a) {
            a = a == Uc ? this.b: this.r;
            var c = [],
            b;
            for (b in a) c[B](t(b, 10));
            return c
        };
        L.L = function() {
            return this.Z(Uc)
        };
        var Vc = "column";
        L.oa = function() {
            return this.Z(Vc)
        };
        var Wc = ",";
        L.na = function() {
            var a = [],
            c;
            for (c in this.q) {
                var b = c[F](Wc);
                a[B]({
                    row: t(b[0], 10),
                    column: t(b[1], 10)
                })
            }
            return a
        };
        L.getSelection = function() {
            for (var a = [], c = this.L(), b = this.oa(), d = this.na(), f = 0; f < c[C]; f++) {
                var e = {};
                e.row = c[f];
                a[B](e)
            }
            for (f = 0; f < b[C]; f++) {
                e = {};
                e.column = b[f];
                a[B](e)
            }
            for (f = 0; f < d[C]; f++) {
                e = {};
                e.row = d[f].row;
                e.column = d[f].column;
                a[B](e)
            }
            return a
        };
        L.ka = function(a) {
            return this.b[u(a)] != i
        };
        L.setSelection = function(a) {
            var c = {},
            b = {},
            d = {};
            a || (a = []);
            for (var f = 0; f < a[C]; f++) {
                var e = a[f];
                if (e.row != i && e.column != i) d[u(e.row + Wc + e.column)] = 1;
                else if (e.row != i) c[e.row] = 1;
                else if (e.column != i) b[e.column] = 1
            }
            var g = this.m(c, this.b),
            m = this.m(b, this.r),
            k = this.m(d, this.q);
            a = this.m(this.b, c);
            f = this.m(this.r, b);
            e = this.m(this.q, d);
            this.b = c;
            this.r = b;
            this.q = d;
            c = new Tc;
            c.b = g;
            c.r = m;
            c.q = k;
            b = new Tc;
            b.b = a;
            b.r = f;
            b.q = e;
            return new Xc(c, b)
        };
        L.m = function(a, c) {
            var b = {},
            d;
            for (d in a) c[d] || (b[d] = 1);
            return b
        };
        function Xc(a, c) {
            this.ia = a;
            this.ua = c
        };
        function $(a) {
            this.B = a;
            this.v = {};
            this.g = [];
            this.i = [];
            this.H = {};
            this.U = i;
            this.h = [];
            this.K = Ac || (Ac = new Qc);
            this.b = new Tc
        }
        a: {
            var Yc, Zc = ua("google.loader.GoogleApisBase");
            Zc != i || (Zc = "http://ajax.googleapis.com/ajax");
            var $c = ua("google.visualization.Version");
            $c != i || ($c = "1.0");
            Yc = Zc + "/static/modules/gviz/" + $c;
            // hack google orgchart
            for (var ad = "/stylesheets/google/orgchart.css" || Yc + "/orgchart/orgchart.css",
            bd = x[sa]("LINK"), cd = 0; cd < bd[C]; cd++) if (bd[cd] && bd[cd].href && bd[cd].href == ad) break a;
            var dd = x[oa]("link");
            dd.href = ad;
            dd.rel = "stylesheet";
            fa(dd, "text/css");
            var ed;
            if (x[sa]("head")[C] == 0) {
                var fd = x[sa]("html")[0],
                gd = x[sa]("body")[0],
                hd = x[oa]("head");
                fd.insertBefore(hd, gd)
            }
            ed = x[sa]("head")[0];
            ed[A](dd)
        }
        L = $[D];
        L.M = 0;
        L.draw = function(a, c) {
            this.H = c = c || {};
            this.U = a;
            this.i = [];
            if (!this.B) throw p("Container is not defined");
            if (!a) throw p("Data table is not defined");
            this.aa(a, c)
        };
        var id = "selectedStyle",
        jd = "ready";
        L.aa = function(a, c) {
            this.v = {};
            this.g = [];
            this.h = [];
            var b = [];
            if (a.getNumberOfColumns() >= 2) for (var d = 0; d < a.getNumberOfRows(); d++) {
                var f = {
                    a: d,
                    name: u(a.getValue(d, 0)),
                    l: a.getFormattedValue(d, 0),
                    parent: a.getFormattedValue(d, 1),
                    style: a.getRowProperty(d, Gc),
                    z: a.getRowProperty(d, id)
                };
                if (a.getNumberOfColumns() == 3) f.label = a.getFormattedValue(d, 2);
                b[B](f)
            }
            d = [];
            for (var e, g = 0; g < b[C]; g++) if (e = b[g][ra]) {
                var m = b[g].parent;
                if (f = this.v[e]) {
                    if (f.a == -1) {
                        f.a = b[g].a;
                        f.l = b[g].l;
                        f.label = b[g].label;
                        f.style = b[g][H];
                        f.z = b[g].z
                    }
                } else {
                    this.v[e] = f = {
                        a: b[g].a,
                        name: e,
                        l: b[g].l,
                        label: b[g].label,
                        style: b[g][H],
                        z: b[g].z,
                        c: []
                    };
                    d[B](f)
                }
                if (m) {
                    e = this.v[m];
                    if (!e) {
                        this.v[m] = e = {
                            a: -1,
                            name: m,
                            l: m,
                            c: []
                        };
                        d[B](e)
                    }
                    f.parent = e
                } else f.parent = i;
                if (f.a >= 0) this.h[f.a] = f
            }
            b = 0;
            m = d[C];
            for (var k = this.g[0] = [], l = o; m > 0;) {
                var j = o;
                for (g = 0; g < d[C]; g++) {
                    f = d[g];
                    if (f.u == i) {
                        if (l) {
                            f.parent = i;
                            l = o
                        }
                        e = f.parent;
                        if (!e || e.u != i) {
                            f.u = e ? e.u + 1 : 0;
                            b = z.max(b, f.u);
                            m--;
                            j = h;
                            e = e ? e.c: k;
                            e[B](f)
                        }
                    }
                }
                l = !j
            }
            for (g = 1; g <= b; g++) this.g[g] = [];
            for (g = 0; g < k[C]; g++) this.Q(k[g]);
            this.va(c);
            aa[ma][la][ha](this, jd, {})
        };
        L.Q = function(a) {
            var c = a.a;
            if (!this.t(c)) {
                a = a.c;
                mb(a,
                function(d, f) {
                    return d.a - f.a
                });
                for (c = 0; c < a[C]; c++) {
                    var b = a[c];
                    this.g[b.u][B](b);
                    this.Q(b)
                }
            }
        };
        L.S = function(a) {
            var c = a.c,
            b = c[C];
            if (b == 0) a.x = this.M++;
            else {
                for (var d = 0; d < b; d++) this.S(c[d]);
                a.x = (c[0].x + c[b - 1].x) / 2
            }
        };
        var kd = "large",
        ld = "small",
        md = "medium",
        nd = "table",
        od = "google-visualization-orgchart-table",
        pd = "ltr",
        qd = "center",
        rd = "tbody",
        sd = "tr",
        td = "td",
        ud = "google-visualization-orgchart-space-",
        vd = "google-visualization-orgchart-connrow-",
        wd = "google-visualization-orgchart-noderow-";
        L.va = function(a) {
            var c = this.B;
            this.M = 0;
            for (var b = this.g[0], d = 0; d < b[C]; d++) this.S(b[d]);
            b = a.size;
            if (b != kd && b != ld) b = md;
            var f = this.K,
            e = f.j(nd, {
                "class": od,
                dir: pd,
                cellpadding: ac,
                cellspacing: ac,
                align: qd
            }),
            g = f.j(rd);
            f[A](e, g);
            var m = 8 * this.M - 2,
            k = f.j(sd, i);
            f[A](g, k);
            for (var l = 0; l < m; l++) {
                var j = f.j(td, {
                    "class": ud + b
                });
                f[A](k, j)
            }
            k = this.g[C] - 1;
            for (l = 0; l <= k; l++) {
                var r = this.g[l],
                n,
                s;
                if (l > 0) {
                    n = [];
                    for (var v = 0; v < r[C]; v++) {
                        s = r[v];
                        j = s.parent;
                        d = z[ja](s.x * 8 + 3);
                        if (j.x >= s.x) { (j = n[d]) || (j = n[d] = {});
                            j.borderLeft = h
                        } else { (j = n[--d]) || (j = n[d] = {});
                            j.borderRight = h
                        }
                    }
                    this.O(n, m, g, vd + b, b, a)
                }
                n = [];
                for (v = 0; v < r[C]; v++) {
                    s = r[v];
                    d = z[ja](s.x * 8); (j = n[d]) || (j = n[d] = {});
                    j.d = s;
                    j.span = 6
                }
                this.O(n, m, g, wd + b, b, a);
                if (l != k) {
                    n = [];
                    for (v = 0; v < r[C]; v++) {
                        s = r[v];
                        var Ra = s.c;
                        if (Ra[C] > 0) {
                            d = z[ja](s.x * 8 + 3); (j = n[d]) || (j = n[d] = {});
                            j.borderLeft = h;
                            if (!this.t(s.a)) {
                                j = z[ja](Ra[0].x * 8 + 3);
                                s = z[ja](Ra[Ra[C] - 1].x * 8 + 3);
                                for (d = j; d < s; d++) { (j = n[d]) || (j = n[d] = {});
                                    j.borderBottom = h
                                }
                            }
                        }
                    }
                    this.O(n, m, g, vd + b, b, a)
                }
            }
            f.fa(c);
            f[A](c, e)
        };
        var xd = "google-visualization-orgchart-node",
        yd = " google-visualization-orgchart-node-",
        zd = "mousedown",
        Ad = "dblclick",
        Bd = "google-visualization-orgchart-linenode",
        Cd = " google-visualization-orgchart-lineleft",
        Dd = " google-visualization-orgchart-lineright",
        Ed = " google-visualization-orgchart-linebottom",
        Fd = "\u00a0";
        L.O = function(a, c, b, d, f, e) {
            var g = e.nodeClass || xd,
            m = this.K;
            d = m.j(sd, {
                "class": d
            });
            m[A](b, d);
            for (b = 0; b < c; b++) {
                var k = a[b],
                l = m.j(td, i);
                if (!k) {
                    k = {
                        empty: h
                    };
                    for (var j = b + 1; j < c && !a[j];) j++;
                    k.span = j - b
                }
                if ((j = k.span) && j > 1) {
                    l.colSpan = j;
                    b += j - 1
                }
                j = S;
                if (k.d) {
                    k.d.ha = l;
                    j = g + yd + f;
                    var r = k.d.a;
                    if (r > -1) {
                        tc(l, zd, R(this.qa, this, r));
                        tc(l, Vb, R(this.sa, this, r));
                        tc(l, Wb, R(this.ra, this, r));
                        this.H.allowCollapse && tc(l, Ad, R(this.pa, this, r))
                    }
                } else {
                    j = Bd;
                    if (k.borderLeft) j += Cd;
                    if (k.borderRight) j += Dd;
                    if (k.borderBottom) j += Ed
                }
                if (j) {
                    ca(l, j);
                    if (j[G](g) > -1) {
                        if (e[na]) l[H].background = e[na];
                        j = k.d && k.d[H];
                        this.P(l, j)
                    }
                }
                j = k.d ? k.d.l: Fd;
                k = k.d ? k.d.label: i;
                if (k != i) l.title = k;
                if (e.allowHtml) l.innerHTML = j;
                else m[A](l, m.createTextNode(j));
                m[A](d, l)
            }
        };
        L.getSelection = function() {
            return this.b.getSelection()
        };
        var Gd = "google-visualization-orgchart-nodesel";
        L.setSelection = function(a) {
            var c = this.H;
            a = this.b.setSelection(a);
            var b = this.B;
            if (b) {
                b = c.selectedNodeClass || Gd;
                for (var d = a.ua.L(), f = 0; f < d[C]; f++) {
                    var e = d[f];
                    var g = (e = e >= 0 ? this.h[e] : i) ? e.ha: i;
                    if (g) {
                        Fc(g, b);
                        if (c[na]) g[H].background = c[na];
                        this.P(g, e[H])
                    }
                }
                a = a.ia.L();
                for (f = 0; f < a[C]; f++) {
                    e = a[f];
                    if (g = (e = e >= 0 ? this.h[e] : i) ? e.ha: i) {
                        Ec(g, b);
                        if (c.selectionColor) g[H].background = c.selectionColor;
                        this.P(g, e.z)
                    }
                }
            }
        };
        var Hd = "select";
        L.qa = function(a) {
            a = this.b.ka(a) ? i: [{
                row: a
            }];
            this.setSelection(a);
            aa[ma][la][ha](this, Hd, {})
        };
        var Id = "onmouseover";
        L.sa = function(a) {
            aa[ma][la][ha](this, Id, {
                row: a
            })
        };
        var Jd = "onmouseout";
        L.ra = function(a) {
            aa[ma][la][ha](this, Jd, {
                row: a
            })
        };
        L.pa = function(a) {
            this.collapse(a, !this.t(a))
        };
        L.P = function(a, c) {
            if (c) a[H].cssText = c
        };
        L.xa = function(a, c) {
            var b = this.h[a]; ! b || !b.c || b.c[C] == 0 || (c && !(fb(this.i, a) >= 0) ? this.i[B](a) : hb(this.i, a))
        };
        L.t = function(a) {
            return fb(this.i, a) >= 0
        };
        L.getCollapsedNodes = function() {
            return jb(this.i)
        };
        L.getChildrenIndexes = function(a) {
            a = this.h[a];
            if (!a) return [];
            a = a.c;
            for (var c = [], b = 0; b < a[C]; b++) c[B](a[b].a);
            return c
        };
        var Kd = "collapse";
        L.collapse = function(a, c) {
            var b = this.h[a];
            if (! (!b || !b.c || b.c[C] == 0)) if (c && !this.t(a) || !c && this.t(a)) {
                this.xa(a, c);
                this.K.fa(this.B);
                this.aa(this.U, this.H);
                aa[ma][la][ha](this, Kd, {
                    collapsed: c,
                    a: a
                })
            }
        };
        google_exportSymbol("google.visualization.OrgChart", $);
        y($[D], "draw", $[D].draw);
        y($[D], "getSelection", $[D].getSelection);
        y($[D], "setSelection", $[D].setSelection);
        y($[D], "getChildrenIndexes", $[D].getChildrenIndexes);
        y($[D], "getCollapsedNodes", $[D].getCollapsedNodes);
        y($[D], Kd, $[D].collapse);
        y($[D], "expand", $[D].expand);
    })();
    google.loader.loaded({
        "module": "visualization",
        "version": "1.0",
        "components": ["default", "orgchart"]
    });
    google.loader.eval.visualization = function() {
        eval(arguments[0]);
    };
    if (google.loader.eval.scripts && google.loader.eval.scripts['visualization']) { (function() {
            var scripts = google.loader.eval.scripts['visualization'];
            for (var i = 0; i < scripts.length; i++) {
                google.loader.eval.visualization(scripts[i]);
            }
        })();
        google.loader.eval.scripts['visualization'] = null;
    }
})();