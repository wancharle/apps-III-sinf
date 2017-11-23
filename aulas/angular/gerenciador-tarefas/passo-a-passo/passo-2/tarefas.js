var modulo = angular.module('tarefasApp', []);

function controlador() {
        var contexto = this;

        contexto.tarefas = []
	// adicionado tarefas de exemplo para testar o angular
        contexto.tarefas.push({texto:'Aprender angular', feita:true});
        contexto.tarefas.push({texto:'Construir um app Angular.js', feita:false});

      }

modulo.controller('ControladorListaTarefa', controlador);
