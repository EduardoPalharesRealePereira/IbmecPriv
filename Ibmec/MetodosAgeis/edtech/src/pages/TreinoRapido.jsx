import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { DIFICULDADES, MATERIAS, materiaById } from '../data/catalogo'
import {
  QUESTOES_POR_TREINO,
  contarDisponiveis,
  sortearTreino,
} from '../data/questoes'

const LETRAS = ['A', 'B', 'C', 'D', 'E']

const fmtTempo = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function TreinoRapido() {
  const { usuario, historico, salvarTreino, metas, registrarProgresso } = useApp()

  const [fase, setFase] = useState('config') // config | quiz | resultado
  const [selecionadas, setSelecionadas] = useState(usuario.perfil.prioridades || [])
  const [dificuldade, setDificuldade] = useState('todas')
  const [aviso, setAviso] = useState('')

  const [questoes, setQuestoes] = useState([])
  const [respostas, setRespostas] = useState({})
  const [indice, setIndice] = useState(0)
  const [segundos, setSegundos] = useState(0)
  const [resultado, setResultado] = useState(null)

  const timer = useRef(null)

  useEffect(() => {
    if (fase === 'quiz') {
      timer.current = setInterval(() => setSegundos((s) => s + 1), 1000)
    }
    return () => clearInterval(timer.current)
  }, [fase])

  const disponiveis = useMemo(
    () => contarDisponiveis(selecionadas, dificuldade),
    [selecionadas, dificuldade],
  )
  const podeGerar = selecionadas.length > 0 && disponiveis >= QUESTOES_POR_TREINO

  function alternarMateria(id) {
    setAviso('')
    setSelecionadas((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  function gerar() {
    if (selecionadas.length === 0) {
      return setAviso('Selecione pelo menos uma matéria para gerar o treino.')
    }
    // Critério de aceite: exatamente 10 questões aleatórias das matérias escolhidas.
    const sorteadas = sortearTreino(selecionadas, dificuldade, QUESTOES_POR_TREINO)
    if (!sorteadas) {
      return setAviso(
        `Só há ${disponiveis} questões com esse filtro. Adicione outra matéria ou use a dificuldade "Todas" para chegar a ${QUESTOES_POR_TREINO}.`,
      )
    }
    setQuestoes(sorteadas)
    setRespostas({})
    setIndice(0)
    setSegundos(0)
    setAviso('')
    setFase('quiz')
  }

  function responder(qId, alt) {
    setRespostas((r) => ({ ...r, [qId]: alt }))
  }

  function finalizar() {
    clearInterval(timer.current)
    const detalhes = questoes.map((q) => ({
      ...q,
      marcada: respostas[q.id] ?? null,
      correto: respostas[q.id] === q.correta,
    }))
    const acertos = detalhes.filter((d) => d.correto).length

    const porMateria = {}
    detalhes.forEach((d) => {
      const m = (porMateria[d.materia] ||= { total: 0, acertos: 0 })
      m.total++
      if (d.correto) m.acertos++
    })

    const sessao = {
      data: new Date().toISOString(),
      materias: selecionadas,
      dificuldade,
      total: questoes.length,
      acertos,
      segundos,
      porMateria,
    }

    setResultado({ ...sessao, detalhes })
    salvarTreino(sessao)

    // Alimenta automaticamente as metas de "questões resolvidas" das matérias treinadas.
    Object.entries(porMateria).forEach(([materiaId, m]) => {
      metas
        .filter((meta) => meta.materia === materiaId && meta.tipo === 'questoes')
        .forEach((meta) => registrarProgresso(meta.id, m.total))
    })

    setFase('resultado')
  }

  function reiniciar() {
    setFase('config')
    setQuestoes([])
    setRespostas({})
    setResultado(null)
    setSegundos(0)
  }

  if (fase === 'quiz') {
    return (
      <Quiz
        questoes={questoes}
        respostas={respostas}
        indice={indice}
        segundos={segundos}
        onIr={setIndice}
        onResponder={responder}
        onFinalizar={finalizar}
        onSair={reiniciar}
      />
    )
  }

  if (fase === 'resultado') {
    return <Resultado r={resultado} onNovo={reiniciar} />
  }

  // ─────────────────────────────── configuração ───────────────────────────────
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Treino rápido</span>
        <h1>Pouco tempo? Faça 10 questões.</h1>
        <p>
          Escolha as matérias e a plataforma sorteia <b>exatamente {QUESTOES_POR_TREINO} questões
          aleatórias</b> do acervo da sua instituição. Dá pra fazer na fila do ônibus.
        </p>
      </div>

      <div className="sec-head">
        <div>
          <h2>Matérias</h2>
          <p className="small muted">Pode combinar quantas quiser — o sorteio junta todas.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSelecionadas(MATERIAS.map((m) => m.id))}
          >
            Selecionar todas
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSelecionadas([])}
            disabled={selecionadas.length === 0}
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="grid g-4">
        {MATERIAS.map((m) => {
          const on = selecionadas.includes(m.id)
          const qtd = contarDisponiveis([m.id], dificuldade)
          return (
            <button
              key={m.id}
              className="materia-card"
              aria-pressed={on}
              onClick={() => alternarMateria(m.id)}
            >
              <span className="mk">✓</span>
              <span className="ic">{m.icone}</span>
              <b>{m.nome}</b>
              <span className="qtd">
                {qtd} {qtd === 1 ? 'questão' : 'questões'} · {m.area}
              </span>
            </button>
          )
        })}
      </div>

      <div className="sec-head" style={{ marginTop: 28 }}>
        <div>
          <h2>Dificuldade</h2>
          <p className="small muted">Deixe em "Todas" para o sorteio mais próximo da prova real.</p>
        </div>
      </div>
      <div className="chips">
        {DIFICULDADES.map((d) => (
          <button
            key={d.id}
            className="chip"
            aria-pressed={dificuldade === d.id}
            onClick={() => {
              setDificuldade(d.id)
              setAviso('')
            }}
          >
            {d.nome}
          </button>
        ))}
      </div>

      {aviso && (
        <div className="alerta alerta-warn" style={{ marginTop: 18 }}>
          <span>⚠</span>
          <span>{aviso}</span>
        </div>
      )}

      <div className="acao-bar">
        <div className="col">
          <b className="small">
            {selecionadas.length === 0
              ? 'Nenhuma matéria selecionada'
              : `${selecionadas.length} matéria${selecionadas.length > 1 ? 's' : ''} · ${disponiveis} questões no pool`}
          </b>
          <span className="tiny muted">
            O treino sempre terá {QUESTOES_POR_TREINO} questões, sorteadas sem repetição.
          </span>
        </div>
        <button className="btn btn-primary btn-lg" onClick={gerar} disabled={!podeGerar}>
          ⚡ Gerar treino de {QUESTOES_POR_TREINO} questões
        </button>
      </div>

      {historico.length > 0 && (
        <section style={{ marginTop: 34 }}>
          <div className="sec-head">
            <h2>Últimos treinos</h2>
          </div>
          <div className="card">
            {historico.slice(0, 6).map((t) => {
              const pct = Math.round((t.acertos / t.total) * 100)
              return (
                <div className="hist-item" key={t.id}>
                  <div className={`hist-nota ${pct >= 70 ? 'bom' : pct < 50 ? 'ruim' : ''}`}>
                    {t.acertos}/{t.total}
                  </div>
                  <div className="col" style={{ flex: 1, minWidth: 0 }}>
                    <b className="small">
                      {t.materias.map((m) => materiaById(m)?.nome).join(', ')}
                    </b>
                    <span className="tiny muted">
                      {new Date(t.data).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      · {fmtTempo(t.segundos)} · {DIFICULDADES.find((d) => d.id === t.dificuldade)?.nome}
                    </span>
                  </div>
                  <span className={`tag ${pct >= 70 ? 'tag-ok' : pct < 50 ? 'tag-err' : 'tag-warn'}`}>
                    {pct}%
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}

/* ──────────────────────────────── quiz ──────────────────────────────── */

function Quiz({ questoes, respostas, indice, segundos, onIr, onResponder, onFinalizar, onSair }) {
  const q = questoes[indice]
  const respondidas = Object.keys(respostas).length
  const ultima = indice === questoes.length - 1

  return (
    <div className="quiz">
      <div className="row-between" style={{ marginBottom: 18 }}>
        <div>
          <span className="eyebrow">Treino rápido em andamento</span>
          <h2 style={{ marginTop: 4, fontSize: 20 }}>
            Questão {indice + 1} de {questoes.length}
          </h2>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="pill-timer">⏱ {fmtTempo(segundos)}</span>
          <button className="btn btn-ghost btn-sm" onClick={onSair}>
            Sair
          </button>
        </div>
      </div>

      <div className="quiz-bar">
        <span className="progress">
          <i style={{ width: `${(respondidas / questoes.length) * 100}%` }} />
        </span>
        <span className="small muted num">
          {respondidas}/{questoes.length} respondidas
        </span>
      </div>

      <article className="q-card anim-in" key={q.id}>
        <div className="row wrap" style={{ gap: 7 }}>
          <span className="tag">
            {materiaById(q.materia)?.icone} {materiaById(q.materia)?.nome}
          </span>
          <span className="tag tag-ink">
            {q.dificuldade === 'facil' ? 'Fácil' : q.dificuldade === 'media' ? 'Média' : 'Difícil'}
          </span>
        </div>

        <p className="q-enunciado">{q.enunciado}</p>

        <div className="alts">
          {q.alternativas.map((alt, i) => (
            <button
              key={i}
              className="alt"
              aria-pressed={respostas[q.id] === i}
              onClick={() => onResponder(q.id, i)}
            >
              <span className="letra">{LETRAS[i]}</span>
              <span>{alt}</span>
            </button>
          ))}
        </div>
      </article>

      <div className="row-between wrap" style={{ marginTop: 20 }}>
        <div className="dots">
          {questoes.map((qq, i) => (
            <button
              key={qq.id}
              className={i === indice ? 'atual' : respostas[qq.id] !== undefined ? 'resp' : ''}
              onClick={() => onIr(i)}
              title={`Questão ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="row" style={{ gap: 9 }}>
          <button
            className="btn btn-ghost"
            onClick={() => onIr(indice - 1)}
            disabled={indice === 0}
          >
            ← Anterior
          </button>
          {ultima ? (
            <button className="btn btn-primary" onClick={onFinalizar}>
              Finalizar treino
            </button>
          ) : (
            <button className="btn btn-dark" onClick={() => onIr(indice + 1)}>
              Próxima →
            </button>
          )}
        </div>
      </div>

      {respondidas === questoes.length && !ultima && (
        <div className="alerta alerta-ok" style={{ marginTop: 16 }}>
          <span>✓</span>
          <span>
            Todas respondidas.{' '}
            <button className="link-btn" onClick={onFinalizar}>
              Finalizar agora
            </button>
          </span>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────── resultado ─────────────────────────────── */

function Resultado({ r, onNovo }) {
  const pct = Math.round((r.acertos / r.total) * 100)
  const emBranco = r.detalhes.filter((d) => d.marcada === null).length

  const recado =
    pct >= 90
      ? 'Domínio muito consistente. Vale subir a dificuldade.'
      : pct >= 70
        ? 'Bom desempenho. Revise só os erros e siga o cronograma.'
        : pct >= 50
          ? 'Base existe, mas falta consolidar. Volte à teoria dos erros.'
          : 'Conteúdo ainda frágil — vale reforçar a teoria antes de treinar de novo.'

  return (
    <div className="quiz anim-in">
      <div className="page-head">
        <span className="eyebrow">Treino concluído</span>
        <h1>Seu resultado</h1>
      </div>

      <section className="card" style={{ padding: 26 }}>
        <div className="score">
          <div className="donut" style={{ '--p': pct }}>
            <div className="in">
              <b>{pct}%</b>
              <span>acerto</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <h2 style={{ fontSize: 21 }}>
              {r.acertos} de {r.total} questões corretas
            </h2>
            <p className="muted small" style={{ marginTop: 4 }}>
              {recado}
            </p>
            <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
              <span className="tag tag-ink">⏱ {fmtTempo(r.segundos)}</span>
              <span className="tag tag-ink">
                ~{Math.round(r.segundos / r.total)}s por questão
              </span>
              {emBranco > 0 && <span className="tag tag-warn">{emBranco} em branco</span>}
            </div>
          </div>
        </div>

        <hr className="divider" style={{ margin: '22px 0 18px' }} />

        <h3 style={{ marginBottom: 10 }}>Desempenho por matéria</h3>
        {Object.entries(r.porMateria).map(([id, m]) => {
          const p = Math.round((m.acertos / m.total) * 100)
          return (
            <div className="crono-linha" key={id}>
              <span className="nm">
                <span>{materiaById(id)?.icone}</span>
                {materiaById(id)?.nome}
              </span>
              <span className={`progress progress-thin ${p === 100 ? 'done' : ''}`}>
                <i style={{ width: `${p}%` }} />
              </span>
              <span className="hh">
                {m.acertos}/{m.total}
              </span>
            </div>
          )
        })}

        <div className="row wrap" style={{ gap: 10, marginTop: 22 }}>
          <button className="btn btn-primary" onClick={onNovo}>
            ⚡ Novo treino
          </button>
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="sec-head">
          <div>
            <h2>Correção comentada</h2>
            <p className="small muted">Leia os comentários das que você errou antes de sair.</p>
          </div>
        </div>

        <div className="grid" style={{ gap: 10 }}>
          {r.detalhes.map((d, i) => (
            <article key={d.id} className={`rev-item ${d.correto ? 'ok' : 'err'}`}>
              <div className="row wrap" style={{ gap: 7 }}>
                <span className="tag tag-ink">Questão {i + 1}</span>
                <span className="tag">{materiaById(d.materia)?.nome}</span>
                {d.correto ? (
                  <span className="tag tag-ok">✓ Acertou</span>
                ) : d.marcada === null ? (
                  <span className="tag tag-warn">Em branco</span>
                ) : (
                  <span className="tag tag-err">✕ Errou</span>
                )}
              </div>

              <p className="q">{d.enunciado}</p>

              <div className="rev-line">
                <span>Sua resposta:</span>
                <span style={{ fontWeight: 600 }}>
                  {d.marcada === null
                    ? '—'
                    : `${LETRAS[d.marcada]}) ${d.alternativas[d.marcada]}`}
                </span>
              </div>
              <div className="rev-line">
                <span>Correta:</span>
                <span style={{ fontWeight: 600, color: 'var(--ok)' }}>
                  {LETRAS[d.correta]}) {d.alternativas[d.correta]}
                </span>
              </div>

              <div className="expl">💡 {d.explicacao}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
