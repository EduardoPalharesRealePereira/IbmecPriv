"""
Dispersão do Brasileirão: saldo de gols (SG) x pontos (P), usando o escudo de
cada time como marcador (os PNGs vêm de baixar_escudos.py).
"""

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.offsetbox import AnnotationBbox, OffsetImage
from PIL import Image

from baixar_escudos import caminho_png
from plot_gols import CSV, SUPERFICIE, TINTA, TINTA_2, TINTA_3

SAIDA = "pontos_x_saldo_de_gols.png"
LADO_ESCUDO = 128   # o escudo é reamostrado para caber num quadrado deste lado
PT_POR_POL = 3.0    # e desenhado proporcionalmente à largura do eixo


def escudo(sigla: str, alvo_pt: float) -> OffsetImage:
    """Carrega o escudo já dimensionado para servir de marcador."""
    imagem = Image.open(caminho_png(sigla)).convert("RGBA")
    imagem.thumbnail((LADO_ESCUDO, LADO_ESCUDO), Image.LANCZOS)
    return OffsetImage(np.asarray(imagem), zoom=alvo_pt / LADO_ESCUDO)


def desenhar_pontos_saldo(ax, df: pd.DataFrame) -> None:
    """Desenha a dispersão SG x P no eixo recebido."""
    ax.set_facecolor(SUPERFICIE)

    x, y = df["SG"].to_numpy(float), df["P"].to_numpy(float)
    ax.set_xlim(x.min() - 5, x.max() + 5)
    ax.set_ylim(y.min() - 3, y.max() + 3)

    # tendência: quanto de ponto, em média, cada gol de saldo vale
    a, b = np.polyfit(x, y, 1)
    linha = np.array(ax.get_xlim())
    ax.plot(linha, a * linha + b, color=TINTA_3, lw=1, ls="--", zorder=1)
    # no canto livre, para não esbarrar nos escudos do topo da tabela
    ax.text(
        0.985, 0.03,
        f"linha de tendência: +1 de saldo ≈ +{a:.2f} ponto",
        transform=ax.transAxes,
        ha="right",
        va="bottom",
        fontsize=8.5,
        color=TINTA_3,
    )

    # saldo zero
    ax.axvline(0, color="#c4c3ba", lw=1, zorder=0)
    ax.annotate(
        "saldo zero",
        xy=(0, ax.get_ylim()[1]),
        xytext=(5, -6),
        textcoords="offset points",
        ha="left",
        va="top",
        fontsize=8.5,
        color=TINTA_3,
    )

    # o escudo acompanha o tamanho do eixo — o mesmo desenho serve para o PNG
    # solto e para a página menor do relatório
    largura_pol = ax.get_position().width * ax.get_figure().get_figwidth()
    alvo_pt = PT_POR_POL * largura_pol

    # quem está mais alto na tabela fica por cima quando dois escudos se tocam
    for _, t in df.sort_values("P").iterrows():
        ax.add_artist(AnnotationBbox(
            escudo(t["Sigla"], alvo_pt),
            (t["SG"], t["P"]),
            frameon=False,
            pad=0,
            zorder=3 + t["P"] / 100,
        ))

    ax.set_xlabel("Saldo de gols (SG)", fontsize=10.5, color=TINTA_2, labelpad=10)
    ax.set_ylabel("Pontos (P)", fontsize=10.5, color=TINTA_2, labelpad=10)
    ax.set_title(
        "Pontos x saldo de gols no Brasileirão Série A",
        fontsize=14,
        color=TINTA,
        loc="left",
        pad=18,
    )
    ax.text(
        0, 1.015,
        "cada escudo é um time; acima da tendência, o time soma mais pontos "
        "do que o saldo sugere",
        transform=ax.transAxes,
        fontsize=9.5,
        color=TINTA_2,
        va="bottom",
    )

    ax.grid(True, color="#e6e5e0", lw=0.8, zorder=0)
    ax.set_axisbelow(True)
    for lado in ("top", "right"):
        ax.spines[lado].set_visible(False)
    for lado in ("left", "bottom"):
        ax.spines[lado].set_color(TINTA_3)
        ax.spines[lado].set_linewidth(0.8)
    ax.tick_params(colors=TINTA_2, labelsize=9, length=0)


def main() -> None:
    df = pd.read_csv(CSV, encoding="utf-8-sig")

    fig, ax = plt.subplots(figsize=(10, 8), dpi=200)
    fig.patch.set_facecolor(SUPERFICIE)
    desenhar_pontos_saldo(ax, df)

    fig.tight_layout()
    fig.savefig(SAIDA, facecolor=SUPERFICIE, bbox_inches="tight")
    print(f"gráfico salvo em {SAIDA}")


if __name__ == "__main__":
    main()
