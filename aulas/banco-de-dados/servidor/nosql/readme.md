
# Dependências

São basicamente duas dependências: um servidor nosql e uma biblioteca para acessá-lo.

## Servidor nosql

Para este exemplo instale o servidor mongodb.
1. [Instalação do mongodb no ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
2. [Instalação do mongodb no windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


## Biblioteca de acesso ao servidor

Para instalar a biblioteca de acesso ao servidor mongodb digite o seguinte comando na pasta do projeto:

```bash
$ npm install --save mongodb
```

# Testes

Para testar o código execute o comando abaixo
```bash
$ node crud.js
```

Outra versão que não utiliza o padrão [Promessas](https://www.promisejs.org) pode executado com o comando abaixo:
```bash
$ node crud-sem-promessas.js
```

A diferença entre eles está apenas na forma que o código é escrito. Mas observe que em programação não bloqueante e assíncrona é recomendável o uso de promessas para evitar o [Callback Hell](http://callbackhell.com).


