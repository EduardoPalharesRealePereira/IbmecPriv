package Ac13;

import java.util.ArrayList;
import java.util.Iterator;

public class Autor {
    private String nome;
    private String cpf;
    private ArrayList<Livro> livros;

    public Autor(String nome, String cpf) {
        this.nome = nome;
        this.cpf = cpf;
        this.livros = new ArrayList<Livro>();
    }

    public void adicionarLivro(Livro livro) {
        livros.add(livro);
    }

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void imprimirResumo() {
        System.out.println("========================================");
        System.out.println("Autor: " + nome);
        System.out.println("CPF:   " + cpf);
        System.out.println("Obras:");

        if (livros.isEmpty()) {
            System.out.println("  Nenhum livro cadastrado.");
        } else {
            Iterator<Livro> iterator = livros.iterator();
            int total = 0;
            while (iterator.hasNext()) {
                Livro livro = iterator.next();
                System.out.println(livro);
                total += livro.getNumeroPaginas();
            }
            System.out.println("Total de livros: " + livros.size());
            System.out.println("Total de páginas: " + total);
        }

        System.out.println("========================================");
    }
}