package Ac9;


public class Cilindro {
	
	private double altura;
	private double raio;

	public Cilindro(double altura, double raio) {
		this.altura = altura;
		this.raio = raio;
		
	}
	
	public double getRaio() {
		return raio;
	}
	
	public double getAltura () {
		
		return altura;
	}
	
	public double calcularArea() {
		
		return 2 * Math.PI * raio * (raio + altura);
	}
	
	public double calcularVolume() {
		
		return Math.PI * Math.pow(raio, 2) * altura;
		
	}
	
	public void imprimirResultados() {
		
		
		System.out.println("Area = " + calcularArea());
		System.out.println("Volume = " + calcularVolume());
	}
	

			
			

}
