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

      }

modulo.controller('ControladorListaTarefa', controlador);
