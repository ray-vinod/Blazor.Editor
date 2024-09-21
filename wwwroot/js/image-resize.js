(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.ImageResize = factory());
}(this, (function () {
    'use strict';

    function __$styleInject(css) {
        if (!css) return;

        if (typeof window == 'undefined') return;
        var style = document.createElement('style');
        style.setAttribute('media', 'screen');

        style.innerHTML = css;
        document.head.appendChild(style);
        return css;
    }

    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var template = `
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
`;

    __$styleInject(`
            #editor-resizer {
            position: absolute;
            border: 1px solid #333;
            background-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        /* Bottom-right resizer handle */
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

        /* Top-left resizer handle */
        #editor-resizer .handler-top-left {
            position: absolute;
            left: -5px;
            top: -5px;
            width: 10px;
            height: 10px;
            border: 1px solid #333;
            background-color: rgba(0, 0, 0, 0.5);
            cursor: nwse-resize;
            user-select: none;
        }

        /* Toolbar styling */
        #editor-resizer .toolbar {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 0.5em 0.25em;
            border: 1px solid #333;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.9);
            color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            width: 18em;
        }

        #editor-resizer .toolbar .group {
            display: flex;
            border: 1px solid #bbb;
            border-radius: 6px;
            overflow: hidden;
        }

        /* Button and input group styling with row-gap */
        #editor-resizer .toolbar .group:not(:last-child) {
            margin-bottom: 0.5em;
        }

        #editor-resizer .toolbar .group .btn {
            flex: 1;
            text-align: center;
            padding: 0.2rem 0;
            font-size: 12px;
            text-align: center;
            user-select: none;
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.1);
            position: relative;
            box-sizing: border-box;
            z-index: 1;
            cursor: pointer;
        }

        #editor-resizer .toolbar .group .btn:not(:last-child) {
            border-right: 1px solid #bbb;
            border-radius: 0;
        }

        #editor-resizer .toolbar .group .btn:active {
            background-color: rgba(255, 255, 255, 0.2);
        }

        #editor-resizer .toolbar .group .btn:active {
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* Input wrapper */
        #editor-resizer .toolbar .group .input-wrapper {
            width: 25%;
            border-right: 1px solid #bbb;
            position: relative;
        }

        #editor-resizer .toolbar .group .input-wrapper input {
            color: #fff;
            background-color: rgba(0, 0, 0, 0.3);
            text-align: center;
            width: 100%;
            border: none;
            outline: none;
            padding: 0.25em 0.5em;
        }

        #editor-resizer .toolbar .group .input-wrapper .suffix {
            position: absolute;
            right: 0.5em;
            color: #fff;
        }
    `);

    var I18n = /** @class */ (function () {
        function I18n(config) {
            this.config = __assign(__assign({}, defaultLocale), config);
        }
        I18n.prototype.findLabel = function (key) {
            if (this.config) {
                return Reflect.get(this.config, key);
            }
            return null;
        };
        return I18n;
    }());
    var defaultLocale = {
        floatLeft: "left",
        floatRight: "right",
        center: "center",
        restore: "restore",
        altTip: "Press and hold alt to lock ratio!",
        inputTip: "Press enter key to apply change!",
    };
    //# sourceMappingURL=i18n.js.map

    function format(str) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return str.replace(/\{(\d+)\}/g, function (match, index) {
            if (values.length > index) {
                return values[index];
            }
            else {
                return "";
            }
        });
    }
    //# sourceMappingURL=utils.js.map

    var ResizeElement = /** @class */ (function (_super) {
        __extends(ResizeElement, _super);
        function ResizeElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.originSize = null;
            return _this;
        }
        return ResizeElement;
    }(HTMLElement));

    var ResizePlugin = /** @class */ (function () {
        function ResizePlugin(resizeTarget, container, options) {
            this.resizer = null;
            this.startResizePosition = null;
            this.i18n = new I18n((options === null || options === void 0 ? void 0 : options.locale) || defaultLocale);
            this.options = options;
            this.resizeTarget = resizeTarget;
            if (!resizeTarget.originSize) {
                resizeTarget.originSize = {
                    width: resizeTarget.clientWidth,
                    height: resizeTarget.clientHeight,
                };
            }
            this.container = container;
            this.initResizer();
            this.positionResizerToTarget(resizeTarget);
            this.resizing = this.resizing.bind(this);
            this.endResize = this.endResize.bind(this);
            this.startResize = this.startResize.bind(this);
            this.toolbarClick = this.toolbarClick.bind(this);
            this.toolbarInputChange = this.toolbarInputChange.bind(this);
            this.bindEvents();
        }
        ResizePlugin.prototype.initResizer = function () {
            var resizer = this.container.querySelector("#editor-resizer");
            if (!resizer) {
                resizer = document.createElement("div");
                resizer.setAttribute("id", "editor-resizer");
                resizer.innerHTML = format(template, this.i18n.findLabel("altTip"), this.i18n.findLabel("floatLeft"), this.i18n.findLabel("center"), this.i18n.findLabel("floatRight"), this.i18n.findLabel("restore"), this.i18n.findLabel("inputTip"));

                var topLeftHandler = document.createElement('div');
                topLeftHandler.className = 'handler handler-top-left';
                resizer.appendChild(topLeftHandler);

                this.container.appendChild(resizer);
            }
            this.resizer = resizer;
        };
        ResizePlugin.prototype.positionResizerToTarget = function (el) {
            if (this.resizer !== null) {
                this.resizer.style.setProperty("left", el.offsetLeft + "px");
                this.resizer.style.setProperty("top", el.offsetTop + "px");
                this.resizer.style.setProperty("width", el.clientWidth + "px");
                this.resizer.style.setProperty("height", el.clientHeight + "px");
            }
        };
        ResizePlugin.prototype.bindEvents = function () {
            if (this.resizer !== null) {
                this.resizer.addEventListener("mousedown", this.startResize);
                this.resizer.addEventListener("click", this.toolbarClick);
                this.resizer.addEventListener("change", this.toolbarInputChange);
            }
            window.addEventListener("mouseup", this.endResize);
            window.addEventListener("mousemove", this.resizing);
        };
        ResizePlugin.prototype._setStylesForToolbar = function (type, styles) {
            var _a;
            var storeKey = "_styles_" + type;
            var style = this.resizeTarget.style;
            var originStyles = this.resizeTarget[storeKey];
            style.cssText =
                style.cssText.replaceAll(" ", "").replace(originStyles, "") +
                (";" + styles);
            this.resizeTarget[storeKey] = styles;
            this.positionResizerToTarget(this.resizeTarget);
            (_a = this.options) === null || _a === void 0 ? void 0 : _a.onChange(this.resizeTarget);
        };
        ResizePlugin.prototype.toolbarInputChange = function (e) {
            var _a;
            var target = e.target;
            var type = (_a = target === null || target === void 0 ? void 0 : target.dataset) === null || _a === void 0 ? void 0 : _a.type;
            var value = target.value;
            if (type && Number(value)) {
                this._setStylesForToolbar(type, "width: " + Number(value) + "%;");
            }
        };
        ResizePlugin.prototype.toolbarClick = function (e) {
            var _a, _b;
            var target = e.target;
            var type = (_a = target === null || target === void 0 ? void 0 : target.dataset) === null || _a === void 0 ? void 0 : _a.type;
            if (type && target.classList.contains("btn")) {
                this._setStylesForToolbar(type, (_b = target === null || target === void 0 ? void 0 : target.dataset) === null || _b === void 0 ? void 0 : _b.styles);
            }
        };
        ResizePlugin.prototype.startResize = function (e) {
            var target = e.target;

            if (target.classList.contains("handler") && e.which === 1) {
                this.startResizePosition = {
                    left: e.clientX,
                    top: e.clientY,
                    width: this.resizeTarget.clientWidth,
                    height: this.resizeTarget.clientHeight,
                };

                // Check if top-left or bottom-right handler is clicked
                this.isTopLeft = target.classList.contains('handler-top-left');
            }
        };
        ResizePlugin.prototype.endResize = function () {
            var _a;
            this.startResizePosition = null;
            (_a = this.options) === null || _a === void 0 ? void 0 : _a.onChange(this.resizeTarget);
        };
        ResizePlugin.prototype.resizing = function (e) {
            if (!this.startResizePosition) return;

            var deltaX = e.clientX - this.startResizePosition.left;
            var deltaY = e.clientY - this.startResizePosition.top;
            var width = this.startResizePosition.width;
            var height = this.startResizePosition.height;

            if (this.isTopLeft) {
                width -= deltaX;
                height -= deltaY;
                this.resizeTarget.style.setProperty("left", this.resizeTarget.offsetLeft + deltaX + "px");
                this.resizeTarget.style.setProperty("top", this.resizeTarget.offsetTop + deltaY + "px");
            } else {
                width += deltaX;
                height += deltaY;
            }

            if (e.altKey) {
                var originSize = this.resizeTarget.originSize;
                var rate = originSize.height / originSize.width;
                height = rate * width;
            }

            this.resizeTarget.style.setProperty("width", Math.max(width, 30) + "px");
            this.resizeTarget.style.setProperty("height", Math.max(height, 30) + "px");
            this.positionResizerToTarget(this.resizeTarget);
        };
        ResizePlugin.prototype.destory = function () {
            this.container.removeChild(this.resizer);
            window.removeEventListener("mouseup", this.endResize);
            window.removeEventListener("mousemove", this.resizing);
            this.resizer = null;
        };
        return ResizePlugin;
    }());
    //# sourceMappingURL=ResizePlugin.js.map

    var Iframe = /** @class */ (function () {
        function Iframe(element, cb) {
            this.element = element;
            this.cb = cb;
            this.hasTracked = false;
        }
        return Iframe;
    }());
    var IframeClick = /** @class */ (function () {
        function IframeClick() {
        }
        IframeClick.track = function (element, cb) {
            this.iframes.push(new Iframe(element, cb));
            if (!this.interval) {
                this.interval = setInterval(function () {
                    IframeClick.checkClick();
                }, this.resolution);
            }
        };
        IframeClick.checkClick = function () {
            if (document.activeElement) {
                var activeElement = document.activeElement;
                for (var i in this.iframes) {
                    if (activeElement === this.iframes[i].element) {
                        if (this.iframes[i].hasTracked == false) {
                            this.iframes[i].cb.apply(window, []);
                            this.iframes[i].hasTracked = true;
                        }
                    }
                    else {
                        this.iframes[i].hasTracked = false;
                    }
                }
            }
        };
        IframeClick.resolution = 200;
        IframeClick.iframes = [];
        IframeClick.interval = null;
        return IframeClick;
    }());
    //# sourceMappingURL=IframeClick.js.map

    function ImageResize(quill, options) {
        var container = quill.root;
        var resizeTarge;
        var resizePlugin;
        function triggerTextChange() {
            var Delta = quill.getContents().constructor;
            var delta = new Delta().retain(1);
            quill.updateContents(delta);
        }
        container.addEventListener("click", function (e) {
            var target = e.target;
            if (e.target && ["img", "video"].includes(target.tagName.toLowerCase())) {
                resizeTarge = target;
                resizePlugin = new ResizePlugin(target, container.parentElement, __assign(__assign({}, options), { onChange: triggerTextChange }));
            }
        });

        quill.on("text-change", function (delta, source) {
            // iframe
            container.querySelectorAll("iframe").forEach(function (item) {
                IframeClick.track(item, function () {
                    resizeTarge = item;
                    resizePlugin = new ResizePlugin(item, container.parentElement, __assign(__assign({}, options), { onChange: triggerTextChange }));
                });
            });
        });
        document.addEventListener("mousedown", function (e) {
            var _a, _b, _c;
            var target = e.target;
            if (target !== resizeTarge &&
                !((_b = (_a = resizePlugin === null || resizePlugin === void 0 ? void 0 : resizePlugin.resizer) === null || _a === void 0 ? void 0 : _a.contains) === null || _b === void 0 ? void 0 : _b.call(_a, target))) {
                (_c = resizePlugin === null || resizePlugin === void 0 ? void 0 : resizePlugin.destory) === null || _c === void 0 ? void 0 : _c.call(resizePlugin);
                resizePlugin = null;
                resizeTarge = null;
            }
        }, { capture: true });
    }
    //# sourceMappingURL=main.js.map

    return ImageResize;

})));
