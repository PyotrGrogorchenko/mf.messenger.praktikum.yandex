export type This = {
  resourcePath: string
  _compiler: any
} & NodeModule

export type Messages = {
  errors: string[]
  warnings: string[]
}

export type Props = {
  options: any
  resourcePath: string
  componentsPath: LooseObject,
  source: string,
  tmpl: string,
  components: string[]
  messages: Messages
}
