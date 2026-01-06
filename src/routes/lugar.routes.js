import express from 'express';
import {
  obtenerLugares,
  obtenerLugarPorId,
  crearLugar,
  actualizarLugar,
  eliminarLugar,
  obtenerLugaresDestacados,
  obtenerSponsors
} from '../controllers/lugar.controller.js';
import { protegerRuta, esAdmin } from '../middlewares/auth.js';
import {
  validarCrearLugar,
  validarActualizarLugar
} from '../validations/lugar.validation.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = express.Router();

// Rutas especiales (DEBEN IR PRIMERO antes de las rutas con parámetros)
router.get('/lugares/destacados/all', obtenerLugaresDestacados);
router.get('/lugares/sponsors/oro', obtenerSponsors);

// Rutas públicas
router.get('/lugares', obtenerLugares);
router.get('/lugares/:id', obtenerLugarPorId);

// Rutas privadas (solo admin)
router.post(
  '/lugares',
  protegerRuta,
  esAdmin,
  validarCrearLugar,
  validarCampos,
  crearLugar
);

router.put(
  '/lugares/:id',
  protegerRuta,
  esAdmin,
  validarActualizarLugar,
  validarCampos,
  actualizarLugar
);

router.delete('/lugares/:id', protegerRuta, esAdmin, eliminarLugar);

export default router;
