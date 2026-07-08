import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, Mail, Lock, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../index.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }
      
      // Guardar sesión e ir directo al dashboard
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('¡Cuenta creada exitosamente!');
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Columna Izquierda - Branding */}
      <div style={{ 
        flex: 1, 
        backgroundColor: 'var(--secondary)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '4rem',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <img src="/logo.jpg" alt="MenuQR Express Logo" style={{ width: '60px', height: '60px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }} />
          <h1 style={{ fontSize: '3rem', margin: 0 }}>MenuQR<span style={{ color: 'var(--primary)' }}>Express</span></h1>
        </div>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px' }}>
          Crea tu cuenta en menos de un minuto y empieza a transformar la experiencia de tu restaurante.
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
          <Toaster position="top-right" />
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Crear Cuenta</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Ingresa tus datos para comenzar
          </p>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre Completo</label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <User size={18} style={{ color: 'var(--text-muted)', marginRight: '1rem' }} />
                <input 
                  type="text" 
                  placeholder="Ej: Juan Pérez" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} 
                />
              </div>
            </div>

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

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Registrando...' : 'Registrarse Gratis'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
            ¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Inicia sesión aquí</Link>
          </p>

          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>← Volver al inicio</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
