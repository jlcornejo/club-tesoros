'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface Feria {
  _id: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  estado: 'planificada' | 'activa' | 'finalizada';
  createdBy: string;
}

interface FeriaConMetricas extends Feria {
  totalProductos: number;
  productosVendidos: number;
  productosDisponibles: number;
  totalGanancias: number;
}

export default function MisFeriasPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login';
    },
  });
  const router = useRouter();
  const [ferias, setFerias] = useState<FeriaConMetricas[]>([]);
  const [loading, setLoading] = useState(true);
  const [metricasGlobales, setMetricasGlobales] = useState({
    totalProductos: 0,
    productosVendidos: 0,
    totalGanancias: 0,
    feriasActivas: 0,
  });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMisFerias();
    }
  }, [status]);

  const fetchMisFerias = async () => {
    try {
      const [feriasRes, productosRes] = await Promise.all([
        fetch('/api/ferias?misFerias=true'),
        fetch('/api/productos?misProductos=true'),
      ]);
      
      const feriasData = await feriasRes.json();
      const productosData = await productosRes.json();
      
      if (feriasData.success && productosData.success) {
        const productos = productosData.data;
        
        // Calcular métricas por feria
        const feriasConMetricas = feriasData.data.map((feria: Feria) => {
          const productosFeria = productos.filter((p: any) => p.feriaId === feria._id);
          const vendidos = productosFeria.filter((p: any) => p.vendido);
          const ganancias = vendidos.reduce((sum: number, p: any) => sum + p.precio, 0);
          
          return {
            ...feria,
            totalProductos: productosFeria.length,
            productosVendidos: vendidos.length,
            productosDisponibles: productosFeria.length - vendidos.length,
            totalGanancias: ganancias,
          };
        });
        
        setFerias(feriasConMetricas);
        
        // Calcular métricas globales
        const totalProductos = productos.length;
        const productosVendidos = productos.filter((p: any) => p.vendido).length;
        const totalGanancias = productos
          .filter((p: any) => p.vendido)
          .reduce((sum: number, p: any) => sum + p.precio, 0);
        const feriasActivas = feriasData.data.filter((f: Feria) => f.estado === 'activa').length;
        
        setMetricasGlobales({
          totalProductos,
          productosVendidos,
          totalGanancias,
          feriasActivas,
        });
      }
    } catch (error) {
      console.error('Error al cargar mis ferias:', error);
    } finally {
      setLoading(false);
    }
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

  if (status === 'loading' || loading) {
    return <Loading message="Cargando mis ferias" />;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="stumble-title text-4xl sm:text-5xl mb-4">📋 Mis Ferias</h1>
          <p className="text-white text-base sm:text-lg mb-6">
            Gestiona tus ferias de pulgas
          </p>
          <Link href="/ferias/nueva">
            <button className="stumble-button">
              + Nueva Feria
            </button>
          </Link>
        </motion.div>

        {/* Métricas Globales */}
        {ferias.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="stumble-card p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">🎪</div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--stumble-pink)' }}>
                {ferias.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Ferias Creadas</div>
              <div className="text-xs text-gray-500 mt-1">
                {metricasGlobales.feriasActivas} activas
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="stumble-card p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">📦</div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--stumble-cyan)' }}>
                {metricasGlobales.totalProductos}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Productos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="stumble-card p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">✅</div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--stumble-green)' }}>
                {metricasGlobales.productosVendidos}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Productos Vendidos</div>
              <div className="text-xs text-gray-500 mt-1">
                {metricasGlobales.totalProductos > 0 
                  ? Math.round((metricasGlobales.productosVendidos / metricasGlobales.totalProductos) * 100)
                  : 0}% de conversión
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="stumble-card p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">💰</div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--stumble-yellow)' }}>
                ${metricasGlobales.totalGanancias}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Ganancias Totales</div>
            </motion.div>
          </div>
        )}

        {ferias.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="stumble-card p-12 text-center"
          >
            <div className="text-6xl mb-4">🎪</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No tienes ferias aún
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Crea tu primera feria para comenzar a vender!
            </p>
            <Link href="/ferias/nueva">
              <button className="stumble-button">
                Crear Mi Primera Feria
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ferias.map((feria, index) => (
              <motion.div
                key={feria._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/ferias/${feria._id}`}>
                  <div className="stumble-card p-5 sm:p-6 cursor-pointer h-full hover:scale-105 transition-transform">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex-1">
                        {feria.nombre}
                      </h3>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(feria.estado)}`}>
                        {feria.estado}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {feria.descripcion}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                      📅 {new Date(feria.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>

                    {/* Métricas de la feria */}
                    <div className="border-t-2 border-gray-200 pt-3 mt-3 space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600">📦 Productos:</span>
                        <span className="font-bold text-gray-800">{feria.totalProductos}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600">✅ Vendidos:</span>
                        <span className="font-bold text-green-600">
                          {feria.productosVendidos} ({feria.totalProductos > 0 
                            ? Math.round((feria.productosVendidos / feria.totalProductos) * 100)
                            : 0}%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600">💰 Ganancias:</span>
                        <span className="font-bold" style={{ color: 'var(--stumble-yellow)' }}>
                          ${feria.totalGanancias}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
