import { motion } from 'framer-motion';
import { BookOpen, Zap, DollarSign, Download, Star, ChevronRight } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo"
        >
          Uni<span>Notes</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-links"
        >
          <a href="#features">Metodología</a>
          <a href="#pricing">Membresías</a>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button className="btn btn-outline">Acceso Institucional</button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="badge"
          >
            🎓 Plataforma de Colaboración Académica
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Optimiza tu rendimiento con <span className="text-gradient">material de excelencia</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Accede a un repositorio estructurado de documentos académicos y recursos de estudio verificados, desarrollados por los estudiantes más destacados de la comunidad universitaria.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-buttons"
          >
            <button className="btn btn-primary">Adquirir Membresía <ChevronRight size={18} /></button>
            <button className="btn btn-secondary">Contribuir material</button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="hero-image"
        >
          <div className="glass-card">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-body">
              <div className="file-icon"><BookOpen size={24} color="#a855f7" /></div>
              <h3>Guia_Estudio_Calculo_Diferencial.pdf</h3>
              <p className="rating"><Star size={14} color="#ffbd2e" fill="#ffbd2e" /> 4.9/5 (Revisión de pares)</p>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <button className="btn btn-sm btn-download"><Download size={16} /> Descargar Documento</button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Ventajas Competitivas de <span className="text-gradient">UniNotes</span>
        </motion.h2>
        <div className="feature-grid">
          {[
            { icon: <BookOpen size={32} />, title: "Rigor Académico", desc: "Garantizamos claridad y precisión. Nuestro sistema asegura que el material cumpla con altos estándares pedagógicos." },
            { icon: <Zap size={32} />, title: "Disponibilidad Ubicua", desc: "Infraestructura en la nube que permite la consulta y descarga de archivos de forma inmediata desde cualquier dispositivo." },
            { icon: <DollarSign size={32} />, title: "Modelo Sustentable", desc: "Esquema de precios diseñado en base a la economía del estudiante, fomentando la democratización de la educación." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="pricing-card"
        >
          <h2>Membresía Premium</h2>
          <div className="price">$3 <span>/ mensual</span></div>
          <p>Cobertura integral para potenciar tu formación profesional.</p>
          <ul className="pricing-features">
            <li>✔️ Acceso irrestricto al repositorio global</li>
            <li>✔️ Habilitación de consulta offline</li>
            <li>✔️ Entorno de estudio libre de anuncios</li>
            <li>✔️ Compensación directa a estudiantes creadores</li>
          </ul>
          <button className="btn btn-primary full-width">Formalizar Suscripción</button>
        </motion.div>
      </section>

      <footer>
        <p>&copy; 2026 UniNotes Innovación Tecnológica. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
