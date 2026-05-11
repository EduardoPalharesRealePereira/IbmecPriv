package Ac6;
import java.util.Scanner;
import java.util.Locale;

public class ac6 {
	
		public static void main(String args[]) {
			
			Scanner sc = new Scanner(System.in).useLocale(Locale.US);
			
			double raio;
			double altura;
			
			System.out.println("Insira o raio:");
			raio = sc.nextDouble();
		
			System.out.println("Insira a altura");
			altura = sc.nextDouble();
			
			
			double area;
			double volume;
			
			area = (2 * Math.PI * raio * (raio + altura));
			volume = (Math.PI * Math.pow(raio, 2) * altura);
			
			
			System.out.println("##### RESULTADOS #####");
			System.out.println("Valor inserido do raio: " + raio);
			System.out.println("Valor inserido da altura: " + altura);
			System.out.println("Valor da área: " + area);
			System.out.println("Valor do volume: " + volume);
			
			
			sc.close();
			
			
			
			
		}

}
