# [PCD2] EXERCÍCIO 1 - Funções de Ordem Superior

## Para os exercícios 1 a 4, considere o array `numeros`:

```javascript
const numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
```

### Exercício 1 – `forEach`

Percorra o array e exiba no console o **dobro de cada número**.

---

### Exercício 2 – `filter` + `map`

Crie um novo array contendo apenas os **números maiores que 50** e transforme cada um deles em seu **quadrado**.

---

### Exercício 3 – `some` e `every`

a) Verifique se **algum número do array é par**.

b) Verifique se **todos os números são menores que 200**.

---

### Exercício 4 – `reduce`

Calcule a **soma de todos os números** do array.

---

## Para os exercícios 5 a 9, considere o array `alunos`.

---

## 📘 Lista de Exercícios – Funções de Ordem Superior com `alunos`

Considere o array:

```javascript
const alunos = [
  { nome: "Ana Souza", matricula: "202101", campus: "São Paulo", curso: "Engenharia de Software", disciplinas: ["Programação", "Algoritmos", "Banco de Dados"] },
  { nome: "João Silva", matricula: "202102", campus: "Rio de Janeiro", curso: "Ciência da Computação", disciplinas: ["Matemática", "Estrutura de Dados", "Inteligência Artificial"] },
  // ... demais alunos
];
```

---

### Exercício 5 – `map`

Crie um array contendo **apenas os nomes dos alunos**.

---

### Exercício 6 – `filter`

Liste apenas os alunos que estudam no **campus São Paulo**.

---

### Exercício 7 – `find`

Encontre o **primeiro aluno matriculado em Medicina**.

---

### Exercício 8 – `some` e `every`

a) Verifique se existe **algum aluno do curso de Engenharia Elétrica**.
b) Verifique se **todos os alunos possuem pelo menos uma disciplina cadastrada**.

---

### Exercício 9 – `forEach`

Percorra o array e exiba no console a seguinte frase para cada aluno:

```
"O aluno NOME estuda no campus CAMPUS e está no curso de CURSO."
```

