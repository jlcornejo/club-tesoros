'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  vendido: boolean;
  estado: number;
}

export default function MisProductosPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login';
    },
  });
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMisProductos();
    }
  }, [status]);

  const fetchMisProductos = async () => {
    try {
      const res = await fetch('/api/productos?misProductos=true');
      const data = await res.json();
      if (data.success) {
        setProductos(data.data);
      }
    } catch (error) {
      console.error('Error al cargar mis productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchMisProductos();
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleToggleVendido = async (id: string, vendidoActual: boolean) => {
    const nuevoEstado = !vendidoActual;
    const mensaje = nuevoEstado 
      ? '¿Marcar como vendido?' 
      : '¿Marcar como disponible?';

    if (!confirm(mensaje)) {
      return;
    }

    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendido: nuevoEstado }),
      });

      if (res.ok) {
        fetchMisProductos();
      } else {
        alert('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado');
    }
  };

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

  if (status === 'loading' || loading) {
    return <Loading message="Cargando mis productos" />;
  }

  const productosVendidos = productos.filter(p => p.vendido).length;
  const productosDisponibles = productos.filter(p => !p.vendido).length;
  const totalGanancias = productos
    .filter(p => p.vendido)
    .reduce((sum, p) => sum + p.precio, 0);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="stumble-title text-5xl mb-4">🎁 Mis Productos</h1>
          <p className="text-white text-lg mb-6">
            Gestiona tus productos en venta
          </p>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stumble-card p-6"
          >
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold" style={{ color: 'var(--stumble-cyan)' }}>
              {productos.length}
            </div>
            <div className="text-gray-600">Total Productos</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="stumble-card p-6"
          >
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold" style={{ color: 'var(--stumble-green)' }}>
              {productosVendidos}
            </div>
            <div className="text-gray-600">Vendidos</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stumble-card p-6"
          >
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold" style={{ color: 'var(--stumble-yellow)' }}>
              ${totalGanancias}
            </div>
            <div className="text-gray-600">Ganancias</div>
          </motion.div>
        </div>

        {productos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="stumble-card p-12 text-center"
          >
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No tienes productos aún
            </h2>
            <p className="text-gray-600 mb-6">
              Crea una feria primero y luego agrega productos
            </p>
            <Link href="/mis-ferias">
              <button className="stumble-button">
                Ir a Mis Ferias
              </button>
            </Link>
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
                <div className="mb-2">
                  {renderEstrellas(producto.estado)}
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold" style={{ color: 'var(--stumble-pink)' }}>
                    ${producto.precio}
                  </span>
                  {producto.vendido ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Vendido
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Disponible
                    </span>
                  )}
                </div>
                
                {/* Botones de acción */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/productos/${producto._id}`);
                    }}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: 'var(--stumble-cyan)' }}
                  >
                    Ver
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleVendido(producto._id, producto.vendido);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      producto.vendido
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-500'
                        : 'bg-green-100 text-green-800 border border-green-500'
                    }`}
                  >
                    {producto.vendido ? '↩️' : '✓'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEliminar(producto._id);
                    }}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-600 hover:bg-red-50 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
