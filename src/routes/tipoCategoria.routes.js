import express from 'express';
import {
  obtenerTiposCategorias,
  obtenerTipoCategoriaPorId,
  crearTipoCategoria,
  actualizarTipoCategoria,
  eliminarTipoCategoria
} from '../controllers/tipoCategoria.controller.js';

const router = express.Router();

// Rutas públicas
router.get('/tipos-categoria', obtenerTiposCategorias);
router.get('/tipos-categoria/:id', obtenerTipoCategoriaPorId);

// Rutas privadas (sin middleware de autenticación por ahora)
router.post('/create-tipo-categoria', crearTipoCategoria);
router.put('/tipos-categoria/:id', actualizarTipoCategoria);
router.delete('/tipos-categoria/:id', eliminarTipoCategoria);

export default router;
