/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/css/build/index.css":
/*!************************************!*\
  !*** ./static/css/build/index.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./static/js/DOMevents/clickEvent.js":
/*!*******************************************!*\
  !*** ./static/js/DOMevents/clickEvent.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickEvent": () => /* binding */ clickEvent
/* harmony export */ });
const clickEvent = () => {
    document.addEventListener("click", e => {
        if (e.button !== 2) {
            let elements = document.querySelectorAll('.cm');
            elements.forEach(function (el) {
                el.classList.remove('cm_active');
            });
        }
    }, false);
};
//# sourceMappingURL=clickEvent.js.map

/***/ }),

/***/ "./static/js/DOMevents/index.js":
/*!**************************************!*\
  !*** ./static/js/DOMevents/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initDomEvents": () => /* binding */ initDomEvents
/* harmony export */ });
/* harmony import */ var _clickEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clickEvent.js */ "./static/js/DOMevents/clickEvent.js");

function initDomEvents() {
    (0,_clickEvent_js__WEBPACK_IMPORTED_MODULE_0__.clickEvent)();
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/component/Component.js":
/*!******************************************!*\
  !*** ./static/js/component/Component.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _EventBus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventBus.js */ "./static/js/component/EventBus.js");
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser.js */ "./static/js/component/parser.js");
/* harmony import */ var _VirtDom_VirtDOM_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VirtDom/VirtDOM.js */ "./static/js/component/VirtDom/VirtDOM.js");
/* harmony import */ var _router_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../router/events.js */ "./static/js/router/events.js");




var EVENTS;
(function (EVENTS) {
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["FLOW_CWU"] = "flow:component-will-update";
    EVENTS["FLOW_CWM"] = "flow:component-will-mount";
    EVENTS["FLOW_EXECUTE"] = "flow:execute";
    EVENTS["FLOW_COMPILE"] = "flow:compile";
    EVENTS["FLOW_RENDER"] = "flow:render";
})(EVENTS || (EVENTS = {}));
class Component {
    constructor(props = {}) {
        this._root = null;
        this._virtDOM = null;
        this._props = null;
        this._rootOut = null;
        this._parsedTemplate = null;
        this._deleteMark = false;
        this._isNew = true;
        this._componentDidMountExecuted = false;
        this.state = {};
        this._root = null;
        const eventBus = new _EventBus_js__WEBPACK_IMPORTED_MODULE_0__.default();
        this._props = props;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
    }
    get rootOut() { return this._rootOut; }
    get deleteMark() { return this._deleteMark; }
    set deleteMark(value) { this._deleteMark = value; }
    get parsedTemplate() { return this._parsedTemplate; }
    set parsedTemplate(value) { this._parsedTemplate = value; }
    get virtDOM() { return this._virtDOM; }
    getProps() { return this._props; }
    setProps(props) { this._props = props; }
    components() { return {}; }
    template() { return ''; }
    _registerEvents(eventBus) {
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_CWU, this._componentWillUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
        eventBus.on(EVENTS.FLOW_EXECUTE, this._execute.bind(this));
        eventBus.on(EVENTS.FLOW_COMPILE, this._compile.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init(root) {
        this._root = root;
        if (this._isNew)
            this.eventBus().emit(EVENTS.FLOW_CWM, this.getProps(), this.state);
        this.eventBus().emit(EVENTS.FLOW_EXECUTE);
        if (this._isNew)
            this.eventBus().emit(EVENTS.FLOW_CDM, this.getProps(), this.state);
        this._isNew = false;
    }
    _componentDidMount(props = null, state = null) { this.componentDidMount(props, state); }
    componentDidMount(props = null, state = null) { }
    _componentDidUpdate(oldProps = null, newProps = null) { this.componentDidUpdate(oldProps, newProps); }
    componentDidUpdate(oldProps = null, newProps = null) { }
    _componentWillUpdate(props = null, state = null) { this.componentWillUpdate(props, state); }
    componentWillUpdate(props = null, state = null) { }
    _componentWillMount(props = null, state = null) { this.componentWillMount(props, state); }
    componentWillMount(props = null, state = null) { }
    _execute(modifyState = {}) {
        this.execute(modifyState);
        this.eventBus().emit(EVENTS.FLOW_COMPILE, modifyState);
    }
    execute(modifyState = {}) {
    }
    _compile(modifyState = {}) {
        this.compile(modifyState);
        this.eventBus().emit(EVENTS.FLOW_RENDER, modifyState);
    }
    compile(modifyState = {}) {
        Object.assign(this.state, modifyState);
        let parsedTemplate = this.parsedTemplate;
        if (!parsedTemplate) {
            parsedTemplate = (0,_parser_js__WEBPACK_IMPORTED_MODULE_1__.parser)(this.template());
            this.parsedTemplate = parsedTemplate;
        }
        const components = this.components();
        const props = this.getProps();
        this._virtDOM = !this._virtDOM ? new _VirtDom_VirtDOM_js__WEBPACK_IMPORTED_MODULE_2__.VirtDom() : this._virtDOM;
        this._virtDOM.compile(parsedTemplate, this.state, props, this.deleteMark);
        this._virtDOM.getIsComponent().forEach(node => {
            if (node.componentLink) {
                node.componentLink.setProps(node.props);
            }
            else {
                node.componentLink = new components[node.tagName](node.props);
            }
            node.componentLink.deleteMark = node.deleteMark;
        });
    }
    _render() {
        this.render();
    }
    render() {
        const nodes = this._virtDOM.getNodes();
        nodes.forEach(node => {
            const root = node.parent && node.parent.root ? node.parent.root : this._root;
            if (node.isComponent) {
                node.componentLink.init(root);
                node.root = node.componentLink.rootOut;
            }
            else {
                if (node.element) {
                    if (node.deleteMark) {
                        node.element.remove();
                        node.element = null;
                    }
                }
                else {
                    if (node.deleteMark) {
                        return;
                    }
                    node.element = document.createElement(node.tagName);
                }
                const element = node.element;
                node.changedProps.forEach(prop => {
                    if (prop === 'classes') {
                        node.props.classes.forEach(nodeClass => {
                            element.classList.add(nodeClass);
                        });
                    }
                    else if (typeof node.props[prop] === "function") {
                        if (prop.startsWith('on')) {
                            element.addEventListener(prop.slice(2).toLowerCase(), node.props[prop]);
                        }
                        else {
                            element.setAttribute(prop, node.props[prop]);
                        }
                    }
                    else if ((prop === 'href')) {
                        if (!node.props[prop]) {
                            return;
                        }
                        if (node.props[prop].startsWith('#{R}')) {
                            element.addEventListener('click', _router_events_js__WEBPACK_IMPORTED_MODULE_3__.onRouteClick);
                        }
                        element.setAttribute(prop, node.props[prop]);
                    }
                    else {
                        if (node.props[prop] === '#noValue') {
                        }
                        else {
                            element.setAttribute(prop, node.props[prop]);
                        }
                    }
                });
                node.changedProps = [];
                if (node.textContentIsChanged) {
                    element.textContent = node.textContent;
                    node.textContentIsChanged = false;
                }
                if (node.isNew) {
                    root.appendChild(element);
                    this._rootOut = element;
                    node.root = element;
                    element.setAttribute('uid', String(node.uid));
                }
            }
            node.isNew = false;
        });
    }
    setState(modifyState) {
        var _a;
        const oldProps = window.copyObj(this.getProps());
        this.eventBus().emit(EVENTS.FLOW_CWU, this.getProps(), this.state);
        this.eventBus().emit(EVENTS.FLOW_EXECUTE, modifyState);
        this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, this.getProps());
        if (modifyState) {
            (_a = this.virtDOM) === null || _a === void 0 ? void 0 : _a.deleteMarkedNodes();
        }
        window.createValidateEvents();
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);
//# sourceMappingURL=Component.js.map

/***/ }),

/***/ "./static/js/component/EventBus.js":
/*!*****************************************!*\
  !*** ./static/js/component/EventBus.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class EventBus {
    constructor() {
        this.listeners = {};
    }
    // constructor() {
    //   this.listeners = {}
    // }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = Array();
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventBus);
//# sourceMappingURL=EventBus.js.map

/***/ }),

/***/ "./static/js/component/VirtDom/Node.js":
/*!*********************************************!*\
  !*** ./static/js/component/VirtDom/Node.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => /* binding */ Node
/* harmony export */ });
const _REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
class Node {
    constructor() {
        this._isNew = true;
        this._changedProps = [];
        this._deleteMark = false;
        this.uid = 0;
        this.key = '';
        this.textContent = '';
        this.textContentIsChanged = false;
        this.level = 0;
        this.parent = null;
        this.header = '';
        this.tagName = '';
        this.isComponent = false;
        this.props = {};
        this.componentLink = null;
        this.root = null;
        this.element = null;
    }
    get isNew() { return this._isNew; }
    set isNew(value) { this._isNew = value; }
    get changedProps() { return this._changedProps; }
    set changedProps(value) { this._changedProps = value; }
    get deleteMark() { return this._deleteMark; }
    set deleteMark(value) { this._deleteMark = value; }
    setContentProps(context, template) {
        const oldTextConent = this.textContent;
        let { content } = template.record;
        if (!content) {
            this.textContent = content;
            this.textContentIsChanged = false;
        }
        window.regexpMatchAll(content, _REGEXP_PARAM).forEach(function (param) {
            if (param[1]) {
                content = content.replace(param[0], window.get(context, param[1], ''));
            }
        });
        this.textContent = content;
        this.textContentIsChanged = oldTextConent !== content;
    }
    setChangedProps(newProps, oldProps = null) {
        const res = [];
        if (oldProps) {
            for (const key in newProps) {
                if (!window.isEqual(oldProps[key], newProps[key])) {
                    res.push(key);
                }
            }
        }
        else {
            for (const key in newProps) {
                res.push(key);
            }
        }
        this.changedProps = res;
    }
    setSignComponent() {
        this.isComponent = window.startsWithUpper(this.tagName);
    }
    setLevel() {
        let level = window.get(this, 'owner.level', -1);
        level++;
        this.level;
    }
}

//# sourceMappingURL=Node.js.map

/***/ }),

/***/ "./static/js/component/VirtDom/VirtDOM.js":
/*!************************************************!*\
  !*** ./static/js/component/VirtDom/VirtDOM.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VirtDom": () => /* binding */ VirtDom
/* harmony export */ });
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parser.js */ "./static/js/component/parser.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node.js */ "./static/js/component/VirtDom/Node.js");


