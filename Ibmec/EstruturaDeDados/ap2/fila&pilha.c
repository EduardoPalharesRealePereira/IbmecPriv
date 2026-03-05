// pilhas : topo eh a posicao acima da posicao que possui o ultimo item na pilha.
// topo so eh igual a 0 quando a pilha esta vazia.
// se a pilha possui 1 elemento (por ser o primeiro elemento ele fica na posicao 0), o topo ja esta na posicao acima dela, que eh a posicao 1
//operacoes: desempilhar, empilhar, verificar se a pilha esta vazia, faz a pilha ficar vazia e tamanho.



// FILAS : POSSUI inicio e fim como variaveis
// operacoes: enfileirar, desenfileirar, faz a fila ficar vazia, tamDaFila, vazia e cheia
// exemplo: fila de 8 posicoes deve possuir um vetor de [7] posicoes
// se eu enfileirar 3 itens, o inicio fica na posicao 0 e o fim na posicao 3 (uma depois do ultimo item), ja que enfileiramos 
// 1 na posicao 0, 1 na posicao 1 e 1 na posicao 2
// quando desenfileiramos, o inicio sai da posicao 0 e vai pra posicao 1, excluindo o primeiro item da fila e uma variavel (chamada de item), recebe o valor do item retirado da fila
// quando usamos a funcao de deixar a fila vazia == true, setamos o inicio igual ao fim na posicao que o fim ja se encontrava, que era uma posicao ja vazia





//LISTAS ENCADEADAS -> especialmente indicadas quando nao eh possivel prever a demanda por memoria
// OPERACOES -> fazListaVazia, inserir, imprimir, pesquisar e remover e uma outra struct que possui a operacao criaNo, que cria no com valor recebido por parametro




// em tabelas hash, para achar a posicao do vetor
// exemplo: em um vetor de 7 posicoes, vetor m[6] (7 posicoes), logo m = 7
// h(k) = k % m
//logo, o termo de valor 23, devera ficar na posicao 2, ja que 23 % 7 = 2, pois 7 * 3 = 21, logo sobra 2 e essa eh a posicao.
// quando der colisao entre valores no vetor, apenas adicionar 1 no resultado, que sera a posicao h(k+ i) % d
// lembrando que por exemplo, esse vetor so vai ate a posicao de numero 6 (tendo 7 posicoes), mas ai se somar 1 com o k e o k ja era 6
// logo, ele retorna a posicao 0 do vetor, como se quando acabasse o vetor ele volta la no inicio
                                                                                     


// EM TABELHA HASH, O MELHOR JEITO DE RESOLVER O PROBLEMA DE COLISOES EH ATRAVES DE OPEN ADDRESSING (ENDERECAMENTO ABERTO), que basicamente
// utiliza do calculo de k(k + i) % d = nova posicao vazia. Essa conta eh chamada de probing (sondagem linear).



// EM ARVORES
// PRE ORDEM: FAZER O ENVELOPAMENTO (DESENHAR EM VOLTA DA ARVORE) E IR IMPRIMINDO QUANDO O DESENHO PEGAR NA BOLINHA A ESQUERDA DO NO
// EM ORDEM: FAZER O ENVELOPAMENTO (DESENHAR EM VOLTA DA ARVORE) E IR IMPRIMINDO QUANDO O DESENHO PEGAR NA BOLINHA EMBAIXO DO NO
// POS ORDEM: FAZER O ENVELOPAMENTO (DESENHAR EM VOLTA DA ARVORE) E IR IMPRIMINDO QUANDO O DESENHO PEGAR NA BOLINHA A DIREITA DO NO



// PRE ORDEM -> ESQUERDA DO NO
// EM ORDEM -> EMBAIXO DO NO
// POS ORDEM -> A DIREITA DO NO