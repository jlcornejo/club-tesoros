# 🚀 Configurar Producción en Vercel

## Problema Actual
El login con Google no funciona en `club-tesoros.vercel.app` porque falta configuración.

## Solución en 2 Pasos

### Paso 1: Actualizar Google Cloud Console

1. Ve a: https://console.cloud.google.com
2. Selecciona tu proyecto "Club Tesoros"
3. Ve a: **APIs y servicios** → **Credenciales**
4. Click en tu credencial OAuth existente
5. En **Orígenes de JavaScript autorizados**, agrega:
   ```
   https://club-tesoros.vercel.app
   ```
6. En **URIs de redireccionamiento autorizados**, agrega:
   ```
   https://club-tesoros.vercel.app/api/auth/callback/google
   ```
7. Click "Guardar"

### Paso 2: Configurar Variables de Entorno en Vercel

1. Ve a: https://vercel.com/tu-usuario/club-tesoros
2. Click en **Settings** → **Environment Variables**
3. Agrega estas variables (una por una):

#### Variables Requeridas:

```env
MONGODB_URI
mongodb+srv://club-tesoros-svc:G3NxAU03c7XQpHZJ@cluster-dev.zvpjj2k.mongodb.net/club-tesoros?retryWrites=true&w=majority
```

```env
NEXTAUTH_URL
https://club-tesoros.vercel.app
```

```env
NEXTAUTH_SECRET
A142SIFh3njqnfiIxNrypVeGbcYvDBfP4yYyym7ITJo=
```

```env
GOOGLE_CLIENT_ID
[tu-client-id-de-google].apps.googleusercontent.com
```

```env
GOOGLE_CLIENT_SECRET
[tu-client-secret-de-google]
```

```env
NEXT_PUBLIC_APP_NAME
Club Tesoros
```

```env
NEXT_PUBLIC_APP_URL
https://club-tesoros.vercel.app
```

#### Variables Opcionales (si usas AWS S3):

```env
AWS_ACCESS_KEY_ID
[tu-access-key]
```

```env
AWS_SECRET_ACCESS_KEY
[tu-secret-key]
```

```env
AWS_REGION
us-east-1
```

```env
AWS_S3_BUCKET
[tu-bucket-name]
```

### Paso 3: Redeploy

Después de agregar las variables:
1. Ve a **Deployments**
2. Click en los 3 puntos del último deployment
3. Click "Redeploy"

O simplemente haz un nuevo commit y push a tu repositorio.

## ✅ Verificar

1. Ve a: https://club-tesoros.vercel.app/login
2. Click en "Iniciar sesión con Google"
3. Deberías poder loguearte sin problemas

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
- Verifica que agregaste exactamente: `https://club-tesoros.vercel.app/api/auth/callback/google`
- Sin espacios, sin barra final

### Error: "Invalid client"
- Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén correctos en Vercel
- Copia y pega directamente desde Google Cloud Console

### Error de conexión a MongoDB
- Verifica que `MONGODB_URI` esté correcto
- Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP (0.0.0.0/0) o agrega las IPs de Vercel

### El login funciona pero no guarda la sesión
- Verifica que `NEXTAUTH_SECRET` esté configurado
- Debe ser el mismo valor en todas las variables de entorno

## 📝 Notas

- Las variables de entorno en Vercel se aplican automáticamente en el siguiente deployment
- Puedes tener diferentes valores para Preview y Production
- Recomendado: Usa la misma base de datos MongoDB para desarrollo y producción (con colecciones diferentes si prefieres)

