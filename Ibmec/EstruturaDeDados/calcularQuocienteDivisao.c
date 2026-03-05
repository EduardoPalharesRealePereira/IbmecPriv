// calcular o quociente da divisao inteira usando subtracao

#include <stdio.h>


int calcularQuocienteDivisao(int dividendo, int divisor){

        if(dividendo < divisor)
        return 0;
        else 
        return 1 + calcularQuocienteDivisao(dividendo - divisor, divisor);



}


int main (void){


    int dividendo, divisor, quociente;

    printf("Escreva o dividendo: \n");
    scanf("%d", &dividendo);
    printf("Escreva o divisor: \n");
    scanf("%d", &divisor);
    
    quociente = calcularQuocienteDivisao(dividendo, divisor);
    printf("O quociente da divisao de %d por %d é de  %d", dividendo, divisor, quociente);
    

}