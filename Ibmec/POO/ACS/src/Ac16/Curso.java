package Ac16;
import java.util.ArrayList;

public class Curso {
    private String nome;
    private int cargaHoraria;
    protected double nota1;
    protected double nota2;
    protected double nota3;
    private int faltas;

    public Curso(String nome) {
        this.nome = nome;
        this.cargaHoraria = 80; // padrão da universidade
    }

    // Construtor com carga horária customizada (sobrecarga)
    public Curso(String nome, int cargaHoraria) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
    }

    public void setNotas(double n1, double n2, double n3) {
        this.nota1 = n1;
        this.nota2 = n2;
        this.nota3 = n3;
    }

    public void setFaltas(int faltas) {
        this.faltas = faltas;
    }

    public String getNome() {
        return nome;
    }

    public int getCargaHoraria() {
        return cargaHoraria;
    }

    public int getFaltas() {
        return faltas;
    }

    // Métodos que serão sobrescritos pelas subclasses
    public double calcularMedia() {
        return 0.0;
    }

    public double limitePercentualFaltas() {
        return 0.0;
    }

    public String getTipo() {
        return "Curso";
    }

    // Verifica se o aluno foi aprovado (média >= 7.0 E faltas dentro do limite)
    public boolean aprovado() {
        double media = calcularMedia();
        int faltasMaximas = (int) (cargaHoraria * limitePercentualFaltas());
        return media >= 7.0 && faltas <= faltasMaximas;
    }
}