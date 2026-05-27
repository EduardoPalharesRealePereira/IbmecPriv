package aula1;

import java.util.Scanner;


public class Main {

	public static void main(String[] args) {
		
		int x = 10;
		int y = 0;
		String[] nomes = {"Layne", "John", "David"};
		String texto = null;
		int tam;
		Scanner sc = new Scanner(System.in);
		
		
		
	try { 
		  x = sc.nextInt();
		  System.out.println("Resultado: "+ x/y);
		  System.out.println(nomes[2]);
		  tam = texto.length();
		
		
		
		
		
	}catch (ArithmeticException e ) {
	System.out.println("Erro aritmetico: " + e.getMessage());
	}
 }
	
}
