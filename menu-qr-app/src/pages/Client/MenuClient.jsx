import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChefHat, Info, Search } from 'lucide-react';
import '../../index.css';

export default function MenuClient() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/${slug}`);
        if (!response.ok) {
          throw new Error('Restaurante no encontrado o menú no disponible.');
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <ChefHat size={48} style={{ color: 'var(--primary)', marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
          <h2>Cargando menú...</h2>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'white' }}>
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(255, 95, 86, 0.1)', borderRadius: '12px' }}>
          <Info size={48} style={{ color: '#ff5f56', marginBottom: '1rem' }} />
          <h2>Lo sentimos</h2>
          <p>{error || 'No se pudo cargar el menú.'}</p>
        </div>
      </div>
    );
  }

  // Filtrado de categorías y búsqueda
  const allCategories = ['Todos', ...restaurant.categories.map(c => c.name)];
  
  const filteredCategories = restaurant.categories.map(category => {
    const filteredItems = category.menuItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return { ...category, menuItems: filteredItems };
  }).filter(category => 
    (activeCategory === 'Todos' || category.name === activeCategory) && 
    category.menuItems.length > 0
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'white', paddingBottom: '4rem' }}>
      {/* Header del Restaurante */}
      <div style={{ 
        backgroundColor: 'var(--secondary)', 
        padding: '3rem 1.5rem', 
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{restaurant.name}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Descubre nuestros deliciosos platillos</p>
        
        {/* Buscador */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          borderRadius: '50px', 
          padding: '0.75rem 1.5rem', 
          border: '1px solid rgba(255,255,255,0.1)',
          maxWidth: '500px',
          margin: '2rem auto 0 auto'
        }}>
          <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '1rem' }} />
          <input 
            type="text" 
            placeholder="Buscar platillo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', fontSize: '1rem' }} 
          />
        </div>
      </div>

      {/* Categorías (Pills) */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        padding: '1.5rem', 
        overflowX: 'auto',
        maxWidth: '800px',
        margin: '0 auto',
        scrollbarWidth: 'none' // Firefox
      }}>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: '500',
              transition: 'all 0.2s',
              backgroundColor: activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat ? 'white' : 'var(--text-muted)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de Menú */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        {filteredCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No se encontraron platillos.
          </div>
        ) : (
          filteredCategories.map(category => (
            <div key={category.id} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                {category.name}
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {category.menuItems.map(item => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    backgroundColor: 'var(--secondary)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.02)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ display: 'flex', flex: 1 }}>
                      {item.imageUrl && (
                        <img 
                          src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`} 
                          alt={item.name} 
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginRight: '1rem' }} 
                        />
                      )}
                      <div style={{ paddingRight: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>{item.name}</h3>
                        {item.description && (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 'bold', 
                      color: 'var(--primary)',
                      whiteSpace: 'nowrap'
                    }}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
