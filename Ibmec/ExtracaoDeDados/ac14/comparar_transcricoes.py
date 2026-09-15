"""Compara as transcrições coladomedium.txt e coladotiny.txt palavra por palavra,
gera comparacao.html com os textos lado a lado e as palavras diferentes grifadas,
e escreve no final a quantidade de palavras diferentes."""

import difflib
import html
from pathlib import Path

PASTA = Path(__file__).parent

medium = (PASTA / "coladomedium.txt").read_text(encoding="utf-8").split()
tiny = (PASTA / "coladotiny.txt").read_text(encoding="utf-8").split()

sm = difflib.SequenceMatcher(a=medium, b=tiny, autojunk=False)

partes_medium = []
partes_tiny = []
dif_medium = 0
dif_tiny = 0

for op, i1, i2, j1, j2 in sm.get_opcodes():
    trecho_m = " ".join(html.escape(w) for w in medium[i1:i2])
    trecho_t = " ".join(html.escape(w) for w in tiny[j1:j2])
    if op == "equal":
        partes_medium.append(trecho_m)
        partes_tiny.append(trecho_t)
    else:
        if trecho_m:
            partes_medium.append(f"<mark>{trecho_m}</mark>")
            dif_medium += i2 - i1
        if trecho_t:
            partes_tiny.append(f"<mark>{trecho_t}</mark>")
            dif_tiny += j2 - j1

total = dif_medium + dif_tiny
pct = 100 * total / (len(medium) + len(tiny))

pagina = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Comparação Medium × Tiny</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">
<style>
  :root {{
    --bg: #faf8f4;
    --surface: #ffffff;
    --ink: #26221c;
    --muted: #6f675c;
    --line: #e4ded3;
    --accent: #8a4b12;
    --mark-bg: #ffe08a;
    --mark-ink: #3d2c00;
  }}
  @media (prefers-color-scheme: dark) {{
    :root:not([data-theme="light"]) {{
      --bg: #171411;
      --surface: #201c17;
      --ink: #ece6db;
      --muted: #a49a8b;
      --line: #38322a;
      --accent: #e0a458;
      --mark-bg: #5c4708;
      --mark-ink: #ffe9b0;
    }}
  }}
  :root[data-theme="dark"] {{
    --bg: #171411;
    --surface: #201c17;
    --ink: #ece6db;
    --muted: #a49a8b;
    --line: #38322a;
    --accent: #e0a458;
    --mark-bg: #5c4708;
    --mark-ink: #ffe9b0;
  }}
  body {{
    background: var(--bg);
    color: var(--ink);
    font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
    font-size: 16px;
    margin: 0;
    padding-block: 32px 48px;
    padding-inline: 20px;
  }}
  .wrap {{ max-width: 1200px; margin: 0 auto; }}
  header h1 {{
    font-family: Archivo, "Helvetica Neue", Arial, sans-serif;
    font-weight: 800;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    letter-spacing: -0.01em;
    text-wrap: balance;
    margin: 0 0 8px;
  }}
  header p {{ color: var(--muted); margin: 0 0 28px; max-width: 60ch; line-height: 1.5; }}
  .colunas {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
  @media (max-width: 800px) {{ .colunas {{ grid-template-columns: 1fr; }} }}
  .coluna {{
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 20px 22px;
    line-height: 1.75;
  }}
  .coluna h2 {{
    font-family: Archivo, "Helvetica Neue", Arial, sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--accent);
    border-bottom: 1px solid var(--line);
    margin: 0 0 4px;
    padding-bottom: 10px;
  }}
  .coluna .contagem {{
    font-family: Archivo, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.8rem;
    color: var(--muted);
    margin: 0 0 14px;
    font-variant-numeric: tabular-nums;
  }}
  .coluna p.texto {{ margin: 0; text-align: justify; hyphens: auto; }}
  mark {{
    background: var(--mark-bg);
    color: var(--mark-ink);
    border-radius: 3px;
    padding: 0 2px;
  }}
  .resumo {{
    margin-top: 24px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-left: 4px solid var(--accent);
    border-radius: 8px;
    padding: 20px 22px;
  }}
  .resumo h2 {{
    font-family: Archivo, "Helvetica Neue", Arial, sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--accent);
    margin: 0 0 12px;
  }}
  .resumo dl {{
    display: flex; flex-wrap: wrap; gap: 12px 40px;
    margin: 0; font-variant-numeric: tabular-nums;
  }}
  .resumo dt {{ font-size: 0.85rem; color: var(--muted); }}
  .resumo dd {{
    margin: 2px 0 0;
    font-family: Archivo, "Helvetica Neue", Arial, sans-serif;
    font-weight: 800; font-size: 1.7rem;
  }}
  .resumo p {{ margin: 14px 0 0; color: var(--muted); line-height: 1.5; }}
</style>
</head>
<body>
<div class="wrap">
<header>
  <h1>Comparação Medium × Tiny</h1>
  <p>Transcrições da mesma entrevista geradas pelos modelos <b>medium</b> e <b>tiny</b> do Whisper,
  alinhadas palavra por palavra. As palavras <mark>grifadas</mark> são as que divergem entre os dois textos.</p>
</header>
<div class="colunas">
  <section class="coluna">
    <h2>coladomedium.txt</h2>
    <p class="contagem">{len(medium)} palavras · {dif_medium} grifadas</p>
    <p class="texto">{" ".join(partes_medium)}</p>
  </section>
  <section class="coluna">
    <h2>coladotiny.txt</h2>
    <p class="contagem">{len(tiny)} palavras · {dif_tiny} grifadas</p>
    <p class="texto">{" ".join(partes_tiny)}</p>
  </section>
</div>
<section class="resumo">
  <h2>Quantidade de palavras diferentes</h2>
  <dl>
    <div><dt>No medium</dt><dd>{dif_medium}</dd></div>
    <div><dt>No tiny</dt><dd>{dif_tiny}</dd></div>
    <div><dt>Total</dt><dd>{total}</dd></div>
  </dl>
  <p>Cerca de {pct:.0f}% das palavras dos dois textos divergem entre as transcrições —
  o modelo tiny comete muito mais erros de reconhecimento que o medium.</p>
</section>
</div>
</body>
</html>
"""

(PASTA / "comparacao.html").write_text(pagina, encoding="utf-8")
print(f"Palavras no medium: {len(medium)}")
print(f"Palavras no tiny: {len(tiny)}")
print(f"Diferentes no medium: {dif_medium}")
print(f"Diferentes no tiny: {dif_tiny}")
print(f"Total de palavras diferentes: {total}")
print("Arquivo gerado: comparacao.html")
