// a) calcular o fatorial de um numero natural utilizando recursividade

#include <stdio.h>

long int fatorial(int n){

if(n == 0 || n == 1)
return 1;
    else
        return n * fatorial(n - 1);

}


void main (void){

int numero = 0;
    printf("Escreva o numero que deseja:");
    scanf("%d", &numero);

    printf("O fatorial de %d é igual a %d", numero, fatorial(numero));

}


//tudo certo