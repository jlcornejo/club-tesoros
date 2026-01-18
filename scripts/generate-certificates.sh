#!/bin/bash

# Script para generar certificados SSL autofirmados para desarrollo local

mkdir -p certificates

# Generar certificado autofirmado
openssl req -x509 -out certificates/localhost.pem -keyout certificates/localhost-key.pem \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

echo "✅ Certificados SSL generados en ./certificates/"
echo "⚠️  Recuerda agregar el certificado a tu sistema para evitar advertencias del navegador"
