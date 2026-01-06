import TipoCategoria from '../models/TipoCategoria.js';

// @desc    Obtener todos los tipos de categoría
// @route   GET /api/tipos-categoria
// @access  Público
export const obtenerTiposCategorias = async (req, res) => {
  try {
    const tiposCategorias = await TipoCategoria.find()
      .populate('categoria', 'nombre')
      .sort({ nombre: 1 });

    res.json({
      success: true,
      data: tiposCategorias
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los tipos de categoría',
      error: error.message
    });
  }
};

// @desc    Obtener un tipo de categoría por ID
// @route   GET /api/tipos-categoria/:id
// @access  Público
export const obtenerTipoCategoriaPorId = async (req, res) => {
  try {
    const tipoCategoria = await TipoCategoria.findById(req.params.id)
      .populate('categoria', 'nombre descripcion');

    if (!tipoCategoria) {
      return res.status(404).json({
        success: false,
        message: 'Tipo de categoría no encontrado'
      });
    }

    res.json({
      success: true,
      data: tipoCategoria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el tipo de categoría',
      error: error.message
    });
  }
};

// @desc    Crear nuevo tipo de categoría
// @route   POST /api/tipos-categoria
// @access  Privado/Admin
export const crearTipoCategoria = async (req, res) => {
  try {
    const tipoCategoria = await TipoCategoria.create(req.body);

    const tipoCategoriaPoblado = await TipoCategoria.findById(tipoCategoria._id)
      .populate('categoria', 'nombre');

    res.status(201).json({
      success: true,
      message: 'Tipo de categoría creado exitosamente',
      data: tipoCategoriaPoblado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el tipo de categoría',
      error: error.message
    });
  }
};

// @desc    Actualizar tipo de categoría
// @route   PUT /api/tipos-categoria/:id
// @access  Privado/Admin
export const actualizarTipoCategoria = async (req, res) => {
  try {
    const tipoCategoria = await TipoCategoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('categoria', 'nombre');

    if (!tipoCategoria) {
      return res.status(404).json({
        success: false,
        message: 'Tipo de categoría no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Tipo de categoría actualizado exitosamente',
      data: tipoCategoria
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el tipo de categoría',
      error: error.message
    });
  }
};

// @desc    Eliminar tipo de categoría
// @route   DELETE /api/tipos-categoria/:id
// @access  Privado/Admin
export const eliminarTipoCategoria = async (req, res) => {
  try {
    const tipoCategoria = await TipoCategoria.findByIdAndDelete(req.params.id);

    if (!tipoCategoria) {
      return res.status(404).json({
        success: false,
        message: 'Tipo de categoría no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Tipo de categoría eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el tipo de categoría',
      error: error.message
    });
  }
};
