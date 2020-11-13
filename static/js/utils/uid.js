// function uidCount() {
//   let uidCount: number = -1
//   return function() {
//     uidCount++
//   return uidCount
//   }
// }
function uidCount() {
    let uidCount = -1;
    return function () {
        uidCount++;
        return uidCount;
    };
}
const uid = uidCount();
export { uid };
//# sourceMappingURL=uid.js.map