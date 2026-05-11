package Ac16;

public class Curso_Pad extends Curso {

    public Curso_Pad(String nome) {
        super(nome);
    }

    @Override
    public double calcularMedia() {
        // Média aritmética simples das três avaliações
        return (nota1 + nota2 + nota3) / 3.0;
    }

    @Override
    public double limitePercentualFaltas() {
        return 0.25; // 25%
    }

    @Override
    public String getTipo() {
        return "Curso Padrão";
    }
}