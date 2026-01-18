import mongoose, { Schema, model, models } from 'mongoose';

export interface IProducto {
  _id?: string;
  nombre: string;
  descripcion: string;
  categoria: 'juguete' | 'libro' | 'ropa' | 'electronico' | 'otro';
  precio: number;
  imagenes: string[]; // URLs de S3
  vendedor: string;
  userId: string;
  feriaId: string;
  vendido: boolean;
  estado: number; // 0-5 estrellas (0=para reparar, 5=nuevo)
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductoSchema = new Schema<IProducto>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
    categoria: {
      type: String,
      enum: ['juguete', 'libro', 'ropa', 'electronico', 'otro'],
      required: [true, 'La categoría es requerida'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    imagenes: {
      type: [String],
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.length <= 5;
        },
        message: 'No puedes subir más de 5 imágenes por producto',
      },
    },
    vendedor: {
      type: String,
      required: [true, 'El nombre del vendedor es requerido'],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, 'El ID del usuario es requerido'],
      index: true,
    },
    feriaId: {
      type: String,
      required: [true, 'El ID de la feria es requerido'],
      index: true,
    },
    vendido: {
      type: Boolean,
      default: false,
    },
    estado: {
      type: Number,
      required: [true, 'El estado del producto es requerido'],
      min: [0, 'El estado mínimo es 0 estrellas'],
      max: [5, 'El estado máximo es 5 estrellas'],
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Índice compuesto para búsquedas eficientes
ProductoSchema.index({ feriaId: 1, userId: 1 });
ProductoSchema.index({ feriaId: 1, vendido: 1 });

export default models.Producto || model<IProducto>('Producto', ProductoSchema);
