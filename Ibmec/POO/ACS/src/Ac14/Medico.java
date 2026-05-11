package Ac14;

import java.util.ArrayList;

public class Medico {
	
	private String registro;
	private String nome;
	private String especialidade;
	private ArrayList<Paciente> pacientes = new ArrayList<>();
	
	public Medico(String registro, String nome, String especialidade, ArrayList<Paciente> pacientes) {
		 this.registro = registro;
		 this.nome = nome;
		 this.especialidade = especialidade;
		 this.pacientes = pacientes;
	}

	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(String especialidade) {
		this.especialidade = especialidade;
	}
	
	public void adicionarPaciente(Paciente p) {
	    pacientes.add(p);
	}

	public void removerPaciente(Paciente p) {
	    pacientes.remove(p);
	}

	public ArrayList<Paciente> getPacientes() {
	    return pacientes;
	}
	

	@Override
	public String toString() {
		return "Médico - Registro - " + registro + ", Nome - " + nome + ", Especialidade - " + especialidade;
	}
	
	

}
