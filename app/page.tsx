'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="stumble-title mb-4">
            🎪 Club Tesoros
          </h1>
          <p className="text-white text-xl font-semibold drop-shadow-lg">
            Feria de Pulgas - Condominio Nueva Toledo
          </p>
        </motion.div>

        {/* Cards principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/ferias">
              <div className="stumble-card p-8 cursor-pointer">
                <div className="text-6xl mb-4">🎡</div>
                <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--stumble-pink)' }}>
                  Ferias
                </h2>
                <p className="text-gray-600 text-lg">
                  Gestiona y organiza las ferias de pulgas del condominio
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/productos">
              <div className="stumble-card p-8 cursor-pointer">
                <div className="text-6xl mb-4">🎁</div>
                <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--stumble-cyan)' }}>
                  Productos
                </h2>
                <p className="text-gray-600 text-lg">
                  Explora juguetes, libros y tesoros disponibles
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Sección de información */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="stumble-card p-8"
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--stumble-yellow)' }}>
            ¿Qué es Club Tesoros? 🌟
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Club Tesoros es la plataforma para gestionar las ferias de pulgas en nuestro 
            condominio Nueva Toledo. Aquí podrás vender juguetes, libros y muchos otros 
            objetos que ya no utilizas, pero que pueden ser el tesoro perfecto para otro 
            amiguito de la comunidad.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-pink-50 rounded-xl">
              <div className="text-4xl mb-2">🧸</div>
              <p className="font-semibold text-gray-700">Juguetes</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-4xl mb-2">📚</div>
              <p className="font-semibold text-gray-700">Libros</p>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-xl">
              <div className="text-4xl mb-2">🎮</div>
              <p className="font-semibold text-gray-700">Y mucho más</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
