class WS {
    // userid: string = ''
    // chatid:string = ''
    // token: string = ''
    constructor(userid, chatid, token) {
        this.socket = null;
        this.onOpen = undefined;
        this.onClose = undefined;
        this.onMessage = undefined;
        this.onError = undefined;
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userid}/${chatid}/${token}`);
        this.initEvents();
    }
    initEvents() {
        var _a, _b, _c, _d;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.addEventListener('open', () => {
            console.log('Соединение установлено');
            if (this.onOpen)
                this.onOpen();
        });
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            }
            else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            if (this.onClose)
                this.onClose(event);
        });
        (_c = this.socket) === null || _c === void 0 ? void 0 : _c.addEventListener('message', (event) => {
            if (this.onMessage)
                this.onMessage(event);
        });
        (_d = this.socket) === null || _d === void 0 ? void 0 : _d.addEventListener('error', (event) => {
            console.log('Ошибка', event);
            if (this.onError)
                this.onError(event);
        });
    }
    send(content, type = 'message') {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
            content,
            type
        }));
    }
}
export { WS };
//# sourceMappingURL=WebSoket.js.map