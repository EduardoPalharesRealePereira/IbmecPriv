package Ac17;

public class Carrobasico implements Carro {
	
	   private String descricao;
	   private double valor;
	   private double kilometragem;
	   
	   
	   @Override
	   public double calcularValorDiaria() {
		private double diaria;
		diaria = valor / 2000;
		return diaria;
	   }
	   @Override
	   public String verificarKilometragem() {
		if(kilometragem >= limiteMaxKm) {
			return "Carro deve ser enviado pra revisão";
		}
		return "Carro basico OK para rodar";
	   }
	   

	
}