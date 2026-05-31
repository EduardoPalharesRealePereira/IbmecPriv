package Ac18;
import java.util.ArrayList;

public class Livro {
	
	private String titulo;
	private String autor;
	private int codigo;
	private String categoria;
	ArrayList<Emprestimo> listaEmprestimos = new ArrayList<>();
	
	
	public Livro(String titulo, String autor, int codigo, String categoria) {
		super();
		this.titulo = titulo;
		this.autor = autor;
		this.codigo = codigo;
		this.categoria = categoria;
	}

	// ===== NOVO: getters necessários para montar o relatório =====
	public String getTitulo() {
		return titulo;
	}

	public String getAutor() {
		return autor;
	}

	public int getCodigo() {
		return codigo;
	}

	public String getCategoria() {
		return categoria;
	}
	// =============================================================

	@Override
	public String toString() {
		return "Livro [titulo=" + titulo + ", autor=" + autor + ", codigo=" + codigo + ", categoria=" + categoria
				+ ", listaEmprestimos=" + listaEmprestimos + "]";
	}

}