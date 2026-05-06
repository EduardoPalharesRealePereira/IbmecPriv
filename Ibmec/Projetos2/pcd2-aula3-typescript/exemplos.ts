// Inferência por tipos
let numero = 2;
// numero = true;

// Tipagem explícita (é o que será cobrado na AP1)
let novoNumero: number = 10.2;
let novoNumero2: number;
novoNumero2 = 70;

let frase: string = "Olá, boa noite!";
let provasChegando: boolean = false;

let hobbies: string[] = ["Guitarra", "Leitura", "Jardinagem"];
// mais de um tipo aceito.
let novoArray: (number | boolean | string)[] = [2, 3, 4, true, "Tamara", 2];

let naoRecomendado: any; // remove a verificação de tipos

let livro: { titulo: string; autor: string; paginas: number };

function soma(a: number, b: number): number {
  return a + b;
}

// console.log(soma(2, "3"))

// Restrição de valores
let pizza: "brotinho" | "média" | "grande" | "gigante" | 2;

// Interfaces
interface Produto {
  id: number;
  name: string;
  price: number;
  avaliable?: boolean; // propriedade opcional
}

// crie um array de produtos do tipo Produto.
let produtos: Produto[] = [{ id: 1, name: "Iphone 17", price: 10000 }];

// // Type
// type User = {
//   id: number;
//   name: string;
//   permission: string;
// };

// 1. 
// a) Crie uma interface Funcionario contendo nome, cargo e salario. 0,25
// b) Depois, crie uma função que receba um funcionário e exiba uma mensagem informando seu nome e o seu salário. Tipifique a função corretamente. Além disso, a função não pode ser do tipo void. 0,75

interface Funcionario {
  nome: string;
  cargo: string;
  salario: number;
}

const mensagem = (xablau: Funcionario): string => {
  return `A pessoa ${xablau.nome} possui o salário de ${xablau.salario}`;
};

// 3. Biblioteca Digital
// Crie uma interface Livro com titulo, autor e anoPublicacao. 
// Logo após, crie uma nova interface Artigo, que seja uma extensão de Livro, adicionando as propriedades revista, numero e paginas. 
// Por fim, declare um novo objeto do tipo Artigo e preencha as entradas até que não haja mensagens de erro.

interface Livro {
  titulo: string;
  autor: string;
  anoPublicacao: number
}

type User = {
  id: number;
  name: string;
  permission: string,
  password: string
};

// Utilitários do TS
// Partial - todos os tipos passam a ser opcionais
let novoLivro: Partial<Livro> = {titulo: "Título do Livro"}

// Pick - contém apenas algumas propriedades do tipo original
let novoUser: Pick<User, "id" | "name"> = {id: 1, name: "user001"}

// Omit - remove propriedades de um tipo.
let novoUser2: Omit<User, "password"> = {id: 2, name: "Tamara", permission: "admin"}

