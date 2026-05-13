package Ac17;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	 public static void main(String[] args) {
	        Scanner sc = new Scanner(System.in);
	 
	        
	        ArrayList<Carro> listaCarros = new ArrayList<>();
	        Locadora l1 = new Locadora(123141, "Pantas LTDA");
	        Locadora l2 = new Locadora(123456, "Localiza");
	        Carrobasico carro1 = new Carrobasico("Onix", 50000, 5000);
	        Carroluxo carro2 = new Carroluxo("Mercedes GLA", 180000, 3000);
	        listaCarros.add(carro1);
	        listaCarros.add(carro2);
	        
	        l1.setlistaCarros(listaCarros);
	        System.out.println(l1.toString());
	 
	        
	   
	        sc.close();
	    }
	}

// ta feito completo