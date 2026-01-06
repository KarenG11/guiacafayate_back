import express from 'express';
import { 
  registro, 
  login, 
  obtenerPerfil, 
  actualizarPerfil,
  cambiarPassword 
} from '../controllers/auth.controller.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', registro);
router.post('/login', login);

// Rutas privadas
router.get('/perfil', obtenerPerfil);
router.put('/perfil', actualizarPerfil);
router.put('/cambiar-password', cambiarPassword);

export default router;
