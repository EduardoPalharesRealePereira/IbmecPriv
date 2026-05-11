package Ac12;

public class Ingresso {
    private int numero;
    private String descricaoShow;
    private Comprador comprador;

    public Ingresso(int numero, String descricaoShow) {
        this.numero = numero;
        this.descricaoShow = descricaoShow;
    }

    public int getNumero() {
        return numero;
    }

    public String getDescricaoShow() {
        return descricaoShow;
    }

    public Comprador getComprador() {
        return comprador;
    }


    public void setComprador(Comprador comprador) {
        this.comprador = comprador;
    }
}