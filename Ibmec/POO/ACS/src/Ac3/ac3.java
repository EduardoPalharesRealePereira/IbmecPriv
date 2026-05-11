/*
 * Nome: Eduardo palhares reale pereira
 * Curso: Ciencia de dados e IA 
 * Data: 20/02/2026
 */

package Ac3;

import java.util.Locale;
import java.util.Scanner;

public class ac3 {

    public static void main(String[] args) {
       
        Scanner sc = new Scanner(System.in).useLocale(Locale.US);

       
        String nome;
        long cpf;   
        int idade;
        double altura;

   
        System.out.print("Digite o seu nome: ");
        nome = sc.nextLine();

        System.out.print("Digite o seu CPF: ");
        cpf = sc.nextLong();

        System.out.print("Digite a sua idade: ");
        idade = sc.nextInt();

        System.out.print("Digite a sua altura: ");
        altura = sc.nextDouble();

        System.out.println("##### DADOS DO CLIENTE #####");
        System.out.println("Nome: " + nome);
        System.out.println("CPF: " + cpf);
        System.out.println("Idade: " + idade + " anos");
        System.out.printf("Altura: %.2fm ", altura);

        sc.close();
    }
}