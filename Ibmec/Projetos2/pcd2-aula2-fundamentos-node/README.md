Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# [PCD2] AULA 2 - Fundamentos do Node.js

[Slides](https://docs.google.com/presentation/d/153n8hdimSG11h2YhNcIyJCTlLS2yJROCctL7BmpBqow/edit?usp=sharing)

[Documentação oficial](https://nodejs.org/pt)

## Índice

1.  [O que é Node.js?](#o-que-e-nodejs)
2.  [Como o Node.js Funciona?](#como-o-nodejs-funciona)
3.  [Configurando o Ambiente de Desenvolvimento](#configurando-o-ambiente-de-desenvolvimento)
    * [Inicializando o Projeto com npm init -y](#inicializando-o-projeto-com-npm-init--y)
    * [Criando o Arquivo server.js](#criando-o-arquivo-serverjs)
    * [Importando o Módulo HTTP](#importando-o-módulo-http)
        * [CommonJS](#commonjs)
        * [ES Modules](#es-modules)
    * [Usando o Node Watch](#usando-o-node-watch)
4.  [Criando o Primeiro Servidor](#criando-o-primeiro-servidor)
5.  [Scripts Personalizados no package.json](#scripts-personalizados-no-packagejson)

## O que é Node.js?

Node.js é um ambiente de tempo de execução JavaScript de código aberto e multiplataforma. Ele permite que você execute código JavaScript fora de um navegador web, tornando possível a criação de aplicações de servidor e outras ferramentas de rede.

## Como o Node.js Funciona?

Node.js utiliza o motor V8 do Google Chrome para executar JavaScript. Sua arquitetura orientada a eventos e não bloqueante torna-o altamente eficiente para aplicações que lidam com muitas conexões simultâneas, como servidores web.

## Configurando o Ambiente de Desenvolvimento

### Inicializando o Projeto com `npm init -y`

O comando `npm init -y` cria um arquivo `package.json` na raiz do seu projeto. Este arquivo contém metadados sobre o projeto e é usado para gerenciar dependências. Para isso, no terminal e dentro da pasta raiz do projeto, digite: 

```bash
npm init -y
```

### Criando o Arquivo `server.js`

Crie um arquivo chamado `server.js` na raiz do seu projeto. Este arquivo conterá o código do nosso servidor.

### Importando o Módulo HTTP

Node.js possui um módulo embutido chamado `http` que permite criar servidores web. Você pode importá-lo usando CommonJS ou ES Modules.

#### CommonJS

```javascript
const http = require('http');
```

Este método vem sido apontado como `depreciado` em algumas plataformas. Por isso, existe também uma outra maneira de importação: o `ES Modules`. 

#### ES Modules

Primeiro, adicione `"type": "module"` ao seu `package.json`.

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

Em seguida, importe o módulo `http` em `server.js`.

```javascript
import http from 'http';
```

### Usando o Node Watch

Para reiniciar automaticamente o servidor após cada alteração no código, você pode usar o `node --watch`.

```bash
node --watch server.js
```

## Criando o Primeiro Servidor

Aqui está um exemplo simples de um servidor Node.js que apenas imprime uma mensagem no console.

```javascript
import http from 'http';

const server = http.createServer((req, res) => {
  console.log('Servidor Node.js em execução!');
  res.end('Servidor Node.js em execução!');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
```

## Scripts Personalizados no `package.json`

Você pode adicionar scripts personalizados ao seu `package.json` para automatizar tarefas comuns.

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "dev": "node --watch server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

Agora, você pode iniciar o servidor usando o seguinte comando:

```bash
npm run dev
```
