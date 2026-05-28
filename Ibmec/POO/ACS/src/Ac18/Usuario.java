package Ac18;

import java.util.ArrayList;
import java.util.Objects;

public class Usuario {
	
	private String nome;
	private int matricula;
	ArrayList <Emprestimo> emprestimos = new ArrayList<>();
	
	
	public Usuario(String nome, int matricula) {
		super();
		this.nome = nome;
		this.matricula = matricula;
		this.emprestimos = emprestimos;
	}
	
		
	@Override
	public int hashCode() {
		return Objects.hash(matricula);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return matricula == other.matricula;
	}
	
	
	
	
	
	

}
