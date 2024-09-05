!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).ImageResize = e() }(this, function () {
    "use strict"; var t = function (e, i) { return (t = Object.setPrototypeOf || ({ __proto__: [] }) instanceof Array && function (t, e) { t.__proto__ = e } || function (t, e) { for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]) })(e, i) }, e = function () { return (e = Object.assign || function t(e) { for (var i, r = 1, o = arguments.length; r < o; r++)for (var n in i = arguments[r]) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]); return e }).apply(this, arguments) }, i = `
    <div class="handler" title="{0}"></div>
    <div class="toolbar">
        <div class="group">
            <a class="btn" data-type="width" data-styles="width:100%">100%</a>
            <a class="btn" data-type="width" data-styles="width:50%">50%</a>
            <span class="input-wrapper"><input data-type="width" maxlength="3"/>
                <span class="suffix">%</span>
                <span class="tooltip">Press enter key to apply change!</span>
            </span>
            <a class="btn" data-type="width" data-styles="width:auto">{4}</a>
        </div>
        <div class="group">
            <a class="btn" data-type="align" data-styles="float:left">{1}</a>
            <a class="btn" data-type="align" data-styles="display:block;margin:auto;">{2}</a>
            <a class="btn" data-type="align" data-styles="float:right;">{3}</a>
            <a class="btn" data-type="align" data-styles="">{4}</a>
        </div>
    </div>
`; !function t(e) { if (e && "undefined" != typeof window) { var i = document.createElement("style"); return i.setAttribute("media", "screen"), i.innerHTML = e, document.head.appendChild(i), e } }(`
    #editor-resizer {
        position: absolute;
        border: 1px solid #333;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    #editor-resizer .handler {
        position: absolute;
        right: -5px;
        bottom: -5px;
        width: 10px;
        height: 10px;
        border: 1px solid #333;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: nwse-resize;
        user-select: none;
    }

    #editor-resizer .toolbar {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1em;
        border: 2px solid #333;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.9);
        color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        width: 22em;
    }

    #editor-resizer .toolbar .group {
        display: flex;
        border: 1px solid #fff;
        border-radius: 6px;
        white-space: nowrap;
        text-align: center;
        line-height: 2;
        color: #ffffff;
        margin-bottom: 0.5em;
    }

    #editor-resizer .toolbar .group .btn {
        flex: 1 0 0;
        text-align: center;
        width: 25%;
        padding: 0 0.5rem;
        display: inline-block;
        vertical-align: top;
        user-select: none;
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.1);
    }

    #editor-resizer .toolbar .group .btn:not(:last-child) {
        border-right: 1px solid #bbb;
    }

    #editor-resizer .toolbar .group .btn:not(.btn-group):active {
        background-color: rgba(255, 255, 255, 0.2);
    }

    #editor-resizer .toolbar .group .input-wrapper {
        width: 25%;
        border: 1px solid #bbb;
        position: relative;
        border-right: 1px solid #bbb;
        min-width: 4em;
    }

    #editor-resizer .toolbar .group .input-wrapper::after {
        content: "";
        position: absolute;
        height: 1px;
        background-color: #fff;
        left: 0.5em;
        right: 1em;
        bottom: 0.2em;
    }

    #editor-resizer .toolbar .group .input-wrapper input {
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        width: 100%;
        border: none;
        outline: none;
        padding: 0 0.5em;
        padding-right: 1.5em;
    }

    #editor-resizer .toolbar .group .input-wrapper .suffix {
        position: absolute;
        right: 0.5em;
        color: #ffffff;
    }

    #editor-resizer .toolbar .group .input-wrapper .tooltip {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        font-size: small;
        background-color: #fff;
        color: #000;
        box-shadow: 0 0 3px #a7a7a7;
        padding: 0 0.6em;
        border-radius: 5px;
        zoom: 0.85;
    }
`); var r, o = function () { function t(t) { this.config = e(e({}, n), t) } return t.prototype.findLabel = function (t) { return this.config ? Reflect.get(this.config, t) : null }, t }(), n = { floatLeft: "left", floatRight: "right", center: "center", restore: "restore", altTip: "Press and hold alt to lock ratio!", inputTip: "Press enter key to apply change!" }; r = HTMLElement, !function e(i, r) { function o() { this.constructor = i } t(i, r), i.prototype = null === r ? Object.create(r) : (o.prototype = r.prototype, new o) }(function t() { var e = null !== r && r.apply(this, arguments) || this; return e.originSize = null, e }, r); var s = function () { function t(t, e, i) { this.resizer = null, this.startResizePosition = null, this.i18n = new o((null == i ? void 0 : i.locale) || n), this.options = i, this.resizeTarget = t, t.originSize || (t.originSize = { width: t.clientWidth, height: t.clientHeight }), this.container = e, this.initResizer(), this.positionResizerToTarget(t), this.resizing = this.resizing.bind(this), this.endResize = this.endResize.bind(this), this.startResize = this.startResize.bind(this), this.toolbarClick = this.toolbarClick.bind(this), this.toolbarInputChange = this.toolbarInputChange.bind(this), this.bindEvents() } return t.prototype.initResizer = function () { var t = this.container.querySelector("#editor-resizer"); t || ((t = document.createElement("div")).setAttribute("id", "editor-resizer"), t.innerHTML = function t(e) { for (var i = [], r = 1; r < arguments.length; r++)i[r - 1] = arguments[r]; return e.replace(/\{(\d+)\}/g, function (t, e) { return i.length > e ? i[e] : "" }) }(i, this.i18n.findLabel("altTip"), this.i18n.findLabel("floatLeft"), this.i18n.findLabel("center"), this.i18n.findLabel("floatRight"), this.i18n.findLabel("restore"), this.i18n.findLabel("inputTip")), this.container.appendChild(t)), this.resizer = t }, t.prototype.positionResizerToTarget = function (t) { null !== this.resizer && (this.resizer.style.setProperty("left", t.offsetLeft + "px"), this.resizer.style.setProperty("top", t.offsetTop + "px"), this.resizer.style.setProperty("width", t.clientWidth + "px"), this.resizer.style.setProperty("height", t.clientHeight + "px")) }, t.prototype.bindEvents = function () { null !== this.resizer && (this.resizer.addEventListener("mousedown", this.startResize), this.resizer.addEventListener("click", this.toolbarClick), this.resizer.addEventListener("change", this.toolbarInputChange)), window.addEventListener("mouseup", this.endResize), window.addEventListener("mousemove", this.resizing) }, t.prototype._setStylesForToolbar = function (t, e) { var i, r = "_styles_" + t, o = this.resizeTarget.style, n = this.resizeTarget[r]; o.cssText = o.cssText.replaceAll(" ", "").replace(n, "") + ";" + e, this.resizeTarget[r] = e, this.positionResizerToTarget(this.resizeTarget), null === (i = this.options) || void 0 === i || i.onChange(this.resizeTarget) }, t.prototype.toolbarInputChange = function (t) { var e, i = t.target, r = null === (e = null == i ? void 0 : i.dataset) || void 0 === e ? void 0 : e.type, o = i.value; r && Number(o) && this._setStylesForToolbar(r, "width: " + Number(o) + "%;") }, t.prototype.toolbarClick = function (t) { var e, i, r = t.target, o = null === (e = null == r ? void 0 : r.dataset) || void 0 === e ? void 0 : e.type; o && r.classList.contains("btn") && this._setStylesForToolbar(o, null === (i = null == r ? void 0 : r.dataset) || void 0 === i ? void 0 : i.styles) }, t.prototype.startResize = function (t) { t.target.classList.contains("handler") && 1 === t.which && (this.startResizePosition = { left: t.clientX, top: t.clientY, width: this.resizeTarget.clientWidth, height: this.resizeTarget.clientHeight }) }, t.prototype.endResize = function () { var t; this.startResizePosition = null, null === (t = this.options) || void 0 === t || t.onChange(this.resizeTarget) }, t.prototype.resizing = function (t) { if (this.startResizePosition) { var e = t.clientX - this.startResizePosition.left, i = t.clientY - this.startResizePosition.top, r = this.startResizePosition.width, o = this.startResizePosition.height; if (r += e, o += i, t.altKey) { var n = this.resizeTarget.originSize; o = n.height / n.width * r } this.resizeTarget.style.setProperty("width", Math.max(r, 30) + "px"), this.resizeTarget.style.setProperty("height", Math.max(o, 30) + "px"), this.positionResizerToTarget(this.resizeTarget) } }, t.prototype.destory = function () { this.container.removeChild(this.resizer), window.removeEventListener("mouseup", this.endResize), window.removeEventListener("mousemove", this.resizing), this.resizer = null }, t }(), a = function t(e, i) { this.element = e, this.cb = i, this.hasTracked = !1 }, l = function () { function t() { } return t.track = function (e, i) { this.iframes.push(new a(e, i)), this.interval || (this.interval = setInterval(function () { t.checkClick() }, this.resolution)) }, t.checkClick = function () { if (document.activeElement) { var t = document.activeElement; for (var e in this.iframes) t === this.iframes[e].element ? !1 == this.iframes[e].hasTracked && (this.iframes[e].cb.apply(window, []), this.iframes[e].hasTracked = !0) : this.iframes[e].hasTracked = !1 } }, t.resolution = 200, t.iframes = [], t.interval = null, t }(); return function t(i, r) { var o, n, a = i.root; function d() { var t = new (i.getContents()).constructor().retain(1); i.updateContents(t) } a.addEventListener("click", function (t) { var i = t.target; t.target && ["img", "video"].includes(i.tagName.toLowerCase()) && (o = i, n = new s(i, a.parentElement, e(e({}, r), { onChange: d }))) }), i.on("text-change", function (t, i) { a.querySelectorAll("iframe").forEach(function (t) { l.track(t, function () { o = t, n = new s(t, a.parentElement, e(e({}, r), { onChange: d })) }) }) }), document.addEventListener("mousedown", function (t) { var e, i, r, s = t.target; s === o || (null === (i = null === (e = null == n ? void 0 : n.resizer) || void 0 === e ? void 0 : e.contains) || void 0 === i ? void 0 : i.call(e, s)) || (null === (r = null == n ? void 0 : n.destory) || void 0 === r || r.call(n), n = null, o = null) }, { capture: !0 }) }
});