"""
Baixa os escudos dos times do Brasileirão (assets públicos do ge/SDE) e
rasteriza os SVGs em PNG usando o Chromium do Playwright — assim o gráfico
pode usar o escudo como marcador.

Os arquivos ficam em escudos/<SIGLA>.png e são reaproveitados nas execuções
seguintes (só baixa o que ainda não existe).
"""

import re
import urllib.request
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

PASTA = Path("escudos")
BASE = "https://s.sde.globo.com/media/organizations/"
LADO = 512  # resolução do PNG rasterizado

# sigla -> caminho do escudo em vetor no SDE (colhido da página do ge)
ESCUDOS = {
    "PAL": "2019/07/06/Palmeiras.svg",
    "FLA": "2018/04/10/Flamengo-2018.svg",
    "CAP": "2026/01/07/Athletico-PR.svg",
    "FLU": "2018/03/11/fluminense.svg",
    "CRU": "2021/02/13/cruzeiro_2021.svg",
    "BAH": "2018/03/11/bahia.svg",
    "RBB": "2021/06/28/bragantino.svg",
    "CFC": "2018/03/11/coritiba.svg",
    "CAM": "2018/03/10/atletico-mg.svg",
    "COR": "2024/10/09/Corinthians_2024_Q4ahot4.svg",
    "BOT": "2019/02/04/botafogo-svg.svg",
    "VIT": "2025/12/18/Vitoria_2025.svg",
    "SAO": "2018/03/11/sao-paulo.svg",
    "SAN": "2018/03/12/santos.svg",
    "GRE": "2018/03/12/gremio.svg",
    "INT": "2018/03/11/internacional.svg",
    "MIR": "2026/07/17/MIrassol.svg",
    "REM": "2021/02/25/Remo-PA.svg",
    "VAS": "2021/09/04/vasco_SVG.svg",
    "CHA": "2021/06/21/CHAPECOENSE-2018.svg",
}

PAGINA = """<style>html,body{{margin:0;height:100%;background:transparent}}
svg{{display:block;width:100vw;height:100vh}}</style>
{svg}"""


def svg_ajustado(arquivo: Path) -> str:
    """
    Devolve o SVG pronto para ser embutido numa página.

    Alguns escudos do SDE declaram width/height maiores que a viewport (o de
    1200px do Internacional, por exemplo) e sairiam cortados. Removendo esses
    atributos, sobra o viewBox — e o navegador encaixa o desenho na viewport.
    """
    texto = arquivo.read_text(encoding="utf-8", errors="ignore")
    texto = re.sub(r"<\?xml[^>]*\?>|<!DOCTYPE[^>]*>", "", texto, flags=re.I)
    abertura = re.search(r"<svg\b[^>]*>", texto, flags=re.I)
    raiz = re.sub(r'\s(?:width|height)="[^"]*"', "", abertura.group(0), flags=re.I)
    return texto[: abertura.start()] + raiz + texto[abertura.end() :]


def recortar_transparencia(png: Path) -> None:
    """Remove a moldura transparente deixada pelo object-fit."""
    imagem = Image.open(png).convert("RGBA")
    caixa = imagem.getbbox()
    if caixa:
        imagem.crop(caixa).save(png)


def caminho_png(sigla: str) -> Path:
    return PASTA / f"{sigla}.png"


def baixar_svgs() -> dict[str, Path]:
    """Baixa os SVGs que ainda não estão em cache e devolve sigla -> arquivo."""
    PASTA.mkdir(exist_ok=True)
    svgs = {}
    for sigla, caminho in ESCUDOS.items():
        destino = PASTA / f"{sigla}.svg"
        if not destino.exists():
            urllib.request.urlretrieve(BASE + caminho, destino)
            print(f"  baixado {sigla}")
        svgs[sigla] = destino
    return svgs


def rasterizar(svgs: dict[str, Path]) -> None:
    """Converte os SVGs em PNG com fundo transparente via Chromium headless."""
    pendentes = {s: v for s, v in svgs.items() if not caminho_png(s).exists()}
    if not pendentes:
        return

    with sync_playwright() as p:
        navegador = p.chromium.launch(headless=True)
        pagina = navegador.new_page(viewport={"width": LADO, "height": LADO})
        for sigla, svg in pendentes.items():
            pagina.set_content(
                PAGINA.format(svg=svg_ajustado(svg)), wait_until="load"
            )
            destino = caminho_png(sigla)
            pagina.locator("svg").screenshot(path=destino, omit_background=True)
            recortar_transparencia(destino)
            print(f"  rasterizado {sigla}")
        navegador.close()


def main() -> None:
    print("escudos:")
    rasterizar(baixar_svgs())
    print(f"{len(ESCUDOS)} escudos disponíveis em {PASTA}/")


if __name__ == "__main__":
    main()
