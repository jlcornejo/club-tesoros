import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definido');
}

async function checkCollections() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Conectando a MongoDB...');
    await client.connect();
    console.log('✅ Conectado\n');
    
    const db = client.db('club-tesoros');
    
    // Listar todas las colecciones
    console.log('📚 Colecciones en la base de datos:');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Verificar colección de productos
    console.log('\n📦 Colección "productos":');
    const productosCount = await db.collection('productos').countDocuments();
    console.log(`  Total de documentos: ${productosCount}`);
    
    if (productosCount > 0) {
      console.log('\n  Productos encontrados:');
      const productos = await db.collection('productos').find({}).toArray();
      productos.forEach((p: any) => {
        console.log(`\n  📦 ${p.nombre}`);
        console.log(`     ID: ${p._id}`);
        console.log(`     Precio: $${p.precio}`);
        console.log(`     Estado: ${p.estado} estrellas`);
        console.log(`     Categoría: ${p.categoria}`);
        console.log(`     Vendedor: ${p.vendedor}`);
        console.log(`     FeriaId: ${p.feriaId}`);
        console.log(`     UserId: ${p.userId}`);
        console.log(`     Imágenes: ${p.imagenes?.length || 0}`);
        if (p.imagenes && p.imagenes.length > 0) {
          p.imagenes.forEach((img: string, i: number) => {
            console.log(`       ${i + 1}. ${img.substring(0, 80)}...`);
          });
        }
      });
    }
    
    // Verificar colección de ferias
    console.log('\n\n🎪 Colección "ferias":');
    const feriasCount = await db.collection('ferias').countDocuments();
    console.log(`  Total de documentos: ${feriasCount}`);
    
    if (feriasCount > 0) {
      const ferias = await db.collection('ferias').find({}).toArray();
      ferias.forEach((f: any) => {
        console.log(`\n  🎪 ${f.nombre}`);
        console.log(`     ID: ${f._id}`);
        console.log(`     Estado: ${f.estado}`);
        console.log(`     Fecha: ${f.fecha}`);
      });
    }
    
  } finally {
    await client.close();
    console.log('\n\n🔌 Conexión cerrada');
  }
}

checkCollections().catch(console.error);
