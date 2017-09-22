var modulo = angular.module('tarefasApp', []);

function controlador() {
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
      }

modulo.controller('ControladorListaTarefa', controlador);
