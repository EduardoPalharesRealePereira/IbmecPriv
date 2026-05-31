package Ac17;

public class Carroluxo implements Carro  {

   private String descricao;
   private double valor;
   private double kilometragem;
   private double diaria;
   
   
   public Carroluxo(String descricao, double valor, double kilometragem) {
	super();
	this.descricao = descricao;
	this.valor = valor;
	this.kilometragem = kilometragem;
}

   @Override
   public double calcularValorDiaria() {
	   
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
   
   @Override
   public String toString() {
       return "Carro Luxo: " + descricao + " | Valor: " + valor + " | Km: " + kilometragem;
   }
   
}