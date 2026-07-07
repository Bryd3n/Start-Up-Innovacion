import { Link } from 'react-router-dom';
import { LayoutDashboard, ListTree, QrCode, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import '../../index.css';

export default function Dashboard() {
  const mockItems = [
    { id: 1, name: 'Hamburguesa Doble', price: '$8.99', category: 'Principales' },
    { id: 2, name: 'Papas Fritas', price: '$3.50', category: 'Acompañamientos' },
    { id: 3, name: 'Coca Cola', price: '$2.00', category: 'Bebidas' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--secondary)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', textAlign: 'left', margin: 0 }}>MenuQR<span style={{ color: 'var(--primary)' }}>Express</span></h2>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: 'rgba(249,115,22,0.1)', color: 'var(--primary)' }}>
            <LayoutDashboard size={20} /> Resumen
          </button>
          <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
            <ListTree size={20} /> Categorías
          </button>
          <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
            <QrCode size={20} /> Generador QR
          </button>
        </nav>
        <div style={{ position: 'absolute', bottom: '2rem' }}>
          <Link to="/" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--text-muted)' }}>
            <LogOut size={20} /> Salir
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Gestor de Menú</h1>
            <p style={{ color: 'var(--text-muted)' }}>Administra tus platillos y categorías</p>
          </div>
          <button className="btn btn-primary"><Plus size={18} /> Agregar Platillo</button>
        </header>

        {/* Mock Table/Grid */}
        <div style={{ backgroundColor: 'var(--secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Nombre</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Categoría</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Precio</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>{item.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{item.price}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.4rem', borderColor: 'transparent' }}><Edit2 size={16} /></button>
                      <button className="btn btn-outline" style={{ padding: '0.4rem', borderColor: 'transparent', color: '#ff5f56' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
