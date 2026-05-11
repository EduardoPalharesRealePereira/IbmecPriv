package Ac17;

public class Carrobasico extends Carro {

    public Carrobasico(String descricao, double valor, double kmAtual) {
        super(descricao, valor, kmAtual);
    }

    @Override
    public double calcularDiaria() {
        return getValor() / 2000.0;
    }

    @Override
    public String verificarKm() {
        if (getKmAtual() > LIMITE_KM) {
            return "Carro deve ser enviado para revisão.";
        }
        return "Carro dentro do limite de km.";
    }

    @Override
    public String getTipo() {
        return "Básico";
    }
}