'use strict'(async () => {
  await execute()
  console.log('makeCSS done')
})()

async function execute() {
  const cliProgress = require('cli-progress')
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

  const FileHound = require('filehound')
  const fs = require('fs')
  const path = require('path')

  const appRoot = require('app-root-path')

  const filePathsTS = await FileHound.create()
    .paths(`${appRoot.path}ts/components`)
    .ext('ts')
    .find()

  progressBar.start(filePathsTS.length - 1, 0)

  for (let i = 0; i < filePathsTS.length; i++) {
    const filePathTS = filePathsTS[i]

    const pathParseTS = path.parse(filePathTS)

    const filePathsCSS = await FileHound.create()
      .paths(pathParseTS.dir)
      .ext('css')
      .find()

    if (filePathsCSS.length === 0) {
      fs.writeFileSync(`${pathParseTS.dir}/${pathParseTS.name}.css`, '')
      // console.log(`file: ${pathParseTS.base}.scc was created in dir: ${pathParseTS.dir}`)
    }
    progressBar.update(i)
  }

  progressBar.stop()
}
