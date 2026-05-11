package Ac16;

public class Aluno {
	
	private String nome;
	private String registro;
	private double av1;
	private double av2;
	private double av3;
	private double faltas;
	private double media;
	public Aluno(String nome, String registro) {
		super();
		this.nome = nome;
		this.registro = registro;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getRegistro() {
		return registro;
	}
	public void setRegistro(String registro) {
		this.registro = registro;
	}
	public double getAv1() {
		return av1;
	}
	public void setAv1(double av1) {
		this.av1 = av1;
	}
	public double getAv2() {
		return av2;
	}
	public void setAv2(double av2) {
		this.av2 = av2;
	}
	public double getAv3() {
		return av3;
	}
	public void setAv3(double av3) {
		this.av3 = av3;
	}
	public double getFaltas() {
		return faltas;
	}
	public void setFaltas(double faltas) {
		this.faltas = faltas;
	}
	public double getMedia() {
		return media;
	}
	public void setMedia(double media) {
		this.media = media;
	}
	
	
	

}
