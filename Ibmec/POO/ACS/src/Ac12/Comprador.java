package Ac12;

public class Comprador {
    private String nome;
    private String cpf;
    private Ingresso ingresso;

    public Comprador(String nome, String cpf) {
        this.nome = nome;
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public Ingresso getIngresso() {
        return ingresso;
    }

    
    public void setIngresso(Ingresso ingresso) {
        this.ingresso = ingresso;
    }
}