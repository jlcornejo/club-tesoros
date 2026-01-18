# 🎪 Club Tesoros

Plataforma web para gestionar ferias de pulgas y venta de productos de segunda mano.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ✨ Características

- 🔐 **Autenticación con Google OAuth**
- 🎪 **Gestión de Ferias** - Crea y administra ferias de pulgas
- 🎁 **Productos con Imágenes** - Sube hasta 5 fotos por producto
- 📱 **Responsive** - Funciona en móvil, tablet y desktop
- 📸 **Cámara móvil** - Toma fotos directamente desde tu teléfono
- 👥 **Sistema de Roles** - Admin y usuarios normales
- ☁️ **AWS S3** - Almacenamiento de imágenes en la nube

## 📋 Requisitos

- Node.js 18+ (recomendado 20.x)
- MongoDB Atlas (base de datos)
- Cuenta de Google Cloud (OAuth)
- Cuenta de AWS (S3 para imágenes)

## 🔧 Configuración

### 1. MongoDB
Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y obtén tu connection string.

### 2. Google OAuth
Sigue la guía: [`docs/CONFIGURAR_GOOGLE_OAUTH.md`](docs/CONFIGURAR_GOOGLE_OAUTH.md)

### 3. AWS S3
Sigue la guía: [`docs/CONFIGURAR_AWS_S3.md`](docs/CONFIGURAR_AWS_S3.md)

### 4. Variables de Entorno
Completa tu archivo `.env.local`:

```bash
# MongoDB
MONGODB_URI=tu_mongodb_uri

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_aleatorio

# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret

# AWS S3
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=jlcr-club-tesoros
```

## 📚 Documentación

Toda la documentación está en la carpeta [`docs/`](docs/):

- [Inicio Rápido](docs/INICIO_RAPIDO.md)
- [Estructura del Proyecto](docs/ESTRUCTURA.md)
- [Configurar Google OAuth](docs/CONFIGURAR_GOOGLE_OAUTH.md)
- [Configurar AWS S3](docs/CONFIGURAR_AWS_S3.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Índice Completo](docs/INDICE.md)

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Autenticación**: NextAuth.js v5
- **Base de Datos**: MongoDB + Mongoose
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Almacenamiento**: AWS S3
- **Lenguaje**: TypeScript

## 📱 Uso Móvil

La aplicación está optimizada para móviles:
- Toma fotos directamente con la cámara de tu teléfono
- Interfaz responsive y táctil
- Diseño inspirado en Stumble Guys

## 🎨 Diseño

Interfaz colorida y divertida inspirada en Stumble Guys con:
- Colores vibrantes (rosa, naranja, azul, verde)
- Animaciones suaves
- Tarjetas con sombras y bordes redondeados
- Emojis para mejor UX

## 👥 Sistema de Roles

- **Admin**: Primer usuario registrado, acceso total
- **Usuario**: Puede crear ferias y productos propios

## 📄 Licencia

MIT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir los cambios.

---

Hecho con ❤️ para la comunidad de Club Tesoros
