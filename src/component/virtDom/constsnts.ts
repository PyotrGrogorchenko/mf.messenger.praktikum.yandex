export const regExpParam: RegExp = /\{\{(.*?)\}\}/gi

export const primitives: LooseObject = {
  null: { value: null },
  true: { value: true },
  false: { value: false },
  undefined: { value: undefined }
}
