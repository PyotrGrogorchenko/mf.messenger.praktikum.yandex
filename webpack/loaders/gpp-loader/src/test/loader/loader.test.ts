import 'core-js/stable'
import 'regenerator-runtime/runtime'

import compiler from './compiler'

test('Loader import test', async () => {
  const stats = await compiler('Index.gpp.ts', { componentsDir: 'components' })
  // @ts-ignore
  const output = stats.toJson({ source: true }).modules[0].source
  expect(output).toBe('export default "Hey Alice!"')
})
