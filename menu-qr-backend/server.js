require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123'; // En producción, usar una variable de entorno segura

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando localmente 🚀' });
});

// ==========================================
// AUTHENTICATION
// ==========================================

// Registrar un nuevo usuario (dueño de restaurante)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Hashear la contraseña (¡Totalmente real y seguro!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la BD
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generar Token JWT
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Usuario registrado exitosamente', token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
});

// Iniciar sesión
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Comparar la contraseña hasheada
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Generar Token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
});


// ==========================================
// RESTAURANTES
// ==========================================

// Middleware para proteger rutas (requiere JWT)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acceso denegado, token faltante.' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado.' });
    req.userId = decoded.userId;
    next();
  });
};

// Obtener mis restaurantes (ruta protegida)
app.get('/api/my-restaurants', authenticateToken, async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { userId: req.userId },
      include: { categories: true }
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los restaurantes' });
  }
});

// Crear un restaurante
app.post('/api/restaurants', authenticateToken, async (req, res) => {
  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: req.body.name,
        slug: req.body.slug,
        userId: req.userId // Vinculado al usuario que inició sesión
      }
    });
    res.json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el restaurante', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});
