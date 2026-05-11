package Ac8;
import java.util.Scanner;

public class ac8 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // a. Autenticação de usuário
        String senhaCorreta = "J@vaPOO";
        int tentativas = 0;
        boolean autenticado = false;

        System.out.println("--- Bem-vindo ao Sistema PIX ---");
        
        while (tentativas < 3) {
            System.out.print("Digite a sua senha: ");
            String senhaDigitada = scanner.nextLine();

            // Em Java, usamos .equals() para comparar o conteúdo de Strings
            if (senhaDigitada.equals(senhaCorreta)) {
                autenticado = true;
                System.out.println("Acesso permitido!\n");
                break; // Sai do loop se a senha estiver correta
            } else {
                tentativas++;
                int tentativasRestantes = 3 - tentativas;
                System.out.println("Senha incorreta! Você tem " + tentativasRestantes + " tentativa(s) restante(s).");
            }
        }

        // Se falhou as 3 vezes, encerra o programa
        if (!autenticado) {
            System.out.println("Acesso bloqueado por excesso de tentativas falhas.");
            scanner.close();
            return; 
        }

        // b. Valores pré-definidos
        double saldoOrigem = 1000.00;
        double limitePix = 500.00;
        double saldoDestino = 2000.00;

        // c. Informar valor da transferência
        System.out.print("Informe o valor da transferência PIX: R$ ");
        double valorTransferencia = scanner.nextDouble();

        // d. Verificar saldo e limite
        boolean transacaoRealizada = false;
        String motivoRecusa = "";

        if (valorTransferencia <= 0) {
            motivoRecusa = "Valor de transferência inválido.";
        } else if (valorTransferencia > limitePix) {
            motivoRecusa = "O valor excede o limite de R$ 500,00 para PIX.";
        } else if (valorTransferencia > saldoOrigem) {
            motivoRecusa = "Saldo insuficiente na conta de origem.";
        } else {
            // Se passar por todas as verificações, a transação ocorre
            saldoOrigem -= valorTransferencia;
            saldoDestino += valorTransferencia;
            transacaoRealizada = true;
        }

        // e. Relatório da transação
        System.out.println("\n========================================");
        System.out.println("           RELATÓRIO DA TRANSAÇÃO       ");
        System.out.println("========================================");
        System.out.printf("Valor da transferência: R$ %.2f\n", valorTransferencia);
        
        if (transacaoRealizada) {
            System.out.println("Resultado da transferência: REALIZADA");
        } else {
            System.out.println("Resultado da transferência: NEGADA (" + motivoRecusa + ")");
        }
        
        System.out.printf("Saldo final de origem: R$ %.2f\n", saldoOrigem);
        System.out.printf("Limite Transação PIX: R$ %.2f\n", limitePix);
        System.out.printf("Saldo final de destino: R$ %.2f\n", saldoDestino);
        System.out.println("========================================");

        scanner.close();
    }
}