# 📁 Estructura del Proyecto Club Tesoros

## Árbol de Directorios

```
club-tesoros/
│
├── app/                          # Directorio principal de Next.js App Router
│   ├── api/                      # API Routes (Backend)
│   │   ├── ferias/
│   │   │   ├── route.ts          # GET, POST /api/ferias
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE /api/ferias/:id
│   │   └── productos/
│   │       ├── route.ts          # GET, POST /api/productos
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE /api/productos/:id
│   │
│   ├── ferias/                   # Páginas de Ferias
│   │   ├── page.tsx              # Lista de ferias
│   │   ├── nueva/
│   │   │   └── page.tsx          # Crear nueva feria
│   │   └── [id]/
│   │       └── page.tsx          # Detalle de feria
│   │
│   ├── productos/                # Páginas de Productos
│   │   └── page.tsx              # Lista de productos
│   │
│   ├── globals.css               # Estilos globales (tema Stumble Guys)
│   ├── layout.tsx                # Layout principal con Navbar
│   └── page.tsx                  # Página de inicio
│
├── components/                   # Componentes reutilizables
│   └── Navbar.tsx                # Barra de navegación
│
├── lib/                          # Utilidades y configuraciones
│   ├── mongodb.ts                # Conexión a MongoDB
│   └── utils.ts                  # Funciones auxiliares (shadcn)
│
├── models/                       # Modelos de Mongoose
│   ├── Feria.ts                  # Schema de Feria
│   └── Producto.ts               # Schema de Producto
│
├── scripts/                      # Scripts de utilidad
│   └── test-connection.ts        # Probar conexión a MongoDB
│
├── public/                       # Archivos estáticos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .env.local                    # Variables de entorno (NO subir a git)
├── .env.example                  # Ejemplo de variables de entorno
├── .gitignore                    # Archivos ignorados por git
├── components.json               # Configuración de shadcn/ui
├── eslint.config.mjs             # Configuración de ESLint
├── next.config.ts                # Configuración de Next.js
├── package.json                  # Dependencias y scripts
├── postcss.config.mjs            # Configuración de PostCSS
├── tsconfig.json                 # Configuración de TypeScript
│
├── README.md                     # Documentación principal
├── INICIO_RAPIDO.md              # Guía de inicio rápido
├── DATOS_EJEMPLO.md              # Datos de ejemplo para probar
└── ESTRUCTURA.md                 # Este archivo
```

## 📄 Descripción de Archivos Clave

### Backend (API Routes)

#### `/app/api/ferias/route.ts`
- **GET**: Obtiene todas las ferias
- **POST**: Crea una nueva feria

#### `/app/api/ferias/[id]/route.ts`
- **GET**: Obtiene una feria específica
- **PUT**: Actualiza una feria
- **DELETE**: Elimina una feria

#### `/app/api/productos/route.ts`
- **GET**: Obtiene todos los productos (con filtro opcional por feriaId)
- **POST**: Crea un nuevo producto

#### `/app/api/productos/[id]/route.ts`
- **GET**: Obtiene un producto específico
- **PUT**: Actualiza un producto
- **DELETE**: Elimina un producto

### Frontend (Páginas)

#### `/app/page.tsx`
Página de inicio con:
- Título animado estilo Stumble Guys
- Cards para acceder a Ferias y Productos
- Información sobre el proyecto

#### `/app/ferias/page.tsx`
Lista de ferias con:
- Grid de cards animadas
- Estado de cada feria (planificada/activa/finalizada)
- Botón para crear nueva feria

#### `/app/ferias/nueva/page.tsx`
Formulario para crear feria con:
- Nombre, fecha, descripción
- Selector de estado
- Validación de campos

#### `/app/ferias/[id]/page.tsx`
Detalle de feria con:
- Información completa de la feria
- Lista de productos asociados
- Animaciones de entrada

#### `/app/productos/page.tsx`
Catálogo de productos con:
- Grid responsive
- Emojis por categoría
- Indicador de vendido/disponible

### Modelos de Datos

#### `models/Feria.ts`
```typescript
{
  nombre: string
  fecha: Date
  descripcion: string
  estado: 'planificada' | 'activa' | 'finalizada'
  imagen?: string
  timestamps: true
}
```

#### `models/Producto.ts`
```typescript
{
  nombre: string
  descripcion: string
  categoria: 'juguete' | 'libro' | 'ropa' | 'electronico' | 'otro'
  precio: number
  imagen?: string
  vendedor: string
  feriaId: string
  vendido: boolean
  timestamps: true
}
```

### Componentes

#### `components/Navbar.tsx`
Barra de navegación con:
- Logo y nombre del proyecto
- Enlaces a Ferias y Productos
- Efecto glassmorphism
- Animación de entrada

### Configuración

#### `lib/mongodb.ts`
- Conexión singleton a MongoDB
- Caché de conexión para optimización
- Manejo de errores

#### `app/globals.css`
- Variables CSS del tema Stumble Guys
- Clases utilitarias personalizadas
- Animaciones y transiciones

## 🎨 Sistema de Diseño

### Colores Principales
- **Rosa**: `#FF6B9D` - Botones y elementos principales
- **Amarillo**: `#FFC93C` - Acentos y highlights
- **Cyan**: `#4ECDC4` - Enlaces y elementos secundarios
- **Verde**: `#95E1D3` - Estados de éxito
- **Rojo**: `#FF6B6B` - Estados de error/vendido
- **Púrpura**: `#667eea` - `#764ba2` - Fondo degradado

### Clases CSS Personalizadas
- `.stumble-card`: Cards con sombra y hover effect
- `.stumble-button`: Botones con gradiente y animación
- `.stumble-title`: Títulos con gradiente de texto

## 🔧 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Linter de código
npm run test:db    # Probar conexión a MongoDB
```

## 📦 Dependencias Principales

### Producción
- `next`: Framework React
- `react`, `react-dom`: Librería UI
- `framer-motion`: Animaciones
- `mongodb`, `mongoose`: Base de datos
- `tailwindcss`: Estilos
- `shadcn/ui`: Componentes UI

### Desarrollo
- `typescript`: Tipado estático
- `eslint`: Linter
- `tsx`: Ejecutar TypeScript
- `dotenv`: Variables de entorno

## 🚀 Flujo de Datos

```
Usuario → Página (React) → API Route → MongoDB
                ↓
         Framer Motion
                ↓
         Animaciones
```

## 📱 Rutas de la Aplicación

```
/                    → Página de inicio
/ferias              → Lista de ferias
/ferias/nueva        → Crear feria
/ferias/[id]         → Detalle de feria
/productos           → Lista de productos
/api/ferias          → API de ferias
/api/productos       → API de productos
```

## 🔐 Variables de Entorno

```env
MONGODB_URI          → Connection string de MongoDB Atlas
NEXTAUTH_URL         → URL de la aplicación
NEXTAUTH_SECRET      → Secret para autenticación (futuro)
NEXT_PUBLIC_APP_NAME → Nombre de la app
NEXT_PUBLIC_APP_URL  → URL pública
```

---

Esta estructura está diseñada para ser escalable y fácil de mantener. ¡Disfruta desarrollando! 🎉
