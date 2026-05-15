import { useState, useEffect } from 'react'
import './App.css'

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

  return (
    <div className="container">
      <header className="profile-header glass-panel">
        <div className="avatar-container">
          <img src={personal.foto} alt={`${personal.nombre} ${personal.apellido}`} className="avatar" />
        </div>
        <div className="header-info">
          <h1>{personal.nombre} {personal.apellido}</h1>
          <p className="city"><span className="icon"></span> {personal.ciudad}</p>
        </div>
      </header>

      <main className="content glass-panel">
        <section className="section">
          <h2 className="section-title">Formación Académica</h2>
          <div className="timeline">
            {formacion.map((item, index) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="year">{item.anio}</span>
                  <h3>{item.titulo}</h3>
                  <p className="institution">{item.institucion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 • Diseñado para {personal.nombre} {personal.apellido}</p>
      </footer>
    </div>
  )
}

export default App
