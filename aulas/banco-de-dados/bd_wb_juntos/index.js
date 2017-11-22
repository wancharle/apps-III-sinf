var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var path = require('path')

var URLs_pessoa = require('./servidor/pessoas')
var bd = require('./servidor/bd')

// inicializa banco de dados
bd.inicializa()

var app = express()

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// liberando acesso cross-origin
app.use(cors())

// hospeda o conteudo estático (html,css,js,img,audio, etc) da pasta client
app.use(express.static(path.join(__dirname, 'cliente')))                                                                    

function paginaInicial(req,res){
  res.redirect("/pessoas.html")
}

// configurando urls
app.get('/',paginaInicial) 
app.use('/pessoa', URLs_pessoa)

// configura o web service para escutar requisições na porta 8000
// quando em producao use a porta 80
app.listen(8000, function () {
      console.log('Webservice rodando em http://127.0.0.1:8000/ !')
})
