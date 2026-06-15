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



	@Override 
	public String toString() { // a lista de emprestimos aqui ta retornando o valor ao inves dos valores do emprestimo
		return "Usuario [nome=" + nome + ", matricula=" + matricula + ", emprestimos=" + emprestimos + "]";
	}
	
	
	public void adicionarEmprestimo(Emprestimo emprestimo) {
		
		emprestimos.add(emprestimo);
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public int getMatricula() {
		return matricula;
	}


	public void setMatricula(int matricula) {
		this.matricula = matricula;
	}


	public ArrayList<Emprestimo> getEmprestimos() {
		return emprestimos;
	}


	public void setEmprestimos(ArrayList<Emprestimo> emprestimos) {
		this.emprestimos = emprestimos;
	}
	
	
	

}
