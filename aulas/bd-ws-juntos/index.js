var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var path = require('path')

var URLs_pessoa = require('./servidor/urls-pessoa')
var dao = require('./servidor/dao-pessoa')

// Inicializa banco de dados (cria tabelas se nao existir)
dao.inicializaBancoDeDados()

// Instância do servidor 
var app = express()

// Configura o servidor para processar parametros POST de formulários
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Libera acesso cross-origin das urls do servidor
app.use(cors())

// Configura a hospedagem de conteúdo estático(html,css,js,img,audio,etc) na pasta client
app.use(express.static(path.join(__dirname, 'cliente')))                                                                    

// Função que responde pelas requisições para a url "/" (paginaInicial) 
function paginaInicial(req,res){
  res.redirect("/pessoas.html") // redireciona para pagina estática "pessoas.html"
}

// Configura as urls aceitas pelo  servidor
app.get('/',paginaInicial) 
app.use('/pessoa', URLs_pessoa)

// Configura o web service para escutar requisições na porta 8000
app.listen(8000, function () {
  console.log('WebService rodando em http://127.0.0.1:8000/ !')
})
