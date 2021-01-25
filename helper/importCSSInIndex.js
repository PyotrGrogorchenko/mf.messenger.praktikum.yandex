"use strict";

(async () => {
  await execute()
  console.log('importCssInIndex done')
})()

async function execute() {

  const appRoot = require('app-root-path')
  const fs = require('fs')
 
  let fileContent = fs.readFileSync(appRoot.path + '/static/js/index.js', 'utf-8')

  if (fileContent.split(/\n/)[0].trim().endsWith('/* created automatically */')) {
    return
  }

  let data = `import '../css/build/index.css' /* created automatically */\n`
  fileContent = data.concat(fileContent)

  fs.writeFileSync(appRoot.path + `/static/js/index.js`, fileContent)

}