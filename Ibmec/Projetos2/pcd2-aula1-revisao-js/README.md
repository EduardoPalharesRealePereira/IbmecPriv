# [PCD2] AULA 1 - Principais Recursos do JavaScript ES6

O ES6, também conhecido como ECMAScript 2015, é a sexta edição do padrão que define a linguagem JavaScript e representa uma evolução significativa em relação às versões anteriores. Essa atualização introduziu uma série de melhorias e novos recursos que modernizam e tornam o código mais limpo e expressivo. Entre os principais avanços, destacam-se: 

- a `desestruturação de objetos`, que permite extrair valores de objetos e arrays de forma direta, facilitando a manipulação de dados.
- Outro recurso importante é o `operador rest`, que possibilita a agregação de múltiplos elementos em uma única variável, tornando a gestão de argumentos e elementos mais flexível.
- Além disso, as `HOFS (funções de ordem superior)` passaram a ter maior relevância, incentivando o paradigma funcional ao permitir que funções sejam passadas como argumentos ou retornadas por outras funções, o que contribui para a escrita de código mais modular e reutilizável.

--- 

### Sumário

- [Desestruturação de Objetos](#destructuring)
- [Operador ...rest](#rest)
- [Funções de Ordem Superior](#hofs)

--- 

## Destructuring

O **Destructuring** (ou Desestruturação) é um recurso do ES6 que permite extrair valores de arrays ou propriedades de objetos e atribuí-los a variáveis de maneira mais concisa e legível. Isso reduz a necessidade de acessar manualmente os elementos de um array ou as propriedades de um objeto, tornando o código mais eficiente.

### Desestruturação de Objetos

Podemos extrair propriedades de um objeto e armazená-las em variáveis de forma direta:

```js
const usuario = { nome: "Ana", idade: 25, cidade: "São Paulo" };

const { nome, idade } = usuario;

console.log(nome); // "Ana"
console.log(idade); // 25
```

Caso uma propriedade não exista, podemos definir um valor padrão:

```js
const pessoa = { nome: "Carlos" };

const { nome, idade = 30 } = pessoa;

console.log(idade); // 30 (valor padrão)
```

### Desestruturação de Arrays

A desestruturação também pode ser aplicada a arrays:

```js
const numeros = [10, 20, 30];

const [primeiro, segundo] = numeros;

console.log(primeiro); // 10
console.log(segundo); // 20
```

Também é possível pular elementos na atribuição:

```js
const valores = [5, 10, 15];

const [, , terceiro] = valores;

console.log(terceiro); // 15
```

---

## rest

O **Rest Operator** (`...`) é um recurso do ES6 que permite agrupar vários elementos em um único array ou objeto. Ele é especialmente útil quando queremos trabalhar com um número variável de argumentos em funções ou capturar o restante dos elementos ao desestruturar um array ou objeto.

### Uso em Funções

Em funções, o operador rest permite capturar um número indefinido de argumentos e armazená-los em um array:

```js
function soma(...numeros) {
  return numeros.reduce((total, num) => total + num, 0);
}

console.log(soma(1, 2, 3, 4)); // 10
console.log(soma(5, 10, 15)); // 30
```

### Uso na Desestruturação de Arrays

Podemos usar o rest operator para capturar os elementos restantes de um array:

```js
const numeros = [1, 2, 3, 4, 5];

const [primeiro, segundo, ...resto] = numeros;

console.log(primeiro); // 1
console.log(segundo); // 2
console.log(resto); // [3, 4, 5]
```

### Uso na Desestruturação de Objetos

O operador rest também pode ser usado para extrair propriedades restantes de um objeto:

```js
const pessoa = { nome: "João", idade: 40, cidade: "Rio de Janeiro", profissao: "Engenheiro" };

const { nome, ...detalhes } = pessoa;

console.log(nome); // "João"
console.log(detalhes); // { idade: 40, cidade: "Rio de Janeiro", profissao: "Engenheiro" }
```

---

## HOFs

As _Higher Order Functions_, ou _HOFs_, são funções que usam outras funções em suas operações, ou seja, as _HOFs_ aceitam outras funções como parâmetro e/ou retornam outra função. Veja o exemplo abaixo:

```js
const button = document.querySelector('#signup-button');

button.addEventListener('click', () => {
  console.log('Registrado com sucesso!');
});
```

Perceba que a **função** `addEventListener` é uma _HOF_, porque ela recebe outra **função** como parâmetro.

Para deixar o código mais organizado, você pode separar a função executada ao clicar no botão e salvá-la em uma variável. Observe o exemplo abaixo:

```js
const button = document.querySelector('#signup-button');

const registerUser = () => {
  console.log('Registrado com sucesso!');
};

button.addEventListener('click', registerUser);
```

Veja que agora a **função** `addEventListerner` recebe a **função** `registerUser` como parâmetro, deixando o código mais organizado.

> **Saiba mais 💡:** `registerUser` nada mais é do que uma variável que recebe uma função como valor. Esse conceito é chamado de `First-Class Functions`, e é muito comum ao utilizar `arrow functions`.

### Estrutura das HOFs

Até aqui você aprendeu que uma _HOF_ nada mais é do que uma função que recebe outra função por parâmetro e/ou retorna outra função. 

Ao manipular `arrays`, temos _HOFs_ nativas do _JavaScript_ que iteram pelo `array` e executam uma determinada ação para cada elemento do `array`, como:

- `forEach`: executa uma ação determinada por você para cada item do `array` e não possui retorno;
- `find`: encontra o primeiro elemento que satisfaça alguma condição;
- `some`: retorna `true` se algum elemento satisfaz alguma condição, caso contrário retorna `false`;
- `every`: retorna `true` se todos os elementos corresponderem a uma condição, caso contrário retorna `false`.

As _Higher Order Functions_ são parecidas entre si: elas possuem objetivos diferentes no seu código, mas todas possuem a **mesma estrutura**.

A primeira parte de uma _HOF_ é o `array` a ser iterado e a _HOF_ a ser executada. Por exemplo:

```js
array.hofASerExecutada();
```

A _HOF_ recebe como parâmetro uma função _callback_.

> **Anota aí 📝:** uma função callback é uma função passada por parâmetro ou executada dentro de outra função.

Nesse caso, vamos passar uma função anônima:

```js
array.hofASerExecutada(() => {});
```

> **Anota aí 📝:** uma função anônima nada mais é do que uma função sem nome.

A função anônima que foi passada por parâmetro pode receber até três parâmetros: 

- o primeiro parâmetro é o elemento a ser iterado e é o único obrigatório;

- o segundo parâmetro é o `index` do elemento atual;

- o terceiro parâmetro é o `array` original e não é muito comum utilizá-lo.

```js
array.hofASerExecutada((elementoAtual, index, arrayOriginal) => {});
```

O código a ser executado vai depender da funcionalidade da _HOF_.

Por exemplo, o `forEach` executa uma determinada ação para cada item do `array` e **não retorna nada**.

A estrutura dele é a seguinte:

```js
array.forEach((element, index) => {
  // código a ser executado
});
```

O código abaixo possui um `array` com diversos valores. Observe e execute o código:

```js
const arrayOfValues = ['josé', 50, 0.25, { comida: 'Chocolate' }];

arrayOfValues.forEach((element, index) => {
  console.log(`O elemento atual é: ${element} e possui o index: ${index}`);
});
```

O código acima está organizado da seguinte maneira:

- `arrayOfValues`: nome do array que será percorrido;
- `.forEach`: a _HOF_ usada. Poderia ser outra _HOF_, como `.find`, `.some`, `.every`, entre outras, que a estrutura seria a mesma;
- `element`: valor do elemento do array;
- `(element, index) => { /* código */ }`: função a ser executada.

--- 

### Array.forEach

O `forEach` é uma _HOF_ que percorre o array e executa uma função para cada um dos seus valores e **não retorna nada**.

Talvez você esteja se perguntando: _não retorna nada? Como assim?_ 🤔

Existem outras _HOFs_ que iteram pelos `arrays` e retornam valores, como outros `arrays` ou `booleanos`. O `forEach` é responsável por executar uma ação em cada elemento do `array`, mas não possui retorno.

Por exemplo, para transformar um `array` de pessoas aprovadas em um concurso para letras maiúsculas, você pode fazer o seguinte:

💻 **Primeiro passo:** Crie a estrutura do `forEach`.

Para isso, você precisa acessar o `array` de `pessoasAprovadas.forEach`.

```js
const pessoasAprovadas = ['Ana Beatriz', 'Caio Nunes', 'Afonso Ribeiro', 'Leonardo Lins']; // lista de nomes

pessoasAprovadas.forEach(() => {});
```

💻 **Segundo passo:** Passe os parâmetros `nome` e `index` na _callback_. 

```js
const pessoasAprovadas = ['Ana Beatriz', 'Caio Nunes', 'Afonso Ribeiro', 'Leonardo Lins']; // lista de nomes

pessoasAprovadas.forEach((nome, index) => {});
```

💻 **Terceiro passo:** Crie a lógica dentro do `forEach` utilizando a função `toUpperCase()`.

Você pode acessar cada item do `array pessoasAprovadas` e transformar cada nome em maiúsculo.

```js
const pessoasAprovadas = ['Ana Beatriz', 'Caio Nunes', 'Afonso Ribeiro', 'Leonardo Lins']; // lista de nomes

pessoasAprovadas.forEach((nome, index) => {
  pessoasAprovadas[index] = pessoasAprovadas[index].toUpperCase(); // acessa cada elemento do array e atualiza para letra maiúscula
});

console.log(pessoasAprovadas); // ['ANA BEATRIZ', 'CAIO NUNES', 'AFONSO RIBEIRO', 'LEONARDO LINS']
```

> **Observação 🔎:** perceba que o tipo de dado do `array` `pessoasAprovadas` continua sendo um `array`. Por isso, podemos utilizar a `const`, já que não estamos reatribuindo valores. Seria o mesmo que acessar cada item do `array` e transformá-lo em letra maiúscula. Por exemplo, `pessoasAprovadas[0].toUpperCase();`.

Agora imagine que você tenha desenvolvido um programa para fazer a tabuada do `2`. Como você acha que esse código seria ao utilizar o `forEach`?

Você pode construir a sua lógica da seguinte maneira:

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

numbers.forEach((element) => {
  console.log(element * 2); // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
});
```

No exemplo acima, para cada item do `array number`, o `forEach` executa um `console.log` com a multiplicação do elemento atual do `array` por `2`.

Você também pode deixar esse código em apenas uma linha. Para isso, basta remover as chaves `{}` e deixar o `console` logo após a `arrow`. Observe o exemplo abaixo:

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

numbers.forEach((element) => console.log(element * 2));
```

Você também pode separar a _callback_ do `forEach` em uma outra função. Veja o exemplo abaixo:

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const multiply = (element) => {
  console.log(element * 2);
}

numbers.forEach(multiply);
```

Imagine que você esteja responsável por exibir a lista de emails de todas as pessoas que trabalham na mesma empresa que você. Para isso, você pode utilizar o `forEach` para apresentar os emails.

- Use o método `forEach` para exibir a lista de emails com a seguinte frase: `O email ${email} está cadastrado em nosso banco de dados!`.

```js
const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

// Adicione seu código aqui
```

---

**Solução:**

**Primeiro passo:** Crie a estrutura do `forEach`.

```js
const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

emailListInData.forEach(() => {});
```

**Segundo passo:** Passe o parâmetro que define cada elemento do `array`.

Nesse caso, vamos chamar o parâmetro de `email`.

```js
const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

emailListInData.forEach((email) => {});
```

**Terceiro passo:** Exiba o `console.log` com a frase `O email ${email} está cadastrado em nosso banco de dados!`.

```js
const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

emailListInData.forEach((email) => {
  console.log(`O email ${email} está cadastrado em nosso banco de dados!`);
});
```

Você também pode escrever em apenas uma linha:

```js
const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

emailListInData.forEach((email) => console.log(`O email ${email} está cadastrado em nosso banco de dados!`));
```

Caso queira, também pode separar a _callback_ do `forEach`:

```js
const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

const emailChecker = (email) => {
  console.log(`O email ${email} está cadastrado em nosso banco de dados!`);
}

emailListInData.forEach(emailChecker);
```
---

### Array.find

A função `find` é utilizada para achar o primeiro elemento que satisfaça a condição passada e retorne o primeiro valor do `array` que corresponda a essa condição. Caso ele não encontre, retorna `undefined`.

Por exemplo, imagine que o time de pessoas desenvolvedoras com quem você trabalha resolveu fazer um desafio. Para isso, salvaram todas as idades das pessoas em um `array`, e você precisa descobrir se existem pessoas com menos de 20 e com mais de 50 anos. Como você faria? 🤔

O `find` poderia te ajudar nessa tarefa! Observe e execute o exemplo abaixo:

```js
const idades = [18, 21, 42, 20, 19, 21, 30, 73, 82, 45, 48, 50];

idades.find((idade) => idade < 20); // 18
```

No exemplo acima, o retorno foi `18`. Isso acontece porque a primeira iteração do `find` acessa o primeiro item do `array`, que é o `18`. Ao verificar se `18` é menor que `20`, a resposta é `true`, e então o `find` retorna o número `18` e encerra a execução do código.

Bom, você já descobriu que existem pessoas que trabalham com você e possuem menos de 20 anos. Agora você precisa verificar se existem pessoas com mais de 50 anos. Como você pode fazer? 🤔

Basta seguir a mesma estrutura do exemplo anterior e substituir o número `20` por `50`. Observe e execute o código abaixo:

```js
const idades = [18, 21, 42, 20, 19, 21, 30, 73, 82, 45, 48, 50];

idades.find((idade) => idade > 50); // 73
```

O retorno do código acima foi `73`, o que significa que existem pessoas com mais de 50 anos que trabalham no mesmo time que você. 🤩

Caso você realize uma verificação com o `find` que não encontre nenhum elemento, o retorno será `undefined`. Observe e execute o exemplo abaixo para verificar se existem pessoas com idade igual a 33 anos:

```js
const idades = [18, 21, 42, 20, 19, 21, 30, 73, 82, 45, 48, 50];

idades.find((idade) => idade === 33); // undefined
```

> **Saiba mais 💡:** [Nesta página](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) do _MDN_ você pode encontrar mais detalhes sobre o `find`.

---

### Array.some

Imagine que você esteja responsável por criar um sistema de acesso para as pessoas colaboradas da empresa em que você trabalha. Para isso, precisa verificar se pelo menos uma dessas pessoas possui o cargo de gerência. Como você faria? 🤔

As informações das pessoas estão dentro de um `array` de objetos conforme o exemplo abaixo:

```js
const pessoas = [
  { nome: 'Ana', cargo: 'Analista' },
  { nome: 'João', cargo: 'Gerência' },
  { nome: 'Aline', cargo: 'Analista' },
  { nome: 'Joana', cargo: 'Gerência' },
];
```

Como você precisa descobrir se alguma das pessoas possui o cargo de gerência e não precisa de mais detalhes sobre essa pessoa, você pode utilizar o `some`, que vai retornar `true` caso encontre alguém com esse cargo, senão vai retornar `false`. Observe e execute o exemplo abaixo:

```js
const pessoas = [
  { nome: 'Ana', cargo: 'Analista' },
  { nome: 'João', cargo: 'Gerência' },
  { nome: 'Aline', cargo: 'Analista' },
  { nome: 'Joana', cargo: 'Gerência' },
];

const verificaCargo = pessoas.some((pessoa) => pessoa.cargo === 'Gerência');

console.log(verificaCargo); // true
```

No código acima, é verificado se dentro do `array` de `pessoas` existe alguém que possua o cargo de `'Gerência'`. O retorno foi `true` porque existe **pelo menos uma pessoa** com esse cargo.

Agora, utilizando a mesma lógica, verifique se existe uma pessoa com o cargo de `'Product Owner'`. Analise e execute o código abaixo:

```js
const pessoas = [
  { nome: 'Ana', cargo: 'Analista' },
  { nome: 'João', cargo: 'Gerência' },
  { nome: 'Aline', cargo: 'Analista' },
  { nome: 'Joana', cargo: 'Gerência' },
];

const verificaCargo = pessoas.some((pessoa) => pessoa.cargo === 'Product Owner');

console.log(verificaCargo); // false
```

No código acima, o retorno foi `false`, pois não existe ninguém nesse `array` com o cargo de `'Product Owner'`.

Portanto, tenha em mente que o `some` só retorna `true` caso encontre algum elemento que satisfaça à condição. Caso contrário, retorna `false`.

Agora imagine que você precise verificar se existe algum nome que comece com a letra desejada. Analise e execute o código abaixo:

```js
const listNames = ['Maria', 'Manuela', 'Jorge', 'Ricardo', 'Wilson'];

const verifyFirstLetter = (letter, names) => names.some((name) => name[0] === letter);

console.log(verifyFirstLetter('J', listNames)); // true
console.log(verifyFirstLetter('X', listNames)); // false
```

O código acima mostra a função `verifyFirstLetter`, que recebe como primeiro parâmetro `letter`, que é a letra desejada, e como segundo parâmetro o `array` chamado `listNames`.

Dentro da função `verifyFirstLetter`, é executado o `some` para verificar se a primeira letra do nome atual (`name[0]`) da iteração é igual à letra desejada (`letter`).

Ao verificar se existe um nome que começa com a letra `J`, o retorno é `true`. Isso significa que existe um nome que começa com a letra `J`. Já ao verificar se existe um nome que inicia com `X`, o retorno é `false`, pois não existe nenhum nome que inicie com `X`. 

---

### Array.every

Imagine que você pegou um boletim escolar antigo e quer verificar se passou em todas as matérias. Como você faria? 🤔

Ao utilizar a função `every`, você consegue resolver esse problema. Caso tenha passado em todas as matérias, o retorno será `true`; caso contrário, será `false`. Analise e execute o código abaixo:

```js
const grades = {
  portugues: 'Aprovado',
  matematica: 'Reprovado',
  ingles: 'Aprovado',
};

const verifyGrades = Object.values(grades).every((grade) => grade === 'Aprovado'); // false

console.log(verifyGrades);
```

Vamos analisar a função acima?

- A variável `verifyGrades` é responsável por salvar a lógica;

- Ao utilizar o `Object.values`, o retorno será um `array` com os **valores** das chaves do objeto `grades` como `['Aprovado', 'Reprovado', 'Aprovado']`;

- Então o `every` executa a _callback_ para cada um dos itens do `array` e verifica se **todos** eles possuem o texto `'Aprovado'`;

- O retorno é `false`, pois nem todos os valores das chaves do objeto `grades` são iguais a `'Aprovado'`.

> **De olho na dica 👀:** para manter seu código conciso e evitar que erros aconteçam, você pode utilizar o método `toLowerCase()` para deixar todos os itens do `array` com letras minúsculas. Por exemplo: `grade.toLowerCase() === 'aprovado'

---

### Array.map

A função `map` possui a mesma estrutura que o `forEach`, o que muda é o seu retorno.

As principais diferenças são:

- O `map` aplica sobre os elementos de um array uma função e retorna um array novo, sem modificar o original;

- O `forEach` não tem retorno, ele é _genérico_ e pode fazer diversas coisas, como executar uma função para cada elemento do array, modificar o array, atribuir valores a variáveis ou objetos, etc.

Veja a diferença entre fazer uma mesma função usando `for` e, em seguida, usando `map`:

```js
const persons = [
  { firstName: 'Maria', lastName: 'Ferreira' },
  { firstName: 'João', lastName: 'Silva' },
  { firstName: 'Antonio', lastName: 'Cabral' },
];

const fullNames = [];

for (let index = 0; index < persons.length; index += 1) {
  fullNames.push(`${persons[index].firstName} ${persons[index].lastName}`);
}

console.log(fullNames);

```

Agora com a função `map`:

```js
const persons = [
  { firstName: 'Maria', lastName: 'Ferreira' },
  { firstName: 'João', lastName: 'Silva' },
  { firstName: 'Antonio', lastName: 'Cabral' },
];

const fullNames = persons.map((person) => `${person.firstName} ${person.lastName}`);

console.log(fullNames); // [ 'Maria Ferreira', 'João Silva', 'Antonio Cabral' ]

```

O `for` foi substituído por apenas uma linha de código.

A função juntou o primeiro nome com o sobrenome de cada pessoa e retornou um array novo com cada um dos valores. Observe que o tamanho dos arrays `persons` e `fullNames` é o mesmo (3 elementos).

---

## Array.filter

O `filter` é uma função responsável por realizar algum tipo de filtro no array, de acordo com uma condição.

Imagine que você tenha ficado responsável por um sistema de cadastro de clientes de uma loja de roupas e precise apenas dos nomes. Ao salvar o cadastro, o nome e o número do telefone foram salvos dentro de um mesmo array.

O código abaixo mostra como ficou o resultado do array:

```js
const dados = ['Luca', 91234567, 'Ana', 92345678, 'Marlete', 93456789];
```

Como você faz para recuperar apenas os nomes?

É nessa situação que o `filter` entra em ação! A sintaxe dele é a seguinte:

```js
array.filter(() => {});
```

O `filter` faz uma iteração no array e recebe como parâmetro uma _callback_.

> **Relembrando 🧠:** Uma _callback_ é uma função que é passada por parâmetro para outra função.

Essa _callback_ recebe como primeiro parâmetro o elemento do array:

```js
array.filter((item) => {});
```

Dentro do escopo da função é onde inserimos a condição a ser filtrada.

> **Para refletir 💭:** Você precisa filtrar apenas o nome das pessoas do seu array `dados`. Ele possui dois tipos de informações: o nome, que é do tipo string, e o número de telefone, que é do tipo number.
> Pensando nisso, como você faria para pegar apenas os elementos do tipo string, que são referentes ao nome das pessoas? 🤔

Se você pensou no `filter`, acertou! Você pode realizar a filtragem do array `dados` e na condição, verificar pelos elementos do tipo string. Copie o código abaixo, execute no terminal do seu navegador e veja o que ele te retorna:

```js
const dados = ['Luca', 91234567, 'Ana', 92345678, 'Marlete', 93456789];

dados.filter((item) => {
  // retorne apenas os elementos que são do tipo string
  return typeof item === 'string';
});
```

Viu só? O `filter` retornou um array de nomes!

Você pode fazer esse código em apenas uma linha, omitindo a palavra `return` e retornando o valor logo após a  arrow `=>`:

```js
const dados = ['Luca', 91234567, 'Ana', 92345678, 'Marlete', 93456789];

dados.filter((item) => typeof item === 'string');
```

Dessa forma, você consegue realizar a filtragem do array de acordo com uma condição especificada por você.

Agora vamos supor que você queira apenas os valores que não são _strings_ do array `dados`. Como faria isso? Basta alterar a condição do nosso filter!

```js
dados.filter((item) =>  typeof item !== 'string');
```

A condição de dentro do `filter` é para retornar sempre que o elemento for diferente de _string_. Rode o código acima por conta própria e altere a condição do filter para ver diferentes resultados.

Imagine agora que você possua um array chamado `listaNumeros` com os valores `10, 20, 30, 40`.

```js
const listaNumeros = [10, 20, 30, 40];
```

Você precisa somente dos números maiores que 20 do array `listaNumeros`. Como isso pode ser feito? Se você pensou em utilizar o método `filter`, acertou de novo! O array pode ser filtrado com a condição de o número ser maior que 20. Mais uma vez, copie o código abaixo e execute no terminal do seu navegador e veja o que ele te retorna:

```js
const listaNumeros = [10, 20, 30, 40];

// Armazena o resultado em uma nova variável maiorVinte
let maiorVinte = listaNumeros.filter((item) => {
  // retorne apenas os elementos que são maiores do que vinte
  return item > 20;
});

console.log(maiorVinte);
```

Observe que o retorno da função é um novo array (`maiorVinte`) contendo os números que passaram pelo filtro.

---

### Array.reduce

A função `reduce` no JavaScript é usada para "reduzir" (ou combinar) todos os elementos de um array em um único valor. Ela faz isso executando uma função em cada elemento do array, acumulando o resultado à medida que percorre o array.

Aqui está uma explicação simples:

```javascript
array.reduce((acumulador, valorAtual) => {
    // código que combina o acumulador e o valorAtual
    return novoValorDoAcumulador;
}, valorInicial);
```

- array: é o array em que você está aplicando o reduce.
- acumulador: é como uma "caixa" onde você guarda o valor combinado até o momento.
- valorAtual: é o item atual do array que está sendo processado.
- valorInicial: é o valor inicial do acumulador (pode ser qualquer valor, como 0, uma string vazia, um objeto, etc). É um valor opcional, embora relevante.

#### Exemplo 1: Somar números

Imagine que você quer somar todos os números em um array.

```javascript
const numeros = [1, 2, 3, 4];
const soma = numeros.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual;
}, 0);

console.log(soma); // 10
```

- acumulador começa em 0 (valor inicial).
- O reduce passa por cada número do array e adiciona ao acumulador.
- Ao final, o acumulador tem o valor total da soma: 10.

#### Exemplo 2: Juntar palavras

Vamos supor que você tenha um array de palavras e queira juntá-las em uma única frase.

```javascript
const palavras = ['Aprender', 'JavaScript', 'é', 'divertido'];
const frase = palavras.reduce((acumulador, valorAtual) => {
    return acumulador + ' ' + valorAtual;
}, '');

console.log(frase); // "Aprender JavaScript é divertido"
```

Aqui:

- acumulador começa como uma string vazia ''.
- Em cada iteração, valorAtual é adicionado à frase, separando as palavras por um espaço.
