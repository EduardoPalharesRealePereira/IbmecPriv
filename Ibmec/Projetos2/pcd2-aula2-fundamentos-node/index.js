// 1. Criar o servidor
// a. Importar o express
const express = require("express");

const dados = require("./dados.json");
// b. Atribuir o express ao seu servidor
const api = express();

// para rota post, esse cara tem que estar aqui!
api.use(express.json());

// 2. Criar a primeira rota
// rota para listar todas as pessoas do arquivo .json
api.get("/pessoas", (requisicao, resposta) => {
  resposta.json(dados);
});

// post
api.post("/pessoas", (req, res) => {
  const novoPaciente = req.body;
  dados.push(novoPaciente);
  res.json(dados);
})

// parâmetros de consulta (query params)
api.get("/pessoas/consulta", (req, res) => {
  const consulta = req.query.convenio;

  const resposta = dados.filter((valor) => valor.convenio === consulta);

  res.json(resposta);
})


// put: atualizar pesquisando pelo nome - com parâmetros de consulta (query params)
api.put("/pessoas", (req, res) => {
  const consulta = req.query.nome; // habilitei a consulta na URL
  const pessoa = dados.find((valor) => {
    return valor.nome === consulta;
  })
  pessoa.idade = 35;
  res.json(pessoa)
})


// rota put com route params
api.put("/pessoas/:id", (req, res) => {
  const consulta = Number(req.params.id);
  let pessoa = dados.find((valor) => {
    return valor.id === consulta;
  })
  const novosDados = req.body;
  pessoa.convenio = novosDados.convenio;
  res.json(pessoa);
})



// delete: com parâmetros de rota (route params)
api.delete("pessoas/:id", (req,res) => {

})

// obs.: query params e route params podem ser utilizados em qualquer requisição HTTP.

// 3. Atribuir uma porta ao servidor
// server.listen(porta, () => {`console.log opcional`})
api.listen(5001, () => {
  console.log("Servidor rodando na porta 5001");
});
