'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { CircusTentIcon, AdminIcon, LogoutIcon, ListIcon } from '@/components/icons/NavIcons';
import { FeriaIcon, GiftIcon } from '@/components/icons/StumbleIcons';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
          {/* Logo */}
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
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/ferias"
                  className="text-white font-black px-6 py-3 rounded-full transition bg-pink-500 hover:bg-pink-600 border-3 border-white shadow-lg flex items-center gap-2"
                  style={{
                    textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 3px 0 #C2185B, 0 4px 10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <FeriaIcon size={24} />
                  Ferias
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/productos"
                  className="text-white font-black px-6 py-3 rounded-full transition bg-cyan-500 hover:bg-cyan-600 border-3 border-white shadow-lg flex items-center gap-2"
                  style={{
                    textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 3px 0 #0097A7, 0 4px 10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <GiftIcon size={24} />
                  Productos
                </Link>
              </motion.div>
            </div>

            {/* Mobile Hamburger Menu */}
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white font-black px-3 py-2 rounded-full transition bg-purple-500 hover:bg-purple-600 border-3 border-white shadow-lg"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 3px 0 #6A1B9A, 0 4px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>

            {/* User Menu / Login Button */}
            {status === 'loading' ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 animate-pulse border-3 sm:border-4 border-white shadow-lg" />
            ) : session ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:bg-orange-400 px-3 py-2 rounded-full transition border-3 border-white bg-orange-500 shadow-lg"
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
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 border-white shadow-md"
                    />
                  )}
                  <span className="text-white font-black hidden lg:block text-sm" style={{
                    textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
                  }}>
                    {session.user.name}
                  </span>
                  {session.user.role === 'admin' && (
                    <span className="bg-white text-orange-600 text-xs px-2 py-1 rounded-full font-black shadow-md border-2 border-orange-600 hidden sm:inline">
                      ⭐ Admin
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl py-2 border-5 border-gray-800"
                    >
                      <Link
                        href="/mis-ferias"
                        className="flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-pink-100 transition font-black rounded-2xl mx-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <ListIcon size={24} />
                        Mis Ferias
                      </Link>
                      <Link
                        href="/mis-productos"
                        className="flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-cyan-100 transition font-black rounded-2xl mx-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <GiftIcon size={24} />
                        Mis Productos
                      </Link>
                      {session.user.role === 'admin' && (
                        <>
                          <div className="border-t-3 border-gray-300 my-2" />
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-5 py-3 text-orange-700 hover:bg-orange-100 transition font-black rounded-2xl mx-2"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <AdminIcon size={24} />
                            Panel Admin
                          </Link>
                        </>
                      )}
                      <div className="border-t-3 border-gray-300 my-2" />
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex items-center gap-3 w-full text-left px-5 py-3 text-red-600 hover:bg-red-100 transition font-black rounded-2xl mx-2"
                      >
                        <LogoutIcon size={24} />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="stumble-button text-sm px-5 py-2.5 whitespace-nowrap"
                >
                  Iniciar Sesión
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-4 border-yellow-600 bg-yellow-300"
          >
            <div className="px-4 py-3 space-y-2">
              <Link
                href="/ferias"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 text-white font-black px-4 py-3 rounded-2xl transition bg-pink-500 hover:bg-pink-600 border-3 border-white shadow-lg"
                style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 3px 0 #C2185B'
                }}
              >
                <FeriaIcon size={24} />
                Ferias
              </Link>
              <Link
                href="/productos"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 text-white font-black px-4 py-3 rounded-2xl transition bg-cyan-500 hover:bg-cyan-600 border-3 border-white shadow-lg"
                style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 3px 0 #0097A7'
                }}
              >
                <GiftIcon size={24} />
                Productos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
