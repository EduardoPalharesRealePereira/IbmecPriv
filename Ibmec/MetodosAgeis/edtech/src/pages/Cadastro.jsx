import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useApp } from '../context/AppContext'
import { emailJaCadastrado } from '../lib/storage'
import { BANCAS, CURSOS, MATERIAS } from '../data/catalogo'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function forcaSenha(s) {
  let n = 0
  if (s.length >= 6) n++
  if (s.length >= 10) n++
  if (/[A-Z]/.test(s) && /[a-z]/.test(s)) n++
  if (/\d/.test(s) || /[^\w\s]/.test(s)) n++
  return n
}
const ROTULO_FORCA = ['', 'Fraca', 'Razoável', 'Boa', 'Forte']

/**
 * `apenasPerfil` = usuário já autenticado (ex.: login social) que ainda
 * precisa completar o perfil antes de usar a plataforma.
 */
export default function Cadastro({ apenasPerfil = false }) {
  const { cadastrar, entrarComProvedor, salvarPerfil, usuario } = useApp()
  const navigate = useNavigate()

  const [etapa, setEtapa] = useState(apenasPerfil ? 2 : 1)

  // etapa 1 — conta
  const [conta, setConta] = useState({ nome: '', email: '', senha: '', confirmar: '' })
  const [aceite, setAceite] = useState(false)
  const [verSenha, setVerSenha] = useState(false)

  // etapa 2 — perfil
  const [perfil, setPerfil] = useState({
    bancas: [],
    cursos: [],
    horasPorDia: 2,
    dataProva: '',
    prioridades: [],
  })

  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState('')

  const setC = (campo) => (e) => {
    setConta((c) => ({ ...c, [campo]: e.target.value }))
    setErros((x) => ({ ...x, [campo]: null }))
    setErroGeral('')
  }

  const alternar = (chave, id) =>
    setPerfil((p) => {
      const lista = p[chave]
      return {
        ...p,
        [chave]: lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id],
      }
    })

  const forca = forcaSenha(conta.senha)

  const cursosPorArea = useMemo(() => {
    return CURSOS.reduce((acc, c) => {
      acc[c.area] = [...(acc[c.area] || []), c]
      return acc
    }, {})
  }, [])

  // ─────────────────────────── etapa 1: validação ───────────────────────────

  function validarConta() {
    const e = {}
    if (!conta.nome.trim()) e.nome = 'Informe seu nome completo.'
    else if (conta.nome.trim().length < 3) e.nome = 'Nome muito curto.'

    if (!conta.email.trim()) e.email = 'Informe seu e-mail.'
    else if (!EMAIL_RE.test(conta.email.trim())) e.email = 'E-mail inválido.'
    // Critério de aceite: validar e-mails duplicados.
    else if (emailJaCadastrado(conta.email))
      e.email = 'Este e-mail já está cadastrado. Tente fazer login.'

    if (!conta.senha) e.senha = 'Crie uma senha.'
    else if (conta.senha.length < 6) e.senha = 'A senha precisa ter ao menos 6 caracteres.'

    if (conta.confirmar !== conta.senha) e.confirmar = 'As senhas não coincidem.'
    if (!aceite) e.aceite = 'É necessário aceitar os termos para continuar.'

    setErros(e)
    return Object.keys(e).length === 0
  }

  function avancar(ev) {
    ev.preventDefault()
    if (!validarConta()) return
    const { erro } = cadastrar({
      nome: conta.nome,
      email: conta.email,
      senha: conta.senha,
      provedor: 'email',
    })
    if (erro) {
      setErros((x) => ({ ...x, email: erro }))
      return
    }
    setEtapa(2)
  }

  function social(provedor) {
    const { usuario: u, erro } = entrarComProvedor(provedor)
    if (erro) return setErroGeral(erro)
    if (u.perfilCompleto) navigate('/metas')
    else setEtapa(2)
  }

  // ─────────────────────────── etapa 2: validação ───────────────────────────

  // Critério de aceite: não avança sem ao menos uma banca E um curso.
  const perfilValido = perfil.bancas.length > 0 && perfil.cursos.length > 0

  function concluir(ev) {
    ev.preventDefault()
    const e = {}
    if (perfil.bancas.length === 0) e.bancas = 'Selecione pelo menos uma banca.'
    if (perfil.cursos.length === 0) e.cursos = 'Selecione pelo menos um curso.'
    setErros(e)
    if (Object.keys(e).length) return
    salvarPerfil(perfil)
    navigate('/metas')
  }

  // ───────────────────────────────── etapa 1 ─────────────────────────────────

  if (etapa === 1) {
    return (
      <AuthLayout>
        <Stepper etapa={1} />
        <h1>Criar sua conta</h1>
        <p className="muted">Leva menos de um minuto. Depois personalizamos seu plano.</p>

        <form className="form" onSubmit={avancar} noValidate>
          {erroGeral && (
            <div className="alerta alerta-erro">
              <span>⚠</span>
              <span>{erroGeral}</span>
            </div>
          )}

          <div className="social">
            <button type="button" onClick={() => social('Google')}>
              <span aria-hidden>G</span> Google
            </button>
            <button type="button" onClick={() => social('Microsoft')}>
              <span aria-hidden>⊞</span> Microsoft
            </button>
            <button type="button" onClick={() => social('Apple')}>
              <span aria-hidden></span> Apple
            </button>
          </div>

          <div className="ou">ou com e-mail</div>

          <div className="field">
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              className={`input ${erros.nome ? 'erro' : ''}`}
              placeholder="Maria Silva"
              value={conta.nome}
              onChange={setC('nome')}
              autoComplete="name"
            />
            {erros.nome && <span className="msg-erro">⚠ {erros.nome}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className={`input ${erros.email ? 'erro' : ''}`}
              placeholder="voce@email.com"
              value={conta.email}
              onChange={setC('email')}
              autoComplete="email"
            />
            {erros.email ? (
              <span className="msg-erro">⚠ {erros.email}</span>
            ) : (
              <span className="hint">Usaremos para login e para o resumo semanal.</span>
            )}
          </div>

          <div className="grid g-2" style={{ gap: 12 }}>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrap">
                <input
                  id="senha"
                  type={verSenha ? 'text' : 'password'}
                  className={`input ${erros.senha ? 'erro' : ''}`}
                  placeholder="mín. 6 caracteres"
                  value={conta.senha}
                  onChange={setC('senha')}
                  autoComplete="new-password"
                />
                <button type="button" className="olho" onClick={() => setVerSenha((v) => !v)}>
                  {verSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {conta.senha && (
                <>
                  <div className="forca">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className={forca >= n ? `on-${forca}` : ''} />
                    ))}
                  </div>
                  <span className="hint">Força: {ROTULO_FORCA[forca]}</span>
                </>
              )}
              {erros.senha && <span className="msg-erro">⚠ {erros.senha}</span>}
            </div>

            <div className="field">
              <label htmlFor="confirmar">Confirmar senha</label>
              <input
                id="confirmar"
                type={verSenha ? 'text' : 'password'}
                className={`input ${erros.confirmar ? 'erro' : ''}`}
                placeholder="repita a senha"
                value={conta.confirmar}
                onChange={setC('confirmar')}
                autoComplete="new-password"
              />
              {erros.confirmar && <span className="msg-erro">⚠ {erros.confirmar}</span>}
            </div>
          </div>

          <label className="row small" style={{ gap: 9, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={aceite}
              onChange={(e) => {
                setAceite(e.target.checked)
                setErros((x) => ({ ...x, aceite: null }))
              }}
              style={{ marginTop: 3, accentColor: 'var(--blue-500)' }}
            />
            <span className="muted">
              Concordo com os <a href="#termos">Termos de uso</a> e a{' '}
              <a href="#privacidade">Política de privacidade</a> da instituição.
            </span>
          </label>
          {erros.aceite && <span className="msg-erro">⚠ {erros.aceite}</span>}

          <button className="btn btn-primary btn-lg btn-block">Continuar</button>
        </form>

        <p className="auth-foot">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </AuthLayout>
    )
  }

  // ───────────────────────────────── etapa 2 ─────────────────────────────────

  return (
    <AuthLayout largo>
      <Stepper etapa={2} />
      <h1>Personalizar seu plano</h1>
      <p className="muted">
        {usuario?.nome ? `Boas-vindas, ${usuario.nome.split(' ')[0]}. ` : ''}
        Com essas respostas a IA monta seu cronograma e escolhe o que treinar primeiro.
      </p>

      <form className="form" onSubmit={concluir} noValidate style={{ marginTop: 22 }}>
        {/* bancas */}
        <div className="field">
          <div className="row-between">
            <label>
              Banca desejada <span style={{ color: 'var(--err)' }}>*</span>
            </label>
            <span className="tiny muted">
              {perfil.bancas.length} selecionada{perfil.bancas.length === 1 ? '' : 's'}
            </span>
          </div>
          <span className="hint">Pode escolher mais de uma. O peso das matérias muda por banca.</span>
          <div className="chips" style={{ marginTop: 6 }}>
            {BANCAS.map((b) => {
              const on = perfil.bancas.includes(b.id)
              return (
                <button
                  key={b.id}
                  type="button"
                  className="chip"
                  aria-pressed={on}
                  title={b.desc}
                  onClick={() => {
                    alternar('bancas', b.id)
                    setErros((x) => ({ ...x, bancas: null }))
                  }}
                >
                  {on && <span className="tick">✓</span>}
                  {b.nome}
                </button>
              )
            })}
          </div>
          {erros.bancas && <span className="msg-erro">⚠ {erros.bancas}</span>}
        </div>

        <hr className="divider" />

        {/* cursos */}
        <div className="field">
          <div className="row-between">
            <label>
              Curso pretendido <span style={{ color: 'var(--err)' }}>*</span>
            </label>
            <span className="tiny muted">
              {perfil.cursos.length} selecionado{perfil.cursos.length === 1 ? '' : 's'}
            </span>
          </div>
          <span className="hint">Define quais matérias entram com prioridade no cronograma.</span>

          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(cursosPorArea).map(([area, lista]) => (
              <div key={area}>
                <span className="tiny muted" style={{ fontWeight: 700, letterSpacing: '0.06em' }}>
                  {area.toUpperCase()}
                </span>
                <div className="chips" style={{ marginTop: 6 }}>
                  {lista.map((c) => {
                    const on = perfil.cursos.includes(c.id)
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className="chip"
                        aria-pressed={on}
                        onClick={() => {
                          alternar('cursos', c.id)
                          setErros((x) => ({ ...x, cursos: null }))
                        }}
                      >
                        {on && <span className="tick">✓</span>}
                        {c.nome}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          {erros.cursos && <span className="msg-erro">⚠ {erros.cursos}</span>}
        </div>

        <hr className="divider" />

        {/* horas por dia */}
        <div className="field">
          <label htmlFor="horas">Horas disponíveis por dia</label>
          <span className="hint">
            Seja realista — o cronograma é montado exatamente sobre esse tempo.
          </span>
          <div className="horas" style={{ marginTop: 8 }}>
            <input
              id="horas"
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={perfil.horasPorDia}
              onChange={(e) =>
                setPerfil((p) => ({ ...p, horasPorDia: Number(e.target.value) }))
              }
            />
            <div className="horas-valor">
              {perfil.horasPorDia.toLocaleString('pt-BR')} h/dia
            </div>
          </div>
          <span className="hint">
            ≈ {(perfil.horasPorDia * 7).toLocaleString('pt-BR')} h por semana
          </span>
        </div>

        <hr className="divider" />

        {/* data da prova */}
        <div className="grid g-2" style={{ gap: 14 }}>
          <div className="field">
            <label htmlFor="dataProva">Data da prova (opcional)</label>
            <input
              id="dataProva"
              type="date"
              className="input"
              value={perfil.dataProva}
              onChange={(e) => setPerfil((p) => ({ ...p, dataProva: e.target.value }))}
            />
            <span className="hint">Usamos para a contagem regressiva e o ritmo semanal.</span>
          </div>

          <div className="field">
            <label>Matérias que você quer reforçar (opcional)</label>
            <div className="chips">
              {MATERIAS.map((m) => {
                const on = perfil.prioridades.includes(m.id)
                return (
                  <button
                    key={m.id}
                    type="button"
                    className="chip"
                    aria-pressed={on}
                    onClick={() => alternar('prioridades', m.id)}
                  >
                    {m.nome}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {!perfilValido && (
          <div className="alerta alerta-info">
            <span>ℹ</span>
            <span>
              Para continuar, escolha <b>pelo menos uma banca</b> e <b>um curso</b>.
            </span>
          </div>
        )}

        <div className="row" style={{ gap: 10 }}>
          {!apenasPerfil && (
            <button type="button" className="btn btn-ghost btn-lg" onClick={() => setEtapa(1)}>
              Voltar
            </button>
          )}
          <button className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={!perfilValido}>
            Concluir cadastro e ver meu plano
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

function Stepper({ etapa }) {
  return (
    <div className="stepper">
      <div className={`step ${etapa > 1 ? 'feito' : 'ativo'}`}>
        <span className="bola">{etapa > 1 ? '✓' : '1'}</span> Conta
      </div>
      <span className="step-linha" />
      <div className={`step ${etapa === 2 ? 'ativo' : ''}`}>
        <span className="bola">2</span> Perfil de estudo
      </div>
    </div>
  )
}
