# 🚀 Inicio Rápido - Club Tesoros

## Pasos para comenzar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto llamado "Club Tesoros"
4. Crea un cluster (selecciona el plan FREE)
5. En "Database Access", crea un usuario:
   - Username: `clubtesoros`
   - Password: (genera una contraseña segura)
6. En "Network Access", agrega tu IP o permite acceso desde cualquier lugar (0.0.0.0/0)
7. Haz clic en "Connect" → "Connect your application"
8. Copia el connection string

### 3. Configurar variables de entorno

Copia el archivo de ejemplo:
```bash
cp .env.example .env.local
```

Edita `.env.local` y reemplaza con tu connection string:
```env
MONGODB_URI=mongodb+srv://clubtesoros:TU_PASSWORD@cluster0.xxxxx.mongodb.net/club-tesoros?retryWrites=true&w=majority
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🎉

## 📱 Funcionalidades disponibles

### Página Principal (/)
- Vista general del proyecto
- Acceso rápido a Ferias y Productos

### Ferias (/ferias)
- Lista de todas las ferias
- Crear nueva feria
- Ver detalle de cada feria con sus productos

### Productos (/productos)
- Catálogo completo de productos
- Filtrado por categorías
- Estado de vendido/disponible

## 🎨 Personalización

Los colores del tema Stumble Guys están en `app/globals.css`:
- Rosa: `--stumble-pink`
- Amarillo: `--stumble-yellow`
- Cyan: `--stumble-cyan`
- Verde: `--stumble-green`
- Rojo: `--stumble-red`

## 🐛 Solución de problemas

### Error de conexión a MongoDB
- Verifica que tu IP esté en la lista blanca de MongoDB Atlas
- Confirma que el usuario y contraseña sean correctos
- Asegúrate de que el connection string esté completo

### Puerto 3000 ocupado
```bash
npm run dev -- -p 3001
```

### Limpiar caché de Next.js
```bash
rm -rf .next
npm run dev
```

## 📚 Próximos pasos

1. Crear tu primera feria
2. Agregar productos a la feria
3. Personalizar los colores si lo deseas
4. Desplegar en Vercel cuando estés listo

¡Disfruta gestionando las ferias de pulgas! 🎪
