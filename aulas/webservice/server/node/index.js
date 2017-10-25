const express = require('express')
const app = express()

function liberaAcesso(res){
    res.header('Access-Control-Allow-Origin', '*')
    res.header( 'Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
}

function paginaInicial(req, res) {
      liberaAcesso(res)
      res.send('Olá mundo!')
}

app.get('/',paginaInicial); //configura a url "/" da pagina inicial do webservice

app.listen(3000)
