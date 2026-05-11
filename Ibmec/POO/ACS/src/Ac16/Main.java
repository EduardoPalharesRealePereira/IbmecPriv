package Ac16;
import java.util.Scanner;

public class Main {
	
	public static void main(String[] args) {
		
		
	    Scanner sc = new Scanner(System.in);
	    
        // ----- Dados do aluno -----
        System.out.print("Nome do aluno: ");
        String nome = sc.nextLine();
 
        System.out.print("Registro do aluno: ");
        String registro = sc.nextLine();
 
        // ----- Dados do curso -----
        System.out.print("Nome do curso: ");
        String nomeCurso = sc.nextLine();
 
        System.out.println("Tipo do curso:");
        System.out.println("  1 - Curso Padrão");
        System.out.println("  2 - Curso Avançado");
        System.out.print("Escolha: ");
        int tipo = sc.nextInt();
 
        Curso curso;
        if (tipo == 1) {
            curso = new Curso_Pad(nomeCurso);
        } else {
            curso = new Curso_Av(nomeCurso);
        }
 
        // ----- Notas -----
        System.out.print("Nota 1: ");
        double n1 = sc.nextDouble();
        System.out.print("Nota 2: ");
        double n2 = sc.nextDouble();
        System.out.print("Nota 3: ");
        double n3 = sc.nextDouble();
        curso.setNotas(n1, n2, n3);
 
        // ----- Faltas -----
        System.out.print("Número de faltas: ");
        int faltas = sc.nextInt();
        curso.setFaltas(faltas);
 
        // ----- Relatório -----
        Aluno aluno = new Aluno(nome, registro, curso);
        System.out.println();
        aluno.exibirRelatorio();
 
        sc.close();
    }

}
