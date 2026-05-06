const veiculos = [
  {
    nome: "T-cross",
    ano: 2026,
    versao: "Highline",
    opcionais: ["Teto solar", "Black piano", "Rodas 19"],
    preco: 196000,
    aceitaFinanciamento: true,
  },
  {
    nome: "Corolla Cross",
    ano: 2025,
    versao: "XRE Hybrid",
    opcionais: [
      "Bancos de couro",
      "Câmera 360°",
      "Piloto automático adaptativo",
    ],
    preco: 212000,
    aceitaFinanciamento: true,
  },
  {
    nome: "Jeep Compass",
    ano: 2026,
    versao: "Limited T270",
    opcionais: ["Teto panorâmico", "Som premium", "Rodas 19"],
    preco: 198500,
    aceitaFinanciamento: true,
  },
  {
    nome: "Honda HR-V",
    ano: 2024,
    versao: "Touring",
    opcionais: ["Faróis full LED", "Assistente de faixa", "Teto solar"],
    preco: 185000,
    aceitaFinanciamento: false,
  },
  {
    nome: "Chevrolet Tracker",
    ano: 2025,
    versao: "Premier 1.2 Turbo",
    opcionais: [
      "Carregador sem fio",
      "Bancos elétricos",
      "Sensor de ponto cego",
    ],
    preco: 158900,
    aceitaFinanciamento: true,
  },
  {
    nome: "Volkswagen Nivus",
    ano: 2026,
    versao: "Highline 200 TSI",
    opcionais: ["Som Beats", "Painel digital", "Rodas diamantadas"],
    preco: 142000,
    aceitaFinanciamento: true,
  },
];

// find() - valor completo

const buscaVeiculo = veiculos.find((carro) => {
  return carro.aceitaFinanciamento === true;
});

// console.log(buscaVeiculo);

// filter() - array

const carrosNovos = veiculos.filter((cadaObjeto) => {
  return cadaObjeto.ano === 2026;
});

console.log(carrosNovos);

module.exports = veiculos;
// exportando o array veiculos
