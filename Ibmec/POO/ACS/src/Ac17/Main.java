package Ac17;
import java.util.Scanner;

public class Main {

	 public static void main(String[] args) {
	        Scanner sc = new Scanner(System.in);
	 
	        System.out.print("Nome da locadora: ");
	        String nome = sc.nextLine();
	        System.out.print("CNPJ da locadora: ");
	        String cnpj = sc.nextLine();
	 
	        Locadora locadora = new Locadora(nome, cnpj);
	 
	        int opcao;
	        do {
	            System.out.println();
	            System.out.println("===== MENU =====");
	            System.out.println("1 - Cadastrar carro básico");
	            System.out.println("2 - Cadastrar carro luxo");
	            System.out.println("3 - Exibir relatório");
	            System.out.println("0 - Sair");
	            System.out.print("Opção: ");
	            opcao = sc.nextInt();
	            sc.nextLine();
	 
	            if (opcao == 1 || opcao == 2) {
	                System.out.print("Descrição: ");
	                String descricao = sc.nextLine();
	                System.out.print("Valor do carro: ");
	                double valor = sc.nextDouble();
	                System.out.print("Quilometragem atual: ");
	                double km = sc.nextDouble();
	                sc.nextLine();
	 
	                Carro carro;
	                if (opcao == 1) {
	                    carro = new Carrobasico(descricao, valor, km);
	                } else {
	                    carro = new Carroluxo(descricao, valor, km);
	                }
	                locadora.adicionarCarro(carro);
	 
	            } else if (opcao == 3) {
	                locadora.exibirRelatorio();
	            } else if (opcao != 0) {
	                System.out.println("Opção inválida!");
	            }
	 
	        } while (opcao != 0);
	 
	        System.out.println("Programa encerrado.");
	        sc.close();
	    }
	}