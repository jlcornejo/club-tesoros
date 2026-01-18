'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NuevaFeriaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    descripcion: '',
    estado: 'planificada' as 'planificada' | 'activa' | 'finalizada',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ferias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push('/ferias');
      } else {
        alert('Error al crear la feria');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear la feria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/ferias" className="text-white hover:underline mb-4 inline-block">
            ← Volver a ferias
          </Link>
          <h1 className="stumble-title text-4xl">🎪 Nueva Feria</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stumble-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre de la Feria *
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
                placeholder="Ej: Feria de Primavera 2024"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fecha *
              </label>
              <input
                type="date"
                required
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Descripción *
              </label>
              <textarea
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
                rows={4}
                placeholder="Describe la feria..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Estado
              </label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
              >
                <option value="planificada">Planificada</option>
                <option value="activa">Activa</option>
                <option value="finalizada">Finalizada</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="stumble-button w-full text-lg"
            >
              {loading ? 'Creando...' : '✨ Crear Feria'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
