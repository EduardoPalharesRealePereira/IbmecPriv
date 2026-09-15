import Logo from './Logo'

const FEATS = [
  ['◈', 'Base de conteúdo da sua própria instituição, não da internet inteira.'],
  ['◎', 'Cronograma que se ajusta à banca, ao curso e às horas que você tem.'],
  ['⚡', 'Treino rápido de 10 questões para os dias corridos.'],
]

export default function AuthLayout({ children, largo = false }) {
  return (
    <div className="auth">
      <aside className="auth-aside">
        <Logo claro sub={null} />

        <div className="auth-claim">
          <span className="eyebrow" style={{ color: 'var(--blue-300)' }}>
            Plataforma EdTech
          </span>
          <h2>
            Seu material. Sua banca. <em>Seu ritmo.</em>
          </h2>
          <p>
            A IA lê o acervo da sua instituição e monta um plano de estudo só seu — do
            cronograma diário ao treino de 10 questões antes de dormir.
          </p>

          <div className="auth-feats">
            {FEATS.map(([ico, txt]) => (
              <div className="auth-feat" key={txt}>
                <span className="dot">{ico}</span>
                <span>{txt}</span>
              </div>
            ))}
          </div>

          <div className="auth-stats">
            <div>
              <b>10</b>
              <span>bancas mapeadas</span>
            </div>
            <div>
              <b>8</b>
              <span>matérias com banco próprio</span>
            </div>
            <div>
              <b>100%</b>
              <span>conteúdo da instituição</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="auth-main">
        <div className={`auth-box ${largo ? 'wide' : ''} anim-in`}>{children}</div>
      </section>
    </div>
  )
}
