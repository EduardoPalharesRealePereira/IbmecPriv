package Ac18;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		int opcao;
		ArrayList<Usuario> usuarios = new ArrayList<>();
		ArrayList<Livro> livros = new ArrayList<>();

		do {
			System.out.println("===== BIBLIOTECA - MENU =====");
			System.out.println("1 - Cadastrar usuário");
			System.out.println("2 - Cadastrar livro");
			System.out.println("3 - Registrar empréstimo");
			System.out.println("4 - Gerar relatório de empréstimos");
			System.out.println("0 - Sair");
			System.out.print("Escolha uma opção: ");

			opcao = sc.nextInt();
			sc.nextLine();

			switch (opcao) {
			
			case 1:
				System.out.println("Insira o nome de usuario: ");
				String nome = sc.nextLine();
				System.out.println("Insira a matricula do usuario: ");
				int matricula = sc.nextInt();
				sc.nextLine();

				Usuario usuario = new Usuario(nome, matricula);
				usuarios.add(usuario);

				System.out.println("Usuario cadastrado com sucesso!");

				break;
				
			case 2:
				System.out.println("Insira o titulo do livro: ");
				String titulo = sc.nextLine();
				System.out.println("Insira o autor do livro: ");
				String autor = sc.nextLine();
				System.out.println("Insira o codigo do livro: ");
				int codigo = sc.nextInt();
				sc.nextLine();
				System.out.println("Insira a categoria do livro: ");
				String categoria = sc.nextLine();
				
				Livro livro = new Livro(titulo, autor, codigo, categoria);
				livros.add(livro);
				
				System.out.println("Livro cadastrado com sucesso!");
				
				break;
				
			case 3:
				System.out.println("---|Registrar empréstimo|---");
				System.out.println("Selecione o usuário que deseja registrar o empréstimo: ");
				System.out.println(usuarios.); // parei aqui, letra j case 3
				break;
			case 4:
				System.out.println("Gerar relatório");
				break;
			case 0:
				System.out.println("Saindo...");
				break;
			default:
				System.out.println("Opção inválida!");
				break;
			}

			System.out.println();

		} while (opcao != 0);

		sc.close();
	}

}