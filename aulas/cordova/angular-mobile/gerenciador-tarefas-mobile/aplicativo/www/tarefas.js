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
  $routeProvider.when('/arquivadas', {templateUrl: 'arquivadas.html', reloadOnSearch: false});
});


modulo.directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});



function controlador($rootScope,$scope) {

        var contexto = this;

        contexto.tarefas = []
	contexto.tarefasArquivadas = [];
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
	    else  contexto.tarefasArquivadas.push(tarefa);
          });
        };
	  
	contexto.deleteTarefa= function(tarefa) {
	    var index = contexto.tarefasArquivadas.indexOf(tarefa);
	    if (index > -1) {
	      contexto.tarefasArquivadas.splice(index, 1);
	    }
	  };




  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });

}

modulo.controller('ControladorListaTarefa', controlador);
