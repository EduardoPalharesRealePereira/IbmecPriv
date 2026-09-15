import { useEffect, useMemo, useRef, useState } from 'react'
import { professorDa, slidesDaAula } from '../data/videoaulas'

// No MVP o "vídeo" é renderizado no navegador a partir do roteiro da IA:
// cada tópico vira uma cena, com narração em legenda. Em produção o mesmo
// roteiro alimenta o render do vídeo — a linha do tempo e os controles
// abaixo continuam idênticos.
const SEG_POR_CENA = 8

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export default function AulaPlayer({ aula, trilha, progressoSalvo = 0, onProgresso, onFim }) {
  const prof = professorDa(trilha)
  const slides = useMemo(() => slidesDaAula(aula, trilha), [aula, trilha])

  const [p, setP] = useState(progressoSalvo >= 0.99 ? 0 : progressoSalvo) // 0 → 1
  const [tocando, setTocando] = useState(false)
  const [velocidade, setVelocidade] = useState(1)
  const [legenda, setLegenda] = useState(true)

  const quadro = useRef(null)
  const anterior = useRef(0)
  const ultimoSalvo = useRef(0)
  const fimEnviado = useRef(false)

  const duracaoDemo = slides.length * SEG_POR_CENA
  const duracaoNominal = aula.min * 60
  const indice = Math.min(slides.length - 1, Math.floor(p * slides.length))
  const cena = slides[indice]

  // Cada aula recomeça do zero (ou de onde parou) quando o aluno troca de vídeo.
  useEffect(() => {
    const inicio = progressoSalvo >= 0.99 ? 0 : progressoSalvo
    setP(inicio)
    ultimoSalvo.current = inicio
    fimEnviado.current = false
    setTocando(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aula.id])

  // Relógio do player: avança a linha do tempo enquanto está tocando.
  useEffect(() => {
    if (!tocando) return
    anterior.current = performance.now()

    const passo = (agora) => {
      const delta = (agora - anterior.current) / 1000
      anterior.current = agora
      setP((atual) => Math.min(1, atual + (delta * velocidade) / duracaoDemo))
      quadro.current = requestAnimationFrame(passo)
    }

    quadro.current = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(quadro.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocando, velocidade, duracaoDemo])

  // Fim da aula: para o player e avisa a trilha uma única vez.
  useEffect(() => {
    if (p < 1) {
      fimEnviado.current = false
      return
    }
    setTocando(false)
    if (!fimEnviado.current) {
      fimEnviado.current = true
      onFim?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p])

  // Salva o progresso no perfil do aluno, sem gravar a cada quadro.
  useEffect(() => {
    if (p !== 1 && Math.abs(p - ultimoSalvo.current) < 0.02) return
    ultimoSalvo.current = p
    onProgresso?.(p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p])

  const irParaCena = (i) => {
    const alvo = Math.max(0, Math.min(slides.length - 1, i))
    setP(alvo / slides.length + 0.0001)
  }

  const buscar = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setP(Math.max(0, Math.min(0.999, (e.clientX - r.left) / r.width)))
  }

  return (
    <div className="player">
      <div
        className={`palco ${tocando ? 'tocando' : ''}`}
        style={{ '--acento': prof.cor }}
        onClick={() => setTocando((t) => !t)}
      >
        <div className="palco-topo">
          <span className="badge-ia">
            <i /> Aula gerada por IA
          </span>
          <span className="palco-materia">{trilha.titulo}</span>
        </div>

        <div className="cena" key={indice}>
          {cena.tipo === 'conteudo' && (
            <span className="cena-passo">
              Tópico {cena.indice} de {cena.total}
            </span>
          )}
          {cena.tipo === 'abertura' && <span className="cena-passo">Abertura</span>}
          {cena.tipo === 'fecho' && <span className="cena-passo">Encerramento</span>}

          <h3 className="cena-titulo">{cena.titulo}</h3>

          {cena.itens && (
            <ul className="cena-itens">
              {cena.itens.map((it, i) => (
                <li key={i} style={{ animationDelay: `${0.15 * i}s` }}>
                  {it}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="prof">
          <span className="prof-avatar">{prof.avatar}</span>
          <div className="col">
            <b className="tiny">{prof.nome}</b>
            <span className="ondas" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        {legenda && <p className="legenda">{cena.fala}</p>}

        {!tocando && (
          <button
            className="play-central"
            onClick={(e) => {
              e.stopPropagation()
              setTocando(true)
            }}
            aria-label="Reproduzir aula"
          >
            ▶
          </button>
        )}
      </div>

      <div className="player-barra">
        <span className="linha-tempo" onClick={buscar}>
          <i style={{ width: `${p * 100}%` }} />
          {slides.map((_, i) => (
            <em key={i} style={{ left: `${(i / slides.length) * 100}%` }} />
          ))}
        </span>
      </div>

      <div className="player-ctrl">
        <button className="btn-icon" onClick={() => irParaCena(indice - 1)} title="Cena anterior">
          ⏮
        </button>
        <button className="btn btn-dark btn-sm" onClick={() => setTocando((t) => !t)}>
          {tocando ? '❚❚ Pausar' : p >= 1 ? '↻ Rever' : '▶ Assistir'}
        </button>
        <button className="btn-icon" onClick={() => irParaCena(indice + 1)} title="Próxima cena">
          ⏭
        </button>

        <span className="tempo num">
          {fmt(p * duracaoNominal)} / {fmt(duracaoNominal)}
        </span>

        <span className="spacer" />

        <button
          className="chip chip-mini"
          aria-pressed={legenda}
          onClick={() => setLegenda((l) => !l)}
        >
          CC
        </button>
        {[1, 1.5, 2].map((v) => (
          <button
            key={v}
            className="chip chip-mini"
            aria-pressed={velocidade === v}
            onClick={() => setVelocidade(v)}
          >
            {v}x
          </button>
        ))}
      </div>
    </div>
  )
}
