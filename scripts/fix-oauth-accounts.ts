import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function fixOAuthAccounts() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI no está definida');
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    const db = client.db('club-tesoros');
    
    // Eliminar todas las colecciones del adapter para empezar limpio
    const collections = ['users', 'accounts', 'sessions', 'verification_tokens'];
    
    for (const collectionName of collections) {
      try {
        await db.collection(collectionName).drop();
        console.log(`🗑️  Colección ${collectionName} eliminada`);
      } catch (error: any) {
        if (error.codeName === 'NamespaceNotFound') {
          console.log(`ℹ️  Colección ${collectionName} no existe`);
        } else {
          throw error;
        }
      }
    }

    console.log('\n✅ Base de datos limpiada. Ahora puedes iniciar sesión de nuevo con Google.');
    console.log('El primer usuario que se registre será automáticamente admin.');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

fixOAuthAccounts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
