import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  BANCAS,
  CURSOS,
  MATERIAS,
  TIPOS_META,
  bancaById,
  cursoById,
  materiaById,
} from '../data/catalogo'

// Como a área do curso puxa as matérias no cronograma.
const AFINIDADE = {
  Saúde: ['Natureza'],
  Exatas: ['Exatas'],
  Humanas: ['Humanas', 'Linguagens'],
}

function diasAte(dataISO) {
  if (!dataISO) return null
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const alvo = new Date(`${dataISO}T00:00:00`)
  return Math.round((alvo - hoje) / 86400000)
}

function fmtHoras(h) {
  const horas = Math.floor(h)
  const min = Math.round((h - horas) * 60)
  if (horas === 0) return `${min}min`
  return min === 0 ? `${horas}h` : `${horas}h${String(min).padStart(2, '0')}`
}

export default function Metas() {
  const { usuario, metas, adicionarMeta, removerMeta, registrarProgresso, salvarPerfil, historico } =
    useApp()

  const [modalMeta, setModalMeta] = useState(false)
  const [modalPerfil, setModalPerfil] = useState(false)

  const perfil = usuario.perfil
  const dias = diasAte(perfil.dataProva)

  // ────────────────────── cronograma sugerido pela IA ──────────────────────
  const cronograma = useMemo(() => {
    const areasDoCurso = new Set(
      perfil.cursos.flatMap((id) => AFINIDADE[cursoById(id)?.area] || []),
    )
    const pesos = MATERIAS.map((m) => {
      let p = 1
      if (areasDoCurso.has(m.area)) p += 1
      if (perfil.prioridades.includes(m.id)) p += 1.5
      if (m.area === 'Linguagens') p += 0.5 // redação/interpretação pesa em toda banca
      return { ...m, peso: p }
    })
    const total = pesos.reduce((s, m) => s + m.peso, 0)
    return pesos
      .map((m) => ({ ...m, horas: (perfil.horasPorDia * m.peso) / total }))
      .sort((a, b) => b.horas - a.horas)
  }, [perfil])

  const maxHoras = cronograma[0]?.horas || 1

  // ───────────────────────────── indicadores ─────────────────────────────
  const concluidas = metas.filter((m) => m.atual >= m.alvo).length
  const progressoMedio = metas.length
    ? Math.round(
        (metas.reduce((s, m) => s + Math.min(1, m.atual / m.alvo), 0) / metas.length) * 100,
      )
    : 0
  const acertoMedio = historico.length
    ? Math.round(
        historico.reduce((s, t) => s + t.acertos / t.total, 0) / historico.length * 100,
      )
    : null

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Definição de metas</span>
        <h1>Minhas metas de estudo</h1>
        <p>
          Seu objetivo declarado guia o cronograma, o peso de cada matéria e a ordem das
          questões que a plataforma sugere.
        </p>
      </div>

      {/* ─────────────────────────── meta principal ─────────────────────────── */}
      <section className="hero">
        <div className="row-between wrap">
          <div>
            <span className="eyebrow">Objetivo principal</span>
            <h2 style={{ marginTop: 6 }}>
              {perfil.cursos.map((c) => cursoById(c)?.nome).join(' · ')}
            </h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setModalPerfil(true)}>
            Editar objetivo
          </button>
        </div>

        <div className="hero-grid">
          <div className="hero-cell">
            <div className="k">Bancas</div>
            <div className="v">
              {perfil.bancas.length <= 2
                ? perfil.bancas.map((b) => bancaById(b)?.nome).join(', ')
                : `${bancaById(perfil.bancas[0])?.nome} +${perfil.bancas.length - 1}`}
            </div>
          </div>
          <div className="hero-cell">
            <div className="k">Tempo diário</div>
            <div className="v">
              {perfil.horasPorDia.toLocaleString('pt-BR')} <small>h/dia</small>
            </div>
          </div>
          <div className="hero-cell">
            <div className="k">Meta semanal</div>
            <div className="v">
              {(perfil.horasPorDia * 7).toLocaleString('pt-BR')} <small>horas</small>
            </div>
          </div>
          <div className="hero-cell">
            <div className="k">Prova</div>
            <div className="v">
              {dias === null ? (
                <small>sem data definida</small>
              ) : dias > 0 ? (
                <>
                  {dias} <small>dias restantes</small>
                </>
              ) : dias === 0 ? (
                <small>é hoje. boa prova!</small>
              ) : (
                <small>data já passou</small>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── indicadores ───────────────────────────── */}
      <div className="grid g-4" style={{ marginTop: 16 }}>
        <div className="stat">
          <div className="k">Metas ativas</div>
          <div className="v">{metas.length - concluidas}</div>
        </div>
        <div className="stat">
          <div className="k">Metas concluídas</div>
          <div className="v">{concluidas}</div>
        </div>
        <div className="stat">
          <div className="k">Progresso médio</div>
          <div className="v">
            {progressoMedio}
            <small>%</small>
          </div>
        </div>
        <div className="stat">
          <div className="k">Acerto nos treinos</div>
          <div className="v">
            {acertoMedio === null ? <small>sem treinos</small> : <>{acertoMedio}<small>%</small></>}
          </div>
        </div>
      </div>

      {/* ───────────────────────── cronograma sugerido ───────────────────────── */}
      <section style={{ marginTop: 28 }}>
        <div className="sec-head">
          <div>
            <h2>Cronograma sugerido</h2>
            <p className="small muted">
              Distribuição das suas {perfil.horasPorDia.toLocaleString('pt-BR')} h diárias,
              calculada a partir da banca, do curso e das matérias que você marcou para reforçar.
            </p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Link to="/videoaulas" className="btn btn-ghost btn-sm">
              ▷ Videoaulas
            </Link>
            <Link to="/treino" className="btn btn-soft btn-sm">
              ⚡ Treinar agora
            </Link>
          </div>
        </div>

        <div className="card">
          {cronograma.map((m) => (
            <div className="crono-linha" key={m.id}>
              <span className="nm">
                <span>{m.icone}</span>
                {m.nome}
              </span>
              <span className="progress progress-thin">
                <i style={{ width: `${(m.horas / maxHoras) * 100}%` }} />
              </span>
              <span className="hh">{fmtHoras(m.horas)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────── lista de metas ────────────────────────── */}
      <section style={{ marginTop: 28 }}>
        <div className="sec-head">
          <div>
            <h2>Metas específicas</h2>
            <p className="small muted">
              Quebre o objetivo grande em metas medíveis por matéria.
            </p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setModalMeta(true)}>
            + Nova meta
          </button>
        </div>

        {metas.length === 0 ? (
          <div className="empty">
            <div className="ico">◎</div>
            <h3>Nenhuma meta definida ainda</h3>
            <p>
              Comece com algo pequeno e mensurável: "120 questões de Matemática até o fim do
              mês" ou "8 horas de Biologia por semana".
            </p>
            <button className="btn btn-primary" onClick={() => setModalMeta(true)}>
              Criar primeira meta
            </button>
          </div>
        ) : (
          <div className="grid g-2">
            {metas.map((m) => (
              <CardMeta
                key={m.id}
                meta={m}
                onProgresso={registrarProgresso}
                onRemover={removerMeta}
              />
            ))}
          </div>
        )}
      </section>

      {modalMeta && (
        <ModalNovaMeta
          prioridades={perfil.prioridades}
          onFechar={() => setModalMeta(false)}
          onSalvar={(m) => {
            adicionarMeta(m)
            setModalMeta(false)
          }}
        />
      )}

      {modalPerfil && (
        <ModalPerfil
          perfil={perfil}
          onFechar={() => setModalPerfil(false)}
          onSalvar={(p) => {
            salvarPerfil(p)
            setModalPerfil(false)
          }}
        />
      )}
    </>
  )
}

/* ───────────────────────────── card de meta ───────────────────────────── */

function CardMeta({ meta, onProgresso, onRemover }) {
  const materia = materiaById(meta.materia)
  const tipo = TIPOS_META.find((t) => t.id === meta.tipo)
  const pct = Math.min(100, Math.round((meta.atual / meta.alvo) * 100))
  const feita = meta.atual >= meta.alvo
  const dias = diasAte(meta.prazo)
  const passo = meta.tipo === 'horas' ? 0.5 : meta.tipo === 'questoes' ? 10 : 1

  return (
    <article className="card card-hover meta-item">
      <div className="meta-top">
        <div className="meta-ico">{materia?.icone}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row wrap" style={{ gap: 7 }}>
            <b>{materia?.nome}</b>
            {feita ? (
              <span className="tag tag-ok">✓ Concluída</span>
            ) : dias !== null && dias < 0 ? (
              <span className="tag tag-err">Prazo vencido</span>
            ) : dias !== null && dias <= 7 ? (
              <span className="tag tag-warn">{dias === 0 ? 'Vence hoje' : `${dias} d restantes`}</span>
            ) : null}
          </div>
          <span className="small muted">{tipo?.nome}</span>
        </div>
        <button
          className="btn btn-icon"
          title="Remover meta"
          onClick={() => onRemover(meta.id)}
        >
          ✕
        </button>
      </div>

      <div>
        <div className="meta-vals" style={{ marginBottom: 6 }}>
          <span>
            <b>
              {meta.atual.toLocaleString('pt-BR')} / {meta.alvo.toLocaleString('pt-BR')}
            </b>{' '}
            {tipo?.unidade}
          </span>
          <span>{pct}%</span>
        </div>
        <div className={`progress ${feita ? 'done' : ''}`}>
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="row-between">
        <span className="tiny muted">
          {meta.prazo
            ? `Prazo: ${new Date(`${meta.prazo}T00:00:00`).toLocaleDateString('pt-BR')}`
            : 'Sem prazo definido'}
        </span>
        <div className="row" style={{ gap: 6 }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onProgresso(meta.id, -passo)}
            disabled={meta.atual === 0}
          >
            −{passo}
          </button>
          <button
            className="btn btn-soft btn-sm"
            onClick={() => onProgresso(meta.id, passo)}
            disabled={feita}
          >
            +{passo} {tipo?.unidade === 'h' ? 'h' : ''}
          </button>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────── modal: nova meta ─────────────────────────── */

function ModalNovaMeta({ onFechar, onSalvar, prioridades }) {
  const [form, setForm] = useState({
    materia: prioridades[0] || MATERIAS[0].id,
    tipo: 'questoes',
    alvo: 100,
    prazo: '',
  })
  const [erro, setErro] = useState('')

  const tipo = TIPOS_META.find((t) => t.id === form.tipo)

  function salvar(e) {
    e.preventDefault()
    const alvo = Number(form.alvo)
    if (!alvo || alvo <= 0) return setErro('Informe um valor alvo maior que zero.')
    onSalvar({ ...form, alvo })
  }

  return (
    <div className="overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="row-between" style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 20 }}>Nova meta</h2>
          <button className="btn btn-icon" onClick={onFechar}>
            ✕
          </button>
        </div>

        <form className="form" onSubmit={salvar}>
          <div className="field">
            <label htmlFor="mMateria">Matéria</label>
            <select
              id="mMateria"
              className="select"
              value={form.materia}
              onChange={(e) => setForm((f) => ({ ...f, materia: e.target.value }))}
            >
              {MATERIAS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="mTipo">O que você quer medir</label>
            <select
              id="mTipo"
              className="select"
              value={form.tipo}
              onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
            >
              {TIPOS_META.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grid g-2" style={{ gap: 12 }}>
            <div className="field">
              <label htmlFor="mAlvo">Alvo ({tipo?.unidade})</label>
              <input
                id="mAlvo"
                type="number"
                min="1"
                step={form.tipo === 'horas' ? '0.5' : '1'}
                className="input"
                value={form.alvo}
                onChange={(e) => {
                  setForm((f) => ({ ...f, alvo: e.target.value }))
                  setErro('')
                }}
              />
            </div>
            <div className="field">
              <label htmlFor="mPrazo">Prazo (opcional)</label>
              <input
                id="mPrazo"
                type="date"
                className="input"
                value={form.prazo}
                onChange={(e) => setForm((f) => ({ ...f, prazo: e.target.value }))}
              />
            </div>
          </div>

          {erro && (
            <div className="alerta alerta-erro">
              <span>⚠</span>
              <span>{erro}</span>
            </div>
          )}

          <div className="row" style={{ gap: 10 }}>
            <button type="button" className="btn btn-ghost" onClick={onFechar}>
              Cancelar
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }}>
              Salvar meta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ──────────────────── modal: editar objetivo/perfil ──────────────────── */

function ModalPerfil({ perfil, onFechar, onSalvar }) {
  const [p, setP] = useState(perfil)
  const valido = p.bancas.length > 0 && p.cursos.length > 0

  const alternar = (chave, id) =>
    setP((prev) => {
      const lista = prev[chave]
      return {
        ...prev,
        [chave]: lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id],
      }
    })

  return (
    <div className="overlay" onClick={onFechar}>
      <div className="modal" style={{ maxWidth: 620 }} onClick={(e) => e.stopPropagation()}>
        <div className="row-between" style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 20 }}>Editar objetivo</h2>
          <button className="btn btn-icon" onClick={onFechar}>
            ✕
          </button>
        </div>

        <div className="form">
          <div className="field">
            <label>
              Banca desejada <span style={{ color: 'var(--err)' }}>*</span>
            </label>
            <div className="chips">
              {BANCAS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className="chip"
                  aria-pressed={p.bancas.includes(b.id)}
                  onClick={() => alternar('bancas', b.id)}
                >
                  {b.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>
              Curso pretendido <span style={{ color: 'var(--err)' }}>*</span>
            </label>
            <div className="chips">
              {CURSOS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={p.cursos.includes(c.id)}
                  onClick={() => alternar('cursos', c.id)}
                >
                  {c.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="pHoras">Horas disponíveis por dia</label>
            <div className="horas">
              <input
                id="pHoras"
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={p.horasPorDia}
                onChange={(e) => setP((x) => ({ ...x, horasPorDia: Number(e.target.value) }))}
              />
              <div className="horas-valor">{p.horasPorDia.toLocaleString('pt-BR')} h/dia</div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="pData">Data da prova</label>
            <input
              id="pData"
              type="date"
              className="input"
              value={p.dataProva}
              onChange={(e) => setP((x) => ({ ...x, dataProva: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Matérias para reforçar</label>
            <div className="chips">
              {MATERIAS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className="chip"
                  aria-pressed={p.prioridades.includes(m.id)}
                  onClick={() => alternar('prioridades', m.id)}
                >
                  {m.nome}
                </button>
              ))}
            </div>
          </div>

          {!valido && (
            <div className="alerta alerta-info">
              <span>ℹ</span>
              <span>Mantenha ao menos uma banca e um curso selecionados.</span>
            </div>
          )}

          <div className="row" style={{ gap: 10 }}>
            <button type="button" className="btn btn-ghost" onClick={onFechar}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={!valido}
              onClick={() => onSalvar(p)}
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
