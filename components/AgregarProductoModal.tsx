'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AgregarProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  feriaId: string;
  onProductoCreado: () => void;
}

export default function AgregarProductoModal({
  isOpen,
  onClose,
  feriaId,
  onProductoCreado,
}: AgregarProductoModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'juguete',
    precio: '',
    estado: 3,
  });
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (imagenes.length + files.length > 5) {
      setError('Máximo 5 imágenes por producto');
      return;
    }

    // Validar tamaño y tipo
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('Cada imagen debe ser menor a 5MB');
        return false;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Solo se permiten imágenes (JPEG, PNG, WebP)');
        return false;
      }
      return true;
    });

    setImagenes(prev => [...prev, ...validFiles]);
    
    // Crear previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      // Subir imágenes primero
      const imageUrls: string[] = [];
      
      for (const imagen of imagenes) {
        const formDataImg = new FormData();
        formDataImg.append('file', imagen);
        formDataImg.append('feriaId', feriaId);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formDataImg,
        });

        if (!uploadRes.ok) {
          throw new Error('Error al subir imagen');
        }

        const uploadData = await uploadRes.json();
        imageUrls.push(uploadData.url);
      }

      // Crear producto
      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        feriaId,
        imagenes: imageUrls,
      };

      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoData),
      });

      if (!res.ok) {
        throw new Error('Error al crear producto');
      }

      // Resetear formulario
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: 'juguete',
        precio: '',
        estado: 3,
      });
      setImagenes([]);
      setPreviewUrls([]);
      onProductoCreado();
      onClose();
    } catch (err) {
      setError('Error al crear el producto. Intenta de nuevo.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative stumble-card p-4 sm:p-8 max-w-2xl w-full max-h-[95vh] overflow-y-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--stumble-pink)' }}>
              🎁 Agregar Producto
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            <form id="producto-form" onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-20">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Nombre del producto *
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Ej: Peluche de oso"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Descripción *
                </label>
                <textarea
                  required
                  maxLength={500}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                  rows={3}
                  placeholder="Describe tu producto..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.descripcion.length}/500 caracteres
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Categoría *
                  </label>
                  <select
                    required
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-2 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                  >
                    <option value="juguete">🧸 Juguete</option>
                    <option value="libro">📚 Libro</option>
                    <option value="ropa">👕 Ropa</option>
                    <option value="electronico">🎮 Electrónico</option>
                    <option value="otro">🎁 Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Estado *
                  </label>
                  <select
                    required
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: parseInt(e.target.value) })}
                    className="w-full px-2 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Nuevo</option>
                    <option value="4">⭐⭐⭐⭐ Excelente</option>
                    <option value="3">⭐⭐⭐ Bueno</option>
                    <option value="2">⭐⭐ Regular</option>
                    <option value="1">⭐ Desgastado</option>
                    <option value="0">Para reparar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm sm:text-base">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm sm:text-base"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Imágenes (máximo 5)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  capture="environment"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none text-sm"
                  disabled={imagenes.length >= 5}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {imagenes.length}/5 imágenes • Máximo 5MB por imagen
                </p>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-24 sm:h-32 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Botones fijos al fondo */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 -mx-4 sm:-mx-8 -mb-4 sm:-mb-8 flex gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={uploading}
                className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="producto-form"
                disabled={uploading}
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('producto-form') as HTMLFormElement;
                  if (form) {
                    form.requestSubmit();
                  }
                }}
                className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 text-sm sm:text-base"
                style={{ backgroundColor: 'var(--stumble-pink)' }}
              >
                {uploading ? 'Subiendo...' : 'Crear Producto'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
