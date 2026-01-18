'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import EditarProductoModal from '@/components/EditarProductoModal';
import Loading from '@/components/Loading';

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagenes: string[];
  vendedor: string;
  estado: number;
  feriaId: string;
  userId: string;
  vendido: boolean;
}

export default function ProductoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOwner = session?.user && producto?.userId === (session.user as { id?: string }).id;

  useEffect(() => {
    if (params.id) {
      fetchProducto();
    }
  }, [params.id]);

  const fetchProducto = async () => {
    try {
      const res = await fetch(`/api/productos/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProducto(data.data);
      }
    } catch (error) {
      console.error('Error al cargar producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/productos/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/mis-productos');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleVendido = async () => {
    if (!producto) return;

    const nuevoEstado = !producto.vendido;
    const mensaje = nuevoEstado 
      ? '¿Marcar este producto como vendido?' 
      : '¿Marcar este producto como disponible?';

    if (!confirm(mensaje)) {
      return;
    }

    try {
      const res = await fetch(`/api/productos/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendido: nuevoEstado }),
      });

      if (res.ok) {
        fetchProducto();
      } else {
        alert('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado');
    }
  };

  if (loading) {
    return <Loading message="Cargando producto" />;
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <button
            onClick={() => router.back()}
            className="stumble-button"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const getEstadoTexto = (estrellas: number) => {
    const textos = {
      5: 'Nuevo',
      4: 'Excelente estado',
      3: 'Buen estado',
      2: 'Estado regular',
      1: 'Desgastado',
      0: 'Para reparar',
    };
    return textos[estrellas as keyof typeof textos] || 'Sin especificar';
  };

  const renderEstrellas = (cantidad: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-xl sm:text-2xl">
            {i < cantidad ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          ← Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stumble-card p-6 sm:p-8"
        >
          {/* Galería de imágenes */}
          {producto.imagenes.length > 0 && (
            <div className="mb-6">
              <div className="relative aspect-square w-full max-w-lg mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={producto.imagenes[currentImageIndex]}
                  alt={producto.nombre}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {producto.imagenes.length > 1 && (
                <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                  {producto.imagenes.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-3 transition-all ${
                        currentImageIndex === index
                          ? 'border-pink-500 scale-110'
                          : 'border-gray-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${producto.nombre} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Información del producto */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: 'var(--stumble-pink)' }}>
                {producto.nombre}
              </h1>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {renderEstrellas(producto.estado)}
                </div>
                <p className="text-gray-600 font-medium">
                  {getEstadoTexto(producto.estado)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 whitespace-pre-wrap">{producto.descripcion}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black" style={{ color: 'var(--stumble-pink)' }}>
                ${producto.precio}
              </span>
              {producto.vendido && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ✓ Vendido
                </span>
              )}
            </div>

            <div className="border-t-2 border-gray-200 pt-4">
              <p className="text-gray-600">
                <span className="font-semibold">Vendedor:</span> {producto.vendedor}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4">
              {isOwner ? (
                <>
                  <button
                    onClick={handleToggleVendido}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${
                      producto.vendido
                        ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 border-2 border-green-500 hover:bg-green-200'
                    }`}
                  >
                    {producto.vendido ? '↩️ Marcar disponible' : '✓ Marcar vendido'}
                  </button>
                  <button
                    onClick={() => setModalEditarOpen(true)}
                    className="px-4 py-3 rounded-xl border-2 border-blue-500 text-blue-500 font-semibold hover:bg-blue-50 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={handleEliminar}
                    disabled={deleting}
                    className="px-4 py-3 rounded-xl border-2 border-red-500 text-red-500 font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deleting ? '...' : '🗑️'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.back()}
                    className="flex-1 stumble-button-secondary"
                  >
                    Volver
                  </button>
                  {!producto.vendido && (
                    <button
                      onClick={() => {
                        alert('Funcionalidad de contacto próximamente');
                      }}
                      className="flex-1 stumble-button"
                    >
                      Contactar vendedor
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Modal de editar */}
        {isOwner && producto && (
          <EditarProductoModal
            isOpen={modalEditarOpen}
            onClose={() => setModalEditarOpen(false)}
            producto={producto}
            onProductoActualizado={fetchProducto}
          />
        )}
      </div>
    </div>
  );
}
