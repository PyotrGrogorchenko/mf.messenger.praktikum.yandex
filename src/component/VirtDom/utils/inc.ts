export const inc = (step: string): number => {
  switch (step) {
    case '++': return 1
    case '--': return -1
    default:
      throw new Error('Step error')
  }
}
