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

const router = express.Router();

// Rutas especiales (DEBEN IR PRIMERO antes de las rutas con parámetros)
router.get('/lugares/destacados/all', obtenerLugaresDestacados);
router.get('/lugares/sponsors/oro', obtenerSponsors);

router.get('/lugares', obtenerLugares);
router.get('/lugar/:id', obtenerLugarPorId);

router.post(
  '/create-lugar',
  crearLugar
);

router.put(
  '/lugar/:id',
  actualizarLugar
);

router.delete('/lugar/:id', protegerRuta, esAdmin, eliminarLugar);

export default router;
