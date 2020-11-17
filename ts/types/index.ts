type Indexed<T = number | string | boolean | undefined> = {
  [key in string]: T | Indexed;
}

interface LooseObject {
  [key: string]: any
}
