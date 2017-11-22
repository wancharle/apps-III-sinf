var express = require('express')
var router = express.Router()
var bd = require('./bd')

function listarPessoas(req, res, next) {
    bd.getPessoas(function(err,rows){
        res.json(rows)
   })
}

function criarPessoaViaPost(req,res,next){ // /pessoa/
    id = req.body.id
    nome = req.body.nome
    data = req.body.data
    if (id == undefined || nome == undefined || data == undefined){
        res.status(400).send('Erro: informe todos os parametros(id, nome e data) de Pessoa')
        return
    }
    bd.inserePessoa(id,nome,data,function(err,pessoa){
       if (err)
           res.status(500).json(err)
       else
           res.json(pessoa)
    })
}

function criarPessoaViaGet(req,res,next){ // /pessoa/?id=9&nome=teste&data=20-11-2017
    id = req.query.id
    nome = req.query.nome
    data = req.query.data
    if (id == undefined || nome == undefined || data == undefined){
        res.status(400).send('Erro: informe todos os parametros(id, nome e data) de Pessoa')
        return
    }
    bd.inserePessoa(id,nome,data,function(err,pessoa){
       if (err)
           res.status(500).json(err)
       else
           res.json(pessoa)
    })
}

function createPessoa(req,res,next){
    es.send("ok") 
}

// amarra algumas urls com as funções CRUD respectivas 
router.get('/', listarPessoas)
router.post('/create', criarPessoaViaPost)
router.get('/create',criarPessoaViaGet)
// exporta o roteador de urls dos enderecos crud da tabela pessoas
module.exports = router;
