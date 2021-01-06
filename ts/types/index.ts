type Indexed<T = number | string | boolean | undefined> = {
  [key: string]: T | Indexed;
}

interface LooseObject {
  [key: string]: any
}
