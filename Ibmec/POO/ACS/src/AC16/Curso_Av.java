package Ac16;

public class Curso_Av extends Curso{
	
	
	public int peso_av1 = 3;
	public int peso_av2 = 5;
	public int peso_av3 = 2;

	public Curso_Av(String nome, int cargaHoraria, int av1, int av2, int av3, int faltas, String tipo_curso) {
		super(nome, cargaHoraria, av1, av2, av3, faltas, tipo_curso);
		// TODO Auto-generated constructor stub
	}
	
	public double calculaMedia() {
		double media = ((av1*3)+(av2*5)+(av3*2))/3;
		return media;
	}
	

}
