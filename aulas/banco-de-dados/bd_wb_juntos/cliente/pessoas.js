angular.module('PessoaService',[]).factory('PessoaService',['$http', function($http){
   var service = {}
   var URL_do_servidor = "http://127.0.0.1:8000"

   function cb_error(response,status){ // função callback  ue é chamada em caso de error
    alert("Erro ao acessar webservice:" + response.statusText + status)
   }

   function getPessoas(cb_sucesso){
     $http.get(URL_do_servidor+"/pessoa").then(cb_sucesso,cb_error)
   }

   function getPessoa(id_pessoa,cb_sucesso){
     $http.get(URL_do_servidor+"/pessoa/"+id_pessoa).then(cb_sucesso,cb_error)
   }

   function deletePessoa(id_pessoa,cb_sucesso){
     $http.post(URL_do_servidor+"/pessoa/delete",{id:id_pessoa}).then(cb_sucesso,cb_error)
   }



   service.getPessoas = getPessoas 
   service.getPessoa = getPessoa
   service.deletePessoa = deletePessoa
   return service
}]);


