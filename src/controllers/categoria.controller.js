import Categoria from '../models/Categoria.js';
import { manejarErrorDB } from '../helpers/errorHandler.js';

// @desc    Obtener todas las categorías
// @route   GET /api/categorias
// @access  Público
export const obtenerCategorias = async (req, res) => {
  try {
    const { activo } = req.query;
    
    const filtro = {};
    if (activo !== undefined) {
      filtro.activo = activo === 'true';
    }

    const categorias = await Categoria.find(filtro).sort({ orden: 1, nombre: 1 });

    res.json({
      success: true,
      count: categorias.length,
      data: categorias
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las categorías',
      error: error.message
    });
  }
};

// @desc    Obtener una categoría por ID
// @route   GET /api/categorias/:id
// @access  Público
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    res.json({
      success: true,
      data: categoria
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Crear nueva categoría
// @route   POST /api/categorias
// @access  Privado/Admin
export const crearCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: categoria
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Actualizar categoría
// @route   PUT /api/categorias/:id
// @access  Privado/Admin
export const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: categoria
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Eliminar categoría
// @route   DELETE /api/categorias/:id
// @access  Privado/Admin
export const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Categoría eliminada exitosamente',
      data: {}
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};
