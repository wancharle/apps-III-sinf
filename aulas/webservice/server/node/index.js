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
      res.send('Olá Mundo Javascript!')
}

app.get('/',paginaInicial); 

app.listen(3000)
