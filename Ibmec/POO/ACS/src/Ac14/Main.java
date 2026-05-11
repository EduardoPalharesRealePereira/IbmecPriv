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
	            	
	            	Medico m1 = new Medico(registro, nome, especialidade, new ArrayList<>());
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
	                scanner.nextLine();
	            	System.out.println("Escreva o cpf do paciente: ");
	            	String cpf  = scanner.nextLine();
	            	System.out.println("Selecione o medico do paciente: ");
	            	for (int i = 0; i < listaMedicos.size(); i++) {
	            	    System.out.println(i + " - " + listaMedicos.get(i).toString());
	            	}
	            	int escolha = scanner.nextInt();
	            	scanner.nextLine();
	            	Medico medicoEscolhido = listaMedicos.get(escolha);
	            	Paciente p = new Paciente(id,nome,cpf, medicoEscolhido);
	            	medicoEscolhido.adicionarPaciente(p);
	            	System.out.println("Paciente cadastrado na clinica com sucesso!");
	            	
	            }
	            
	            else if(opcao == 3) {
	            	
	            	for (Medico m : listaMedicos) {
	            	    System.out.println(m.toString());
	            	    for (Paciente p : m.getPacientes()) {
	            	        System.out.println("  - " + p.toString());
	            	    }
	            	}
	            	
	            	
	            	
	            	
	            }
	            
	            else if(opcao == 4) {
	          
	            	for (int i = 0; i < listaMedicos.size(); i++) {
	            	    System.out.println(i + " - " + listaMedicos.get(i).getNome());
	            	    for (int j = 0; j < listaMedicos.get(i).getPacientes().size(); j++) {
	            	        System.out.println("  " + j + " - " + listaMedicos.get(i).getPacientes().get(j).getNome());
	            	    }
	            	}
	            	System.out.println("Escolha o medico: ");
	            	int indiceMedico = scanner.nextInt();
	            	Medico medicoEscolhido = listaMedicos.get(indiceMedico);

	            	System.out.println("Escolha o paciente: ");
	            	int indicePaciente = scanner.nextInt();
	            	Paciente pacienteEscolhido = medicoEscolhido.getPacientes().get(indicePaciente);

	            	medicoEscolhido.removerPaciente(pacienteEscolhido);
	            	System.out.println("Paciente removido com sucesso!");
	            	
	            	
	            }
	            
	           
	     
	            
			 
		 } while (opcao != 0);
		 
		 
		
	}

}
