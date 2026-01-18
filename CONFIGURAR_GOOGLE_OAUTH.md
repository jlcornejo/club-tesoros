# 🔐 Configurar Google OAuth - Guía Rápida (5 minutos)

## Paso 1: Ir a Google Cloud Console

👉 https://console.cloud.google.com

## Paso 2: Crear Proyecto

1. Click en el selector de proyectos (arriba a la izquierda)
2. Click en "Nuevo Proyecto"
3. Nombre: **Club Tesoros**
4. Click "Crear"
5. Espera 10 segundos y selecciona el proyecto

## Paso 3: Configurar Pantalla de Consentimiento

1. En el menú lateral: **APIs y servicios** → **Pantalla de consentimiento de OAuth**
2. Selecciona **Externo**
3. Click "Crear"
4. Llena el formulario:
   - **Nombre de la aplicación**: Club Tesoros
   - **Correo de asistencia**: tu-email@gmail.com
   - **Correo del desarrollador**: tu-email@gmail.com
5. Click "Guardar y continuar"
6. En "Permisos" → Click "Guardar y continuar" (sin agregar nada)
7. En "Usuarios de prueba" → Click "Guardar y continuar"
8. Click "Volver al panel"

## Paso 4: Crear Credenciales OAuth

1. En el menú lateral: **APIs y servicios** → **Credenciales**
2. Click "Crear credenciales" → **ID de cliente de OAuth 2.0**
3. Tipo de aplicación: **Aplicación web**
4. Nombre: **Club Tesoros Web**
5. **Orígenes de JavaScript autorizados**:
   - Click "+ Agregar URI"
   - Agregar: `http://localhost:3000`
6. **URIs de redireccionamiento autorizados**:
   - Click "+ Agregar URI"
   - Agregar: `http://localhost:3000/api/auth/callback/google`
7. Click "Crear"

## Paso 5: Copiar Credenciales

Se abrirá un modal con:
- **ID de cliente**: Algo como `123456789-abc...apps.googleusercontent.com`
- **Secreto del cliente**: Algo como `GOCSPX-abc123...`

**Copia estos valores** y pégalos en tu `.env.local`:

```env
GOOGLE_CLIENT_ID=pega-aqui-el-id-de-cliente
GOOGLE_CLIENT_SECRET=pega-aqui-el-secreto
```

## Paso 6: Generar NEXTAUTH_SECRET

En tu terminal, ejecuta:

```bash
openssl rand -base64 32
```

Copia el resultado y pégalo en `.env.local`:

```env
NEXTAUTH_SECRET=el-resultado-del-comando-openssl
```

## ✅ ¡Listo!

Tu `.env.local` debe verse así:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://club-tesoros-svc:G3NxAU03c7XQpHZJ@cluster-dev.zvpjj2k.mongodb.net/club-tesoros?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado-con-openssl

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123...
```

## 🚀 Probar

1. Guarda el archivo `.env.local`
2. Reinicia el servidor: `npm run dev`
3. Ve a http://localhost:3000/login
4. Click en "Iniciar sesión con Google"

## ⚠️ Pantalla "Esta app no está verificada"

Es normal en desarrollo. Click en "Avanzado" → "Ir a Club Tesoros (no seguro)"

## 🌐 Para Producción (Vercel)

Cuando hagas deploy, agrega también:

**Orígenes autorizados**:
- `https://tu-app.vercel.app`

**URIs de redireccionamiento**:
- `https://tu-app.vercel.app/api/auth/callback/google`

---

**¿Problemas?** Revisa que:
- El proyecto esté seleccionado en Google Cloud Console
- Las URLs no tengan espacios ni caracteres extra
- Hayas guardado `.env.local` y reiniciado el servidor
