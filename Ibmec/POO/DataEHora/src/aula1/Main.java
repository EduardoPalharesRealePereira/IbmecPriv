package aula1;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


public class Main {
	
	public static void main(String[] args) {
	
	LocalDateTime agora =  LocalDateTime.now();
	System.out.println("Agora: " + agora);
	LocalDateTime dt = LocalDateTime.of(2025, 11, 10, 17, 30);
	System.out.println("Data: " + dt);
	LocalDate hoje = LocalDate.now();
	System.out.println("Hoje: " + hoje);
		
	
	// aprendemos isso e varios jeitos de manipular isso
	}

}
