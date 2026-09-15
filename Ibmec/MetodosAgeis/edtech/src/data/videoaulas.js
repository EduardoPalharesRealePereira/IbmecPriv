// Acervo de videoaulas da plataforma.
//
// Cada trilha é um "curso": uma sequência de aulas na ordem em que devem ser
// assistidas. As aulas do MVP são geradas por um professor IA — o roteiro
// (tópicos + narração) é o que o player anima na tela. Em produção este mesmo
// roteiro alimentaria o render de vídeo; aqui ele é reproduzido no navegador.

/** Professores IA — um por matéria, para dar identidade às trilhas. */
export const PROFESSORES = {
  matematica: { nome: 'Ada', cadeira: 'IA de Matemática', avatar: '∑', cor: '#2f95e4' },
  fisica: { nome: 'Newton', cadeira: 'IA de Física', avatar: '⚛', cor: '#5b6ee4' },
  quimica: { nome: 'Marie', cadeira: 'IA de Química', avatar: '⚗', cor: '#12a065' },
  biologia: { nome: 'Darwin', cadeira: 'IA de Biologia', avatar: '🧬', cor: '#0f9d8f' },
  historia: { nome: 'Clio', cadeira: 'IA de História', avatar: '🏛', cor: '#b57b12' },
  geografia: { nome: 'Atlas', cadeira: 'IA de Geografia', avatar: '🌎', cor: '#147ac9' },
  portugues: { nome: 'Cecília', cadeira: 'IA de Português', avatar: '✍', cor: '#d63b3b' },
  ingles: { nome: 'Alan', cadeira: 'IA de Inglês', avatar: '🌐', cor: '#7a5bd6' },
}

export const NIVEIS = [
  { id: 'todos', nome: 'Todos os níveis' },
  { id: 'base', nome: 'Base' },
  { id: 'intermediario', nome: 'Intermediário' },
  { id: 'avancado', nome: 'Avançado' },
]

export const nivelNome = (id) => NIVEIS.find((n) => n.id === id)?.nome || id

