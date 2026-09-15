import { Navigate, Route, Routes } from 'react-router-dom'  
import { useApp } from './context/AppContext'
import Shell from './components/Shell'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Metas from './pages/Metas'
import Videoaulas from './pages/Videoaulas'
import Trilha from './pages/Trilha'
import TreinoRapido from './pages/TreinoRapido'

/** Só entra quem está autenticado e já completou o perfil de estudo. */
function Protegida({ children }) {
  const { usuario } = useApp()
  if (!usuario) return <Navigate to="/login" replace />
  if (!usuario.perfilCompleto) return <Navigate to="/completar-perfil" replace />
  return children
}

/** Telas de autenticação não devem aparecer para quem já está logado. */
function Publica({ children }) {
  const { usuario } = useApp()
  if (usuario?.perfilCompleto) return <Navigate to="/metas" replace />
  return children
}

export default function App() {
  const { usuario } = useApp()

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Publica>
            <Login />
          </Publica>
        }
      />
      <Route
        path="/cadastro"
        element={
          <Publica>
            <Cadastro />
          </Publica>
        }
      />
      <Route
        path="/completar-perfil"
        element={
          usuario ? (
            usuario.perfilCompleto ? (
              <Navigate to="/metas" replace />
            ) : (
              <Cadastro apenasPerfil />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        element={
          <Protegida>
            <Shell />
          </Protegida>
        }
      >
        <Route path="/metas" element={<Metas />} />
        <Route path="/videoaulas" element={<Videoaulas />} />
        <Route path="/videoaulas/:trilhaId" element={<Trilha />} />
        <Route path="/videoaulas/:trilhaId/:aulaId" element={<Trilha />} />
        <Route path="/treino" element={<TreinoRapido />} />
      </Route>

      <Route path="*" element={<Navigate to={usuario ? '/metas' : '/login'} replace />} />
    </Routes>
  )
}
