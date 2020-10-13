let inputs = document.getElementsByTagName('input')
let res = {}
for (let i = 0; i < inputs.length; ++i) {
  let input = inputs[i];
  if (!input.value) {
    continue
  }
  res[i] = input
} 
console.log(res)