const alunos = [
  {
    nome: "Ana Souza",
    matricula: "202101",
    telefone: "99999-1234",
    email: "ana@email.com",
    campus: "São Paulo",
    curso: "Engenharia de Software",
    disciplinas: ["Programação", "Algoritmos", "Banco de Dados"]
  },
  {
    nome: "João Silva",
    matricula: "202102",
    telefone: "98888-4321",
    email: "joao@email.com",
    campus: "Rio de Janeiro",
    curso: "Ciência da Computação",
    disciplinas: ["Matemática", "Estrutura de Dados", "Inteligência Artificial"]
  },
  {
    nome: "Maria Oliveira",
    matricula: "202103",
    telefone: "97777-6543",
    email: "maria@email.com",
    campus: "São Paulo",
    curso: "Engenharia Civil",
    disciplinas: ["Física", "Cálculo", "Resistência dos Materiais"]
  },
  {
    nome: "Pedro Santos",
    matricula: "202104",
    telefone: "96666-9876",
    email: "pedro@email.com",
    campus: "Belo Horizonte",
    curso: "Engenharia Mecânica",
    disciplinas: ["Termodinâmica", "Mecânica dos Fluídos", "Cálculo"]
  },
  {
    nome: "Carlos Pereira",
    matricula: "202105",
    telefone: "95555-3456",
    email: "carlos@email.com",
    campus: "Curitiba",
    curso: "Engenharia Elétrica",
    disciplinas: ["Circuitos", "Eletromagnetismo", "Eletrônica"]
  },
  {
    nome: "Fernanda Lima",
    matricula: "202106",
    telefone: "94444-1234",
    email: "fernanda@email.com",
    campus: "São Paulo",
    curso: "Arquitetura",
    disciplinas: ["Desenho Técnico", "História da Arte", "Projeto Arquitetônico"]
  },
  {
    nome: "Lucas Almeida",
    matricula: "202107",
    telefone: "93333-6543",
    email: "lucas@email.com",
    campus: "Rio de Janeiro",
    curso: "Design Gráfico",
    disciplinas: ["Tipografia", "Identidade Visual", "Design de Interfaces"]
  },
  {
    nome: "Gabriela Rocha",
    matricula: "202108",
    telefone: "92222-8765",
    email: "gabriela@email.com",
    campus: "São Paulo",
    curso: "Marketing",
    disciplinas: ["Marketing Digital", "SEO", "Comportamento do Consumidor"]
  },
  {
    nome: "Roberto Nunes",
    matricula: "202109",
    telefone: "91111-4321",
    email: "roberto@email.com",
    campus: "Brasília",
    curso: "Administração",
    disciplinas: ["Gestão de Pessoas", "Finanças", "Empreendedorismo"]
  },
  {
    nome: "Camila Costa",
    matricula: "202110",
    telefone: "90000-1234",
    email: "camila@email.com",
    campus: "Recife",
    curso: "Direito",
    disciplinas: ["Direito Civil", "Direito Penal", "Constitucional"]
  },
  {
    nome: "Felipe Martins",
    matricula: "202111",
    telefone: "98989-8765",
    email: "felipe@email.com",
    campus: "Porto Alegre",
    curso: "Engenharia de Produção",
    disciplinas: ["Logística", "Gestão de Processos", "Qualidade"]
  },
  {
    nome: "Juliana Mendes",
    matricula: "202112",
    telefone: "97878-4321",
    email: "juliana@email.com",
    campus: "Belo Horizonte",
    curso: "Medicina",
    disciplinas: ["Anatomia", "Fisiologia", "Patologia"]
  },
  {
    nome: "Thiago Moreira",
    matricula: "202113",
    telefone: "96767-6543",
    email: "thiago@email.com",
    campus: "Curitiba",
    curso: "Odontologia",
    disciplinas: ["Anatomia Dental", "Clínica Odontológica", "Prótese"]
  },
  {
    nome: "Amanda Lopes",
    matricula: "202114",
    telefone: "95656-9876",
    email: "amanda@email.com",
    campus: "Salvador",
    curso: "Psicologia",
    disciplinas: ["Psicanálise", "Comportamento Humano", "Neurociência"]
  },
  {
    nome: "André Carvalho",
    matricula: "202115",
    telefone: "94545-3456",
    email: "andre@email.com",
    campus: "Manaus",
    curso: "Ciências Biológicas",
    disciplinas: ["Genética", "Ecologia", "Biologia Molecular"]
  },
  {
    nome: "Patrícia Ramos",
    matricula: "202116",
    telefone: "93434-1234",
    email: "patricia@email.com",
    campus: "São Paulo",
    curso: "Jornalismo",
    disciplinas: ["Redação", "Comunicação Visual", "Ética Jornalística"]
  },
  {
    nome: "Diego Farias",
    matricula: "202117",
    telefone: "92323-6543",
    email: "diego@email.com",
    campus: "Rio de Janeiro",
    curso: "Educação Física",
    disciplinas: ["Fisiologia do Exercício", "Treinamento", "Nutrição"]
  },
  {
    nome: "Vanessa Oliveira",
    matricula: "202118",
    telefone: "91212-8765",
    email: "vanessa@email.com",
    campus: "Brasília",
    curso: "Letras",
    disciplinas: ["Gramática", "Literatura Brasileira", "Análise de Texto"]
  },
  {
    nome: "Eduardo Costa",
    matricula: "202119",
    telefone: "90101-4321",
    email: "eduardo@email.com",
    campus: "São Paulo",
    curso: "Ciências Contábeis",
    disciplinas: ["Contabilidade", "Finanças", "Auditoria"]
  },
  {
    nome: "Lívia Martins",
    matricula: "202120",
    telefone: "99090-1234",
    email: "livia@email.com",
    campus: "Recife",
    curso: "Turismo",
    disciplinas: ["Hospitalidade", "Eventos", "Marketing"]
  }
];

console.log(`Exercicio 5`)
const nomesdosalunos = alunos.filter((nomealunos)=>{
    return nomealunos.nome
})
console.log(nomesdosalunos)
console.log(`______________________________________`)
console.log(`Exercicio 6`)
const nomesdosalunossp = alunos.filter((campussp)=>{
  return campussp.campus==="São Paulo"
})
console.log(nomesdosalunossp)
console.log(`______________________________________`)
console.log(`Exercicio 7`)
const alunomedicina = alunos.find((alunomedicinacurso)=>{
  return alunomedicinacurso.curso==="Medicina"

})
console.log(alunomedicina)
console.log(`______________________________________`)
console.log(`Exercicio 8 - A`)
const engenhariaeletrica = alunos.some((enge)=>{
  return enge.curso ==="Engenharia Elétrica"
})
console.log(engenhariaeletrica)
console.log(`______________________________________`)
console.log(`Exercicio 8 - B`)
const algums = alunos.every((algumacadastrada)=>{
  return algumacadastrada.disciplinas.length>=1
})
console.log(algums)
console.log(`______________________________________`)
console.log(`Exercicio 9`)
const aluno = alunos.forEach((cada)=>{
  console.log(`O aluno ${cada.nome} estuda no campus ${cada.campus} e está no curso de ${cada.curso}.`)
})
console.log(`______________________________________`)


