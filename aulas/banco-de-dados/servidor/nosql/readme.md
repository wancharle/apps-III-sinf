
# Dependências

São basicamente duas dependências para instalar: um servidor NoSQL e uma biblioteca para acessá-lo.

## Servidor NoSQL

Para este exemplo instale o servidor MongoDB.
1. [Instalação do MongoDB no ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
2. [Instalação do MongoDB no windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


## Biblioteca de acesso ao servidor

Para instalar a biblioteca de acesso ao servidor MongoDB digite o seguinte comando na pasta do projeto:

```bash
npm install --save mongodb
```

# Testes

Para testar o código execute o comando abaixo na pasta do projeto:
```bash
node crud.js
```

Um outra versão, que não utiliza o padrão [Promessas](https://www.promisejs.org), pode ser executada com o seguinte comando:
```bash
$ node crud-sem-promessas.js
```

A diferença entre essas versões está apenas na forma que o código é escrito. Mas observe que  é recomendável  em programação não bloqueante e assíncrona o uso de promessas para evitar o [Callback Hell](http://callbackhell.com).


