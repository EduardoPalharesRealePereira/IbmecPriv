"""Extração das turmas (disciplinas) do portal do estudante Ibmec."""

import json

import pandas as pd
import requests

URL = "https://apis.estudante.ibmec.br/rest/turmas/status"

TOKEN = "COLE_AQUI_O_BEARER"  # token do header (Authorization), expira em ~24h

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": f"Bearer {TOKEN}",
    "origin": "https://estudante.ibmec.br",
    "referer": "https://estudante.ibmec.br/",
    "user-agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36"
    ),
}

resposta = requests.get(URL, params={"status": "ATUAL"}, headers=headers)
resposta.raise_for_status()
turmas = resposta.json()

with open("turmas-atual.json", "w", encoding="utf-8") as f:
    json.dump(turmas, f, ensure_ascii=False, indent=2)


def formata_horarios(horarios):
    """'Qua 12:50-14:40' juntando aulas seguidas do mesmo dia."""
    por_dia = {}
    for h in horarios or []:
        dia = h["diaSemana"]
        ini, fim = h["horaInicio"][:5], h["horaFim"][:5]
        if dia in por_dia:
            por_dia[dia] = (min(por_dia[dia][0], ini), max(por_dia[dia][1], fim))
        else:
            por_dia[dia] = (ini, fim)
    return "; ".join(f"{d} {i}-{f}" for d, (i, f) in por_dia.items())


linhas = []
for t in turmas:
    local = t.get("local") or {}
    professores = sorted({e["nome"] for e in t.get("educadores") or []})
    linhas.append(
        {
            "codigo_disciplina": t["codigoDisciplina"],
            "disciplina": t["nome"],
            "periodo": t["periodoAcademico"],
            "professor_responsavel": (t.get("educadorResponsavel") or {}).get("nome"),
            "professores": ", ".join(professores),
            "horarios": formata_horarios(t.get("horarios")),
            "bloco": ", ".join(sorted(set(local.get("blocos") or []))),
            "sala": ", ".join(sorted(set(local.get("salas") or []))),
            "campus": t["campus"],
            "formato": t["formato"],
            "tipo_curso": t["tipoCurso"],
            "alunos_matriculados": t["totalAlunosMatriculados"],
            "turma_id": t["id"],
        }
    )

df = pd.DataFrame(linhas).sort_values("disciplina").reset_index(drop=True)

# uma linha por aula (dia/horário) — útil para montar a grade da semana
df_horarios = (
    pd.DataFrame(turmas)[["codigoDisciplina", "nome", "horarios"]]
    .explode("horarios")
    .dropna(subset=["horarios"])
)
df_horarios = pd.concat(
    [
        df_horarios.drop(columns="horarios").reset_index(drop=True),
        pd.json_normalize(df_horarios["horarios"]).reset_index(drop=True),
    ],
    axis=1,
).rename(columns={"codigoDisciplina": "codigo_disciplina", "nome": "disciplina"})

df.to_csv("turmas-ibmec.csv", index=False, encoding="utf-8")
df_horarios.to_csv("turmas-ibmec-horarios.csv", index=False, encoding="utf-8")

print(f"{len(df)} disciplinas extraídas\n")
print(df.to_string(index=False))
