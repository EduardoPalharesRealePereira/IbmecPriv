const alunos = require('./alunos.js');
const numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

console.log(`Exercicio 1`)
const dobrado = numeros.forEach((numero) =>{
    console.log(numero*2)

});
console.log(`__________________`)
console.log(`Exercicio 2`)
const apenas50 = numeros.filter((numerodesejado)=>{
    return numerodesejado >50
}).map((maiores)=>{
    return maiores**2;
})

console.log(apenas50)
console.log(`__________________`)

// 3 

// A)
console.log(`Exercicio 3-A`)
const pares = numeros.some((par)=>{
    return par % 2 === 0;
})
console.log(pares)
console.log(`__________________`)
console.log(`Exercicio 3-B`)
const menor200= numeros.every((numerosmenoresque200)=>{
    return numerosmenoresque200<200;
})
console.log(menor200)
console.log(`__________________`)
console.log(`Exercicio 4`)
const somadetudo = numeros.reduce((soma,inicial)=>{
    return soma+inicial

},0)
console.log(somadetudo)
console.log(`__________________`)
console.log(`Exercicio 5`)
const nomesdosalunos = alunos.filter((nomealunos)=>{
    return nomealunos.nome
})
console.log(nomesdosalunos)

console.log(`__________________`)




console.log(`Exercicio 6`)
console.log(`__________________`)



