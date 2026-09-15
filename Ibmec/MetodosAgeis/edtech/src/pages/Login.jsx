import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useApp } from '../context/AppContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Login() {
  const { entrar, entrarComProvedor } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState('')
  const [verSenha, setVerSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const set = (campo) => (e) => {
    setForm((f) => ({ ...f, [campo]: e.target.value }))
    setErros((x) => ({ ...x, [campo]: null }))
    setErroGeral('')
  }

  function validar() {
    const e = {}
    if (!form.email.trim()) e.email = 'Informe seu e-mail.'
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'E-mail inválido.'
    if (!form.senha) e.senha = 'Informe sua senha.'
    setErros(e)
    return Object.keys(e).length === 0
  }

  function submeter(ev) {
    ev.preventDefault()
    if (!validar()) return
    setCarregando(true)
    const { erro } = entrar({ email: form.email, senha: form.senha })
    setCarregando(false)
    if (erro) return setErroGeral(erro)
    navigate('/metas')
  }

  function social(provedor) {
    const { usuario, erro } = entrarComProvedor(provedor)
    if (erro) return setErroGeral(erro)
    navigate(usuario.perfilCompleto ? '/metas' : '/completar-perfil')
  }

  return (
    <AuthLayout>
      <h1>Entrar na plataforma</h1>
      <p className="muted">
        Continue de onde parou no seu cronograma personalizado.
      </p>

      <form className="form" onSubmit={submeter} noValidate>
        {erroGeral && (
          <div className="alerta alerta-erro">
            <span>⚠</span>
            <span>{erroGeral}</span>
          </div>
        )}

        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            className={`input ${erros.email ? 'erro' : ''}`}
            placeholder="voce@email.com"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
          />
          {erros.email && <span className="msg-erro">⚠ {erros.email}</span>}
        </div>

        <div className="field">
          <div className="row-between">
            <label htmlFor="senha">Senha</label>
            <span className="tiny muted">Esqueceu?</span>
          </div>
          <div className="input-wrap">
            <input
              id="senha"
              type={verSenha ? 'text' : 'password'}
              className={`input ${erros.senha ? 'erro' : ''}`}
              placeholder="••••••••"
              value={form.senha}
              onChange={set('senha')}
              autoComplete="current-password"
            />
            <button type="button" className="olho" onClick={() => setVerSenha((v) => !v)}>
              {verSenha ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {erros.senha && <span className="msg-erro">⚠ {erros.senha}</span>}
        </div>

        <button className="btn btn-primary btn-lg btn-block" disabled={carregando}>
          {carregando ? 'Entrando…' : 'Entrar'}
        </button>

        <div className="ou">ou continue com</div>

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
      </form>

      <p className="auth-foot">
        Ainda não tem conta? <Link to="/cadastro">Criar conta gratuita</Link>
      </p>
    </AuthLayout>
  )
}
