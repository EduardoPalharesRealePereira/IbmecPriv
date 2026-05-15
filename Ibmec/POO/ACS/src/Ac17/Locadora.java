package Ac17;

import java.util.ArrayList;

public class Locadora {
    
	private int cnpj;
	private String nome;
	private ArrayList<Carro> listaCarros;
	
	public Locadora(int cnpj, String nome) {
		
		this.cnpj = cnpj;
		this.nome = nome;
		this.listaCarros = new ArrayList<Carro>();
		
	}
	
	public void setlistaCarros(ArrayList<Carro> listaCarros) {
		
		this.listaCarros = listaCarros;
		
	}
	
	@Override
	public String toString() {
	    return "Locadora: " + nome + " | CNPJ: " + cnpj + " | Carros: " + listaCarros.toString() + "\n ------------" ;
	}
	
	
}
