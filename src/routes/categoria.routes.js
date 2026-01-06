import express from 'express';
import { 
  obtenerCategorias, 
  obtenerCategoriaPorId, 
  crearCategoria, 
  actualizarCategoria, 
  eliminarCategoria 
} from '../controllers/categoria.controller.js';
import { protegerRuta, esAdmin } from '../middlewares/auth.js';

import { validarCampos } from '../middlewares/validar-campos.js';

const router = express.Router();

// Rutas públicas
router.get('/categorias', obtenerCategorias);
router.get('/categorias/:id', obtenerCategoriaPorId);

// Rutas privadas (solo admin)
router.post(
  '/create-categoria', 
  crearCategoria
);

router.put(
  '/categoria/:id', 
  actualizarCategoria
);

router.delete('/categoria/:id', protegerRuta, esAdmin, eliminarCategoria);

export default router;