export const TRILHAS = [
  // ─────────────────────────── MATEMÁTICA ───────────────────────────
  {
    id: 'mat-funcoes',
    materia: 'matematica',
    titulo: 'Funções: do conceito ao gráfico',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'unesp', 'ufrj', 'pucrio'],
    resumo:
      'A espinha dorsal da matemática de vestibular. Sai daqui lendo qualquer gráfico e montando a lei da função a partir do enunciado.',
    aulas: [
      {
        id: 'mat-funcoes-01',
        titulo: 'O que é uma função (e por que toda prova cobra isso)',
        min: 12,
        resumo: 'Domínio, contradomínio, imagem e a ideia de correspondência única.',
        topicos: [
          { t: 'Função é uma máquina', d: 'Cada entrada x produz exatamente uma saída f(x). Se um x devolve dois valores, não é função — e é assim que a banca te pega no gráfico.' },
          { t: 'Domínio e imagem', d: 'Domínio é tudo que pode entrar; imagem é tudo que realmente sai. Denominador zero e raiz de número negativo são os dois cortes clássicos de domínio.' },
          { t: 'Teste da reta vertical', d: 'Passe uma reta vertical pelo gráfico: se ela cruza a curva em dois pontos, aquele desenho não representa uma função.' },
        ],
        fecho: 'Todo o resto da trilha é só descobrir qual máquina o enunciado descreveu.',
      },
      {
        id: 'mat-funcoes-02',
        titulo: 'Função afim: reta, coeficiente e taxa de variação',
        min: 14,
        resumo: 'f(x) = ax + b lida como "quanto muda por unidade".',
        topicos: [
          { t: 'Quem é a e quem é b', d: 'b é onde a reta corta o eixo y (valor inicial); a é a inclinação, ou seja, quanto f(x) muda a cada +1 em x.' },
          { t: 'Montar a lei a partir de dois pontos', d: 'a = (y₂ − y₁)/(x₂ − x₁). Com o a na mão, substitua um ponto qualquer e descubra o b.' },
          { t: 'O disfarce do ENEM', d: 'Conta de luz, plano de celular e corrida de táxi são todos ax + b: taxa fixa é o b, valor por unidade é o a.' },
        ],
        fecho: 'Se o enunciado diz "além de uma taxa fixa, cobra tanto por unidade", já escreva ax + b.',
      },
      {
        id: 'mat-funcoes-03',
        titulo: 'Função quadrática: parábola, raízes e vértice',
        min: 16,
        resumo: 'Bhaskara é só o começo — o que a prova quer é o vértice.',
        topicos: [
          { t: 'Concavidade e discriminante', d: 'a > 0 abre para cima, a < 0 para baixo. Δ > 0 dá duas raízes, Δ = 0 dá uma, Δ < 0 não corta o eixo x.' },
          { t: 'Vértice = máximo ou mínimo', d: 'xᵥ = −b/2a e yᵥ = −Δ/4a. Toda questão de "lucro máximo" ou "altura máxima" morre nessas duas fórmulas.' },
          { t: 'Forma fatorada', d: 'Conhecendo as raízes, escreva f(x) = a(x − x₁)(x − x₂). Isso encurta muito questão que dá o gráfico e pede a lei.' },
        ],
        fecho: 'Leu "valor máximo" ou "valor mínimo"? Vá direto para o vértice.',
      },
      {
        id: 'mat-funcoes-04',
        titulo: 'Exponencial e logaritmo sem decorar tabela',
        min: 15,
        resumo: 'Crescimento que multiplica e a operação que desfaz isso.',
        topicos: [
          { t: 'A base manda no comportamento', d: 'Em f(x) = a·bˣ, se b > 1 o valor cresce multiplicando; se 0 < b < 1 ele decai. Juros, população e meia-vida são todos esse mesmo modelo.' },
          { t: 'Log é a pergunta inversa', d: 'log_b(y) = x significa "a que expoente elevo b para chegar em y". Sempre que o x está preso no expoente, aplique log dos dois lados.' },
          { t: 'Três propriedades resolvem tudo', d: 'log(mn) = log m + log n, log(m/n) = log m − log n e log(mᵏ) = k·log m. A terceira é a que liberta o expoente.' },
        ],
        fecho: 'Incógnita no expoente é sinal de logaritmo — não tente isolar na força bruta.',
      },
    ],
  },
  {
    id: 'mat-geometria',
    materia: 'matematica',
    titulo: 'Geometria e trigonometria de prova',
    nivel: 'intermediario',
    bancas: ['fuvest', 'unicamp', 'ita', 'ime', 'unesp', 'enem'],
    resumo:
      'Áreas, semelhança, círculo trigonométrico e as relações que aparecem em toda prova de exatas.',
    aulas: [
      {
        id: 'mat-geometria-01',
        titulo: 'Áreas e perímetros: o kit obrigatório',
        min: 11,
        resumo: 'As figuras planas que caem sempre e como decompor as esquisitas.',
        topicos: [
          { t: 'Decomponha antes de calcular', d: 'Figura estranha quase nunca tem fórmula própria: recorte em retângulos e triângulos, some as partes e pronto.' },
          { t: 'Círculo é área πr² e comprimento 2πr', d: 'Não troque os dois. Setor circular é a fração do ângulo sobre 360° multiplicada pela área total.' },
          { t: 'Escala eleva ao quadrado', d: 'Se todos os lados dobram, o perímetro dobra mas a área quadruplica. Essa pegadinha aparece todo ano.' },
        ],
        fecho: 'Área cresce com o quadrado da razão; volume, com o cubo.',
      },
      {
        id: 'mat-geometria-02',
        titulo: 'Semelhança, Tales e Pitágoras',
        min: 13,
        resumo: 'Triângulos parecidos são a ferramenta mais barata da prova.',
        topicos: [
          { t: 'Ângulos iguais, lados proporcionais', d: 'Dois ângulos iguais já garantem semelhança. A partir daí, monte a proporção entre os lados correspondentes.' },
          { t: 'Feixe de paralelas', d: 'Teorema de Tales: paralelas cortadas por transversais dividem os segmentos na mesma razão. Sombra e altura de prédio caem nisso.' },
          { t: 'Relações métricas', d: 'No triângulo retângulo: a² = b² + c², mas também a·h = b·c e b² = a·m. As duas últimas economizam páginas de conta.' },
        ],
        fecho: 'Viu triângulo dentro de triângulo? Teste semelhança antes de qualquer outra coisa.',
      },
      {
        id: 'mat-geometria-03',
        titulo: 'Trigonometria no triângulo e no círculo',
        min: 15,
        resumo: 'Seno, cosseno e tangente: quando usar cada um.',
        topicos: [
          { t: 'SOH-CAH-TOA', d: 'Seno é cateto oposto sobre hipotenusa, cosseno é adjacente sobre hipotenusa, tangente é oposto sobre adjacente. Escolha pelo que o problema dá e pelo que ele pede.' },
          { t: 'Ângulos notáveis', d: '30°, 45° e 60° têm valores que você precisa reconhecer de imediato — eles aparecem em quase toda questão de rampa, escada e altura.' },
          { t: 'Lei dos senos e dos cossenos', d: 'Quando o triângulo não é retângulo, use a/sen A = b/sen B ou a² = b² + c² − 2bc·cos A.' },
        ],
        fecho: 'Triângulo qualquer sem ângulo reto: pense em lei dos cossenos.',
      },
      {
        id: 'mat-geometria-04',
        titulo: 'Geometria espacial: volumes que caem no ENEM',
        min: 12,
        resumo: 'Prismas, cilindros, pirâmides e cones em problemas de capacidade.',
        topicos: [
          { t: 'Prisma e cilindro', d: 'Volume = área da base × altura. Serve para caixa, piscina, lata e tanque — muda só a base.' },
          { t: 'Pirâmide e cone valem um terço', d: 'V = (área da base × altura)/3. Se a questão compara os dois sólidos com a mesma base, a razão é sempre 3 para 1.' },
          { t: 'Litro e centímetro cúbico', d: '1 L = 1 dm³ = 1000 cm³. A maioria dos erros nessa parte é de unidade, não de fórmula.' },
        ],
        fecho: 'Converta unidades antes de calcular, nunca depois.',
      },
    ],
  },

  // ───────────────────────────── FÍSICA ─────────────────────────────
  {
    id: 'fis-mecanica',
    materia: 'fisica',
    titulo: 'Mecânica sem decoreba',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unesp', 'ita', 'ime', 'ufrj'],
    resumo:
      'Cinemática, leis de Newton e energia explicadas pela lógica, com as fórmulas aparecendo como consequência.',
    aulas: [
      {
        id: 'fis-mecanica-01',
        titulo: 'Cinemática: posição, velocidade e aceleração',
        min: 14,
        resumo: 'Ler movimento em gráfico vale mais do que decorar equação.',
        topicos: [
          { t: 'MRU e MRUV', d: 'Velocidade constante dá S = S₀ + vt. Com aceleração constante entra o termo at²/2 — e a velocidade vira v = v₀ + at.' },
          { t: 'O gráfico conta a história', d: 'No gráfico v × t, a inclinação é a aceleração e a área embaixo da curva é o deslocamento. Muita questão se resolve só olhando.' },
          { t: 'Queda livre', d: 'É MRUV com a = g ≈ 10 m/s². Na subida a velocidade diminui 10 m/s a cada segundo; no ponto mais alto ela é zero, mas a aceleração não.' },
        ],
        fecho: 'Antes de escolher fórmula, pergunte: a aceleração é constante?',
      },
      {
        id: 'fis-mecanica-02',
        titulo: 'As três leis de Newton na prática',
        min: 13,
        resumo: 'Inércia, F = ma e ação-reação em diagramas de corpo livre.',
        topicos: [
          { t: 'Desenhe o diagrama de forças', d: 'Isole o corpo e desenhe só o que age nele: peso, normal, tração, atrito. Metade dos erros de mecânica nasce de força inventada.' },
          { t: 'F resultante = m·a', d: 'Se a resultante é zero, o corpo está parado ou em velocidade constante. Aceleração só existe com resultante diferente de zero.' },
          { t: 'Ação e reação em corpos diferentes', d: 'O par ação-reação nunca atua no mesmo corpo — por isso ele não se cancela e não impede o movimento.' },
        ],
        fecho: 'Peso e normal não são par de ação e reação. Essa é a pegadinha clássica.',
      },
      {
        id: 'fis-mecanica-03',
        titulo: 'Trabalho, energia e conservação',
        min: 15,
        resumo: 'O atalho que evita conta de cinemática longa.',
        topicos: [
          { t: 'Energia cinética e potencial', d: 'Ec = mv²/2 e Epg = mgh. Em sistema sem atrito, a soma das duas é constante: o que some de altura vira velocidade.' },
          { t: 'Trabalho é força vezes deslocamento', d: 'Só a componente da força na direção do movimento realiza trabalho. Força perpendicular ao deslocamento faz trabalho zero.' },
          { t: 'Quando há atrito', d: 'A energia mecânica não se conserva: a diferença virou calor, e o trabalho do atrito é exatamente essa perda.' },
        ],
        fecho: 'Pediu velocidade final e deu altura? Vá de conservação de energia, não de cinemática.',
      },
      {
        id: 'fis-mecanica-04',
        titulo: 'Quantidade de movimento e colisões',
        min: 12,
        resumo: 'O que se conserva quando dois corpos se batem.',
        topicos: [
          { t: 'Q = m·v e é vetorial', d: 'Sem força externa, a quantidade de movimento total antes é igual à de depois — inclusive o sinal, que indica o sentido.' },
          { t: 'Colisão elástica × inelástica', d: 'Nas duas a quantidade de movimento se conserva; só na elástica a energia cinética também se conserva.' },
          { t: 'Impulso', d: 'I = F·Δt = ΔQ. É por isso que airbag e capacete funcionam: aumentam o tempo e reduzem a força.' },
        ],
        fecho: 'Corpos que grudam depois do choque: colisão perfeitamente inelástica.',
      },
    ],
  },
  {
    id: 'fis-eletro',
    materia: 'fisica',
    titulo: 'Eletricidade e ondas',
    nivel: 'intermediario',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'ita'],
    resumo: 'Circuitos, potência elétrica e o comportamento das ondas — inclusive a conta da conta de luz.',
    aulas: [
      {
        id: 'fis-eletro-01',
        titulo: 'Corrente, tensão e a lei de Ohm',
        min: 12,
        resumo: 'Os três nomes que descrevem qualquer circuito simples.',
        topicos: [
          { t: 'A analogia da água', d: 'Tensão é a pressão, corrente é a vazão e resistência é o estreitamento do cano. U = R·i amarra os três.' },
          { t: 'Série × paralelo', d: 'Em série a corrente é a mesma e as resistências somam; em paralelo a tensão é a mesma e a resistência equivalente cai.' },
          { t: 'Por que a casa é ligada em paralelo', d: 'Assim cada aparelho recebe a tensão cheia e um pode desligar sem apagar os outros.' },
        ],
        fecho: 'Identifique série ou paralelo antes de qualquer cálculo.',
      },
      {
        id: 'fis-eletro-02',
        titulo: 'Potência elétrica e a conta de luz',
        min: 13,
        resumo: 'A questão mais aplicada do ENEM em física.',
        topicos: [
          { t: 'P = U·i = R·i² = U²/R', d: 'Três formas da mesma ideia. Escolha a que combina com os dados que o enunciado ofereceu.' },
          { t: 'kWh é energia, não potência', d: 'Energia = potência (kW) × tempo (h). Um chuveiro de 5500 W ligado 20 min por dia gasta cerca de 55 kWh por mês.' },
          { t: 'Efeito Joule', d: 'Resistência transformando energia elétrica em calor é o princípio do chuveiro, do ferro e do fusível.' },
        ],
        fecho: 'Converta watt para quilowatt e minuto para hora antes de multiplicar.',
      },
      {
        id: 'fis-eletro-03',
        titulo: 'Ondas: frequência, comprimento e velocidade',
        min: 14,
        resumo: 'Uma equação, v = λf, e um monte de aplicação.',
        topicos: [
          { t: 'v = λ·f', d: 'A velocidade depende do meio; a frequência depende da fonte. Ao mudar de meio, o que muda é o comprimento de onda.' },
          { t: 'Reflexão, refração e difração', d: 'Refletir é voltar, refratar é mudar de meio e desviar, difratar é contornar obstáculo. Som contorna a parede porque tem comprimento de onda grande.' },
          { t: 'Efeito Doppler', d: 'Fonte se aproximando comprime as ondas e aumenta a frequência percebida — a sirene fica mais aguda ao chegar e mais grave ao passar.' },
        ],
        fecho: 'Espectro eletromagnético: mais frequência significa mais energia.',
      },
    ],
  },

  // ───────────────────────────── QUÍMICA ─────────────────────────────
  {
    id: 'qui-geral',
    materia: 'quimica',
    titulo: 'Química geral e estequiometria',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unesp', 'ufrj', 'ufmg', 'pucrio'],
    resumo: 'Mol, balanceamento e cálculo de reagentes — a base que sustenta toda a prova de química.',
    aulas: [
      {
        id: 'qui-geral-01',
        titulo: 'Mol: a unidade que assusta sem motivo',
        min: 12,
        resumo: 'Mol é só uma quantidade, como dúzia — só que gigante.',
        topicos: [
          { t: '1 mol = 6,02 × 10²³ partículas', d: 'É a ponte entre o mundo das partículas e a balança do laboratório.' },
          { t: 'Massa molar', d: 'A massa de 1 mol em gramas é o número que está na tabela periódica. Água: 2×1 + 16 = 18 g/mol.' },
          { t: 'Três conversões', d: 'De massa para mol divide pela massa molar; de mol para partículas multiplica por 6,02×10²³; para gases na CNTP, 1 mol ocupa 22,4 L.' },
        ],
        fecho: 'Toda questão de estequiometria passa obrigatoriamente pelo mol.',
      },
      {
        id: 'qui-geral-02',
        titulo: 'Balanceamento e leitura de equação',
        min: 11,
        resumo: 'A equação balanceada é a receita da reação.',
        topicos: [
          { t: 'Conservação de átomos', d: 'Nada some numa reação: o número de átomos de cada elemento tem que ser igual dos dois lados.' },
          { t: 'Ordem prática', d: 'Acerte carbono, depois hidrogênio e deixe o oxigênio por último. Funciona em quase toda combustão.' },
          { t: 'Os coeficientes são proporção', d: 'Em 2H₂ + O₂ → 2H₂O, a leitura é "2 mols de H₂ para 1 mol de O₂", não "2 gramas".' },
        ],
        fecho: 'Sem balancear, qualquer regra de três seguinte estará errada.',
      },
      {
        id: 'qui-geral-03',
        titulo: 'Cálculo estequiométrico e reagente limitante',
        min: 15,
        resumo: 'A regra de três da química, feita na ordem certa.',
        topicos: [
          { t: 'O roteiro fixo', d: 'Balanceie, converta o dado para mol, use a proporção dos coeficientes e converta o resultado para a unidade pedida.' },
          { t: 'Reagente limitante', d: 'Quando a questão dá a quantidade de dois reagentes, um acaba primeiro — é ele que determina o rendimento máximo.' },
          { t: 'Rendimento real', d: 'Rendimento percentual é o obtido dividido pelo teórico. Se a questão fala em 80%, calcule o teórico e multiplique por 0,8.' },
        ],
        fecho: 'Deu dois reagentes com massa? Procure o limitante antes de continuar.',
      },
      {
        id: 'qui-geral-04',
        titulo: 'Soluções, concentração e diluição',
        min: 13,
        resumo: 'Do soro fisiológico ao título em massa.',
        topicos: [
          { t: 'Concentração comum e molaridade', d: 'C = m/V em g/L; M = n/V em mol/L. A diferença é só a unidade da quantidade de soluto.' },
          { t: 'Diluição conserva o soluto', d: 'C₁V₁ = C₂V₂. Ao adicionar água, o volume cresce e a concentração cai na mesma proporção.' },
          { t: 'Mistura de soluções', d: 'Some as quantidades de soluto e some os volumes; a concentração final sai da divisão.' },
        ],
        fecho: 'Diluir nunca muda a massa do soluto — só o volume da solução.',
      },
    ],
  },
  {
    id: 'qui-organica',
    materia: 'quimica',
    titulo: 'Química orgânica na prática',
    nivel: 'intermediario',
    bancas: ['fuvest', 'unicamp', 'unesp', 'uerj', 'enem'],
    resumo: 'Funções orgânicas, isomeria e as reações que aparecem em contexto ambiental e biológico.',
    aulas: [
      {
        id: 'qui-organica-01',
        titulo: 'Cadeias carbônicas e nomenclatura',
        min: 14,
        resumo: 'Ler o nome e desenhar a molécula — e o caminho inverso.',
        topicos: [
          { t: 'O carbono faz quatro ligações', d: 'Sempre quatro. Se seu desenho tem carbono com três ou cinco, algo está errado.' },
          { t: 'Prefixo, infixo e sufixo', d: 'Prefixo conta carbonos (met, et, prop, but), infixo indica saturação (an, en, in) e sufixo aponta a função (o para hidrocarboneto, ol para álcool).' },
          { t: 'Classificação da cadeia', d: 'Aberta ou fechada, saturada ou insaturada, homogênea ou heterogênea. Heteroátomo entre carbonos é o que torna a cadeia heterogênea.' },
        ],
        fecho: 'Nomenclatura é leitura, não decoreba: monte o nome por partes.',
      },
      {
        id: 'qui-organica-02',
        titulo: 'Funções orgânicas e propriedades',
        min: 15,
        resumo: 'Por que o álcool mistura com água e o óleo não.',
        topicos: [
          { t: 'Reconheça o grupo funcional', d: 'OH é álcool, COOH é ácido carboxílico, CHO é aldeído, NH₂ é amina. O grupo define quase todo o comportamento.' },
          { t: 'Polaridade decide a solubilidade', d: 'Semelhante dissolve semelhante. Cadeia carbônica longa é apolar; grupo OH ou COOH puxa para o lado polar.' },
          { t: 'Ponto de ebulição', d: 'Ligação de hidrogênio eleva muito o ponto de ebulição — por isso o álcool ferve bem acima do alcano de massa parecida.' },
        ],
        fecho: 'Compare sempre o tipo de interação antes do tamanho da molécula.',
      },
      {
        id: 'qui-organica-03',
        titulo: 'Isomeria e reações orgânicas',
        min: 13,
        resumo: 'Mesma fórmula, moléculas diferentes — e o que isso muda.',
        topicos: [
          { t: 'Isomeria plana', d: 'Cadeia, posição, função e compensação: mesma fórmula molecular, arranjo diferente. Butanol e éter etílico são o exemplo clássico de função.' },
          { t: 'Isomeria espacial', d: 'Cis-trans exige dupla ligação com ligantes diferentes; óptica exige carbono quiral, com quatro ligantes distintos.' },
          { t: 'Reações que caem', d: 'Combustão, esterificação (ácido + álcool vira éster e água) e saponificação (éster + base vira sabão) são as mais cobradas.' },
        ],
        fecho: 'Isomeria óptica: procure o carbono com quatro grupos diferentes.',
      },
    ],
  },

  // ──────────────────────────── BIOLOGIA ────────────────────────────
  {
    id: 'bio-celula',
    materia: 'biologia',
    titulo: 'Célula, DNA e genética',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'ufrj', 'ufmg'],
    resumo: 'Da organela ao quadro de Punnett: a linha que liga estrutura celular à herança.',
    aulas: [
      {
        id: 'bio-celula-01',
        titulo: 'Organelas: quem faz o quê',
        min: 12,
        resumo: 'Um mapa funcional da célula, sem lista decorada.',
        topicos: [
          { t: 'Mitocôndria e cloroplasto', d: 'Mitocôndria faz respiração celular e libera energia; cloroplasto faz fotossíntese e armazena. Ambos têm DNA próprio — pista da teoria endossimbiótica.' },
          { t: 'Ribossomo, retículo e Golgi', d: 'Ribossomo monta a proteína, o retículo rugoso a transporta e o Golgi empacota e endereça. É uma linha de produção.' },
          { t: 'Procarionte × eucarionte', d: 'A diferença central é o núcleo delimitado por membrana. Bactéria não tem; sua molécula de DNA fica solta no citoplasma.' },
        ],
        fecho: 'Se a questão fala em energia, pense mitocôndria; se fala em secreção, pense Golgi.',
      },
      {
        id: 'bio-celula-02',
        titulo: 'DNA, RNA e síntese proteica',
        min: 15,
        resumo: 'Do gene à proteína em três etapas.',
        topicos: [
          { t: 'Estrutura do DNA', d: 'Dupla hélice com pareamento A-T e C-G. No RNA, a timina dá lugar à uracila e a fita é simples.' },
          { t: 'Transcrição e tradução', d: 'O DNA vira RNA mensageiro no núcleo; no ribossomo, cada trinca de bases (códon) corresponde a um aminoácido.' },
          { t: 'Mutação', d: 'Troca de uma base pode não mudar nada (código degenerado), trocar um aminoácido ou encerrar a proteína antes da hora.' },
        ],
        fecho: 'Sequência de bases define aminoácidos, que definem a forma e a função da proteína.',
      },
      {
        id: 'bio-celula-03',
        titulo: 'Mitose, meiose e variabilidade',
        min: 13,
        resumo: 'Duas divisões com objetivos opostos.',
        topicos: [
          { t: 'Mitose faz cópias', d: 'Uma célula gera duas idênticas, com o mesmo número de cromossomos. É crescimento e reparo de tecido.' },
          { t: 'Meiose faz gametas', d: 'Duas divisões seguidas produzem quatro células com metade dos cromossomos — é o que mantém o número constante na fecundação.' },
          { t: 'Crossing-over', d: 'A troca de pedaços entre cromossomos homólogos na meiose I é a principal fonte de variabilidade genética.' },
        ],
        fecho: 'Variabilidade vem de meiose e mutação — nunca de mitose.',
      },
      {
        id: 'bio-celula-04',
        titulo: 'Leis de Mendel e heredogramas',
        min: 16,
        resumo: 'Cruzamentos, proporções e leitura de árvore genealógica.',
        topicos: [
          { t: 'Primeira lei', d: 'Cada característica é determinada por um par de alelos que se separam na formação dos gametas. Aa × Aa dá 3 dominantes para 1 recessivo.' },
          { t: 'Segunda lei', d: 'Genes em cromossomos diferentes se distribuem independentemente. AaBb × AaBb dá a proporção 9:3:3:1.' },
          { t: 'Ler o heredograma', d: 'Casal normal com filho afetado indica característica recessiva. Se só homens são afetados e a mãe é portadora, suspeite de ligação ao X.' },
        ],
        fecho: 'Comece o heredograma pelo indivíduo afetado — ele revela o genótipo dos pais.',
      },
    ],
  },
  {
    id: 'bio-ecologia',
    materia: 'biologia',
    titulo: 'Ecologia e evolução',
    nivel: 'intermediario',
    bancas: ['enem', 'unicamp', 'uerj', 'unesp', 'ufmg'],
    resumo: 'Fluxo de energia, ciclos, impacto ambiental e seleção natural — o bloco mais interdisciplinar da prova.',
    aulas: [
      {
        id: 'bio-ecologia-01',
        titulo: 'Cadeias, teias e fluxo de energia',
        min: 12,
        resumo: 'Por que toda pirâmide de energia é estreita no topo.',
        topicos: [
          { t: 'Níveis tróficos', d: 'Produtor capta energia solar; consumidores se alimentam em sequência; decompositores devolvem matéria ao ambiente.' },
          { t: 'A regra dos 10%', d: 'A cada nível, cerca de 90% da energia vira calor. Por isso cadeias longas são raras e o topo tem pouca biomassa.' },
          { t: 'Matéria cicla, energia não', d: 'Carbono e nitrogênio voltam ao início do ciclo; a energia atravessa o sistema uma vez só e se dissipa.' },
        ],
        fecho: 'Bioacumulação segue o caminho oposto: poluente se concentra no topo da cadeia.',
      },
      {
        id: 'bio-ecologia-02',
        titulo: 'Relações ecológicas e ciclos biogeoquímicos',
        min: 13,
        resumo: 'Quem ganha, quem perde e por onde os elementos circulam.',
        topicos: [
          { t: 'Harmônicas e desarmônicas', d: 'Mutualismo e protocooperação beneficiam os dois; predatismo, parasitismo e competição têm perdedor. Comensalismo tem um neutro.' },
          { t: 'Ciclo do carbono', d: 'Fotossíntese retira CO₂ da atmosfera; respiração, decomposição e queima de combustível fóssil devolvem.' },
          { t: 'Ciclo do nitrogênio', d: 'Bactérias fixadoras convertem N₂ em formas assimiláveis. Sem elas, planta nenhuma monta proteína.' },
        ],
        fecho: 'Intervenção humana quase sempre acelera uma etapa do ciclo e desequilibra o resto.',
      },
      {
        id: 'bio-ecologia-03',
        titulo: 'Evolução: seleção natural e adaptação',
        min: 14,
        resumo: 'Darwin, Lamarck e os erros de raciocínio que a prova cobra.',
        topicos: [
          { t: 'A variação vem antes', d: 'A mutação é aleatória e anterior à pressão ambiental. O ambiente seleciona quem já era vantajoso, não induz a mudança.' },
          { t: 'Lamarck × Darwin', d: 'Dizer que o órgão se desenvolveu "porque precisou" é lamarckismo — e é a alternativa errada plantada em quase toda questão.' },
          { t: 'Evidências', d: 'Fósseis, órgãos homólogos, embriologia e comparação de DNA sustentam a ancestralidade comum.' },
        ],
        fecho: 'Resistência a antibiótico é seleção natural acontecendo em tempo real.',
      },
    ],
  },

  // ──────────────────────────── HISTÓRIA ────────────────────────────
  {
    id: 'his-brasil',
    materia: 'historia',
    titulo: 'Brasil: da República à redemocratização',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'ufrj', 'unesp'],
    resumo: 'O recorte mais cobrado da história do Brasil, com atenção aos processos e não às datas soltas.',
    aulas: [
      {
        id: 'his-brasil-01',
        titulo: 'República Velha: café, coronel e voto',
        min: 14,
        resumo: 'Como uma república nasceu excluindo a maioria da população.',
        topicos: [
          { t: 'Política dos governadores', d: 'Acordo que garantia apoio mútuo entre presidente e oligarquias estaduais, esvaziando a oposição no Congresso.' },
          { t: 'Coronelismo e voto de cabresto', d: 'O voto era aberto, e o coronel controlava o eleitorado local em troca de favores. A fraude era estrutural, não exceção.' },
          { t: 'Crise dos anos 1920', d: 'Tenentismo, Semana de 22 e a quebra da bolsa em 1929 corroeram o pacto do café e abriram caminho para 1930.' },
        ],
        fecho: 'A República Velha cai quando o café deixa de sustentar o arranjo político.',
      },
      {
        id: 'his-brasil-02',
        titulo: 'Era Vargas: trabalhismo e Estado Novo',
        min: 15,
        resumo: 'Quinze anos que redesenharam o Estado brasileiro.',
        topicos: [
          { t: 'Governo provisório e constitucional', d: '1930 a 1937: voto secreto, voto feminino em 1932 e a Constituição de 1934 com direitos trabalhistas.' },
          { t: 'Estado Novo', d: 'Golpe de 1937 com o Plano Cohen como pretexto: censura pelo DIP, partidos fechados e industrialização por substituição de importações.' },
          { t: 'CLT e o pacto trabalhista', d: 'A legislação de 1943 concede direitos pelo alto e vincula o trabalhador ao Estado — base do populismo posterior.' },
        ],
        fecho: 'Vargas combina modernização econômica com controle político. Os dois lados caem na prova.',
      },
      {
        id: 'his-brasil-03',
        titulo: 'Ditadura militar: 1964 a 1985',
        min: 16,
        resumo: 'Atos institucionais, milagre econômico e abertura.',
        topicos: [
          { t: 'Os atos institucionais', d: 'O AI-2 impôs o bipartidarismo entre ARENA e MDB; o AI-5, em 1968, fechou o Congresso e institucionalizou a repressão.' },
          { t: 'Milagre e endividamento', d: 'Crescimento alto entre 1969 e 1973 baseado em capital externo, com concentração de renda e arrocho salarial.' },
          { t: 'Abertura e Diretas Já', d: 'Lenta, gradual e segura a partir de Geisel; a anistia de 1979 e a campanha de 1984 desembocam na Nova República.' },
        ],
        fecho: 'A abertura foi negociada por dentro do regime — esse é o argumento central das questões discursivas.',
      },
      {
        id: 'his-brasil-04',
        titulo: 'Constituição de 1988 e redemocratização',
        min: 12,
        resumo: 'A Constituição Cidadã e os desafios que ela tentou responder.',
        topicos: [
          { t: 'Direitos sociais', d: 'Saúde, educação e previdência viram direito universal; o SUS nasce como sistema público e gratuito.' },
          { t: 'Novo desenho institucional', d: 'Ampliação do voto, Ministério Público independente e fortalecimento de estados e municípios.' },
          { t: 'Anos 1990 em diante', d: 'Estabilização com o Plano Real, privatizações e políticas de transferência de renda marcam o período seguinte.' },
        ],
        fecho: '1988 é o marco que quase toda questão de cidadania usa como referência.',
      },
    ],
  },
  {
    id: 'his-geral',
    materia: 'historia',
    titulo: 'História geral: revoluções e guerras',
    nivel: 'intermediario',
    bancas: ['fuvest', 'unicamp', 'unesp', 'uerj', 'enem'],
    resumo: 'Iluminismo, Revolução Francesa, industrialização e o século XX em processos encadeados.',
    aulas: [
      {
        id: 'his-geral-01',
        titulo: 'Iluminismo e Revolução Francesa',
        min: 15,
        resumo: 'As ideias que derrubaram o Antigo Regime.',
        topicos: [
          { t: 'A crítica iluminista', d: 'Razão contra privilégio de nascimento: Montesquieu propõe a separação de poderes, Rousseau, a soberania popular.' },
          { t: 'Fases da Revolução', d: 'Da Assembleia Nacional ao Terror jacobino e à reação termidoriana, terminando com Napoleão em 1799.' },
          { t: 'Legado', d: 'Código Civil, ideia de cidadania e nacionalismo se espalham pela Europa e influenciam as independências americanas.' },
        ],
        fecho: 'A Revolução Francesa é a referência de "revolução burguesa" nas questões comparativas.',
      },
      {
        id: 'his-geral-02',
        titulo: 'Revolução Industrial e o mundo do trabalho',
        min: 13,
        resumo: 'Máquina, cidade e a formação da classe operária.',
        topicos: [
          { t: 'Por que na Inglaterra', d: 'Acúmulo de capital, cercamentos que liberaram mão de obra, carvão abundante e mercado colonial.' },
          { t: 'Da manufatura à fábrica', d: 'O trabalhador perde o controle do processo e do ritmo; o relógio da fábrica substitui o tempo da oficina.' },
          { t: 'Respostas operárias', d: 'Ludismo quebra máquinas, cartismo pede voto e o sindicalismo organiza a negociação coletiva.' },
        ],
        fecho: 'Industrialização e urbanização caminham juntas — e geram a questão social do século XIX.',
      },
      {
        id: 'his-geral-03',
        titulo: 'Século XX: guerras mundiais e Guerra Fria',
        min: 16,
        resumo: 'De 1914 a 1991 em uma linha de causas e consequências.',
        topicos: [
          { t: 'Primeira Guerra e Versalhes', d: 'Imperialismo e alianças levam ao conflito; o tratado punitivo de 1919 prepara o terreno para o nazifascismo.' },
          { t: 'Segunda Guerra', d: 'Crise de 1929, totalitarismos e expansionismo alemão. O saldo inclui o Holocausto, a bipolarização e a ONU.' },
          { t: 'Guerra Fria', d: 'Disputa entre EUA e URSS sem confronto direto: corrida armamentista, espacial e conflitos periféricos até 1991.' },
        ],
        fecho: 'A prova gosta de pedir a linha causal entre 1919, 1929 e 1939.',
      },
    ],
  },

  // ─────────────────────────── GEOGRAFIA ───────────────────────────
  {
    id: 'geo-geopolitica',
    materia: 'geografia',
    titulo: 'Geopolítica, globalização e meio ambiente',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'unesp', 'ufmg'],
    resumo: 'O bloco que mais dialoga com atualidades: blocos econômicos, urbanização, clima e recursos.',
    aulas: [
      {
        id: 'geo-geopolitica-01',
        titulo: 'Globalização e blocos econômicos',
        min: 13,
        resumo: 'Fluxos de capital, mercadoria e informação — e quem fica de fora.',
        topicos: [
          { t: 'Divisão internacional do trabalho', d: 'A nova DIT concentra pesquisa e tecnologia no centro e produção intensiva na periferia, com cadeias globais de valor.' },
          { t: 'Tipos de bloco', d: 'Zona de livre comércio, união aduaneira, mercado comum e união econômica formam uma escada de integração — a UE é a mais avançada.' },
          { t: 'Contra-fluxos', d: 'Protecionismo, guerra comercial e migrações mostram que a globalização não é homogênea nem irreversível.' },
        ],
        fecho: 'Compare sempre o grau de integração dos blocos: é o que a banca cobra.',
      },
      {
        id: 'geo-geopolitica-02',
        titulo: 'Urbanização brasileira e rede urbana',
        min: 12,
        resumo: 'Do êxodo rural às metrópoles e seus problemas.',
        topicos: [
          { t: 'Urbanização acelerada', d: 'Entre 1950 e 1980 o Brasil se inverte: passa de rural a urbano em três décadas, sem infraestrutura correspondente.' },
          { t: 'Segregação socioespacial', d: 'Periferização, favelização e especulação imobiliária produzem cidades desiguais no acesso a transporte e saneamento.' },
          { t: 'Metropolização e conurbação', d: 'Municípios vizinhos se fundem na prática e passam a exigir gestão integrada de transporte, água e resíduos.' },
        ],
        fecho: 'Ilha de calor e enchente urbana são consequências de impermeabilização do solo.',
      },
      {
        id: 'geo-geopolitica-03',
        titulo: 'Clima, biomas e questões ambientais',
        min: 14,
        resumo: 'Do clima brasileiro às conferências ambientais.',
        topicos: [
          { t: 'Fatores climáticos', d: 'Latitude, altitude, maritimidade e massas de ar explicam as diferenças entre o semiárido nordestino e o sul subtropical.' },
          { t: 'Biomas brasileiros', d: 'Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa. Cerrado e Mata Atlântica são os mais reduzidos pela ocupação.' },
          { t: 'Agenda ambiental', d: 'Efeito estufa intensificado, Acordo de Paris e matriz energética. A brasileira é mais renovável que a média mundial, mas depende de hidrelétricas.' },
        ],
        fecho: 'Relacione sempre o dado físico ao uso econômico do território.',
      },
    ],
  },

  // ─────────────────────────── PORTUGUÊS ───────────────────────────
  {
    id: 'por-interpretacao',
    materia: 'portugues',
    titulo: 'Interpretação de texto e gramática de prova',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'unesp', 'ufrj', 'pucrio', 'ufmg'],
    resumo: 'A matéria que aparece em todas as outras: entender o que o texto diz, o que ele sugere e o que a questão pede.',
    aulas: [
      {
        id: 'por-interpretacao-01',
        titulo: 'Ler o enunciado antes do texto',
        min: 11,
        resumo: 'Estratégia de leitura para prova longa.',
        topicos: [
          { t: 'O comando manda', d: 'Verbos como "infere-se", "depreende-se" e "o autor sugere" pedem leitura implícita; "segundo o texto" pede literal. Confundir os dois derruba a questão.' },
          { t: 'Marque o referente', d: 'Pronomes e expressões como "isso", "tal fenômeno" e "essa prática" retomam algo específico. Circule o que eles substituem.' },
          { t: 'Alternativa extrapolada', d: 'Se a opção acrescenta informação que o texto não sustenta, ela está errada — mesmo sendo verdadeira no mundo real.' },
        ],
        fecho: 'A resposta está no texto. Se você precisou de conhecimento externo, releia.',
      },
      {
        id: 'por-interpretacao-02',
        titulo: 'Gêneros, funções da linguagem e variação',
        min: 13,
        resumo: 'Reconhecer a intenção por trás do texto.',
        topicos: [
          { t: 'Funções da linguagem', d: 'Referencial informa, apelativa convence, emotiva expressa, poética trabalha a forma, fática testa o canal e metalinguística fala da própria linguagem.' },
          { t: 'Gênero e suporte', d: 'Charge, tirinha, propaganda, artigo de opinião: cada gênero tem propósito e público, e a questão costuma pedir exatamente esse propósito.' },
          { t: 'Variação linguística', d: 'Não existe variedade errada, existe adequação ao contexto. Preconceito linguístico é tema recorrente no ENEM.' },
        ],
        fecho: 'Propaganda quase sempre puxa função apelativa somada a algum recurso poético.',
      },
      {
        id: 'por-interpretacao-03',
        titulo: 'Coesão, crase e concordância',
        min: 14,
        resumo: 'A gramática que realmente cai, aplicada ao texto.',
        topicos: [
          { t: 'Conectivos mudam o sentido', d: '"Mas" opõe, "portanto" conclui, "embora" concede. Trocar o conectivo é a forma mais comum de a alternativa alterar o sentido do original.' },
          { t: 'Crase em três testes', d: 'Troque a palavra feminina por uma masculina: se aparecer "ao", há crase. Antes de verbo e de palavra masculina, não há.' },
          { t: 'Concordância pelo núcleo', d: 'Ache o núcleo do sujeito, não a palavra mais próxima do verbo. Em "a maioria dos alunos chegou", o núcleo é "maioria".' },
        ],
        fecho: 'Reescrita mantendo o sentido: confira conectivo e regência antes de marcar.',
      },
    ],
  },
  {
    id: 'por-redacao',
    materia: 'portugues',
    titulo: 'Redação nota 1000',
    nivel: 'intermediario',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'unesp'],
    resumo: 'Estrutura dissertativa, repertório e proposta de intervenção — competência por competência.',
    aulas: [
      {
        id: 'por-redacao-01',
        titulo: 'As cinco competências, traduzidas',
        min: 12,
        resumo: 'O que o corretor procura em cada bloco de 200 pontos.',
        topicos: [
          { t: 'Competências 1 e 2', d: 'Domínio da norma culta e compreensão do tema com repertório produtivo. Repertório só pontua se estiver ligado ao argumento.' },
          { t: 'Competências 3 e 4', d: 'Projeto de texto com progressão clara e uso variado de conectivos entre e dentro dos parágrafos.' },
          { t: 'Competência 5', d: 'A intervenção precisa de agente, ação, meio, finalidade e detalhamento. Faltando um elemento, a nota cai.' },
        ],
        fecho: 'Escreva a intervenção antes de começar o texto: ela organiza a argumentação toda.',
      },
      {
        id: 'por-redacao-02',
        titulo: 'Introdução, desenvolvimento e conclusão',
        min: 14,
        resumo: 'Um esqueleto que funciona em qualquer tema.',
        topicos: [
          { t: 'Introdução em três movimentos', d: 'Contextualize com repertório, apresente o problema e anuncie os dois argumentos que serão desenvolvidos.' },
          { t: 'Parágrafo de desenvolvimento', d: 'Tópico frasal, fundamentação com dado ou referência, análise conectando ao problema e fecho que retoma a tese.' },
          { t: 'Conclusão', d: 'Retome a tese e apresente a proposta detalhada. Não introduza argumento novo no último parágrafo.' },
        ],
        fecho: 'Projeto de texto é o que separa a nota 800 da nota 1000.',
      },
      {
        id: 'por-redacao-03',
        titulo: 'Repertório e fuga ao tema',
        min: 13,
        resumo: 'Como usar referência sem enfeitar e sem fugir.',
        topicos: [
          { t: 'Repertório produtivo', d: 'Filosofia, sociologia, história, dados oficiais e legislação valem mais quando explicam o argumento, não quando aparecem soltos.' },
          { t: 'Delimite o recorte', d: 'Copie as palavras-chave do tema e repita-as ao longo do texto: é a garantia mais simples contra tangenciamento.' },
          { t: 'Direitos humanos', d: 'Proposta que fira direitos humanos zera a competência 5. Punição sim, desde que dentro do marco legal.' },
        ],
        fecho: 'Na dúvida entre citar e explicar, explique.',
      },
    ],
  },

  // ───────────────────────────── INGLÊS ─────────────────────────────
  {
    id: 'ing-reading',
    materia: 'ingles',
    titulo: 'Reading strategies para o vestibular',
    nivel: 'base',
    bancas: ['enem', 'fuvest', 'unicamp', 'uerj', 'unesp', 'pucrio'],
    resumo: 'Ler inglês de prova sem dicionário: cognatos, contexto e as estruturas que mudam o sentido.',
    aulas: [
      {
        id: 'ing-reading-01',
        titulo: 'Skimming, scanning e cognatos',
        min: 11,
        resumo: 'Extrair o essencial em pouco tempo.',
        topicos: [
          { t: 'Skimming', d: 'Leia título, primeira e última frase de cada parágrafo para captar a ideia geral antes de mergulhar no detalhe.' },
          { t: 'Scanning', d: 'Com a pergunta em mente, varra o texto atrás de números, nomes próprios e palavras-chave. Não leia o que não interessa.' },
          { t: 'Falsos cognatos', d: 'Actually é "na verdade", pretend é "fingir", library é "biblioteca". A prova adora colocar a tradução errada como alternativa.' },
        ],
        fecho: 'Você não precisa entender todas as palavras — precisa entender a função de cada parágrafo.',
      },
      {
        id: 'ing-reading-02',
        titulo: 'Linking words e inferência',
        min: 12,
        resumo: 'As palavras que revelam a opinião do autor.',
        topicos: [
          { t: 'Contraste e concessão', d: 'However, although, despite e nevertheless anunciam mudança de direção. Quem lê o conectivo já sabe o que vem.' },
          { t: 'Causa e consequência', d: 'Because, since, therefore, thus e as a result amarram argumento. Elas costumam apontar direto para a resposta.' },
          { t: 'Tom do autor', d: 'Adjetivos e advérbios como unfortunately, surprisingly e clearly denunciam se o texto critica, apoia ou apenas descreve.' },
        ],
        fecho: 'Marque os conectivos na primeira leitura: eles são o mapa do texto.',
      },
      {
        id: 'ing-reading-03',
        titulo: 'Verb tenses e voz passiva na leitura',
        min: 12,
        resumo: 'Reconhecer tempo e agente sem traduzir tudo.',
        topicos: [
          { t: 'Present perfect', d: 'Have/has + particípio liga passado e presente. Indica algo que começou antes e ainda importa agora.' },
          { t: 'Voz passiva', d: 'Be + particípio move o foco para o que sofreu a ação. "The law was approved" destaca a lei, não quem aprovou.' },
          { t: 'Modais', d: 'Can, may, might, must e should marcam grau de certeza e obrigação — e mudam completamente a força da afirmação.' },
        ],
        fecho: 'Questão de inferência quase sempre depende de um modal ou de um conectivo.',
      },
    ],
  },
]

