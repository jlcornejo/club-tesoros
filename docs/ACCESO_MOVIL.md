# 📱 Solución: Acceso desde Móvil (iPhone)

## Problema
El login no funciona desde el móvil porque `localhost:3000` solo es accesible desde tu computadora.

## Soluciones

### ✅ Opción 1: Deploy en Vercel (RECOMENDADO)

Esta es la mejor solución para acceso móvil real:

#### 1. Sube tu código a GitHub
```bash
cd club-tesoros
git add .
git commit -m "Preparar para deploy"
git push origin main
```

#### 2. Deploy en Vercel
1. Ve a https://vercel.com
2. Importa tu repositorio
3. Configura las variables de entorno (copia de .env.local)
4. Deploy

#### 3. Actualiza Google OAuth
En https://console.cloud.google.com/apis/credentials:

**Agregar a "Orígenes de JavaScript autorizados":**
- `https://tu-app.vercel.app`

**Agregar a "URIs de redireccionamiento autorizados":**
- `https://tu-app.vercel.app/api/auth/callback/google`

#### 4. Actualiza variables en Vercel
```env
NEXTAUTH_URL=https://tu-app.vercel.app
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
```

✅ **Ventajas:**
- HTTPS automático (requerido por Google OAuth)
- Accesible desde cualquier dispositivo
- Gratis
- Deploy automático en cada push

---

### 🏠 Opción 2: Red Local (Solo para Testing)

Para probar en tu iPhone conectado a la misma WiFi:

#### 1. Obtén tu IP local
```bash
# En Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Busca algo como: inet 192.168.1.X
```

#### 2. Actualiza .env.local
Cambia `localhost` por tu IP:
```env
NEXTAUTH_URL=http://192.168.1.X:3000
NEXT_PUBLIC_APP_URL=http://192.168.1.X:3000
```

#### 3. Actualiza Google OAuth
En https://console.cloud.google.com/apis/credentials:

**Agregar a "Orígenes de JavaScript autorizados":**
- `http://192.168.1.X:3000`

**Agregar a "URIs de redireccionamiento autorizados":**
- `http://192.168.1.X:3000/api/auth/callback/google`

#### 4. Reinicia el servidor
```bash
npm run dev
```

#### 5. Accede desde tu iPhone
Abre Safari y ve a: `http://192.168.1.X:3000`

⚠️ **Limitaciones:**
- Solo funciona en tu red WiFi
- Google OAuth puede mostrar advertencias con HTTP
- Tu IP puede cambiar

---

### 🔧 Opción 3: Túnel con ngrok (Testing Rápido)

Para crear un túnel temporal con HTTPS:

#### 1. Instala ngrok
```bash
brew install ngrok
# o descarga de https://ngrok.com
```

#### 2. Inicia tu servidor
```bash
npm run dev
```

#### 3. Crea el túnel (en otra terminal)
```bash
ngrok http 3000
```

Verás algo como:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

#### 4. Actualiza .env.local
```env
NEXTAUTH_URL=https://abc123.ngrok.io
NEXT_PUBLIC_APP_URL=https://abc123.ngrok.io
```

#### 5. Actualiza Google OAuth
Agrega la URL de ngrok a los orígenes y redirects.

#### 6. Reinicia el servidor
```bash
npm run dev
```

⚠️ **Limitaciones:**
- La URL cambia cada vez que reinicias ngrok (versión gratis)
- Solo para testing temporal

---

## 🎯 Recomendación

**Para desarrollo serio:** Usa Vercel (Opción 1)
- Es gratis
- HTTPS automático
- Acceso desde cualquier lugar
- No necesitas configurar nada extra

**Para testing rápido:** Usa red local (Opción 2)
- Más rápido para iterar
- No necesitas deploy
- Solo funciona en tu WiFi

---

## Checklist de Configuración

- [ ] Elegir opción (Vercel recomendado)
- [ ] Actualizar NEXTAUTH_URL
- [ ] Actualizar NEXT_PUBLIC_APP_URL
- [ ] Agregar URLs en Google Cloud Console
- [ ] Reiniciar servidor / Redeploy
- [ ] Probar login desde móvil

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
**Causa:** La URL de callback no está en Google Cloud Console

**Solución:**
1. Ve a https://console.cloud.google.com/apis/credentials
2. Edita tu OAuth Client ID
3. Agrega la URL exacta del error a "URIs de redireccionamiento"

### Error: "Esta app no está verificada"
**Causa:** Tu app está en modo de prueba

**Solución:**
- En desarrollo: Click "Avanzado" → "Ir a Club Tesoros"
- En producción: Publica tu app en Google Cloud Console

### No carga la página desde móvil
**Causa:** Firewall o red diferente

**Solución:**
- Verifica que estés en la misma WiFi
- Desactiva firewall temporalmente
- Usa Vercel en su lugar

