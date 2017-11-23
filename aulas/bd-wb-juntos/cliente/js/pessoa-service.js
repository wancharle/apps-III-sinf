angular.module('PessoaService',[]).factory('PessoaService',['$http', function($http){

   var service = {}
   var URL_do_servidor = "http://127.0.0.1:8000"

   // Função callback  que é chamada em caso de error
   function cb_error(response){ 
    	alert("Erro: " + response.data)
   }

   // As funções C.R.U.D do service são: 
   // - Create (inserePessoa)
   // - Read (getPessoas e getPessoa)
   // - Update (atualizaPessoa)
   // - Delete (deletePessoa)
   function getPessoas(cb_sucesso){
     $http.get(URL_do_servidor+"/pessoa").then(cb_sucesso,cb_error)
   }

   function getPessoa(id_pessoa,cb_sucesso){
     $http.get(URL_do_servidor+"/pessoa/"+id_pessoa).then(cb_sucesso,cb_error)
   }

   function deletePessoa(id_pessoa,cb_sucesso){
	 var parametros = {id:id_pessoa}
     $http.post(URL_do_servidor+"/pessoa/delete",parametros).then(cb_sucesso,cb_error)
   }

   function inserePessoa(id_pessoa,nome,data,cb_sucesso){
	 var parametros = {id:id_pessoa,nome:nome,data:data}
     $http.post(URL_do_servidor+"/pessoa/create",parametros).then(cb_sucesso,cb_error)
   }

   function atualizaPessoa(id_pessoa,nome,data,cb_sucesso){
	 var parametros = {id:id_pessoa,nome:nome,data:data}
     $http.post(URL_do_servidor+"/pessoa/update/"+id_pessoa,parametros).then(cb_sucesso,cb_error)
   }

   // Registra as funções C.R.U.D locais no service PessoaService
   service.getPessoas = getPessoas 
   service.getPessoa = getPessoa
   service.deletePessoa = deletePessoa
   service.inserePessoa = inserePessoa
   service.atualizaPessoa = atualizaPessoa
   return service

}]);


