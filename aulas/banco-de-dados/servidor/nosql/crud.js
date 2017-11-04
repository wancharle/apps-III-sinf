// inporta biblioteca para conectar ao servidor nosql mongodb
var MongoClient = require('mongodb').MongoClient

// função para facilitar a abertura do banco nosql
// ela cria uma 'Promessa' que é um padrão que ajuda no desenvolvimento assincrono e evita o "Callback hell"
function openNOSQLdb(nomeDoBanco){
	var urlBanco = 'mongodb://localhost/'+nomeDoBanco;
    return new Promise(function(resolve, reject){
        MongoClient.connect(urlBanco, function(err, db){
            if (err) {
                reject(err)
            } else {
                resolve(db)
            }
        })
    })
}
var banco = null;
var colecaoUsuarios = null;

// conecta ao bancoteste ou cria um banco com esse nome se ele nao existir
openNOSQLdb("bancoteste") 
	.then(function (db){
		// salva-se uma copia da variavel db pois ela será usada depois em outro contexto
		banco = db;

		// Obtem ou cria uma coleção usuarios (uma coleção em nosql é similar ao conceito de uma tabela em sql)
		// observe que não foi necessario definir a estrutura de campos/colunas da coleção como
		// seria necessário para uma tabela de um banco sql
		colecaoUsuarios = db.collection('usuarios')

		// cria uma lista com dados de  10 usuarios de exemplo
		var listaDeUsuarios = []
		for (var i = 1; i <= 10; i++) {
			 var data = new Date();
			 var horario= data.toLocaleTimeString();
			 listaDeUsuarios.push({id:i,horario:horario})
		}
		// insere os usuarios no banco atraves do metodo insertMany (que insere mais de um registro de uma vez)
		// para inserir apenas um registro use a função insertOne em vez da insertMany
		return colecaoUsuarios.insertMany(listaDeUsuarios)
	})
	.then(function(){ 
		// remove o usuario 8
		return colecaoUsuarios.deleteOne({id:8})
	})
	.then(function(){ 
		// Atualiza o horario do usuario 9 para  '00:00:00'
		return colecaoUsuarios.updateOne({id:9},{ $set:{horario:'00:00:00'}})
	})
	.then(function(){ 
		// Realiza uma consulta para imprimir os usuarios cadastrados no banco
		return colecaoUsuarios.find({})
	})
	.then(function(usuarios){ 
		// imprime os usuarios encontrados no banco
		usuarios.forEach(function(u){
			console.log("Usuario id="+u.id, "data='"+u.horario+"'");                                                          
		})
		// remove a coleção usuarios (equivalente a um drop table)
		return colecaoUsuarios.drop();
	})
	.then(function(){
		//fecha conexao com o banco
		banco.close();
	})
	.catch(function (err){
		console.log(err)
	})


