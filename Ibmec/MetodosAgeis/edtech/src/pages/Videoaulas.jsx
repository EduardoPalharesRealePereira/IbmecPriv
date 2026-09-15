import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { BANCAS, MATERIAS, bancaById, materiaById } from '../data/catalogo'
import {
  NIVEIS,
  TODAS_AULAS,
  TRILHAS,
  duracaoTrilha,
  filtrarTrilhas,
  nivelNome,
  professorDa,
  trilhaById,
} from '../data/videoaulas'

const fmtDuracao = (min) => (min >= 60 ? `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}` : `${min} min`)

export default function Videoaulas() {
  const { usuario, aulas } = useApp()
  const perfil = usuario.perfil

  const [materias, setMaterias] = useState([])
  const [banca, setBanca] = useState('todas')
  const [nivel, setNivel] = useState('todos')
  const [busca, setBusca] = useState('')

  const progressoDaTrilha = (t) => {
    const feitas = t.aulas.filter((a) => aulas[a.id]?.concluida).length
    return { feitas, total: t.aulas.length, pct: Math.round((feitas / t.aulas.length) * 100) }
  }

  /** Trilha é recomendada quando bate com a banca ou com a matéria de reforço. */
  const ehRecomendada = (t) =>
    perfil.prioridades.includes(t.materia) || t.bancas.some((b) => perfil.bancas.includes(b))

  const resultado = useMemo(() => {
    const lista = filtrarTrilhas({ materias, banca, nivel, busca })
    return [...lista].sort((a, b) => Number(ehRecomendada(b)) - Number(ehRecomendada(a)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materias, banca, nivel, busca, perfil])

  // Última aula tocada que ainda não terminou — vira o card "continuar assistindo".
  const emAndamento = useMemo(() => {
    const candidatas = TODAS_AULAS.filter((a) => {
      const st = aulas[a.id]
      return st && !st.concluida && st.progresso > 0.02
    })
    // A mais recente primeiro — é a que o aluno realmente deixou pela metade.
    return (
      candidatas.sort((a, b) => (aulas[b.id].em || '').localeCompare(aulas[a.id].em || ''))[0] ||
      null
    )
  }, [aulas])

  const concluidas = TODAS_AULAS.filter((a) => aulas[a.id]?.concluida).length
  const minutosVistos = TODAS_AULAS.filter((a) => aulas[a.id]?.concluida).reduce((s, a) => s + a.min, 0)
  const filtrando = materias.length > 0 || banca !== 'todas' || nivel !== 'todos' || busca !== ''

  const alternarMateria = (id) =>
    setMaterias((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]))

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Videoaulas</span>
        <h1>Aprenda a teoria antes de treinar</h1>
        <p>
          Trilhas em formato de curso, com professores de IA explicando cada matéria em aulas
          curtas. Assista uma e a plataforma já engata a próxima da sequência.
        </p>
      </div>

      <div className="grid g-4">
        <div className="stat">
          <div className="k">Trilhas disponíveis</div>
          <div className="v">{TRILHAS.length}</div>
        </div>
        <div className="stat">
          <div className="k">Aulas no acervo</div>
          <div className="v">{TODAS_AULAS.length}</div>
        </div>
        <div className="stat">
          <div className="k">Aulas concluídas</div>
          <div className="v">{concluidas}</div>
        </div>
        <div className="stat">
          <div className="k">Tempo assistido</div>
          <div className="v">
            {minutosVistos === 0 ? <small>ainda nada</small> : fmtDuracao(minutosVistos)}
          </div>
        </div>
      </div>

      {/* ─────────────────────── continuar de onde parou ─────────────────────── */}
      {emAndamento && (
        <ContinuarAssistindo aula={emAndamento} progresso={aulas[emAndamento.id].progresso} />
      )}

      {/* ─────────────────────────────── filtros ─────────────────────────────── */}
      <section style={{ marginTop: 28 }}>
        <div className="sec-head">
          <div>
            <h2>Filtrar acervo</h2>
            <p className="small muted">
              Combine matéria, faculdade e nível para achar a trilha certa para a sua prova.
            </p>
          </div>
          {filtrando && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setMaterias([])
                setBanca('todas')
                setNivel('todos')
                setBusca('')
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="filtros">
          <div className="filtro-linha">
            <span className="filtro-lab">Matéria</span>
            <div className="chips">
              <button
                className="chip"
                aria-pressed={materias.length === 0}
                onClick={() => setMaterias([])}
              >
                Todas
              </button>
              {MATERIAS.map((m) => (
                <button
                  key={m.id}
                  className="chip"
                  aria-pressed={materias.includes(m.id)}
                  onClick={() => alternarMateria(m.id)}
                >
                  <span>{m.icone}</span> {m.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="filtro-linha filtro-selects">
            <div className="field">
              <label htmlFor="f-banca">Faculdade / banca</label>
              <select
                id="f-banca"
                className="select"
                value={banca}
                onChange={(e) => setBanca(e.target.value)}
              >
                <option value="todas">Todas as faculdades</option>
                {BANCAS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="f-nivel">Nível</label>
              <select
                id="f-nivel"
                className="select"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
              >
                {NIVEIS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="f-busca">Buscar</label>
              <input
                id="f-busca"
                className="input"
                placeholder="Ex.: função quadrática, redação, mol…"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── resultado ─────────────────────────────── */}
      <section style={{ marginTop: 26 }}>
        <div className="sec-head">
          <div>
            <h2>
              {resultado.length} trilha{resultado.length === 1 ? '' : 's'}
              {banca !== 'todas' && ` para ${bancaById(banca)?.nome}`}
            </h2>
            <p className="small muted">
              As trilhas ligadas às suas bancas e matérias de reforço aparecem primeiro.
            </p>
          </div>
        </div>

        {resultado.length === 0 ? (
          <div className="empty">
            <div className="ico">▷</div>
            <h3>Nenhuma trilha com esses filtros</h3>
            <p>
              Tente remover a faculdade ou o nível — o acervo cresce toda semana com novas aulas
              geradas para as bancas da sua instituição.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setMaterias([])
                setBanca('todas')
                setNivel('todos')
                setBusca('')
              }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid g-3">
            {resultado.map((t) => (
              <CardTrilha
                key={t.id}
                trilha={t}
                progresso={progressoDaTrilha(t)}
                recomendada={ehRecomendada(t)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

/* ───────────────────────── continuar assistindo ───────────────────────── */

function ContinuarAssistindo({ aula, progresso }) {
  const trilha = trilhaById(aula.trilhaId)
  const prof = professorDa(trilha)
  const pct = Math.round(progresso * 100)

  return (
    <section className="retomar" style={{ '--acento': prof.cor }}>
      <div className="retomar-thumb">
        <span>{prof.avatar}</span>
        <i className="play">▶</i>
      </div>
      <div className="col" style={{ flex: 1, minWidth: 0 }}>
        <span className="eyebrow">Continuar assistindo</span>
        <b style={{ fontSize: 17 }}>{aula.titulo}</b>
        <span className="small muted">
          {trilha.titulo} · aula {aula.ordem + 1} de {trilha.aulas.length}
        </span>
        <span className="progress progress-thin" style={{ marginTop: 10 }}>
          <i style={{ width: `${pct}%` }} />
        </span>
      </div>
      <Link className="btn btn-primary" to={`/videoaulas/${trilha.id}/${aula.id}`}>
        Retomar em {pct}%
      </Link>
    </section>
  )
}

/* ──────────────────────────── card de trilha ──────────────────────────── */

function CardTrilha({ trilha, progresso, recomendada }) {
  const materia = materiaById(trilha.materia)
  const prof = professorDa(trilha)
  const minutos = duracaoTrilha(trilha)

  return (
    <Link to={`/videoaulas/${trilha.id}`} className="trilha-card" style={{ '--acento': prof.cor }}>
      <div className="trilha-capa">
        <span className="capa-ico">{materia?.icone}</span>
        <span className="capa-play">▶</span>
        {recomendada && <span className="capa-tag">Recomendada</span>}
        {progresso.pct === 100 && <span className="capa-tag capa-tag-ok">Concluída</span>}
      </div>

      <div className="trilha-corpo">
        <div className="row wrap" style={{ gap: 6 }}>
          <span className="tag">{materia?.nome}</span>
          <span className="tag tag-ink">{nivelNome(trilha.nivel)}</span>
        </div>

        <b className="trilha-titulo">{trilha.titulo}</b>
        <p className="small muted trilha-resumo">{trilha.resumo}</p>

        <div className="trilha-prof">
          <span className="prof-avatar mini">{prof.avatar}</span>
          <span className="tiny muted">
            {prof.nome} · {prof.cadeira}
          </span>
        </div>

        <div className="trilha-meta">
          <span className="tiny muted num">
            {trilha.aulas.length} aulas · {fmtDuracao(minutos)}
          </span>
          <span className="tiny muted num">
            {progresso.feitas}/{progresso.total}
          </span>
        </div>
        <span className={`progress progress-thin ${progresso.pct === 100 ? 'done' : ''}`}>
          <i style={{ width: `${progresso.pct}%` }} />
        </span>
      </div>
    </Link>
  )
}
