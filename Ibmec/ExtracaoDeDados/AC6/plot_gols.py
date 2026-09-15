"""
Dispersão do Brasileirão: gols marcados (GP) x gols sofridos (GC).

Lê o CSV gerado por extrair_tabela_brasileirao.py e desenha um gráfico de
dispersão com um time por ponto. A diagonal GP = GC separa quem tem saldo
positivo (abaixo da linha) de quem tem saldo negativo (acima dela).
"""

import matplotlib.pyplot as plt
import pandas as pd

CSV = "classificacao_brasileirao.csv"
SAIDA = "gols_marcados_x_sofridos.png"

# paleta (modo claro)
SUPERFICIE = "#fcfcfb"
TINTA = "#0b0b0b"
TINTA_2 = "#52514e"
TINTA_3 = "#8a8880"
SERIE_1 = "#2a78d6"

# times cujo rótulo fica à esquerda do ponto para não colidir com o vizinho
ROTULO_ESQUERDA = {"FLA", "SAO", "SAN", "REM", "MIR"}


def desenhar_dispersao(ax, df: pd.DataFrame) -> None:
    """Desenha a dispersão GP x GC no eixo recebido."""
    ax.set_facecolor(SUPERFICIE)

    # diagonal de saldo zero
    limites = [
        min(df["GP"].min(), df["GC"].min()) - 4,
        max(df["GP"].max(), df["GC"].max()) + 4,
    ]
    ax.plot(limites, limites, color=TINTA_3, lw=1, ls="--", zorder=1)
    ax.annotate(
        "saldo de gols = 0",
        xy=(limites[1] - 2, limites[1] - 2),
        xytext=(-6, 6),
        textcoords="offset points",
        ha="right",
        va="bottom",
        rotation=45,
        rotation_mode="anchor",
        fontsize=8.5,
        color=TINTA_3,
    )

    ax.scatter(
        df["GP"],
        df["GC"],
        s=95,
        color=SERIE_1,
        edgecolor=SUPERFICIE,
        linewidth=1.5,
        zorder=3,
    )

    for _, t in df.iterrows():
        esquerda = t["Sigla"] in ROTULO_ESQUERDA
        ax.annotate(
            t["Sigla"],
            xy=(t["GP"], t["GC"]),
            xytext=(-9 if esquerda else 9, 0),
            textcoords="offset points",
            ha="right" if esquerda else "left",
            va="center",
            fontsize=8.5,
            color=TINTA_2,
            zorder=4,
        )

    ax.set_xlim(limites)
    ax.set_ylim(limites)
    ax.set_aspect("equal")

    ax.set_xlabel("Gols marcados (GP)", fontsize=10.5, color=TINTA_2, labelpad=10)
    ax.set_ylabel("Gols sofridos (GC)", fontsize=10.5, color=TINTA_2, labelpad=10)
    ax.set_title(
        "Ataque x defesa no Brasileirão Série A",
        fontsize=14,
        color=TINTA,
        loc="left",
        pad=18,
    )
    ax.text(
        0, 1.015,
        "cada ponto é um time; abaixo da diagonal, saldo de gols positivo",
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

    fig, ax = plt.subplots(figsize=(9, 7.5), dpi=200)
    fig.patch.set_facecolor(SUPERFICIE)
    desenhar_dispersao(ax, df)

    fig.tight_layout()
    fig.savefig(SAIDA, facecolor=SUPERFICIE, bbox_inches="tight")
    print(f"gráfico salvo em {SAIDA}")


if __name__ == "__main__":
    main()
