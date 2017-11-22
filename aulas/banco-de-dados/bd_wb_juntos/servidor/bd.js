// inportando biblioteca sql para acessar um banco de dados sqlite
var sqlite3 = require('sqlite3').verbose();

// criando/abrindo banco do app
var db = new sqlite3.Database('./servidor/bancoDeDados.db');


function inicializa(){
    console.log('Inicializando Banco de dados...');
    // cria uma tabela 'pessoa' com dois campos : id, nome, dataNasc 
    db.run("CREATE TABLE IF NOT EXISTS pessoa (id INT unique, nome TEXT, dataNasc TEXT)",function(error){
        if (error == null)
            console.log('Banco de dados Inicializado'); 
        else
            console.log(error); 
    })
}


function getPessoas(callback){
    db.all("SELECT id, nome, dataNasc FROM pessoa", callback); 
}


function inserePessoa(id,nome,data,callback){
    var statement = db.prepare("INSERT INTO pessoa VALUES (?,?,?)")
    statement.run(id,nome,data,callback) 
    statement.finalize() 
}



// definindo quais funções serão exportadas (publicas) para outros arquivos.
exports.db = db
exports.inicializa = inicializa
exports.getPessoas= getPessoas
exports.inserePessoa= inserePessoa

