// Camada de persistência do protótipo.
// Substitui o backend: tudo vive no localStorage do navegador.
//
// ATENÇÃO: este é um protótipo de front-end. Em produção, cadastro/login e
// hash de senha (bcrypt/argon2) devem acontecer no servidor — nunca no cliente.

const K_USERS = 'edtech:users'
const K_SESSION = 'edtech:session'
const K_DATA = (userId) => `edtech:data:${userId}`

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/** Hash simbólico só para não guardar a senha em texto puro no protótipo. */
function hashSenha(senha) {
  let h = 5381
  for (let i = 0; i < senha.length; i++) {
    h = (h * 33) ^ senha.charCodeAt(i)
  }
  return `h${(h >>> 0).toString(36)}`
}

export const normalizarEmail = (email) => email.trim().toLowerCase()

export function listarUsuarios() {
  return read(K_USERS, [])
}

/** Critério de aceite: o sistema deve validar e-mails duplicados. */
export function emailJaCadastrado(email) {
  const alvo = normalizarEmail(email)
  return listarUsuarios().some((u) => u.email === alvo)
}

export function criarUsuario({ nome, email, senha, provedor = 'email' }) {
  if (emailJaCadastrado(email)) {
    return { erro: 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.' }
  }
  const usuarios = listarUsuarios()
  const novo = {
    id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    nome: nome.trim(),
    email: normalizarEmail(email),
    senhaHash: senha ? hashSenha(senha) : null,
    provedor,
    criadoEm: new Date().toISOString(),
    perfilCompleto: false,
    perfil: { bancas: [], cursos: [], horasPorDia: 2, dataProva: '', prioridades: [] },
  }
  usuarios.push(novo)
  write(K_USERS, usuarios)
  return { usuario: novo }
}

export function autenticar({ email, senha }) {
  const usuario = listarUsuarios().find((u) => u.email === normalizarEmail(email))
  if (!usuario) return { erro: 'E-mail não encontrado. Verifique ou crie uma conta.' }
  if (usuario.provedor !== 'email' && !usuario.senhaHash) {
    return { erro: `Esta conta usa login social (${usuario.provedor}). Entre por lá.` }
  }
  if (usuario.senhaHash !== hashSenha(senha)) return { erro: 'Senha incorreta.' }
  return { usuario }
}

export function atualizarUsuario(userId, patch) {
  const usuarios = listarUsuarios()
  const i = usuarios.findIndex((u) => u.id === userId)
  if (i === -1) return null
  usuarios[i] = { ...usuarios[i], ...patch }
  write(K_USERS, usuarios)
  return usuarios[i]
}

export function salvarSessao(userId) {
  write(K_SESSION, { userId, em: new Date().toISOString() })
}

export function limparSessao() {
  localStorage.removeItem(K_SESSION)
}

export function usuarioDaSessao() {
  const s = read(K_SESSION, null)
  if (!s) return null
  return listarUsuarios().find((u) => u.id === s.userId) || null
}

// ────────────── dados por usuário (metas + histórico + aulas) ──────────────

const DADOS_PADRAO = { metas: [], historico: [], aulas: {} }

export function carregarDados(userId) {
  return { ...DADOS_PADRAO, ...read(K_DATA(userId), DADOS_PADRAO) }
}

export function salvarDados(userId, dados) {
  write(K_DATA(userId), dados)
}
