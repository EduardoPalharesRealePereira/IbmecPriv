package Ac16;

public class Main {
	
	public static void main(String[] args) {
		
		
		Aluno a1 = new Aluno("Benjamin", "2026-01");
		a1.setAv1(7.0);
		a1.setAv2(6.0);
		a1.setAv3(4.0);
		a1.setFaltas(3);
		
		Curso_Pad cp = new Curso_Pad("Desenvolvimento Python", 80);
		System.out.println("Curso: " + cp.getNome() + " [" + cp.getCargahoraria() + " aulas]");
		
		
		cp.addAluno(a1);
		a1.setMedia(cp.calculaMedia(a1.getAv1(), a1.getAv2(), a1.getAv3()));
		
		for(Aluno a: cp.getListaAlunos()) {
			
			System.out.println("Nome: " + a.getNome());
			System.out.println("Registro " + a.getNome());
			System.out.println("Nota 1: " + a.getAv1());
			System.out.println("Nota 2: " + a.getAv2());
			System.out.println("Nota 3: " + a.getAv3());
			System.out.println("Média: " + a.getMedia());
		}
		
		
		
		
	}

}
