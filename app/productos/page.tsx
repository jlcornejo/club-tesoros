'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  vendedor: string;
  vendido: boolean;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch('/api/productos');
      const data = await res.json();
      if (data.success) {
        setProductos(data.data);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriaEmoji = (categoria: string) => {
    const emojis: Record<string, string> = {
      juguete: '🧸',
      libro: '📚',
      ropa: '👕',
      electronico: '🎮',
      otro: '🎁',
    };
    return emojis[categoria] || '🎁';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="stumble-title text-5xl mb-4">🎁 Productos</h1>
        </motion.div>

        {loading ? (
          <div className="text-center text-white text-xl">Cargando...</div>
        ) : productos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="stumble-card p-12 text-center"
          >
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No hay productos disponibles
            </h2>
            <p className="text-gray-600">
              Los productos aparecerán cuando se creen ferias
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto, index) => (
              <motion.div
                key={producto._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="stumble-card p-5"
              >
                <div className="text-5xl mb-3 text-center">
                  {getCategoriaEmoji(producto.categoria)}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {producto.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {producto.descripcion}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold" style={{ color: 'var(--stumble-pink)' }}>
                    ${producto.precio}
                  </span>
                  {producto.vendido && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Vendido
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Vendedor: {producto.vendedor}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
