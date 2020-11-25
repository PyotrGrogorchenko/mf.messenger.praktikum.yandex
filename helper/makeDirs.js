"use strict";

const FileHound = require('filehound');
const fs = require('fs');
const path = require('path');

var appRoot = require('app-root-path');

const filesTS = FileHound.create()
  .paths(appRoot.path + '/ts/components')
  .ext('ts')
  .find();

filesTS.then((filePathsTS) => {
  filePathsTS.forEach((filePathTS) => {
    
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
  })
})