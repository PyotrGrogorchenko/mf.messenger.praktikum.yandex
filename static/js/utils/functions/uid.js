function uidCount() {
    let uidCount = -1;
    return function () {
        uidCount++;
        return uidCount;
    };
}
export const uid = uidCount();
//# sourceMappingURL=uid.js.map