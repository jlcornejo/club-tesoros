# 📊 Datos de Ejemplo para Probar

## Ejemplos de Ferias

### Feria 1: Feria de Primavera 2024
```json
{
  "nombre": "Feria de Primavera 2024",
  "fecha": "2024-03-15",
  "descripcion": "Primera feria del año con juguetes, libros y ropa para niños. ¡Ven y encuentra tesoros increíbles!",
  "estado": "planificada"
}
```

### Feria 2: Mega Feria de Verano
```json
{
  "nombre": "Mega Feria de Verano",
  "fecha": "2024-06-20",
  "descripcion": "La feria más grande del año con cientos de productos. Juguetes, libros, electrónicos y mucho más.",
  "estado": "activa"
}
```

### Feria 3: Feria Navideña
```json
{
  "nombre": "Feria Navideña 2024",
  "fecha": "2024-12-10",
  "descripcion": "Feria especial de fin de año. Perfecta para encontrar regalos únicos para toda la familia.",
  "estado": "planificada"
}
```

## Ejemplos de Productos

### Juguetes

```json
{
  "nombre": "Lego Star Wars",
  "descripcion": "Set de Lego Star Wars completo, en excelente estado. Incluye todas las piezas y manual.",
  "categoria": "juguete",
  "precio": 25,
  "vendedor": "María González",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

```json
{
  "nombre": "Muñeca Barbie",
  "descripcion": "Barbie con accesorios y ropa adicional. Como nueva.",
  "categoria": "juguete",
  "precio": 15,
  "vendedor": "Pedro Ramírez",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

```json
{
  "nombre": "Hot Wheels Set de Pista",
  "descripcion": "Pista de carreras con 5 autos incluidos. Funciona perfectamente.",
  "categoria": "juguete",
  "precio": 20,
  "vendedor": "Ana Torres",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": true
}
```

### Libros

```json
{
  "nombre": "Harry Potter - Colección Completa",
  "descripcion": "Los 7 libros de Harry Potter en español. Buen estado.",
  "categoria": "libro",
  "precio": 45,
  "vendedor": "Carlos Méndez",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

```json
{
  "nombre": "Cuentos Infantiles Ilustrados",
  "descripcion": "Pack de 10 cuentos clásicos con hermosas ilustraciones.",
  "categoria": "libro",
  "precio": 12,
  "vendedor": "Laura Sánchez",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

### Ropa

```json
{
  "nombre": "Chaqueta Deportiva Nike",
  "descripcion": "Chaqueta Nike talla M para niño, color azul. Poco uso.",
  "categoria": "ropa",
  "precio": 18,
  "vendedor": "Roberto Díaz",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

### Electrónicos

```json
{
  "nombre": "Nintendo Switch Lite",
  "descripcion": "Consola en perfecto estado con 3 juegos incluidos.",
  "categoria": "electronico",
  "precio": 150,
  "vendedor": "Sofía Vargas",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

```json
{
  "nombre": "Tablet Samsung Kids",
  "descripcion": "Tablet educativa para niños con funda protectora.",
  "categoria": "electronico",
  "precio": 80,
  "vendedor": "Miguel Ángel",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": true
}
```

### Otros

```json
{
  "nombre": "Bicicleta Infantil",
  "descripcion": "Bicicleta rodado 16 con rueditas de apoyo. Color rosa.",
  "categoria": "otro",
  "precio": 35,
  "vendedor": "Patricia López",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

```json
{
  "nombre": "Set de Arte Completo",
  "descripcion": "Caja con pinturas, pinceles, lápices de colores y más.",
  "categoria": "otro",
  "precio": 22,
  "vendedor": "Fernando Castro",
  "feriaId": "[ID_DE_TU_FERIA]",
  "vendido": false
}
```

## 🔧 Cómo usar estos datos

### Opción 1: Desde la interfaz web
1. Inicia el servidor (`npm run dev`)
2. Ve a `/ferias/nueva` y crea una feria
3. Copia el ID de la feria desde la URL
4. Usa Postman o Thunder Client para hacer POST a `/api/productos` con los datos de ejemplo

### Opción 2: Usando MongoDB Compass
1. Conecta MongoDB Compass a tu cluster
2. Selecciona la base de datos `club-tesoros`
3. Inserta documentos directamente en las colecciones `ferias` y `productos`

### Opción 3: Script de inicialización (próximamente)
Puedes crear un script `seed.ts` para poblar la base de datos automáticamente.

## 💡 Tips

- Reemplaza `[ID_DE_TU_FERIA]` con el ID real de una feria creada
- Ajusta los precios según tu moneda local
- Personaliza los nombres de vendedores con nombres de tu comunidad
- Marca algunos productos como vendidos para probar la funcionalidad

¡Diviértete probando la aplicación! 🎉
