angular.module('PessoaService',[]).factory('PessoaService',['$http', function($http){

   var service = {}
    var db = null;
   function cb_error(error){ 
       console.log(error);
       alert("Erro: "+error);
   }


   function inicializaBancoDeDados(){
       db = window.sqlitePlugin.openDatabase({name: 'bancoCrud.db', location: 'default'});
       db.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS pessoa (id INT unique not null, nome TEXT, dataNasc TEXT)")
       },function(error){
                console.log(error)
                console.log("^^^^^^^^ ERROR BANCO ^^^^^^^")
        },function(){ console.log("---> BANCO INICIALIZADO")}
       )
   }

   function getPessoas(cb_sucesso){
     db.transaction(function(tx){
        tx.executeSql('SELECT * FROM pessoa',[],cb_sucesso,cb_error);
     });
   }

   function getPessoa(id_pessoa,cb_sucesso){
     db.transaction(function(tx){
        tx.executeSql('SELECT * FROM pessoa WHERE id=?',[id_pessoa],cb_sucesso,cb_error);
     });
 
   }

   function deletePessoa(id_pessoa,cb_sucesso){
	   db.transaction(function(tx){
            if (id_pessoa == "null" || id_pessoa == null)
            tx.executeSql("DELETE FROM pessoa WHERE id IS NULL",[])
            else
            tx.executeSql("DELETE FROM pessoa WHERE id=?",[id_pessoa])
       },cb_error,cb_sucesso)
   }

   function inserePessoa(id_pessoa,nome,data,cb_sucesso){
       db.transaction(function(tx){
            tx.executeSql("INSERT INTO pessoa VALUES (?,?,?)",[id_pessoa,nome,data]);
       },cb_error,cb_sucesso)
   }

   function atualizaPessoa(id_pessoa,nome,data,cb_sucesso){
     db.transaction(function(tx){
            tx.executeSql("UPDATE pessoa SET nome=?,dataNasc=? WHERE id=?",[nome,data,id_pessoa]);
       },cb_error,cb_sucesso)
   }

   document.addEventListener('deviceready', function() {
    inicializaBancoDeDados()
   });


   service.getPessoas = getPessoas 
   service.getPessoa = getPessoa
   service.deletePessoa = deletePessoa
   service.inserePessoa = inserePessoa
   service.atualizaPessoa = atualizaPessoa
   service.inicializaBancoDeDados= inicializaBancoDeDados;
   return service

}]);


