import mongoose, { Schema, model, models } from 'mongoose';

export interface IProducto {
  _id?: string;
  nombre: string;
  descripcion: string;
  categoria: 'juguete' | 'libro' | 'ropa' | 'electronico' | 'otro';
  precio: number;
  imagen?: string;
  vendedor: string;
  userId?: string;
  feriaId: string;
  vendido: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductoSchema = new Schema<IProducto>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    categoria: {
      type: String,
      enum: ['juguete', 'libro', 'ropa', 'electronico', 'otro'],
      required: [true, 'La categoría es requerida'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: 0,
    },
    imagen: {
      type: String,
    },
    vendedor: {
      type: String,
      required: [true, 'El nombre del vendedor es requerido'],
      trim: true,
    },
    userId: {
      type: String,
      index: true,
    },
    feriaId: {
      type: String,
      required: [true, 'El ID de la feria es requerido'],
    },
    vendido: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Producto || model<IProducto>('Producto', ProductoSchema);
