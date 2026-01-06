import express from 'express';
import { 
  obtenerCategorias, 
  obtenerCategoriaPorId, 
  crearCategoria, 
  actualizarCategoria, 
  eliminarCategoria 
} from '../controllers/categoria.controller.js';
import { protegerRuta, esAdmin } from '../middlewares/auth.js';
import { 
  validarCrearCategoria, 
  validarActualizarCategoria 
} from '../validations/categoria.validation.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);

// Rutas privadas (solo admin)
router.post(
  '/', 
  protegerRuta, 
  esAdmin, 
  validarCrearCategoria, 
  validarCampos, 
  crearCategoria
);

router.put(
  '/:id', 
  protegerRuta, 
  esAdmin, 
  validarActualizarCategoria, 
  validarCampos, 
  actualizarCategoria
);

router.delete('/:id', protegerRuta, esAdmin, eliminarCategoria);

export default router;
