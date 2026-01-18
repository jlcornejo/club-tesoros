'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { CircusTentIcon, AdminIcon, LogoutIcon, ListIcon } from '@/components/icons/NavIcons';
import { FeriaIcon, GiftIcon } from '@/components/icons/StumbleIcons';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 border-b-6 border-yellow-600 sticky top-0 z-50 shadow-2xl"
      style={{
        boxShadow: '0 6px 0 #CC8800, 0 8px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CircusTentIcon size={36} className="sm:w-12 sm:h-12" />
            </motion.div>
            <span className="text-white font-black text-lg sm:text-2xl group-hover:scale-105 transition-transform"
              style={{
                textShadow: '3px 3px 0 rgba(0, 0, 0, 0.4), -1px -1px 0 rgba(0, 0, 0, 0.2)'
              }}
            >
              Club Tesoros
            </span>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/ferias"
                className="text-white font-black px-3 sm:px-6 py-2 sm:py-3 rounded-full transition bg-pink-500 hover:bg-pink-600 border-2 sm:border-3 border-white shadow-lg flex items-center gap-1 sm:gap-2"
                style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 3px 0 #C2185B, 0 4px 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                <FeriaIcon size={20} className="sm:w-6 sm:h-6" />
                <span className="hidden sm:inline text-sm sm:text-base">Ferias</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/productos"
                className="text-white font-black px-3 sm:px-6 py-2 sm:py-3 rounded-full transition bg-cyan-500 hover:bg-cyan-600 border-2 sm:border-3 border-white shadow-lg flex items-center gap-1 sm:gap-2"
                style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 3px 0 #0097A7, 0 4px 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                <GiftIcon size={20} className="sm:w-6 sm:h-6" />
                <span className="hidden sm:inline text-sm sm:text-base">Productos</span>
              </Link>
            </motion.div>

            {status === 'loading' ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 animate-pulse border-3 sm:border-4 border-white shadow-lg" />
            ) : session ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 hover:bg-orange-400 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition border-3 sm:border-4 border-white bg-orange-500 shadow-lg"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: '0 3px 0 #E65100, 0 4px 10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'Usuario'}
                      width={32}
                      height={32}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 border-white shadow-md"
                    />
                  )}
                  <span className="text-white font-black hidden sm:block text-sm" style={{
                    textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
                  }}>
                    {session.user.name}
                  </span>
                  {session.user.role === 'admin' && (
                    <span className="bg-white text-orange-600 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-black shadow-md border-2 border-orange-600">
                      ⭐ <span className="hidden sm:inline">Admin</span>
                    </span>
                  )}
                </motion.button>

                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 sm:mt-3 w-48 sm:w-56 bg-white rounded-2xl sm:rounded-3xl shadow-2xl py-2 border-4 sm:border-5 border-gray-800"
                  >
                    <Link
                      href="/mis-ferias"
                      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-gray-800 hover:bg-pink-100 transition font-black rounded-xl sm:rounded-2xl mx-2 text-sm sm:text-base"
                      onClick={() => setShowMenu(false)}
                    >
                      <ListIcon size={20} className="sm:w-6 sm:h-6" />
                      Mis Ferias
                    </Link>
                    <Link
                      href="/mis-productos"
                      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-gray-800 hover:bg-cyan-100 transition font-black rounded-xl sm:rounded-2xl mx-2 text-sm sm:text-base"
                      onClick={() => setShowMenu(false)}
                    >
                      <GiftIcon size={20} className="sm:w-6 sm:h-6" />
                      Mis Productos
                    </Link>
                    {session.user.role === 'admin' && (
                      <>
                        <div className="border-t-2 sm:border-t-3 border-gray-300 my-2" />
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-orange-700 hover:bg-orange-100 transition font-black rounded-xl sm:rounded-2xl mx-2 text-sm sm:text-base"
                          onClick={() => setShowMenu(false)}
                        >
                          <AdminIcon size={20} className="sm:w-6 sm:h-6" />
                          Panel Admin
                        </Link>
                      </>
                    )}
                    <div className="border-t-2 sm:border-t-3 border-gray-300 my-2" />
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="flex items-center gap-2 sm:gap-3 w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-red-600 hover:bg-red-100 transition font-black rounded-xl sm:rounded-2xl mx-2 text-sm sm:text-base"
                    >
                      <LogoutIcon size={20} className="sm:w-6 sm:h-6" />
                      Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="stumble-button text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3"
                >
                  Iniciar Sesión
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
