// import 'core-js/stable'
import 'regenerator-runtime/runtime'
// import fs from 'fs'
// import path from 'path'
// import { html_beautify } from 'js-beautify'
import { TestElements } from './example/TestElements.gpp'
import { getRoot, writeResult } from './utils'

// const getRoot = () => document.createElement('div')

test('Component => TestElements', async () => {
  const root = getRoot()
  const app = new TestElements()
  app.init(root)
  writeResult('testElements.html', 'template.html', root.innerHTML)
  expect(root.innerHTML).toMatchSnapshot()
})
