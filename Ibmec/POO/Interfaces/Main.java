package Ac14;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
	
	public static void main(String[] args) {
		
		
		 Scanner scanner = new Scanner(System.in);
		 
		 ArrayList<Medico> listaMedicos = new ArrayList<>();
		 
		 int opcao;
		 
		 do {
			 
			 System.out.println("\n--- MENU PRINCIPAL ---");
	            System.out.println("1. Cadastrar novo medico");
	            System.out.println("2. Cadastrar novo paciente");
	            System.out.println("3. Listar medicos com seus pacientes");
	            System.out.println("4. Remover paciente do medico");
	            System.out.println("0. Sair");
	            System.out.println("Escolha uma opcao: ");
	            opcao = scanner.nextInt();
	            scanner.nextLine();
	            
	            
	            if(opcao == 1) {
	            	
	            	System.out.println("Cadastro de medico");
	            	System.out.println("-------------------");
	            	System.out.println("Escreva o nome do medico: ");
	            	String nome = scanner.nextLine();
	            	System.out.println("Escreva o registro(CRM) do medico: ");
	            	String registro = scanner.nextLine();
	            	System.out.println("Escreva a especialidade do medico: ");
	            	String especialidade = scanner.nextLine();
	            	
	            	Medico m1 = new Medico(registro, nome, especialidade);
	            	listaMedicos.add(m1);
	            	System.out.println("Medico cadastrado na clinica!");
	            	
	            	
	            }
	            
	            else if(opcao == 2) {
	            	
	              	System.out.println("Cadastro de paciente");
	            	System.out.println("-------------------");
	            	System.out.println("Escreva o nome do pacietente: ");
	            	String nome = scanner.nextLine();
	            	System.out.println("Escreva o id do paciente: ");
	                int id = scanner.nextInt();
	            	System.out.println("Escreva o cpf do paciente: ");
	            	String cpf  = scanner.nextLine();
	            	System.out.println("Escreva o medico do paciente: ");
	            	Medico medico = scanner.next
	            	
	            }
	            
	           
	     
	            
			 
		 } while (opcao != 0);
		 
		 
		
	}

}
