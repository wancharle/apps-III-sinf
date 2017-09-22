// Cria uma biblioteca/modulo Angular chamado 'tarefasApp'
var modulo = angular.module('tarefasApp', []);

// Função que instancia o controller do App
function controlador() {
        // Salva uma cópia da instância do controller na variável 'listaTarefa'
        var listaTarefa = this;

        // Cria Array de tarefas para armazenar as tarefas
        listaTarefa.tarefas = []

        // Armazena algumas tarefas inicias
        listaTarefa.tarefas.push({texto:'Aprender angular', feita:true});
        listaTarefa.tarefas.push({texto:'Construir um app Angular.js', feita:false});

        // Adiciona o método "adicionaTarefa" na instância do controller
        listaTarefa.adicionaTarefa = function() {
          listaTarefa.tarefas.push({texto:listaTarefa.textoTarefa, feita:false});
          listaTarefa.textoTarefa = '';
        };

        // Adiciona a função "restantes" na instância do controller
        listaTarefa.restantes = function() {
          var count = 0;
          angular.forEach(listaTarefa.tarefas, function(tarefa) {
            count += tarefa.feita ? 0 : 1;
          });
          return count;
        };

        // Adiciona a método "arquiva" na instância do controller
        listaTarefa.arquiva = function() {
          var tarefasAntigas = listaTarefa.tarefas;
          listaTarefa.tarefas = [];
          angular.forEach(tarefasAntigas, function(tarefa) {
            if (!tarefa.feita) listaTarefa.tarefas.push(tarefa);
          });
        };
      }

// Registrando o controller com o nome 'ControladorListaTarefa'
modulo.controller('ControladorListaTarefa', controlador);
