# [PCD2] AULA 02.1: Construindo uma API RESTful com Express

## Índice

1. [O que são APIs RESTful?](#o-que-sao-apis-restful)
2. [O que é o Express?](#o-que-e-o-express)
3. [Configurando o projeto](#configurando-o-projeto)
4. [Entendendo CRUD e sua aplicação](#entendendo-crud-e-sua-aplicacao)
5. [Criando as rotas da API](#criando-as-rotas-da-api)
   - [Criar um servidor e habilitar JSON](#1-criar-um-servidor-e-habilitar-json)
   - [Rota GET para listar todos os produtos](#2-rota-get-para-listar-todos-os-produtos)
   - [Rota GET (com query params) para buscar um produto](#3-rota-get-com-query-params-para-buscar-um-produto)
   - [Rota POST para adicionar um novo produto](#4-rota-post-para-adicionar-um-novo-produto)
   - [Rota PUT para atualizar um produto (com route params)](#5-rota-put-para-atualizar-um-produto)
   - [Rota DELETE para excluir um produto](#6-rota-delete-para-excluir-um-produto)
   - [Iniciar o servidor](#7-iniciar-o-servidor)

---

## O que são APIs RESTful?

APIs RESTful (Representational State Transfer) são interfaces que seguem um conjunto de princípios padronizados para a comunicação entre sistemas. Elas utilizam os verbos HTTP (**GET, POST, PUT, DELETE**) para manipular recursos e são amplamente usadas no desenvolvimento web. 

Principais características das APIs RESTful:

- **Cliente-Servidor**: Separa a interface do usuário do armazenamento de dados, permitindo maior escalabilidade.
- **Stateless (Sem estado)**: Cada requisição feita ao servidor deve conter todas as informações necessárias para ser processada.
- **Cacheável**: Respostas podem ser armazenadas em cache para otimizar a performance.
- **Interface Uniforme**: Usa padrões bem definidos para comunicação entre cliente e servidor.
- **Uso de JSON**: O formato JSON é amplamente utilizado devido à sua leveza e compatibilidade com diversas tecnologias.

---

## O que é o Express?

[Express](https://expressjs.com) é um framework minimalista para Node.js que facilita a criação de APIs e aplicações web. Ele fornece um conjunto de funcionalidades para lidar com rotas, requisições HTTP, respostas e middleware.

### Vantagens do Express:

- **Fácil de aprender**: Sintaxe simples e intuitiva.
- **Roteamento flexível**: Permite a criação de múltiplos endpoints de forma organizada.
- **Middleware poderoso**: Intercepta requisições para processamento antes de serem finalizadas.
- **Compatibilidade com JSON**: Facilita o envio e recebimento de dados no formato JSON.

---

## Configurando o projeto

Para iniciar o projeto, siga os passos abaixo:

1. **Inicializar um projeto Node.js**

```sh
npm init -y
```

Este comando cria um arquivo `package.json` contendo informações sobre o projeto.

2. **Instalar o Express**

```sh
npm install express
```

Isso adiciona o Express ao projeto, permitindo que possamos utilizá-lo para criar a API.

3. **Configurar o module no package.json**

Abra o `package.json` e adicione a linha abaixo para utilizar `import`:

```json
"type": "module"
```

4. **Personalizar o script de inicialização**

Dentro do `package.json`, ajuste o script para que o servidor reinicie automaticamente ao detectar mudanças no código:

```json
"scripts": {
  "dev": "node --watch server.js"
}
```

5. **Criar o arquivo principal do servidor**

Crie um arquivo chamado `server.js`, onde implementaremos a API.

---

## Entendendo CRUD e sua aplicação

CRUD é um acrônimo para:

- **C**reate (Criar) - POST: Adiciona novos dados.
- **R**ead (Ler) - GET: Recupera dados existentes.
- **U**pdate (Atualizar) - PUT: Modifica dados existentes.
- **D**elete (Excluir) - DELETE: Remove dados.

Essas operações são fundamentais para manipular recursos em um banco de dados ou em um arquivo JSON.

Exemplo de aplicação do CRUD:
- Um sistema de gestão de produtos permite **criar** novos produtos (POST), **listar** todos os produtos disponíveis (GET), **atualizar** informações de um produto (PUT) e **excluir** produtos descontinuados (DELETE).

---

## Criando as rotas da API

### 1. Criar um servidor e habilitar JSON

Antes de definir as rotas, criamos o servidor e ativamos o uso de JSON:

```js
import express from "express";
import data from "./data.json" assert { type: "json" };
const server = express();
```

Aqui, importamos o **Express** e os dados armazenados no arquivo JSON. Em seguida, criamos um **servidor** a partir da função `express()`.

```js
// Middleware para interpretar JSON no corpo da requisição
server.use(express.json());
```

Este middleware permite que o Express processe JSON enviado no corpo das requisições POST e PUT.

### 2. Rota GET para listar todos os produtos

```js
server.get("/produtos", (req, res) => {
  res.send(data);
});
```

### 3. Rota GET com query params para buscar um produto

```js
server.get("/produtos/consulta", (req, res) => {
  const nome = req.query.nome;
  const produto = data.filter((produto) => produto.nome === nome);
  res.send(produto);
});
```

### 4. Rota POST para adicionar um novo produto

```js
server.post("/produtos", (req, res) => {
  const novoProduto = req.body;
  data.push(novoProduto);
  res.status(201).send(data);
});
```

### 5. Rota PUT para atualizar um produto

```js
server.put("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const produtoAtualizado = req.body;
  data[id] = produtoAtualizado;
  res.send(data);
});
```

### 6. Rota DELETE para excluir um produto

```js
server.delete("/produtos/:id", (req, res) => {
  const produtoaExcluir = Number(req.params.id);
  const produtoExiste = data.some((produto) => produto.id === produtoaExcluir);

  if (produtoExiste) {
    let newData = data.filter((produto) => produto.id !== produtoaExcluir);
    res.json(newData);
  } else {
    res.status(404).send("Produto não encontrado!");
  }
});
```

### 7. Iniciar o servidor

```js
server.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
```