class VirtDom {
    constructor() {
        this._nodes = Array();
        this._parent = this._func_parent();
        this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
        this._deleteMark = false;
    }
    get deleteMark() { return this._deleteMark; }
    set deleteMark(value) { this._deleteMark = value; }
    compile(parsedTemplate, state, props, _deleteMark) {
        this.deleteMark = _deleteMark;
        this._setNodesDeleteMark();
        this._compileTemplate(parsedTemplate, state, props);
    }
    _compileTemplate(parsedTemplate, state, props) {
        const context = { state, props };
        const template = { list: parsedTemplate, record: null, i: 0 };
        for (template.i = 0; template.i < template.list.length; template.i++) {
            template.record = template.list[template.i];
            if (template.record.type === _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.CODE) {
                this._compileCode(context, template);
            }
            else {
                this._compileItem(context, template);
            }
        }
    }
    _compileItem(context, template) {
        switch (template.record.type) {
            case _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.END:
                this._closeTag();
                break;
            case _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.TEXT:
                this._compileItem_process(context, template);
                break;
            case _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.BEGIN:
                this._compileItem_process(context, template);
                break;
            default:
                throw new Error(`Tree: error initializing the tree for: ${template.record.type} ${template.record.content}`);
        }
    }
    _compileItem_process(context, template) {
        const { record } = template;
        if (record.type === _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.BEGIN) {
            const tagName = this._getTagName(record.content);
            const newProps = this._getHeaderProps(context, template, tagName);
            let node = this.getNodeByUidKey(record.uid, newProps.key);
            if (node) {
                node.setChangedProps(newProps, node.props);
                node.tagName = tagName;
                node.props = newProps;
                node.deleteMark = this.deleteMark || record.deleteMark;
            }
            else {
                if (this.deleteMark || record.deleteMark) {
                    return;
                }
                node = new _Node_js__WEBPACK_IMPORTED_MODULE_1__.Node();
                this._nodes.push(node);
                node.tagName = tagName;
                node.props = newProps;
                node.header = record.content;
                node.uid = record.uid;
                node.key = newProps.key ? newProps.key : '';
                node.setLevel();
                node.setSignComponent();
                node.setChangedProps(node.props);
            }
            node.parent = this._parent('add', node);
        }
        else if (record.type === _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.TEXT) {
            let owner = this._parent('', null);
            if (owner && !owner.isComponent) {
                owner.setContentProps(context, template);
            }
        }
    }
    _compileCode(context, template) {
        this._compileCode__cycle_for(context, template);
        this._compileCode__if(context, template);
    }
    _compileCode__cycle_for(context, template) {
        let code = template.record.content.slice(2, template.record.content.indexOf('%}')).trim();
        if (!code.startsWith('for'))
            return;
        const codeHead = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(';');
        const begin = codeHead[0].trim().split(' ').filter((item) => item);
        const iName = begin[1];
        context[iName] = Number(begin[3]);
        const condition = codeHead[1].trim().split(' ').filter((item) => item);
        const sign = condition[1];
        const right = window.get(context, condition[2], 0);
        let step = codeHead[2].trim().replace(begin[1], '');
        const codeTail = code.substring(code.indexOf('{') + 1).trim().split(';').filter((item) => item).map((item) => item.trim());
        const vars = [];
        codeTail.forEach(function (item) {
            if (item.startsWith('let') || item.startsWith('const')) {
                vars.push(item.substring(item.indexOf(' ')).replace(/ /ig, '').split('='));
            }
        });
        if (!this._compare(context[iName], sign, right)) {
            while (!this._code__isCloseBracket(template) && template.i < template.list.length) {
                template.i++;
                template.record = template.list[template.i];
            }
            template.i++;
            template.record = template.list[template.i];
            this._compileItem(context, template);
            return;
        }
        const iStart = template.i;
        for (context[iName]; this._compare(context[iName], sign, right); context[iName] = context[iName] + this._inc(step)) {
            vars.forEach(function (variable) {
                const param_i = /\[(.)\]/gm.exec(variable[1]);
                context[variable[0]] = window.get(context, variable[1].substring(0, param_i === null || param_i === void 0 ? void 0 : param_i.index))[context[param_i[1]]];
            });
            template.i = iStart;
            template.i++;
            let key = null;
            for (template.i; template.i < template.list.length; template.i++) {
                const record = Object.assign({}, template.list[template.i]);
                template.record = record;
                if (record.type === _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.CODE) {
                    if (this._code__isCloseBracket(template)) {
                        template.i++;
                        template.record = Object.assign({}, template.list[template.i]);
                        break;
                    }
                    this._compileCode(context, template);
                }
                window.regexpMatchAll(record.content, this._REGEXP_PARAM).forEach(function (param) {
                    vars.forEach(function (variable) {
                        if (param[1] && param[1].startsWith(variable[0])) {
                            context.state[variable[0]] = context[variable[0]];
                            record.content = record.content.replace(param[0], '{{state.' + param[1] + '}}');
                        }
                    });
                });
                // key \\
                if (record.type === _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.BEGIN) {
                    const keyIndex = record.content.indexOf('key');
                    if (keyIndex > 0) {
                        const paramKey = new RegExp(this._REGEXP_PARAM).exec(record.content.substring(keyIndex));
                        key = window.get(context, paramKey[1], paramKey[1]);
                        record.content = record.content.replace(new RegExp(paramKey[0], 'g'), key);
                    }
                    else {
                        record.content += ' key=' + key;
                    }
                }
                // key //
                this._compileItem(context, template);
            }
        }
    }
    _compileCode__if(context, template) {
        let code = template.record.content.slice(2, template.record.content.indexOf('%}')).trim();
        if (!code.startsWith('if'))
            return;
        const isElse = () => {
            return template.record.content.replace(/ /ig, '') === '{%}else{%}';
        };
        // ifParam
        let ifParam = true;
        const ifParamCode = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(' ').filter((item) => item);
        const ifParamL = this._code__calculateValue(context, ifParamCode[0]);
        if (ifParamCode[2]) {
            const ifParamR = this._code__calculateValue(context, ifParamCode[2]);
            ifParam = this._compare(ifParamL, ifParamCode[1], ifParamR);
        }
        else {
            ifParam = ifParamL;
        }
        template.i++;
        for (template.i; template.i < template.list.length; template.i++) {
            const record = template.list[template.i];
            template.record = record;
            if (record.type === _parser_js__WEBPACK_IMPORTED_MODULE_0__.PARSER_TYPES.CODE) {
                if (isElse()) {
                    ifParam = !ifParam;
                    continue;
                }
                else if (this._code__isCloseBracket(template)) {
                    break;
                }
                else {
                    if (ifParam) {
                        this._compileCode(context, template);
                    }
                    else {
                        while (!this._code__isCloseBracket(template) && template.i < template.list.length) {
                            template.i++;
                            template.record = template.list[template.i];
                        }
                        continue;
                    }
                }
            }
            record.deleteMark = !ifParam;
            if (ifParam) {
                this._compileItem(context, template);
            }
        }
    }
    _code__isCloseBracket(template) {
        return template.record.content.replace(/ /ig, '') === '{%}%}';
    }
    _code__calculateValue(context, code) {
        if (code === 'null') {
            return null;
        }
        let value;
        const rg = new RegExp(this._REGEXP_PARAM).exec(code);
        if (rg) {
            value = window.get(context, rg[1], rg[1]);
        }
        else {
            value = code;
        }
        if (value) {
            window.regexpMatchAll(value, /[\'\"](.*?)[\'\"]/gi).forEach((rg) => {
                value = rg[1];
            });
        }
        return value;
    }
    _getHeaderProps(context, template, tagName) {
        let { content } = template.record;
        const node_props = {};
        const cacheTxt = {};
        let count = 1;
        window.regexpMatchAll(content, /[\'\"](.*?)[\'\"]/gi).forEach(function (txt) {
            if (txt[0]) {
                cacheTxt[`text${count}`] = txt[0];
                content = content.replace(txt[0], `text${count}`);
                count++;
            }
        });
        content.split(' ').forEach((keyValue) => {
            if (!keyValue || keyValue === tagName) {
                return;
            }
            const arrKeyValue = keyValue.split('=');
            if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
                arrKeyValue[1] = cacheTxt[arrKeyValue[1]];
            }
            const param = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1]);
            if (arrKeyValue[0] === 'className') {
                const strClasses = param ? window.get(context, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '').trim();
                if (strClasses) {
                    node_props.classes = strClasses.split(' ');
                }
            }
            else if (arrKeyValue.length === 1) {
                node_props[arrKeyValue[0]] = '#noValue';
            }
            else if (param) {
                node_props[arrKeyValue[0]] = window.get(context, param[1], param[1]);
            }
            else {
                node_props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '');
            }
        });
        return node_props;
    }
    _compare(left, sign, right) {
        switch (sign) {
            case '<': return left < right;
            case '<=': return left <= right;
            case '>': return left > right;
            case '>=': return left >= right;
            case '===': return left === right;
            case '!==': return left !== right;
            default:
                throw new Error(`Compare error`);
        }
    }
    _inc(step) {
        switch (step) {
            case '++': return 1;
            case '--': return -1;
            default:
                throw new Error(`Step error`);
        }
    }
    _closeTag() {
        this._parent('remove', null);
    }
    _func_parent() {
        const parentsStack = Array();
        return function (command = '', node = null) {
            let res = null;
            if (command === 'remove') {
                parentsStack.pop();
            }
            else if (parentsStack.length > 0) {
                res = parentsStack[parentsStack.length - 1];
            }
            if (command === 'add') {
                parentsStack.push(node);
            }
            return res;
        };
    }
    _setNodesDeleteMark() {
        this._nodes.forEach(function (node) {
            node.deleteMark = true;
        });
    }
    _getTagName(str) {
        const begin = 0;
        const end = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ');
        return str.slice(begin, end);
    }
    getIsComponent() {
        return this._nodes.filter(node => node.isComponent === true);
    }
    getNodes() {
        return this._nodes;
    }
    getNodeByUidKey(uid, key) {
        for (let i = 0; i < this._nodes.length; i++) {
            let node = this._nodes[i];
            if ((!key && node.uid === uid) || (key && node.key === key && node.uid === uid)) {
                return node;
                break;
            }
        }
        return null;
    }
    deleteMarkedNodes() {
        this._nodes.forEach((node) => {
            var _a;
            if (node.isComponent && node.componentLink) {
                (_a = node.componentLink.virtDOM) === null || _a === void 0 ? void 0 : _a.deleteMarkedNodes();
            }
            this._nodes = this._nodes.filter((node) => !node.deleteMark);
        });
    }
    printNodes() {
        console.log('////////////////////////////////////////////////');
        this._nodes.forEach(function (node) {
            console.log(node.deleteMark, node);
        });
    }
}

//# sourceMappingURL=VirtDOM.js.map

/***/ }),

/***/ "./static/js/component/parser.js":
/*!***************************************!*\
  !*** ./static/js/component/parser.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parser": () => /* binding */ parser,
/* harmony export */   "PARSER_TYPES": () => /* binding */ PARSER_TYPES
/* harmony export */ });
var PARSER_TYPES;
(function (PARSER_TYPES) {
    PARSER_TYPES[PARSER_TYPES["BEGIN"] = 0] = "BEGIN";
    PARSER_TYPES[PARSER_TYPES["END"] = 1] = "END";
    PARSER_TYPES[PARSER_TYPES["TEXT"] = 2] = "TEXT";
    PARSER_TYPES[PARSER_TYPES["CODE"] = 3] = "CODE";
})(PARSER_TYPES || (PARSER_TYPES = {}));
function parser(str) {
    return parserNoREGEXP(str);
}
function parserNoREGEXP(str) {
    const res = Array();
    str = str.replace(/{%/g, '<{%');
    str = str.replace(/%}/g, '%}>');
    const addItem = (type, content) => {
        const uid = type === PARSER_TYPES.BEGIN ? window.uid() : 0;
        res.push({ type, content, uid: uid, deleteMark: false });
    };
    str = str.split(/\n/g).reduce(function (result, current) {
        const currentClean = current.replace(/\s/g, '');
        if (currentClean.startsWith('//')) {
            return result;
        }
        return result + '\n' + current;
    }, '').trim();
    while (str) {
        const beginTagPos = str.indexOf('<');
        let endTagPos = str.indexOf('>');
        const isCode = str.startsWith('<{%');
        endTagPos = isCode ? str.indexOf('%}>') + 2 : endTagPos;
        let tagContent = str.slice(beginTagPos + 1, endTagPos).trim().replace(/[\r\n]+/g, '');
        const isEndTag = tagContent.startsWith('/');
        if (isCode) {
            addItem(PARSER_TYPES.CODE, tagContent);
        }
        else {
            addItem(isEndTag ? PARSER_TYPES.END : PARSER_TYPES.BEGIN, isEndTag ? tagContent.slice(1) : tagContent);
        }
        str = str.slice(endTagPos + 1).trim();
        if (str.indexOf('<') >= 0) {
            const content = str.substring(0, str.indexOf('<'));
            if (content) {
                addItem(PARSER_TYPES.TEXT, content);
            }
            str = str.slice(str.indexOf('<')).trim();
        }
    }
    return res;
}

//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./static/js/components/UI/MW/MW/MW.js":
/*!*********************************************!*\
  !*** ./static/js/components/UI/MW/MW/MW.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class MW extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super(...arguments);
        this.onClose = ((e) => {
            e.preventDefault();
            e.stopPropagation();
            //document.getElementsByTagName('html')[0].classList.remove('ov-fl_hide')
            const props = this.getProps();
            if (!props.callback) {
                console.error('ModalWindow: callback function is undefined!');
                return;
            }
            props.callback();
        });
        this.onClick = ((e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        });
        this.state = {
            onClose: this.onClose,
            onClick: this.onClick
        };
    }
    template() {
        return (`<div id='MW' className='MW' onClick={{state.onClick}}>
        <div className='MW-dialog'>
          <div className='MW-content'>
            <div className='MW-header'>
              <h4 className='MW-title'>{{props.title}}</h4>
              <p className='MW_btn-close' onClick={{state.onClose}}>×</p>
            </div>
            <div className='MW-body'>    
           
            </div>
          </div>
        </div>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MW);
//# sourceMappingURL=MW.js.map

/***/ }),

/***/ "./static/js/components/UI/MW/MW__add-chat/MW__add-chat/MW__add-chat.js":
/*!******************************************************************************!*\
  !*** ./static/js/components/UI/MW/MW__add-chat/MW__add-chat/MW__add-chat.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_UI_buttons_button_secondary_button_secondary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/UI/buttons/button-secondary/button-secondary.js */ "./static/js/components/UI/buttons/button-secondary/button-secondary.js");
/* harmony import */ var _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/UI/inputs/input-gray5/input-gray5.js */ "./static/js/components/UI/inputs/input-gray5/input-gray5.js");
/* harmony import */ var _components_UI_MW_MW_MW_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/UI/MW/MW/MW.js */ "./static/js/components/UI/MW/MW/MW.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import



//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class MW__AddChat extends _component_Component_js__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor() {
        super(...arguments);
        this.button_addChatOnClick = (e) => __awaiter(this, void 0, void 0, function* () {
            this.getProps().callback({ title: document.getElementById('chat-title').value });
        });
        this.onClose = () => {
            this.getProps().callback();
        };
        this.state = {
            onClose: this.onClose,
            button_addChatOnClick: this.button_addChatOnClick
        };
    }
    //#Components
components() {return {MW: _components_UI_MW_MW_MW_js__WEBPACK_IMPORTED_MODULE_2__.default,InputGray5: _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_1__.default,ButtonSecondary: _components_UI_buttons_button_secondary_button_secondary_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`{% if({{props.showAddChat}}) { %}
        <MW title='Add chat' callback={{state.onClose}}>
          <InputGray5 id='chat-title' title='Title'></InputGray5>
          <div className='add-chat_buttons'> 
            <ButtonSecondary text='Add' id='button_add-chat' onClick={{state.button_addChatOnClick}}></ButtonSecondary>
          </div>  
        </MW>
      {% } %}`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MW__AddChat);
//# sourceMappingURL=MW__add-chat.js.map

/***/ }),

/***/ "./static/js/components/UI/MW/MW__search-user/MW__search-user/MW__search-user.js":
/*!***************************************************************************************!*\
  !*** ./static/js/components/UI/MW/MW__search-user/MW__search-user/MW__search-user.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_UI_MW_MW_search_user_search_user_item_search_user_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/UI/MW/MW__search-user/search-user__item/search-user__item.js */ "./static/js/components/UI/MW/MW__search-user/search-user__item/search-user__item.js");
/* harmony import */ var _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/UI/inputs/input-gray5/input-gray5.js */ "./static/js/components/UI/inputs/input-gray5/input-gray5.js");
/* harmony import */ var _components_UI_MW_MW_MW_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/UI/MW/MW/MW.js */ "./static/js/components/UI/MW/MW/MW.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
//#Import



