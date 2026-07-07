const express = require('express');
const prisma = require('../config/prisma');
const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { slug },
      include: {
        categories: {
          include: { menuItems: true }
        }
      }
    });
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el menú', details: error.message });
  }
});

module.exports = router;
