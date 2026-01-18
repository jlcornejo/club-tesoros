# 🚀 Guía de Deployment - Club Tesoros

## Deployment en Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js y ofrece deployment gratuito con excelente rendimiento.

### ⚠️ Nota sobre HTTPS

**En desarrollo local**: Verás advertencias de seguridad porque usas `http://localhost:3000` - esto es completamente normal y seguro.

**En Vercel**: ✅ HTTPS automático con certificado SSL válido - sin advertencias, sin configuración adicional.

### Pasos para Deploy

#### 1. Preparar el Repositorio

```bash
# Inicializar git si no lo has hecho
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Club Tesoros"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/club-tesoros.git
git branch -M main
git push -u origin main
```

#### 2. Configurar Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en "Add New Project"
4. Importa tu repositorio `club-tesoros`
5. Vercel detectará automáticamente que es un proyecto Next.js

#### 3. Configurar Variables de Entorno

En la configuración del proyecto en Vercel, agrega:

```env
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/club-tesoros?retryWrites=true&w=majority
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=genera-un-secret-seguro-aqui
NEXT_PUBLIC_APP_NAME=Club Tesoros
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

**Importante**: Usa variables de entorno de producción, no las de desarrollo.

#### 4. Deploy

1. Click en "Deploy"
2. Espera a que termine el build (2-3 minutos)
3. ¡Tu app estará en línea! 🎉

### URL de Producción

Tu app estará disponible en:
```
https://club-tesoros.vercel.app
```

O puedes configurar un dominio personalizado.

## Configuración de MongoDB Atlas para Producción

### Whitelist de IPs

1. Ve a MongoDB Atlas → Network Access
2. Agrega la IP de Vercel o permite todas las IPs:
   - Click en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - Esto es seguro porque usas autenticación

### Optimización de Conexión

En producción, MongoDB Atlas maneja automáticamente:
- Connection pooling
- Failover automático
- Backups diarios

## Deployment Alternativo: Railway

Railway es otra excelente opción gratuita.

### Pasos

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio de GitHub
3. Railway detectará Next.js automáticamente
4. Agrega las variables de entorno
5. Deploy automático

## Deployment Alternativo: Netlify

Netlify también soporta Next.js.

### Pasos

1. Ve a [netlify.com](https://netlify.com)
2. Importa tu repositorio
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Agrega variables de entorno
5. Deploy

## Optimizaciones para Producción

### 1. Optimización de Imágenes

Si agregas imágenes de productos, usa el componente `Image` de Next.js:

```tsx
import Image from 'next/image';

<Image
  src="/productos/imagen.jpg"
  alt="Producto"
  width={300}
  height={300}
  priority
/>
```

### 2. Caché de API

Agrega revalidación en tus API routes:

```typescript
export const revalidate = 60; // Revalidar cada 60 segundos
```

### 3. Compresión

Next.js comprime automáticamente en producción, pero puedes optimizar más:

```typescript
// next.config.ts
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

### 4. Analytics

Agrega Vercel Analytics (gratis):

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Monitoreo

### Vercel Dashboard

Monitorea:
- Requests por segundo
- Tiempo de respuesta
- Errores
- Uso de ancho de banda

### MongoDB Atlas

Monitorea:
- Conexiones activas
- Operaciones por segundo
- Uso de almacenamiento
- Performance de queries

## Backups

### MongoDB Atlas

- Backups automáticos diarios (gratis)
- Retención de 7 días
- Restauración con un click

### Código

- GitHub mantiene tu historial
- Haz commits frecuentes
- Usa branches para features nuevas

## Dominios Personalizados

### En Vercel

1. Ve a Settings → Domains
2. Agrega tu dominio
3. Configura DNS según las instrucciones
4. SSL automático con Let's Encrypt

### Ejemplo de DNS

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## CI/CD Automático

Con Vercel, cada push a `main` despliega automáticamente:

```bash
git add .
git commit -m "Nueva feature"
git push origin main
# Deploy automático en Vercel
```

### Preview Deployments

Cada Pull Request genera un preview:
- URL única para testing
- No afecta producción
- Perfecto para revisiones

## Troubleshooting

### Error: Cannot connect to MongoDB

**Solución**:
1. Verifica que MONGODB_URI esté en variables de entorno de Vercel
2. Confirma que 0.0.0.0/0 esté en Network Access de MongoDB
3. Revisa los logs en Vercel Dashboard

### Error: Build Failed

**Solución**:
1. Revisa los logs de build en Vercel
2. Asegúrate de que `npm run build` funcione localmente
3. Verifica que todas las dependencias estén en package.json

### Error: 500 Internal Server Error

**Solución**:
1. Revisa Function Logs en Vercel
2. Verifica variables de entorno
3. Chequea conexión a MongoDB

## Costos

### Vercel (Hobby Plan - Gratis)
- ✅ Deployments ilimitados
- ✅ 100 GB bandwidth/mes
- ✅ SSL automático
- ✅ Preview deployments
- ✅ Analytics básico

### MongoDB Atlas (Free Tier)
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Backups automáticos
- ✅ Suficiente para empezar

### Upgrade Recomendado

Cuando crezcas:
- **Vercel Pro**: $20/mes - Más bandwidth y features
- **MongoDB M10**: $57/mes - Cluster dedicado

## Checklist Pre-Deploy

- [ ] Código en GitHub
- [ ] Variables de entorno configuradas
- [ ] MongoDB Atlas configurado
- [ ] Network Access permite IPs de Vercel
- [ ] `npm run build` funciona localmente
- [ ] .env.local NO está en git
- [ ] README actualizado

## Post-Deploy

- [ ] Probar todas las funcionalidades
- [ ] Crear primera feria de prueba
- [ ] Agregar productos de ejemplo
- [ ] Compartir URL con la comunidad
- [ ] Configurar dominio personalizado (opcional)

---

¡Tu app está lista para el mundo! 🌍✨

Para soporte, revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
