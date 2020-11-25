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
    const arrDirTS = pathParseTS.dir.split('/')
    const dirTS = arrDirTS.length ? arrDirTS[arrDirTS.length - 1] : ''

    const filesCSS = FileHound.create()
     .paths(pathParseTS.dir)
     .ext('css')
     .find();

    let cssFound = false
    filesCSS
    .then((filePathsCSS) => {
      filePathsCSS.forEach((filePathCSS) => {
        
        // const pathParseCSS = path.parse(filePathCSS)
        // const arrDirCSS = pathParseCSS.dir.split('/')
        // const dirCSS = arrDirCSS.length ? arrDirCSS[arrDirCSS.length - 1] : ''
        
        // console.log(dirCSS, dirTS)

        // if (dirCSS !== dirTS){
        //   // fs.renameSync(filepathTS, `${newDir}/${pathParseTS.base}`)
        //   // console.log(`file: ${pathParseTS.base} was moved to dir: ${newDir}`)
  
        //   console.log(dirCSS)
        // }

        cssFound = true
      })
    }).finally (() => {
      if (!cssFound) {
        fs.writeFileSync(`${pathParseTS.dir}/ ${pathParseTS.name}.css`, '')
        console.log(`file: ${pathParseTS.base}.scc was created in dir: ${pathParseTS.dir}`)
      }  
    })

    //console.log(filesCSS)

    // if (dir !== pathParse.name) {
    //   const newDir = `${pathParse.dir}/${pathParse.name}`
    //   try {
    //     fs.statSync(newDir);
    //     fs.renameSync(filepath, `${newDir}/${pathParse.base}`)
    //     console.log(`file: ${pathParse.base} was moved to dir: ${newDir}`)
    //   } catch (err) {
    //     if (err.code === 'ENOENT') {
    //       fs.mkdirSync(newDir)
    //       console.log(`Was added dir: ${newDir}`)
    //       fs.renameSync(filepath, `${newDir}/${pathParse.base}`)
    //       console.log(`file ${pathParse.base} was moved to new dir`)
    //     }
    //   }      
    // }  
  })
})