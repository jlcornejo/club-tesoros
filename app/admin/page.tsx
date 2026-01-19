'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Stats {
  totalUsuarios: number;
  totalFerias: number;
  totalProductos: number;
  productosVendidos: number;
  productosDisponibles: number;
  feriasActivas: number;
  totalGanancias: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  image?: string;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login';
    },
  });
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role !== 'admin') {
        router.push('/');
      } else {
        fetchData();
      }
    }
  }, [status, session, router]);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users'),
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();

      if (statsData.success) setStats(statsData.data);
      if (usersData.success) setUsers(usersData.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      } else {
        setConfirmDialog({
          isOpen: true,
          title: '❌ Error',
          message: data.error || 'Error al cambiar rol',
          onConfirm: () => {},
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setConfirmDialog({
        isOpen: true,
        title: '❌ Error',
        message: 'Error al cambiar rol',
        onConfirm: () => {},
      });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
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
          <h1 className="stumble-title text-5xl mb-4">⚙️ Panel de Administración</h1>
          <p className="text-white text-lg">
            Gestiona todo el sistema de Club Tesoros
          </p>
        </motion.div>

        {/* Estadísticas */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="stumble-card p-6"
            >
              <div className="text-4xl mb-2">👥</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--stumble-pink)' }}>
                {stats.totalUsuarios}
              </div>
              <div className="text-gray-600">Usuarios</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="stumble-card p-6"
            >
              <div className="text-4xl mb-2">🎪</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--stumble-cyan)' }}>
                {stats.totalFerias}
              </div>
              <div className="text-gray-600">Ferias ({stats.feriasActivas} activas)</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="stumble-card p-6"
            >
              <div className="text-4xl mb-2">🎁</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--stumble-yellow)' }}>
                {stats.totalProductos}
              </div>
              <div className="text-gray-600">Productos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="stumble-card p-6"
            >
              <div className="text-4xl mb-2">💰</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--stumble-green)' }}>
                ${stats.totalGanancias}
              </div>
              <div className="text-gray-600">Ganancias Totales</div>
            </motion.div>
          </div>
        )}

        {/* Accesos Rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Link href="/ferias">
            <div className="stumble-card p-6 cursor-pointer">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--stumble-pink)' }}>
                🎡 Ver Todas las Ferias
              </h3>
              <p className="text-gray-600">
                Gestiona todas las ferias del condominio
              </p>
            </div>
          </Link>

          <Link href="/productos">
            <div className="stumble-card p-6 cursor-pointer">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--stumble-cyan)' }}>
                🎁 Ver Todos los Productos
              </h3>
              <p className="text-gray-600">
                Revisa todos los productos en venta
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Gestión de Usuarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="stumble-card p-8"
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--stumble-yellow)' }}>
            👥 Gestión de Usuarios
          </h2>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <div className="text-xs text-gray-500">
                      Registrado: {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {user._id === session?.user?.id ? (
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                      Tú ({user.role})
                    </span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value as 'admin' | 'user')}
                      className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-pink-400 focus:outline-none"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Diálogo de confirmación */}
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
        />
      </div>
    </div>
  );
}
