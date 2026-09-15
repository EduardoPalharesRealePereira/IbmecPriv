"""
Gera um PDF (Quick Look do macOS abre com a barra de espaço) com três páginas:
    1. a tabela de classificação
    2. a dispersão gols marcados x gols sofridos
    3. a dispersão saldo de gols x pontos, com os escudos dos times
"""

import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.patches import Rectangle
import pandas as pd

from plot_gols import (
    CSV,
    SUPERFICIE,
    TINTA,
    TINTA_2,
    TINTA_3,
    desenhar_dispersao,
)
from plot_pontos_saldo import desenhar_pontos_saldo

SAIDA = "brasileirao_gols.pdf"
A4 = (8.27, 11.69)
A4_DEITADO = (11.69, 8.27)
ZEBRA = "#f2f1ec"

# (coluna do csv, rótulo, x em fração do eixo, alinhamento)
COLUNAS = [
    ("Posição", "#", 0.045, "right"),
    ("Time", "Time", 0.075, "left"),
    ("P", "P", 0.500, "right"),
    ("J", "J", 0.565, "right"),
    ("V", "V", 0.630, "right"),
    ("E", "E", 0.690, "right"),
    ("D", "D", 0.750, "right"),
    ("GP", "GP", 0.835, "right"),
    ("GC", "GC", 0.910, "right"),
    ("SG", "SG", 0.985, "right"),
]
DESTAQUE = {"GP", "GC"}


def pagina_tabela(fig, df: pd.DataFrame) -> None:
    ax = fig.add_axes([0.07, 0.05, 0.86, 0.86])
    ax.set_axis_off()
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)

    fig.text(
        0.07, 0.955,
        "Brasileirão Série A — classificação",
        fontsize=17, color=TINTA, va="bottom",
    )
    fig.text(
        0.07, 0.935,
        "GP = gols marcados · GC = gols sofridos · SG = saldo de gols",
        fontsize=9.5, color=TINTA_2, va="bottom",
    )

    n = len(df)
    topo, alt = 0.965, 0.965 / (n + 1.6)
    y_cabecalho = topo

    # faixa das colunas em destaque (GP e GC), do cabeçalho até a última linha
    base = topo - alt * (n + 0.75)
    ax.add_patch(Rectangle(
        (0.795, base), 0.12, (topo + alt * 0.75) - base,
        facecolor="#eef4fc", edgecolor="none", zorder=0,
    ))

    for _, rotulo, x, ha in COLUNAS:
        ax.text(
            x, y_cabecalho, rotulo,
            ha=ha, va="center", fontsize=9,
            color=TINTA_2 if rotulo not in DESTAQUE else TINTA,
            fontweight="bold", zorder=3,
        )
    ax.plot([0, 1], [topo - alt * 0.55] * 2, color=TINTA_3, lw=0.8, zorder=2)

    for i, (_, t) in enumerate(df.iterrows()):
        y = topo - alt * (i + 1.25)
        if i % 2 == 1:
            ax.add_patch(Rectangle(
                (0, y - alt / 2), 1, alt,
                facecolor=ZEBRA, edgecolor="none", zorder=1,
            ))
        for col, rotulo, x, ha in COLUNAS:
            valor = t[col]
            if col == "SG":
                valor = f"+{valor}" if valor > 0 else str(valor)
            ax.text(
                x, y, str(valor),
                ha=ha, va="center", fontsize=9.5,
                color=TINTA if rotulo in DESTAQUE or col == "Time" else TINTA_2,
                zorder=3,
            )


def pagina_grafico(fig, df: pd.DataFrame) -> None:
    # eixos quadrados (a dispersão usa escalas iguais em x e y) centrados na página
    lado = 6.5
    largura, altura = lado / A4[0], lado / A4[1]
    ax = fig.add_axes([(1 - largura) / 2, 0.22, largura, altura])
    desenhar_dispersao(ax, df)


def pagina_escudos(fig, df: pd.DataFrame) -> None:
    ax = fig.add_axes([0.07, 0.11, 0.89, 0.76])
    desenhar_pontos_saldo(ax, df)


# a página dos escudos sai deitada: o gráfico é bem mais largo que alto e assim
# os escudos ficam grandes o bastante para serem reconhecidos
PAGINAS = [
    (pagina_tabela, A4),
    (pagina_grafico, A4),
    (pagina_escudos, A4_DEITADO),
]


def main() -> None:
    df = pd.read_csv(CSV, encoding="utf-8-sig")

    with PdfPages(SAIDA) as pdf:
        for desenhar, tamanho in PAGINAS:
            fig = plt.figure(figsize=tamanho, facecolor=SUPERFICIE)
            desenhar(fig, df)
            pdf.savefig(fig, facecolor=SUPERFICIE)
            plt.close(fig)

    print(f"relatório salvo em {SAIDA}")


if __name__ == "__main__":
    main()
