const veiculos = require("./carros")

// Crie um novo array de veículos do ano de 2026, apenas.

const carrosDoAno = veiculos.filter((elemento)=>{
    return elemento.versao === "Touring";
})

console.log(carrosDoAno);

// Map: 
// Crie um novo array de strings com o seguinte exemplo:
// O carro X é do ano Y.

const listaCarros = veiculos.map((elemento) => `O carro ${elemento.nome} é do ano ${elemento.ano}`)

console.log(listaCarros)

// Crie um novo array de strings com o seguinte exemplo:
// O carro X é do ano Y. O array deve possuir apenas os carros de 2026.

const carroDoAnoFormatado = veiculos.filter((elemento) => elemento.ano === 2026).map((carroDoAno) => `O carro ${carroDoAno.nome} é do ano ${carroDoAno.ano}`)

console.log(carroDoAnoFormatado)



// veiculos.filter(() => {}).map(() => {})