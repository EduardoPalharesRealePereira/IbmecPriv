package Ac7;
import java.util.Scanner;



   public class ac7 {
	   
		public static void main(String args[]) {
		
			
			Scanner sc = new Scanner(System.in);	
			
			System.out.println("Qual o nome do aluno?");
		     String nome = sc.nextLine();
		     
		     System.out.println("Qual a nota da ac1?");
		     int ac1 = sc.nextInt();
		     System.out.println("Qual a nota da ac2?");
		     int ac2 = sc.nextInt();
		     
		     System.out.println("Quantas aulas ele faltou?");
		     int faltas = sc.nextInt();
		     
		     
		     
		     int media = ( ac1 + ac2 ) / 2;
		     
		     int notaNecessaria = 7;
		     
		     if(media >= notaNecessaria && faltas <= 10) {
		    	 
		    	 System.out.println("Status do aluno "+ nome);
		    	 System.out.println("----------------");
		    	 System.out.println("Nota da ac1: "+ ac1 );
		    	 System.out.println("Nota da ac2: "+ ac2 );
		    	 System.out.println("Quantidade de faltas: "+ faltas );
		    	 System.out.println("Media final: " + media );
		    	 System.out.println("Status: APROVADO " );
		    	 
		     }
		     
		     else {
	    	 System.out.println("Status do aluno "+ nome);
	    	 System.out.println("----------------");
	    	 System.out.println("Nota da ac1: "+ ac1 );
	    	 System.out.println("Nota da ac2: "+ ac2 );
	    	 System.out.println("Quantidade de faltas: "+ faltas );
	    	 System.out.println("Media final: " + media );
	    	 System.out.println("Status: REPROVADO" );
	    	 
		     }
		     
		     
			
			
			
		}


}
