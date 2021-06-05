import { setErr } from '@store'

export const throwError = (message: string, status: number = 404) => {
  setErr({ message, status })
}
