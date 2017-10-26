Web Service em Node.js 
======================

Na pasta do projeto instale o framework Express:

```bash
npm install express
```

Crie um arquivo chamado index.js com o seguinte conteúdo:

```Javascript
const express = require('express')
const app = express()

function liberaAcesso(res){
    res.header('Access-Control-Allow-Origin', '*')
    res.header( 'Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
}

function paginaInicial(req, res) {
      liberaAcesso(res)
      res.send('Olá Mundo Javascript!')
}

app.get('/',paginaInicial); 

app.listen(3000)
```

Para rodar o webservice execute :

```bash
node index.js
```

Para acessar o website abra o endereço http://localhost:3000/ no navegador web de sua preferência.
