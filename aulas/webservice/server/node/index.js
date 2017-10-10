const express = require('express')
const app = express()

function paginaInicial(req, res) {
      res.send('Olá mundo!')
}

app.get('/',paginaInicial); //configura a url "/" da pagina inicial do webservice

app.listen(3000)
