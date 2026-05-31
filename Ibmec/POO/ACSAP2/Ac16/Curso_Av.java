package Ac16;

public class Curso_Av extends Curso {

    public Curso_Av(String nome) {
        super(nome);
    }

    @Override
    public double calcularMedia() {
        // Média ponderada: pesos 3, 5 e 2 (soma dos pesos = 10)
        return (nota1 * 3 + nota2 * 5 + nota3 * 2) / 10.0;
    }

    @Override
    public double limitePercentualFaltas() {
        return 0.10; // 10%
    }

    @Override
    public String getTipo() {
        return "Curso Avançado";
    }
}