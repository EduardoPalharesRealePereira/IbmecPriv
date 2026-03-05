#include <stdio.h>


int main(void){

        typedef struct {

            int dia;
            int mes;
            int ano;
        } DATA;

        static DATA hoje = {19, 7, 2004};
    

        typedef struct {
            char nome[30];
            char fone[20];
            DATA nasc;

        } PESSOA;


        PESSOA amigo;
        strcpy(amigo.nome, "EDUARDO BUZO");
        strcpy(amigo.fone, "3198688-5786");
        amigo.nasc.dia = 20;
        amigo.nasc.mes = 12;
        amigo.nasc.ano = 2004;

        prinft(amigo);

        // em struct com ponteiros: Em geral, ponteiros sao utilizados como parametros por uma questao de eficiencia.
        // em uma situacao normal, para acessar o ponteiro, utilizamos da sintaxe (*p).nome por exemplo
        // ja em struct, podemos utilizar o valor seta (->), como por exemplo p->nome.




        // diferenca entre union e struct: em struct, a memoria utilizada eh a soma de todos os seus fatores somados, ja em union eh o valor do maior deles.
        // em struct, todos os membros podem ser utilizados simultaneamente, ja em union apenas 1 por vez
        // em union tagged, a union possui uma etiqueta, para identificar qual membro da union esta sendo utilizado, para que nao tenha confusao de tipos de valore sendo utilizados
}