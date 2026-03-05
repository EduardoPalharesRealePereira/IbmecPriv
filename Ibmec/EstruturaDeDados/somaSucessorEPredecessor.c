// calcular a soma de dois numeros naturais usando suc(n) e pred(n) que devolvem respectivamente o sucessor e predecessor de um num


#include <stdio.h>


int suc(int n){
    
    return n + 1;


}

int pred(int n){

    return n - 1;
}   


int main(void){

    int n,soma;

        printf("Escreva o numero que deseja somar o seu sucessor e predecessor: \n");
        scanf("%d", &n);
        soma = suc(n) + pred(n);
        printf("A soma do sucessor ao predecessor de %d é igual a %d", n, soma);




}