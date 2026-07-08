import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTree, QrCode, LogOut, Plus, Edit2, Trash2, X, Image as ImageIcon, Settings } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';
import '../../index.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resumen'); // 'resumen' | 'categorias' | 'qr' | 'settings'
  const navigate = useNavigate();

  // Modals State
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // Editing States
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Form States
  const [itemFormData, setItemFormData] = useState({
    name: '', description: '', price: '', categoryId: '', isAvailable: true, image: null
  });
  const [itemImagePreview, setItemImagePreview] = useState(null);
  
  const [categoryName, setCategoryName] = useState('');
  
  const [settingsFormData, setSettingsFormData] = useState({
    name: '', slug: '', themeColor: '', logo: null
  });
  const [settingsLogoPreview, setSettingsLogoPreview] = useState(null);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/my-restaurants`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await res.json();
      if (data && data.length > 0) {
        const rest = data[0];
        setRestaurant(rest);
        setCategories(rest.categories);
        
        const allItems = [];
        rest.categories.forEach(cat => {
          cat.menuItems.forEach(item => {
            allItems.push({ ...item, categoryName: cat.name });
          });
        });
        setItems(allItems);

        // Init Settings Form
        setSettingsFormData({
          name: rest.name,
          slug: rest.slug,
          themeColor: rest.themeColor || '#f97316',
          logo: null
        });
        setSettingsLogoPreview(rest.logoUrl ? `${API_URL}${rest.logoUrl}` : null);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- ITEM HANDLERS ---
  const handleOpenItemModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setItemFormData({
        name: item.name,
        description: item.description || '',
        price: item.price,
        categoryId: item.categoryId,
        isAvailable: item.isAvailable,
        image: null
      });
      setItemImagePreview(item.imageUrl ? `${API_URL}${item.imageUrl}` : null);
    } else {
      setEditingItem(null);
      setItemFormData({ name: '', description: '', price: '', categoryId: '', isAvailable: true, image: null });
      setItemImagePreview(null);
    }
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!itemFormData.categoryId) return toast.error('Selecciona una categoría');
    
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Guardando platillo...');

    const formDataToSend = new FormData();
    formDataToSend.append('categoryId', itemFormData.categoryId);
    formDataToSend.append('name', itemFormData.name);
    formDataToSend.append('description', itemFormData.description);
    formDataToSend.append('price', itemFormData.price);
    formDataToSend.append('isAvailable', itemFormData.isAvailable);
    if (itemFormData.image) {
      formDataToSend.append('image', itemFormData.image);
    }

    try {
      const url = editingItem 
        ? `${API_URL}/api/menu-items/${editingItem.id}`
        : `${API_URL}/api/menu-items`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      if (res.ok) {
        toast.success(editingItem ? 'Platillo actualizado' : 'Platillo creado', { id: toastId });
        setIsItemModalOpen(false);
        fetchDashboardData();
      } else {
        toast.error('Error al guardar platillo', { id: toastId });
      }
    } catch (err) {
      toast.error('Error de red', { id: toastId });
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este platillo?')) return;
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Eliminando...');
    try {
      const res = await fetch(`${API_URL}/api/menu-items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Platillo eliminado', { id: toastId });
        fetchDashboardData();
      }
    } catch (err) {
      toast.error('Error al eliminar', { id: toastId });
    }
  };

  // --- CATEGORY HANDLERS ---
  const handleOpenCategoryModal = (cat = null) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryName(cat.name);
    } else {
      setEditingCategory(null);
      setCategoryName('');
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Guardando categoría...');

    try {
      const url = editingCategory 
        ? `${API_URL}/api/categories/${editingCategory.id}`
        : `${API_URL}/api/categories`;
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName, restaurantId: restaurant.id })
      });

      if (res.ok) {
        toast.success(editingCategory ? 'Categoría actualizada' : 'Categoría creada', { id: toastId });
        setIsCategoryModalOpen(false);
        fetchDashboardData();
      } else {
        toast.error('Error al guardar categoría', { id: toastId });
      }
    } catch (err) {
      toast.error('Error de red', { id: toastId });
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Eliminar categoría? Se eliminarán todos sus platillos.')) return;
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Eliminando...');
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Categoría eliminada', { id: toastId });
        fetchDashboardData();
      }
    } catch (err) {
      toast.error('Error al eliminar', { id: toastId });
    }
  };

  // --- SETTINGS HANDLER ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Guardando configuración...');

    const formDataToSend = new FormData();
    formDataToSend.append('name', settingsFormData.name);
    formDataToSend.append('slug', settingsFormData.slug);
    formDataToSend.append('themeColor', settingsFormData.themeColor);
    if (settingsFormData.logo) {
      formDataToSend.append('logo', settingsFormData.logo);
    }

    try {
      const res = await fetch(`${API_URL}/api/restaurants/${restaurant.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      if (res.ok) {
        toast.success('Configuración guardada', { id: toastId });
        fetchDashboardData();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Error al guardar', { id: toastId });
      }
    } catch (err) {
      toast.error('Error de red', { id: toastId });
    }
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-color)', color: 'white' }}>Cargando...</div>;
  }

  const menuUrl = restaurant ? `${window.location.protocol}//${window.location.host}/menu/${restaurant.slug}` : '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'white' }}>
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="no-print" style={{ width: '250px', backgroundColor: 'var(--secondary)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', userSelect: 'none', pointerEvents: 'none' }}>
          <img src="/logo.jpg" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '8px', mixBlendMode: 'screen' }} />
          <h2 style={{ fontSize: '1.2rem', textAlign: 'left', margin: 0 }}>MenuQR<span style={{ color: 'var(--primary)' }}>Express</span></h2>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <button 
            onClick={() => setActiveTab('resumen')}
            className="btn btn-outline" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'resumen' ? 'rgba(249,115,22,0.1)' : 'transparent', color: activeTab === 'resumen' ? 'var(--primary)' : 'white' }}>
            <LayoutDashboard size={20} /> Platillos
          </button>
          <button 
            onClick={() => setActiveTab('categorias')}
            className="btn btn-outline" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'categorias' ? 'rgba(249,115,22,0.1)' : 'transparent', color: activeTab === 'categorias' ? 'var(--primary)' : 'white' }}>
            <ListTree size={20} /> Categorías
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className="btn btn-outline" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'settings' ? 'rgba(249,115,22,0.1)' : 'transparent', color: activeTab === 'settings' ? 'var(--primary)' : 'white' }}>
            <Settings size={20} /> Configuración
          </button>
          <button 
            onClick={() => setActiveTab('qr')}
            className="btn btn-outline" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'qr' ? 'rgba(249,115,22,0.1)' : 'transparent', color: activeTab === 'qr' ? 'var(--primary)' : 'white' }}>
            <QrCode size={20} /> Generador QR
          </button>
        </nav>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
          <button onClick={() => navigate('/')} className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--text-muted)' }}>
            Volver al inicio
          </button>
          <button onClick={handleLogout} className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', color: '#ef4444' }}>
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>{restaurant?.name || 'Gestor de Menú'}</h1>
            <p style={{ color: 'var(--text-muted)' }}>
              {activeTab === 'resumen' && 'Administra tus platillos'}
              {activeTab === 'categorias' && 'Administra las categorías de tu menú'}
              {activeTab === 'settings' && 'Configura los detalles de tu negocio'}
              {activeTab === 'qr' && 'Imprime y comparte tu Menú QR'}
            </p>
          </div>
          {activeTab === 'resumen' && (
            <button className="btn btn-primary" onClick={() => handleOpenItemModal()}><Plus size={18} /> Agregar Platillo</button>
          )}
          {activeTab === 'categorias' && (
            <button className="btn btn-primary" onClick={() => handleOpenCategoryModal()}><Plus size={18} /> Nueva Categoría</button>
          )}
        </header>

        {/* TAB: Platillos */}
        {activeTab === 'resumen' && (
          <div style={{ backgroundColor: 'var(--secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Imagen</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Nombre</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Categoría</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Precio</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Estado</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay platillos registrados aún.</td>
                  </tr>
                ) : items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>
                      {item.imageUrl ? (
                        <img src={`${API_URL}${item.imageUrl}`} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ImageIcon size={20} color="var(--text-muted)" /></div>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>{item.name}</td>
                    <td style={{ padding: '1rem' }}><span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>{item.categoryName}</span></td>
                    <td style={{ padding: '1rem' }}>${item.price.toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}><span style={{ color: item.isAvailable ? '#4ade80' : '#f87171', fontSize: '0.9rem' }}>{item.isAvailable ? 'Disponible' : 'Agotado'}</span></td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenItemModal(item)} className="btn btn-outline" style={{ padding: '0.4rem', borderColor: 'transparent' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteItem(item.id)} className="btn btn-outline" style={{ padding: '0.4rem', borderColor: 'transparent', color: '#ff5f56' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: Categorias */}
        {activeTab === 'categorias' && (
          <div style={{ backgroundColor: 'var(--secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Nombre</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Platillos Asociados</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay categorías.</td></tr>
                ) : categories.map((cat) => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>{cat.name}</td>
                    <td style={{ padding: '1rem' }}>{cat.menuItems?.length || 0} platillos</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenCategoryModal(cat)} className="btn btn-outline" style={{ padding: '0.4rem', borderColor: 'transparent' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="btn btn-outline" style={{ padding: '0.4rem', borderColor: 'transparent', color: '#ff5f56' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: Configuración */}
        {activeTab === 'settings' && (
          <div style={{ backgroundColor: 'var(--secondary)', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '600px' }}>
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre del Restaurante</label>
                <input 
                  type="text" value={settingsFormData.name} onChange={(e) => setSettingsFormData({...settingsFormData, name: e.target.value})} required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Enlace / Slug (ej. mi-restaurante)</label>
                <input 
                  type="text" value={settingsFormData.slug} onChange={(e) => setSettingsFormData({...settingsFormData, slug: e.target.value})} required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Guardar Cambios</button>
            </form>
          </div>
        )}

        {/* TAB: Generador QR */}
        {activeTab === 'qr' && restaurant && (
          <div className="print-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--secondary)', borderRadius: '12px', padding: '4rem', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>El QR de tu Restaurante</h2>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <QRCodeSVG value={menuUrl} size={250} level={"H"} />
            </div>
            <p className="no-print" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Enlace directo a tu menú:</p>
            <a href={menuUrl} className="no-print" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', wordBreak: 'break-all', textAlign: 'center', marginBottom: '2rem' }}>
              {menuUrl}
            </a>
            <button onClick={() => window.print()} className="btn btn-primary no-print" style={{ width: '100%', justifyContent: 'center' }}>
              Imprimir Código QR
            </button>
          </div>
        )}
      </main>

      {/* CRUD Modals */}
      {isItemModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--secondary)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editingItem ? 'Editar Platillo' : 'Nuevo Platillo'}</h2>
              <button onClick={() => setIsItemModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Imagen del platillo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {itemImagePreview ? (
                    <img src={itemImagePreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ImageIcon size={24} color="var(--text-muted)" /></div>
                  )}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) { setItemFormData({...itemFormData, image: file}); setItemImagePreview(URL.createObjectURL(file)); }
                  }} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre</label>
                <input type="text" value={itemFormData.name} onChange={(e) => setItemFormData({...itemFormData, name: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Descripción</label>
                <textarea value={itemFormData.description} onChange={(e) => setItemFormData({...itemFormData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Precio ($)</label>
                  <input type="number" min="0" step="0.01" value={itemFormData.price} onChange={(e) => setItemFormData({...itemFormData, price: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Categoría</label>
                  <select value={itemFormData.categoryId} onChange={(e) => setItemFormData({...itemFormData, categoryId: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                    {categories.map(c => <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="isAvailable" checked={itemFormData.isAvailable} onChange={(e) => setItemFormData({...itemFormData, isAvailable: e.target.checked})} />
                <label htmlFor="isAvailable" style={{ color: 'white' }}>Platillo disponible al público</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                {editingItem ? 'Guardar Cambios' : 'Crear Platillo'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isCategoryModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--secondary)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre de la Categoría</label>
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
