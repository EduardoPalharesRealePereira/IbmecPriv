package Ac18;

import java.time.LocalDate;

public class Emprestimo {
	
	private Usuario usuario;
	private Livro livro;
	private LocalDate dataEmprestimo;
	private LocalDate dataPrevistaDevolucao;
	private LocalDate dataRealDevolucao;
	private String situacao;
	
	
	public Emprestimo(Usuario usuario, Livro livro, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataRealDevolucao) {
		super();
		this.usuario = usuario;
		this.livro = livro;
		this.dataEmprestimo = dataEmprestimo;
		this.dataPrevistaDevolucao = dataPrevistaDevolucao;
		this.dataRealDevolucao = dataRealDevolucao;
		this.situacao = situacao;
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

 
	public void setSituacao(LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataRealDevolucao) {
		// usar as funções do slide para comparar as datas e setar as situações, ai uso o getSituacaon na main
		if(
				return 
	}
	
	
			
	

}
