package Ac15;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        ArrayList<Desenvolvedor> lista_devs = new ArrayList<Desenvolvedor>();
        ArrayList<Projeto> lista_projetos = new ArrayList<Projeto>();

        // cadastrar desenvolvedores
        System.out.print("Quantos desenvolvedores deseja cadastrar? ");
        int qtdDevs = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < qtdDevs; i++) {
            System.out.println("\n--- Desenvolvedor " + (i + 1) + " ---");

            System.out.print("Nome: ");
            String nome = sc.nextLine();

            System.out.print("Especialidade: ");
            String especialidade = sc.nextLine();

            System.out.print("Salario: ");
            double salario = sc.nextDouble();
            sc.nextLine();

            lista_devs.add(new Desenvolvedor(nome, especialidade, salario));
        }

        // cadastrar projetos
        System.out.print("\nQuantos projetos deseja cadastrar? ");
        int qtdProjetos = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < qtdProjetos; i++) {
            System.out.println("\n--- Projeto " + (i + 1) + " ---");

            System.out.print("Nome do projeto: ");
            String nome = sc.nextLine();

            System.out.print("Prazo (em meses): ");
            int prazo = sc.nextInt();

            System.out.print("Orcamento: ");
            double orcamento = sc.nextDouble();
            sc.nextLine();

            lista_projetos.add(new Projeto(nome, prazo, orcamento));
        }

        // exibir devs disponíveis para o usuário consultar
        System.out.println("\n--- Desenvolvedores cadastrados ---");
        for (int i = 0; i < lista_devs.size(); i++) {
            System.out.println("[" + i + "] " + lista_devs.get(i).getNome());
        }

        // associar desenvolvedores a projetos
        Iterator<Projeto> itAssoc = lista_projetos.iterator();
        while (itAssoc.hasNext()) {
            Projeto p = itAssoc.next();
            System.out.println("\nQuantos desenvolvedores deseja associar ao projeto \"" + p.getNome() + "\"? ");
            int qtd = sc.nextInt();
            sc.nextLine();

            for (int i = 0; i < qtd; i++) {
                System.out.print("Digite o numero do desenvolvedor: ");
                int indice = sc.nextInt();
                sc.nextLine();

                if (indice >= 0 && indice < lista_devs.size()) {
                    p.addDesenvolvedor(lista_devs.get(indice));
                    System.out.println(lista_devs.get(indice).getNome() + " associado com sucesso!");
                } else {
                    System.out.println("Numero invalido, desenvolvedor ignorado.");
                    i--; // pede de novo
                }
            }
        }

        // exibir projetos e seus desenvolvedores
        System.out.println("\n=== PROJETOS E SEUS DESENVOLVEDORES ===");
        Iterator<Projeto> itProjetos = lista_projetos.iterator();
        while (itProjetos.hasNext()) {
            Projeto p = itProjetos.next();
            System.out.println(p);
            Iterator<Desenvolvedor> itDevs = p.getDesenvolvedores().iterator();
            while (itDevs.hasNext()) {
                System.out.println("  -> " + itDevs.next());
            }
        }

        // exibir desenvolvedores e seus projetos
        System.out.println("\n=== DESENVOLVEDORES E SEUS PROJETOS ===");
        Iterator<Desenvolvedor> itDevs = lista_devs.iterator();
        while (itDevs.hasNext()) {
            Desenvolvedor d = itDevs.next();
            System.out.println(d);
            Iterator<Projeto> itProj = d.getProjetos().iterator();
            while (itProj.hasNext()) {
                System.out.println("  -> " + itProj.next());
            }
        }

        sc.close();
    }
}