const express = require("express");
const livros = require("./questao2_data.json");
const api = express();
api.use(express.json());

// Resolva a questão 3 a partir desta linha

// Caso queira, poderá alterar a porta
api.listen(5001);
