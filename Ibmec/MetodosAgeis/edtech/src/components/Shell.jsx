import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from './Logo'

const LINKS = [
  { to: '/metas', ico: '◎', label: 'Minhas metas' },
  { to: '/videoaulas', ico: '▷', label: 'Videoaulas' },
  { to: '/treino', ico: '⚡', label: 'Treino rápido' },
]

export default function Shell() {
  const { usuario, sair } = useApp()
  const navigate = useNavigate()

  const iniciais = (usuario?.nome || '?')
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return (
    <div className="shell">
      <aside className="side">
        <Logo sub={null} />

        <nav className="nav">
          <span className="nav-lab">Estudo</span>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'on' : '')}>
              <span className="ico">{l.ico}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="side-user">
          <div className="row" style={{ marginBottom: 12 }}>
            <div className="avatar">{iniciais}</div>
            <div className="col" style={{ minWidth: 0 }}>
              <b className="small" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {usuario?.nome}
              </b>
              <span className="tiny muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {usuario?.email}
              </span>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-sm btn-block"
            onClick={() => {
              sair()
              navigate('/login')
            }}
          >
            Sair da conta
          </button>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
