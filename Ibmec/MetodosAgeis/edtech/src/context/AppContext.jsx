import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as db from '../lib/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(() => db.usuarioDaSessao())
  const [dados, setDados] = useState(() =>
    usuario ? db.carregarDados(usuario.id) : { metas: [], historico: [], aulas: {} },
  )

  useEffect(() => {
    if (usuario) db.salvarDados(usuario.id, dados)
  }, [usuario, dados])

  // ───────────────────────────── autenticação ─────────────────────────────

  function entrar({ email, senha }) {
    const { usuario: u, erro } = db.autenticar({ email, senha })
    if (erro) return { erro }
    db.salvarSessao(u.id)
    setUsuario(u)
    setDados(db.carregarDados(u.id))
    return { usuario: u }
  }

  function cadastrar({ nome, email, senha, provedor }) {
    const { usuario: u, erro } = db.criarUsuario({ nome, email, senha, provedor })
    if (erro) return { erro }
    db.salvarSessao(u.id)
    setUsuario(u)
    setDados(db.carregarDados(u.id))
    return { usuario: u }
  }

  /** Login social simulado: entra se a conta existe, cadastra se não existe. */
  function entrarComProvedor(provedor) {
    const slug = provedor.toLowerCase()
    const email = `aluno.${slug}@exemplo.com`
    const existente = db.listarUsuarios().find((u) => u.email === email)
    if (existente) {
      db.salvarSessao(existente.id)
      setUsuario(existente)
      setDados(db.carregarDados(existente.id))
      return { usuario: existente }
    }
    return cadastrar({
      nome: `Aluno ${provedor}`,
      email,
      senha: null,
      provedor: slug,
    })
  }

  function sair() {
    db.limparSessao()
    setUsuario(null)
    setDados({ metas: [], historico: [], aulas: {} })
  }

  function salvarPerfil(perfil) {
    const atualizado = db.atualizarUsuario(usuario.id, { perfil, perfilCompleto: true })
    setUsuario(atualizado)
    return atualizado
  }

  // ──────────────────────────────── metas ────────────────────────────────

  function adicionarMeta(meta) {
    const nova = {
      id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      criadaEm: new Date().toISOString(),
      atual: 0,
      ...meta,
    }
    setDados((d) => ({ ...d, metas: [nova, ...d.metas] }))
    return nova
  }

  function atualizarMeta(id, patch) {
    setDados((d) => ({
      ...d,
      metas: d.metas.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }))
  }

  function removerMeta(id) {
    setDados((d) => ({ ...d, metas: d.metas.filter((m) => m.id !== id) }))
  }

  function registrarProgresso(id, delta) {
    setDados((d) => ({
      ...d,
      metas: d.metas.map((m) =>
        m.id === id
          ? { ...m, atual: Math.max(0, Math.min(m.alvo, Number((m.atual + delta).toFixed(2)))) }
          : m,
      ),
    }))
  }

  // ────────────────────────── histórico de treinos ──────────────────────────

  function salvarTreino(sessao) {
    setDados((d) => ({
      ...d,
      historico: [{ id: `t_${Date.now()}`, ...sessao }, ...d.historico].slice(0, 30),
    }))
  }

  // ───────────────────────── progresso das videoaulas ─────────────────────────

  /** Guarda o quanto da aula já foi assistido (0 a 1). Nunca regride. */
  function registrarAula(aulaId, progresso) {
    setDados((d) => {
      const atual = d.aulas[aulaId]
      const p = Math.max(atual?.progresso || 0, Math.min(1, progresso))
      if (atual && Math.abs(p - atual.progresso) < 0.01) return d
      return {
        ...d,
        aulas: {
          ...d.aulas,
          [aulaId]: {
            ...atual,
            progresso: p,
            concluida: atual?.concluida || p >= 0.99,
            em: new Date().toISOString(),
          },
        },
      }
    })
  }

  /**
   * Marca a aula como concluída. Na primeira conclusão, credita +1 nas metas
   * de "aulas/módulos" da mesma matéria — mesma integração que o treino rápido
   * faz com as metas de questões.
   */
  function concluirAula(aulaId, materia) {
    const jaConcluida = Boolean(dados.aulas[aulaId]?.concluida)
    setDados((d) => ({
      ...d,
      aulas: {
        ...d.aulas,
        [aulaId]: { progresso: 1, concluida: true, em: new Date().toISOString() },
      },
    }))
    if (jaConcluida || !materia) return
    dados.metas
      .filter((meta) => meta.materia === materia && meta.tipo === 'aulas')
      .forEach((meta) => registrarProgresso(meta.id, 1))
  }

  /** Zera o progresso de uma trilha inteira (usado no "assistir de novo"). */
  function reiniciarTrilha(idsDasAulas) {
    setDados((d) => {
      const aulas = { ...d.aulas }
      idsDasAulas.forEach((id) => delete aulas[id])
      return { ...d, aulas }
    })
  }

  const valor = useMemo(
    () => ({
      usuario,
      metas: dados.metas,
      historico: dados.historico,
      aulas: dados.aulas,
      entrar,
      cadastrar,
      entrarComProvedor,
      sair,
      salvarPerfil,
      adicionarMeta,
      atualizarMeta,
      removerMeta,
      registrarProgresso,
      salvarTreino,
      registrarAula,
      concluirAula,
      reiniciarTrilha,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usuario, dados],
  )

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>')
  return ctx
}
