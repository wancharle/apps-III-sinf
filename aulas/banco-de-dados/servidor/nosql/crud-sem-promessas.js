// inporta biblioteca para conectar ao servidor nosql mongodb
var MongoClient = require('mongodb').MongoClient

var urlBanco = 'mongodb://localhost/bancoteste';
MongoClient.connect(urlBanco, function(err, db){
  if (err) {
     console.log(err)
  } else {
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
	    colecaoUsuarios.insertMany(listaDeUsuarios,function(err,result){
		    if (err) {console.log(err); return }
		   
            // remove o usuario 8
            colecaoUsuarios.deleteOne({id:8},function(err,result){
		        if (err) {console.log(err); return }
                
                // Atualiza o horario do usuario 9 para  '00:00:00'
                colecaoUsuarios.updateOne({id:9},{ $set:{horario:'00:00:00'}},function(err,result){
		            if (err) {console.log(err); return }
                    
                    // Realiza uma consulta para imprimir os usuarios cadastrados no banco
		            colecaoUsuarios.find({},function (err,usuarios){
		                if (err) {console.log(err); return }
                        
                        // imprime os usuarios encontrados no banco
                        usuarios.forEach(function(u){
                            console.log("Usuario id="+u.id, "data='"+u.horario+"'");                                                          
                        })

                        // remove a coleção usuarios (equivalente a um drop table)
                        colecaoUsuarios.drop(function(err,result){
		                   if (err) {console.log(err); return }
		                   
                           //fecha conexao com o banco
                           db.close() 
                        }) // fim drop
                    }) // fim find
                }) // fim updateOne
            }) // fim deleteOne
        }) // fim insertMany
  
  } // fim do else do MongoClient.connect
}) // fim do Mongoclient.connect

