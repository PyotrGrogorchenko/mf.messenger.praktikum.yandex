import compiler from './compiler'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('example.txt', { name: 'Alice' })
  const output = stats.toJson({ source: true }).modules[0].source
  expect(output).toContain('export default "Hey Alice!\\n"')
})
