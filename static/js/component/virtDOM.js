import { PARSER_TYPES } from './parser.js';
var NODE_ACTION;
(function (NODE_ACTION) {
    NODE_ACTION[NODE_ACTION["NEW"] = 0] = "NEW";
    NODE_ACTION[NODE_ACTION["UPDATE"] = 1] = "UPDATE";
    NODE_ACTION[NODE_ACTION["NO_ACTION"] = 2] = "NO_ACTION";
})(NODE_ACTION || (NODE_ACTION = {}));
class Node {
    constructor() {
        this.uid = 0;
        this.key = '';
        this.level = 0;
        this.owner = null;
        this.header = '';
        this.tagName = '';
        this.content = '';
        this.isComponent = false;
        this.props = {};
        this.componentLink = null;
        this.root = null;
        this.action = NODE_ACTION.NEW;
    }
}
class StackItems {
    constructor() {
        this._stack = [];
    }
    add(item) {
        this._stack.push(item);
    }
    get length() { return this._stack.length; }
    getItemByIndex(index) {
        return this._stack[index];
    }
}
class VirtDom {
    constructor() {
        this._nodes = Array();
        this._getOwner = this._func_getOwner();
        //_isUpdate: () => boolean = !this._nodes
        this._currentUid = 0;
        this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
    }
    compile(parsedTemplate, state, props) {
        for (let i = 0; i < parsedTemplate.length; i++) {
            const item = parsedTemplate[i];
            if (item.type === PARSER_TYPES.CODE) {
                i = this._compileCode(item, state, props, parsedTemplate, i);
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
    getNodeByUidKey(uid, key) {
        //console.log('key', key, 'uid', uid)
        for (let i = 0; i < this._nodes.length; i++) {
            let node = this._nodes[i];
            if //((!key && node.uid === uid) || (key && node.key === key && node.uid === uid))
             (node.uid === uid) {
                return node;
                break;
            }
        }
        return null;
    }
    static getTagName(str) {
        const begin = 0;
        const end = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ');
        return str.slice(begin, end);
    }
    _compileItem(item, state, props) {
        switch (item.type) {
            case PARSER_TYPES.END:
                this._closeTag();
                break;
            case PARSER_TYPES.TEXT:
                this._addNode(item, state, props);
                break;
            case PARSER_TYPES.BEGIN:
                this._addNode(item, state, props);
                break;
            default:
                throw new Error(`Tree: error initializing the tree for: ${item.type} ${item.content}`);
        }
        //console.log(this._nodes)
    }
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
    _addNode(item, state, props) {
        //item.content, item.type
        if (item.type === PARSER_TYPES.BEGIN) {
            ////const key = this._getKey(item, props)
            //console.log('item', item.content, 'props', props, 'state', state)
            const node_tagName = VirtDom.getTagName(item.content);
            const node_props = this._getHeaderProps(item.content, node_tagName, state, props);
            let node = this.getNodeByUidKey(item.uid, node_props.key);
            //console.log('foundNode', {...node}, 'item', item, item.uid, node_props.key)
            if (node) {
                node.action = NODE_ACTION.NO_ACTION;
            }
            else {
                node = new Node();
                this._nodes.push(node);
            }
            //let node: Node = new Node()
            node.owner = this._getOwner('add', node);
            node.tagName = node_tagName;
            node.isComponent = this._setSignComponent(node.tagName);
            node.header = item.content;
            this._setLevel(node);
            node.props = node_props;
            //this._setHeaderProps(node, state, props)  
            node.uid = item.uid;
            this._setKey(node);
            // node.key = node.props.key
            // if (!node.key && node.owner) {
            //   node.key = node.owner.props.key
            // }
            //console.log(node, 'node_props', node_props)
        }
        else if (item.type === PARSER_TYPES.TEXT) {
            let owner = this._getOwner('', null);
            if (owner && !owner.isComponent) {
                owner.content = this._setContentProps(item.content, state, props);
            }
        }
    }
    // _setNodesAction(node: Node, action: NODE_ACTION){
    // }
    // _getKey(item: PARSER_NODE, props: any): string{
    //   let content = item.content
    //   console.log('item.content', content, props)
    //   let res: string = ''
    //   if (props.key){
    //     res = props.key
    //   }
    //   return res
    // }
    _compileCode(itemBegin, state, props, parsedTemplate, i) {
        let code = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim();
        if (code.startsWith('for')) {
            return this._compileCode__cycle_for(itemBegin, state, props, parsedTemplate, i);
        }
        else if (code.startsWith('if')) {
            return this._compileCode__if(itemBegin, state, props, parsedTemplate, i);
        }
        eval(code);
        return i;
    }
    _compileCode__cycle_for(itemBegin, state, props, _parsedTemplate, i_general) {
        //const $stackItems: StackItems = new StackItems()
        //const $stackItems:Array<PARSER_NODE> = []
        // let items: Array<PARSER_NODE>
        // let param: any 
        // let regExp: RegExp
        const cycleData = { ctx: {}, cycle: {} };
        const ctx = cycleData.ctx;
        const cycle = cycleData.cycle;
        ctx.state = state;
        ctx.props = props;
        let code = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim();
        // cycle \\
        cycle.code = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(';');
        const begin = cycle.code[0].trim().split(' ').filter((item) => item);
        ctx.param_i = Number(begin[3]);
        const condition = cycle.code[1].trim().split(' ').filter((item) => item);
        cycle.sign = condition[1];
        cycle.right = window.get(ctx, condition[2], 0);
        let step = cycle.code[2].trim();
        step = step.replace(begin[1], '');
        cycle.step = step;
        // cycle //
        for (ctx.param_i; this._compare(ctx.param_i, cycle.sign, cycle.right); ctx.param_i = ctx.param_i + this._inc(cycle.step)) {
            console.log(ctx.param_i);
        }
        console.log(cycleData);
        i_general++;
        // for($i; $i < $parsedTemplate.length; $i++) {
        //   const $item: PARSER_NODE = $parsedTemplate[$i]
        //   if ($item.type === PARSER_TYPES.CODE) {
        //     $code = $code + '\n' + $item.content.slice(2, $item.content.indexOf('%}')).trim() 
        //     break
        //   } 
        //   $stackItems.add($item)
        //   //$stackItems.push($item)
        //   $code = $code + '\n' + 
        //   ` 
        //     //item = {...$stackItems[${$stackItems.length - 1}]}
        //     item = {...$stackItems.getItemByIndex(${$stackItems.length - 1})}
        //     //if (item.type === PARSER_TYPES.BEGIN) {
        //       console.log('item', {...item}, '$stackItems', {...$stackItems})
        //     //}
        //     window.regexpMatchAll(item.content, this._REGEXP_PARAM).forEach(function(param) {
        //       if (param[1] && !param[1].startsWith('state') && !param[1].startsWith('props')) {
        //         const quote = item.type === PARSER_TYPES.TEXT ? '' : '"'
        //         item.content = item.content.replace(param[0], quote + eval(param[1]) + quote)
        //       }
        //     })`
        //   $code = $code + '\n' + `  this._compileItem(item, state, props)`
        // }
        // eval($code)
        return i_general;
        // const $stackItems: StackItems = new StackItems()
        // //const $stackItems:Array<PARSER_NODE> = []
        // let item: PARSER_NODE 
        // let param: any 
        // let regExp: RegExp
        // let $code: string = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim() 
        // $i++
        // for($i; $i < $parsedTemplate.length; $i++) {
        //   const $item: PARSER_NODE = $parsedTemplate[$i]
        //   if ($item.type === PARSER_TYPES.CODE) {
        //     $code = $code + '\n' + $item.content.slice(2, $item.content.indexOf('%}')).trim() 
        //     break
        //   } 
        //   $stackItems.add($item)
        //   //$stackItems.push($item)
        //   $code = $code + '\n' + 
        //   ` 
        //     //item = {...$stackItems[${$stackItems.length - 1}]}
        //     item = {...$stackItems.getItemByIndex(${$stackItems.length - 1})}
        //     //if (item.type === PARSER_TYPES.BEGIN) {
        //       console.log('item', {...item}, '$stackItems', {...$stackItems})
        //     //}
        //     window.regexpMatchAll(item.content, this._REGEXP_PARAM).forEach(function(param) {
        //       if (param[1] && !param[1].startsWith('state') && !param[1].startsWith('props')) {
        //         const quote = item.type === PARSER_TYPES.TEXT ? '' : '"'
        //         item.content = item.content.replace(param[0], quote + eval(param[1]) + quote)
        //       }
        //     })`
        //   $code = $code + '\n' + `  this._compileItem(item, state, props)`
        // }
        // eval($code)
        // return $i
    }
    _compileCode__if($itemBegin, state, props, $parsedTemplate, $i) {
        const $stackItems = [];
        let item;
        let param;
        let regExp;
        let $code = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim();
        $i++;
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
        return $i;
    }
    _compare(left, sign, right) {
        switch (sign) {
            case '<': return left < right;
            case '<=': return left <= right;
            case '>': return left > right;
            case '>=': return left >= right;
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
        this._getOwner('remove', null);
    }
    _setLevel(node) {
        let level = window.get(node, 'owner.level', -1);
        level++;
        node.level = level;
    }
    _getHeaderProps(header, tagName, state, props) {
        //let header: string = node.header;
        const node_props = {};
        const cacheTxt = {};
        let count = 1;
        window.regexpMatchAll(header, /[\'\"](.*?)[\'\"]/gi).forEach(function (txt) {
            if (txt[0]) {
                cacheTxt[`text${count}`] = txt[0];
                header = header.replace(txt[0], `text${count}`);
                count++;
            }
        });
        header.split(' ').forEach(keyValue => {
            if (!keyValue || keyValue === tagName) {
                return;
            }
            const arrKeyValue = keyValue.split('=');
            if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
                arrKeyValue[1] = cacheTxt[arrKeyValue[1]];
            }
            const param = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1]);
            if (arrKeyValue[0] === 'className') {
                const strClasses = param ? window.get(state, props, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '');
                node_props.classes = strClasses.split(' ');
            }
            else if (arrKeyValue.length === 1) {
                node_props[arrKeyValue[0]] = '#noValue';
            }
            else if (param) {
                node_props[arrKeyValue[0]] = eval(param[1]);
            }
            else {
                node_props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '');
            }
        });
        return node_props;
    }
    _setContentProps(content, state, props) {
        if (!content) {
            return content;
        }
        window.regexpMatchAll(content, this._REGEXP_PARAM).forEach(function (param) {
            if (param[1]) {
                content = content.replace(param[0], eval(param[1]));
            }
        });
        return content;
    }
    _setSignComponent(tagName) {
        return window.startsWithUpper(tagName);
    }
    _setKey(node) {
        node.key = node.props.key;
        if (!node.key && node.owner) {
            node.key = node.owner.props.key;
            if (node.content.indexOf('key=') < 0) {
                node.header += ' key="' + node.key + '"';
                node.props.key = node.key;
            }
        }
    }
}
export { VirtDom, Node, NODE_ACTION };
//# sourceMappingURL=virtDOM.js.map