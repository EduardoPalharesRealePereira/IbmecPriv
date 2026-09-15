"""
Extração da tabela de classificação do Brasileirão Série A (ge.globo.com)
com pandas.read_html.

Observação importante: o HTML devolvido pelo servidor do ge NÃO contém
nenhuma tag <table> — o widget de classificação é montado no navegador por
JavaScript. Por isso `pd.read_html(URL)` levanta "No tables found matching
regex '.+'". A saída é renderizar a página em um navegador headless
(Playwright) e passar o HTML já renderizado para o read_html.

Dependências:
    pip install pandas lxml playwright
    playwright install chromium
"""

from io import StringIO

import pandas as pd
from playwright.sync_api import sync_playwright

URL = "https://ge.globo.com/futebol/brasileirao-serie-a/#/classificacao"


def html_renderizado(url: str = URL) -> str:
    """Abre a página em um navegador headless e devolve o HTML já renderizado."""
    with sync_playwright() as p:
        navegador = p.chromium.launch(headless=True)
        pagina = navegador.new_page()
        pagina.goto(url, wait_until="domcontentloaded", timeout=60_000)
        pagina.wait_for_selector("table.tabela__pontos tbody tr", timeout=60_000)
        html = pagina.content()
        navegador.close()
    return html


def extrair_classificacao(url: str = URL) -> pd.DataFrame:
    """Devolve a classificação como DataFrame."""
    html = html_renderizado(url)

    # o widget usa DUAS tabelas lado a lado:
    #   [0] posição / time / variação      [1] P, J, V, E, D, GP, GC, SG, %
    tabelas = pd.read_html(StringIO(html), flavor="lxml")
    equipes, pontos = tabelas[0], tabelas[1]

    equipes.columns = ["Posição", "Time", "Variação"]
    df = pd.concat([equipes, pontos], axis=1)

    # o texto da célula vem como "PalmeirasPAL" -> separa nome e sigla
    nome_sigla = df["Time"].astype(str).str.extract(r"^(.*?)([A-Z]{3})$")
    df["Time"] = nome_sigla[0].str.strip()
    df.insert(2, "Sigla", nome_sigla[1])

    df = df.drop(columns=["ÚLT. JOGOS"], errors="ignore")
    return df


if __name__ == "__main__":
    tabela = extrair_classificacao()
    print(tabela.to_string(index=False))
    tabela.to_csv("classificacao_brasileirao.csv", index=False, encoding="utf-8-sig")
    print(f"\n{len(tabela)} times salvos em classificacao_brasileirao.csv")
