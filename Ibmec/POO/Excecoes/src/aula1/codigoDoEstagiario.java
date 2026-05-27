package aula1;

import java.util.Scanner;

public class codigoDoEstagiario {

    public static void main(String[] args) {

        int x = 10;
        int y = 0;
        String[] nomes = {"Layne", "John", "David"};
        String texto = null;
        int tam;
        Scanner sc = new Scanner(System.in);

        try {
            x = sc.nextInt();
            System.out.println("Resultado: " + x / y);
            System.out.println(nomes[2]);
            tam = texto.length();

        } catch (ArithmeticException e) {
            System.out.println("Erro aritmético: " + e.getMessage());

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Índice inválido: " + e.getMessage());

        } catch (NullPointerException e) {
            System.out.println("Objeto nulo: " + e.getMessage());

        } finally {
            sc.close();
            System.out.println("Programa encerrado.");
        }
    }
}

//tem que abrir o console pra colocar o valor e testar