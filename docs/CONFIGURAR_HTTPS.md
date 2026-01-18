# Configurar HTTPS en Desarrollo Local

Este documento explica cómo configurar HTTPS en tu entorno de desarrollo local para eliminar las advertencias de seguridad del navegador.

## ¿Por qué HTTPS en desarrollo?

- **Seguridad**: Simula el entorno de producción
- **OAuth**: Google OAuth requiere HTTPS (excepto localhost)
- **Service Workers**: Algunas APIs solo funcionan con HTTPS
- **Cookies seguras**: Prueba cookies con flag `Secure`
- **Sin advertencias**: Elimina las advertencias del navegador

## Opción 1: HTTPS con certificados autofirmados (Recomendado)

### Paso 1: Generar certificados

```bash
npm run generate:certs
```

Este comando crea certificados SSL autofirmados en la carpeta `certificates/`.

### Paso 2: Confiar en el certificado (macOS)

Para evitar advertencias del navegador, agrega el certificado a tu sistema:

```bash
# Abrir Keychain Access
open certificates/localhost.pem

# O usar el comando:
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certificates/localhost.pem
```

En Keychain Access:
1. Busca "localhost"
2. Doble clic en el certificado
3. Expande "Trust"
4. Selecciona "Always Trust" en "When using this certificate"

### Paso 3: Actualizar variables de entorno

Edita `.env.local`:

```bash
NEXTAUTH_URL=https://localhost:3000
NEXT_PUBLIC_APP_URL=https://localhost:3000
```

### Paso 4: Iniciar el servidor HTTPS

```bash
npm run dev:https
```

Ahora puedes acceder a: **https://localhost:3000**

## Opción 2: Usar HTTP (más simple, con advertencias)

Si prefieres no configurar HTTPS, puedes seguir usando HTTP:

```bash
npm run dev
```

Accede a: **http://localhost:3000**

**Nota**: Verás advertencias de seguridad en el navegador, pero la aplicación funcionará correctamente en desarrollo.

## Opción 3: Usar mkcert (alternativa más fácil)

[mkcert](https://github.com/FiloSottile/mkcert) es una herramienta que simplifica la creación de certificados locales confiables.

### Instalar mkcert

```bash
# macOS
brew install mkcert
brew install nss # para Firefox

# Instalar CA local
mkcert -install
```

### Generar certificados

```bash
mkdir -p certificates
cd certificates
mkcert localhost 127.0.0.1 ::1
mv localhost+2.pem localhost.pem
mv localhost+2-key.pem localhost-key.pem
cd ..
```

### Iniciar servidor

```bash
npm run dev:https
```

## Configuración de Google OAuth

Si usas Google OAuth, actualiza las URIs autorizadas en [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

**Authorized JavaScript origins:**
- `https://localhost:3000`

**Authorized redirect URIs:**
- `https://localhost:3000/api/auth/callback/google`

## Solución de problemas

### Error: "Cannot find module 'https'"

Asegúrate de tener Node.js instalado correctamente.

### Error: "EACCES: permission denied"

Usa `sudo` para generar certificados o cambia los permisos de la carpeta.

### El navegador sigue mostrando advertencias

1. Verifica que el certificado esté instalado en Keychain Access
2. Reinicia el navegador
3. Limpia la caché del navegador

### Google OAuth no funciona con HTTPS local

Asegúrate de:
1. Actualizar las URIs en Google Cloud Console
2. Usar `https://localhost:3000` en `.env.local`
3. Reiniciar el servidor después de cambiar las variables

## Producción

En producción, usa un certificado SSL válido de:
- [Let's Encrypt](https://letsencrypt.org/) (gratis)
- [Cloudflare](https://www.cloudflare.com/) (gratis con proxy)
- Tu proveedor de hosting (Vercel, Netlify, etc.)

## Recursos

- [Next.js Custom Server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)
- [mkcert](https://github.com/FiloSottile/mkcert)
- [OpenSSL](https://www.openssl.org/)
