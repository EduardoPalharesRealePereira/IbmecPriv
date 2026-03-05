// b) calcular o resto da divisao inteira usando subtracao com recursividade
#include <stdio.h>

int restoDaDivisao(int dividendo, int divisor){

    if (dividendo < divisor)
    return dividendo;

    else 
    return restoDaDivisao(dividendo - divisor, divisor);

}


int main(void){

    int dividendo, divisor, resto;
printf("Insira o dividendo: \n");
scanf("%d", &dividendo);
printf("Insira o divisor: \n");
scanf("%d", &divisor);

    resto = restoDaDivisao(dividendo, divisor);
printf("O resto da divisao entre %d e %d é de %d", dividendo, divisor,resto);



}

// 12 - 5 = 7 -> 7 - 5 = 2(Resto);
// ta certo