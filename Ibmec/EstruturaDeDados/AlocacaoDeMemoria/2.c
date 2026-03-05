// 2)C.U.F.denominadastrsub(s,i,n)quedevolveasubstringdesqueinicia-senaposiçãoietem,nomáximo,ncaracteres.Astringsnãodeveseralterada.[Dica:copieoscaracteresparaoutrolocaldememória.]


#include <stdio.h>
#include <stdlib.h>
#include <string.h>



char* stringsub(char* s, int i, int n){

    char *sub = malloc((n + 1) * sizeof(char)); // +1 pro '\0'
    if (sub == NULL) return NULL; // checa se alocou

    int j;
    for (j = 0; j < n && s[i + j] != '\0'; j++) {
        sub[j] = s[i + j]; // copia caractere
    }
    sub[j] = '\0'; // fecha a substring

    return sub;


}


int main(void){

    int i, n;
    char palavra[100];   
    char *resultado;

    printf("Escreva a palavra: \n");
    scanf("%s", palavra);

    printf("Qual posicao devemos comecar? \n");
    scanf("%d", &i);

    printf("Qual o maximo de caracteres que a palavra pode ter? \n");
    scanf("%d", &n);

    resultado = stringsub(palavra, i, n);


        
    printf("Substring: %s\n", resultado);

    free(resultado); // libera memória
    return 0;

}
