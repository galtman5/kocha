const express = require('express')
const kanji = require('./Kanji')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/get-sentences/:kanjis', (req, res) => res.json(kanji.test(req.params.kanjis)))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
