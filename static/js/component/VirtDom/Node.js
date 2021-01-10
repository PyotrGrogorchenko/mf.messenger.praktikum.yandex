const _REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
class Node {
    constructor() {
        this._isNew = true;
        this.uid = '';
        this.uidNum = 0;
        this.key = '';
        this.textContent = '';
        this.textContentIsChanged = false;
        this.level = 0;
        this.owner = null;
        this.header = '';
        this.tagName = '';
        this.isComponent = false;
        this.props = {};
        this.componentLink = null;
        this.root = null;
        this.changedProps = [];
        this.element = null;
    }
    setContentProps(data) {
        const oldTextConent = this.textContent;
        let { content } = data;
        if (!content) {
            this.textContent = content;
            this.textContentIsChanged = false;
        }
        window.regexpMatchAll(content, _REGEXP_PARAM).forEach(function (param) {
            if (param[1]) {
                content = content.replace(param[0], window.get(data, param[1], ''));
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
    setUid() {
        this.uid = this.uidNum.toString();
        if (this.key) {
            this.uid = this.uid + `_${this.key}`;
        }
    }
    get isNew() { return this._isNew; }
    set isNew(value) { this._isNew = value; }
}
export { Node };
//# sourceMappingURL=Node.js.map