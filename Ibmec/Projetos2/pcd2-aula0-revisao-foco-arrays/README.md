# [PCD2] AULA 0 - Revisão "Acelerada"

## O que são funções de ordem superior?

Em JavaScript, **funções de ordem superior** (**Higher-Order Functions – HOFs**) são funções que **recebem outras funções como argumento** ou **retornam funções** como resultado.

Isso é possível porque em JavaScript as funções são **cidadãs de primeira classe** (*first-class citizens*), ou seja, podem ser armazenadas em variáveis, passadas como parâmetro e retornadas por outras funções.

---

## Exemplos no código

### 1. Funções passadas como parâmetro

No trecho abaixo, a função `saudacao` **recebe** como argumento o retorno de outra função (`noite`):

```javascript
function manha(nome) {
  return `Bom dia, ${nome}!`
}

function tarde(nome) {
  return `Boa tarde, ${nome}!`
}

function noite(nome) {
  return `Boa noite, ${nome}!`
}

function saudacao(turno) {
  return turno
}

console.log(saudacao(noite("Tamara")))
// Saída: "Boa noite, Tamara!"
```

Aqui, `noite("Tamara")` é executada primeiro e retorna uma string, que é passada para `saudacao`.

---

### 2. Uso de funções como **callback** com `forEach`

O método `forEach` é uma função de ordem superior porque **recebe uma função como argumento** para executar sobre cada elemento do array.

```javascript
const numeros = [2, 3, 4, 5, 6, 9, 10, "numeros"]

numeros.forEach((value, index, array) => 
  console.log(value, index, array)
)
```

Nesse caso, a função **anônima** `(value, index, array) => { ... }` é passada para o `forEach`, e ela será executada para cada elemento de `numeros`.

---

### 3. Encadeamento de funções com `filter` e `map`

Tanto `filter` quanto `map` são **funções de ordem superior**, pois recebem como parâmetro uma função que define o comportamento desejado.

```javascript
const apenasFinanciaveis = veiculos
  .filter(carro => carro.aceitaFinanciamento === true)
  .map(carro => carro.nome);

console.log(apenasFinanciaveis);
// Saída: ["T-cross", "Corolla Cross", "Jeep Compass", "Chevrolet Tracker", "Volkswagen Nivus"]
```

**O que acontece aqui:**

1. **`filter`** percorre todos os veículos e **mantém apenas os que aceitam financiamento**.
2. **`map`** transforma a lista filtrada para conter **apenas os nomes** dos veículos.

---

## Benefícios das Funções de Ordem Superior

* **Reaproveitamento de código** – uma função pode ser passada para várias outras sem precisar reescrever a lógica.
* **Código mais conciso e legível** – métodos como `map`, `filter` e `reduce` tornam operações sobre arrays mais claras.
* **Abstração de comportamento** – a função principal não precisa saber o que exatamente será executado, apenas que vai receber uma função para trabalhar.

---

## Visão geral — Retornos

* **forEach** → `void` (retorna `undefined`)
* **some** → `boolean`
* **every** → `boolean`
* **find** → `T | undefined`
* **filter** → `T[]`
* **map** → `U[]` (mesmo tamanho do array original)
* **reduce** → `R` (tipo do acumulador/resultado)
* **indexOf** → `number` (`-1` se não encontrar)
