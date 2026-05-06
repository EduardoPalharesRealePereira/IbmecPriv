# [PCD2] EX.2 - Criando uma API com Express

## Objetivo
A prática tem como objetivo consolidar o entendimento dos métodos HTTP mais utilizados no desenvolvimento de APIs com Node e Express.

- **Obs.:** este exercício é `opcional`. Caso queira revisão, solicite `code review` ao abrir Pull Request, no momento da entrega deste exercício.

---

## Estrutura do Projeto

- Base de dados: `database.json` contendo 20 álbuns de diferentes estilos.

## Exercícios

### 1. Configuando o ambiente / Criando o servidor

Faça a configuração completa do Node para o seu projeto:

a) Crie o arquivo `package.json` com o comando `npm init -y`.

b) Faça a instalação do Express com o comando `npm install express`.

c) Ignore os commits da pasta `node_modules`, adicionando esta pasta no arquivo `.gitignore`.

d) Crie o arquivo `index.js` e faça as devidas importações.


### 2. GET - Listar todos os álbuns

Crie uma rota `GET /albuns` que retorne todos os álbuns armazenados no `db.json`.

**Exemplo de requisição:**

```
GET http://localhost:3000/albuns
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "titulo": "The Dark Side of the Moon",
    "artista": "Pink Floyd",
    "ano": 1973,
    "genero": "Rock Progressivo",
    "faixas": 10,
    "gravadora": "Harvest Records",
    "destaques": ["Time", "Money"]
  },
  {
    "id": 2,
    "titulo": "Thriller",
    "artista": "Michael Jackson",
    "ano": 1982,
    "genero": "Pop",
    "faixas": 9,
    "gravadora": "Epic Records",
    "destaques": ["Thriller", "Beat It", "Billie Jean"]
  }
]
```

---

### 3. POST - Adicionar novo álbum

Crie uma rota `POST /albuns` que receba os dados de um novo álbum no corpo da requisição (JSON) e adicione à base de dados.

**Exemplo de requisição:**

```
POST http://localhost:3000/albuns
```

**Body (JSON):**

```json
{
  "titulo": "Meteora",
  "artista": "Linkin Park",
  "ano": 2003,
  "genero": "Nu Metal",
  "faixas": 13,
  "gravadora": "Warner Bros.",
  "destaques": ["Numb", "Somewhere I Belong"]
}
```

**Resposta esperada (201 Created):**

```json
{
  "id": 21,
  "titulo": "Meteora",
  "artista": "Linkin Park",
  "ano": 2003,
  "genero": "Nu Metal",
  "faixas": 13,
  "gravadora": "Warner Bros.",
  "destaques": ["Numb", "Somewhere I Belong"]
}
```

---

### 4. GET com Query Param - Filtrar por gênero

Crie uma rota `GET /albuns/search` que aceite um parâmetro de consulta (`?genero=`) e retorne os álbuns que correspondam ao gênero informado.

**Exemplo de requisição:**

```
GET http://localhost:3000/albuns/search?genero=Hip Hop
```

**Resposta esperada:**

```json
[
  {
    "id": 9,
    "titulo": "The Eminem Show",
    "artista": "Eminem",
    "ano": 2002,
    "genero": "Hip Hop",
    "faixas": 20,
    "gravadora": "Aftermath/Shady/Interscope",
    "destaques": ["Without Me", "Sing for the Moment"]
  },
  {
    "id": 12,
    "titulo": "To Pimp a Butterfly",
    "artista": "Kendrick Lamar",
    "ano": 2015,
    "genero": "Hip Hop",
    "faixas": 16,
    "gravadora": "Top Dawg/Aftermath/Interscope",
    "destaques": ["Alright", "King Kunta"]
  }
]
```

---

### 5. PUT com Route Param - Atualizar álbum

Crie uma rota `PUT /albuns/:id` que receba um **ID** como parâmetro e os novos dados do álbum no corpo da requisição.
A rota deve atualizar as informações do álbum correspondente.

**Exemplo de requisição:**

```
PUT http://localhost:3000/albuns/2
```

**Body (JSON):**

```json
{
  "titulo": "Thriller (Deluxe Edition)",
  "artista": "Michael Jackson",
  "ano": 1982,
  "genero": "Pop",
  "faixas": 12,
  "gravadora": "Epic Records",
  "destaques": ["Thriller", "Beat It", "Billie Jean", "Human Nature"]
}
```

**Resposta esperada:**

```json
{
  "id": 2,
  "titulo": "Thriller (Deluxe Edition)",
  "artista": "Michael Jackson",
  "ano": 1982,
  "genero": "Pop",
  "faixas": 12,
  "gravadora": "Epic Records",
  "destaques": ["Thriller", "Beat It", "Billie Jean", "Human Nature"]
}
```

---

### 6. DELETE com Route Param - Remover álbum

Crie uma rota `DELETE /albuns/:id` que remova um álbum da base de dados de acordo com o ID passado como parâmetro.

**Exemplo de requisição:**

```
DELETE http://localhost:3000/albuns/1
```

**Resposta esperada:**

```json
{ "mensagem": "Álbum com ID 1 removido com sucesso." }
```
