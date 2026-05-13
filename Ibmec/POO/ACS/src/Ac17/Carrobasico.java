package Ac17;

public class Carrobasico implements Carro {
	
	   private String descricao;
	   private double valor;
	   private double kilometragem;
	   private double diaria;
	   
	   
	   
	   
	   public Carrobasico(String descricao, double valor, double kilometragem) {
		super();
		this.descricao = descricao;
		this.valor = valor;
		this.kilometragem = kilometragem;
	}
	   @Override
	   public double calcularValorDiaria() {
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
	   

	   @Override
	   public String toString() {
	       return "Carro Basico: " + descricao + " | Valor: " + valor + " | Km: " + kilometragem;
	   }
	
}