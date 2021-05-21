import fs from 'fs'
import { LooseObject, This } from './types'

export const getComponentsPath = function (this: This) {
  const componentsPath: LooseObject = {}

  const compilerOptions = this._compiler.options
  const context = `${compilerOptions.context}/components`

  const readDir = (root: string, dir: string) => {
    const rootDir = `${root}${dir === '' ? '' : `/${dir}`}`
    const files = fs.readdirSync(rootDir, { withFileTypes: true })
    let entry: string = ''
    let isComponent: boolean = false
    files.forEach((item) => {
      if (item.isFile()) {
        if (item.name === 'index.ts') {
          entry = 'index.ts'
        } else if (item.name.endsWith('.ppg.ts')) {
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
