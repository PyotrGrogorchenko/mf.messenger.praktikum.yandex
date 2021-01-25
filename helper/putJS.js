"use strict";

(async () => {
  await execute()
  console.log('putJS done')
})()

async function execute() {

  const cliProgress = require('cli-progress')
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
   
  const FileHound = require('filehound')
  const fs = require('fs')
  
  const appRoot = require('app-root-path')
  const { executionAsyncResource } = require('async_hooks')
  
  const filePaths = await FileHound.create()
                  .paths(appRoot.path + '/static/js')
                  .discard('node_modules')
                  .ext('js')
                  .find()
  
  progressBar.start(filePaths.length - 1, 0)
  
  for (let i = 0; i < filePaths.length; i++){
    const filePath = filePaths[i]
    const data = fs.readFileSync(filePath, 'utf8')
    
    if (data.match(/import .* from/g)) {
      let newData = data.replace(/(import .* from\s+['"])(.*)(?=['"])/g, '$1$2.js')
  
      //console.log(`writing to ${filepath}`)
      fs.writeFileSync(filePath, newData)
      //console.log(`${filepath} complete`)
    }

    progressBar.update(i)

  }

  progressBar.stop()

}
