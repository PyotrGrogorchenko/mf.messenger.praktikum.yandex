'use strict'

(async () => {
  await execute()
  console.log('importComponentsCSS done')
})()

async function execute() {

  const cliProgress = require('cli-progress')
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  
  const FileHound = require('filehound')
  const fs = require('fs')
  const path = require('path')
  
  const appRoot = require('app-root-path')
  
  const filePaths = await FileHound.create()
                        .paths(appRoot.path + '/static/css/components')
                        .ext('css')
                        .find()
  
  
  progressBar.start(filePaths.length - 1, 0)

  let data = '/* created automatically */'

  for (let i = 0; i < filePaths.length; i++){  
    const filePath = filePaths[i]

    const pathParse = path.parse(filePath)
    
    data += `\n@import '../components/${pathParse.base}';` 
    fs.writeFileSync('static/css/build/components.css', data)

    progressBar.update(i)
  
  } 

  progressBar.stop()

}