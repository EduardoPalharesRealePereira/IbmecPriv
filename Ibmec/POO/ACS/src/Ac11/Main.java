package Ac11;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        // Usamos Locale.US para garantir que o separador decimal seja o ponto (ex: 20.50)
        Scanner scanner = new Scanner(System.in).useLocale(Locale.US);
        List<Produto> cesta = new ArrayList<>();
        double totalCompra = 0.0;

        System.out.println("--- Sistema de Cesta de Compras ---\n");

        // Loop para permitir que o usuário adicione quantos produtos quiser
        while (true) {
            System.out.print("Digite o nome do produto (ou digite 'sair' para finalizar): ");
            String nome = scanner.nextLine();

            // Condição de parada do loop
            if (nome.equalsIgnoreCase("sair")) {
                break;
            }

            System.out.print("Digite o preço do produto (ex: 20.50): ");
            double preco = Double.parseDouble(scanner.nextLine());

            System.out.print("Digite a quantidade: ");
            int quantidade = Integer.parseInt(scanner.nextLine());

            // Cria o produto e adiciona à cesta
            Produto produto = new Produto(nome, preco, quantidade);
            cesta.add(produto);
            
            // Soma o subtotal ao valor total da compra
            totalCompra += produto.getSubtotal();

            System.out.println("Produto adicionado com sucesso!\n");
        }

        // --- Geração do Relatório ---
        System.out.println("\nProdutos na cesta:\n");

        for (Produto p : cesta) {
            System.out.println("Produto: " + p.getNome());
            System.out.printf(Locale.US, "Preço: R$ %.2f\n", p.getPreco());
            System.out.println("Quantidade: " + p.getQuantidade());
            System.out.printf(Locale.US, "Subtotal: R$ %.2f\n\n", p.getSubtotal());
        }

        System.out.printf(Locale.US, "Total da compra: R$ %.2f\n", totalCompra);

        scanner.close();
    }
}