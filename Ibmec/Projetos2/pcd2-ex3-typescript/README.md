# [PCD2] - Exercícios TypeScript

- [Gabarito - Exercícios 1 a 10](https://www.youtube.com/watch?v=4f6N1Ui3U3k)

**Objetivos**
- Conhecer os esquemas de tipagem do TypeScript, como `tipagem explícita` e `inferência de tipos`.
- Conhecer tipos de valores como: `any`, `void`, `undefined` e `null`.
- Trabalhar com tipagem de funções, arrays e objetos em TS.
- Construção de tipos personalizados com `interface` e `type`, assim como realizar a extensão destes tipos.
- Conhecer o esquema de asserção de tipos (`as`).
- Trabalhar com alguns utilitários do TS: `partial`, `pick`, `omit`, `record`, `typeof` e `keyof`.

Para este exercício a entrega **não é obrigatória**. Entretanto, _a sua realização é altamente recomendável_ para o acompanhamento da aprendizagem e para a preparação diante das avaliações.

---

## 🏢 **1. Sistema de Funcionários**
Crie uma interface `Funcionario` contendo `nome`, `cargo` e `salario`. Depois, crie uma função que receba um funcionário e exiba uma mensagem informando seu nome e o seu salário. Tipifique a função corretamente. Além disso, a função **não** pode ser do tipo `void`.

---

## 🎮 **2. Loja de Jogos**
Crie um tipo `Jogo` com propriedades `titulo`, `genero` e `preco`. Em seguida, crie um array de jogos que seja do tipo Jogo. 

---

## 📚 **3. Biblioteca Digital**
Crie uma interface `Livro` com `titulo`, `autor` e `anoPublicacao`. Logo após, crie uma nova interface `Artigo`, que seja uma extensão de `Livro`, adicionando as propriedades `revista`, `numero` e `paginas`. Por fim, declare um novo objeto do tipo `Artigo` e preencha as entradas até que não haja mensagens de erro.

---

## 🚗 **4. Aplicação de Aluguel de Carros**
Crie um tipo `Carro`, que vai compor o modelo de um carro e o valor diário da sua locação. Crie uma uma interface `Locacao`. A locação deve conter, além das informações do tipo Carro, o `cliente` e `diasAlugados`. Depois, crie uma função que receba o preço por dia e os dias alugados, buscando apenas as informações da interface `Locacao`, e que mostre pelo console o valor total da locação.

---

## 🍕 **5. Delivery de Pizza**
Crie uma interface `Pizza` com `sabor`, `tamanho` e `preco`. O tamanho deve possuir valores restritos, sendo apenas aceitos os tamanhos: `media`, `grande` e `gigante`. Depois, crie um array tipado com três pizzas no cardápio.

---

## 📦 **6. Estoque de Produtos**
Crie uma interface `Produto` e uma função `verificarEstoque()` que recebe um array de produtos e retorna apenas aqueles com quantidade abaixo de 10 unidades.

---

## 🎤 **7. Gestão de Eventos**
 Crie um tipo `Evento` contendo as propriedades `nome`, `data`, `local` e `capacidadeMaxima`. Em seguida, crie uma função que receba um array de eventos e um número de ingressos vendidos, retornando apenas os eventos que ainda têm vagas disponíveis.

---

## 🎨 **8. Galeria de Arte**
Crie uma interface `ObraDeArte` com `titulo`, `artista`, `ano`, `lanceInicial` e `vendida`, que será utilizada em um sistema de leilões. Implemente uma função que marque uma obra como vendida se o valor pago for igual ou superior ao lance inicial. A função deve ser do tipo `void` e não se deve utilizar o `console.log()` dentro da função.

---

## 🛒 **9. Carrinho de Compras**
Crie um tipo `ItemCarrinho` e implemente uma função `calcularTotal()` que retorna o valor total da compra no formato: `O valor total da compra é de R$ X`. Use um array tipado.

---

## 🍺 **10. Produção de Cerveja**
Crie uma interface `CervejaArtesanal` contendo `nome`, `teorAlcoolico`, `IBU` e `estilo`. Depois, crie um array tipado e filtre as cervejas por teor alcoólico acima de 6%.

---

## Importante!

> **A partir daqui, os exercícios de 11 a 20 estão associados a um mesmo contexto**.
> Você vai utilizar extensão de interfaces, utilitários, union types e asserção de tipos aqui.

---

## **📌 11. Validação de Dados do Usuário**
Crie uma **interface `Usuario`** contendo:
- `id`: número único identificador do usuário.
- `nome`: string obrigatória.
- `email`: string obrigatória.
- `senha`: string obrigatória.
- `dataNascimento`: string no formato `"YYYY-MM-DD"`.
- `endereco`: um objeto contendo `rua`, `cidade`, `estado` e `cep`.
- `telefone`: string opcional.
- `ativo`: booleano que indica se o usuário está ativo no sistema.
- `permissoes`: array de strings representando os papéis do usuário (`"admin"`, `"usuario"`, `"editor"`, etc.).

Agora, crie uma **função `validarUsuario(usuario: Usuario): boolean`** que verifica:
1. Se os campos obrigatórios (`nome`, `email`, `senha`, `dataNascimento`) estão preenchidos corretamente.
2. Se `email` contém um `"@"` e `"."`.
3. Se `permissoes` contém pelo menos um valor válido.

---

## **📌 12. Atualização Parcial do Usuário**
Utilize o método adequado para permitir atualizações parciais do usuário.  
Crie uma **função `atualizarUsuario()`** que recebe um ID e os dados a serem alterados, aplicando as mudanças na base de dados.

---

## **📌 13. Exibir Apenas Dados Essenciais**
Utilize o método adequado para exibir apenas informações essenciais do usuário.  
Crie uma **função `exibirUsuariosEssenciais()`** que retorne uma lista de usuários contendo **apenas `id`, `nome` e `email`**.

---

## **📌 14. Omitindo Dados Sensíveis**
Utilize o utilitário adequado para remover a senha dos usuários.  
Crie uma **função `listarUsuariosPublicos()`** que retorne todos os usuários sem o campo `senha`.

---

## **📌 15. Mapear Usuários por ID**
Utilize o método adequado para criar um objeto onde cada chave seja o `id` do usuário e o valor seja o objeto `Usuario`, sendo que neste objeto a única propriedade obrigatória deve ser o `nome`.

---

## **📌 16. Descobrir Tipo Dinamicamente**
Utilize o utilitário adequado para criar um novo tipo baseado na estrutura de um usuário existente. Crie uma variável `usuarioBase`, tipada com `usuariosPorID`, e preencha os dados conforme o novo tipo.

---

## **📌 17. Contando Usuários**
Utilize o método adequado para obter todas as chaves do tipo `Usuario`.  
Crie uma **função `listarCamposUsuario()`** que retorne um array com todas as chaves disponíveis no tipo `Usuario`.

---

## **📌 18. Extensão de Interface**
Crie uma **nova interface `UsuarioPremium`**, que **estenda** `Usuario`, adicionando:
- `beneficios`: array de strings contendo benefícios extras do usuário premium.

Agora, crie uma **função `listarUsuariosPremium()`** que retorna apenas os usuários premium da base de dados, incluindo seus benefícios.

---

## **📌 19. Tipagem Estrita com `as` (Asserção de Tipos)**
Crie uma função **`pegarUsuarioPorId(id: number): Usuario`** que retorna um usuário do banco de dados.  
No caso de não encontrar o usuário, faça uma **asserção de tipo** (`as Usuario`) para garantir que sempre seja retornado um objeto do tipo `Usuario`.

---

## **📌 20. Verificação de Permissão**
Crie uma **função `usuarioTemPermissao(id: number, permissao: string): boolean`** que verifica se um usuário possui uma determinada permissão.  
A função deve buscar o usuário na base de dados e verificar se a permissão fornecida **existe no array `permissoes`**.

---

## Importante!

> **A partir daqui, você poderá usar apenas Funções de Ordem Superior (HOF) caso precise utilizar laços de repetição. Não utilize `for` tradicional**.

---

## 🎸 **21. Aplicação para Banda de Música**
Crie um tipo `Banda` e uma função `l`starIntegrantes()` que exibe a formação de bandas de um mesmo estilo.

---

## 🍽 **22. Cardápio de Restaurante**
Crie um tipo `Prato` e implemente uma função que retorna o prato mais caro do cardápio.

---

## 📦 **23. Rastreamento de Encomendas**
Crie um tipo `Encomenda` e uma função `atualizarStatus()` que modifica o status da encomenda de acordo com sua movimentação.

---

## 🎓 **24. Plataforma de Cursos Online**
Crie um tipo `Curso` e implemente uma função que retorna os cursos de uma determinada categoria.

---

## 🧑‍💻 **25. Sistema de Login**
Crie um tipo `Credenciais` e implemente uma função `autenticar()` que verifica o login do usuário.

---

## 🏖 **26. Agência de Viagens**
Crie um tipo `PacoteTuristico` e implemente uma função `filtrarPorPreco()` que retorna pacotes de até um determinado valor.

---

## 🔄 **27. Atualização de Perfis**
Crie uma interface `PerfilUsuario` e utilize `Partial<T>` para permitir atualizações parciais dos dados do usuário.

---

## 🛠 **28. Montagem de Computadores**
Crie um tipo `Computador` e implemente uma função `montarPC()` que recebe um conjunto de componentes e retorna uma configuração válida.

---

## 🎯 **29. Jogo de Perguntas e Respostas**
Crie um tipo `PerguntaQuiz` e implemente uma função que verifica se a resposta do usuário está correta.

---

## 🧑‍⚖️ **30. Sistema Jurídico**
Crie uma interface `Processo` contendo `requerente`, `requerido`, `tipo` e `status`. Implemente uma função que lista apenas os processos pendentes.

---

💡 **Dicas Extras:**
- Todos os exercícios devem utilizar **tipagem explícita** e **inferência de tipos** quando possível.
- Utilize **any** somente onde for realmente necessário e justifique seu uso.
- Faça uso de **interfaces**, **types**, **Partial**, **Pick**, **Omit**, **Record**, **typeof**, **keyof** e **asserções de tipo** (`as`).
- Implemente as funções utilizando **void** quando apropriado.
