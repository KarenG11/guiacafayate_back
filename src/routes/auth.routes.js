import express from 'express';
import { 
  registro, 
  login, 
  obtenerPerfil, 
  actualizarPerfil,
  cambiarPassword 
} from '../controllers/auth.controller.js';
import { protegerRuta } from '../middlewares/auth.js';
import { validarRegistro, validarLogin } from '../validations/auth.validation.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', validarRegistro, validarCampos, registro);
router.post('/login', validarLogin, validarCampos, login);

// Rutas privadas
router.get('/perfil', protegerRuta, obtenerPerfil);
router.put('/perfil', protegerRuta, actualizarPerfil);
router.put('/cambiar-password', protegerRuta, cambiarPassword);

export default router;
