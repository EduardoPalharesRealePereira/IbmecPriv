package Ac13;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Lista para substituir a antiga classe Biblioteca e guardar os autores na memória
       ArrayList<Autor> listaDeAutores = new ArrayList<>();

        int opcao;

        do {
            System.out.println("\n--- MENU PRINCIPAL ---");
            System.out.println("1. Cadastrar novo autor");
            System.out.println("2. Adicionar livro a um autor");
            System.out.println("3. Exibir resumo de um autor");
            System.out.println("4. Exibir resumo de todos os autores");
            System.out.println("0. Sair");
            System.out.print("Escolha uma opcao: ");
            opcao = scanner.nextInt();
            scanner.nextLine(); // limpa o buffer

            if (opcao == 1) {
                System.out.println("\n-- Cadastro de Autor --");
                System.out.print("Nome do autor: ");
                String nome = scanner.nextLine();
                System.out.print("CPF do autor: ");
                String cpf = scanner.nextLine();

                Autor novoAutor = new Autor(nome, cpf);
                listaDeAutores.add(novoAutor); // Adiciona o autor na lista
                System.out.println("Autor cadastrado com sucesso!");

            } else if (opcao == 2) {
                System.out.println("\n-- Adicionar Livro --");
                System.out.print("CPF do autor: ");
                String cpf = scanner.nextLine();

                Autor autor = buscarAutorPorCpf(listaDeAutores, cpf);

                if (autor == null) {
                    System.out.println("Autor com CPF " + cpf + " nao encontrado.");
                } else {
                    System.out.println("Autor encontrado: " + autor.getNome());
                    System.out.print("Descricao do livro: ");
                    String descricao = scanner.nextLine();
                    System.out.print("Numero de paginas: ");
                    int paginas = scanner.nextInt();
                    scanner.nextLine(); // limpa o buffer

                    Livro livro = new Livro(descricao, paginas);
                    autor.adicionarLivro(livro);
                    System.out.println("Livro \"" + descricao + "\" adicionado com sucesso!");
                }

            } else if (opcao == 3) {
                System.out.println("\n-- Resumo de Autor --");
                System.out.print("CPF do autor: ");
                String cpf = scanner.nextLine();

                Autor autor = buscarAutorPorCpf(listaDeAutores, cpf);

                if (autor == null) {
                    System.out.println("Autor com CPF " + cpf + " nao encontrado.");
                } else {
                    autor.imprimirResumo();
                }

            } else if (opcao == 4) {
                System.out.println("\n-- Resumo de Todos os Autores --");
                if (listaDeAutores.isEmpty()) {
                    System.out.println("Nenhum autor cadastrado no sistema.");
                } else {
                    for (Autor a : listaDeAutores) {
                        a.imprimirResumo();
                        System.out.println("-------------------------");
                    }
                }

            } else if (opcao != 0) {
                System.out.println("Opcao invalida! Tente novamente.");
            }

        } while (opcao != 0);

        System.out.println("\nSistema encerrado. Ate logo!");
        scanner.close();
    }

    // Método auxiliar para buscar o autor na lista pelo CPF
    private static Autor buscarAutorPorCpf(List<Autor> lista, String cpf) {
        for (Autor autor : lista) {
            // Presume-se que a classe Autor possui um método getCpf()
            if (autor.getCpf().equals(cpf)) {
                return autor;
            }
        }
        return null;
    }
}