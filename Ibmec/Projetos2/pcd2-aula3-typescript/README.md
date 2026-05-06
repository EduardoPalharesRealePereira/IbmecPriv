# [PCD2] AULA 3  - Introdução ao TypeScript

- [Link do TS Playground](https://www.typescriptlang.org/play)
- [Exemplos da aula](https://www.typescriptlang.org/play/?#code/PTAEBUEsAcEMHMCmBbUiAe0A2BbgxpAC6wBQWihoyAngHKzKIBcoAzoQE6QB28JN9RqAC8oAETgGsDrDEkyFUNwCujDgHsWK5ACNEHEaADsARnkgAktwBm+gFfcCsUABNEEGOtYLKjVqwR3UTEAeUgAGlBCF1A9ZAB+ORIQD2h1UFhuahZnADdpSABD3MQsDLxEImcAR2VYLFr9UHysdQ4AOlAAVUJILEgAL2lQWsyXdO4AY-TCFFAKjlmh1xnPV3cXWHGMtiblXv6h8c6evsHhvHVUOA4CZAAX7khSckpofVZ1bh8MpBys8xgKBwJCoObSGTUVigAC0aEwuAIxFA6mUGW46mIAHPpusop4ftwGIhWCx2FxeABtAC6oBS-XYzjcbE4PHg3leSlUeg4pK5un0NMBqUCqGZENgULQqB4tg4DiceN6aR+gWhokpACZIgAWSIAVkiRkiJgADNThcDRdLQNZlNwsQBXkkkO2OXpfNiqAAUsC03P0kR0-oFHAAlCxcupIDEAN4kUCJ+ZfdigDgk5RYSiiZwAaliAG4E0n04RlBxuGmM1miwBfUDJMCjbjbVTON04ia40ttIlKLawSKsRBo5XpACXzWjLkbrkgeD9oFl+kgBjHK1AN2JnHS7lWaVc7ftnctMGtzPUOgAVhQvD9lMOOCxY0TGGTWbxIoEQzzIumsLAHrcKwAAWMDxO+FLwPWKTcCSszzLAnx-qUgGQCmYHQKAk7qNABBfPU8gPk0ojxkm-ZvuIkjINIsgkLWwpdC2iDWDwiAuCwzbbHkBTFKUSi4rMqCqM09RtBkrI6MoODjLOtCZlgnF1C26SNAYbisU8Bg8LMjjoUSWCMNwCHOLAD4Ks8eIiS0bSMU8nqENQ7wcoo6asGkwHMCyUGgAAPlyWBYKeaTQu8vIEYcWxeCweBcMMXibhwADP0BcAlwJ3rOVizBw1iwBU3g6foeUVKAAAKGguMoeCUGRSYxj+gbFomr5eeSbLhM1iXzl52g8vR8hujV+lKIgADuFXqFVNXeqlU3VYQLCTdNhBhqAdWJnNK3tDGhgmJ15FbQt7StYYYgWNAIFfO4JgAGxiAdSZHTV7SpT1e06pqpqmp1tZAA)

--- 

<details>
    
<summary>
<h2>O que é TypeScript?</h2>
</summary>

TypeScript é um superset do JavaScript desenvolvido pela Microsoft que adiciona tipagem estática ao código. Isso significa que podemos definir tipos para variáveis, funções e objetos, ajudando a evitar erros e tornando o desenvolvimento mais previsível e seguro. Ele é amplamente utilizado em projetos que exigem maior controle sobre o código, como aplicações web escaláveis e manutenção de código legado.

**Benefícios do TypeScript**

- **Tipagem estática**: evita erros comuns em tempo de execução.
- **Melhor suporte para IDEs**: oferece autocompletar, inferência de tipos e sugestões mais precisas.
- **Organização do código**: facilita a leitura e manutenção de projetos grandes.
- **Compatibilidade com JavaScript**: qualquer código JavaScript válido também é um código TypeScript válido.

</details>

<details>
    
<summary>
<h2>Tipagem Estática</h2>
</summary>

### Tipagem Explícita

```typescript
let myName: string;
myName = "Tamara";

let numero: number = 71;
```

Aqui, a variável `myName` só pode armazenar valores do tipo `string`, e `numero` só pode armazenar valores do tipo `number`.

### Inferência de Tipos

```typescript
let message = "Oi, td bem?";
```

O TypeScript infere automaticamente que `message` é do tipo `string`, pois recebeu um valor inicial desse tipo.

### Tipo `any`

O tipo `any` permite armazenar qualquer tipo de dado, mas deve ser usado com cuidado, pois remove a verificação de tipos.

```typescript
let person;
let age: any;
```

### Tipagem em Arrays

Podemos definir arrays explicitamente ou deixar o TypeScript inferir o tipo:

```typescript
let names: string[]; // Lista de strings
let numbers: number[]; // Lista de números

let ages = [2, 4, 5, 7, 10]; // TypeScript infere que é um array de números
```

### Tipagem em Funções

Podemos definir os tipos dos parâmetros e do retorno de funções.

```typescript
function sum(a: number, b: number): number {
    return a + b;
}
```

Se uma função não retorna nada, usamos o tipo `void`:

```typescript
function logMessage(message: string): void {
    console.log(message);
}
```

### Tipagem de Objetos

Podemos definir objetos com tipos específicos para suas propriedades.

```typescript
let user: {name: string, age: number, relationship?: string};

user = {
    name: "Tamara",
    age: 30
};
```

O `?` indica que a propriedade `relationship` é opcional.

### `Undefined` e `Null`

- **`undefined`**: quando a variável não tem um valor atribuído.
- **`null`**: quando queremos definir intencionalmente a ausência de um valor.

```typescript
let response: string | null;
```

</details>

<details>
    
<summary>
<h2>Tipos Personalizados</h2>
</summary>

### `interface`

Interfaces permitem definir tipos personalizados para objetos.

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
}

function newProduct(product: Product) {
    product.id = 1;
    product.name = "Iphone 16";
    product.price = 14200;
}
```

Aqui, a interface `Product` define um modelo para objetos de produtos, garantindo que sempre terão as propriedades `id`, `name` e `price`.

### `type`

Outra forma de definir tipos personalizados é usando `type`, que permite criar alias para tipos mais complexos.

```typescript
type User = {
    id: number;
    name: string;
    email: string;
};

let user: User = {
    id: 1,
    name: "Tamara",
    email: "tamara@example.com"
};
```

A diferença entre `type` e `interface` é que `type` permite criar tipos mais complexos, como uniões e interseções.

```typescript
type Admin = {
    role: string;
} & User;

const admin: Admin = {
    id: 1,
    name: "Tamara",
    email: "tamara@example.com",
    role: "Super Admin"
};
```

</details>

<details>

<summary>
<h2>Restrições de Valores</h2>
</summary>

O TypeScript permite restringir valores aceitos por variáveis, ajudando a evitar erros e garantindo que só determinados valores possam ser atribuídos.

### **Uso de `union types` (União de Tipos)**
Podemos restringir os valores aceitos usando uma união de tipos.

```typescript
let estado: "carregando" | "sucesso" | "erro";

estado = "sucesso"; // ✅ Válido
estado = "carregando"; // ✅ Válido
estado = "falha"; // ❌ Erro: "falha" não está na lista de valores permitidos
```

Isso é útil para estados de aplicações, botões, ou qualquer variável que tenha opções fixas.

---

### **Uso de `enum`**
Outra forma de restringir valores é com `enum`, que define um conjunto fixo de valores nomeados.

```typescript
enum Direcao {
    Cima,
    Baixo,
    Esquerda,
    Direita
}

let movimento: Direcao;
movimento = Direcao.Cima; // ✅ Válido
movimento = Direcao.Esquerda; // ✅ Válido
movimento = 4; // ❌ Erro: 4 não está no enum
```

Enums são úteis para representar opções fixas, como teclas de um jogo ou categorias de produtos.

---

### **Uso de `as const` (Valores Literais Imutáveis)**
Podemos garantir que uma variável não mude de valor após ser atribuída.

```typescript
const tipoUsuario = "admin" as const;
// tipoUsuario só pode ser "admin", nada mais.

let permissao: typeof tipoUsuario;
// permissao só pode ser "admin".
```

Isso é útil para garantir que valores constantes não sejam alterados acidentalmente.

</details>

<details>
    
<summary>
<h2>Asserção de Tipos</h2>
</summary>

A asserção de tipos permite ao TypeScript entender que um determinado valor tem um tipo específico, útil em situações onde o compilador não consegue inferir corretamente.

```typescript
let dado: any = "Tamara";
let nome: string = dado as string;

console.log(nome); // Saída: Tamara
```

</details>

<details>
    
<summary>
<h2>Utilitários do TypeScript</h2>
</summary>

O TypeScript fornece utilitários embutidos para manipulação de tipos.

### `Partial<T>`

Cria um novo tipo onde todas as propriedades do tipo original são opcionais.

```typescript
interface Person {
    name: string;
    age: number;
}

let partialPerson: Partial<Person> = {
    name: "Tamara"
};
```

### `Pick<T, K>`

Cria um tipo que contém apenas algumas propriedades de um tipo original.

```typescript
type PickedUser = Pick<User, "id" | "name">;

let user: PickedUser = {
    id: 1,
    name: "Tamara"
};
```

### `Omit<T, K>`

Remove propriedades específicas de um tipo.

```typescript
type OmittedUser = Omit<User, "email">;

let userWithoutEmail: OmittedUser = {
    id: 1,
    name: "Tamara"
};
```

### `Record<K, T>`

Cria um tipo de objeto onde as chaves `K` são de um tipo específico e os valores `T` de outro.

```typescript
type UserRoles = Record<string, string>;

let roles: UserRoles = {
    admin: "Administrador",
    user: "Usuário Comum"
};
```

### `typeof`

Permite criar um tipo baseado no tipo de uma variável.

```typescript
let person = {
    name: "Tamara",
    age: 30
};

type PersonType = typeof person;

let anotherPerson: PersonType = {
    name: "Alef",
    age: 32
};
```

### `keyof`

Retorna um tipo que representa todas as chaves de um objeto como uma união de strings.

```typescript
type UserKeys = keyof User; // "id" | "name" | "email"

let key: UserKeys = "name"; // válido
// let invalidKey: UserKeys = "password"; // inválido
```

</details>