//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class MW__SearchUser extends _component_Component_js__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor() {
        super(...arguments);
        this.search_onChange = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            e.stopPropagation();
            //console.log('search_onChange')
            //this.setState({users: this.getUsers((e.target as HTMLInputElement).value)))
            yield this.getUsers(e.target.value);
        });
        this.search_onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        this.onClose = () => {
            this.state.users = [];
            this.getProps().callback();
        };
        this.item_callback = (id) => {
            let chat = null;
            for (let i = 0; i < this.state.users.length; i++) {
                if (String(this.state.users[i].id) === id) {
                    chat = this.state.users[i];
                    break;
                }
            }
            this.state.users = [];
            this.getProps().callback(chat);
        };
        this.state = {
            users: [],
            onClose: this.onClose,
            item_callback: this.item_callback,
            search_onChange: this.search_onChange
        };
    }
    getUsers(searchString = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchString === '') {
                this.state.users = [];
                this.setState({ users: [] });
                return;
            }
            const req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_4__.xhrPostUsersSearh)(searchString);
            if (!req) {
                return;
            }
            if (req.response.status >= 400) {
                (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_4__.xhrOnError)();
            }
            this.setState({ users: req.response });
        });
    }
    //#Components
components() {return {MW: _components_UI_MW_MW_MW_js__WEBPACK_IMPORTED_MODULE_2__.default,InputGray5: _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_1__.default,SearchUser__Item: _components_UI_MW_MW_search_user_search_user_item_search_user_item_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`{% if({{props.showSearchUsers}}) { %}
        <MW title='Search users' callback={{state.onClose}}>

          <InputGray5 onChange={{state.search_onChange}} id='input_search-users' ></InputGray5>
          
          <div className='MW__list'>
            <ul className='users-list__list'>
            
              {% for (let i = 0; i < state.users.length; i++) { const chat = state.users[i]; %}
                <SearchUser__Item 
                  id={{chat.id}} 
                  key={{chat.id}}
                  avatar={{chat.avatar}} 
                  login={{chat.login}}
                  callback={{state.item_callback}}
                ></SearchUser__Item>
              {% } %}
            
            </ul>
          </div> 
        </MW>
      {% } %}`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MW__SearchUser);
//# sourceMappingURL=MW__search-user.js.map

/***/ }),

/***/ "./static/js/components/UI/MW/MW__search-user/search-user__item/search-user__item.js":
/*!*******************************************************************************************!*\
  !*** ./static/js/components/UI/MW/MW__search-user/search-user__item/search-user__item.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_img_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/img/avatar/avatar.js */ "./static/js/components/img/avatar/avatar.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class SearchUser__Item extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super(...arguments);
        this.li_onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let arrli = e.path.filter((el) => el.nodeName === 'LI');
            if (arrli.length === 0) {
                return;
            }
            let elLi = arrli[0];
            let id = null;
            if (elLi) {
                id = elLi.getAttribute('id');
            }
            this.getProps().callback(id);
        };
        this.state = {
            li_onClick: this.li_onClick
        };
    }
    //#Components
components() {return {Avatar: _components_img_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<li 
        className='search-user__item' 
        id={{props.id}} 
        key={{props.key}} 
        onClick={{state.li_onClick}}
      >
        <div className='search-user__item-avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>
        </div>
        <div className='search-item__content'>
          <p>{{props.login}}</p>
        </div>
      </li>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchUser__Item);
//# sourceMappingURL=search-user__item.js.map

/***/ }),

/***/ "./static/js/components/UI/anchors/anchor-main/anchor-main.js":
/*!********************************************************************!*\
  !*** ./static/js/components/UI/anchors/anchor-main/anchor-main.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class AnchorMain extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    // constructor(props){
    //   console.log(props)
    // }
    template() {
        return (`<a className='anchor-main' id={{props.id}} rel='stylesheet' href={{props.href}} >{{props.text}}</a>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnchorMain);
//# sourceMappingURL=anchor-main.js.map

/***/ }),

/***/ "./static/js/components/UI/anchors/anchor-to-go/anchor-to-go.js":
/*!**********************************************************************!*\
  !*** ./static/js/components/UI/anchors/anchor-to-go/anchor-to-go.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class AnchorToGo extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<a className='anchor-to-go' id='button-to-profile' rel='stylesheet' href={{props.href}}>
        <p className='anchor-to-go_p'>{{props.text}}</p>
        <i className='anchor-to-go_icon fas fa-caret-right'></i>
      </a>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnchorToGo);
//# sourceMappingURL=anchor-to-go.js.map

/***/ }),

/***/ "./static/js/components/UI/buttons/button-main/button-main.js":
/*!********************************************************************!*\
  !*** ./static/js/components/UI/buttons/button-main/button-main.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class ButtonMain extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<button 
        type='submit'
        className='button-main'
        id={{props.id}}
        onClick={{props.onClick}}
        href={{props.href}}
      >
        {{props.text}}
      </button>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonMain);
//# sourceMappingURL=button-main.js.map

/***/ }),

/***/ "./static/js/components/UI/buttons/button-secondary/button-secondary.js":
/*!******************************************************************************!*\
  !*** ./static/js/components/UI/buttons/button-secondary/button-secondary.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class ButtonSecondary extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<button 
        type='submit'
        className='button-secondary'
        id={{props.id}}
        onClick={{props.onClick}}
        href={{props.href}}
      >
        {{props.text}}
      </button>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonSecondary);
//# sourceMappingURL=button-secondary.js.map

/***/ }),

/***/ "./static/js/components/UI/context-menu/context-menu.js":
/*!**************************************************************!*\
  !*** ./static/js/components/UI/context-menu/context-menu.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class ContextMenu extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super(...arguments);
        this.onClick = (e) => {
            e.preventDefault();
            let btnId = '';
            for (let i = 0; i < e.path.length; i++) {
                if (e.path[i].tagName === 'LI') {
                    btnId = e.path[i].getAttribute('id');
                    break;
                }
            }
            const props = this.getProps();
            props.onClick({ btnId, targetPath: this.targetPath });
        };
        this.state = {
            buttons: this.getButtons(),
            onClick: this.onClick
        };
    }
    componentDidMount() {
        const props = this.getProps();
        const menuArea = document.getElementById(props.ownerId);
        const menu = document.getElementById(props.menuId);
        if (!menuArea && !menu) {
            return;
        }
        menuArea === null || menuArea === void 0 ? void 0 : menuArea.addEventListener('contextmenu', e => {
            e.preventDefault();
            menu.style.top = `${e.clientY}px`;
            menu.style.left = `${e.clientX}px`;
            menu.classList.add('cm_active');
            this.targetPath = e.path;
        }, false);
        menu.addEventListener('click', e => {
            menu.classList.remove('cm_active');
            e.stopPropagation();
        }, false);
    }
    getButtons() {
        const blockButtons = this.getProps().blockButtons ? this.getProps().blockButtons.split('|') : [];
        const res = [];
        const getIconclassName = this.getIconclassName;
        this.getProps().buttons.split('|').forEach(function (buttonStr) {
            const button = buttonStr.split(':');
            const block = blockButtons.includes(button[0]);
            res.push({
                id: button[0],
                type: button[1],
                text: button[2],
                block: blockButtons.includes(button[0]),
                li_className: 'cm__cm-element',
                i_className: getIconclassName(button[1], block),
                p_className: block ? 'cm-block' : ''
            });
        });
        return res;
    }
    getIconclassName(type, block) {
        let className = '';
        switch (type) {
            case 'add':
                className = 'fas fa-plus-circle c-gn1';
                break;
            case 'remove':
                className = 'fas fa-minus-circle c-r1';
                break;
            default:
                className = 'fas fa-circle cm-icon_hide';
                break;
        }
        return className.concat(' cm-icon').concat(block ? ' cm-block' : '');
    }
    template() {
        return (`<ul className='cm' id={{props.menuId}}>
        {% for (let i = 0; i < state.buttons.length; i++) { 
          const button = state.buttons[i];
        %}
          <li 
            className={{button.li_className}}
            id={{button.id}}
            key={{button.id}}
            onClick={{state.onClick}}
          >
            <i className={{button.i_className}}></i>
            <p className={{button.p_className}}>{{button.text}}</p>  

          </li> 
        {% } %}
      </ul>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContextMenu);
//# sourceMappingURL=context-menu.js.map

/***/ }),

/***/ "./static/js/components/UI/inputs/input-gray5/input-gray5.js":
/*!*******************************************************************!*\
  !*** ./static/js/components/UI/inputs/input-gray5/input-gray5.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class InputGray5 extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super(...arguments);
        this.state = {
            placeholder: this.getProps().placeholder ? this.getProps().placeholder : '',
            type: this.getProps().type ? this.getProps().type : 'text',
            id: this.getProps().id ? this.getProps().id : 'input_search',
            title: this.getProps().title ? this.getProps().title : '#title#',
            onChange: this.getProps().onChange ? this.getProps().onChange : null
        };
    }
    template() {
        return (`<div className='input-gray5'>
        
        {% if({{state.title}} !== '#title#') { %}
          <label className='input-gray5__label' for={{state.id}}>{{state.title}}</label>
        {% } %}  

        //<div className='input-gray5__input-div>
          <input 
            className='input-gray5__input' 
            type={{state.type}}
            id={{state.id}} 
            placeholder={{state.placeholder}}
            onChange={{state.onChange}}
          >
        //</div>     
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputGray5);
//# sourceMappingURL=input-gray5.js.map

/***/ }),

/***/ "./static/js/components/auth-bar/auth-bar-form/auth-bar-form.js":
/*!**********************************************************************!*\
  !*** ./static/js/components/auth-bar/auth-bar-form/auth-bar-form.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class AuthBarForm extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<form id='form__main' className='auth-bar-form'>
      </form>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthBarForm);
//# sourceMappingURL=auth-bar-form.js.map

/***/ }),

/***/ "./static/js/components/auth-bar/auth-bar-input/auth-bar-input.js":
/*!************************************************************************!*\
  !*** ./static/js/components/auth-bar/auth-bar-input/auth-bar-input.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class AuthBarInput extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='auth-bar-input'>
        <label className='auth-bar-input__label' for={{props.id}}>{{props.text}}</label>
        <input className='auth-bar-input__input' type={{props.type}} id={{props.id}} value={{props.value}}></input>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthBarInput);
//# sourceMappingURL=auth-bar-input.js.map

/***/ }),

/***/ "./static/js/components/auth-bar/bar__content/bar__content.js":
/*!********************************************************************!*\
  !*** ./static/js/components/auth-bar/bar__content/bar__content.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class Bar__Content extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='bar__content'></div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bar__Content);
//# sourceMappingURL=bar__content.js.map

/***/ }),

/***/ "./static/js/components/auth-bar/bar__footer/bar__footer.js":
/*!******************************************************************!*\
  !*** ./static/js/components/auth-bar/bar__footer/bar__footer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class Bar__Footer extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='bar__footer'></div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bar__Footer);
//# sourceMappingURL=bar__footer.js.map

/***/ }),

/***/ "./static/js/components/auth-bar/bar__header/bar__header.js":
/*!******************************************************************!*\
  !*** ./static/js/components/auth-bar/bar__header/bar__header.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class Bar__Header extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<h3 className='bar__header'>{{props.text}}</h3>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bar__Header);
//# sourceMappingURL=bar__header.js.map

/***/ }),

/***/ "./static/js/components/chat/chats-bar/chats-bar/chats-bar.js":
/*!********************************************************************!*\
  !*** ./static/js/components/chat/chats-bar/chats-bar/chats-bar.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_chat_chats_bar_chats_bar_chats_list_chats_bar_chats_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/chat/chats-bar/chats-bar__chats-list/chats-bar__chats-list.js */ "./static/js/components/chat/chats-bar/chats-bar__chats-list/chats-bar__chats-list.js");
/* harmony import */ var _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/UI/inputs/input-gray5/input-gray5.js */ "./static/js/components/UI/inputs/input-gray5/input-gray5.js");
/* harmony import */ var _components_UI_anchors_anchor_to_go_anchor_to_go_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/UI/anchors/anchor-to-go/anchor-to-go.js */ "./static/js/components/UI/anchors/anchor-to-go/anchor-to-go.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import



//#Import

class ChatsBar extends _component_Component_js__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor() {
        super(...arguments);
        this.list_callback = (data) => {
            this.getProps().callback(data);
        };
        this.state = {
            list_callback: this.list_callback
        };
    }
    //#Components
components() {return {AnchorToGo: _components_UI_anchors_anchor_to_go_anchor_to_go_js__WEBPACK_IMPORTED_MODULE_2__.default,InputGray5: _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_1__.default,ChatsBar__ChatsList: _components_chat_chats_bar_chats_bar_chats_list_chats_bar_chats_list_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<div className='chats-bar'>
        <form id='form__header' className='chats-bar__header'>
          <AnchorToGo text='Profile' href='#{R}#userSettings'></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <ChatsBar__ChatsList callback={{state.list_callback}}></ChatsBar__ChatsList>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatsBar);
//# sourceMappingURL=chats-bar.js.map

/***/ }),

/***/ "./static/js/components/chat/chats-bar/chats-bar__chats-list/chats-bar__chats-list.js":
/*!********************************************************************************************!*\
  !*** ./static/js/components/chat/chats-bar/chats-bar__chats-list/chats-bar__chats-list.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_UI_MW_MW_add_chat_MW_add_chat_MW_add_chat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/UI/MW/MW__add-chat/MW__add-chat/MW__add-chat.js */ "./static/js/components/UI/MW/MW__add-chat/MW__add-chat/MW__add-chat.js");
