export const isEqual = (a, b) => {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    let res = true;
    // for (const key in a){
    //   if (typeof a[key]  === 'object'){
    //     res = isEqual(a[key], b[key])
    //     if (!res){
    //       return res
    //     }
    //   } else if (a[key] !== b[key]){
    //     res = false
    //     break
    //   }
    // }
    return res;
};
//# sourceMappingURL=isEqual.js.map