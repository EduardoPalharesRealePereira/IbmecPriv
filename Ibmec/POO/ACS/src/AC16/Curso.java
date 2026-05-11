package Ac16;
import java.util.ArrayList;

public class Curso {
	
	public String nome;
	public int cargaHoraria = 80;
	public int av1;
	public int av2;
	public int av3;
	public int faltas;
	public String tipo_curso;
	private ArrayList<Aluno> listaAlunos;
	
	public Curso(String nome, int cargaHoraria, int av1, int av2, int av3, int faltas, String tipo_curso) {
		super();
		this.nome = nome;
		this.cargaHoraria = cargaHoraria;
		this.av1 = av1;
		this.av2 = av2;
		this.av3 = av3;
		this.faltas = faltas;
		this.tipo_curso = tipo_curso;
		this.listaAlunos = new ArrayList<Aluno>();
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getCargahoraria() {
		return cargaHoraria;
	}

	public void setCargahoraria(int carga_horaria) {
		this.cargaHoraria= carga_horaria;
	}

	public int getAv1() {
		return av1;
	}

	public void setAv1(int av1) {
		this.av1 = av1;
	}

	public int getAv2() {
		return av2;
	}

	public void setAv2(int av2) {
		this.av2 = av2;
	}

	public int getAv3() {
		return av3;
	}

	public void setAv3(int av3) {
		this.av3 = av3;
	}

	public int getFaltas() {
		return faltas;
	}

	public void setFaltas(int faltas) {
		this.faltas = faltas;
	}

	public String getTipo_curso() {
		return tipo_curso;
	}

	public void setTipo_curso(String tipo_curso) {
		this.tipo_curso = tipo_curso;
	}

	public ArrayList<Aluno> getListaAlunos() {
		return listaAlunos;
	}

	public void setListaAlunos(ArrayList<Aluno> listaAlunos) {
		this.listaAlunos = listaAlunos;
	}
	
	public void addAluno(Aluno aluno) {
		
		listaAlunos.add(aluno);
	}
	
	

}