/* harmony import */ var _components_UI_MW_MW_search_user_MW_search_user_MW_search_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/UI/MW/MW__search-user/MW__search-user/MW__search-user.js */ "./static/js/components/UI/MW/MW__search-user/MW__search-user/MW__search-user.js");
/* harmony import */ var _components_UI_context_menu_context_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/UI/context-menu/context-menu.js */ "./static/js/components/UI/context-menu/context-menu.js");
/* harmony import */ var _components_chat_chats_bar_chats_list_chat_item_chats_list_chat_item_chats_list_chat_item_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/chat/chats-bar/chats-list__chat-item/chats-list__chat-item/chats-list__chat-item.js */ "./static/js/components/chat/chats-bar/chats-list__chat-item/chats-list__chat-item/chats-list__chat-item.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
//#Import




//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class ChatsBar__ChatsList extends _component_Component_js__WEBPACK_IMPORTED_MODULE_4__.default {
    constructor() {
        super(...arguments);
        this.currentChatId = 0;
        this.chatsOnClick = (e) => {
            e.preventDefault();
            let arrli = e.path.filter((el) => el.nodeName === 'LI');
            if (arrli.length === 0) {
                return;
            }
            let elLi = arrli[0];
            let chatId = null;
            if (elLi) {
                chatId = elLi.getAttribute('id');
            }
            this.currentChatId = Number(chatId);
            if (chatId !== null) {
                const arrChats = this.state.chats.filter((el) => String(el.id) === chatId);
                if (arrChats.length > 0) {
                    this.getProps().callback({ chat: arrChats[0] });
                }
            }
        };
        this.CM_onClick = (data) => {
            if (data.btnId === 'addUser') {
                this.addUser_event(data);
            }
            else if (data.btnId === 'removeUser') {
                this.removeUser_event(data);
            }
            else if (data.btnId === 'addChat') {
                this.addChat_event(data);
            }
            else if (data.btnId === 'removeChat') {
                this.removeChat_event(data);
            }
        };
        this.addUser_event = (data) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showSearchUsers: true });
        });
        this.removeUser_event = (data) => {
        };
        this.searchUsers_callback = (user) => __awaiter(this, void 0, void 0, function* () {
            let req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_5__.xhrPutChatUsers)({
                chatId: this.currentChatId,
                users: [user.id]
            });
            this.setState({ showSearchUsers: false });
        });
        //
        this.addChat_event = (data) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showAddChat: true });
        });
        this.removeChat_event = (data) => {
        };
        this.addChat_callback = (data) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showAddChat: false });
            if (!data) {
                return;
            }
            let req;
            req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_5__.xhrPostCreateChat)(data);
            if (req && req.status >= 400) {
                alert(`Failed to create chat: ${req.response.error}, ${req.response.reason}`);
                return;
            }
            this.setState({ chats: yield this.getChats() });
        });
        this.state = {
            CM_onClick: this.CM_onClick,
            chatsOnClick: this.chatsOnClick,
            showSearchUsers: false,
            searchUsers_callback: this.searchUsers_callback,
            showAddChat: false,
            addChat_callback: this.addChat_callback
        };
    }
    componentDidMount(props, state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ chats: yield this.getChats() });
        });
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            let req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_5__.xhrGetChats)();
            if (!req) {
                return;
            }
            if (req.response.status >= 400) {
                (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_5__.xhrOnError)();
            }
            console.log('getChats req', req);
            return req.response;
        });
    }
    //#Components
components() {return {ChatsList__ChatItem: _components_chat_chats_bar_chats_list_chat_item_chats_list_chat_item_chats_list_chat_item_js__WEBPACK_IMPORTED_MODULE_3__.default,ContextMenu: _components_UI_context_menu_context_menu_js__WEBPACK_IMPORTED_MODULE_2__.default,MW__SearchUser: _components_UI_MW_MW_search_user_MW_search_user_MW_search_user_js__WEBPACK_IMPORTED_MODULE_1__.default,MW__AddChat: _components_UI_MW_MW_add_chat_MW_add_chat_MW_add_chat_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`
      <div className='chats-bar__chats-list' onClick={{state.chatsOnClick}} id='chats-list'>

        <ul className='chats-list__list'>
          
          {% for (let i = 0; i < state.chats.length; i++) { const chat = state.chats[i]; %}
            <ChatsList__ChatItem 
              id={{chat.id}}
              key={{chat.id}}
              name={{chat.title}}
              avatar={{chat.avatar}}
              //markId={{}}
              // lastMessageType={{chat.lastMessage.type}}
              // lastMessageDate={{chat.lastMessage.date}}
              // lastMessageText={{chat.lastMessage.text}}
              // countUnread={{chat.countUnread}}
            ></ChatsList__ChatItem>
          {% } %}
        </ul>

      </div>

      <ContextMenu 
        buttons='addChat:add:Add chat|removeChat:remove:Remove chat|addUser:add:Add user|removeUser:remove:Remove user'
        //blockButtons='addChat|removeChat'
        onClick={{state.CM_onClick}}
        ownerId='chats-list'
        menuId='chats-list-context-menu'
      ></ContextMenu>
  
      <MW__SearchUser showSearchUsers={{state.showSearchUsers}} callback={{state.searchUsers_callback}}></MW__SearchUser>
      <MW__AddChat showAddChat={{state.showAddChat}} callback={{state.addChat_callback}}></MW__AddChat>
      `);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatsBar__ChatsList);
//# sourceMappingURL=chats-bar__chats-list.js.map

/***/ }),

/***/ "./static/js/components/chat/chats-bar/chats-list__chat-item/chats-list__chat-item/chats-list__chat-item.js":
/*!******************************************************************************************************************!*\
  !*** ./static/js/components/chat/chats-bar/chats-list__chat-item/chats-list__chat-item/chats-list__chat-item.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_img_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/img/avatar/avatar.js */ "./static/js/components/img/avatar/avatar.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _router_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../router/events.js */ "./static/js/router/events.js");
//#Import

//#Import


class ChatsList__ChatItem extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super(...arguments);
        this.state = {
            onRouteClick: _router_events_js__WEBPACK_IMPORTED_MODULE_2__.onRouteClick
        };
    }
    //#Components
components() {return {Avatar: _components_img_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<li className='chats-list__chat-item' id={{props.id}} key={{props.key}}>
        <div className='chat-item__avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>
        </div>
        <div className='chat-item__content'>
          <div className='chat-item__content-top'>
            <h4 className='chat-item__chatname'>{{props.name}}</h4>
            //<div className='chat-item__last-message-time'>
              //<span className='last-message-time__value'>{{props.lastMessageDate}}</span>
            //</div>
          </div>    
          <div className='chat-item__content-bottom'>
            //<div className='chat-item__last-message'>
            //   {% if (props.lastMessageType === 'out') { %}
            //     <b>You:</b>
            //   {% } %}
            //   <div className='last-message__value'>{{props.lastMessageText}}</div>
            //  <div className='last-message__value'>test</div>
            //</div>
            // {% if (props.countUnread > 0) { %}
            //   <div className='chat-item__count-message'>
            //     <a className='count-message__value'>{{props.countUnread}}</a>
            //   </div>
            // {% } %}
          </div>    
        </div>
      </li>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatsList__ChatItem);
//# sourceMappingURL=chats-list__chat-item.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/message/message/message.js":
/*!***************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/message/message/message.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_chat_messages_bar_message_message_outgoing_message_outgoing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/chat/messages-bar/message/message__outgoing/message__outgoing.js */ "./static/js/components/chat/messages-bar/message/message__outgoing/message__outgoing.js");
/* harmony import */ var _components_chat_messages_bar_message_message_incoming_message_incoming_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/chat/messages-bar/message/message__incoming/message__incoming.js */ "./static/js/components/chat/messages-bar/message/message__incoming/message__incoming.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import


//#Import

class Message extends _component_Component_js__WEBPACK_IMPORTED_MODULE_2__.default {
    //#Components
components() {return {Message__Incoming: _components_chat_messages_bar_message_message_incoming_message_incoming_js__WEBPACK_IMPORTED_MODULE_1__.default,Message__Outgoing: _components_chat_messages_bar_message_message_outgoing_message_outgoing_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<li className='message'>
        {% if ({{props.type}} === 'in') { %}
          <Message__Incoming
            text={{props.text}}
            date={{props.date}}
          ></Message__Incoming>     
        {% } else { %}
          <Message__Outgoing
            text={{props.text}}
            date={{props.date}}
          ></Message__Outgoing>     
        {% } %} 
      </li>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message);
//# sourceMappingURL=message.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/message/message__free-space/message__free-space.js":
/*!***************************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/message/message__free-space/message__free-space.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");

class Message__FreeSpace extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='message__free-space'></div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message__FreeSpace);
//# sourceMappingURL=message__free-space.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/message/message__incoming/message__incoming.js":
/*!***********************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/message/message__incoming/message__incoming.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_chat_messages_bar_message_message_free_space_message_free_space_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/chat/messages-bar/message/message__free-space/message__free-space.js */ "./static/js/components/chat/messages-bar/message/message__free-space/message__free-space.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class Message__Incoming extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    //#Components
components() {return {Message__FreeSpace: _components_chat_messages_bar_message_message_free_space_message_free_space_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<div className='message__incoming'>
        <div className='message__decor bg-gy4'>
          {{props.text}} 
        <span className='message__info'>
          <i className='hide color-gray2 fas fa-check-double'></i>
          {{props.date}} 
        </span>
        </div>
          
        <Message__FreeSpace></Message__FreeSpace>
        
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message__Incoming);
//# sourceMappingURL=message__incoming.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/message/message__outgoing/message__outgoing.js":
/*!***********************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/message/message__outgoing/message__outgoing.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../component/Component.js */ "./static/js/component/Component.js");

class Message__Outgoing extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='message__free-space'>
      </div>
      <div className='message__outgoing'>
        <div className='message__decor bg-gy5'>
          {{props.text}}  
          <span className='message__info'>
            <i className='color-gray2 fas fa-check-double'></i>
            {{props.date}}
          </span>
        </div>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message__Outgoing);
//# sourceMappingURL=message__outgoing.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/messages-bar-select/messages-bar-select.js":
/*!*******************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/messages-bar-select/messages-bar-select.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class MessagesBarSelect extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div class='messages-bar'>
        Please select a chat to start messaging 
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessagesBarSelect);
//# sourceMappingURL=messages-bar-select.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/messages-bar/messages-bar.js":
/*!*****************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/messages-bar/messages-bar.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_chat_messages_bar_messages_bar_footer_messages_bar_footer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/chat/messages-bar/messages-bar__footer/messages-bar__footer.js */ "./static/js/components/chat/messages-bar/messages-bar__footer/messages-bar__footer.js");
/* harmony import */ var _components_chat_messages_bar_messages_bar_messages_messages_bar_messages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/chat/messages-bar/messages-bar__messages/messages-bar__messages.js */ "./static/js/components/chat/messages-bar/messages-bar__messages/messages-bar__messages.js");
/* harmony import */ var _components_chat_messages_bar_messages_bar_header_messages_bar_header_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/chat/messages-bar/messages-bar__header/messages-bar__header.js */ "./static/js/components/chat/messages-bar/messages-bar__header/messages-bar__header.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import



//#Import

class MessagesBar extends _component_Component_js__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor() {
        super(...arguments);
        this.messages = [];
        this.sendMessage_onClik = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const input = document.getElementById('input_send-message');
            const value = input.value.trim();
            input.value = '';
            //(document.getElementById('input_send-message') as HTMLInputElement).value = ''
            if (!value) {
                return;
            }
            const lastMessage = this.messages[this.state.messages.length - 1];
            let id = 0;
            if (lastMessage) {
                id = lastMessage.id;
            }
            id++;
            const messages = this.messages;
            messages.push({ id, type: 'out', date: this.getCurrentDate(), text: value });
            this.setState({ messages });
        };
        this.state = {
            sendMessage_onClik: this.sendMessage_onClik,
            messages: this.messages
            //[
            //{id: 0, type: 'in',  date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea'}
            // {id: 1,type: 'in',  date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.'},
            // {id: 2,type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.'},
            // {id: 3,type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.'},
            // {id: 4,type: 'in',  date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,'}
            //]
        };
    }
    getCurrentDate() {
        //let res:string = `${new Date().getHours()}:${new Date().getMinutes()}`
        let hours = String(new Date().getHours());
        hours = hours.length === 1 ? '0' + hours : hours;
        let minutes = String(new Date().getMinutes());
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }
    //#Components
