package Ac17;

public class Carroluxo implements Carro  {

   private String descricao;
   private double valor;
   private double kilometragem;
   
   
   @Override
   public double calcularValorDiaria() {
	   
	private double diaria;
	diaria = valor / 1000;
	if(diaria >= 190) {
		diaria = 190;
		return diaria;
	}
	
	return diaria;
   }
   
   @Override
   public String verificarKilometragem() {
	   if(kilometragem >= limiteMaxKm) {
			return "Carro deve ser enviado pra concessionária do grupo";
		}
		return "Carro de luxo OK para rodar";
	   
   }
   
   
   
}