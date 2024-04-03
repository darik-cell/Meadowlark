const express = require('express')
const { engine: expressHandlebars } = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()

app.engine('.hbs', expressHandlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

if(require.main === module) {
  app.listen(port, () => {
    console.log(`Express запущен на http://localhost:${port}; нажмите ctrl+c для завершения.`)
  })
} else {
  module.exports = app
}