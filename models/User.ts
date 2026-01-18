import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'user';
  googleId?: string;
  emailVerified?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    emailVerified: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Los índices ya están definidos con unique: true en el schema
// No es necesario declararlos nuevamente

export default models.User || model<IUser>('User', UserSchema);