// ───────────────────────────── helpers ─────────────────────────────

export const TODAS_AULAS = TRILHAS.flatMap((t) =>
  t.aulas.map((a, i) => ({ ...a, trilhaId: t.id, materia: t.materia, ordem: i })),
)

export const trilhaById = (id) => TRILHAS.find((t) => t.id === id)

export const aulaById = (trilhaId, aulaId) =>
  trilhaById(trilhaId)?.aulas.find((a) => a.id === aulaId) || null

export const duracaoTrilha = (trilha) => trilha.aulas.reduce((s, a) => s + a.min, 0)

export const professorDa = (trilha) => PROFESSORES[trilha.materia]

/** Cada aula vira uma sequência de telas que o player anima. */
export function slidesDaAula(aula, trilha) {
  const prof = professorDa(trilha)
  return [
    {
      tipo: 'abertura',
      titulo: aula.titulo,
      fala: `Olá! Sou ${prof.nome}, sua ${prof.cadeira}. Nesta aula: ${aula.resumo}`,
      itens: aula.topicos.map((t) => t.t),
    },
    ...aula.topicos.map((t, i) => ({
      tipo: 'conteudo',
      titulo: t.t,
      fala: t.d,
      indice: i + 1,
      total: aula.topicos.length,
    })),
    {
      tipo: 'fecho',
      titulo: 'Resumo da aula',
      fala: aula.fecho,
      itens: aula.topicos.map((t) => t.t),
    },
  ]
}

/** Filtra o catálogo por matéria, faculdade/banca, nível e busca livre. */
export function filtrarTrilhas({ materias = [], banca = 'todas', nivel = 'todos', busca = '' }) {
  const termo = busca.trim().toLowerCase()
  return TRILHAS.filter((t) => {
    if (materias.length > 0 && !materias.includes(t.materia)) return false
    if (banca !== 'todas' && !t.bancas.includes(banca)) return false
    if (nivel !== 'todos' && t.nivel !== nivel) return false
    if (termo) {
      const alvo = `${t.titulo} ${t.resumo} ${t.aulas.map((a) => a.titulo).join(' ')}`.toLowerCase()
      if (!alvo.includes(termo)) return false
    }
    return true
  })
}
