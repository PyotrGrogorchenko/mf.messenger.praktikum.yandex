import 'core-js/stable'
import 'regenerator-runtime/runtime'

import compiler from './compiler'

test('Loader component Bb', async () => {
  const stats = await compiler('components/Bb/Bb.gpp.ts', { componentsDir: 'components' })
  const statsJson = stats.toJson({ source: true })
  if (statsJson.modules) {
    const output = statsJson.modules[0].source
    expect(output).toMatchSnapshot()
  }
})

test('Loader index', async () => {
  const stats = await compiler('Index.gpp.ts', { componentsDir: 'components' })
  const statsJson = stats.toJson({ source: true })
  if (statsJson.modules) {
    const output = statsJson.modules[0].source
    expect(output).toMatchSnapshot()
  }
})
