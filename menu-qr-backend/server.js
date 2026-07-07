require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API de Menu QR Express funcionando localmente 🚀' });
});

// Obtener todos los restaurantes
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        categories: true
      }
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los restaurantes' });
  }
});

// Crear un restaurante rápido para probar
app.post('/api/restaurants', async (req, res) => {
  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: req.body.name || 'Mi Primer Restaurante',
        slug: req.body.slug || 'mi-primer-restaurante',
        userId: 'demo-user-id-123'
      }
    });
    res.json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el restaurante', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
  console.log(`Prueba el endpoint: http://localhost:${PORT}/api/health`);
});
