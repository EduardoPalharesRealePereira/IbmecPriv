package Ac13;

public class Livro {
    private String descricao;
    private int numeroPaginas;

    public Livro(String descricao, int numeroPaginas) {
        this.descricao = descricao;
        this.numeroPaginas = numeroPaginas;
    }

    public String getDescricao() {
        return descricao;
    }

    public int getNumeroPaginas() {
        return numeroPaginas;
    }

    public String toString() {
        return "  - Livro: " + descricao + " | Páginas: " + numeroPaginas;
    }
}