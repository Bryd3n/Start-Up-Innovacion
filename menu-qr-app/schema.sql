-- ==========================================
-- Esquema de Base de Datos: Menu QR Express
-- Orientado a PostgreSQL (Supabase)
-- ==========================================

-- 1. Tabla de Restaurantes
-- Guarda la información principal del local y la personalización.
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- ID del usuario autenticado (dueño)
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- Usado para la URL del QR: misitio.com/menu/slug-del-local
    logo_url TEXT,
    theme_color VARCHAR(7) DEFAULT '#f97316', -- Color naranja por defecto
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Categorías
-- Permite agrupar los platillos (ej. Entradas, Platos Fuertes, Bebidas)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    position INTEGER DEFAULT 0, -- Para ordenar las categorías en el menú
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Platillos (Menu Items)
-- El catálogo de comida.
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true, -- Permite ocultar platillos agotados rápidamente
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- Índices para mejorar la velocidad de lectura
-- ==========================================
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_categories_restaurant ON categories(restaurant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
