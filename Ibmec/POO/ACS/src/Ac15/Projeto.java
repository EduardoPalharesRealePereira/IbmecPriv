package Ac15;

import java.util.ArrayList;
import java.util.Iterator;

public class Projeto {

    private String nome;
    private int prazo;
    private double orcamento;
    private ArrayList<Desenvolvedor> desenvolvedores;

    public Projeto(String nome, int prazo, double orcamento) {
        this.nome = nome;
        this.prazo = prazo;
        this.orcamento = orcamento;
        this.desenvolvedores = new ArrayList<Desenvolvedor>();
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getPrazo() { return prazo; }
    public void setPrazo(int prazo) { this.prazo = prazo; }

    public double getOrcamento() { return orcamento; }
    public void setOrcamento(double orcamento) { this.orcamento = orcamento; }

    public ArrayList<Desenvolvedor> getDesenvolvedores() { return desenvolvedores; }

    public void addDesenvolvedor(Desenvolvedor d) {
        this.desenvolvedores.add(d);
        d.addProjeto(this); 
    }

    @Override
    public String toString() {
        String nomeDevs = "";
        Iterator<Desenvolvedor> it = desenvolvedores.iterator();
        while (it.hasNext()) {
            nomeDevs += it.next().getNome() + " ";
        }
        return "Projeto [nome=" + nome + ", prazo=" + prazo + " meses, orcamento=R$" +
               orcamento + ", desenvolvedores=" + nomeDevs + "]";
    }
}