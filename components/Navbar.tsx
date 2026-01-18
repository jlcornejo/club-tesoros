'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎪</span>
            <span className="text-white font-bold text-xl">Club Tesoros</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/ferias"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition font-semibold"
            >
              🎡 Ferias
            </Link>
            <Link
              href="/productos"
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition font-semibold"
            >
              🎁 Productos
            </Link>

            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-2 hover:bg-white/20 px-3 py-2 rounded-lg transition"
                >
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'Usuario'}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  )}
                  <span className="text-white font-semibold hidden sm:block">
                    {session.user.name}
                  </span>
                  {session.user.role === 'admin' && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                      Admin
                    </span>
                  )}
                </button>

                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-200"
                  >
                    <Link
                      href="/mis-ferias"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setShowMenu(false)}
                    >
                      📋 Mis Ferias
                    </Link>
                    <Link
                      href="/mis-productos"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setShowMenu(false)}
                    >
                      🎁 Mis Productos
                    </Link>
                    {session.user.role === 'admin' && (
                      <>
                        <div className="border-t border-gray-200 my-2" />
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-yellow-700 hover:bg-yellow-50 transition font-semibold"
                          onClick={() => setShowMenu(false)}
                        >
                          ⚙️ Panel Admin
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-200 my-2" />
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="stumble-button text-sm"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
