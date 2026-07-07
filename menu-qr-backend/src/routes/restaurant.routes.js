const express = require('express');
const fs = require('fs');
const path = require('path');
const prisma = require('../config/prisma');
const authenticateToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

// Obtener mis restaurantes
router.get('/my-restaurants', authenticateToken, async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { userId: req.userId },
      include: { 
        categories: {
          include: { menuItems: true }
        } 
      }
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los restaurantes' });
  }
});

// Crear un restaurante
router.post('/restaurants', authenticateToken, async (req, res) => {
  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: req.body.name,
        slug: req.body.slug,
        userId: req.userId
      }
    });
    res.json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el restaurante', details: error.message });
  }
});

// Actualizar configuración del restaurante
router.put('/restaurants/:id', authenticateToken, upload.single('logo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, themeColor } = req.body;
    
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant || restaurant.userId !== req.userId) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const updateData = { name, slug, themeColor };
    
    if (req.file) {
      updateData.logoUrl = `/uploads/${req.file.filename}`;
      if (restaurant.logoUrl) {
        const oldPath = path.join(__dirname, '../../', restaurant.logoUrl);
        fs.unlink(oldPath, (err) => {
          if (err) console.error('Error al borrar logo antiguo:', err);
        });
      }
    }

    const updated = await prisma.restaurant.update({
      where: { id },
      data: updateData
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'El enlace (slug) ya está en uso' });
    res.status(500).json({ error: 'Error al actualizar el restaurante', details: error.message });
  }
});

module.exports = router;
