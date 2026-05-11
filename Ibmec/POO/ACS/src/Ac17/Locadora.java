package Ac17;

public class Locadora {
    private String nome;
    private String cnpj;
    private Carro[] carros;
    private int quantidade;

    public Locadora(String nome, String cnpj) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.carros = new Carro[100];
        this.quantidade = 0;
    }

    public String getNome() {
        return nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void adicionarCarro(Carro carro) {
        if (quantidade < carros.length) {
            carros[quantidade] = carro;
            quantidade++;
            System.out.println("Carro adicionado com sucesso!");
        } else {
            System.out.println("Limite de carros atingido.");
        }
    }

    public void exibirRelatorio() {
        System.out.println("========= RELATÓRIO DA LOCADORA =========");
        System.out.println("Nome: " + nome);
        System.out.println("CNPJ: " + cnpj);
        System.out.println("Total de carros cadastrados: " + quantidade);
        System.out.println("-----------------------------------------");

        if (quantidade == 0) {
            System.out.println("Nenhum carro cadastrado.");
        } else {
            for (int i = 0; i < quantidade; i++) {
                Carro c = carros[i];
                System.out.println("Carro " + (i + 1) + " (" + c.getTipo() + ")");
                System.out.println("  Descrição: " + c.getDescricao());
                System.out.printf("  Valor: R$ %.2f%n", c.getValor());
                System.out.printf("  KM atual: %.0f km%n", c.getKmAtual());
                System.out.printf("  Valor da diária: R$ %.2f%n", c.calcularDiaria());
                System.out.println("  Status: " + c.verificarKm());
                System.out.println("-----------------------------------------");
            }
        }
        System.out.println("=========================================");
    }
}
