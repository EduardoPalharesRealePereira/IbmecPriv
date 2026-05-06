// Função tradicional
function bomDia(nome) {
  return `Bom dia, ${nome}!`;
}

function boaTarde(nome) {
  return `Boa tarde, ${nome}!`;
}

function boaNoite(nome) {
  return `Boa noite, ${nome}!`;
}

function saudacao(turno) {
  return turno;
}

console.log(saudacao(boaNoite("Tamara")));

// console.log(bomDia("Paulo"))

// Arrow function - função de seta

// const saudacao = (nomeDaPessoa) => {
//     return `Olá, ${nomeDaPessoa}!`
// }

// console.log(saudacao("Eduardo"))

// Função anônima - função sem nome - stand by
// Função tradicional sem nome: function() {}
// Arrow function sem nome: () => {}
