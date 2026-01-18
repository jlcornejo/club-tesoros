# 🎪 Club Tesoros

Plataforma para gestionar ferias de pulgas en el Condominio Nueva Toledo. Diseño inspirado en Stumble Guys con colores vibrantes y divertidos.

> 📚 **¿Nuevo aquí?** Comienza con [EMPEZAR_AQUI.md](./EMPEZAR_AQUI.md) o revisa el [INDICE.md](./INDICE.md) para navegar toda la documentación.

## 🌟 Características

- ✨ Gestión de ferias de pulgas
- 🎁 Catálogo de productos (juguetes, libros, ropa, electrónicos)
- 🎨 Diseño colorido inspirado en Stumble Guys
- 📱 Responsive y animaciones suaves con Framer Motion
- 🔄 API REST integrada con Next.js
- 💾 Base de datos MongoDB Atlas

## 🚀 Tecnologías

- **Frontend**: Next.js 16, React, TypeScript
- **Estilos**: Tailwind CSS, Shadcn/UI
- **Animaciones**: Framer Motion
- **Backend**: Next.js API Routes (monorepo)
- **Base de datos**: MongoDB con Mongoose
- **Deployment**: Vercel (recomendado)

## 📦 Instalación

**Requisitos**: Node.js >= 20.9.0

Si usas **nvm**, el proyecto incluye un archivo `.nvmrc`:
```bash
nvm use  # Cambia automáticamente a Node.js 20
```

Verifica tu versión:
```bash
node -v  # Debe mostrar v20.x.x o superior
```

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd club-tesoros
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Edita `.env.local` con tus credenciales de MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/club-tesoros?retryWrites=true&w=majority
```

## 🗄️ Configurar MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster (gratis)
3. Crea un usuario de base de datos
4. Obtén tu connection string
5. Reemplaza `<username>` y `<password>` en tu `.env.local`

## 🏃‍♂️ Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
club-tesoros/
├── app/
│   ├── api/              # API Routes
│   │   ├── ferias/       # Endpoints de ferias
│   │   └── productos/    # Endpoints de productos
│   ├── ferias/           # Páginas de ferias
│   ├── productos/        # Páginas de productos
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
├── lib/
│   ├── mongodb.ts        # Conexión a MongoDB
│   └── utils.ts          # Utilidades
├── models/
│   ├── Feria.ts          # Modelo de Feria
│   └── Producto.ts       # Modelo de Producto
└── .env.local            # Variables de entorno
```

## 🎨 Paleta de Colores (Stumble Guys)

- **Rosa**: #FF6B9D
- **Amarillo**: #FFC93C
- **Cyan**: #4ECDC4
- **Verde**: #95E1D3
- **Rojo**: #FF6B6B
- **Púrpura**: #667eea - #764ba2

## 📝 API Endpoints

### Ferias
- `GET /api/ferias` - Obtener todas las ferias
- `POST /api/ferias` - Crear una feria
- `GET /api/ferias/[id]` - Obtener una feria
- `PUT /api/ferias/[id]` - Actualizar una feria
- `DELETE /api/ferias/[id]` - Eliminar una feria

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos?feriaId=xxx` - Filtrar por feria
- `POST /api/productos` - Crear un producto
- `GET /api/productos/[id]` - Obtener un producto
- `PUT /api/productos/[id]` - Actualizar un producto
- `DELETE /api/productos/[id]` - Eliminar un producto

## 🚀 Deploy en Vercel

1. Sube tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno en Vercel
4. Deploy automático

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto es para la comunidad de Nueva Toledo.

## 📄 Licencia

MIT

---

Hecho con ❤️ para el Condominio Nueva Toledo
