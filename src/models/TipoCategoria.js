import mongoose from 'mongoose';

const tipoCategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del tipo es obligatorio'],
    trim: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es obligatoria']
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Evita tipos duplicados dentro de la misma categoría
tipoCategoriaSchema.index({ nombre: 1, categoria: 1 }, { unique: true });

const TipoCategoria = mongoose.model('TipoCategoria', tipoCategoriaSchema);

export default TipoCategoria;
