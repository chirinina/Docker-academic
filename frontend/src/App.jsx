import { useState, useEffect } from 'react'
import './App.css'

const avatarFromPublic = '/Foto 4 x 4.png'

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

function DegreeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 8.5 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11v4.2c0 1.6 2.2 3.3 5 3.3s5-1.7 5-3.3V11" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  )
}

function App() {
  const [cvData, setCvData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/cv')
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar datos')
        return response.json()
      })
      .then(data => {
        setCvData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Iniciando experiencia profesional...</p>
      </div>
    )
  }

  if (error) return <div className="error glass-panel">Error: {error}</div>
  if (!cvData) return null

  const { personal, formacion } = cvData
  const fullName = `${personal.nombre} ${personal.apellido}`
  const avatarSrc = personal.foto?.includes('Foto 4x4') ? avatarFromPublic : personal.foto || avatarFromPublic

  return (
    <div className="container">
      <header className="profile-header">
        <div className="profile-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="avatar-frame">
          <img
            src={avatarSrc}
            onError={(event) => {
              event.currentTarget.src = avatarFromPublic
            }}
            alt={fullName}
            className="avatar"
          />
          <span className="avatar-status" aria-hidden="true"></span>
        </div>

        <div className="header-info">
          <p className="eyebrow">Perfil profesional</p>
          <h1>{fullName}</h1>
          <div className="meta-row">
            <span className="meta-pill">
              <PinIcon />
              {personal.ciudad}
            </span>
            <span className="meta-pill">
              <DegreeIcon />
              Sistemas informáticos
            </span>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="section">
          <div className="section-heading">
            <span className="section-icon">
              <DegreeIcon />
            </span>
            <div>
              <p className="section-kicker">Trayectoria</p>
              <h2 className="section-title">Formación Académica</h2>
            </div>
          </div>

          <div className="timeline">
            {formacion.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true"></div>
                <div className="timeline-content">
                  <span className="year">
                    <CalendarIcon />
                    {item.anio}
                  </span>
                  <h3>{item.titulo}</h3>
                  <p className="institution">{item.institucion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 · Diseñado para {fullName}</p>
      </footer>
    </div>
  )
}

export default App
