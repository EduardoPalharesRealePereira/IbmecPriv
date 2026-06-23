package estudandoap2nouber;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		HashSet<Evento> eventos = new HashSet<>();
		HashSet<Participante> participantes = new HashSet<>();
		
		//cadastro de usuarios
	
		Participante p1 = new Participante(1, "Eduardo", "123");
		
		
		//Cadastro de evento
		
		Evento e1 = new Evento(2,"IFL JOVEM - Rafael Salomao", "2026-06-10", "19:30", "2026-06-10", "23:00");
		System.out.println(e1.toString());
	}
}
