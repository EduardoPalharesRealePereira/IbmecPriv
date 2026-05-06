const valores = [3, 4, 5, 10];

let soma = valores.reduce((acumulador, atual) => {
  return acumulador + atual;
}, 0);

console.log(soma);
