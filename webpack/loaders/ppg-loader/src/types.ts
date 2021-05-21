export type This = {
  resourcePath: string
  context: string
  _compiler: any
} & NodeModule

export type LooseObject = {
  [key: string]: any
}
