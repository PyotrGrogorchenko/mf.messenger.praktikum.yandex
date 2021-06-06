export const consoleDebug = (...args: any[]) => {
  // eslint-disable-next-line no-console
  if (IS_DEV) console.log('[console-debug]', ...args)
}
