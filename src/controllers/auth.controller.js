import User from '../models/User.js';
import { generarJWT } from '../helpers/generarJWT.js';

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/registro
// @access  PÃºblico
export const registro = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Crear usuario
    const user = await User.create({
      nombre,
      email,
      password,
      rol: rol || 'usuario'
    });

    // Generar token
    const token = generarJWT(user._id);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  PÃºblico
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales invÃ¡lidas'
      });
    }

    // Verificar si el usuario estÃ¡ activo
    if (!user.activo) {
      return res.status(401).json({
        success: false,
        message: 'Usuario desactivado'
      });
    }

    // Verificar contraseÃ±a
    const passwordCorrecta = await user.compararPassword(password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales invÃ¡lidas'
      });
    }

    // Generar token
    const token = generarJWT(user._id);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/perfil
// @access  Privado
export const obtenerPerfil = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// @desc    Actualizar perfil de usuario
// @route   PUT /api/auth/perfil
// @access  Privado
export const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, email } = req.body;

    const camposActualizar = {};
    if (nombre) camposActualizar.nombre = nombre;
    if (email) camposActualizar.email = email;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      camposActualizar,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: user
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Cambiar contraseÃ±a
// @route   PUT /api/auth/cambiar-password
// @access  Privado
export const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Verificar contraseÃ±a actual
    const passwordCorrecta = await user.compararPassword(passwordActual);

    if (!passwordCorrecta) {
      return res.status(401).json({
        success: false,
        message: 'ContraseÃ±a actual incorrecta'
      });
    }

    // Actualizar contraseÃ±a
    user.password = passwordNuevo;
    await user.save();

    res.json({
      success: true,
      message: 'ContraseÃ±a actualizada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};
