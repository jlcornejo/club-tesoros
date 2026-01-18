import mongoose from 'mongoose';
import User from '../models/User';

async function fixIndexes() {
  try {
    // Conectar a MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Eliminar todos los índices existentes (excepto _id)
    await User.collection.dropIndexes();
    console.log('✓ Índices eliminados');

    // Recrear los índices desde el schema
    await User.syncIndexes();
    console.log('✓ Índices recreados');

    // Mostrar los índices actuales
    const indexes = await User.collection.getIndexes();
    console.log('\nÍndices actuales:');
    console.log(JSON.stringify(indexes, null, 2));

    await mongoose.disconnect();
    console.log('\n✓ Desconectado de MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixIndexes();
