package Ac17;

public class Carroluxo extends Carro {

    public Carroluxo(String descricao, double valor, double kmAtual) {
        super(descricao, valor, kmAtual);
    }

    @Override
    public double calcularDiaria() {
        double diaria = getValor() / 1000.0;
        if (diaria > 190.0) {
            diaria = 190.0;
        }
        return diaria;
    }

    @Override
    public String verificarKm() {
        if (getKmAtual() > LIMITE_KM) {
            return "Carro deve ser enviado para concessionária do grupo.";
        }
        return "Carro dentro do limite de km.";
    }

    @Override
    public String getTipo() {
        return "Luxo";
    }
}