const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', (request, res) => {
  res.status(200).sendFile('index.html', { root: path.join(__dirname, './dist') })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}!`)
})
