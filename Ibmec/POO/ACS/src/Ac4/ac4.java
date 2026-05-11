/*
 * Nome: Eduardo palhares reale pereira
 * Curso: Ciencia de dados e IA 
 * Data: 20/02/2026
 */

package Ac4;

import java.util.Scanner;
import java.util.Locale;

public class ac4 {

    public static void main(String[] args) {
     
        Scanner sc = new Scanner(System.in).useLocale(Locale.US);

        
        System.out.print("Digite o primeiro número inteiro: ");
        int n1 = sc.nextInt();
        
        System.out.print("Digite o segundo número inteiro: ");
        int n2 = sc.nextInt();

       
        int soma = n1 + n2;
        int subtracao = n1 - n2;
        int multiplicacao = n1 * n2;
        
     
        double divisao = (double) n1 / n2;

        
        System.out.println("\n##### RESULTADOS #####");
        System.out.println("Soma: " + soma);
        System.out.println("Subtração: " + subtracao);
        System.out.println("Multiplicação: " + multiplicacao);
        
    
        System.out.printf("Divisão: %.2f\n", divisao);

        sc.close();
    }
}