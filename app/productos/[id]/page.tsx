'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
}

export default function ProductoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
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
            </div>

            <div className="border-t-2 border-gray-200 pt-4">
              <p className="text-gray-600">
                <span className="font-semibold">Vendedor:</span> {producto.vendedor}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => router.back()}
                className="flex-1 stumble-button-secondary"
              >
                Volver
              </button>
              <button
                onClick={() => {
                  // Aquí podrías agregar funcionalidad de contacto
                  alert('Funcionalidad de contacto próximamente');
                }}
                className="flex-1 stumble-button"
              >
                Contactar vendedor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
