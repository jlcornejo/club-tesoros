'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { GiftIcon, BookIcon, ToyIcon, FeriaIcon, GameIcon, StarIcon } from '@/components/icons/StumbleIcons';

// Generar partículas fuera del componente para evitar re-renders
const generateParticles = () => {
  const emojis = ['🎈', '⭐', '🎁', '🎪', '🎡', '🎨', '🧸', '📚'];
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    emoji: emojis[i],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 80}%`,
    delay: Math.random() * 4
  }));
};

export default function Home() {
  const [particles] = useState(generateParticles);

  return (
    <div className="min-h-screen p-8 relative">
      {/* Partículas flotantes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="floating-emoji"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="stumble-title mb-4"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎪 Club Tesoros
          </motion.h1>
          <motion.p 
            className="text-white text-2xl font-black drop-shadow-lg"
            style={{
              textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5), -1px -1px 0 rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Feria de Pulgas - Condominio Nueva Toledo
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 inline-block"
          >
            <span className="stumble-badge">
              ✨ ¡Encuentra tesoros increíbles! ✨
            </span>
          </motion.div>
        </motion.div>

        {/* Cards principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/ferias">
              <div className="stumble-card p-8 cursor-pointer relative overflow-hidden">
                <motion.div 
                  className="mb-4 flex justify-center"
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FeriaIcon size={80} />
                </motion.div>
                <h2 className="text-4xl font-black mb-3" style={{ 
                  color: 'var(--stumble-pink)',
                  textShadow: '3px 3px 0 rgba(0, 0, 0, 0.2)'
                }}>
                  Ferias
                </h2>
                <p className="text-gray-700 text-lg font-bold mb-4">
                  Gestiona y organiza las ferias de pulgas del condominio
                </p>
                <div className="inline-block px-6 py-3 bg-linear-to-r from-pink-500 to-pink-400 rounded-full text-white font-black text-sm border-3 border-white shadow-lg">
                  Ver todas →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/productos">
              <div className="stumble-card p-8 cursor-pointer relative overflow-hidden">
                <motion.div 
                  className="mb-4 flex justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <GiftIcon size={80} />
                </motion.div>
                <h2 className="text-4xl font-black mb-3" style={{ 
                  color: 'var(--stumble-cyan)',
                  textShadow: '3px 3px 0 rgba(0, 0, 0, 0.2)'
                }}>
                  Productos
                </h2>
                <p className="text-gray-700 text-lg font-bold mb-4">
                  Explora juguetes, libros y tesoros disponibles
                </p>
                <div className="inline-block px-6 py-3 bg-linear-to-r from-cyan-500 to-cyan-400 rounded-full text-white font-black text-sm border-3 border-white shadow-lg">
                  Explorar →
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Sección de información */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="stumble-card p-10 mb-8"
          style={{
            background: 'linear-gradient(135deg, #76FF03 0%, #64DD17 100%)'
          }}
        >
          <h3 className="text-3xl font-black mb-4 flex items-center justify-center gap-3" style={{ 
            color: 'white',
            textShadow: '4px 4px 0 rgba(0, 0, 0, 0.3), -2px -2px 0 rgba(0, 0, 0, 0.2)'
          }}>
            ¿Qué es Club Tesoros? <StarIcon size={40} />
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed mb-6 font-bold">
            Club Tesoros es la plataforma para gestionar las ferias de pulgas en nuestro 
            condominio Nueva Toledo. Aquí podrás vender juguetes, libros y muchos otros 
            objetos que ya no utilizas, pero que pueden ser el tesoro perfecto para otro 
            amiguito de la comunidad.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <motion.div 
              className="text-center p-6 bg-linear-to-br from-pink-400 to-pink-500 rounded-3xl border-4 border-white shadow-xl"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="mb-3 flex justify-center"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ToyIcon size={56} />
              </motion.div>
              <p className="font-black text-white text-xl" style={{
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
              }}>Juguetes</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-linear-to-br from-yellow-400 to-orange-400 rounded-3xl border-4 border-white shadow-xl"
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="mb-3 flex justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <BookIcon size={56} />
              </motion.div>
              <p className="font-black text-white text-xl" style={{
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
              }}>Libros</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-linear-to-br from-cyan-400 to-blue-500 rounded-3xl border-4 border-white shadow-xl"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="mb-3 flex justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <GameIcon size={56} />
              </motion.div>
              <p className="font-black text-white text-xl" style={{
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)'
              }}>Y mucho más</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/ferias">
            <motion.button
              className="stumble-button text-lg px-12 py-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🎪 ¡Empezar Ahora!
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
