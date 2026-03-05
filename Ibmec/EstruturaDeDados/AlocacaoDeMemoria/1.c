#include <stdio.h>
#include <stdlib.h>

char* minha_strchr(char *s, char c){
    while(*s != '\0'){
        if(*s == c){
            return s;
        }
        s++;
    }
    return NULL;
}

int main(void){
    char *palavra, letra, *resultado;
    int TAM;

    printf("Digite o tamanho máximo da palavra: ");
    scanf("%d", &TAM);

    palavra = malloc(TAM * sizeof(char));
    if (palavra == NULL) {
        printf("Erro ao alocar memoria.\n");
        return 1;
    }

    printf("Escreva a palavra desejada: \n");
    scanf("%s", palavra);

    printf("Escreva a letra que você busca o endereco da primeira ocorrencia: \n");
    scanf(" %c", &letra);

    resultado = minha_strchr(palavra, letra);

    if (resultado != NULL) {
        printf("O endereco da primeira ocorrencia da letra %c na palavra %s é: %p",
               letra, palavra, resultado);
    } else {
        printf("A letra %c nao foi encontrada na palavra %s.", letra, palavra);
    }

    free(palavra);
    
}
