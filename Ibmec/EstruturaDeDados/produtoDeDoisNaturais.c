// calcular o produto de dois numeros naturais usando adicao com recursividade\

#include <stdio.h>

int calculaProdutoNaturais(int numero1, int numero2){

    if(numero1 == 0 || numero2 == 0)
    return 0;
    else
    return numero1 + calculaProdutoNaturais(numero1, numero2 - 1);



}



int main(void){

    int numero1, numero2, produto;
        printf("Escreva o primeiro numero: \n");
        scanf("%d", &numero1);
         printf("Escreva o segundo numero: \n");
        scanf("%d", &numero2);

        produto = calculaProdutoNaturais(numero1, numero2);

        printf("O produto entre %d e %d é igual a %d", numero1, numero2, produto);


}