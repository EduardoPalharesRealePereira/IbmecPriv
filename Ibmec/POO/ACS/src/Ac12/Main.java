package Ac12;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("--- Sistema de Venda de Ingressos ---\n");

        System.out.print("Digite o nome do comprador: ");
        String nome = scanner.nextLine();

        System.out.print("Digite o CPF do comprador: ");
        String cpf = scanner.nextLine();

        Comprador cliente = new Comprador(nome, cpf);

        System.out.println("\n--- Dados do Ingresso ---");
        System.out.print("Digite o número do ingresso (apenas números): ");

        int numero = Integer.parseInt(scanner.nextLine()); 

        System.out.print("Digite a descrição do show: ");
        String descricaoShow = scanner.nextLine();

        Ingresso bilhete = new Ingresso(numero, descricaoShow);

        System.out.println();
        registrarVenda(cliente, bilhete);
        imprimirResumo(cliente);

        scanner.close();
    }


    public static void registrarVenda(Comprador comprador, Ingresso ingresso) {
        comprador.setIngresso(ingresso);
        ingresso.setComprador(comprador);
        System.out.println("Venda registrada com sucesso!\n");
    }


    public static void imprimirResumo(Comprador comprador) {
        System.out.println("       RESUMO DA TRANSAÇÃO");
        System.out.println("==================================");
        
        if (comprador.getIngresso() != null) {
            System.out.println("Comprador: " + comprador.getNome());
            System.out.println("CPF: " + comprador.getCpf());
            System.out.println("Show: " + comprador.getIngresso().getDescricaoShow());
            System.out.println("Número do Ingresso: " + comprador.getIngresso().getNumero());
        } else {
            System.out.println("Nenhum ingresso registrado para este comprador.");
        }		
    }
}