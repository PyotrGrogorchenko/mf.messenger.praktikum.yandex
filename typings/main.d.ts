type Indexed<T = number | string | boolean | undefined> = {
  [key: string]: T | Indexed
}

type LooseObject = {
  [key: string]: any
}
