declare var $: any;
// ----------------
var obsolete = (f: any, oldName: string, newName: string) => {
    var wrapper = function () {
        return f.apply(this, arguments)
    }
    wrapper.prototype = f.prototype
    return wrapper
}

var obsoleteOpts = (oldName: string, newName: string) => {
}

namespace Utils {
    declare var _: any
    interface A {
        x: number,
        y: number,
        width: number,
        height: number,
    }
    interface B extends A { }

    export function isIntercepted(a: A, b: B) {
        return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y)
    }
    export var is_intercepted = isIntercepted
    // --------------
    interface node {
        x: any,
        y: any,
        width: any,
    }
    const enum SORT_TYPE {
        ASC = 1,
        DESC = -1,
    }
    export function sort(
        nodes: node[],
        SORT: SORT_TYPE,
        width: number = Math.max.apply(Math, nodes.map((node: node) => (node.x + node.width)))
    ) {
        SORT = SORT != SORT_TYPE.DESC ? SORT_TYPE.ASC : SORT_TYPE.DESC
        return nodes.sort((a, b) => SORT * ((a.x + a.y * width) - ((b.x + b.y * width))))
    }
    // ---------------
    const enum DATA_GRID {
        STYLE_ID = "data-gs-style-id",
    }
    interface S extends HTMLStyleElement {
        styleSheet?: any,
    }
    export function createStylesheet(id: string) {
        var style: S = document.createElement("style")
        style.setAttribute("type", "text/css")
        style.setAttribute(DATA_GRID.STYLE_ID, id)
        if(style.styleSheet) {
            style.styleSheet.cssText = ""
        } else {
            style.appendChild(document.createTextNode(""))
        }
        document.getElementsByTagName("head")[0].appendChild(style)
        return style.sheet
    }
    // ------------------
    export function removeStylesheet(id: string) {
        $("STYLE[" + DATA_GRID.STYLE_ID + "=" + id + "]").remove()
    }
    // ------------------
    export function insertCSSRule(sheet: CSSStyleSheet, selector: string, rules: string, index: number) {
        if(typeof sheet.insertRule === "function") {
            sheet.insertRule(selector + "{" + rules + "}", index)
        } else if(typeof sheet.addRule === "function") {
            sheet.addRule(selector, rules, index)
        }
    }
    // ------------------
    export function toBool(v: any): boolean {
        if(typeof v == "boolean") {
            return v
        }
        if(typeof v == "string") {
            v = v.toLowerCase()
            return !(v === "" || v == "no" || v == "false" || v == "0")
        }
        return Boolean(v)
    }
    // -------------------
    export function _collisionNodeCheck(n: A) {
        return n != this.node && Utils.isIntercepted(n, this.nn);
    }

    export function _didCollide(bn: B) {
        return Utils.isIntercepted({x: this.n.x, y: this.newY, width: this.n.width, height: this.n.height}, bn);
    }

    export function _isAddNodeIntercepted(n: B) {
        return Utils.isIntercepted({x: this.x, y: this.y, width: this.node.width, height: this.node.height}, n);
    }
    // -------------------
    export function parseHeight(val: any): {height: number, unit: string} {
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
        return {height: height, unit: heightUnit};
    }
}