package Ac18;

import java.time.LocalDate;                  // NOVO
import java.time.format.DateTimeFormatter;   // NOVO
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		int opcao;
		ArrayList<Usuario> usuarios = new ArrayList<>();
		ArrayList<Livro> livros = new ArrayList<>();
		ArrayList<Emprestimo> emprestimos = new ArrayList<>();

		do {
			System.out.println("===== BIBLIOTECA - MENU =====");
			System.out.println("1 - Cadastrar usuário");
			System.out.println("2 - Cadastrar livro");
			System.out.println("3 - Registrar empréstimo");
			System.out.println("4 - Gerar relatório de empréstimos");
			System.out.println("5 - Registrar devolução");   // NOVO
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
				System.out.println("===LISTA DE USUARIOS===");
				int counter = 0;
				for(Usuario u: usuarios) {
					System.out.println(counter+ "-" + u.toString());
					counter++;
				}
				System.out.println("Escreva o número do usuario que deseja registrar o empréstimo:");
				int id = sc.nextInt();
				sc.nextLine();
				Usuario uFinal = usuarios.get(id);
				
				
				System.out.println("===LISTA DE LIVROS===");
				int counter2 = 0;
				for(Livro l: livros) {
					System.out.println(counter2+ "-" + l.toString()); 
					counter2++;
				}
				System.out.println("Escreva o numero do livro: ");
				int id2 = sc.nextInt();
				sc.nextLine();
				Livro lFinal = livros.get(id2);
				System.out.println("Escreva o numero de dias do empréstimo: ");
				int diasEmprestimo = sc.nextInt();
				sc.nextLine();
				
				Emprestimo emprestimo = new Emprestimo(uFinal, lFinal, diasEmprestimo);
				uFinal.adicionarEmprestimo(emprestimo);
				emprestimos.add(emprestimo);
				
				System.out.println("Empréstimo registrado com sucesso!");
				
				break;
				
			case 4:
				System.out.println("===RELATÓRIO DE EMPRÉSTIMOS=== ");
				for(Emprestimo e: emprestimos) {
					System.out.println(e.toString());
				}
				
				break;

			// ===== COMPLETADO: registrar devolução =====
			case 5:
				System.out.println("===LISTA DE EMPRÉSTIMOS===");
				if (emprestimos.isEmpty()) {
					System.out.println("Nenhum empréstimo registrado.");
					break;
				}
				int counter3 = 0;
				for (Emprestimo e : emprestimos) {
					System.out.println(counter3 + " - " + e.getLivro().getTitulo()
							+ " (Usuário: " + e.getUsuario().getNome() + ")");
					counter3++;
				}
				System.out.println("Escolha o número do empréstimo para registrar a devolução: ");
				int idEmp = sc.nextInt();
				sc.nextLine();
				Emprestimo empDevolver = emprestimos.get(idEmp);

				System.out.print("Digite a data real de devolução (dd/MM/yyyy): ");
				String dataTexto = sc.nextLine();
				DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
				LocalDate dataReal = LocalDate.parse(dataTexto, fmt);

				empDevolver.setDataRealDevolucao(dataReal);
				empDevolver.setSituacao(empDevolver.getDataEmprestimo(),
						empDevolver.getDataPrevistaDevolucao(), dataReal);

				System.out.println("Devolução registrada com sucesso!");

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