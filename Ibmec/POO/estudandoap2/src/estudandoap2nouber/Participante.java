package estudandoap2nouber;
import java.util.ArrayList;
import java.util.Objects;

public class Participante {
	
	private int id;
	private String nome;
	private String cpf;
	private ArrayList<Evento> eventos = new ArrayList<>();
	
	public Participante(int id, String nome, String cpf) {
		super();
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public ArrayList<Evento> getEventos() {
		return eventos;
	}

	public void setEventos(ArrayList<Evento> eventos) {
		this.eventos = eventos;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Participante other = (Participante) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Participante [id=" + id + ", nome=" + nome + ", cpf=" + cpf + ", eventos=" + eventos + "]";
	}
	
	
	
	

}
