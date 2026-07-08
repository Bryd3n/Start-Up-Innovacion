const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.restaurant.create({
      data: {
        userId: newUser.id,
        name: `Restaurante de ${name}`,
        slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`,
        categories: {
          create: [
            {
              name: 'Principales',
              menuItems: {
                create: [
                  { name: 'Hamburguesa Doble', price: 8.99, description: 'Con queso y tocino' },
                  { name: 'Pizza Pepperoni', price: 12.50, description: 'Tamaño familiar' }
                ]
              }
            },
            {
              name: 'Bebidas',
              menuItems: {
                create: [
                  { name: 'Coca Cola', price: 2.00 },
                  { name: 'Jugo Natural', price: 3.50 }
                ]
              }
            }
          ]
        }
      }
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Usuario registrado exitosamente', token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
});

module.exports = router;
