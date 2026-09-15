export default function Logo({ claro = false, sub = 'Aprendizado direcionado' }) {
  return (
    <span className="logo" style={claro ? { color: '#fff' } : undefined}>
      <span className="mark">◈</span>
      <span>
        EdTech
        {sub && <span className="sub">{sub}</span>}
      </span>
    </span>
  )
}
