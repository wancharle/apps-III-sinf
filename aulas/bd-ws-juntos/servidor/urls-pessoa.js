var express = require('express')
var router = express.Router()

// Importa o DAO (Data Access Object) da tabela Pessoa
var dao = require('./dao-pessoa')

function getPessoas(req, res, next) {
    dao.getPessoas(function(err,rows){
        res.json(rows)
    })
}

function getPessoa(req,res,next){
    dao.getPessoa(req.params.id,function(err,pessoa){
        res.json(pessoa)
    })
}

function deletePessoa(req,res,next){
    dao.deletePessoa(req.body.id,function(err,result){ 
        res.send('ok')
	})
}

function atualizaPessoa(req,res,next){
	// obtem parâmetros post do formulário
	id = req.body.id
	nome = req.body.nome
	data = req.body.data
	
	// atualiza a pessoa no banco de dados
    dao.atualizaPessoa(id,nome,data,function(err,pessoa){
        res.send('ok')
    })
}

function inserePessoa(req,res,next){
	// obtem parâmetros post do formulário
    id = req.body.id
    nome = req.body.nome
    data = req.body.data

    if (id == undefined || nome == undefined || data == undefined){
        res.status(400).send('informe todos os parametros(id, nome e data) de Pessoa')
        return
    }

    dao.inserePessoa(id,nome,data,function(err,pessoa){
       if (err)
		   if (err.errno == 19) // pessoa ja existe com esse id
           		res.status(500).send("já existe uma pessoa com esse mesmo id (id="+id+")")
		   else
			   res.status(500).json(err)
       else
           res.send("ok")
    })
}

// amarra algumas urls com as funções CRUD respectivas 
router.get('/', getPessoas)
router.get('/:id/', getPessoa)
router.post('/create', inserePessoa)
router.post('/update/:id/', atualizaPessoa)
router.post('/delete',deletePessoa)

// exporta o roteador de urls dos enderecos crud da tabela pessoas
module.exports = router;
