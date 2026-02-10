'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AgregarProductoModal from '@/components/AgregarProductoModal';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { formatPrice } from '@/lib/utils';

interface Feria {
  _id: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  estado: 'planificada' | 'activa' | 'finalizada';
  userId: string;
}

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  vendedor: string;
  vendido: boolean;
  imagenes: string[];
  estado: number;
}

export default function FeriaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [feria, setFeria] = useState<Feria | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const isOwner = session?.user && feria?.userId === (session.user as any).id;

  useEffect(() => {
    const loadData = async () => {
      await fetchFeria();
      await fetchProductos();
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchFeria = async () => {
    try {
      const res = await fetch(`/api/ferias/${id}`);
      const data = await res.json();
      if (data.success) {
        setFeria(data.data);
      }
    } catch (error) {
      console.error('Error al cargar feria:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await fetch(`/api/productos?feriaId=${id}`);
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa':
        return 'bg-green-100 text-green-800';
      case 'planificada':
        return 'bg-yellow-100 text-yellow-800';
      case 'finalizada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <Loading message="Cargando feria" />;
  }

  if (!feria) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="stumble-card p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Feria no encontrada</h2>
            <Link href="/ferias" className="text-pink-500 hover:underline mt-4 inline-block">
              Volver a ferias
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/ferias" className="text-white hover:underline mb-4 inline-block">
            ← Volver a ferias
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stumble-card p-8 mb-8"
        >
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold" style={{ color: 'var(--stumble-pink)' }}>
              {feria.nombre}
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getEstadoColor(feria.estado)}`}>
              {feria.estado}
            </span>
          </div>
          <p className="text-gray-700 text-lg mb-4">{feria.descripcion}</p>
          <p className="text-gray-600">
            📅 {new Date(feria.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">
              🎁 Productos ({productos.length})
            </h2>
            {isOwner && (
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--stumble-orange)' }}
              >
                + Agregar Producto
              </button>
            )}
          </div>

          {productos.length === 0 ? (
            <div className="stumble-card p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No hay productos en esta feria
              </h3>
              <p className="text-gray-600">
                Los productos aparecerán cuando se agreguen a esta feria
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productos.map((producto, index) => (
                <Link
                  key={producto._id}
                  href={`/productos/${producto._id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="stumble-card p-5 hover:scale-105 transition-transform cursor-pointer"
                  >
                    {producto.imagenes && producto.imagenes.length > 0 ? (
                      <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden">
                        <Image
                          src={producto.imagenes[0]}
                          alt={producto.nombre}
                          fill
                          className="object-cover"
                        />
                        {producto.imagenes.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
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
                      <div className="relative w-full h-48 mb-3 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <div className="text-7xl">
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
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {producto.descripcion}
                    </p>
                    
                    <div className="mb-2">
                      {renderEstrellas(producto.estado)}
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold" style={{ color: 'var(--stumble-pink)' }}>
                        ${formatPrice(producto.precio)}
                      </span>
                      {!producto.vendido && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Disponible
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Vendedor: {producto.vendedor}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        <AgregarProductoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          feriaId={id}
          onProductoCreado={fetchProductos}
        />
      </div>
    </div>
  );
}
