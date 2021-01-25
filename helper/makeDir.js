"use strict";

(async () => {
  await execute()
  console.log('makeDir done')
})()

async function execute() {

  const cliProgress = require('cli-progress')
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  
  const FileHound = require('filehound')
  const fs = require('fs')
  const path = require('path')
  
  const appRoot = require('app-root-path')
  
  const filePathsTS = await FileHound.create()
                  .paths(appRoot.path + 'ts/components')
                  .ext('ts')
                  .find()
  
  progressBar.start(filePathsTS.length - 1, 0)

  for (let i = 0; i < filePathsTS.length; i++){
    const filePathTS = filePathsTS[i]

    const pathParseTS = path.parse(filePathTS)
      
    const arrDir = pathParseTS.dir.split('/')
    const dir = arrDir.length ? arrDir[arrDir.length - 1] : ''
  
    if (dir !== pathParseTS.name) {
      const newDir = `${pathParseTS.dir}/${pathParseTS.name}`
      try {
        fs.statSync(newDir);
        fs.renameSync(filepathTS, `${newDir}/${pathParseTS.base}`)
        console.log(`file: ${pathParseTS.base} was moved to dir: ${newDir}`)
      } catch (err) {
        if (err.code === 'ENOENT') {
          fs.mkdirSync(newDir)
          console.log(`Was added dir: ${newDir}`)
          fs.renameSync(filepathTS, `${newDir}/${pathParseTS.base}`)
          console.log(`file ${pathParseTS.base}.ts was moved to new dir`)
        }
      }      
    }  
    
    progressBar.update(i)
  
  }

  progressBar.stop()

}  

