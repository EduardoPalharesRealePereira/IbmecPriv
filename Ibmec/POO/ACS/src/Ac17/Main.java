package Ac17;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	 public static void main(String[] args) {
	        Scanner sc = new Scanner(System.in);
	 
	        
	        ArrayList<Carro> listaCarrosl1 = new ArrayList<>();
	        ArrayList<Carro> listaCarrosl2 = new ArrayList<>();
	        Locadora l1 = new Locadora(123141, "Pantas LTDA");
	        Locadora l2 = new Locadora(123456, "Localiza");
	        Carrobasico carro1 = new Carrobasico("Onix", 50000, 5000);
	        Carroluxo carro2 = new Carroluxo("Mercedes GLA", 180000, 3000);
	        
	        Carrobasico carro3 = new Carrobasico("Opala", 3000, 80000);
	        
	        listaCarrosl1.add(carro1);
	        listaCarrosl1.add(carro2);
	        
	        listaCarrosl2.add(carro3);
	        
	        
	        l1.setlistaCarros(listaCarrosl1);
	        System.out.println(l1.toString());
	        
	        l2.setlistaCarros(listaCarrosl2);
	        System.out.println(l2.toString());
	 
	        
	   
	        sc.close();
	    }
	}

// ta feito completo