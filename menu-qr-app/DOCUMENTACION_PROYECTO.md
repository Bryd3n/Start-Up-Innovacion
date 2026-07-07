# Documentación de Menu QR Express

## 1. Visión General
**Menu QR Express** es una plataforma SaaS (Software as a Service) que permite a los restaurantes digitalizar su carta en cuestión de minutos. El cliente escanea un código QR en la mesa y accede instantáneamente a un menú interactivo, moderno y móvil.

---

## 2. Estructura de Páginas (Rutas)

La aplicación se divide lógicamente en tres áreas principales:

### A. Sitio Web Público (Landing Page)
* **Ruta:** `/`
* **Público Objetivo:** Dueños de restaurantes (Prospectos).
* **Descripción:** Es la página de presentación del producto. Explica los beneficios, muestra ejemplos de menús digitales y detalla los planes de precios.
* **Componentes clave:** Hero Section, Features (Beneficios), Pricing (Planes), Footer.

### B. Panel Administrativo (Dashboard del Restaurante)
* **Rutas:** 
  * `/admin/login` - Inicio de sesión para dueños.
  * `/admin/dashboard` - Resumen de su cuenta, visitas totales, accesos rápidos.
  * `/admin/categorias` - Gestión (CRUD: Crear, Leer, Actualizar, Borrar) de categorías (Ej: Entradas, Bebidas, Postres).
  * `/admin/platillos` - Gestión (CRUD) de platillos (Nombre, precio, foto, descripción, estado activo/agotado).
  * `/admin/qr` - Pantalla para generar, previsualizar y descargar el código QR en alta calidad para imprimirlo.
* **Público Objetivo:** Administradores y dueños de restaurantes.

### C. Vista del Comensal (Menú Digital)
* **Ruta:** `/menu/:restaurantId` (Ejemplo: `/menu/la-parrilla-del-chef`)
* **Público Objetivo:** Clientes sentados en el restaurante.
* **Descripción:** Interfaz 100% enfocada en móviles (*mobile-first*). Los clientes navegan por el menú de manera fluida. 
* **Componentes clave:** Header del restaurante (Logo y portada), Filtros por categoría, Lista de platillos con imágenes y precios. *(Opción futura: Carrito de compras para pedir directo desde la mesa)*.

---

## 3. Flujo de Funcionamiento (Paso a Paso)

1. **El Restaurante se registra:** El dueño entra a la Landing Page, selecciona un plan y crea su cuenta.
2. **Configuración Inicial:** Accede al *Panel Administrativo*. Sube el logo de su restaurante y configura su información básica (nombre, colores).
3. **Carga de Menú:** El dueño crea categorías ("Carnes", "Bebidas") y añade los platillos con fotos y precios.
4. **Generación del QR:** El sistema autogenera un link único (`/menu/su-restaurante`) y crea un código QR que apunta a ese link. El dueño lo descarga y lo imprime para sus mesas.
5. **El Cliente Escanea:** Un comensal llega al local, escanea el QR con la cámara de su celular.
6. **Experiencia del Cliente:** El navegador del comensal abre la *Vista del Comensal*. No necesita descargar ninguna app. Ve el menú siempre actualizado en tiempo real.

---

## 4. Arquitectura y Tecnologías Recomendadas

* **Frontend (App del Comensal y Dashboard):** React con Vite. Uso de `framer-motion` para animaciones, `lucide-react` para iconos y `React Router` para la navegación entre páginas.
* **Backend (API):** Node.js con Express (o directamente Backend-as-a-Service como **Supabase** o **Firebase** para acelerar el desarrollo del equipo).
* **Base de Datos (Recomendada):** PostgreSQL (estructurada para relaciones: Restaurante -> Categorías -> Platillos).
* **Almacenamiento (Imágenes):** Cloudinary, Supabase Storage o AWS S3 para guardar las fotos de los platillos.

---

## 5. Estructura de Carpetas (Sugerida)
```text
menu-qr-app/
├── public/                 # Assets públicos (favicon)
├── src/
│   ├── assets/             # Imágenes locales
│   ├── components/         # Componentes reutilizables (Botones, Tarjetas, Navbar)
│   ├── pages/
│   │   ├── Landing/        # Páginas del sitio público
│   │   ├── Admin/          # Páginas del dashboard (Login, Dashboard, Menús)
│   │   └── MenuClient/     # Páginas de la vista del comensal
│   ├── context/            # Estados globales (Autenticación, Datos del restaurante)
│   ├── hooks/              # Custom React Hooks
│   ├── services/           # Conexiones a la API (Ej: api.js, supabase.js)
│   ├── App.jsx             # Punto de entrada y enrutador (React Router)
│   └── main.jsx            # Render de React
└── package.json            # Dependencias
```
