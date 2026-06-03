package Ac18;

import java.time.LocalDate;

public class Emprestimo {
	
	private Usuario usuario;
	private Livro livro;
	private LocalDate dataEmprestimo;
	private LocalDate dataPrevistaDevolucao;
	private LocalDate dataRealDevolucao;
	private String situacao;
	private int diasEmprestimo;
	
	public Emprestimo(Usuario usuario, Livro livro, int diasEmprestimo) {
		super();
		this.usuario = usuario;
		this.livro = livro;
		this.dataEmprestimo = LocalDate.now();
		this.dataPrevistaDevolucao = LocalDate.now().plusDays(diasEmprestimo);
		this.dataRealDevolucao = null;
		this.situacao = "EMPRESTADO";
	}


	public Usuario getUsuario() {
		return usuario;
	}


	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}


	public Livro getLivro() {
		return livro;
	}


	public void setLivro(Livro livro) {
		this.livro = livro;
	}


	public LocalDate getDataEmprestimo() {
		return dataEmprestimo;
	}


	public void setDataEmprestimo(LocalDate dataEmprestimo) {
		this.dataEmprestimo = dataEmprestimo;
	}


	public LocalDate getDataPrevistaDevolucao() {
		return dataPrevistaDevolucao;
	}


	public void setDataPrevistaDevolucao(LocalDate dataPrevistaDevolucao) {
		this.dataPrevistaDevolucao = dataPrevistaDevolucao;
	}


	public LocalDate getDataRealDevolucao() {
		return dataRealDevolucao;
	}


	public void setDataRealDevolucao(LocalDate dataRealDevolucao) {
		this.dataRealDevolucao = dataRealDevolucao;
	}


	public String getSituacao() {
		return situacao;
	}

	public String setSituacao(LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataRealDevolucao) {
		if(LocalDate.now().isAfter(dataPrevistaDevolucao)){
				return situacao = "ATRASADO";
	}
		else if(dataPrevistaDevolucao.isAfter(dataRealDevolucao)) {
			return "DEVOLVIDO NO PRAZO";
		}
		else if(dataRealDevolucao.isAfter(dataPrevistaDevolucao)) {
			return "DEVOLVIDO COM ATRASO";
		}
	return situacao = "bretas";
	
			
	
	}


	@Override
	public String toString() {
		return "Emprestimo [usuario=" + usuario + ", livro=" + livro + ", dataEmprestimo=" + dataEmprestimo
				+ ", dataPrevistaDevolucao=" + dataPrevistaDevolucao + ", dataRealDevolucao=" + dataRealDevolucao
				+ ", situacao=" + situacao + ", diasEmprestimo=" + diasEmprestimo + "]";
	}
	
	
	
}
