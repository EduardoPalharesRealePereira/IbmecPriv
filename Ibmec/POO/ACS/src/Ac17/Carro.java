package Ac17;

public class Carro implements Locavel {
    public static final int LIMITE_KM = 50000;

    private String descricao;
    private double valor;
    private double kmAtual;

    public Carro(String descricao, double valor, double kmAtual) {
        this.descricao = descricao;
        this.valor = valor;
        this.kmAtual = kmAtual;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getValor() {
        return valor;
    }

    public double getKmAtual() {
        return kmAtual;
    }

    public void setKmAtual(double kmAtual) {
        this.kmAtual = kmAtual;
    }

    @Override
    public double calcularDiaria() {
        return 0.0;
    }

    @Override
    public String verificarKm() {
        return "";
    }

    public String getTipo() {
        return "Carro";
    }
}