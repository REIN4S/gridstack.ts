// ----------------
var obsolete = function (f, oldName, newName) {
    var wrapper = function () {
        return f.apply(this, arguments);
    };
    wrapper.prototype = f.prototype;
    return wrapper;
};
var obsoleteOpts = function (oldName, newName) {
};
var Utils;
(function (Utils) {
    function isIntercepted(a, b) {
        return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
    }
    Utils.isIntercepted = isIntercepted;
    Utils.is_intercepted = isIntercepted;
    function sort(nodes, SORT, width) {
        if (width === void 0) { width = Math.max.apply(Math, nodes.map(function (node) { return (node.x + node.width); })); }
        SORT = SORT != -1 /* DESC */ ? 1 /* ASC */ : -1 /* DESC */;
        return nodes.sort(function (a, b) { return SORT * ((a.x + a.y * width) - ((b.x + b.y * width))); });
    }
    Utils.sort = sort;
    function createStylesheet(id) {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.setAttribute(DATA_GRID.STYLE_ID, id);
        if (style.styleSheet) {
            style.styleSheet.cssText = "";
        }
        else {
            style.appendChild(document.createTextNode(""));
        }
        document.getElementsByTagName("head")[0].appendChild(style);
        return style.sheet;
    }
    Utils.createStylesheet = createStylesheet;
    // ------------------
    function removeStylesheet(id) {
        $("STYLE[" + DATA_GRID.STYLE_ID + "=" + id + "]").remove();
    }
    Utils.removeStylesheet = removeStylesheet;
    // ------------------
    function insertCSSRule(sheet, selector, rules, index) {
        if (typeof sheet.insertRule === "function") {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if (typeof sheet.addRule === "function") {
            sheet.addRule(selector, rules, index);
        }
    }
    Utils.insertCSSRule = insertCSSRule;
    // ------------------
    function toBool(v) {
        if (typeof v == "boolean") {
            return v;
        }
        if (typeof v == "string") {
            v = v.toLowerCase();
            return !(v === "" || v == "no" || v == "false" || v == "0");
        }
        return Boolean(v);
    }
    Utils.toBool = toBool;
    // -------------------
    function _collisionNodeCheck(n) {
        return n != this.node && Utils.isIntercepted(n, this.nn);
    }
    Utils._collisionNodeCheck = _collisionNodeCheck;
    function _didCollide(bn) {
        return Utils.isIntercepted({ x: this.n.x, y: this.newY, width: this.n.width, height: this.n.height }, bn);
    }
    Utils._didCollide = _didCollide;
    function _isAddNodeIntercepted(n) {
        return Utils.isIntercepted({ x: this.x, y: this.y, width: this.node.width, height: this.node.height }, n);
    }
    Utils._isAddNodeIntercepted = _isAddNodeIntercepted;
    // -------------------
    function parseHeight(val) {
        var height = val;
        var heightUnit = 'px';
        if (height && _.isString(height)) {
            var match = height.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw)?$/);
            if (!match) {
                throw new Error('Invalid height');
            }
            heightUnit = match[2] || 'px';
            height = parseFloat(match[1]);
        }
        return { height: height, unit: heightUnit };
    }
    Utils.parseHeight = parseHeight;
})(Utils || (Utils = {}));
