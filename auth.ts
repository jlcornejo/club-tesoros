import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { Adapter } from 'next-auth/adapters';
import { authConfig } from './auth.config';
import clientPromise from './lib/mongodb-client';
import dbConnect from './lib/mongodb';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'club-tesoros',
  }) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();

          // Buscar usuario en la colección de users del adapter
          const db = (await clientPromise).db('club-tesoros');
          const usersCollection = db.collection('users');
          
          const existingUser = await usersCollection.findOne({ email: user.email });

          if (!existingUser) {
            // Verificar si es el primer usuario para asignar rol de admin
            const userCount = await usersCollection.countDocuments();
            const isFirstUser = userCount === 0;

            // El adapter ya creó el usuario, solo actualizamos el rol
            await usersCollection.updateOne(
              { email: user.email },
              { 
                $set: { 
                  role: isFirstUser ? 'admin' : 'user',
                  emailVerified: new Date(),
                } 
              }
            );

            console.log(`✅ Nuevo usuario creado: ${user.email} (${isFirstUser ? 'admin' : 'user'})`);
            (user as { role?: string }).role = isFirstUser ? 'admin' : 'user';
          } else {
            // Usuario existente, obtener su rol
            (user as { role?: string }).role = (existingUser as { role?: string }).role || 'user';
          }

          return true;
        } catch (error) {
          console.error('Error en signIn callback:', error);
          return false;
        }
      }

      return true;
    },
  },
});
