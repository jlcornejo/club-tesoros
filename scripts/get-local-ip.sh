#!/bin/bash

# Script para obtener tu IP local para acceso desde móvil

echo "🔍 Buscando tu IP local..."
echo ""

# Obtener IP local (Mac/Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    IP=$(hostname -I | awk '{print $1}')
else
    echo "❌ Sistema operativo no soportado"
    exit 1
fi

if [ -z "$IP" ]; then
    echo "❌ No se pudo encontrar la IP local"
    echo "Intenta manualmente con: ifconfig | grep 'inet '"
    exit 1
fi

echo "✅ Tu IP local es: $IP"
echo ""
echo "📝 Pasos para acceder desde tu móvil:"
echo ""
echo "1. Actualiza tu .env.local:"
echo "   NEXTAUTH_URL=http://$IP:3000"
echo "   NEXT_PUBLIC_APP_URL=http://$IP:3000"
echo ""
echo "2. Actualiza Google OAuth Console:"
echo "   https://console.cloud.google.com/apis/credentials"
echo ""
echo "   Agregar a 'Orígenes autorizados':"
echo "   http://$IP:3000"
echo ""
echo "   Agregar a 'URIs de redireccionamiento':"
echo "   http://$IP:3000/api/auth/callback/google"
echo ""
echo "3. Reinicia el servidor: npm run dev"
echo ""
echo "4. Accede desde tu móvil a: http://$IP:3000"
echo ""
echo "⚠️  Asegúrate de estar en la misma red WiFi"
