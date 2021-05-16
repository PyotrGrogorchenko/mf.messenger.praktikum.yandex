'use strict'(async () => {
  await execute()
  console.log(' importComponentsJS done')
})()

async function execute() {
  const FileHound = require('filehound')
  const fs = require('fs')
  const path = require('path')

  const appRoot = require('app-root-path')

  const filePaths = await FileHound.create()
    .paths(`${appRoot.path}/static/js/components`)
    .ext('js')
    .find()

  const fileClass = {}
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i]
    const pathParse = { ...path.parse(filePath) }

    pathParse.dir = pathParse.dir.slice(pathParse.dir.indexOf('components'))

    fileClass[getClassName(pathParse.name)] = pathParse
  }

  const cliProgress = require('cli-progress')
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  progressBar.start(filePaths.length - 1, 0)

  for (let i = 0; i < filePaths.length; i++) {
    progressBar.update(i)

    const filePath = filePaths[i]
    const pathParse = path.parse(filePath)

    // if (pathParse.base !== 'mw__search-user.js') {
    //   continue
    // }

    let data = fs.readFileSync(filePath, 'utf8')
    const templIndex = data.indexOf('template()')

    let templ = data.slice(templIndex).replace(/\n/g, '')
    templ = new RegExp(/[\`](.*?)[\`]/g).exec(templ)[1]

    const components = []
    const regExp = new RegExp(/[<][A-Z0-9](.*?)[a-zA-Z0-9][\s>]/g)

    let txt
    while ((txt = regExp.exec(templ))) {
      const component = txt[0].slice(1, txt[0].length - 1)
      if (components.indexOf(component) === -1) {
        components.push(component)
      }
    }

    // console.log(components, templ)

    if (components.length === 0) {
      continue
    }

    data = data.replace(/\/\/#Import(.*?)\/\/#Import\n/gs, '')
    data = data.replace(/\/\/#Components(.*?)\/\/#Components\n/gs, '')

    const importBegin = pathParse.dir.slice(pathParse.dir.indexOf('components')).split('/')
      .reduce((res) => `${res}../`, '')

    data = `//#Import\n${data}`

    components.forEach((component) => {
      const pathParsecomponent = fileClass[component]
      if (!pathParsecomponent) {
        console.error(` pathParse.base: ${pathParse.base} Not found component ${component}`)
        return
      }

      data = `import ${component} from '${importBegin}${pathParsecomponent.dir}/${pathParsecomponent.base}'\n${data}`
    })
    data = `//#Import\n${data}`

    let funcComonents = '//#Components\n'
    funcComonents += `components() {return {${components.toString()}}}\n`
    funcComonents += '//#Components\n'

    data = data.replace('template()', `${funcComonents}template()`)

    fs.writeFileSync(filePath, data)
  }

  progressBar.stop()
}

function getClassName(fileName) {
  let result = fileName

  result = result.split('__').reduce((res, item) => res + (res === '' ? '' : '__') + item[0].toUpperCase() + item.slice(1), '')

  result = result.split('-').reduce((res, item) => res + item[0].toUpperCase() + item.slice(1), '')

  // console.log(fileName, result)

  return result
}
