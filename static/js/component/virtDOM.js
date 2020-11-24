import { PARSER_TYPES } from './parser.js.js.js.js.js';
//declare const window: any
// interface LooseObject {
//   [key: string]: any
// }
class Node {
    constructor() {
        this.uid = 0;
        this.level = 0;
        this.owner = null;
        this.header = '';
        this.tagName = '';
        this.content = '';
        this.isComponent = false;
        this.props = {};
        this.componentLink = null;
        this.root = null;
    }
}
class VirtDom {
    // _uid: () => number = this._uidCount()
    constructor(parsedTemplate, state, props) {
        //this._nodes = []
        //this._id = this._func_id()
        //this._getOwner = this._func_getOwner() 
        this._nodes = Array();
        this._getOwner = this._func_getOwner();
        this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
        //this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi
        this.init(parsedTemplate, state, props);
    }
    init(parsedTemplate, state, props) {
        //parsedTemplate.forEach(item => {
        for (let i = 0; i < parsedTemplate.length; i++) {
            const item = parsedTemplate[i];
            //this._compileItem(item, state, props, parsedTemplate, i)
            if (item.type === PARSER_TYPES.CODE) {
                const iObj = { i };
                this._compileCode(item, state, props, parsedTemplate, iObj);
                i = iObj.i;
            }
            else {
                this._compileItem(item, state, props);
            }
        }
    }
    getIsComponent() {
        return this._nodes.filter(node => node.isComponent === true);
    }
    getNodes() {
        return this._nodes;
    }
    static getTagName(str) {
        const begin = 0;
        const end = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ');
        return str.slice(begin, end);
    }
    // _uidCount(): () => number {
    //   let uidCount: number = -1
    //   return function(): number {
    //     uidCount++
    //     return uidCount
    //   }
    // }
    _compileItem(item, state, props) {
        switch (item.type) {
            case PARSER_TYPES.END:
                this._closeTag();
                break;
            case PARSER_TYPES.TEXT:
                this._addNode(item.content, item.type, state, props);
                break;
            case PARSER_TYPES.BEGIN:
                this._addNode(item.content, item.type, state, props);
                break;
            default:
                throw new Error(`Tree: ошибка при инициализвции дерева для: ${item.type} ${item.content}`);
        }
    }
    // _func_id() {
    //   let id = -1
    //   return function() {
    //     id++
    //   return id
    //   }
    // }
    _func_getOwner() {
        const ownersStack = Array();
        return function (command = '', node = null) {
            let res = null;
            if (command === 'remove') {
                ownersStack.pop();
            }
            else if (ownersStack.length > 0) {
                res = ownersStack[ownersStack.length - 1];
            }
            if (command === 'add') {
                ownersStack.push(node);
            }
            return res;
        };
    }
    // _createNode() {
    //   return Node
    //   //{
    //   //   uid: window.uid(),
    //   //   level: null,
    //   //   owner: null,
    //   //   header: null,
    //   //   tagName: null,
    //   //   content: null,
    //   //   isComponent: false,
    //   //   props: {classes: []},
    //   //   componentLink: null
    //   // }
    // }
    _addNode(header, type, state, props) {
        if (type === PARSER_TYPES.BEGIN) {
            //let node = this._createNode()
            let node = new Node();
            node.owner = this._getOwner('add', node);
            node.tagName = VirtDom.getTagName(header);
            node.isComponent = this._setSignComponent(node.tagName);
            node.header = header;
            node.uid = window.uid();
            this._setLevel(node);
            this._setHeaderProps(node, state, props);
            this._nodes.push(node);
        }
        else if (type === PARSER_TYPES.TEXT) {
            let owner = this._getOwner('', null);
            if (owner && !owner.isComponent) {
                owner.content = this._setContentProps(header, state, props);
            }
        }
    }
    _compileCode(itemBegin, state, props, parsedTemplate, iObj) {
        let code = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim();
        if (code.startsWith('for') || code.startsWith('while')) {
            this._compileCode__cycle(itemBegin, state, props, parsedTemplate, iObj);
            return;
        }
        else if (code.startsWith('if')) {
            this._compileCode__if(itemBegin, state, props, parsedTemplate, iObj);
            return;
        }
        eval(code);
    }
    _compileCode__cycle($itemBegin, state, props, $parsedTemplate, $iObj) {
        const $stackItems = [];
        let item;
        let param;
        let regExp;
        let $code = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim();
        let $i = $iObj.i + 1;
        for ($i; $i < $parsedTemplate.length; $i++) {
            const $item = $parsedTemplate[$i];
            if ($item.type === PARSER_TYPES.CODE) {
                $code = $code + '\n' + $item.content.slice(2, $item.content.indexOf('%}')).trim();
                break;
            }
            $stackItems.push($item);
            $code = $code + '\n' +
                ` item = {...$stackItems[${$stackItems.length - 1}]}
        param = null
        //regExp = new RegExp(this._REGEXP_PARAM)
        while ((param = new RegExp(this._REGEXP_PARAM).exec(item.content))) {
          if (param[1] && !param[1].startsWith('state') && !param[1].startsWith('props')) {
            item.content = item.content.replace(param[0], '"' + eval(param[1]) + '"')
          }
        }`;
            $code = $code + '\n' + `  this._compileItem(item, state, props)`;
        }
        //console.log($code)
        eval($code);
        $iObj.i = $i;
    }
    _compileCode__if($itemBegin, state, props, $parsedTemplate, $iObj) {
        const $stackItems = [];
        let item;
        let param;
        let regExp;
        let $code = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim();
        let $i = $iObj.i + 1;
        for ($i; $i < $parsedTemplate.length; $i++) {
            const $item = $parsedTemplate[$i];
            if ($item.type === PARSER_TYPES.CODE) {
                const $middleCode = $item.content.slice(2, $item.content.indexOf('%}')).trim();
                $code = $code + '\n' + $middleCode;
                if ($middleCode.indexOf('else') > 0) {
                    continue;
                }
                break;
            }
            $stackItems.push($item);
            $code = $code + '\n' +
                ` item = $stackItems[${$stackItems.length - 1}]`;
            $code = $code + '\n' + `  this._compileItem(item, state, props)`;
        }
        //console.log($code)
        eval($code);
        $iObj.i = $i;
    }
    _closeTag() {
        this._getOwner('remove', null);
    }
    _setLevel(node) {
        let level = window.get(node, 'owner.level', -1);
        level++;
        node.level = level;
    }
    _setHeaderProps(node, state, props) {
        let header = node.header;
        const cacheTxt = {};
        let txt;
        //const regExp: RegExp = new RegExp(/[\'\"](.*?)[\'\"]/gi)
        let count = 1;
        while ((txt = new RegExp(/[\'\"](.*?)[\'\"]/gi).exec(header))) {
            if (txt[0]) {
                cacheTxt[`text${count}`] = txt[0];
                header = header.replace(txt[0], `text${count}`);
                count++;
            }
        }
        header.split(' ').forEach(keyValue => {
            if (!keyValue || keyValue === node.tagName) {
                return;
            }
            const arrKeyValue = keyValue.split('=');
            if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
                arrKeyValue[1] = cacheTxt[arrKeyValue[1]];
            }
            const param = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1]);
            if (arrKeyValue[0] === 'className') {
                const strClasses = param ? window.get(state, props, param[1], '') : arrKeyValue[1].replace(/"/g, '');
                node.props.classes = strClasses.split(' ');
            }
            else if (arrKeyValue.length === 1) {
                node.props[arrKeyValue[0]] = '#noValue';
            }
            else if (param) {
                node.props[arrKeyValue[0]] = eval(param[1]);
            }
            else {
                node.props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '');
            }
        });
    }
    _setContentProps(content, state, props) {
        if (!content) {
            return content;
        }
        let param;
        //const regExp: RegExp = new RegExp(this._REGEXP_PARAM)
        while ((param = new RegExp(this._REGEXP_PARAM).exec(content))) {
            if (param[1]) {
                content = content.replace(param[0], eval(param[1]));
            }
        }
        return content;
    }
    _setSignComponent(tagName) {
        return window.startsWithUpper(tagName);
    }
}
export { VirtDom, Node };
//# sourceMappingURL=virtDOM.js.map