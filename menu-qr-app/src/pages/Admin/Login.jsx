import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, Mail, Lock } from 'lucide-react';
import '../../index.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí más adelante conectaremos con el backend (ej. Supabase Auth o JWT)
    // Por ahora, simulamos un inicio de sesión exitoso y redirigimos al dashboard
    if (email && password) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Columna Izquierda - Branding */}
      <div style={{ 
        flex: 1, 
        backgroundColor: 'var(--primary)', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '3rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <QrCode size={80} style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Menu QR Express</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px' }}>
          La plataforma definitiva para digitalizar el menú de tu restaurante en minutos.
        </p>
      </div>

      {/* Columna Derecha - Formulario */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'var(--secondary)'
      }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bienvenido de nuevo</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Ingresa a tu panel de administración
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Correo Electrónico</label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Mail size={18} style={{ color: 'var(--text-muted)', marginRight: '1rem' }} />
                <input 
                  type="email" 
                  placeholder="tu@restaurante.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Contraseña</label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Lock size={18} style={{ color: 'var(--text-muted)', marginRight: '1rem' }} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              Iniciar Sesión
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
            ¿No tienes cuenta? <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Regístrate gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