components() {return {MessagesBar__Header: _components_chat_messages_bar_messages_bar_header_messages_bar_header_js__WEBPACK_IMPORTED_MODULE_2__.default,MessagesBar__Messages: _components_chat_messages_bar_messages_bar_messages_messages_bar_messages_js__WEBPACK_IMPORTED_MODULE_1__.default,MessagesBar__Footer: _components_chat_messages_bar_messages_bar_footer_messages_bar_footer_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<div className='messages-bar'>
        <MessagesBar__Header title={{props.title}} id={{props.id}} avatar={{props.avatar}}></MessagesBar__Header>
        <MessagesBar__Messages messages={{state.messages}}></MessagesBar__Messages> 
        <MessagesBar__Footer sendMessage_onClik={{state.sendMessage_onClik}}></MessagesBar__Footer>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessagesBar);
//# sourceMappingURL=messages-bar.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/messages-bar__footer/messages-bar__footer.js":
/*!*********************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/messages-bar__footer/messages-bar__footer.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/UI/inputs/input-gray5/input-gray5.js */ "./static/js/components/UI/inputs/input-gray5/input-gray5.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class MessagesBar__Footer extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    //#Components
components() {return {InputGray5: _components_UI_inputs_input_gray5_input_gray5_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<form id='form__footer' className='messages-bar__footer'>
        
        <div className='footer__left'>
          <button className='button-round bg-w' >
            <i className='c-gy3 fas fa-paperclip'></i>
          </button>
        </div>       
        
        <div className='footer__middle'>
          <InputGray5 type='text' id='input_send-message' placeholder='Write...'></InputGray5>
        </div>
  
        <div className='footer__right'>
          <button className='button-round bg-b1 margin5px' onClick={{props.sendMessage_onClik}}>
            <i className='c-w fas fa-long-arrow-alt-right'></i>
          </button>
        </div>
      
      </form>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessagesBar__Footer);
//# sourceMappingURL=messages-bar__footer.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/messages-bar__header/messages-bar__header.js":
/*!*********************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/messages-bar__header/messages-bar__header.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_img_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/img/avatar/avatar.js */ "./static/js/components/img/avatar/avatar.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class MessagesBar__Header extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    //#Components
components() {return {Avatar: _components_img_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<div className='messages-bar__header' id={{props.id}}>
        
        <div className='header__avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>

          // <div className='avatar-empty'>
          //   <i className='c-gy3 fas fa-camera'></i>
          // </div>
        </div>
        
        <div className='header__content'>
          <div className='header__username'>
            <h1>{{props.title}}</h1>
          </div>
          <div className='header__last-seen'>
            {{props.lastSeen}}
          </div>
        </div>
        
        <div className='header__menu'>
          // <button className='button-vertical bg-w'>
          //   <i className='fas fa-ellipsis-v'></i>
          // </button>  
        </div>
      
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessagesBar__Header);
//# sourceMappingURL=messages-bar__header.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/messages-bar__messages/messages-bar__messages.js":
/*!*************************************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/messages-bar__messages/messages-bar__messages.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_chat_messages_bar_message_message_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/chat/messages-bar/message/message/message.js */ "./static/js/components/chat/messages-bar/message/message/message.js");
/* harmony import */ var _components_chat_messages_bar_messages_date_messages_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/chat/messages-bar/messages__date/messages__date.js */ "./static/js/components/chat/messages-bar/messages__date/messages__date.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");
//#Import


//#Import

class MessagesBar__Messages extends _component_Component_js__WEBPACK_IMPORTED_MODULE_2__.default {
    //#Components
components() {return {Messages__Date: _components_chat_messages_bar_messages_date_messages_date_js__WEBPACK_IMPORTED_MODULE_1__.default,Message: _components_chat_messages_bar_message_message_message_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<ul className='messages-bar__messages'>
        // <Messages__Date></Messages__Date>
        {% for (let i = 0; i < props.messages.length; i++) { 
          const message = props.messages[i];
        %}
          <Message 
            key={{message.id}}
            type={{message.type}}  
            date={{message.date}}  
            text={{message.text}}  
          ></Message>
        {% } %}
      </ul>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessagesBar__Messages);
//# sourceMappingURL=messages-bar__messages.js.map

/***/ }),

/***/ "./static/js/components/chat/messages-bar/messages__date/messages__date.js":
/*!*********************************************************************************!*\
  !*** ./static/js/components/chat/messages-bar/messages__date/messages__date.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../component/Component.js */ "./static/js/component/Component.js");

class Messages__Date extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='messages__date'>
        October 9
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Messages__Date);
//# sourceMappingURL=messages__date.js.map

/***/ }),

/***/ "./static/js/components/error-bar/error-bar.js":
/*!*****************************************************!*\
  !*** ./static/js/components/error-bar/error-bar.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/UI/anchors/anchor-main/anchor-main.js */ "./static/js/components/UI/anchors/anchor-main/anchor-main.js");
/* harmony import */ var _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/page-column/page-column.js */ "./static/js/components/page-column/page-column.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/Component.js */ "./static/js/component/Component.js");
//#Import


//#Import

class ErrorBar extends _component_Component_js__WEBPACK_IMPORTED_MODULE_2__.default {
    //#Components
components() {return {PageColumn: _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_1__.default,AnchorMain: _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<PageColumn>
        <div class='error-bar'>
          <h1>{{props.errCode}}</h1>
          <div>{{props.message}}</div>
          <AnchorMain 
            text='Back to chats'  
            id='button_back-to-chats'
            href={{props.href}}
          </AnchorMain>
        </div>
      </PageColumn>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBar);
//# sourceMappingURL=error-bar.js.map

/***/ }),

/***/ "./static/js/components/img/avatar/avatar.js":
/*!***************************************************!*\
  !*** ./static/js/components/img/avatar/avatar.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class Avatar extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`{% if({{props.avatar}} === null ) { %}
          <div className='avatar-empty'>
            <i className='c-gy3 fas fa-camera'></i>  
          </div>
        {% } else { %}
          <div className='avatar'>
            <img src={{props.avatar}}></img>
          </div>
      {% } %}`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Avatar);
//# sourceMappingURL=avatar.js.map

/***/ }),

/***/ "./static/js/components/page-column/page-column.js":
/*!*********************************************************!*\
  !*** ./static/js/components/page-column/page-column.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/Component.js */ "./static/js/component/Component.js");

class PageColumn extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='page-column'>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageColumn);
//# sourceMappingURL=page-column.js.map

/***/ }),

/***/ "./static/js/components/pages/chat/chat.js":
/*!*************************************************!*\
  !*** ./static/js/components/pages/chat/chat.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Chat
/* harmony export */ });
/* harmony import */ var _components_chat_messages_bar_messages_bar_select_messages_bar_select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/chat/messages-bar/messages-bar-select/messages-bar-select.js */ "./static/js/components/chat/messages-bar/messages-bar-select/messages-bar-select.js");
/* harmony import */ var _components_chat_messages_bar_messages_bar_messages_bar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/chat/messages-bar/messages-bar/messages-bar.js */ "./static/js/components/chat/messages-bar/messages-bar/messages-bar.js");
/* harmony import */ var _components_chat_chats_bar_chats_bar_chats_bar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/chat/chats-bar/chats-bar/chats-bar.js */ "./static/js/components/chat/chats-bar/chats-bar/chats-bar.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
//#Import



//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Chat extends _component_Component_js__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor() {
        super(...arguments);
        this.currentId = 0;
        this.chatsBar_callback = (data) => __awaiter(this, void 0, void 0, function* () {
            if (data.chat) {
                if (this.currentId === data.chat.id) {
                    return;
                }
                this.currentId === data.chat.id;
                let req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_4__.xhrPostChatsToken)({ id: data.chat.id });
                const token = req === null || req === void 0 ? void 0 : req.response.token;
                console.log('userid', localStorage.getItem('id'), 'chatid', data.chat.id, 'token', token);
                console.log('socket', `wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('id')}/${data.chat.id}/${token}`);
                //if (!req) { return }
                //if (req.response.status >= 400) { xhrOnError() }
                //const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>')
                const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('id')}/${data.chat.id}/${token}`);
                socket.addEventListener('open', () => {
                    console.log('Соединение установлено');
                    socket.send(JSON.stringify({
                        content: 'Моё первое сообщение миру!',
                        type: 'message',
                    }));
                });
                socket.addEventListener('close', event => {
                    if (event.wasClean) {
                        console.log('Соединение закрыто чисто');
                    }
                    else {
                        console.log('Обрыв соединения');
                    }
                    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                });
                socket.addEventListener('message', event => {
                    console.log('Получены данные', event);
                    console.log('Получены данные', event.data);
                });
                socket.addEventListener('error', event => {
                    console.log('Ошибка', event);
                });
                this.setState({ showMessages: true, id: String(data.chat.id), avatar: data.chat.avatar, title: data.chat.title });
            }
        });
        this.state = {
            chatsBar_callback: this.chatsBar_callback,
            showMessages: false
        };
    }
    componentDidUpdate() {
        window.createValidateEvents();
    }
    //#Components
components() {return {ChatsBar: _components_chat_chats_bar_chats_bar_chats_bar_js__WEBPACK_IMPORTED_MODULE_2__.default,MessagesBar: _components_chat_messages_bar_messages_bar_messages_bar_js__WEBPACK_IMPORTED_MODULE_1__.default,MessagesBarSelect: _components_chat_messages_bar_messages_bar_select_messages_bar_select_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<div className='page-chat'>
        <ChatsBar callback={{state.chatsBar_callback}}></ChatsBar>
        {% if({{state.showMessages}}) { %}
          <MessagesBar id={{state.id}} avatar={{state.avatar}} title={{state.title}}></MessagesBar>
        {% } else { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } %}
      </div>`);
    }
}
// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
//# sourceMappingURL=chat.js.map

/***/ }),

/***/ "./static/js/components/pages/error404/error404.js":
/*!*********************************************************!*\
  !*** ./static/js/components/pages/error404/error404.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Error404
/* harmony export */ });
/* harmony import */ var _components_error_bar_error_bar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/error-bar/error-bar.js */ "./static/js/components/error-bar/error-bar.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class Error404 extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    //#Components
components() {return {ErrorBar: _components_error_bar_error_bar_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<ErrorBar 
        errCode='404'
        message='Wrong way'
        href='#{R}#chat'
      ></>`);
    }
}
//# sourceMappingURL=error404.js.map

/***/ }),

/***/ "./static/js/components/pages/error500/error500.js":
/*!*********************************************************!*\
  !*** ./static/js/components/pages/error500/error500.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Error500
/* harmony export */ });
/* harmony import */ var _components_error_bar_error_bar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/error-bar/error-bar.js */ "./static/js/components/error-bar/error-bar.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class Error500 extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    //#Components
components() {return {ErrorBar: _components_error_bar_error_bar_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<ErrorBar
        errCode='500'
        message='Sorry, something is wrong'
        href='#{R}#chat'
      ></>`);
    }
}
//# sourceMappingURL=error500.js.map

/***/ }),

/***/ "./static/js/components/pages/index/index.js":
/*!***************************************************!*\
  !*** ./static/js/components/pages/index/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Index
/* harmony export */ });
/* harmony import */ var _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/page-column/page-column.js */ "./static/js/components/page-column/page-column.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
//#Import

//#Import

class Index extends _component_Component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    //#Components
components() {return {PageColumn: _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<PageColumn>
        <h1>Messanger</h1>
      </PageColumn>`);
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/components/pages/login/login.js":
/*!***************************************************!*\
  !*** ./static/js/components/pages/login/login.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Login
/* harmony export */ });
/* harmony import */ var _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/UI/anchors/anchor-main/anchor-main.js */ "./static/js/components/UI/anchors/anchor-main/anchor-main.js");
/* harmony import */ var _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/UI/buttons/button-main/button-main.js */ "./static/js/components/UI/buttons/button-main/button-main.js");
/* harmony import */ var _components_auth_bar_bar_footer_bar_footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/auth-bar/bar__footer/bar__footer.js */ "./static/js/components/auth-bar/bar__footer/bar__footer.js");
/* harmony import */ var _components_auth_bar_auth_bar_input_auth_bar_input_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/auth-bar/auth-bar-input/auth-bar-input.js */ "./static/js/components/auth-bar/auth-bar-input/auth-bar-input.js");
/* harmony import */ var _components_auth_bar_bar_content_bar_content_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/auth-bar/bar__content/bar__content.js */ "./static/js/components/auth-bar/bar__content/bar__content.js");
/* harmony import */ var _components_auth_bar_bar_header_bar_header_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/auth-bar/bar__header/bar__header.js */ "./static/js/components/auth-bar/bar__header/bar__header.js");
/* harmony import */ var _components_auth_bar_auth_bar_form_auth_bar_form_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/auth-bar/auth-bar-form/auth-bar-form.js */ "./static/js/components/auth-bar/auth-bar-form/auth-bar-form.js");
/* harmony import */ var _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/page-column/page-column.js */ "./static/js/components/page-column/page-column.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _router_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../router/utils.js */ "./static/js/router/utils.js");
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
//#Import








//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Login extends _component_Component_js__WEBPACK_IMPORTED_MODULE_8__.default {
    constructor() {
        super(...arguments);
        this.state = {
            loginOnClick: this.loginOnClick,
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            password: ''
        };
    }
    loginOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const formdata = window.getFormData();
            console.log(formdata);
            const body = {};
            for (const key in formdata.data) {
                body[formdata.data[key].name] = formdata.data[key].value;
            }
            let req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_10__.xhrPostAuthSignin)(body);
            if (req) {
                if (req.status === 200) {
                    (0,_router_utils_js__WEBPACK_IMPORTED_MODULE_9__.defaultPage)();
                }
                else if (req.status >= 400) {
                    alert(`Failed to execute sign in. reason ${req.response.reason}`);
                }
                else {
                    alert(`Failed to execute sign in.`);
                }
            }
        });
    }
    //#Components
components() {return {PageColumn: _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_7__.default,AuthBarForm: _components_auth_bar_auth_bar_form_auth_bar_form_js__WEBPACK_IMPORTED_MODULE_6__.default,Bar__Header: _components_auth_bar_bar_header_bar_header_js__WEBPACK_IMPORTED_MODULE_5__.default,Bar__Content: _components_auth_bar_bar_content_bar_content_js__WEBPACK_IMPORTED_MODULE_4__.default,AuthBarInput: _components_auth_bar_auth_bar_input_auth_bar_input_js__WEBPACK_IMPORTED_MODULE_3__.default,Bar__Footer: _components_auth_bar_bar_footer_bar_footer_js__WEBPACK_IMPORTED_MODULE_2__.default,ButtonMain: _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_1__.default,AnchorMain: _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<PageColumn>
        <AuthBarForm>
          <Bar__Header text='Log in'></Bar__Header>
          <Bar__Content>
            <AuthBarInput text='login'    type='text'     id='input_login'    value={{state.login}}></AuthBarInput>                  
            <AuthBarInput text='password' type='password' id='input_password' value={{state.password}}></AuthBarInput>                  
          </Bar__Content>
          <Bar__Footer>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <AnchorMain text='Sign up' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
          </Bar__Footer>
        </AuthBarForm>
      </PageColumn>`);
    }
}
//# sourceMappingURL=login.js.map

