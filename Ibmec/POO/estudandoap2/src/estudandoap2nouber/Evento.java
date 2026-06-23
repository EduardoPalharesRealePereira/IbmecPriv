package estudandoap2nouber;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Objects;

public class Evento {



		private int id;
		private String titulo;
		private LocalDate dataInicio;
		private LocalTime horarioInicio;
		private LocalDate dataFim;
		private LocalTime horarioFIm;
		private ArrayList<Participante> participantes = new ArrayList<>();
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getTitulo() {
			return titulo;
		}
		public void setTitulo(String titulo) {
			this.titulo = titulo;
		}
		public LocalDate getDataInicio() {
			return dataInicio;
		}
		public void setDataInicio(LocalDate dataInicio) {
			this.dataInicio = dataInicio;
		}
		public LocalTime getHorarioInicio() {
			return horarioInicio;
		}
		public void setHorarioInicio(LocalTime horarioInicio) {
			this.horarioInicio = horarioInicio;
		}
		public LocalDate getDataFim() {
			return dataFim;
		}
		public void setDataFim(LocalDate dataFim) {
			this.dataFim = dataFim;
		}
		public LocalTime getHorarioFIm() {
			return horarioFIm;
		}
		public void setHorarioFIm(LocalTime horarioFIm) {
			this.horarioFIm = horarioFIm;
		}
		public ArrayList<Participante> getParticipantes() {
			return participantes;
		}
		public void setParticipantes(ArrayList<Participante> participantes) {
			this.participantes = participantes;
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
			Evento other = (Evento) obj;
			return id == other.id;
		}
		@Override
		public String toString() {
			return "Evento [id=" + id + ", titulo=" + titulo + ", dataInicio=" + dataInicio + ", horarioInicio="
					+ horarioInicio + ", dataFim=" + dataFim + ", horarioFIm=" + horarioFIm + "]";
		}
		public Evento(int id, String titulo, String dataInicio, String horarioInicio,
	              String dataFim, String horarioFIm) {
	    super();
	    this.id = id;
	    this.titulo = titulo;
	    this.dataInicio = LocalDate.parse(dataInicio);
	    this.horarioInicio = LocalTime.parse(horarioInicio);
	    this.dataFim = LocalDate.parse(dataFim);
	    this.horarioFIm = LocalTime.parse(horarioFIm);
	}
		
		
		
}
