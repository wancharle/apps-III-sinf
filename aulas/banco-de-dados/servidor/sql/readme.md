
# Exemplo de aplicação SQL em node.js

Este exemplo mostra como se conectar num banco de dados SQL (sqliteDB) e como realizar operações CRUD (Create,  Read, Update e Delete) básicas no banco de dados.

## 1 - Crie o projeto

No terminal, e dentro na pasta que deseja criar o projeto, digite:
```bash
npm init
```
Pressione \<enter\> para todas as perguntas.

## 2 - Instale as Dependências

Instale a biblioteca de acesso ao SQL do sqliteDB:

```bash
npm install --save sqlite3

```

## 3 - Programe

Crie um arquivo de nome [crud.js](crud.js) na pasta do projeto com o seguinte conteúdo:
```javascript
// inportando biblioteca sql para acessar um banco de dados sqlite
var sqlite3 = require('sqlite3').verbose();

// criando banco para teste
var db = new sqlite3.Database('bancoteste.db');
    
// força a execução serial das queries  em vez  paralela que é o mais comum para aplicacoes node.js
db.serialize(function() {   

    // cria uma tabela 'usuario' com dois campos : id e dt
    db.run("CREATE TABLE usuario (id INT, horario TEXT)")

    // cria um statement para executar um codigo sql
    var statement = db.prepare("INSERT INTO usuario VALUES (?,?)");

    // insere 10 usuarios de exemplo
    for (var i = 1; i <= 10; i++) {
        var data = new Date();
        var horario= data.toLocaleTimeString();
        // executa o estatement para os dados informados como parametro
        statement.run(i, horario); 
    }
    statement.finalize(); // finaliza a execução do statement

    // Apaga o usuario 8
    db.run('DELETE FROM usuario WHERE id=?',[8]) 

    // Atualiza o horario de usuario 9 para '00:00:00'
    db.run('UPDATE usuario SET horario=? WHERE id=? ',['00:00:00',9]) 

    // Realiza uma consulta na tabela usuario para imprimir a lista de usuarios cadastrados
    db.each("SELECT id, horario FROM usuario", function(err, row) {
        console.log("Usuario id="+row.id, "data='"+row.horario+"'");
    });

    // Apaga a tabela usuario
    db.run("drop TABLE usuario");
});

// fecha a conexão com o banco
db.close();
```

## Teste

Rode o comando abaixo para testar a conexão com o banco de dados SQL:
```bash
node crud.js
```
