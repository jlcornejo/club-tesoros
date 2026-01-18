import mongoose, { Schema, model, models } from 'mongoose';

export interface IFeria {
  _id?: string;
  nombre: string;
  fecha: Date;
  descripcion: string;
  estado: 'planificada' | 'activa' | 'finalizada';
  imagen?: string;
  userId?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FeriaSchema = new Schema<IFeria>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la feria es requerido'],
      trim: true,
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha de la feria es requerida'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    estado: {
      type: String,
      enum: ['planificada', 'activa', 'finalizada'],
      default: 'planificada',
    },
    imagen: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Feria || model<IFeria>('Feria', FeriaSchema);
