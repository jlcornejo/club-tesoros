import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb-client';

export async function GET() {
  try {
    // Test 1: Variables de entorno
    const envCheck = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
      NODE_ENV: process.env.NODE_ENV,
    };

    // Test 2: Conexión a MongoDB
    const client = await clientPromise;
    const db = client.db('club-tesoros');
    
    // Test 3: Ping a la base de datos
    await db.admin().ping();
    
    // Test 4: Contar usuarios
    const usersCount = await db.collection('users').countDocuments();

    return NextResponse.json({
      success: true,
      message: '✅ Todas las conexiones funcionan correctamente',
      checks: {
        environment: envCheck,
        mongodb: {
          connected: true,
          database: 'club-tesoros',
          usersCount,
        },
      },
    });
  } catch (error: any) {
    console.error('❌ Error en test de conexión:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      checks: {
        environment: {
          MONGODB_URI: !!process.env.MONGODB_URI,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
          GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
          NODE_ENV: process.env.NODE_ENV,
        },
      },
    }, { status: 500 });
  }
}
