const express = require('express');
const fs = require('fs');
const path = require('path');
const prisma = require('../config/prisma');
const authenticateToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { categoryId, name, description, price, isAvailable } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newItem = await prisma.menuItem.create({
      data: {
        categoryId,
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        isAvailable: isAvailable === 'true' || isAvailable === true
      }
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear platillo', details: error.message });
  }
});

router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, isAvailable } = req.body;
    
    const existingItem = await prisma.menuItem.findUnique({ where: { id } });
    if (!existingItem) return res.status(404).json({ error: 'Platillo no encontrado' });

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      isAvailable: isAvailable === 'true' || isAvailable === true
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      if (existingItem.imageUrl) {
        const oldPath = path.join(__dirname, '../../', existingItem.imageUrl);
        fs.unlink(oldPath, (err) => {
          if (err) console.error('Error al borrar imagen antigua:', err);
        });
      }
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: updateData
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar platillo', details: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const existingItem = await prisma.menuItem.findUnique({ where: { id } });
    
    if (existingItem && existingItem.imageUrl) {
      const imgPath = path.join(__dirname, '../../', existingItem.imageUrl);
      fs.unlink(imgPath, (err) => {
        if (err) console.error('Error al borrar imagen asociada:', err);
      });
    }

    await prisma.menuItem.delete({ where: { id } });
    res.json({ message: 'Platillo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar platillo', details: error.message });
  }
});

module.exports = router;
