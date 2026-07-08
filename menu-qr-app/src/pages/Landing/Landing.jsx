import { motion } from 'framer-motion';
import { QrCode, Smartphone, Utensils, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <img src="/logo.jpg" alt="MenuQR Express" style={{ width: '40px', height: '40px', borderRadius: '8px', mixBlendMode: 'screen' }} />
          <span>MenuQR<span style={{ color: 'var(--primary)' }}>Express</span></span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-links"
        >
          <a href="#features">Beneficios</a>
          <a href="#pricing">Planes</a>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/login" className="btn btn-outline">Acceso Restaurantes</Link>
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
            🚀 Revoluciona tu restaurante
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tu menú digital, rápido y <span className="text-gradient">sin contacto</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Digitaliza la carta de tu restaurante en minutos. Tus clientes solo escanean un código QR y acceden a un menú interactivo, moderno y fácil de actualizar.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/register" className="btn btn-primary">Crear mi Menú <ChevronRight size={18} /></Link>
            <Link to="/menu/demo" className="btn btn-secondary">Ver Demo</Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="hero-image"
        >
          <div className="glass-card phone-mockup">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-body">
              <div className="qr-container"><QrCode size={64} color="#f97316" /></div>
              <h3>Escanea para ordenar</h3>
              <p className="rating"><Utensils size={14} color="#fdba74" /> La Parrilla del Chef</p>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <Link to="/menu/demo" className="btn btn-sm btn-action" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Ver Carta Digital</Link>
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
          ¿Por qué elegir <span className="text-gradient">MenuQR Express</span>?
        </motion.h2>
        <div className="feature-grid">
          {[
            { icon: <QrCode size={32} />, title: "Código QR Único", desc: "Genera automáticamente un código QR elegante para colocar en las mesas de tu local." },
            { icon: <Smartphone size={32} />, title: "Diseño Mobile-First", desc: "Una experiencia fluida y rápida diseñada específicamente para los celulares de tus clientes." },
            { icon: <Utensils size={32} />, title: "Gestión en Tiempo Real", desc: "Actualiza precios, añade platillos o marca productos agotados al instante, sin reimprimir." }
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
          <h2>Plan Pro Restaurante</h2>
          <div className="price">$19 <span>/ mensual</span></div>
          <p>Todo lo que necesitas para digitalizar tu atención.</p>
          <ul className="pricing-features">
            <li><CheckCircle2 size={18} color="#f97316"/> Platillos y categorías ilimitadas</li>
            <li><CheckCircle2 size={18} color="#f97316"/> Código QR de alta resolución</li>
            <li><CheckCircle2 size={18} color="#f97316"/> Panel de administración intuitivo</li>
            <li><CheckCircle2 size={18} color="#f97316"/> Soporte prioritario 24/7</li>
          </ul>
          <Link to="/register" className="btn btn-primary full-width" style={{ textAlign: 'center' }}>Comenzar Prueba Gratis</Link>
        </motion.div>
      </section>

      <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 0' }}>
        <p>&copy; {new Date().getFullYear()} MenuQR Express. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
          <Link to="/terminos" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Términos de Servicio</Link>
          <Link to="/privacidad" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Políticas de Privacidad</Link>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
