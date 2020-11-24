"use strict";

const FileHound = require('filehound');
const fs = require('fs');
const path = require('path');

var appRoot = require('app-root-path');
//var myModule = require(appRoot + '/lib/my-module.js');

//console.log('importer', appRoot.path)


const files = FileHound.create()
  .paths(appRoot.path + '/ts/components')
  //.discard(['node_modules', '__test__', 'component'])
  .ext('ts')
  .find();

files.then((filePaths) => {
  //console.log(path.basename(filePaths, '.ts'))
  filePaths.forEach((filepath) => {
    
    const pathParse = path.parse(filepath)
    
    console.log(pathParse.dir, pathParse.name) 


    //console.log(path.parse(filepath))
    //     fs.readFile(filepath, 'utf8', (err, data) => {
    //  path.parse('/home/user/dir/file.txt')

//       if (!data.match(/import .* from/g)) {
//         return
//       }
//       let newData = data.replace(/(import .* from\s+['"])(.*)(?=['"])/g, '$1$2.js')
//       if (err) throw err;

//       console.log(`writing to ${filepath}`)
//       fs.writeFile(filepath, newData, function (err) {
//         if (err) {
//           throw err;
//         }
//         console.log(`${filepath} complete`);
//       });
//     })

  })

});