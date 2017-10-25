Web Service em Node.js 
======================

Na pasta do projeto instale o framework Express:

```bash
npm install express
```

Crie um arquivo chamado index.js com o seguinte conteúdo:

```bash

const express = require('express')
var app = express()

function paginaInicial(req, res){

}

app.get("/", paginaInicial)

app.listen(3000)
```

Para rodar o webservice execute :

```bash
node index.js
```

Para acessar o website abra o endereço http://localhost:3000/ no navegador web de sua preferência.
