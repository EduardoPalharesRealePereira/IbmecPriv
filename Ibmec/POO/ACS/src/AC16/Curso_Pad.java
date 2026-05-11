package Ac16;

public class Curso_Pad extends Curso {


		public Curso_Pad(String nome, int cargaHoraria) {
			super(nome, cargaHoraria, 0, 0, 0, 0, "Padrão");
			// TODO Auto-generated constructor stub
		}

	
	public double calculaMedia(double av1, double av2, double av3) {
		double media = (av1+av2+av3)/3;
		return media;
	

}
}

