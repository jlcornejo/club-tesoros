'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  vendedor: string;
  vendido: boolean;
  estado: number;
  imagenes: string[];
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

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

  const productosFiltrados = productos.filter(producto => {
    const cumpleCategoria = filtroCategoria === 'todas' || producto.categoria === filtroCategoria;
    const cumpleEstado = 
      filtroEstado === 'todos' || 
      (filtroEstado === 'disponible' && !producto.vendido) ||
      (filtroEstado === 'vendido' && producto.vendido);
    const cumpleBusqueda = busqueda === '' || 
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.vendedor.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleEstado && cumpleBusqueda;
  });

  const renderEstrellas = (cantidad: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-sm">
            {i < cantidad ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
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
          <h1 className="stumble-title text-4xl sm:text-5xl mb-4">🎁 Productos</h1>
          <p className="text-white text-base sm:text-lg mb-4">
            Explora todos los productos disponibles
          </p>
        </motion.div>

        {/* Buscador y Filtros */}
        {!loading && productos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stumble-card p-4 sm:p-6 mb-6"
          >
            {/* Buscador */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Buscar productos
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, descripción o vendedor..."
                  className="w-full px-4 py-3 sm:px-5 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base pr-10"
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filtros */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="todas">📦 Todas las categorías</option>
                  <option value="juguete">🧸 Juguetes</option>
                  <option value="libro">📚 Libros</option>
                  <option value="ropa">👕 Ropa</option>
                  <option value="electronico">🎮 Electrónicos</option>
                  <option value="otro">🎁 Otros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="todos">🔍 Todos</option>
                  <option value="disponible">✅ Disponibles</option>
                  <option value="vendido">🔴 Vendidos</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
              <span>
                Mostrando {productosFiltrados.length} de {productos.length} productos
              </span>
              {(filtroCategoria !== 'todas' || filtroEstado !== 'todos' || busqueda !== '') && (
                <button
                  onClick={() => {
                    setFiltroCategoria('todas');
                    setFiltroEstado('todos');
                    setBusqueda('');
                  }}
                  className="text-pink-500 hover:text-pink-600 font-semibold text-left sm:text-right"
                >
                  Limpiar todo
                </button>
              )}
            </div>
          </motion.div>
        )}

        {loading ? (
          <Loading message="Cargando productos" fullScreen={false} />
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
        ) : productosFiltrados.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="stumble-card p-12 text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No se encontraron productos
            </h2>
            <p className="text-gray-600 mb-4">
              Intenta cambiar los filtros de búsqueda
            </p>
            <button
              onClick={() => {
                setFiltroCategoria('todas');
                setFiltroEstado('todos');
                setBusqueda('');
              }}
              className="stumble-button"
            >
              Limpiar todo
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {productosFiltrados.map((producto, index) => (
              <Link
                key={producto._id}
                href={`/productos/${producto._id}`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="stumble-card p-4 sm:p-5 hover:scale-105 transition-transform cursor-pointer h-full flex flex-col"
                >
                  {/* Imagen o emoji */}
                  {producto.imagenes && producto.imagenes.length > 0 ? (
                    <div className="relative w-full h-40 sm:h-48 mb-3 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={producto.imagenes[0]}
                        alt={producto.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {producto.imagenes.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          +{producto.imagenes.length - 1}
                        </div>
                      )}
                      {producto.vendido && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            ✓ VENDIDO
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-40 sm:h-48 mb-3 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <div className="text-6xl sm:text-7xl">
                        {getCategoriaEmoji(producto.categoria)}
                      </div>
                      {producto.vendido && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            ✓ VENDIDO
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {producto.nombre}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                      {producto.descripcion}
                    </p>
                    
                    {/* Estado */}
                    <div className="mb-3">
                      {renderEstrellas(producto.estado)}
                    </div>
                    
                    {/* Precio y vendedor */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xl sm:text-2xl font-black" style={{ color: 'var(--stumble-pink)' }}>
                          ${producto.precio}
                        </span>
                        {!producto.vendido && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Disponible
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        👤 {producto.vendedor}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
