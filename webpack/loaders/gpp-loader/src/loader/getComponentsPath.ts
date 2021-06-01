import fs from 'fs'
import { This } from '../types'

export const getComponentsPath = function (this: This, componentsDir: string) {
  const componentsPath: LooseObject = {}

  const compilerOptions = this._compiler.options
  const context = `${compilerOptions.context}${componentsDir === '' ? '' : `/${componentsDir}`}`

  const readDir = (root: string, dir: string) => {
    const rootDir = `${root}${dir === '' ? '' : `/${dir}`}`
    const files = fs.readdirSync(rootDir, { withFileTypes: true })
    let entry: string = ''
    let isComponent: boolean = false
    files.forEach((item) => {
      if (item.isFile()) {
        if (item.name === 'index.ts') {
          entry = 'index.ts'
        } else if (item.name.endsWith('.gpp.ts')) {
          isComponent = true
          if (entry === '') {
            entry = item.name
          }
        }
      } else {
        readDir(rootDir, item.name)
      }
    })

    if (isComponent) {
      componentsPath[dir] = `${rootDir}/${entry}`
    }
  }

  readDir(context, '')

  return componentsPath
}
