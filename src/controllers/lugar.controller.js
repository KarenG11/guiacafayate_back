import Lugar from '../models/Lugar.js';
import Categoria from '../models/Categoria.js';
import { manejarErrorDB } from '../helpers/errorHandler.js';

// @desc    Obtener todos los lugares
// @route   GET /api/lugares
// @access  Público
export const obtenerLugares = async (req, res) => {
  try {

    const lugares = await Lugar.find()
      .populate('categoria', 'nombre descripcion icono')
      .sort({ destacado: -1, nivel: -1, nombre: 1 });

    res.status(200).json({
      success: true,
      count: lugares.length,
      data: lugares
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los lugares',
      error: error.message
    });
  }
};

// @desc    Obtener un lugar por ID
// @route   GET /api/lugares/:id
// @access  Público
export const obtenerLugarPorId = async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id)
      .populate('categoria', 'nombre descripcion icono')
      .populate('createdBy', 'nombre email');

    if (!lugar) {
      return res.status(404).json({
        success: false,
        message: 'Lugar no encontrado'
      });
    }

    res.json({
      success: true,
      data: lugar
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Crear nuevo lugar
// @route   POST /api/lugares
// @access  Privado/Admin
export const crearLugar = async (req, res) => {
  try {
    // Verificar que la categoría existe
    const categoria = await Categoria.findById(req.body.categoria);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Agregar el usuario que crea el lugar
    req.body.createdBy = req.user._id;

    const lugar = await Lugar.create(req.body);

    // Obtener el lugar con las relaciones pobladas
    const lugarPoblado = await Lugar.findById(lugar._id)
      .populate('categoria', 'nombre descripcion icono')
      .populate('createdBy', 'nombre email');

    res.status(201).json({
      success: true,
      message: 'Lugar creado exitosamente',
      data: lugarPoblado
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Actualizar lugar
// @route   PUT /api/lugares/:id
// @access  Privado/Admin
export const actualizarLugar = async (req, res) => {
  try {
    // Si se actualiza la categoría, verificar que existe
    if (req.body.categoria) {
      const categoria = await Categoria.findById(req.body.categoria);

      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }
    }

    const lugar = await Lugar.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('categoria', 'nombre descripcion icono')
      .populate('createdBy', 'nombre email');

    if (!lugar) {
      return res.status(404).json({
        success: false,
        message: 'Lugar no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Lugar actualizado exitosamente',
      data: lugar
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Eliminar lugar
// @route   DELETE /api/lugares/:id
// @access  Privado/Admin
export const eliminarLugar = async (req, res) => {
  try {
    const lugar = await Lugar.findByIdAndDelete(req.params.id);

    if (!lugar) {
      return res.status(404).json({
        success: false,
        message: 'Lugar no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Lugar eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    const errorResponse = manejarErrorDB(error);
    res.status(400).json(errorResponse);
  }
};

// @desc    Obtener lugares destacados
// @route   GET /api/lugares/destacados/all
// @access  Público
export const obtenerLugaresDestacados = async (req, res) => {
  try {
    const lugares = await Lugar.find({ destacado: true, activo: true })
      .populate('categoria', 'nombre descripcion icono')
      .sort({ nivel: -1, nombre: 1 })
      .limit(10);

    res.json({
      success: true,
      count: lugares.length,
      data: lugares
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener lugares destacados',
      error: error.message
    });
  }
};

// @desc    Obtener sponsors (lugares nivel Oro)
// @route   GET /api/lugares/sponsors/oro
// @access  Público
export const obtenerSponsors = async (req, res) => {
  try {
    const sponsors = await Lugar.find({
      nivel: 'Oro',
      activo: true,
      logo: { $ne: null }
    })
      .populate('categoria', 'nombre descripcion icono')
      .sort({ nombre: 1 });

    res.json({
      success: true,
      count: sponsors.length,
      data: sponsors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sponsors',
      error: error.message
    });
  }
};
