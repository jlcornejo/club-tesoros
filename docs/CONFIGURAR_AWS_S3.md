# Configuración de AWS S3 para Imágenes

## Paso 1: Crear usuario IAM en AWS

1. Ve a la consola de AWS: https://console.aws.amazon.com/
2. Busca "IAM" en el buscador
3. Ve a "Users" → "Create user"
4. Nombre: `club-tesoros-s3-user`
5. Marca "Provide user access to the AWS Management Console" (opcional)
6. Click "Next"

## Paso 2: Asignar permisos

1. Selecciona "Attach policies directly"
2. Busca y selecciona: `AmazonS3FullAccess`
3. Click "Next" → "Create user"

## Paso 3: Crear Access Keys

1. Click en el usuario recién creado
2. Ve a la pestaña "Security credentials"
3. Scroll hasta "Access keys"
4. Click "Create access key"
5. Selecciona "Application running outside AWS"
6. Click "Next" → "Create access key"
7. **IMPORTANTE**: Copia el Access Key ID y Secret Access Key

## Paso 4: Configurar el bucket S3

El bucket `jlcr-club-tesoros` ya existe. Verifica la configuración:

1. Ve a S3 en la consola de AWS
2. Busca el bucket `jlcr-club-tesoros`
3. Ve a "Permissions"
4. En "Block public access", asegúrate de que esté configurado para permitir ACLs públicas
5. En "Object Ownership", selecciona "ACLs enabled"
6. En "Bucket policy", agrega esta política si no existe:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::jlcr-club-tesoros/images/*"
        }
    ]
}
```

## Paso 5: Agregar credenciales al .env.local

Abre el archivo `.env.local` y completa:

```bash
AWS_ACCESS_KEY_ID=tu_access_key_aqui
AWS_SECRET_ACCESS_KEY=tu_secret_key_aqui
AWS_REGION=us-east-1
AWS_S3_BUCKET=jlcr-club-tesoros
```

## Estructura de archivos en S3

Las imágenes se guardarán con esta estructura:
```
images/
  └── {userId}/
      └── {feriaId}/
          └── {timestamp}-{filename}
```

Ejemplo:
```
images/507f1f77bcf86cd799439011/507f191e810c19729de860ea/1705584000000-peluche.jpg
```

## Verificación

Una vez configurado, reinicia el servidor de desarrollo:
```bash
npm run dev
```

Intenta subir una imagen desde la página de una feria. Si todo está bien configurado, verás la imagen en la tarjeta del producto.
