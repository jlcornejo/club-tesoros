import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { authConfig } from './auth.config';
import clientPromise from './lib/mongodb-client';
import User from './models/User';
import dbConnect from './lib/mongodb';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();

          // Buscar si el usuario ya existe
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Verificar si es el primer usuario
            const userCount = await User.countDocuments();
            const isFirstUser = userCount === 0;

            // Crear nuevo usuario
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              googleId: profile?.sub,
              role: isFirstUser ? 'admin' : 'user',
              emailVerified: new Date(),
            });

            console.log(`✅ Nuevo usuario creado: ${user.email} (${existingUser.role})`);
          } else {
            // Actualizar información del usuario si cambió
            if (existingUser.name !== user.name || existingUser.image !== user.image) {
              existingUser.name = user.name || existingUser.name;
              existingUser.image = user.image || existingUser.image;
              await existingUser.save();
            }
          }

          // Agregar el rol al objeto user para que esté disponible en el callback jwt
          (user as any).role = existingUser.role;
          user.id = existingUser._id.toString();

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
