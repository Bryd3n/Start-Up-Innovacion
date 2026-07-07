const express = require('express');
const prisma = require('../config/prisma');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, name } = req.body;
    
    const newCategory = await prisma.category.create({
      data: { restaurantId, name }
    });
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría', details: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const updated = await prisma.category.update({
      where: { id },
      data: { name }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría', details: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría', details: error.message });
  }
});

module.exports = router;