/***/ }),

/***/ "./static/js/components/pages/signup/signup.js":
/*!*****************************************************!*\
  !*** ./static/js/components/pages/signup/signup.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Signup
/* harmony export */ });
/* harmony import */ var _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/UI/anchors/anchor-main/anchor-main.js */ "./static/js/components/UI/anchors/anchor-main/anchor-main.js");
/* harmony import */ var _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/UI/buttons/button-main/button-main.js */ "./static/js/components/UI/buttons/button-main/button-main.js");
/* harmony import */ var _components_auth_bar_bar_footer_bar_footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/auth-bar/bar__footer/bar__footer.js */ "./static/js/components/auth-bar/bar__footer/bar__footer.js");
/* harmony import */ var _components_auth_bar_auth_bar_input_auth_bar_input_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/auth-bar/auth-bar-input/auth-bar-input.js */ "./static/js/components/auth-bar/auth-bar-input/auth-bar-input.js");
/* harmony import */ var _components_auth_bar_bar_content_bar_content_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/auth-bar/bar__content/bar__content.js */ "./static/js/components/auth-bar/bar__content/bar__content.js");
/* harmony import */ var _components_auth_bar_bar_header_bar_header_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/auth-bar/bar__header/bar__header.js */ "./static/js/components/auth-bar/bar__header/bar__header.js");
/* harmony import */ var _components_auth_bar_auth_bar_form_auth_bar_form_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/auth-bar/auth-bar-form/auth-bar-form.js */ "./static/js/components/auth-bar/auth-bar-form/auth-bar-form.js");
/* harmony import */ var _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/page-column/page-column.js */ "./static/js/components/page-column/page-column.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _router_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../router/utils.js */ "./static/js/router/utils.js");
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
//#Import








//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Signup extends _component_Component_js__WEBPACK_IMPORTED_MODULE_8__.default {
    constructor() {
        super(...arguments);
        this.state = {
            signUpOnClick: this.signUpOnClick,
            first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
            second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
            phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
            password: ''
        };
    }
    signUpOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const formdata = window.getFormData();
            const body = {};
            for (const key in formdata.data) {
                body[formdata.data[key].name] = formdata.data[key].value;
            }
            let req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_10__.xhrPostAuthSignUp)(body);
            if (req) {
                if (req.status === 200) {
                    console.log('#signup', _router_utils_js__WEBPACK_IMPORTED_MODULE_9__.defaultPage);
                    (0,_router_utils_js__WEBPACK_IMPORTED_MODULE_9__.defaultPage)();
                }
                else if (req.status >= 400) {
                    alert(`Failed to execute sign up. reason ${req.response.reason}`);
                }
                else {
                    alert(`Failed to execute sign up.`);
                }
            }
            else {
                alert(`Failed to execute sign up.`);
            }
        });
    }
    //#Components
components() {return {PageColumn: _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_7__.default,AuthBarForm: _components_auth_bar_auth_bar_form_auth_bar_form_js__WEBPACK_IMPORTED_MODULE_6__.default,Bar__Header: _components_auth_bar_bar_header_bar_header_js__WEBPACK_IMPORTED_MODULE_5__.default,Bar__Content: _components_auth_bar_bar_content_bar_content_js__WEBPACK_IMPORTED_MODULE_4__.default,AuthBarInput: _components_auth_bar_auth_bar_input_auth_bar_input_js__WEBPACK_IMPORTED_MODULE_3__.default,Bar__Footer: _components_auth_bar_bar_footer_bar_footer_js__WEBPACK_IMPORTED_MODULE_2__.default,ButtonMain: _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_1__.default,AnchorMain: _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<PageColumn>
        <AuthBarForm>
          <Bar__Header text='Sign up'></Bar__Header>
          
          <Bar__Content>
            <AuthBarInput text='First name'   type='name'     id='input_first-name'   value={{state.first_name}} ></>                  
            <AuthBarInput text='Second name'  type='name'     id='input_second-name'  value={{state.second_name}} ></>                  
            <AuthBarInput text='Login'        type='login'    id='input_login'        value={{state.login}} ></>                  
            <AuthBarInput text='email'        type='mail'     id='input_email'        value={{state.email}} ></>                  
            <AuthBarInput text='Password'     type='password' id='input_password'     value={{state.password}} ></>                  
            <AuthBarInput text='Phone'        type='phone'    id='input_phone'        value={{state.phone}} ></>                  
          </Bar__Content>
          
          <Bar__Footer>
            <ButtonMain text='Sign up'      id='button-sign-up' onClick={{state.signUpOnClick}}></ButtonMain>
            <AnchorMain text='Log in'  id='button-to-log-in' href='#{R}#login'></AnchorMain>
          </Bar__Footer>
        
        </AuthBarForm>
      </PageColumn>`);
    }
}
//# sourceMappingURL=signup.js.map

/***/ }),

/***/ "./static/js/components/pages/testPage/testPage.js":
/*!*********************************************************!*\
  !*** ./static/js/components/pages/testPage/testPage.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TestPage
/* harmony export */ });
/* harmony import */ var _components_UI_context_menu_context_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/UI/context-menu/context-menu.js */ "./static/js/components/UI/context-menu/context-menu.js");
/* harmony import */ var _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/UI/anchors/anchor-main/anchor-main.js */ "./static/js/components/UI/anchors/anchor-main/anchor-main.js");
/* harmony import */ var _components_auth_bar_auth_bar_input_auth_bar_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/auth-bar/auth-bar-input/auth-bar-input.js */ "./static/js/components/auth-bar/auth-bar-input/auth-bar-input.js");
/* harmony import */ var _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/page-column/page-column.js */ "./static/js/components/page-column/page-column.js");
/* harmony import */ var _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/UI/buttons/button-main/button-main.js */ "./static/js/components/UI/buttons/button-main/button-main.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
//#Import





//#Import

class TestPage extends _component_Component_js__WEBPACK_IMPORTED_MODULE_5__.default {
    constructor() {
        super(...arguments);
        this.CM_onClick = (data) => {
            this.setState({ btnTestUpdate_text: 'Success!', btnTestUpdate_id: 'newId' });
            const list = this.state.list;
            if (data.btnId === 'add') {
                list.push({ a: 7, b: '8' });
            }
            else {
                list.pop();
            }
            this.setState({ btnTestUpdate_text: 'ContextMwnu', list });
        };
        this.btnTestUpdate_onClick = () => {
            if (this.state.btnTestUpdate_text === 'Success') {
                this.setState({ btnTestUpdate_text: 'TestUpdate' });
            }
            else {
                this.setState({ btnTestUpdate_text: 'Success' });
            }
        };
        this.btnTestCycle_onClick = () => {
            if (this.state.list.length === 3) {
                this.state.list.push({ a: 11, b: '12' });
            }
            else {
                this.state.list.pop();
            }
            this.setState({ list: this.state.list });
        };
        this.btnTestCycleItemUpdate_onClick = () => {
            const el = this.state.list[1];
            if (el.b === '4') {
                this.state.list[1] = { a: 3, b: '444444' };
                //console.log('2', this.state.list)
            }
            else {
                //console.log('22',this.state.list)
                this.state.list[1] = { a: 3, b: '4' };
            }
            this.setState({ list: this.state.list });
        };
        this.btnTestIf_onClick = () => {
            if (this.state.condition === null) {
                this.setState({ condition: true });
                return;
            }
            this.setState({ condition: null });
            //this.virtDOM?.printNodes()
        };
        this.state = {
            CM_onClick: this.CM_onClick,
            btnTestUpdate_onClick: this.btnTestUpdate_onClick,
            btnTestUpdate_id: 'button_log-in',
            btnTestUpdate_text: 'TestUpdate',
            condition: true,
            conditionR: null,
            btnTestIf_onClick: this.btnTestIf_onClick,
            btnTestCycle_onClick: this.btnTestCycle_onClick,
            list: [{ a: 1, b: '2' }, { a: 3, b: '4' }, { a: 5, b: '6' }],
            btnTestCycleItemUpdate_onClick: this.btnTestCycleItemUpdate_onClick
        };
    }
    //#Components
components() {return {ButtonMain: _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_4__.default,PageColumn: _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_3__.default,AuthBarInput: _components_auth_bar_auth_bar_input_auth_bar_input_js__WEBPACK_IMPORTED_MODULE_2__.default,AnchorMain: _components_UI_anchors_anchor_main_anchor_main_js__WEBPACK_IMPORTED_MODULE_1__.default,ContextMenu: _components_UI_context_menu_context_menu_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<div className='right-click-area' id='CM_OwnerId' >
        
      // <ButtonMain text={{state.btnTestUpdate_text}} id={{state.btnTestUpdate_id}} onClick={{state.btnTestUpdate_onClick}} ></ButtonMain>
      <ButtonMain text='test if' id='test-if' onClick={{state.btnTestIf_onClick}} ></ButtonMain>
      // <ButtonMain text='test cycle' id='test-cycle' onClick={{state.btnTestCycle_onClick}} ></ButtonMain>
      // <ButtonMain text='test cycle item update' id='test-cycle_item_update' onClick={{state.btnTestCycleItemUpdate_onClick}} ></ButtonMain>
      
      {% if({{state.condition}} === null ) { %}
        <PageColumn>
      
          <ul className='list-test'>
          {% for (let    i   =    0; i < state.list.length; i++) { 
            const listEl = state.list[i];
          %}
        
            <li key={{listEl.a}}>
              <AuthBarInput key={{listEl.a}} id={{listEl.a}} text={{listEl.b}}    type='text'     value='{{listEl.b}}></AuthBarInput> 
              <a key={{listEl.a}} id={{listEl.a}}>{{listEl.b}}</a> 
              <AnchorMain key={{listEl.a}} id={{listEl.a}} text={{listEl.b}} href='#{R}#signup'></AnchorMain>
            </li>
        
          {% } %}
          </ul>
      
      
          <AuthBarInput text='true'    type='text'     id='true'    value='true'></AuthBarInput> 
          <a>99+</a> 
        </PageColumn>
      
      {% } else { %}
        <PageColumn>
          <AuthBarInput text='false'    type='text'     id='input_login'    value='false'></AuthBarInput> 
          <a>000</a> 
          <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
        </PageColumn>
      {% } %}
      

        // <ContextMenu 
        //   buttons='add:add|remove:Remove chat'
        //   onClick={{state.CM_onClick}}
        //   ownerId='CM_OwnerId'
        //   menuId='CM_MenuId'
        // ></ContextMenu>
              

      </div>`);
    }
}
//   //<ButtonMain text={{state.btnTestUpdate_text}} id={{state.btnTestUpdate_id}} onClick={{state.btnTestUpdate_onClick}} ></ButtonMain>
// {% if({{state.condition}}) { %}
// <PageColumn>
//  <AuthBarInput text='true'    type='text'     id='true'    value='true'></AuthBarInput> 
//  <a>99+</a> 
//   </PageColumn>
// {% } else { %}
// <PageColumn>
//  <AuthBarInput text='false'    type='text'     id='input_login'    value='false'></AuthBarInput> 
//  <a>000</a> 
//  <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
// </PageColumn>
// {% } %}
// <ul className='list-test'>
// {% for (let    i   =    0; i < state.list.length; i++) { 
//   const listEl = state.list[i];
// %}
//   <div key={{listEl.a}}>
//     <AuthBarInput key={{listEl.a}} id={{listEl.a}} text={{listEl.a}}    type='text'     value='{{listEl.b}}></AuthBarInput> 
//     <a key={{listEl.a}} id={{listEl.a}}>{{listEl.a}}</a> 
//     <AnchorMain key={{listEl.a}} id={{listEl.a}} text={{listEl.a}} href='#{R}#signup'></AnchorMain>
//   </div>
// {% } %}
// </ul>
// <ul className='list-test'>
// {% for (let    i   =    0; i < state.list.length; i++) { 
//   const listEl = state.list[i];
// %}
//   //<PageColumn key={{listEl.a}}>
//     <AuthBarInput key={{listEl.a}} id={{listEl.a}} text='true'    type='text'     value='true'></AuthBarInput> 
//     <a key={{listEl.a}} id={{listEl.a}}>99+</a> 
//     <AnchorMain key={{listEl.a}} id={{listEl.a}} text='Test if' href='#{R}#signup'></AnchorMain>
//   //</PageColumn>
// {% } %}
// </ul>
// <ContextMenu 
// buttons='add:add|remove:Remove chat'
// onClick={{state.CM_onClick}}
// ownerId='CM_OwnerId'
// menuId='CM_MenuId'
// ></ContextMenu>
// {% if({{state.condition}}) { %}
// <AuthBarInput text='login'    type='text'     id='input_login'    value='Test if'></AuthBarInput> 
// {% } else { %}
// <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
// {% } %}
// {% if({{state.condition}}) { %}
// <AuthBarInput text='login'    type='text'     id='input_login'    value='Test if'></AuthBarInput> 
// {% } %}
// {% } else { %}
// <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
// <ContextMenu 
// buttons='add:Add chat|remove:Remove chat'
// onClick={{state.CM_onClick}}
// ownerId='CM_OwnerId'
// menuId='CM_MenuId'
// ></ContextMenu>
// `<PageColumn>
// <div class="right-click-area">
//   <div class="text">
//     Я - волшебный квадракул
//     <br>
//     Тыц правой кнопкой мышки!
//   </div>
//   <ContextMenu buttons='add:Add chat|remove:Remove chat' onClick={{state.contextMenuOnClick}}></ContextMenu>
// </div>
// <PageColumn>`
//# sourceMappingURL=testPage.js.map

/***/ }),

