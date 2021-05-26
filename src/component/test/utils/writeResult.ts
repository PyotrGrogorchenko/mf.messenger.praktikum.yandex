import fs from 'fs'
import path from 'path'
import { html_beautify } from 'js-beautify'
import { TMPL_DIR, RES_DIR } from '../env'

export const writeResult = (fileName: string, templateName: string, data: string) => {
  try {
    fs.accessSync(RES_DIR)
  } catch {
    fs.mkdirSync(RES_DIR)
  }
  const template = fs.readFileSync(path.resolve(`${TMPL_DIR}/${templateName}`), 'utf8')
  fs.writeFileSync(path.resolve(`${RES_DIR}/${fileName}`), html_beautify(template.replace('{data}', data)))
}
