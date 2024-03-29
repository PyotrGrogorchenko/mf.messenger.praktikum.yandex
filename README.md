# [Messanger](https://ya-mf-messanger.herokuapp.com/)&middot; [![Deploy](https://img.shields.io/badge/deploy-v5.1.1-success)](https://ya-mf-messanger.herokuapp.com/) [![gpp-templator](https://img.shields.io/badge/gpp--templator-v1.x-success)](https://www.npmjs.com/package/gpp-templator) [![gpp-loader](https://img.shields.io/badge/gpp--loader-v1.x-success)](https://www.npmjs.com/package/gpp-loader) [![Fligma](https://img.shields.io/badge/fligma-v1.0-success)](https://www.figma.com/file/G8Nrm7vN2ijZqRR2zBlyUc/messanger?node-id=0%3A1) 

Individual training project from Yandex.praktikum: middle frontend developer. 

* **Task:** Implement project in native javascript/typescript, to learn the basics of web development.

* **Result:** During development, the Сomponent class was implemented, from which the application components are inherited. The Class and its auxiliary objects were separated into a separate subsystem and published as [gpp-templator](https://www.npmjs.com/package/gpp-templator). In gpp-components, you must import and export the Components used in the template. It is inconvenient to do this manually and clutters up the code. To automate this, [gpp-loader](https://www.npmjs.com/package/gpp-loader) for [webpack](https://github.com/webpack/webpack) is implemented.

## Install

> node 14.x

```bash
$ npm install
// development
$ npm run dev
// production
$ npm run prod
$ npm run start

```
## Credits

* [PyotrGrogorchenko](https://github.com/PyotrGrogorchenko) - Developer
