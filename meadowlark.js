const express = require('express')
const { engine: expressHandlebars } = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

app.engine('.hbs', expressHandlebars({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() })
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(`Express запущен на http://localhost:${port}; нажмите ctrl+c для завершения.`))