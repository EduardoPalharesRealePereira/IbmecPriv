import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { bancaById, materiaById } from '../data/catalogo'
import AulaPlayer from '../components/AulaPlayer'
import { TRILHAS, duracaoTrilha, nivelNome, professorDa, trilhaById } from '../data/videoaulas'

const SEGUNDOS_AUTOPLAY = 5

export default function Trilha() {
  const { trilhaId, aulaId } = useParams()
  const navigate = useNavigate()
  const { aulas, registrarAula, concluirAula, reiniciarTrilha } = useApp()

  const trilha = trilhaById(trilhaId)
  const [autoplay, setAutoplay] = useState(true)
  const [contagem, setContagem] = useState(null)

  // Sem aula na URL, retoma a primeira que ainda não foi concluída.
  const aulaAtual = useMemo(() => {
    if (!trilha) return null
    if (aulaId) return trilha.aulas.find((a) => a.id === aulaId) || trilha.aulas[0]
    return trilha.aulas.find((a) => !aulas[a.id]?.concluida) || trilha.aulas[0]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trilha, aulaId])

  const indice = trilha?.aulas.findIndex((a) => a.id === aulaAtual?.id) ?? -1
  const proxima = trilha?.aulas[indice + 1] || null

  // Contagem regressiva para a próxima aula quando o vídeo termina.
  useEffect(() => {
    if (contagem === null) return
    if (contagem <= 0) {
      setContagem(null)
      if (proxima) navigate(`/videoaulas/${trilha.id}/${proxima.id}`)
      return
    }
    const t = setTimeout(() => setContagem((c) => c - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contagem])

  useEffect(() => {
    setContagem(null)
  }, [aulaAtual?.id])

  if (!trilha) return <Navigate to="/videoaulas" replace />

  const prof = professorDa(trilha)
  const materia = materiaById(trilha.materia)
  const feitas = trilha.aulas.filter((a) => aulas[a.id]?.concluida).length
  const pctTrilha = Math.round((feitas / trilha.aulas.length) * 100)
  const estado = aulas[aulaAtual.id] || { progresso: 0, concluida: false }

  function aoTerminar() {
    concluirAula(aulaAtual.id, trilha.materia)
    if (proxima && autoplay) setContagem(SEGUNDOS_AUTOPLAY)
  }

  function irPara(id) {
    navigate(`/videoaulas/${trilha.id}/${id}`)
  }

  return (
    <div className="anim-in">
      <div className="trilha-topo">
        <Link to="/videoaulas" className="btn btn-ghost btn-sm">
          ← Todas as videoaulas
        </Link>
        <span className="row wrap" style={{ gap: 6 }}>
          <span className="tag">
            {materia?.icone} {materia?.nome}
          </span>
          <span className="tag tag-ink">{nivelNome(trilha.nivel)}</span>
        </span>
      </div>

      <div className="page-head" style={{ marginTop: 14 }}>
        <span className="eyebrow">Trilha · {trilha.aulas.length} aulas</span>
        <h1 style={{ fontSize: 28 }}>{trilha.titulo}</h1>
        <p>{trilha.resumo}</p>
      </div>

      <div className="curso">
        {/* ───────────────────────────── player ───────────────────────────── */}
        <div>
          <AulaPlayer
            aula={aulaAtual}
            trilha={trilha}
            progressoSalvo={estado.progresso}
            onProgresso={(p) => registrarAula(aulaAtual.id, p)}
            onFim={aoTerminar}
          />

          {contagem !== null && proxima && (
            <div className="alerta alerta-ok" style={{ marginTop: 14 }}>
              <span>▶</span>
              <span style={{ flex: 1 }}>
                Próxima aula em <b>{contagem}s</b>: {proxima.titulo}
              </span>
              <button className="link-btn" onClick={() => setContagem(null)}>
                Cancelar
              </button>
            </div>
          )}

          <div className="aula-info">
            <div className="row-between wrap" style={{ gap: 12 }}>
              <div className="col" style={{ minWidth: 0 }}>
                <span className="eyebrow">
                  Aula {indice + 1} de {trilha.aulas.length} · {aulaAtual.min} min
                </span>
                <h2 style={{ fontSize: 20, marginTop: 4 }}>{aulaAtual.titulo}</h2>
                <p className="small muted" style={{ marginTop: 4 }}>
                  {aulaAtual.resumo}
                </p>
              </div>
              {estado.concluida && <span className="tag tag-ok">✓ Concluída</span>}
            </div>

            <h3 style={{ margin: '18px 0 8px' }}>Nesta aula</h3>
            <ul className="topicos">
              {aulaAtual.topicos.map((t) => (
                <li key={t.t}>
                  <b>{t.t}</b>
                  <span className="small muted">{t.d}</span>
                </li>
              ))}
            </ul>

            <div className="anota">
              <b className="small">💡 Para levar da aula</b>
              <p className="small">{aulaAtual.fecho}</p>
            </div>

            <div className="row wrap" style={{ gap: 10, marginTop: 18 }}>
              <button
                className="btn btn-ghost"
                onClick={() => irPara(trilha.aulas[indice - 1].id)}
                disabled={indice === 0}
              >
                ← Aula anterior
              </button>
              {!estado.concluida && (
                <button
                  className="btn btn-soft"
                  onClick={() => concluirAula(aulaAtual.id, trilha.materia)}
                >
                  ✓ Marcar como concluída
                </button>
              )}
              {proxima ? (
                <button className="btn btn-primary" onClick={() => irPara(proxima.id)}>
                  Próxima aula →
                </button>
              ) : (
                <Link className="btn btn-primary" to="/treino">
                  ⚡ Treinar {materia?.nome}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ──────────────────────────── playlist ──────────────────────────── */}
        <aside className="playlist">
          <div className="playlist-head">
            <div className="row" style={{ gap: 10 }}>
              <span className="prof-avatar mini" style={{ '--acento': prof.cor }}>
                {prof.avatar}
              </span>
              <div className="col">
                <b className="small">{prof.nome}</b>
                <span className="tiny muted">{prof.cadeira}</span>
              </div>
            </div>

            <div className="row-between" style={{ marginTop: 14 }}>
              <span className="tiny muted num">
                {feitas} de {trilha.aulas.length} aulas · {duracaoTrilha(trilha)} min
              </span>
              <span className="tiny num" style={{ fontWeight: 700 }}>
                {pctTrilha}%
              </span>
            </div>
            <span className={`progress progress-thin ${pctTrilha === 100 ? 'done' : ''}`}>
              <i style={{ width: `${pctTrilha}%` }} />
            </span>
          </div>

          <div className="playlist-lista">
            {trilha.aulas.map((a, i) => {
              const st = aulas[a.id]
              const ativa = a.id === aulaAtual.id
              return (
                <button
                  key={a.id}
                  className={`playlist-item ${ativa ? 'ativa' : ''}`}
                  onClick={() => irPara(a.id)}
                >
                  <span className={`pl-num ${st?.concluida ? 'ok' : ''}`}>
                    {st?.concluida ? '✓' : ativa ? '▶' : i + 1}
                  </span>
                  <span className="col" style={{ minWidth: 0, flex: 1 }}>
                    <b className="small pl-titulo">{a.titulo}</b>
                    <span className="tiny muted">
                      {a.min} min
                      {st && !st.concluida && st.progresso > 0.02
                        ? ` · ${Math.round(st.progresso * 100)}% assistido`
                        : ''}
                    </span>
                    {st && !st.concluida && st.progresso > 0.02 && (
                      <span className="progress progress-thin" style={{ marginTop: 6 }}>
                        <i style={{ width: `${st.progresso * 100}%` }} />
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="playlist-pe">
            <label className="check-linha">
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
              />
              <span className="small">Reproduzir a próxima automaticamente</span>
            </label>

            <div className="tiny muted" style={{ marginTop: 12 }}>
              Cobre as bancas:{' '}
              {trilha.bancas
                .slice(0, 4)
                .map((b) => bancaById(b)?.nome)
                .join(', ')}
              {trilha.bancas.length > 4 && ` +${trilha.bancas.length - 4}`}
            </div>

            {feitas > 0 && (
              <button
                className="link-btn tiny"
                style={{ marginTop: 12 }}
                onClick={() => reiniciarTrilha(trilha.aulas.map((a) => a.id))}
              >
                Zerar progresso da trilha
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* ───────────────────── continuar estudando a matéria ───────────────────── */}
      <Relacionadas trilha={trilha} />
    </div>
  )
}

function Relacionadas({ trilha }) {
  const { aulas } = useApp()
  const outras = TRILHAS.filter((t) => t.materia === trilha.materia && t.id !== trilha.id).concat(
    TRILHAS.filter((t) => t.materia !== trilha.materia).slice(0, 3),
  )

  return (
    <section style={{ marginTop: 34 }}>
      <div className="sec-head">
        <div>
          <h2>Continue por aqui</h2>
          <p className="small muted">Trilhas que combinam com a que você está assistindo.</p>
        </div>
        <Link to="/videoaulas" className="btn btn-ghost btn-sm">
          Ver acervo completo
        </Link>
      </div>

      <div className="card">
        {outras.slice(0, 4).map((t) => {
          const feitas = t.aulas.filter((a) => aulas[a.id]?.concluida).length
          const m = materiaById(t.materia)
          return (
            <Link key={t.id} to={`/videoaulas/${t.id}`} className="rel-item">
              <span className="rel-ico" style={{ '--acento': professorDa(t).cor }}>
                {m?.icone}
              </span>
              <span className="col" style={{ flex: 1, minWidth: 0 }}>
                <b className="small">{t.titulo}</b>
                <span className="tiny muted">
                  {m?.nome} · {t.aulas.length} aulas · {nivelNome(t.nivel)}
                </span>
              </span>
              <span className="tag tag-ink">
                {feitas > 0 ? `${feitas}/${t.aulas.length}` : 'Começar'}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
