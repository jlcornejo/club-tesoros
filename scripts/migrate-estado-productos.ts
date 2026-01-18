import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor define MONGODB_URI en tu archivo .env.local');
}

// Mapeo de estados antiguos a nuevos (estrellas)
const estadoMap: Record<string, number> = {
  'nuevo': 5,
  'como_nuevo': 4,
  'usado': 3,
  'para_reparar': 0,
};

async function migrateEstadoProductos() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Conectando a MongoDB...');
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    const db = client.db('club-tesoros');
    const productosCollection = db.collection('productos');

    // Obtener todos los productos
    const productos = await productosCollection.find({}).toArray();
    console.log(`\n📦 Encontrados ${productos.length} productos`);

    let migrados = 0;
    let yaNumeros = 0;
    let errores = 0;

    for (const producto of productos) {
      try {
        const estadoActual = producto.estado;

        // Si ya es un número, no hacer nada
        if (typeof estadoActual === 'number') {
          yaNumeros++;
          continue;
        }

        // Si es un string, convertir
        if (typeof estadoActual === 'string') {
          const nuevoEstado = estadoMap[estadoActual] ?? 3; // Default: 3 estrellas (usado)
          
          await productosCollection.updateOne(
            { _id: producto._id },
            { $set: { estado: nuevoEstado } }
          );

          console.log(`  ✓ ${producto.nombre}: "${estadoActual}" → ${nuevoEstado} estrellas`);
          migrados++;
        }
      } catch (error) {
        console.error(`  ✗ Error en producto ${producto._id}:`, error);
        errores++;
      }
    }

    console.log('\n📊 Resumen de migración:');
    console.log(`  ✅ Migrados: ${migrados}`);
    console.log(`  ⏭️  Ya eran números: ${yaNumeros}`);
    console.log(`  ❌ Errores: ${errores}`);
    console.log(`  📦 Total: ${productos.length}`);

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await client.close();
    console.log('\n🔌 Conexión cerrada');
  }
}

// Ejecutar migración
migrateEstadoProductos()
  .then(() => {
    console.log('\n✨ Migración completada exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