/***/ "./static/js/components/pages/userSettings/userSettings.js":
/*!*****************************************************************!*\
  !*** ./static/js/components/pages/userSettings/userSettings.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ UserSettings
/* harmony export */ });
/* harmony import */ var _components_UI_buttons_button_secondary_button_secondary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/UI/buttons/button-secondary/button-secondary.js */ "./static/js/components/UI/buttons/button-secondary/button-secondary.js");
/* harmony import */ var _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/UI/buttons/button-main/button-main.js */ "./static/js/components/UI/buttons/button-main/button-main.js");
/* harmony import */ var _components_auth_bar_bar_footer_bar_footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/auth-bar/bar__footer/bar__footer.js */ "./static/js/components/auth-bar/bar__footer/bar__footer.js");
/* harmony import */ var _components_user_settings_user_settings_bar_input_user_settings_bar_input_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/user-settings/user-settings-bar-input/user-settings-bar-input.js */ "./static/js/components/user-settings/user-settings-bar-input/user-settings-bar-input.js");
/* harmony import */ var _components_auth_bar_bar_content_bar_content_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/auth-bar/bar__content/bar__content.js */ "./static/js/components/auth-bar/bar__content/bar__content.js");
/* harmony import */ var _components_auth_bar_bar_header_bar_header_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/auth-bar/bar__header/bar__header.js */ "./static/js/components/auth-bar/bar__header/bar__header.js");
/* harmony import */ var _components_user_settings_user_settings_bar_user_settings_bar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/user-settings/user-settings-bar/user-settings-bar.js */ "./static/js/components/user-settings/user-settings-bar/user-settings-bar.js");
/* harmony import */ var _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/page-column/page-column.js */ "./static/js/components/page-column/page-column.js");
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");
/* harmony import */ var _router_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../router/utils.js */ "./static/js/router/utils.js");
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
//#Import








//#Import
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class UserSettings extends _component_Component_js__WEBPACK_IMPORTED_MODULE_8__.default {
    constructor() {
        super(...arguments);
        this.state = {
            logoutOnClick: this.logoutOnClick,
            first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
            second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
            phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
            oldPassword: '',
            newPassword: ''
        };
    }
    logoutOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let req = yield (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_10__.xhrPostLogout)();
            console.log('xhrPostLogout', req);
            if (req) {
                if (req.status === 200) {
                    (0,_router_utils_js__WEBPACK_IMPORTED_MODULE_9__.defaultPage)();
                }
            }
            else {
                alert(`Failed to execute log out`);
            }
        });
    }
    //#Components
components() {return {PageColumn: _components_page_column_page_column_js__WEBPACK_IMPORTED_MODULE_7__.default,UserSettingsBar: _components_user_settings_user_settings_bar_user_settings_bar_js__WEBPACK_IMPORTED_MODULE_6__.default,Bar__Header: _components_auth_bar_bar_header_bar_header_js__WEBPACK_IMPORTED_MODULE_5__.default,Bar__Content: _components_auth_bar_bar_content_bar_content_js__WEBPACK_IMPORTED_MODULE_4__.default,UserSettingsBarInput: _components_user_settings_user_settings_bar_input_user_settings_bar_input_js__WEBPACK_IMPORTED_MODULE_3__.default,Bar__Footer: _components_auth_bar_bar_footer_bar_footer_js__WEBPACK_IMPORTED_MODULE_2__.default,ButtonMain: _components_UI_buttons_button_main_button_main_js__WEBPACK_IMPORTED_MODULE_1__.default,ButtonSecondary: _components_UI_buttons_button_secondary_button_secondary_js__WEBPACK_IMPORTED_MODULE_0__.default}}
//#Components
template() {
        return (`<PageColumn>
        <UserSettingsBar>
          
          <Bar__Header text='User settings'></Bar__Header>
          
          <Bar__Content>
            <UserSettingsBarInput text='First name'       type='text'       id='input_first-name'   value={{state.first_name}} ></>                  
            <UserSettingsBarInput text='Second name'      type='text'       id='input_second-name'  value={{state.second_name}}  ></>                  
            <UserSettingsBarInput text='Login'            type='text'       id='input_login'        value={{state.login}}  ></>                  
            <UserSettingsBarInput text='Email'            type='email'      id='input_email'        value={{state.email}}  ></>                  
            <UserSettingsBarInput text='Phone'            type='tel'        id='input_phone'        value={{state.phone}}  ></>                  
            <UserSettingsBarInput text='Old password'     type='password'   id='input_old-password' value={{state.oldPassword}}  ></>                  
            <UserSettingsBarInput text='New password'     type='password'   id='input_new-password' value={{state.newPassword}}  ></>                  
          </Bar__Content>
          
          <Bar__Footer>
            <ButtonMain text='Save' id='button_save'></ButtonMain>
            <ButtonSecondary text='Log out' id='button_log-out' onClick={{state.logoutOnClick}}></ButtonSecondary>
          </Bar__Footer>
        
        </UserSettingsBar>
      </PageColumn>`);
    }
}
//# sourceMappingURL=userSettings.js.map

/***/ }),

/***/ "./static/js/components/user-settings/user-settings-bar-input/user-settings-bar-input.js":
/*!***********************************************************************************************!*\
  !*** ./static/js/components/user-settings/user-settings-bar-input/user-settings-bar-input.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class UserSettingsBarInput extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<div className='user-settings-bar-input'>
        <label className='user-settings-bar-input__label' for='user-settings-bar-input__input'>{{props.text}}</label>
        <input className='user-settings-bar-input__input' type={{props.type}} id={{props.id}} value={{props.value}}>
      </div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserSettingsBarInput);
//# sourceMappingURL=user-settings-bar-input.js.map

/***/ }),

/***/ "./static/js/components/user-settings/user-settings-bar/user-settings-bar.js":
/*!***********************************************************************************!*\
  !*** ./static/js/components/user-settings/user-settings-bar/user-settings-bar.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Component.js */ "./static/js/component/Component.js");

class UserSettingsBar extends _component_Component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    template() {
        return (`<form id='form__main' className='user-settings-bar'></div>`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserSettingsBar);
//# sourceMappingURL=user-settings-bar.js.map

/***/ }),

/***/ "./static/js/const/index.js":
/*!**********************************!*\
  !*** ./static/js/const/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "env": () => /* binding */ env
/* harmony export */ });
const env = {
    URL_REQUEST: 'https://ya-praktikum.tech/api/v2'
};

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/index.js":
/*!****************************!*\
  !*** ./static/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_build_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/build/index.css */ "./static/css/build/index.css");
/* harmony import */ var _router_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router/index.js */ "./static/js/router/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index.js */ "./static/js/utils/index.js");
/* harmony import */ var _DOMevents_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOMevents/index.js */ "./static/js/DOMevents/index.js");
/* harmony import */ var _router_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router/utils.js */ "./static/js/router/utils.js");
 /* created automatically */




// let a
// let b = "jjj"
// //process.env.NODE_ENV
(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.setUtils)();
(0,_router_index_js__WEBPACK_IMPORTED_MODULE_1__.startRouter)();
(0,_DOMevents_index_js__WEBPACK_IMPORTED_MODULE_3__.initDomEvents)();
startApp();
function startApp() {
    (0,_router_utils_js__WEBPACK_IMPORTED_MODULE_4__.defaultPage)(window.location.hash);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/router/Route.js":
/*!***********************************!*\
  !*** ./static/js/router/Route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = view;
        this._props = props;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        const root = document.querySelector(this._props.rootQuery);
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
    }
    match(pathname) {
        return pathname === this._pathname;
    }
    render() {
        const root = document.querySelector(this._props.rootQuery);
        const app = new this._blockClass(root);
        app.init(root);
        window.createValidateEvents();
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Route);
//# sourceMappingURL=Route.js.map

/***/ }),

/***/ "./static/js/router/Router.js":
/*!************************************!*\
  !*** ./static/js/router/Router.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => /* binding */ Router
/* harmony export */ });
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Route.js */ "./static/js/router/Route.js");

class Router {
    constructor(rootQuery = '') {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = '';
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new _Route_js__WEBPACK_IMPORTED_MODULE_0__.default(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        // На смену роута вызываем перерисовку
        window.addEventListener('popstate', ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this));
        return this;
    }
    renderPage(pathname) {
        this._onRoute(pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            console.error('Route not found:' + pathname);
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        window.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

//# sourceMappingURL=Router.js.map

/***/ }),

/***/ "./static/js/router/events.js":
/*!************************************!*\
  !*** ./static/js/router/events.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onRouteClick": () => /* binding */ onRouteClick
/* harmony export */ });
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router.js */ "./static/js/router/Router.js");

function onRouteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let href = null;
    for (let i = 0; i < e.path.length; i++) {
        const el = e.path[i];
        href = el.getAttribute('href');
        if (href && href.startsWith('#{R}')) {
            break;
        }
    }
    if (!href) {
        console.error('Route not found');
        return;
    }
    const router = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router();
    router.go(`${href === null || href === void 0 ? void 0 : href.slice(4)}`);
}
window.addEventListener("hashchange", function (e) {
    if (window.location.hash === '') {
        window.history.back();
    }
    else {
        const router = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router();
        router.renderPage(window.location.hash);
    }
}, false);
// window.addEventListener('popstate', function(e: Event) {
//   console.log('popstate', e)
// })
// window.addEventListener('beforeunload', function(e: Event) {
//   console.log('beforeunload', e)
// })
// window.addEventListener('unload', function(e: Event) {
//   console.log('unload', e)
// })

//# sourceMappingURL=events.js.map

/***/ }),

/***/ "./static/js/router/index.js":
/*!***********************************!*\
  !*** ./static/js/router/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRouter": () => /* binding */ startRouter
/* harmony export */ });
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router.js */ "./static/js/router/Router.js");
/* harmony import */ var _components_pages_login_login_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/pages/login/login.js */ "./static/js/components/pages/login/login.js");
/* harmony import */ var _components_pages_signup_signup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/pages/signup/signup.js */ "./static/js/components/pages/signup/signup.js");
/* harmony import */ var _components_pages_index_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/pages/index/index.js */ "./static/js/components/pages/index/index.js");
/* harmony import */ var _components_pages_chat_chat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/pages/chat/chat.js */ "./static/js/components/pages/chat/chat.js");
/* harmony import */ var _components_pages_userSettings_userSettings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/pages/userSettings/userSettings.js */ "./static/js/components/pages/userSettings/userSettings.js");
/* harmony import */ var _components_pages_error404_error404_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/pages/error404/error404.js */ "./static/js/components/pages/error404/error404.js");
/* harmony import */ var _components_pages_error500_error500_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/pages/error500/error500.js */ "./static/js/components/pages/error500/error500.js");
/* harmony import */ var _components_pages_testPage_testPage_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/pages/testPage/testPage.js */ "./static/js/components/pages/testPage/testPage.js");




//import SelectChat from '../components/pages/selectChat/selectChat.js'





function startRouter() {
    const router = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router('.app');
    router
        .use('/', _components_pages_index_index_js__WEBPACK_IMPORTED_MODULE_3__.default)
        .use('#login', _components_pages_login_login_js__WEBPACK_IMPORTED_MODULE_1__.default)
        .use('#signup', _components_pages_signup_signup_js__WEBPACK_IMPORTED_MODULE_2__.default)
        .use('#chat', _components_pages_chat_chat_js__WEBPACK_IMPORTED_MODULE_4__.default)
        .use('#error404', _components_pages_error404_error404_js__WEBPACK_IMPORTED_MODULE_6__.default)
        .use('#error500', _components_pages_error500_error500_js__WEBPACK_IMPORTED_MODULE_7__.default)
        .use('#userSettings', _components_pages_userSettings_userSettings_js__WEBPACK_IMPORTED_MODULE_5__.default)
        .use('#testPage', _components_pages_testPage_testPage_js__WEBPACK_IMPORTED_MODULE_8__.default)
        .start();
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/router/utils.js":
/*!***********************************!*\
  !*** ./static/js/router/utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultPage": () => /* binding */ defaultPage
/* harmony export */ });
/* harmony import */ var _xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xhr/xhrExecute.js */ "./static/js/xhr/xhrExecute.js");
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Router.js */ "./static/js/router/Router.js");


const defaultPage = (hash = '') => {
    if (hash === '') {
        (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_0__.xhrGetAuthUser)()
            .then(req => {
            if (!req) {
                throw 'Something went wrong';
            }
            if (req.status === 401) {
                window.location.hash = '#login';
                return;
            }
            else if (req.status > 400) {
                throw 'Something went wrong';
            }
            localStorage.setItem('id', req.response.id);
            localStorage.setItem('first_name', req.response.first_name);
            localStorage.setItem('second_name', req.response.second_name);
            localStorage.setItem('login', req.response.login);
            localStorage.setItem('email', req.response.email);
            localStorage.setItem('phone', req.response.phone);
            if (window.location.hash === '#chat') {
                const router = new _Router_js__WEBPACK_IMPORTED_MODULE_1__.Router();
                router.renderPage(window.location.hash);
            }
            else {
                window.location.hash = '#chat';
            }
        }, error => {
            (0,_xhr_xhrExecute_js__WEBPACK_IMPORTED_MODULE_0__.xhrOnError)(error);
        });
    }
    else {
        const router = new _Router_js__WEBPACK_IMPORTED_MODULE_1__.Router();
        router.renderPage(window.location.hash);
    }
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./static/js/utils/functions/copyObj.js":
/*!**********************************************!*\
  !*** ./static/js/utils/functions/copyObj.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyObj": () => /* binding */ copyObj
/* harmony export */ });
const copyObj = (obj) => {
    // if (Object.keys(a).length !== Object.keys(b).length) {
    //   return false
    // }
    //console.log('obj', obj)
    let res = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            res[key] = obj[key];
        }
        else if (Array.isArray(obj[key])) {
            //res[key] = obj[key].slice()
            res[key] = [];
            obj[key].forEach((item) => {
                res[key].push(copyObj(item));
            });
        }
        else {
            res[key] = obj[key];
        }
    }
    return res;
};
//# sourceMappingURL=copyObj.js.map

