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

export default function MisFeriasPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login';
    },
  });
  const router = useRouter();
  const [ferias, setFerias] = useState<Feria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMisFerias();
    }
  }, [status]);

  const fetchMisFerias = async () => {
    try {
      const res = await fetch('/api/ferias?misFerias=true');
      const data = await res.json();
      if (data.success) {
        setFerias(data.data);
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
          <h1 className="stumble-title text-5xl mb-4">📋 Mis Ferias</h1>
          <p className="text-white text-lg mb-6">
            Gestiona tus ferias de pulgas
          </p>
          <Link href="/ferias/nueva">
            <button className="stumble-button">
              + Nueva Feria
            </button>
          </Link>
        </motion.div>

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
                  <div className="stumble-card p-6 cursor-pointer h-full">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">
                        {feria.nombre}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(feria.estado)}`}>
                        {feria.estado}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {feria.descripcion}
                    </p>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(feria.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
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
