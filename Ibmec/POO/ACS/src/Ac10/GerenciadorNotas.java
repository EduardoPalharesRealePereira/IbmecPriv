package Ac10;

import java.util.Scanner;

public class GerenciadorNotas {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String[] matriculas = new String[100];
        String[] nomes = new String[100];
        double[] notasA1 = new double[100];
        double[] notasA2 = new double[100];
        double[] notasAC = new double[100];
        double[] notasAS = new double[100];
        boolean[] temSubstitutiva = new boolean[100];
        double[] medias = new double[100];
        String[] status = new String[100];

        int totalAlunos = 0;
        String continuar = "s";

        while (continuar.equals("s")) {
            System.out.print("Nome do aluno: ");
            nomes[totalAlunos] = scanner.nextLine();

            System.out.print("Matrícula: ");
            matriculas[totalAlunos] = scanner.nextLine();

            System.out.print("Nota da Avaliação 1 (A1): ");
            notasA1[totalAlunos] = scanner.nextDouble();

            System.out.print("Nota da Avaliação 2 (A2): ");
            notasA2[totalAlunos] = scanner.nextDouble();

            System.out.print("Nota da Atividade Complementar (AC): ");
            notasAC[totalAlunos] = scanner.nextDouble();
            scanner.nextLine();

            double media = (notasA1[totalAlunos] * 4 + notasA2[totalAlunos] * 4 + notasAC[totalAlunos] * 2) / 10.0;

            if (media >= 7.0) {
                medias[totalAlunos] = media;
                temSubstitutiva[totalAlunos] = false;
                status[totalAlunos] = "Aprovado";
            } else {
                System.out.printf("Média atual: %.2f - Abaixo de 7.0%n", media);
                System.out.print("Nota da Avaliação Substitutiva (AS): ");
                notasAS[totalAlunos] = scanner.nextDouble();
                scanner.nextLine();
                temSubstitutiva[totalAlunos] = true;

                if (notasA1[totalAlunos] <= notasA2[totalAlunos]) {
                    notasA1[totalAlunos] = notasAS[totalAlunos];
                } else {
                    notasA2[totalAlunos] = notasAS[totalAlunos];
                }

                medias[totalAlunos] = (notasA1[totalAlunos] * 4 + notasA2[totalAlunos] * 4 + notasAC[totalAlunos] * 2) / 10.0;

                if (medias[totalAlunos] >= 7.0) {
                    status[totalAlunos] = "Aprovado";
                } else {
                    status[totalAlunos] = "Reprovado";
                }
            }

            totalAlunos++;

            System.out.print("\nDeseja inserir outro aluno? (s/n): ");
            continuar = scanner.nextLine().trim().toLowerCase();
            System.out.println();
        }

        System.out.println("\n========== RESULTADO FINAL DOS ALUNOS ==========");

        for (int i = 0; i < totalAlunos; i++) {
            System.out.println("=================================================");
            System.out.println("Matrícula   : " + matriculas[i]);
            System.out.println("Nome        : " + nomes[i]);
            System.out.printf("Nota A1     : %.2f%n", notasA1[i]);
            System.out.printf("Nota A2     : %.2f%n", notasA2[i]);
            System.out.printf("Nota AC     : %.2f%n", notasAC[i]);
            if (temSubstitutiva[i]) {
                System.out.printf("Nota AS     : %.2f%n", notasAS[i]);
            }
            System.out.printf("Média Final : %.2f%n", medias[i]);
            System.out.println("Status      : " + status[i]);
        }

        System.out.println("=================================================");
        scanner.close();
    }
}