'use strict'(async () => {
  await execute()
  console.log('importCssInIndex done')
})()

async function execute() {
  const appRoot = require('app-root-path')
  const fs = require('fs')

  // in the begin
  let fileContent = fs.readFileSync(`${appRoot.path}/static/js/index.js`, 'utf-8')
  if (fileContent.split(/\n/)[0].trim().endsWith('/* created automatically */')) {return}
  const data = 'import \'../css/build/index.css\' /* created automatically */\n'
  fileContent = data.concat(fileContent)

  // in the end
  // let data = `\nimport '../css/build/index.css' /* created automatically */\n`
  // const fcVar = fileContent.split(/\n/)
  // for (let i=1; i<fcVar.length; i++){
  //   if (fcVar[i].startsWith('import')) { continue }
  //   if (fcVar[i-1].endsWith('/* created automatically */')) { break }
  //   fcVar[i-1] = fcVar[i-1].concat(data)
  //   break
  // }
  // fileContent = ''
  // for (let i=0; i<fcVar.length; i++){
  //   fileContent = fileContent.concat(`${fcVar[i]}\n`)
  // }

  fs.writeFileSync(`${appRoot.path}/static/js/index.js`, fileContent)
}
