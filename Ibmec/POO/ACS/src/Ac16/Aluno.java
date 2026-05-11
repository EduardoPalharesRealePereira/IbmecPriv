package Ac16;

public class Aluno {
    private String nome;
    private String registro;
    private Curso curso; // um aluno está em apenas 1 curso

    public Aluno(String nome, String registro, Curso curso) {
        this.nome = nome;
        this.registro = registro;
        this.curso = curso;
    }

    public String getNome() {
        return nome;
    }

    public String getRegistro() {
        return registro;
    }

    public Curso getCurso() {
        return curso;
    }

    public void exibirRelatorio() {
        System.out.println("===== RELATÓRIO DO ALUNO =====");
        System.out.println("Nome: " + nome);
        System.out.println("Registro: " + registro);
        System.out.println("Curso: " + curso.getNome() + " (" + curso.getTipo() + ")");
        System.out.println("Carga horária: " + curso.getCargaHoraria() + " aulas");
        System.out.printf("Média final: %.2f%n", curso.calcularMedia());

        int faltasMax = (int) (curso.getCargaHoraria() * curso.limitePercentualFaltas());
        System.out.println("Faltas: " + curso.getFaltas() + " (máximo permitido: " + faltasMax + ")");

        if (curso.aprovado()) {
            System.out.println("Situação: APROVADO");
        } else {
            // Mensagem detalhada explicando o motivo
            double media = curso.calcularMedia();
            if (media < 7.0 && curso.getFaltas() > faltasMax) {
                System.out.println("Situação: REPROVADO (média insuficiente e excesso de faltas)");
            } else if (media < 7.0) {
                System.out.println("Situação: REPROVADO (média insuficiente)");
            } else {
                System.out.println("Situação: REPROVADO (excesso de faltas)");
            }
        }
        System.out.println("==============================");
    }
}