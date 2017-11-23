var modulo = angular.module('tarefasApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]
);

modulo.run(function($transform) {
  window.$transform = $transform;
});

modulo.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'tarefas.html', reloadOnSearch: false});
});



function controlador($rootScope,$scope) {

        var contexto = this;

        contexto.tarefas = []
        contexto.tarefas.push({texto:'Aprender angular', feita:true});
        contexto.tarefas.push({texto:'Construir um app Angular.js', feita:false});

        contexto.adicionaTarefa = function() {
          contexto.tarefas.push({texto:contexto.textoTarefa, feita:false});
          contexto.textoTarefa = '';
        };

        contexto.restantes = function() {
          var count = 0;
          angular.forEach(contexto.tarefas, function(tarefa) {
            count += tarefa.feita ? 0 : 1;
          });
          return count;
        };

        contexto.arquiva = function() {
          var tarefasAntigas = contexto.tarefas;
          contexto.tarefas = [];
          angular.forEach(tarefasAntigas, function(tarefa) {
            if (!tarefa.feita) contexto.tarefas.push(tarefa);
          });
        };


  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });


      }

modulo.controller('ControladorListaTarefa', controlador);
