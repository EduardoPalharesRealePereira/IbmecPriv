package Ac15;

import java.util.ArrayList;
import java.util.Iterator;

public class Desenvolvedor {

    private String nome;
    private String especialidade;
    private double salario;
    private ArrayList<Projeto> projetos;

    public Desenvolvedor(String nome, String especialidade, double salario) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.salario = salario;
        this.projetos = new ArrayList<Projeto>();
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }

    public double getSalario() { return salario; }
    public void setSalario(double salario) { this.salario = salario; }

    public ArrayList<Projeto> getProjetos() { return projetos; }

    public void addProjeto(Projeto p) {
        this.projetos.add(p);
    }

    @Override
    public String toString() {
        String nomeProjetos = "";
        Iterator<Projeto> it = projetos.iterator();
        while (it.hasNext()) {
            nomeProjetos += it.next().getNome() + " ";
        }
        return "Desenvolvedor [nome=" + nome + ", especialidade=" + especialidade +
               ", salario=" + salario + ", projetos=" + nomeProjetos + "]";
    }
}