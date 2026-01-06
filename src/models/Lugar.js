import mongoose from 'mongoose';

const lugarSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del lugar es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es obligatoria']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  },
  whatsApp: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  website: {
    type: String,
    trim: true
  },
  horarios: {
    type: String,
    trim: true
  },
  imagenes: [{
    type: String,
    trim: true
  }],
  logo: {
    type: String,
    trim: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  redesSociales: {
    facebook: String,
    instagram: String,
  },
  nivel: {
    type: String,
    enum: ['Bronce', 'Plata', 'Oro'],
    default: 'Bronce'
  },
  status: {
    type: Boolean,
    default: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  verificado: {
    type: Boolean,
    default: false
  },
  destacado: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Índice para búsquedas
lugarSchema.index({ nombre: 'text', descripcion: 'text' });

const Lugar = mongoose.model('Lugar', lugarSchema);

export default Lugar;