/***/ }),

/***/ "./static/js/utils/functions/get.js":
/*!******************************************!*\
  !*** ./static/js/utils/functions/get.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => /* binding */ get
/* harmony export */ });
const get = (obj, path, defaultValue) => {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
        if (result === undefined) {
            //|| result === null) {
            return defaultValue;
        }
    }
    if (result === null) {
        return null;
    }
    return result !== null && result !== void 0 ? result : defaultValue; // "??" — [оператор нуллевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифил)
};
//# sourceMappingURL=get.js.map

/***/ }),

/***/ "./static/js/utils/functions/index.js":
/*!********************************************!*\
  !*** ./static/js/utils/functions/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => /* reexport safe */ _get_js__WEBPACK_IMPORTED_MODULE_0__.get,
/* harmony export */   "isEqual": () => /* reexport safe */ _isEqual_js__WEBPACK_IMPORTED_MODULE_1__.isEqual,
/* harmony export */   "startsWithUpper": () => /* reexport safe */ _startsWithUpper_js__WEBPACK_IMPORTED_MODULE_2__.startsWithUpper,
/* harmony export */   "uid": () => /* reexport safe */ _uid_js__WEBPACK_IMPORTED_MODULE_3__.uid,
/* harmony export */   "regexpMatchAll": () => /* reexport safe */ _regexpMatchAll_js__WEBPACK_IMPORTED_MODULE_4__.regexpMatchAll,
/* harmony export */   "queryStringify": () => /* reexport safe */ _queryStringify_js__WEBPACK_IMPORTED_MODULE_5__.queryStringify,
/* harmony export */   "copyObj": () => /* reexport safe */ _copyObj_js__WEBPACK_IMPORTED_MODULE_6__.copyObj
/* harmony export */ });
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get.js */ "./static/js/utils/functions/get.js");
/* harmony import */ var _isEqual_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isEqual.js */ "./static/js/utils/functions/isEqual.js");
/* harmony import */ var _startsWithUpper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startsWithUpper.js */ "./static/js/utils/functions/startsWithUpper.js");
/* harmony import */ var _uid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uid.js */ "./static/js/utils/functions/uid.js");
/* harmony import */ var _regexpMatchAll_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./regexpMatchAll.js */ "./static/js/utils/functions/regexpMatchAll.js");
/* harmony import */ var _queryStringify_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./queryStringify.js */ "./static/js/utils/functions/queryStringify.js");
/* harmony import */ var _copyObj_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./copyObj.js */ "./static/js/utils/functions/copyObj.js");








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/utils/functions/isEqual.js":
/*!**********************************************!*\
  !*** ./static/js/utils/functions/isEqual.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEqual": () => /* binding */ isEqual
/* harmony export */ });
const isEqual = (a, b) => {
    if (a === null) {
        if (b !== null) {
            return false;
        }
        return true;
    }
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    let res = true;
    for (const key in a) {
        if (Array.isArray(a[key])) {
            if (!Array.isArray(b[key])) {
                return false;
            }
            if (a[key].lenght !== b[key].lenght) {
                return false;
            }
            for (let i = 0; i < a[key].lenght; i++) {
                res = isEqual(a[key][i], b[key][i]);
                if (!res) {
                    return res;
                }
            }
        }
        if (typeof a[key] === 'object') {
            res = isEqual(a[key], b[key]);
            if (!res) {
                return res;
            }
        }
        else if (a[key] !== b[key]) {
            return false;
        }
    }
    return res;
};
//# sourceMappingURL=isEqual.js.map

/***/ }),

/***/ "./static/js/utils/functions/queryStringify.js":
/*!*****************************************************!*\
  !*** ./static/js/utils/functions/queryStringify.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "queryStringify": () => /* binding */ queryStringify
/* harmony export */ });
const queryStringify = (data) => {
    if (!data) {
        return '';
    }
    let res = '';
    for (let [key, value] of Object.entries(data)) {
        res += `&${key}=${value}`;
    }
    if (res) {
        res = '?' + res.substr(1);
    }
    return res;
};
//# sourceMappingURL=queryStringify.js.map

/***/ }),

/***/ "./static/js/utils/functions/regexpMatchAll.js":
/*!*****************************************************!*\
  !*** ./static/js/utils/functions/regexpMatchAll.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "regexpMatchAll": () => /* binding */ regexpMatchAll
/* harmony export */ });
const regexpMatchAll = (str, TEMPLATE_REGEXP) => {
    let key = null;
    const res = [];
    // Важно делать exec именно через константу, иначе уйдёте в бесконечный цикл
    while ((key = TEMPLATE_REGEXP.exec(str))) {
        res.push(key);
    }
    return res;
};
//# sourceMappingURL=regexpMatchAll.js.map

/***/ }),

/***/ "./static/js/utils/functions/startsWithUpper.js":
/*!******************************************************!*\
  !*** ./static/js/utils/functions/startsWithUpper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startsWithUpper": () => /* binding */ startsWithUpper
/* harmony export */ });
const startsWithUpper = (str) => {
    str = str.trim();
    if (str.length === 0) {
        return false;
    }
    return str[0] === str[0].toUpperCase();
};
//# sourceMappingURL=startsWithUpper.js.map

/***/ }),

/***/ "./static/js/utils/functions/uid.js":
/*!******************************************!*\
  !*** ./static/js/utils/functions/uid.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uid": () => /* binding */ uid
/* harmony export */ });
function uidCount() {
    let uidCount = 0;
    return function () {
        uidCount++;
        return uidCount;
    };
}
const uid = uidCount();
//# sourceMappingURL=uid.js.map

/***/ }),

/***/ "./static/js/utils/index.js":
/*!**********************************!*\
  !*** ./static/js/utils/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setUtils": () => /* binding */ setUtils
/* harmony export */ });
/* harmony import */ var _functions_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/index.js */ "./static/js/utils/functions/index.js");
/* harmony import */ var _validate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validate/index.js */ "./static/js/utils/validate/index.js");


function setUtils() {
    window.startsWithUpper = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.startsWithUpper;
    window.get = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.get;
    window.uid = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.uid;
    window.getFormData = _validate_index_js__WEBPACK_IMPORTED_MODULE_1__.getFormData;
    window.createValidateEvents = _validate_index_js__WEBPACK_IMPORTED_MODULE_1__.createValidateEvents;
    window.isEqual = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.isEqual;
    window.regexpMatchAll = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.regexpMatchAll;
    window.queryStringify = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.queryStringify;
    window.copyObj = _functions_index_js__WEBPACK_IMPORTED_MODULE_0__.copyObj;
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/utils/validate/data.js":
/*!******************************************!*\
  !*** ./static/js/utils/validate/data.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormData": () => /* binding */ getFormData
/* harmony export */ });
/* harmony import */ var _methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods.js */ "./static/js/utils/validate/methods.js");

const getFormData = () => {
    let valid = true;
    let data = [];
    for (let form of document.forms) {
        for (let input of form.getElementsByTagName('input')) {
            const type = input.getAttribute('type');
            const currInputIsValid = (0,_methods_js__WEBPACK_IMPORTED_MODULE_0__.valueIsValid)(type, input.value);
            valid = valid && currInputIsValid;
            data.push({ name: getInputName(input.id),
                type,
                value: input.value,
                valid: currInputIsValid
            });
        }
    }
    return { valid, data };
};
function getInputName(id) {
    return id.slice(6).replace('-', '_');
}
//# sourceMappingURL=data.js.map

/***/ }),

/***/ "./static/js/utils/validate/events.js":
/*!********************************************!*\
  !*** ./static/js/utils/validate/events.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createValidateEvents": () => /* binding */ createValidateEvents
/* harmony export */ });
function createValidateEvents() {
    for (let form of document.forms) {
        form.addEventListener('submit', (e) => { submit(e); });
        for (let input of form.getElementsByTagName('input')) {
            input.addEventListener('focus', (e) => { focus(e); });
            input.addEventListener('blur', (e) => { blur(e); });
        }
    }
}
function submit(e) {
    e.preventDefault();
}
function blur(e) {
    e.preventDefault();
}
function focus(e) {
    e.preventDefault();
}

//# sourceMappingURL=events.js.map

/***/ }),

/***/ "./static/js/utils/validate/index.js":
/*!*******************************************!*\
  !*** ./static/js/utils/validate/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormData": () => /* reexport safe */ _data_js__WEBPACK_IMPORTED_MODULE_0__.getFormData,
/* harmony export */   "createValidateEvents": () => /* reexport safe */ _events_js__WEBPACK_IMPORTED_MODULE_1__.createValidateEvents
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./static/js/utils/validate/data.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events.js */ "./static/js/utils/validate/events.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./static/js/utils/validate/methods.js":
/*!*********************************************!*\
  !*** ./static/js/utils/validate/methods.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "valueIsValid": () => /* binding */ valueIsValid
/* harmony export */ });
function valueIsValid(type, val) {
    //return validateText(val)
    let res = true;
    switch (type) {
        case 'text':
            res = validateText(val);
            break;
        case 'login':
            res = validateLogin(val);
            break;
        case 'name':
            res = validateName(val);
            break;
        case 'mail':
            res = validateEmail(val);
            break;
        case 'phone':
            res = validatePhone(val);
            break;
        case 'password':
            res = validatePassword(val);
            break;
        default:
            break;
    }
    return res;
}
function validateText(val) {
    return val.length > 0;
}
function validateLogin(val) {
    return /^[a-zA-Z\-\_]+$/.test(val);
}
function validateName(val) {
    return /^[a-zA-Z\s]+$/.test(val);
}
function validateEmail(val) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
}
function validatePhone(val) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val);
}
function validatePassword(val) {
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{4,}$/.test(val);
}

//# sourceMappingURL=methods.js.map

/***/ }),

/***/ "./static/js/xhr/HTTPTransport.js":
/*!****************************************!*\
  !*** ./static/js/xhr/HTTPTransport.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTTPTransport": () => /* binding */ HTTPTransport
/* harmony export */ });
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
    METHODS["PUT"] = "PUT";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
class HTTPTransport {
    constructor() {
        this.get = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        this.DELETE = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }), options.timeout);
        };
        // options:
        // headers — obj
        // data — obj
        // withCredentials — boolean
        this.request = (url, options, timeout = 5000) => {
            const { method, data, headers, withCredentials } = options;
            url += method === METHODS.GET ? window.queryStringify(data) : '';
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    //console.log(xhr)
                    // if (xhr.status >= 400){
                    //   throw Error (`Не удалось выполнить запрос, статус ${xhr.status}`)
                    // }
                    resolve(xhr);
                };
                xhr.timeout = timeout;
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (headers) {
                    for (let [key, value] of Object.entries(headers)) {
                        xhr.setRequestHeader(key, value);
                    }
                }
                else {
                    xhr.setRequestHeader('content-type', 'application/json');
                }
                if (withCredentials) {
                    xhr.withCredentials = withCredentials;
                }
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
    }
}
//# sourceMappingURL=HTTPTransport.js.map

/***/ }),

/***/ "./static/js/xhr/xhrExecute.js":
/*!*************************************!*\
  !*** ./static/js/xhr/xhrExecute.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xhrPostCreateChat": () => /* binding */ xhrPostCreateChat,
/* harmony export */   "xhrGetChats": () => /* binding */ xhrGetChats,
/* harmony export */   "xhrPostUsersSearh": () => /* binding */ xhrPostUsersSearh,
/* harmony export */   "xhrGetAuthUser": () => /* binding */ xhrGetAuthUser,
/* harmony export */   "xhrPostAuthSignUp": () => /* binding */ xhrPostAuthSignUp,
/* harmony export */   "xhrPostAuthSignin": () => /* binding */ xhrPostAuthSignin,
/* harmony export */   "xhrPostLogout": () => /* binding */ xhrPostLogout,
/* harmony export */   "xhrPostChatsToken": () => /* binding */ xhrPostChatsToken,
/* harmony export */   "xhrPutChatUsers": () => /* binding */ xhrPutChatUsers,
/* harmony export */   "xhrOnError": () => /* binding */ xhrOnError
/* harmony export */ });
/* harmony import */ var _const_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/index.js */ "./static/js/const/index.js");
/* harmony import */ var _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HTTPTransport.js */ "./static/js/xhr/HTTPTransport.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const xhrPostCreateChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.post(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/chats`, { withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrGetChats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.get(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/chats`, { withCredentials: true,
            headers: { 'content-type': 'application/json' }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrPostUsersSearh = (searchString) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.post(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/user/search`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data: { login: searchString }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrGetAuthUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.get(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/auth/user`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json' }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrPostAuthSignUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.post(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/auth/signup`, {
            data,
            withCredentials: true,
            headers: { 'content-type': 'application/json' }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrPostAuthSignin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.post(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/auth/signin`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrPostLogout = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.post(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/auth/logout`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json'
            }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrPostChatsToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.post(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/chats/token/:${data.id}`, {
            withCredentials: true,
            headers: { 'content-type': 'application/json'
            }
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrPutChatUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const httpTransport = new _HTTPTransport_js__WEBPACK_IMPORTED_MODULE_1__.HTTPTransport();
        const req = yield httpTransport.put(`${_const_index_js__WEBPACK_IMPORTED_MODULE_0__.env.URL_REQUEST}/chats/users`, { withCredentials: true,
            headers: { 'content-type': 'application/json' },
            data
        });
        return req;
    }
    catch (error) {
        xhrOnError(error);
    }
});
const xhrOnError = (error = null) => {
    console.error('xhrExecute:' + error);
};
//# sourceMappingURL=xhrExecute.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./static/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.ac03db9560140372a0a0.js.map