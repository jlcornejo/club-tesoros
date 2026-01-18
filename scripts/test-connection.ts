/**
 * Script para probar la conexión a MongoDB
 * 
 * Ejecutar con: npx tsx scripts/test-connection.ts
 * (Primero instala tsx: npm install -D tsx)
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  console.log('🔍 Probando conexión a MongoDB...\n');

  if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI no está definida en .env.local');
    process.exit(1);
  }

  try {
    console.log('📡 Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ ¡Conexión exitosa a MongoDB!\n');
    
    // Obtener información de la base de datos
    const db = mongoose.connection.db;
    if (!db) {
      console.log('⚠️  No se pudo acceder a la base de datos');
      return;
    }
    const collections = await db.listCollections().toArray();
    
    console.log('📊 Colecciones en la base de datos:');
    if (collections.length === 0) {
      console.log('   (No hay colecciones aún - se crearán automáticamente)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    console.log('\n🎉 Todo está configurado correctamente!');
    
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:');
    console.error(error);
    console.log('\n💡 Verifica:');
    console.log('   1. Que tu connection string sea correcto');
    console.log('   2. Que tu IP esté en la lista blanca de MongoDB Atlas');
    console.log('   3. Que el usuario y contraseña sean correctos');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Conexión cerrada');
  }
}

testConnection();
