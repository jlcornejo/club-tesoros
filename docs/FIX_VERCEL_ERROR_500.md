# 🔧 Fix Error 500 en Vercel

## Problema Detectado

Error 500 en `/api/auth/error` - Problemas con la configuración de variables de entorno.

## ✅ Correcciones Necesarias

### 1. URLs deben incluir `https://`

En Vercel, actualiza estas variables:

```env
NEXTAUTH_URL=https://club-tesoros-dev.vercel.app
NEXT_PUBLIC_APP_URL=https://club-tesoros-dev.vercel.app
```

⚠️ **IMPORTANTE:** Deben empezar con `https://` (no solo el dominio)

### 2. Verifica que todas las variables estén configuradas

Asegúrate de tener TODAS estas variables en Vercel:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/club-tesoros?retryWrites=true&w=majority

NEXTAUTH_URL=https://club-tesoros-dev.vercel.app
NEXTAUTH_SECRET=tu-nextauth-secret-aqui

GOOGLE_CLIENT_ID=tu-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-google-client-secret

NEXT_PUBLIC_APP_NAME=Club Tesoros
NEXT_PUBLIC_APP_URL=https://club-tesoros-dev.vercel.app

AWS_ACCESS_KEY_ID=tu-aws-access-key
AWS_SECRET_ACCESS_KEY=tu-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=tu-bucket-name
```

⚠️ **IMPORTANTE:** Usa tus valores reales de `.env.local`, estos son solo placeholders.

### 3. Actualiza Google OAuth Console

Ve a: https://console.cloud.google.com/apis/credentials

Edita tu OAuth Client ID y asegúrate de tener:

**Orígenes de JavaScript autorizados:**
```
https://club-tesoros-dev.vercel.app
```

**URIs de redireccionamiento autorizados:**
```
https://club-tesoros-dev.vercel.app/api/auth/callback/google
```

⚠️ **Sin barra final** - No pongas `/` al final de las URLs

### 4. Verifica MongoDB Atlas

1. Ve a MongoDB Atlas: https://cloud.mongodb.com
2. Network Access → Verifica que `0.0.0.0/0` esté permitido
3. Database Access → Verifica que el usuario `club-tesoros-svc` exista

### 5. Redeploy en Vercel

Después de actualizar las variables:

1. Ve a tu proyecto en Vercel
2. Deployments → Click en los 3 puntos del último deploy
3. "Redeploy"

O desde terminal:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

## 🔍 Debugging

### Ver logs en Vercel

1. Ve a tu proyecto en Vercel
2. Click en el deployment actual
3. Click en "Functions" o "Runtime Logs"
4. Busca errores de MongoDB o NextAuth

### Errores Comunes

#### Error: "MongoServerError: bad auth"
**Causa:** Credenciales incorrectas en MONGODB_URI

**Solución:** Verifica usuario y password en MongoDB Atlas

#### Error: "redirect_uri_mismatch"
**Causa:** URL no está en Google OAuth Console

**Solución:** Agrega la URL exacta a Google Console

#### Error: "NEXTAUTH_URL is not defined"
**Causa:** Variable no está en Vercel o no tiene `https://`

**Solución:** Agrega `https://` al inicio de la URL

---

## ✅ Checklist

- [ ] NEXTAUTH_URL tiene `https://` al inicio
- [ ] NEXT_PUBLIC_APP_URL tiene `https://` al inicio
- [ ] Todas las variables AWS están configuradas
- [ ] Google OAuth tiene las URLs correctas
- [ ] MongoDB permite acceso desde 0.0.0.0/0
- [ ] Redeployado después de cambios
- [ ] Probado login desde móvil

---

## 🆘 Si sigue sin funcionar

1. **Revisa los logs en Vercel:**
   - Deployments → Tu deploy → Runtime Logs
   - Busca el error específico

2. **Prueba la conexión a MongoDB:**
   - Crea un endpoint de prueba: `/api/test-db`
   - Intenta conectar y ver el error

3. **Verifica las variables:**
   - Settings → Environment Variables
   - Asegúrate de que no haya espacios extra
   - Verifica que estén en "All Environments" o "Production"

4. **Comparte el error específico:**
   - Copia el mensaje de error de los logs
   - Busca en la consola del navegador (F12)
