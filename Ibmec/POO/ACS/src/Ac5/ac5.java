package Ac5;
import java.util.Scanner;


public class ac5 {
	
public static void main(String args[]) {
			
	Scanner sc = new Scanner(System.in);
	
	double a;
	double b;
	double c;
	
	double delta;
	double x1;
	double x2;
	
    
	System.out.println("Insira o valor de a: ");
	a = sc.nextDouble();
	
	System.out.println("Insira o valor de b: ");
	b = sc.nextDouble();
	
	System.out.println("Insira o valor de c: ");
	c = sc.nextDouble();
	
	
	delta = Math.pow(b,2) - (4*a*c);
	x1 = (-b + Math.sqrt(delta)) / (2*a);
	x2 = (-b - Math.sqrt(delta)) / (2*a);
	
	
	System.out.println("##### RESULTADOS #####");
	System.out.println("Valor inserido de a: " + a);
	System.out.println("Valor inserido de b: " + b);
	System.out.println("Valor inserido de c: " + c);
	System.out.println("Valor de delta: " + delta);
	System.out.println("Valor de x1: " + x1);
	System.out.println("Valor de x2: " + x2);
	
	
	sc.close();
	
	
	
	
	
}
}
