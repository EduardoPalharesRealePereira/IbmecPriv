// Catálogo institucional: bancas, cursos e matérias oferecidas pela plataforma.
// Em produção isso viria da API da instituição contratante.

export const BANCAS = [
  { id: 'enem', nome: 'ENEM', desc: 'Prova nacional, 5 dias de conteúdo interdisciplinar' },
  { id: 'fuvest', nome: 'FUVEST', desc: 'USP — 1ª fase objetiva + 2ª fase discursiva' },
  { id: 'unicamp', nome: 'UNICAMP', desc: 'Comvest — questões contextualizadas' },
  { id: 'uerj', nome: 'UERJ', desc: 'Exames de Qualificação + Discursivo' },
  { id: 'unesp', nome: 'UNESP', desc: 'VUNESP — foco em interpretação' },
  { id: 'ita', nome: 'ITA', desc: 'Exatas em nível avançado' },
  { id: 'ime', nome: 'IME', desc: 'Engenharia militar, matemática pesada' },
  { id: 'ufrj', nome: 'UFRJ', desc: 'Ingresso via ENEM/SISU' },
  { id: 'pucrio', nome: 'PUC-Rio', desc: 'Vestibular próprio + ENEM' },
  { id: 'ufmg', nome: 'UFMG', desc: 'Ingresso via ENEM/SISU' },
]

export const CURSOS = [
  { id: 'medicina', nome: 'Medicina', area: 'Saúde' },
  { id: 'enfermagem', nome: 'Enfermagem', area: 'Saúde' },
  { id: 'odontologia', nome: 'Odontologia', area: 'Saúde' },
  { id: 'psicologia', nome: 'Psicologia', area: 'Saúde' },
  { id: 'eng-computacao', nome: 'Engenharia de Computação', area: 'Exatas' },
  { id: 'eng-civil', nome: 'Engenharia Civil', area: 'Exatas' },
  { id: 'eng-producao', nome: 'Engenharia de Produção', area: 'Exatas' },
  { id: 'ciencia-computacao', nome: 'Ciência da Computação', area: 'Exatas' },
  { id: 'arquitetura', nome: 'Arquitetura e Urbanismo', area: 'Exatas' },
  { id: 'direito', nome: 'Direito', area: 'Humanas' },
  { id: 'administracao', nome: 'Administração', area: 'Humanas' },
  { id: 'economia', nome: 'Economia', area: 'Humanas' },
  { id: 'rel-internacionais', nome: 'Relações Internacionais', area: 'Humanas' },
  { id: 'design', nome: 'Design', area: 'Humanas' },
]

export const MATERIAS = [
  { id: 'matematica', nome: 'Matemática', area: 'Exatas', icone: '∑' },
  { id: 'fisica', nome: 'Física', area: 'Exatas', icone: '⚛' },
  { id: 'quimica', nome: 'Química', area: 'Natureza', icone: '⚗' },
  { id: 'biologia', nome: 'Biologia', area: 'Natureza', icone: '🧬' },
  { id: 'historia', nome: 'História', area: 'Humanas', icone: '🏛' },
  { id: 'geografia', nome: 'Geografia', area: 'Humanas', icone: '🌎' },
  { id: 'portugues', nome: 'Português', area: 'Linguagens', icone: '✍' },
  { id: 'ingles', nome: 'Inglês', area: 'Linguagens', icone: '🌐' },
]

export const DIFICULDADES = [
  { id: 'todas', nome: 'Todas' },
  { id: 'facil', nome: 'Fácil' },
  { id: 'media', nome: 'Média' },
  { id: 'dificil', nome: 'Difícil' },
]

export const TIPOS_META = [
  { id: 'horas', nome: 'Horas de estudo', unidade: 'h' },
  { id: 'questoes', nome: 'Questões resolvidas', unidade: 'questões' },
  { id: 'aulas', nome: 'Aulas/módulos concluídos', unidade: 'aulas' },
]

export const materiaById = (id) => MATERIAS.find((m) => m.id === id)
export const bancaById = (id) => BANCAS.find((b) => b.id === id)
export const cursoById = (id) => CURSOS.find((c) => c.id === id)
