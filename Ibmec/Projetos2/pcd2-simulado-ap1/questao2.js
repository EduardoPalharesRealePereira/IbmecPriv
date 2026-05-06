const express = require("express");
const filmes = require("./questao2_data.json");
const server = express();
server.use(express.json());

// Resolva a questão 2 a partir desta linha
// a
server.get("/filmes", (req, res) => {
  const consulta = req.query.titulo;

  if (!consulta) {
    res.status(200).json(filmes);
  }
  const titulo = filmes.find((filme) => filme.titulo === consulta);
  res.status(200).json(titulo);
});

// b
server.get("/filmes/:id", (req, res) => {
  const consulta = Number(req.params.id);
  const filmeEncontrado = filmes.find((filme) => filme.id === consulta);
  if (!filmeEncontrado) {
    res.status(404).send("Filme fora do catálogo");
  }
  res.json(filmeEncontrado);
});

// c
server.post("/filmes", (req, res) => {
  const novoFilme = req.body;
  filmes.push(novoFilme);
  res.status(201).json(filmes);
});

// d
server.put("/filmes/:id", (req, res) => {
  const consulta = Number(req.params.id);
  let filmeEncontrado = filmes.find((filme) => filme.id === consulta);
  if (!filmeEncontrado) {
    res.status(404).send("Filme fora do catálogo");
  }
  // (objeto a atualizar, novo objeto)
  Object.assign(filmeEncontrado, req.body);
//   filmeEncontrado = req.body;
  res.json(filmes);
});

// Caso queira, poderá alterar a porta (a partir da 3000)
server.listen(5001);
