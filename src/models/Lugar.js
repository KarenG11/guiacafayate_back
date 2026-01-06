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
  tipoCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoCategoria',
    required: [true, 'El tipo es obligatorio']
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
  imagen: {
    type: String,
    trim: true
  },
  redesSociales: {
    facebook: String,
    instagram: String
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
  }
}, {
  timestamps: true
});

const Lugar = mongoose.model('Lugar', lugarSchema);

export default Lugar;
