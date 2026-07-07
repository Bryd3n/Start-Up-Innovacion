const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const categoryRoutes = require('./routes/category.routes');
const menuRoutes = require('./routes/menu.routes');
const publicRoutes = require('./routes/public.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando localmente 🚀' });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', restaurantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menu-items', menuRoutes);
app.use('/api/menu', publicRoutes);

module.exports = app;
