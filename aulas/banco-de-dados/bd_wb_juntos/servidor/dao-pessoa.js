// Importando biblioteca sql para acessar um banco de dados sqlite
var sqlite3 = require('sqlite3').verbose()

// Criando/abrindo banco do app
var db = new sqlite3.Database('./servidor/bancoDeDados.db')

function inicializaBancoDeDados(){
    db.run("CREATE TABLE IF NOT EXISTS pessoa (id INT unique, nome TEXT, dataNasc TEXT)",function(error){
        if (error == null)
            console.log('Banco de dados Inicializado')
        else
            console.log(error)
    })
}

function inserePessoa(id,nome,data,callback){
    var statement = db.prepare("INSERT INTO pessoa VALUES (?,?,?)")
    statement.run(id,nome,data,callback) 
    statement.finalize() 
}

function getPessoas(callback){
    db.all("SELECT id, nome, dataNasc FROM pessoa ORDER BY id", callback)
}

function getPessoa(id,callback){
    db.get("SELECT id, nome, dataNasc FROM pessoa WHERE id=?", [id],callback)
}

function atualizaPessoa(id,nome,data,callback){
    db.get("UPDATE pessoa SET nome=?, dataNasc=? WHERE id=?", [nome,data,id],callback)
}

function deletePessoa(id,callback){
    db.run('DELETE FROM pessoa WHERE id=?',[id],callback) 
}


// definindo quais funções serão exportadas (publicas) para outros arquivos.
exports.db = db
exports.inicializaBancoDeDados = inicializaBancoDeDados
exports.getPessoas = getPessoas
exports.getPessoa = getPessoa
exports.inserePessoa = inserePessoa
exports.atualizaPessoa = atualizaPessoa 
exports.deletePessoa = deletePessoa 

