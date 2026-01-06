import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/database.js';
import authRoutes from './src/routes/auth.routes.js';
import categoriaRoutes from './src/routes/categoria.routes.js';
import lugarRoutes from './src/routes/lugar.routes.js';

// Crear aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Puerto
const PORT = process.env.PORT;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost`, PORT);
  console.log(`📍 Ambiente: development`);
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', lugarRoutes);

export default app;
