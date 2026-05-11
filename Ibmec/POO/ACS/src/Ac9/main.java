package Ac9;
import java.util.Scanner;
public class main {
	
	public static void main (String args[]) {
		
		   Scanner scanner = new Scanner(System.in);

	        System.out.print("Raio: ");
	        double raio = scanner.nextDouble();

	        System.out.print("Altura: ");
	        double altura = scanner.nextDouble();

	        Cilindro cilindro = new Cilindro(raio, altura);
	        cilindro.imprimirResultados();

	        scanner.close();
	}

}
