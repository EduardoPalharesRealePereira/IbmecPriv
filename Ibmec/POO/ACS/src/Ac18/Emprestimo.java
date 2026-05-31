package Ac18;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;   // NOVO
import java.time.temporal.ChronoUnit;        // NOVO

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

	// ===== COMPLETADO: lógica de situação conforme as regras do enunciado =====
	public String setSituacao(LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataRealDevolucao) {
		if (dataRealDevolucao == null) {
			// Ainda não devolvido
			if (LocalDate.now().isAfter(dataPrevistaDevolucao)) {
				this.situacao = "ATRASADO";
			} else {
				this.situacao = "EMPRESTADO";
			}
		} else {
			// Já devolvido
			if (dataRealDevolucao.isAfter(dataPrevistaDevolucao)) {
				this.situacao = "DEVOLVIDO COM ATRASO";
			} else {
				this.situacao = "DEVOLVIDO NO PRAZO"; // real <= prevista
			}
		}
		return this.situacao;
	}

	// ===== NOVO: total de dias emprestado =====
	// Se ainda não devolveu, conta até hoje; senão, até a data real de devolução.
	public long getTotalDiasEmprestado() {
		LocalDate fim = (dataRealDevolucao != null) ? dataRealDevolucao : LocalDate.now();
		return ChronoUnit.DAYS.between(dataEmprestimo, fim);
	}

	// ===== NOVO: dias de atraso =====
	public long getDiasAtraso() {
		LocalDate fim = (dataRealDevolucao != null) ? dataRealDevolucao : LocalDate.now();
		if (fim.isAfter(dataPrevistaDevolucao)) {
			return ChronoUnit.DAYS.between(dataPrevistaDevolucao, fim);
		}
		return 0;
	}

	// ===== NOVO: relatório no formato do enunciado =====
	@Override
	public String toString() {
		DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		// Recalcula a situação com base nas datas atuais antes de imprimir
		setSituacao(dataEmprestimo, dataPrevistaDevolucao, dataRealDevolucao);
		String dataReal = (dataRealDevolucao != null) ? dataRealDevolucao.format(fmt) : "-";

		return "Livro: " + livro.getTitulo() + "\n"
				+ "Autor: " + livro.getAutor() + "\n"
				+ "Código: " + livro.getCodigo() + "\n"
				+ "Categoria: " + livro.getCategoria() + "\n"
				+ "Usuário: " + usuario.getNome() + "\n"
				+ "Matrícula: " + usuario.getMatricula() + "\n"
				+ "Data do empréstimo: " + dataEmprestimo.format(fmt) + "\n"
				+ "Data prevista de devolução: " + dataPrevistaDevolucao.format(fmt) + "\n"
				+ "Data real de devolução: " + dataReal + "\n"
				+ "Total de dias emprestado: " + getTotalDiasEmprestado() + "\n"
				+ "Dias de atraso: " + getDiasAtraso() + "\n"
				+ "Situação: " + situacao + "\n"
				+ "----------------------------";
	}
}